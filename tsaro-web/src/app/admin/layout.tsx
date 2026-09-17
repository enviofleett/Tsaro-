import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { logout } from '@/app/login/actions'
import Link from 'next/link'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Check if user has 'admin' role in user_roles table
  /*
  const { data: roleData } = await supabase.from('user_roles').select('role').eq('user_id', user.id).maybeSingle();
  if (roleData?.role !== 'admin') { 
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-2xl font-bold text-brandRed mb-4">Access Denied</h1>
          <p className="text-textLight mb-6">You do not have administrative privileges.</p>
          <form action={logout}>
            <button className="px-6 py-2 bg-brandRed text-white rounded hover:bg-red-700 transition">Sign Out</button>
          </form>
        </div>
      </div>
    )
  }
  */

  return (
    <div className="min-h-screen bg-obsidian text-white flex flex-col">
      {/* Top Header Navigation */}
      <header className="w-full bg-charcoal border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-brandRed mr-8">
                Tsaro CMS
              </h2>
              
              <nav className="hidden md:flex space-x-2">
                <Link href="/admin" className="flex items-center gap-2 px-3 py-2 rounded text-sm font-medium text-textLight hover:bg-white/5 hover:text-white transition-colors whitespace-nowrap">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                  Dashboard
                </Link>

                {/* Content Dropdown */}
                <div className="relative group">
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded text-sm font-medium text-textLight hover:bg-white/5 hover:text-white transition-colors whitespace-nowrap">
                    Content
                    <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <div className="absolute left-0 top-full pt-1 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <div className="bg-charcoal border border-white/10 rounded shadow-xl overflow-hidden py-1">
                      <Link href="/admin/pages" className="flex items-center gap-3 px-4 py-2.5 text-sm text-textLight hover:bg-white/5 hover:text-white transition-colors">
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        Pages
                      </Link>
                      <Link href="/admin/menus" className="flex items-center gap-3 px-4 py-2.5 text-sm text-textLight hover:bg-white/5 hover:text-white transition-colors">
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        Menus
                      </Link>
                      <Link href="/admin/media" className="flex items-center gap-3 px-4 py-2.5 text-sm text-textLight hover:bg-white/5 hover:text-white transition-colors">
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        Media Library
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Submissions Dropdown */}
                <div className="relative group">
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded text-sm font-medium text-textLight hover:bg-white/5 hover:text-white transition-colors whitespace-nowrap">
                    Submissions
                    <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <div className="absolute left-0 top-full pt-1 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <div className="bg-charcoal border border-white/10 rounded shadow-xl overflow-hidden py-1">
                      <Link href="/admin/bookings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-textLight hover:bg-white/5 hover:text-white transition-colors">
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        Academy Bookings
                      </Link>
                      <Link href="/admin/careers" className="flex items-center gap-3 px-4 py-2.5 text-sm text-textLight hover:bg-white/5 hover:text-white transition-colors">
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        Careers Applications
                      </Link>
                      <Link href="/admin/messages" className="flex items-center gap-3 px-4 py-2.5 text-sm text-textLight hover:bg-white/5 hover:text-white transition-colors">
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        Contact Messages
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Settings Dropdown */}
                <div className="relative group">
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded text-sm font-medium text-textLight hover:bg-white/5 hover:text-white transition-colors whitespace-nowrap">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    Settings
                    <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <div className="absolute right-0 top-full pt-1 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <div className="bg-charcoal border border-white/10 rounded shadow-xl overflow-hidden py-1">
                      <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-textLight hover:bg-white/5 hover:text-white transition-colors">
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Global Settings
                      </Link>
                      <Link href="/admin/templates" className="flex items-center gap-3 px-4 py-2.5 text-sm text-textLight hover:bg-white/5 hover:text-white transition-colors">
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
                        Page Templates
                      </Link>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <p className="hidden sm:block text-xs text-textMuted">{user.email}</p>
              <form action={logout}>
                <button className="px-3 py-1.5 text-xs font-medium text-brandRed border border-brandRed/30 hover:bg-brandRed/10 rounded transition-colors flex items-center justify-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative tactical-mesh">
        <div className="absolute inset-0 bg-gradient-to-br from-obsidian via-transparent to-obsidian/80 pointer-events-none"></div>
        <div className="relative z-10 max-w-7xl mx-auto w-full p-6 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  )
}
