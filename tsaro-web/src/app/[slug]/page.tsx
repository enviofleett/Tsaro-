import { createClient } from '@/utils/supabase/server'
import Navbar from '@/components/layout/Navbar'
import { notFound } from 'next/navigation'

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const supabase = await createClient()

  const { data: page } = await supabase.from('pages').select('*').eq('slug', slug).single()
  
  if (!page || !page.is_published) {
    notFound()
  }

  const { data: sections } = await supabase.from('page_sections').select('*').eq('page_id', page.id).order('sort_order')

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        {/* Render CMS Sections */}
        {sections?.map(section => {
          if (section.section_type === 'hero_banner') {
            const content = section.content as any
            return (
              <section key={section.id} className="relative py-24 px-6 flex items-center justify-center tactical-mesh overflow-hidden border-b border-white/10">
                  <div className="relative z-10 max-w-4xl mx-auto text-center">
                      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" dangerouslySetInnerHTML={{ __html: content.headline || page.title }} />
                      {content.subheadline && <p className="text-lg text-textLight">{content.subheadline}</p>}
                  </div>
              </section>
            )
          }

          if (section.section_type === 'text_block') {
            const content = section.content as any
            return (
              <section key={section.id} className="py-16 px-6 max-w-4xl mx-auto">
                {content.title && <h2 className="text-2xl font-bold mb-6 text-brandRed">{content.title}</h2>}
                <div className="text-textLight leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: content.body || 'Add text body' }} />
              </section>
            )
          }

          return <div key={section.id} className="p-10 text-center border border-dashed border-white/20 m-6 text-textMuted rounded">Unsupported Section Type: {section.section_type}</div>
        })}

        {(!sections || sections.length === 0) && (
          <div className="text-center py-32 px-6">
            <h1 className="text-4xl font-bold text-white mb-4">{page.title}</h1>
            <p className="text-textMuted">This page has no sections configured in the CMS yet.</p>
          </div>
        )}
      </main>
    </>
  )
}
