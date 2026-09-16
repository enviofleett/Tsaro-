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
      <header className="w-full bg-charcoal border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-brandRed mr-8">
                Tsaro CMS
              </h2>
              <nav className="hidden md:flex space-x-4">
                <Link href="/admin" className="px-3 py-2 rounded text-sm font-medium text-textLight hover:bg-white/5 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <Link href="/admin/pages" className="px-3 py-2 rounded text-sm font-medium text-textLight hover:bg-white/5 hover:text-white transition-colors">
                  Pages & Content
                </Link>
                <Link href="/admin/menus" className="px-3 py-2 rounded text-sm font-medium text-textLight hover:bg-white/5 hover:text-white transition-colors">
                  Menus
                </Link>
                <Link href="/admin/media" className="px-3 py-2 rounded text-sm font-medium text-textLight hover:bg-white/5 hover:text-white transition-colors">
                  Media Library
                </Link>
                <Link href="/admin/settings" className="px-3 py-2 rounded text-sm font-medium text-textLight hover:bg-white/5 hover:text-white transition-colors">
                  Global Settings
                </Link>
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
