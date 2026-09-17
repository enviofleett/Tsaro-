import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'

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

  async function createPage(formData: FormData) {
    'use server'
    const supabase = await createClient()
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const templateId = formData.get('template') as string

    // Insert the page and return the new ID
    const { data: newPage, error } = await supabase
      .from('pages')
      .insert({ title, slug })
      .select('id')
      .single()

    if (error) {
      console.error('Error creating page:', error)
    } else if (newPage && templateId !== 'blank') {
      
      let sections: string[] = []
      
      if (templateId === 'homepage') {
        sections = [
          'hero_banner', 'authority_bar', 'capability_grid', 'where_we_operate',
          'research_insights', 'operational_differentiator', 'commitments',
          'institute', 'intelligence_briefs'
        ]
      } else if (templateId === 'about') {
        sections = ['about_hero', 'split_narrative', 'core_values', 'pull_quote']
      } else if (templateId === 'contact') {
        sections = ['hero_banner', 'contact_section']
      } else if (templateId === 'landing') {
        sections = ['hero_banner', 'text_block', 'split_narrative', 'cta_banner']
      } else {
        // It's a custom template ID. Fetch it!
        const { data: customTemplate } = await supabase.from('page_templates').select('sections').eq('id', templateId).single()
        if (customTemplate && customTemplate.sections) {
          sections = typeof customTemplate.sections === 'string' ? JSON.parse(customTemplate.sections) : customTemplate.sections
        }
      }

      if (sections.length > 0) {
        const inserts = sections.map((type, index) => ({
          page_id: newPage.id,
          section_type: type,
          content: {},
          sort_order: index
        }))

        await supabase.from('page_sections').insert(inserts)
      }
    }
    revalidatePath('/admin/pages')
  }

  async function deletePage(formData: FormData) {
    'use server'
    const supabase = await createClient()
    const id = formData.get('id') as string

    await supabase.from('pages').delete().eq('id', id)
    revalidatePath('/admin/pages')
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Pages Manager</h1>
      </div>

      {/* Create New Page Form */}
      <div className="bg-charcoal border border-white/10 rounded-lg p-6 mb-8 capability-card">
        <h2 className="text-xl font-semibold mb-4 text-white">Create New Page</h2>
        <form action={createPage} className="flex gap-4 items-end flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-textLight mb-1">Page Title</label>
            <input type="text" name="title" required placeholder="e.g. Home" className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white focus:outline-none focus:border-brandRed" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-textLight mb-1">URL Slug</label>
            <input type="text" name="slug" required placeholder="e.g. home" className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white focus:outline-none focus:border-brandRed" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-textLight mb-1">Page Template</label>
            <select name="template" className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white focus:outline-none focus:border-brandRed appearance-none">
              <option value="blank">Blank Page (Add blocks manually)</option>
              <optgroup label="Default Templates">
                <option value="homepage">Standard Homepage</option>
                <option value="about">About Page Layout</option>
                <option value="landing">Landing Page Layout</option>
                <option value="contact">Contact Page Layout</option>
              </optgroup>
              {templates && templates.length > 0 && (
                <optgroup label="Custom Templates">
                  {templates.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </optgroup>
              )}
            </select>
          </div>
          <button type="submit" className="btn-primary-red px-6 py-2 rounded font-semibold h-10 shrink-0">
            Create
          </button>
        </form>
      </div>

      {/* Pages List */}
      <div className="bg-charcoal border border-white/10 rounded-lg overflow-hidden">
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
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${page.is_published ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                    {page.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-4 text-right flex justify-end gap-3">
                  <Link href={`/admin/pages/${page.id}`} className="text-textLight hover:text-white text-sm font-semibold underline">
                    Edit Content
                  </Link>
                  <form action={deletePage}>
                    <input type="hidden" name="id" value={page.id} />
                    <button type="submit" className="text-brandRed hover:text-brandRedHover text-sm font-semibold underline">
                      Delete
                    </button>
                  </form>
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
