const fs = require('fs')

const imports = `
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
`

const renderBlocks = `
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
`

for (const filepath of ['src/app/page.tsx', 'src/app/[slug]/page.tsx']) {
  let code = fs.readFileSync(filepath, 'utf8')
  
  // 1. Insert imports below Footer
  code = code.replace("import Footer from '@/components/layout/Footer'", "import Footer from '@/components/layout/Footer'\n" + imports.trim())

  // 2. Insert render blocks below the last if statement
  const targetLine = "if (section.section_type === 'research_insights') return <ResearchInsights key={section.id} content={section.content} />"
  code = code.replace(targetLine, targetLine + "\n" + renderBlocks.trimEnd())

  fs.writeFileSync(filepath, code)
}
console.log('Successfully updated page.tsx and [slug]/page.tsx')
