import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function CareersDashboard() {
  const supabase = await createClient()

  const { data: applications, error } = await supabase
    .from('career_applications')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Career Applications</h1>
      </div>

      <div className="bg-charcoal border border-white/10 rounded-lg overflow-hidden">
        {error ? (
          <div className="p-10 text-center text-textMuted border border-dashed border-white/10 m-6 rounded-lg">
            <p className="text-brandRed mb-2 font-bold">Database Error Detected</p>
            <p className="text-sm">Could not load applications. Have you created the <code>career_applications</code> table in Supabase yet?</p>
          </div>
        ) : applications && applications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-textLight">
              <thead className="bg-deepGray/50 border-b border-white/10 text-xs font-mono uppercase tracking-wider text-textMuted">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Applicant Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Role Applied For</th>
                  <th className="px-6 py-4 text-right">CV Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {applications.map((app: any) => (
                  <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-textMuted">
                      {new Date(app.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">{app.name}</td>
                    <td className="px-6 py-4">
                      <a href={`mailto:${app.email}`} className="hover:text-white transition-colors">{app.email}</a>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">{app.phone}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-white">
                        {app.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {app.cv_url ? (
                        <a 
                          href={app.cv_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-brandRed/10 border border-brandRed/30 text-brandRed hover:bg-brandRed hover:text-white transition-all text-xs font-semibold uppercase tracking-wider"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                          Download CV
                        </a>
                      ) : (
                        <span className="text-xs text-textMuted italic">No CV Attached</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center p-10 border border-dashed border-white/10 m-6 rounded-lg text-textMuted">
            No career applications found yet.
          </div>
        )}
      </div>
    </div>
  )
}
