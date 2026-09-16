import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import SectionForm from './SectionForm'


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
  const { data: sections } = await supabase.from('page_sections').select('*').eq('page_id', id).order('sort_order')

  async function updatePageDetails(formData: FormData) {
    'use server'
    const supabase = await createClient()
    
    await supabase.from('pages').update({
      title: formData.get('title'),
      slug: formData.get('slug'),
      meta_description: formData.get('meta_description'),
      is_published: formData.get('is_published') === 'on'
    }).eq('id', id)
    
    revalidatePath(`/admin/pages/${id}`)
  }

  async function addSection(formData: FormData) {
    'use server'
    const supabase = await createClient()
    
    await supabase.from('page_sections').insert({
      page_id: id,
      section_type: formData.get('section_type'),
      content: {}, // empty JSON to start
      sort_order: sections ? sections.length : 0
    })
    
    revalidatePath(`/admin/pages/${id}`)
  }

  async function deleteSection(formData: FormData) {
    'use server'
    const supabase = await createClient()
    await supabase.from('page_sections').delete().eq('id', formData.get('section_id'))
    revalidatePath(`/admin/pages/${id}`)
  }

  async function populateDefaultLayout() {
    'use server'
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
      'intelligence_briefs'
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
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-charcoal border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Page Settings</h2>
            <form action={updatePageDetails} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-textLight mb-1">Title</label>
                <input type="text" name="title" defaultValue={page.title} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-textLight mb-1">Slug</label>
                <input type="text" name="slug" defaultValue={page.slug} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-textLight mb-1">Meta Description</label>
                <textarea name="meta_description" defaultValue={page.meta_description} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" name="is_published" id="is_published" defaultChecked={page.is_published} className="w-4 h-4 accent-brandRed" />
                <label htmlFor="is_published" className="text-sm font-medium text-textLight">Published</label>
              </div>
              <button type="submit" className="w-full btn-primary-red py-2 rounded font-semibold mt-2">
                Save Settings
              </button>
            </form>
          </div>
        </div>

        {/* Right Col: Sections */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Page Sections</h2>
            <form action={addSection} className="flex gap-2">
              <select name="section_type" className="bg-deepGray border border-white/10 rounded text-white px-3 py-1">
                <option value="hero_banner">Hero Banner</option>
                <option value="text_block">Text Block</option>
                <option value="capability_grid">Capability Grid</option>
                <option value="where_we_operate">Where We Operate</option>
                <option value="research_insights">Research Insights</option>
                <option value="authority_bar">Authority Bar</option>
                <option value="commitments">Commitments</option>
                <option value="operational_differentiator">Operational Differentiator</option>
                <option value="intelligence_briefs">Intelligence Briefs</option>
                <option value="institute">The Institute</option>
              </select>
              <button type="submit" className="bg-white/10 hover:bg-white/20 px-4 py-1 rounded text-white font-medium text-sm transition-colors">
                + Add Section
              </button>
            </form>
          </div>

          {sections?.map((section, idx) => (
            <div key={section.id} className="bg-charcoal border border-white/10 rounded-lg p-6 relative capability-card">
              <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-bold text-brandRed uppercase tracking-widest">Section {idx + 1}</span>
                  <h3 className="text-lg font-semibold text-white mt-1">{formatSectionType(section.section_type)}</h3>
                </div>
                <form action={deleteSection}>
                  <input type="hidden" name="section_id" value={section.id} />
                  <button type="submit" className="text-textMuted hover:text-brandRed text-sm underline">Remove</button>
                </form>
              </div>

              {/* JSON Editor for Content (MVP approach) */}
              {/* Custom Form Editor */}
              <SectionForm section={section} updateAction={updateSectionContent} />
            </div>
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
