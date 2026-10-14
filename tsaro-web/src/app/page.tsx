import { PageRenderer } from '@/cms/blocks/renderer'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default async function HomePage() {
  let sections: Record<string, any>[] = []

  // Only attempt Supabase fetch if env vars are configured
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()
      const { data: page } = await supabase.from('pages').select('id').eq('slug', 'home').maybeSingle()
      if (page) {
        const { data } = await supabase.from('page_sections').select('*').eq('page_id', page.id).order('sort_order')
        if (data) sections = data
      }
    } catch {
      // Supabase unavailable — fall through to static content
    }
  }

  // Fallback to static HTML if CMS has no sections yet
  if (sections.length === 0) {
    return (
      <>
        <Navbar />
        <main>
          {/* Static fallback */}
        </main>
        <Footer />
      </>
    )
  }

  // Render CMS Sections
  return (
    <>
      <Navbar />
      <main>
        <PageRenderer sections={sections} />
      </main>
      <Footer />
    </>
  )
}
