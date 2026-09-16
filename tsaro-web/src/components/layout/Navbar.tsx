import Link from 'next/link'

export default async function Navbar() {
  let navLinks: any[] = []

  // Only attempt Supabase fetch if env vars are configured
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const { createClient } = await import('@/utils/supabase/server')
      const supabase = await createClient()
      const { data: menu } = await supabase.from('menus').select('id').eq('name', 'main_header').maybeSingle()
      if (menu) {
        const { data: items } = await supabase
          .from('menu_items')
          .select('*')
          .eq('menu_id', menu.id)
          .order('sort_order')
        if (items) navLinks = items
      }
    } catch {
      // Supabase unavailable — fall through to static links
    }
  }

  // Fallback links if CMS is empty
  if (navLinks.length === 0) {
    navLinks = [
      { id: '1', label: 'What We Do', url: '/#capabilities' },
      { id: '2', label: 'Who We Serve', url: '/#about' },
      { id: '3', label: 'Insights', url: '/#intelligence' },
      { id: '4', label: 'Institute', url: '/#institute' },
      { id: '5', label: 'Careers', url: '/careers' },
    ]
  }

  // Separate top level and submenus
  const topLevel = navLinks.filter(link => !link.parent_id)

  return (
    <header className="glass-nav fixed top-0 left-0 w-full z-50 py-4 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
                <img src="/tsaro-icon.png" alt="Tsaro Icon" className="h-11 sm:h-12 w-auto object-contain group-hover:opacity-90 transition-opacity" />
                <img src="/tsaro-logo.png" alt="Tsaro Global Defence" className="h-7 sm:h-8 w-auto object-contain brightness-105 group-hover:opacity-90 transition-opacity" />
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-textLight">
                {topLevel.map(link => {
                    const subLinks = navLinks.filter(sub => sub.parent_id === link.id)
                    
                    return (
                        <div key={link.id} className="relative group">
                            <Link href={link.url} className="hover:text-white transition-colors py-2 flex items-center gap-1">
                                {link.label}
                                {subLinks.length > 0 && (
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                )}
                            </Link>
                            
                            {/* Dropdown Menu */}
                            {subLinks.length > 0 && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-charcoal border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col py-2">
                                    {subLinks.map(sub => (
                                        <Link key={sub.id} href={sub.url} className="px-4 py-2 hover:bg-white/5 text-textLight hover:text-white transition-colors">
                                            {sub.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}
            </nav>

            {/* Action */}
            <div className="flex items-center gap-4">
                <Link href="/#contact" className="hidden sm:flex text-sm font-bold text-white border-b border-brandRed hover:border-white transition-colors pb-1">
                    Request a Briefing
                </Link>
            </div>
        </div>
    </header>
  )
}
