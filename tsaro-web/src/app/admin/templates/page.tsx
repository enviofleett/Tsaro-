import { requireAdmin } from '@/lib/auth/auth';
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'
import TemplateBuilder from '@/components/admin/TemplateBuilder'

function formatSectionType(type: string) {
  return type
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

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

    async function handleCreateTemplate(data: Record<string, any>) {
    'use server'
    await requireAdmin();
    const supabase = await createClient()
    const { name, description, blocks } = data;
    
    await supabase.from('page_templates').insert({
      name,
      sections: JSON.stringify(blocks)
    })
    revalidatePath('/admin/templates')
  }

  async function deleteTemplate(formData: FormData) {
    'use server'
    await requireAdmin();
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

            <TemplateBuilder createAction={handleCreateTemplate} />

      {/* Templates List */}
      <div className="bg-charcoal border border-white/10 rounded-lg overflow-x-auto">
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
                      {sectionsArray && sectionsArray.map((s: Record<string, any>, idx: number) => {
                        const typeStr = typeof s === 'string' ? s : (s.type || s.section_type);
                        const varStr = typeof s === 'object' && s.variant ? ` (${s.variant})` : '';
                        return (
                          <span key={idx} className="bg-white/10 px-2 py-0.5 rounded text-[10px]">
                            {formatSectionType(typeStr)}{varStr.replace(/_/g, ' ')}
                          </span>
                        );
                      })}
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
                <td colSpan={3} className="p-8 text-center text-brandRed">Error loading templates. </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
