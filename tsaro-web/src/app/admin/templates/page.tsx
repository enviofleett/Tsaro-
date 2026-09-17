import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'

export default async function TemplatesManager() {
  const supabase = await createClient()

  // We assume the page_templates table exists
  const { data: templates, error } = await supabase
    .from('page_templates')
    .select('*')
    .order('created_at', { ascending: false })

  // Optional: all available block types so admin can pick which ones to include
  const allSectionTypes = [
    'hero_banner', 'text_block', 'capability_grid', 'where_we_operate',
    'research_insights', 'authority_bar', 'commitments', 'operational_differentiator',
    'contact_section', 'intelligence_briefs', 'institute', 'about_hero',
    'split_narrative', 'core_values', 'clientele_hero', 'client_sectors',
    'pull_quote', 'cta_banner', 'academy_hero'
  ]

  async function createTemplate(formData: FormData) {
    'use server'
    const supabase = await createClient()
    const name = formData.get('name') as string
    
    // We will parse selected blocks from checkboxes
    const sections: string[] = []
    for (const key of formData.keys()) {
      if (key.startsWith('section_') && formData.get(key) === 'on') {
        sections.push(key.replace('section_', ''))
      }
    }

    if (name) {
      await supabase.from('page_templates').insert({
        name,
        sections: JSON.stringify(sections)
      })
    }
    revalidatePath('/admin/templates')
  }

  async function deleteTemplate(formData: FormData) {
    'use server'
    const supabase = await createClient()
    const id = formData.get('id') as string

    await supabase.from('page_templates').delete().eq('id', id)
    revalidatePath('/admin/templates')
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Page Templates</h1>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-8 text-blue-200 text-sm">
        <p className="font-semibold mb-1">Database Setup Required</p>
        <p>If this page errors out, please run this SQL in your Supabase SQL Editor:</p>
        <code className="block bg-black/30 p-2 mt-2 rounded text-xs">
          CREATE TABLE page_templates (<br/>
          &nbsp;&nbsp;id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,<br/>
          &nbsp;&nbsp;name TEXT NOT NULL,<br/>
          &nbsp;&nbsp;sections JSONB NOT NULL DEFAULT '[]'::jsonb,<br/>
          &nbsp;&nbsp;created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL<br/>
          );
        </code>
      </div>

      <div className="bg-charcoal border border-white/10 rounded-lg p-6 mb-8 capability-card">
        <h2 className="text-xl font-semibold mb-4 text-white">Create Custom Template</h2>
        <form action={createTemplate} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Template Name</label>
            <input type="text" name="name" required placeholder="e.g. Executive Profile" className="w-full max-w-md px-4 py-2 bg-deepGray border border-white/10 rounded text-white focus:outline-none focus:border-brandRed" />
          </div>

          <div>
            <label className="block text-sm font-medium text-textLight mb-3">Select Default Blocks for this Template</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allSectionTypes.map(type => (
                <label key={type} className="flex items-center gap-2 text-sm text-textLight hover:text-white cursor-pointer bg-white/5 p-2 rounded">
                  <input type="checkbox" name={`section_${type}`} className="rounded border-white/20 bg-transparent text-brandRed focus:ring-brandRed" />
                  <span className="truncate">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-primary-red px-6 py-2 rounded font-semibold">
            Save Custom Template
          </button>
        </form>
      </div>

      {/* Templates List */}
      <div className="bg-charcoal border border-white/10 rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="p-4 font-semibold text-textLight">Template Name</th>
              <th className="p-4 font-semibold text-textLight">Included Blocks</th>
              <th className="p-4 font-semibold text-textLight text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {templates?.map((template) => {
              // Parse JSONB if it's a string, or it might already be parsed depending on Supabase version
              const sectionsArray = typeof template.sections === 'string' ? JSON.parse(template.sections || '[]') : template.sections
              return (
                <tr key={template.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-4 text-white font-medium">{template.name}</td>
                  <td className="p-4 text-textMuted text-xs">
                    <div className="flex flex-wrap gap-1">
                      {sectionsArray && sectionsArray.map((s: string, idx: number) => (
                        <span key={idx} className="bg-white/10 px-2 py-0.5 rounded">{s}</span>
                      ))}
                      {(!sectionsArray || sectionsArray.length === 0) && <span className="opacity-50">No blocks</span>}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <form action={deleteTemplate}>
                      <input type="hidden" name="id" value={template.id} />
                      <button type="submit" className="text-brandRed hover:text-brandRedHover text-sm font-semibold underline">
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              )
            })}
            {(!templates || templates.length === 0) && !error && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-textMuted">No custom templates found.</td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-brandRed">Error loading templates. Have you run the SQL to create the table?</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
