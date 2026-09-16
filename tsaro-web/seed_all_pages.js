const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function seedPages() {
  console.log('Seeding pages...')

  const pagesToCreate = [
    { title: 'Home', slug: 'home', is_published: true },
    { title: 'About Us', slug: 'about', is_published: true },
    { title: 'Tsaro Academy', slug: 'academy', is_published: true },
    { title: 'Our Clientele', slug: 'clientele', is_published: true },
    { title: 'Products & Services', slug: 'products-services', is_published: true },
  ]

  for (const page of pagesToCreate) {
    // Check if exists
    const { data: existing } = await supabase.from('pages').select('id').eq('slug', page.slug).maybeSingle()
    if (existing) {
      console.log(`Page '${page.slug}' already exists. Skipping.`)
      continue
    }

    // Create Page
    const { data: insertedPage, error: pageErr } = await supabase.from('pages').insert([page]).select('id').single()
    if (pageErr) {
      console.error(`Failed to create page ${page.slug}:`, pageErr.message)
      continue
    }
    const pageId = insertedPage.id
    console.log(`Created page: ${page.slug}`)

    // Create Sections based on slug
    let sections = []

    if (page.slug === 'home') {
      sections = [
        { page_id: pageId, section_type: 'hero_banner', sort_order: 1, content: {} },
        { page_id: pageId, section_type: 'authority_bar', sort_order: 2, content: {} },
        { page_id: pageId, section_type: 'capability_grid', sort_order: 3, content: {} },
        { page_id: pageId, section_type: 'where_we_operate', sort_order: 4, content: {} },
        { page_id: pageId, section_type: 'research_insights', sort_order: 5, content: {} },
        { page_id: pageId, section_type: 'operational_differentiator', sort_order: 6, content: {} },
        { page_id: pageId, section_type: 'commitments', sort_order: 7, content: {} },
        { page_id: pageId, section_type: 'institute', sort_order: 8, content: {} },
        { page_id: pageId, section_type: 'intelligence_briefs', sort_order: 9, content: {} }
      ]
    } else if (page.slug === 'about') {
      sections = [
        { page_id: pageId, section_type: 'about_hero', sort_order: 1, content: {} },
        { page_id: pageId, section_type: 'split_narrative', sort_order: 2, content: {} },
        { page_id: pageId, section_type: 'core_values', sort_order: 3, content: {} }
      ]
    } else if (page.slug === 'clientele') {
      sections = [
        { page_id: pageId, section_type: 'clientele_hero', sort_order: 1, content: {} },
        { page_id: pageId, section_type: 'client_sectors', sort_order: 2, content: {} },
        { page_id: pageId, section_type: 'pull_quote', sort_order: 3, content: {} },
        { page_id: pageId, section_type: 'cta_banner', sort_order: 4, content: {} }
      ]
    } else if (page.slug === 'academy') {
      sections = [
        { page_id: pageId, section_type: 'academy_hero', sort_order: 1, content: {} },
        { page_id: pageId, section_type: 'academy_flagship', sort_order: 2, content: {} },
        { page_id: pageId, section_type: 'academy_catalog', sort_order: 3, content: {} },
        { page_id: pageId, section_type: 'academy_methodology', sort_order: 4, content: {} }
      ]
    } else if (page.slug === 'products-services') {
      // Products Services used a generic hero and capability grid
      sections = [
        { page_id: pageId, section_type: 'hero_banner', sort_order: 1, content: {
          headline: 'Tactical Hardware & <span class="text-brandRed">Strategic Services</span>',
          subheadline: 'End-to-end security procurement and risk advisory for complex operational environments.'
        }},
        { page_id: pageId, section_type: 'capability_grid', sort_order: 2, content: {} },
        { page_id: pageId, section_type: 'cta_banner', sort_order: 3, content: {} }
      ]
    }

    const { error: secErr } = await supabase.from('page_sections').insert(sections)
    if (secErr) {
      console.error(`Failed to insert sections for ${page.slug}:`, secErr.message)
    } else {
      console.log(`Inserted ${sections.length} sections for ${page.slug}`)
    }
  }

  console.log('Done seeding.')
}

seedPages()
