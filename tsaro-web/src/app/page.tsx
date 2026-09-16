import Navbar from '@/components/layout/Navbar'
import HeroBanner from '@/components/sections/HeroBanner'
import AuthorityBar from '@/components/sections/AuthorityBar'
import CapabilityGrid from '@/components/sections/CapabilityGrid'
import WhereWeOperate from '@/components/sections/WhereWeOperate'
import OperationalDifferentiator from '@/components/sections/OperationalDifferentiator'
import IntelligenceBriefs from '@/components/sections/IntelligenceBriefs'
import ResearchInsights from '@/components/sections/ResearchInsights'
import Commitments from '@/components/sections/Commitments'
import TheInstitute from '@/components/sections/TheInstitute'
import Footer from '@/components/layout/Footer'
import AboutHero from '@/components/sections/AboutHero'
import SplitNarrative from '@/components/sections/SplitNarrative'
import CoreValues from '@/components/sections/CoreValues'
import ClienteleHero from '@/components/sections/ClienteleHero'
import ClientSectors from '@/components/sections/ClientSectors'
import PullQuote from '@/components/sections/PullQuote'
import CtaBanner from '@/components/sections/CtaBanner'
import AcademyHero from '@/components/sections/AcademyHero'
import AcademyFlagship from '@/components/sections/AcademyFlagship'
import AcademyCatalog from '@/components/sections/AcademyCatalog'
import AcademyMethodology from '@/components/sections/AcademyMethodology'

export default async function HomePage() {
  let sections: any[] = []

  // Only attempt Supabase fetch if env vars are configured
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const { createClient } = await import('@/utils/supabase/server')
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
          <HeroBanner />
          <AuthorityBar />
          <CapabilityGrid />
          <WhereWeOperate />
          <ResearchInsights />
          <OperationalDifferentiator />
          <Commitments />
          <TheInstitute />
          <IntelligenceBriefs />
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
        {sections.map(section => {
          if (section.section_type === 'hero_banner') return <HeroBanner key={section.id} content={section.content} />
          if (section.section_type === 'authority_bar') return <AuthorityBar key={section.id} content={section.content} />
          if (section.section_type === 'capability_grid') return <CapabilityGrid key={section.id} content={section.content} />
          if (section.section_type === 'where_we_operate') return <WhereWeOperate key={section.id} content={section.content} />
          if (section.section_type === 'operational_differentiator') return <OperationalDifferentiator key={section.id} content={section.content} />
          if (section.section_type === 'commitments') return <Commitments key={section.id} content={section.content} />
          if (section.section_type === 'institute') return <TheInstitute key={section.id} content={section.content} />
          if (section.section_type === 'intelligence_briefs') return <IntelligenceBriefs key={section.id} content={section.content} />
          if (section.section_type === 'research_insights') return <ResearchInsights key={section.id} content={section.content} />

          if (section.section_type === 'about_hero') return <AboutHero key={section.id} content={section.content} />
          if (section.section_type === 'split_narrative') return <SplitNarrative key={section.id} content={section.content} />
          if (section.section_type === 'core_values') return <CoreValues key={section.id} content={section.content} />
          if (section.section_type === 'clientele_hero') return <ClienteleHero key={section.id} content={section.content} />
          if (section.section_type === 'client_sectors') return <ClientSectors key={section.id} content={section.content} />
          if (section.section_type === 'pull_quote') return <PullQuote key={section.id} content={section.content} />
          if (section.section_type === 'cta_banner') return <CtaBanner key={section.id} content={section.content} />
          if (section.section_type === 'academy_hero') return <AcademyHero key={section.id} content={section.content} />
          if (section.section_type === 'academy_flagship') return <AcademyFlagship key={section.id} content={section.content} />
          if (section.section_type === 'academy_catalog') return <AcademyCatalog key={section.id} content={section.content} />
          if (section.section_type === 'academy_methodology') return <AcademyMethodology key={section.id} content={section.content} />
          if (section.section_type === 'text_block') {
            const content = section.content as any
            return (
              <section key={section.id} className="py-20 px-6 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-brandRed">{content.title}</h2>
                <div className="text-textLight leading-relaxed" dangerouslySetInnerHTML={{ __html: content.body }} />
              </section>
            )
          }

          return <div key={section.id} className="p-10 border border-brandRed text-brandRed">Unknown Section Type: {section.section_type}</div>
        })}
      </main>
      <Footer />
    </>
  )
}
