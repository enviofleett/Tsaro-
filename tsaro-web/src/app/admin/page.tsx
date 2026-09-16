import { createClient } from '@/utils/supabase/server'

export default async function AdminDashboard() {
  let pageCount = 0
  let menuCount = 0
  let sectionCount = 0
  let recentSections: any[] = []

  try {
    const supabase = await createClient()

    const { count: pc } = await supabase.from('pages').select('id', { count: 'exact', head: true })
    pageCount = pc || 0

    const { count: mc } = await supabase.from('menus').select('id', { count: 'exact', head: true })
    menuCount = mc || 0

    const { count: sc } = await supabase.from('page_sections').select('id', { count: 'exact', head: true })
    sectionCount = sc || 0

    const { data: recent } = await supabase
      .from('page_sections')
      .select('id, section_type, sort_order, created_at, pages(title)')
      .order('created_at', { ascending: false })
      .limit(5)
    recentSections = recent || []
  } catch {
    // Graceful fallback — show zeros
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Command Center</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="capability-card p-6 rounded-lg">
          <h3 className="text-textMuted text-sm font-medium uppercase tracking-wider mb-2">Total Pages</h3>
          <p className="text-4xl font-bold text-white">{pageCount}</p>
        </div>
        
        <div className="capability-card p-6 rounded-lg">
          <h3 className="text-textMuted text-sm font-medium uppercase tracking-wider mb-2">Active Menus</h3>
          <p className="text-4xl font-bold text-white">{menuCount}</p>
        </div>

        <div className="capability-card p-6 rounded-lg">
          <h3 className="text-textMuted text-sm font-medium uppercase tracking-wider mb-2">Total Sections</h3>
          <p className="text-4xl font-bold text-white">{sectionCount}</p>
        </div>
        
        <div className="capability-card p-6 rounded-lg">
          <h3 className="text-textMuted text-sm font-medium uppercase tracking-wider mb-2">System Status</h3>
          <p className="text-2xl font-bold text-green-500 flex items-center gap-2 mt-2">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
            Operational
          </p>
        </div>
      </div>

      <div className="mt-10 bg-charcoal border border-white/10 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-white">Recent Activity</h2>
        {recentSections.length > 0 ? (
          <div className="space-y-3">
            {recentSections.map((s) => (
              <div key={s.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-4">
                  <span className="text-[11px] font-mono text-brandRed font-semibold tracking-wider uppercase bg-brandRed/10 px-2 py-1 rounded">
                    {s.section_type?.replace(/_/g, ' ')}
                  </span>
                  <span className="text-sm text-textLight">
                    {(s as any).pages?.title || 'Unknown Page'}
                  </span>
                </div>
                <span className="text-xs text-textMuted font-mono">
                  {s.created_at ? new Date(s.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-textLight text-sm">No recent activity detected. The CMS is ready for configuration.</p>
        )}
      </div>
    </div>
  )
}
