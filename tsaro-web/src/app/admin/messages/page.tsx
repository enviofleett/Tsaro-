import { createClient } from '@/utils/supabase/server'

export default async function MessagesDashboard() {
  const supabase = await createClient()

  const { data: messages, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Contact Messages</h1>
      </div>

      <div className="bg-charcoal border border-white/10 rounded-lg overflow-hidden">
        {error ? (
          <div className="p-10 text-center text-textMuted border border-dashed border-white/10 m-6 rounded-lg">
            <p className="text-brandRed mb-2 font-bold">Database Error Detected</p>
            <p className="text-sm">Could not load messages. Have you created the <code>contact_messages</code> table in Supabase yet?</p>
          </div>
        ) : messages && messages.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-textLight">
              <thead className="bg-deepGray/50 border-b border-white/10 text-xs font-mono uppercase tracking-wider text-textMuted">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Sender Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4 w-1/2">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {messages.map((msg: any) => (
                  <tr key={msg.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-textMuted">
                      {new Date(msg.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">{msg.name}</td>
                    <td className="px-6 py-4">
                      <a href={`mailto:${msg.email}`} className="hover:text-white transition-colors">{msg.email}</a>
                    </td>
                    <td className="px-6 py-4 text-sm text-textMuted whitespace-pre-wrap">
                      {msg.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center p-10 border border-dashed border-white/10 m-6 rounded-lg text-textMuted">
            No messages found yet.
          </div>
        )}
      </div>
    </div>
  )
}
