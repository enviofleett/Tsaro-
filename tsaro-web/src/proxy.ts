import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request })

  // Only run Supabase session logic if env vars are configured
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const { updateSession } = await import('@/utils/supabase/middleware')
      response = await updateSession(request)
    } catch {
      // Supabase middleware failed — continue without session
    }
  }

  const url = request.nextUrl
  const hostname = request.headers.get('host') || ''

  // Handle subdomain routing for 'academy'
  if (hostname.startsWith('academy.')) {
    const rewriteUrl = new URL(`/academy${url.pathname === '/' ? '' : url.pathname}`, request.url)
    return NextResponse.rewrite(rewriteUrl, {
      headers: response.headers,
    })
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
