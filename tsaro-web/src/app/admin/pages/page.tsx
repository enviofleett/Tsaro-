import DeletePageButton from "@/components/admin/DeletePageButton";
import { requireAdmin } from '@/lib/auth/auth';
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'
import CreatePageWizard from '@/components/admin/CreatePageWizard'


function getDummyContent(type: string): any {
  const defaultImage = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000";
  
  switch(type) {
    case 'hero':
    case 'hero_banner':
    case 'about_hero':
    case 'clientele_hero':
    case 'academy_hero':
      return {
        heading: "Welcome to Our Platform",
        subheading: "Empowering your business with strategic insights and operational excellence.",
        body: "<p>We deliver tailored solutions for complex challenges in a rapidly evolving global landscape.</p>",
        image: defaultImage,
        primaryCtaLabel: "Learn More",
        primaryCtaDest: "/about",
        overlayStrength: "50"
      };
    case 'split_narrative':
    case 'text_image':
      return {
        heading: "Strategic Execution",
        subheading: "Where vision meets reality",
        body: "<p>We bridge the gap between strategic planning and on-the-ground execution. Our teams work alongside your leadership to ensure that every objective is met with precision and measurable results.</p>",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
        ctaLabel: "Discover How",
        ctaDest: "/services"
      };
    case 'rich_content':
    case 'text_block':
      return {
        title: "Executive Summary",
        body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.</p><ul><li>First key point of interest</li><li>Second critical metric</li><li>Third operational guideline</li></ul><p>Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci.</p>"
      };
    case 'cta':
    case 'cta_banner':
      return {
        heading: "Ready to Transform Your Organization?",
        subheading: "Contact our team of experts today to schedule a comprehensive operational assessment.",
        buttonLabel: "Get Started",
        buttonDest: "/contact",
        image: defaultImage
      };
    case 'cards':
    case 'client_sectors':
    case 'capability_grid':
      return {
        heading: "Our Core Capabilities",
        subheading: "Comprehensive solutions tailored to your sector.",
        body: "<p>Explore the diverse range of operational services we provide.</p>"
      };
    case 'quote':
    case 'pull_quote':
      return {
        quote: "The only limit to our realization of tomorrow will be our doubts of today.",
        author: "Franklin D. Roosevelt",
        role: "Historical Figure"
      };
    default:
      return {};
  }
}


export default async function PagesManager() {
  const supabase = await createClient()

  const { data: pages, error } = await supabase
    .from('pages')
    .select('*')
    .order('created_at', { ascending: false })

  // Fetch custom templates to display in the dropdown
  const { data: templates } = await supabase
    .from('page_templates')
    .select('*')
    .order('name', { ascending: true })
  
  const { data: menuItems } = await supabase
    .from('menu_items')
    .select('id, label')
    .is('parent_id', null)
    .order('sort_order', { ascending: true })


  
  
  const { data: allMenuItems } = await supabase
    .from('menu_items')
    .select('id, label, page_id, menu_id, menus(name)');


  async function createPageAction(data: Record<string, any>) {
    'use server'
    await requireAdmin();
    const supabase = await createClient()
    const { title, slug, templateId, addToNav, menuLocation, menuLabel } = data;

    // Validate uniqueness
    const { data: existing } = await supabase.from('pages').select('id').eq('slug', slug).single()
    if (existing) {
      throw new Error('A page with this URL slug already exists.')
    }

    // Reserved paths
    const reserved = ['admin', 'api', '_next', 'login', 'home'];
    if (reserved.includes(slug)) {
      throw new Error('This URL slug is reserved for the system.')
    }

    // Insert the page and return the new ID
    const { data: newPage, error } = await supabase
      .from('pages')
      .insert({ title, slug })
      .select('id')
      .single()

    if (error) {
      console.error('Error creating page:', error)
      throw new Error('Database error creating page.')
    } 
    
    if (newPage && templateId !== 'blank') {
      let sections: string[] = []
      
      if (templateId === 'standard') {
        sections = ['hero', 'rich_content', 'cta']
      } else if (templateId === 'split') {
        sections = ['hero', 'text_image', 'rich_content', 'cta']
      } else if (templateId === 'landing') {
        sections = ['hero', 'cards', 'text_image', 'cta']
      } else if (templateId === 'about') {
        sections = ['hero', 'text_image', 'cards', 'quote', 'cta']
      } else if (templateId === 'contact') {
        sections = ['hero', 'contact_section']
      } else if (templateId === 'homepage') {
        sections = ['hero', 'authority_bar', 'capability_grid', 'where_we_operate', 'research_insights', 'operational_differentiator', 'commitments', 'institute', 'intelligence_briefs']
      } else {
        // It's a custom template ID. Fetch it!
        const { data: customTemplate } = await supabase.from('page_templates').select('sections').eq('id', templateId).single()
        if (customTemplate && customTemplate.sections) {
          sections = typeof customTemplate.sections === 'string' ? JSON.parse(customTemplate.sections) : customTemplate.sections
        }
      }

      if (sections.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const inserts = sections.map((item: any, index: number) => {
          let sectionType = item;
          const content: any = getDummyContent(sectionType as string);
          
          if (typeof item === 'object' && item !== null) {
            sectionType = item.type || item.section_type;
            if (item.variant) content.variant = item.variant;
          }

          return {
            page_id: newPage.id,
            section_type: sectionType,
            content,
            sort_order: index
          };
        });
        await supabase.from('page_sections').insert(inserts)
      }
    }

    // Menu logic
    if (newPage && addToNav) {
      // Find main menu ID
      const { data: mainMenu } = await supabase.from('menus').select('id').eq('slug', 'main_nav').single();
      if (mainMenu) {
        // Get max sort order
        let maxSort = 0;
        let query = supabase.from('menu_items').select('sort_order').eq('menu_id', mainMenu.id);
        
        if (menuLocation === 'top') {
          query = query.is('parent_id', null);
        } else {
          query = query.eq('parent_id', menuLocation);
        }
        
        const { data: siblings } = await query;
        if (siblings && siblings.length > 0) {
          maxSort = Math.max(...siblings.map(s => s.sort_order || 0));
        }

        await supabase.from('menu_items').insert({
          menu_id: mainMenu.id,
          parent_id: menuLocation === 'top' ? null : menuLocation,
          label: menuLabel || title,
          url: '/' + slug,
          sort_order: maxSort + 1
        });
      }
    }

    revalidatePath('/admin/pages')
    return newPage?.id || null
  }


  

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Pages Manager</h1>
      </div>
      
      <CreatePageWizard customTemplates={templates || []} createAction={createPageAction} menus={menuItems || []} />

      {/* Pages List */}
      <div className="bg-charcoal border border-white/10 rounded-lg overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="p-4 font-semibold text-textLight">Title</th>
              <th className="p-4 font-semibold text-textLight">Slug</th>
              <th className="p-4 font-semibold text-textLight">Status</th>
              <th className="p-4 font-semibold text-textLight text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages?.map((page) => (
              <tr key={page.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="p-4 text-white font-medium">{page.title}</td>
                <td className="p-4 text-textMuted">/{page.slug}</td>
                <td className="p-4">
                  {page.is_archived ? (
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-500/20 text-gray-400">Archived</span>
                  ) : page.is_published ? (
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-green-500/20 text-green-500">Published</span>
                  ) : (
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-500/20 text-yellow-500">Draft</span>
                  )}
                </td>
                <td className="p-4 text-right flex justify-end gap-3">
                  <Link href={`/admin/pages/${page.id}`} className="text-textLight hover:text-white text-sm font-semibold underline">
                    Edit Content
                  </Link>
                  
                  <DeletePageButton 
                    pageId={page.id} 
                    pageTitle={page.title}
                    menuUsages={(allMenuItems || []).filter((m: Record<string, any>) => m.page_id === page.id)}
                  />
                </td>
              </tr>
            ))}
            {(!pages || pages.length === 0) && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-textMuted">No pages found. Create one above!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
