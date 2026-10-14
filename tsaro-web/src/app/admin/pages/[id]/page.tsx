import { requireAdmin } from '@/lib/auth/auth';
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import SectionCard from '@/cms/editors/SectionCard'
import PageSettingsForm from './PageSettingsForm'
import { generatePreviewToken } from '@/lib/preview'
import AddSectionButton from '@/components/admin/AddSectionButton'


function formatSectionType(type: string) {
  return type
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}


export default async function EditPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const supabase = await createClient()

  const { data: page } = await supabase.from('pages').select('*').eq('id', id).single()
  
  const previewToken = page ? generatePreviewToken(page.id) : '';
  const { data: sections } = await supabase.from('page_sections').select('*').eq('page_id', id).order('sort_order')

  
  async function updatePageDetails(formData: FormData) {
    'use server'
    await requireAdmin();
    const supabase = await createClient()
    const pageId = formData.get('page_id') as string;
    const newTitle = formData.get('title') as string;
    const newSlug = formData.get('slug') as string;
    const addToNav = formData.get('add_to_nav') === 'on';
    
    // Get old page details to check if slug changed
    const { data: oldPage } = await supabase.from('pages').select('slug, is_published, is_archived').eq('id', pageId).single();
    if (!oldPage) throw new Error('Page not found');
    
    
    const submitAction = formData.get('submit_action') as string;
    let is_published = oldPage.is_published;
    let is_archived = oldPage.is_archived || false;

    if (submitAction === 'publish') {
      is_published = true;
      is_archived = false;
    } else if (submitAction === 'unpublish') {
      is_published = false;
      is_archived = false;
    } else if (submitAction === 'archive') {
      is_published = false;
      is_archived = true;
    } else if (submitAction === 'save_draft') {
      // Just save settings, don't change status unless they were archived
      is_archived = false;
    }

    const { error } = await supabase.from('pages').update({
      title: newTitle,
      slug: newSlug,
      meta_description: formData.get('meta_description'),
      canonical_url: formData.get('canonical_url') || null,
      social_image: formData.get('social_image') || null,
      no_index: formData.get('no_index') === 'on',
      is_published,
      is_archived
    }).eq('id', pageId)

    
    if (error) {
      console.error('Error updating page:', error)
      throw new Error(`Failed to save: ${error.message}`)
    }
    
    // If slug changed, update menu items
    if (oldPage && oldPage.slug !== newSlug) {
      const oldUrl = '/' + oldPage.slug;
      const newUrl = '/' + newSlug;
      await supabase.from('menu_items').update({ url: newUrl }).eq('url', oldUrl);
    }
    
    // Add to nav if checked
    if (addToNav) {
      // Find main menu
      const { data: menu } = await supabase.from('menus').select('id').eq('location', 'header').single();
      if (menu) {
        await supabase.from('menu_items').insert({
          menu_id: menu.id,
          label: newTitle,
          url: '/' + newSlug,
          sort_order: 99 // Put at the end
        });
      }
    }
    
    revalidatePath(`/admin/pages/${pageId}`)
    revalidatePath('/admin/pages')
    revalidatePath(`/${newSlug}`)
    if (oldPage) revalidatePath(`/${oldPage.slug}`)
  }


  
  async function moveSection(formData: FormData) {
    'use server'
    await requireAdmin();
    const supabase = await createClient()
    const section_id = formData.get('section_id') as string
    const direction = formData.get('direction') as string
    
    const { data: sections } = await supabase.from('page_sections').select('id, sort_order').eq('page_id', id).order('sort_order')
    if (!sections) return;

    const currentIndex = sections.findIndex((s: Record<string, any>) => s.id === section_id);
    if (currentIndex === -1) return;

    const swapIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (swapIndex >= 0 && swapIndex < sections.length) {
      const current = sections[currentIndex]
      const swap = sections[swapIndex]
      await supabase.from('page_sections').update({ sort_order: swap.sort_order }).eq('id', current.id)
      await supabase.from('page_sections').update({ sort_order: current.sort_order }).eq('id', swap.id)
    }
    revalidatePath(`/admin/pages/${id}`)
  }


  
  async function saveAsTemplate(formData: FormData) {
    'use server'
    await requireAdmin();
    const supabase = await createClient()
    const templateName = formData.get('template_name') as string;
    if (!templateName) return;
    
    // Fetch all sections for this page
    const { data: pageSections } = await supabase.from('page_sections').select('section_type, content').eq('page_id', id).order('sort_order');
    if (pageSections) {
      const sectionTypes = pageSections.map(s => ({ type: s.section_type, variant: (s.content && s.content.variant) || 'default' }));
      await supabase.from('page_templates').insert({
        name: templateName,
        sections: JSON.stringify(sectionTypes)
      });
    }
  }


  async function handleAddSection(type: string, variant?: string) {
    'use server'
    await requireAdmin();
    const supabase = await createClient()
    
    const content = variant ? { variant } : {};

    await supabase.from('page_sections').insert({
      page_id: id,
      section_type: type,
      content,
      sort_order: sections ? sections.length : 0
    })
    
    revalidatePath(`/admin/pages/${id}`)
  }

  async function deleteSection(formData: FormData) {
    'use server'
    await requireAdmin();
    const supabase = await createClient()
    await supabase.from('page_sections').delete().eq('id', formData.get('section_id'))
    revalidatePath(`/admin/pages/${id}`)
  }

  
  async function moveAction(id: string, direction: 'up' | 'down') {
    'use server'
    await requireAdmin();
    const supabase = await createClient()
    const { data: sections } = await supabase.from('page_sections').select('*').eq('page_id', id).order('sort_order')
    if (!sections) return;
    
    const currentIndex = sections.findIndex(s => s.id === id);
    if (currentIndex === -1) return;
    
    if (direction === 'up' && currentIndex > 0) {
      const prev = sections[currentIndex - 1];
      const current = sections[currentIndex];
      await supabase.from('page_sections').upsert([
        { id: prev.id, sort_order: current.sort_order },
        { id: current.id, sort_order: prev.sort_order }
      ]);
    } else if (direction === 'down' && currentIndex < sections.length - 1) {
      const next = sections[currentIndex + 1];
      const current = sections[currentIndex];
      await supabase.from('page_sections').upsert([
        { id: next.id, sort_order: current.sort_order },
        { id: current.id, sort_order: next.sort_order }
      ]);
    }
    revalidatePath(`/admin/pages/${id}`)
  }

  async function duplicateAction(id: string) {
    'use server'
    await requireAdmin();
    const supabase = await createClient()
    const { data: sectionToCopy } = await supabase.from('page_sections').select('*').eq('id', id).single()
    if (!sectionToCopy) return;

    const { data: allSections } = await supabase.from('page_sections').select('sort_order').eq('page_id', id);
    const maxSort = allSections && allSections.length > 0 ? Math.max(...allSections.map(s => s.sort_order || 0)) : 0;

    await supabase.from('page_sections').insert({
      page_id: id,
      section_type: sectionToCopy.section_type,
      content: sectionToCopy.content,
      sort_order: maxSort + 1
    });

    revalidatePath(`/admin/pages/${id}`)
  }

  async function deleteAction(id: string) {
    'use server'
    await requireAdmin();
    const supabase = await createClient()
    await supabase.from('page_sections').delete().eq('id', id)
    revalidatePath(`/admin/pages/${id}`)
  }

  async function saveSectionAction(formData: FormData) {
    'use server'
    await requireAdmin();
    const supabase = await createClient()
    const id = formData.get('id') as string;
    const content = formData.get('content') as string;
    try {
      const parsedContent = JSON.parse(content)
      await supabase.from('page_sections').update({ content: parsedContent }).eq('id', id);
      revalidatePath(`/admin/pages/${id}`)
    } catch (e) {
      console.error("Invalid JSON content", e)
    }
  }


  async function populateDefaultLayout() {
    'use server'
    await requireAdmin();
    const supabase = await createClient()
    const defaultSections = [
      'hero_banner',
      'authority_bar',
      'capability_grid',
      'where_we_operate',
      'research_insights',
      'operational_differentiator',
      'commitments',
      'institute',
      'contact_section'
    ]

    const inserts = defaultSections.map((type, index) => ({
      page_id: id,
      section_type: type,
      content: {},
      sort_order: index
    }))

    await supabase.from('page_sections').insert(inserts)
    revalidatePath(`/admin/pages/${id}`)
  }

  async function updateSectionContent(formData: FormData) {
    'use server'
    await requireAdmin();
    const supabase = await createClient()
    const section_id = formData.get('section_id')
    const content = formData.get('content') as string
    
    try {
      const parsedContent = JSON.parse(content)
      const { error } = await supabase.from('page_sections').update({ content: parsedContent }).eq('id', section_id); if (error) console.error("SUPABASE ERROR:", error)
      revalidatePath(`/admin/pages/${id}`)
    } catch (e) {
      console.error("Invalid JSON content", e)
    }
  }

  if (!page) return <div className="text-white">Page not found</div>

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/pages" className="text-textLight hover:text-white underline text-sm">&larr; Back to Pages</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Page Details */}
        <div className="lg:col-span-1 space-y-8 sticky top-8 self-start">
          <div className="bg-charcoal border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Page Settings</h2>
            <PageSettingsForm page={page} updateAction={updatePageDetails} previewToken={previewToken} />
          </div>


          <div className="bg-charcoal border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Save as Template</h2>
            <p className="text-sm text-textLight mb-4">Save the current page layout to reuse later.</p>
            <form action={saveAsTemplate} className="flex gap-2">
              <input type="text" name="template_name" required placeholder="Template Name" className="flex-1 px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
              <button type="submit" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded text-white font-medium text-sm transition-colors whitespace-nowrap">
                Save
              </button>
            </form>
          </div>

        </div>

        {/* Right Col: Sections */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Page Sections</h2>
            <AddSectionButton addAction={handleAddSection} />
          </div>

          {sections?.map((section, idx) => (
            <SectionCard 
              key={section.id} 
              section={section} 
              isFirst={idx === 0} 
              isLast={idx === sections.length - 1} 
              saveAction={saveSectionAction}
              moveAction={moveAction}
              duplicateAction={duplicateAction}
              deleteAction={deleteAction}
            />
          ))}

          {(!sections || sections.length === 0) && (
            <div className="text-center p-10 border border-white/10 border-dashed rounded-lg">
              <p className="text-textMuted mb-6">No sections added yet. You can add them one by one, or populate the default Tsaro layout.</p>
              <form action={populateDefaultLayout}>
                <button type="submit" className="btn-primary-red px-6 py-2 rounded font-semibold text-sm">
                  Populate Default Layout
                </button>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
