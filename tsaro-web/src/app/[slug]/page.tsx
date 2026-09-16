import { createClient } from '@/utils/supabase/server'
import Navbar from '@/components/layout/Navbar'
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
import { notFound } from 'next/navigation'
import HeroBanner from '@/components/sections/HeroBanner'
import AuthorityBar from '@/components/sections/AuthorityBar'
import CapabilityGrid from '@/components/sections/CapabilityGrid'
import WhereWeOperate from '@/components/sections/WhereWeOperate'
import OperationalDifferentiator from '@/components/sections/OperationalDifferentiator'
import ContactSection from '@/components/sections/ContactSection'
import ResearchInsights from '@/components/sections/ResearchInsights'
import Commitments from '@/components/sections/Commitments'
import TheInstitute from '@/components/sections/TheInstitute'

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
          if (section.section_type === 'hero_banner') return <HeroBanner key={section.id} content={section.content} />
          if (section.section_type === 'authority_bar') return <AuthorityBar key={section.id} content={section.content} />
          if (section.section_type === 'capability_grid') return <CapabilityGrid key={section.id} content={section.content} />
          if (section.section_type === 'where_we_operate') return <WhereWeOperate key={section.id} content={section.content} />
          if (section.section_type === 'operational_differentiator') return <OperationalDifferentiator key={section.id} content={section.content} />
          if (section.section_type === 'commitments') return <Commitments key={section.id} content={section.content} />
          if (section.section_type === 'institute') return <TheInstitute key={section.id} content={section.content} />
          if (section.section_type === 'contact_section' || section.section_type === 'intelligence_briefs') return <ContactSection key={section.id} content={section.content} />
          if (section.section_type === 'research_insights') return <ResearchInsights key={section.id} content={section.content} />

          if (section.section_type === 'about_hero') return <AboutHero key={section.id} content={section.content} />
          if (section.section_type === 'split_narrative') return <SplitNarrative key={section.id} content={section.content} />
          if (section.section_type === 'core_values') return <CoreValues key={section.id} content={section.content} />
          if (section.section_type === 'clientele_hero') return <ClienteleHero key={section.id} content={section.content} />
          if (section.section_type === 'client_sectors') return <ClientSectors key={section.id} content={section.content} />
          if (section.section_type === 'pull_quote') return <PullQuote key={section.id} content={section.content} />
          if (section.section_type === 'cta_banner') return <CtaBanner key={section.id} content={section.content} />
          if (section.section_type === 'academy_hero') return <AcademyHero key={section.id} content={section.content} />
          if (section.section_type === 'academy_flagship') {
            const catalogSection = sections?.find((s: any) => s.section_type === 'academy_catalog')
            let favoriteContent = section.content as any;
            if (catalogSection && (catalogSection.content as any).programs) {
              const favorite = (catalogSection.content as any).programs.find((p: any) => p.isFavorite)
              if (favorite) {
                favoriteContent = {
                  ...favoriteContent,
                  badge: favorite.badge || favoriteContent.badge,
                  image: favorite.image || favoriteContent.image,
                  imageBadge: favorite.format ? `${favorite.format} • ${favorite.duration}` : favoriteContent.imageBadge,
                  code: favorite.code || favoriteContent.code,
                  codeType: favorite.type || favoriteContent.codeType,
                  title: favorite.title || favoriteContent.title,
                  desc: favorite.desc || favoriteContent.desc,
                  startDate: favorite.startDate || favorite.date || favoriteContent.startDate,
                  endDate: favorite.endDate || favoriteContent.endDate,
                  timeRange: favorite.timeRange || favoriteContent.timeRange,
                }
              }
            }
            return <AcademyFlagship key={section.id} content={favoriteContent} />
          }
          if (section.section_type === 'academy_catalog') return <AcademyCatalog key={section.id} content={section.content} />
          if (section.section_type === 'academy_methodology') return <AcademyMethodology key={section.id} content={section.content} />
          if (section.section_type === 'text_block') {
            const content = section.content as any
            return (
              <section key={section.id} className="py-20 px-6 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-brandRed">{content.title}</h2>
                <div className="text-textLight leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: content.body || 'Add text body' }} />
              </section>
            )
          }

          return <div key={section.id} className="p-10 border border-dashed border-white/20 m-6 text-textMuted rounded text-center">Unsupported Section Type: {section.section_type}</div>
        })}

        {(!sections || sections.length === 0) && (
          <div className="text-center py-32 px-6">
            <h1 className="text-4xl font-bold text-white mb-4">{page.title}</h1>
            <p className="text-textMuted">This page has no sections configured in the CMS yet.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
