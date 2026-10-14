import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tsaroglobaldefence.com'
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()
      const { data: pages } = await supabase
        .from('pages')
        .select('slug, updated_at, no_index')
        .eq('is_published', true)
        .eq('is_archived', false)

      if (pages) {
        for (const page of pages) {
          if (!page.no_index && page.slug !== 'home') {
            routes.push({
              url: `${baseUrl}/${page.slug}`,
              lastModified: page.updated_at ? new Date(page.updated_at) : new Date(),
              changeFrequency: 'weekly',
              priority: 0.8,
            })
          }
        }
      }
    }
  } catch {
    // Return base routes if database is unreachable during build
  }

  return routes
}
