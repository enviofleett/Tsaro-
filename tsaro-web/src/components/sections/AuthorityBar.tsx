export default function AuthorityBar({ content }: { content?: any }) {
  const label = content?.label || 'OPERATIONAL ACCREDITATION & CAPABILITY'
  const items: string[] = (content?.items && content.items.length > 0)
    ? content.items
    : [
        'Dual USA & Nigeria Headquarters',
        'Certified Security Specialists',
        '24/7 Strategic Threat Monitoring',
        'Tactical Hardware Integration',
        'National Defense Advisory',
      ]

  return (
    <section className="bg-deepGray border-y border-white/5 py-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0 text-xs font-mono font-semibold tracking-widest text-textMuted uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brandRed"></span>
                <span>{label}</span>
            </div>

            <div className="w-full overflow-hidden relative flex">
                <div className="flex items-center gap-12 whitespace-nowrap animate-marquee">
                    {items.map((item: string, index: number) => (
                        <div key={`item-1-${index}`} className="flex items-center gap-2 text-textLight/80 font-medium text-xs uppercase tracking-wider">
                            <span className="text-textMuted">—</span> {item}
                        </div>
                    ))}

                    {/* Duplicate for infinite marquee */}
                    {items.map((item: string, index: number) => (
                        <div key={`item-2-${index}`} className="flex items-center gap-2 text-textLight/80 font-medium text-xs uppercase tracking-wider">
                            <span className="text-textMuted">—</span> {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
  )
}
