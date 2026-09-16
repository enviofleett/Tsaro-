import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function BookingsDashboard() {
  const supabase = await createClient()

  const { data: bookings, error } = await supabase
    .from('academy_bookings')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Academy Bookings</h1>
      </div>

      <div className="bg-charcoal border border-white/10 rounded-lg overflow-hidden">
        {bookings && bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-textLight">
              <thead className="bg-deepGray/50 border-b border-white/10 text-xs font-mono uppercase tracking-wider text-textMuted">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Participant Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Course Ref</th>
                  <th className="px-6 py-4">Course Title</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bookings.map((b: any) => (
                  <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-textMuted">
                      {new Date(b.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">{b.candidate_name}</td>
                    <td className="px-6 py-4">{b.candidate_email}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-white">
                        {b.course_code}
                      </span>
                    </td>
                    <td className="px-6 py-4 truncate max-w-[250px]">{b.course_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center p-10 border border-dashed border-white/10 m-6 rounded-lg text-textMuted">
            No academy bookings found.
          </div>
        )}
      </div>
    </div>
  )
}
