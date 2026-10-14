import { Metadata } from 'next'
import { PageRenderer } from '@/cms/blocks/renderer'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { notFound } from 'next/navigation'


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const { createClient } = await import('@/lib/supabase/server');
  const supabase = await createClient();
  
  // We only fetch published pages for metadata to prevent indexing of drafts
  const { data: page } = await supabase.from('pages')
    .select('title, meta_description, canonical_url, social_image, no_index')
    .eq('slug', slug)
    .eq('is_published', true)
    .eq('is_archived', false)
    .single();

  if (!page) {
    return {
      title: 'Page Not Found | Tsaro',
    }
  }

  const url = page.canonical_url || `https://tsaroglobaldefence.com/${slug}`;

  return {
    title: `${page.title} | Tsaro Global Defence`,
    description: page.meta_description || 'Tsaro Global Defence',
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: page.title,
      description: page.meta_description || undefined,
      url: url,
      images: page.social_image ? [{ url: page.social_image }] : [{ url: '/hero-banner.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.title} | Tsaro Global Defence`,
      description: page.meta_description || undefined,
      images: page.social_image ? [page.social_image] : ['/hero-banner.png'],
    },
    robots: {
      index: !page.no_index,
      follow: !page.no_index,
    }
  }
}

export default async function DynamicPage({ params, searchParams }: { params: { slug: string }, searchParams: { preview?: string, preview_token?: string } }) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const { createAdminClient } = await import('@/lib/supabase/server');
  const { generatePreviewToken } = await import('@/lib/preview');
  
  const supabase = await createClient();
  const adminSupabase = await createAdminClient();

  // Try fetching public page first
  let { data: page } = await supabase.from('pages').select('*').eq('slug', slug).single();
  let isAdmin = false;
  let isAuthorizedPreview = false;

  if (resolvedSearchParams.preview === 'true') {
    // Check if they are logged in as admin
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) {
      const { data: roles } = await supabase.from('user_roles').select('role').eq('user_id', session.user.id).single()
      if (roles?.role === 'admin') isAdmin = true;
    }

    // If page is not found via normal fetch, use admin fetch to check if it's a draft
    if (!page) {
      const { data: draftPage } = await adminSupabase.from('pages').select('*').eq('slug', slug).single();
      if (draftPage) {
        page = draftPage;
        
        // Check if token matches
        const expectedToken = generatePreviewToken(page.id);
        if (resolvedSearchParams.preview_token === expectedToken) {
          isAuthorizedPreview = true;
        }
      }
    }
  }

  if (!page || (!page.is_published && !isAdmin && !isAuthorizedPreview) || page.is_archived) {
    notFound()
  }

  // Fetch sections. Use admin client if previewing draft, else public client.
  const fetchClient = (isAdmin || isAuthorizedPreview) ? adminSupabase : supabase;
  const { data: sections } = await fetchClient.from('page_sections').select('*').eq('page_id', page.id).order('sort_order');

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        {/* Render CMS Sections */}
        <PageRenderer sections={sections || []} />

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
