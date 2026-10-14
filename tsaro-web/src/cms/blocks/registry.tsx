import { sanitizeHtml } from '@/lib/validation/sanitize';
import { BlockDefinition } from './types';

// Import all sections
import HeroBanner from '@/components/sections/HeroBanner'
import AuthorityBar from '@/components/sections/AuthorityBar'
import CapabilityGrid from '@/components/sections/CapabilityGrid'
import WhereWeOperate from '@/components/sections/WhereWeOperate'
import OperationalDifferentiator from '@/components/sections/OperationalDifferentiator'
import ContactSection from '@/components/sections/ContactSection'
import ResearchInsights from '@/components/sections/ResearchInsights'
import Commitments from '@/components/sections/Commitments'
import TheInstitute from '@/components/sections/TheInstitute'
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


import HeroBlock from '@/components/blocks/HeroBlock'
import TextImageBlock from '@/components/blocks/TextImageBlock'
import RichContentBlock from '@/components/blocks/RichContentBlock'
import CtaBlock from '@/components/blocks/CtaBlock'
import CardsBlock from '@/components/blocks/CardsBlock'
import StatisticsBlock from '@/components/blocks/StatisticsBlock'
import QuoteBlock from '@/components/blocks/QuoteBlock'
import GalleryBlock from '@/components/blocks/GalleryBlock'

export const blockRegistry: Record<string, BlockDefinition> = {

  hero: {
    type: 'hero',
    name: 'Hero Banner',
    description: 'Main page banner with various layout options',
    variants: ['center', 'left', 'bg_image', 'bg_video', 'split_text_left', 'split_image_left'],
    renderComponent: ({ content }) => <HeroBlock content={content} />
  },
  text_image: {
    type: 'text_image',
    name: 'Text & Image',
    description: 'Text, image and optional call to action',
    variants: ['image_right', 'image_left', '50_50', '60_40', '40_60'],
    renderComponent: ({ content }) => <TextImageBlock content={content} />
  },
  rich_content: {
    type: 'rich_content',
    name: 'Rich Content / Editorial',
    description: 'Formatted text block with optional headings',
    variants: ['standard', 'narrow', 'wide', 'two_column'],
    renderComponent: ({ content }) => <RichContentBlock content={content} />
  },
  cta: {
    type: 'cta',
    name: 'Call to Action',
    description: 'Call to action banner to drive conversions',
    variants: ['center', 'compact', 'image', 'full_width'],
    renderComponent: ({ content }) => <CtaBlock content={content} />
  },
  cards: {
    type: 'cards',
    name: 'Cards Grid',
    description: 'Grid of individual cards with images and text',
    variants: ['2_col', '3_col', '4_col'],
    renderComponent: ({ content }) => <CardsBlock content={content} />
  },
  statistics: {
    type: 'statistics',
    name: 'Statistics',
    description: 'Visual statistics or data points',
    variants: ['3_stats', '4_stats'],
    renderComponent: ({ content }) => <StatisticsBlock content={content} />
  },
  quote: {
    type: 'quote',
    name: 'Quote / Statement',
    description: 'Highlighted quote or mission statement',
    variants: ['standard', 'large_statement', 'with_attribution'],
    renderComponent: ({ content }) => <QuoteBlock content={content} />
  },
  gallery: {
    type: 'gallery',
    name: 'Image Gallery',
    description: 'Collection of images',
    variants: ['single', 'two_column', 'grid', 'gallery'],
    renderComponent: ({ content }) => <GalleryBlock content={content} />
  },

  hero_banner: {
    type: 'hero_banner',
    name: 'Hero Banner',
    description: 'Main landing banner for a page',
    renderComponent: ({ content }) => <HeroBanner content={content} />
  },
  authority_bar: {
    type: 'authority_bar',
    name: 'Authority Bar',
    description: 'Displays trust logos or statistics',
    renderComponent: ({ content }) => <AuthorityBar content={content} />
  },
  capability_grid: {
    type: 'capability_grid',
    name: 'Capability Grid',
    description: 'Grid of services or capabilities',
    renderComponent: ({ content }) => <CapabilityGrid content={content} />
  },
  where_we_operate: {
    type: 'where_we_operate',
    name: 'Where We Operate',
    description: 'Global reach or locations map/list',
    renderComponent: ({ content }) => <WhereWeOperate content={content} />
  },
  operational_differentiator: {
    type: 'operational_differentiator',
    name: 'Operational Capability',
    description: 'Key differentiators section',
    renderComponent: ({ content }) => <OperationalDifferentiator content={content} />
  },
  commitments: {
    type: 'commitments',
    name: 'Commitments',
    description: 'Company commitments and promises',
    renderComponent: ({ content }) => <Commitments content={content} />
  },
  institute: {
    type: 'institute',
    name: 'The Institute',
    description: 'Information about the research institute',
    renderComponent: ({ content }) => <TheInstitute content={content} />
  },
  contact_section: {
    type: 'contact_section',
    name: 'Contact Form',
    description: 'Contact form and details',
    renderComponent: ({ content }) => <ContactSection content={content} />
  },
  intelligence_briefs: {
    type: 'intelligence_briefs',
    name: 'Intelligence Briefs',
    description: 'Contact or subscription form for briefs',
    renderComponent: ({ content }) => <ContactSection content={content} />
  },
  research_insights: {
    type: 'research_insights',
    name: 'Research Insights',
    description: 'Recent research posts or articles',
    renderComponent: ({ content }) => <ResearchInsights content={content} />
  },
  about_hero: {
    type: 'about_hero',
    name: 'About Hero',
    description: 'Hero section specific for About page',
    renderComponent: ({ content }) => <AboutHero content={content} />
  },
  split_narrative: {
    type: 'split_narrative',
    name: 'Text & Image',
    description: 'Image and text side-by-side',
    variants: ['image_left', 'image_right'],
    renderComponent: ({ content }) => <SplitNarrative content={content} />
  },
  core_values: {
    type: 'core_values',
    name: 'Core Values',
    description: 'List of company core values',
    renderComponent: ({ content }) => <CoreValues content={content} />
  },
  clientele_hero: {
    type: 'clientele_hero',
    name: 'Clientele Hero',
    description: 'Hero section for Clientele page',
    renderComponent: ({ content }) => <ClienteleHero content={content} />
  },
  client_sectors: {
    type: 'client_sectors',
    name: 'Client Sectors Grid',
    description: 'Grid of sectors the company serves',
    renderComponent: ({ content }) => <ClientSectors content={content} />
  },
  pull_quote: {
    type: 'pull_quote',
    name: 'Highlighted Quote',
    description: 'Large highlighted quote block',
    variants: ['dark', 'light'],
    renderComponent: ({ content }) => <PullQuote content={content} />
  },
  cta_banner: {
    type: 'cta_banner',
    name: 'Call to Action (CTA)',
    description: 'Call to action banner',
    renderComponent: ({ content }) => <CtaBanner content={content} />
  },
  academy_hero: {
    type: 'academy_hero',
    name: 'Academy Hero',
    description: 'Hero section for the Academy page',
    renderComponent: ({ content }) => <AcademyHero content={content} />
  },
  academy_catalog: {
    type: 'academy_catalog',
    name: 'Academy Course Catalog',
    description: 'Catalog of academy courses',
    renderComponent: ({ content }) => <AcademyCatalog content={content} />
  },
  academy_methodology: {
    type: 'academy_methodology',
    name: 'Academy Methodology',
    description: 'Learning methodology breakdown',
    renderComponent: ({ content }) => <AcademyMethodology content={content} />
  },
  academy_flagship: {
    type: 'academy_flagship',
    name: 'Academy Flagship Highlight',
    description: 'Highlight a specific flagship course',
    renderComponent: ({ content, allSections }) => {
      let favoriteContent = { ...content };
      if (allSections) {
        const catalogSection = allSections.find((s: Record<string, any>) => s.section_type === 'academy_catalog');
        if (catalogSection && catalogSection.content?.programs) {
          const favorite = catalogSection.content.programs.find((p: Record<string, any>) => p.isFavorite);
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
            };
          }
        }
      }
      return <AcademyFlagship content={favoriteContent} />;
    }
  },
  text_block: {
    type: 'text_block',
    name: 'Text Block',
    description: 'Standard text block with a title',
    variants: ['standard', 'wide'],
    renderComponent: ({ content }) => (
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-brandRed">{content.title}</h2>
        <div className="text-textLight leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: sanitizeHtml(content.body || 'Add text body') }} />
      </section>
    )
  }
};
