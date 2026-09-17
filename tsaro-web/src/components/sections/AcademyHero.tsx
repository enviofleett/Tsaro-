export default function AcademyHero({ content = {} }: { content?: any }) {
  const headline = content.headline || ''
  const body = content.body || ''
  const primaryBtn = content.primaryBtn || { text: '', link: '' }
  const secondaryBtn = content.secondaryBtn || { text: '', link: '' }
  const facts = content.facts || []

  return (
    <section className="relative pt-36 pb-24 px-6 lg:px-12 border-b border-white/5 bg-[#1A1A17]">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tight leading-[1.1] mb-6" dangerouslySetInnerHTML={{ __html: headline }} />
          <p className="text-lg sm:text-xl text-textLight leading-relaxed font-sans mb-8" dangerouslySetInnerHTML={{ __html: body }} />
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {primaryBtn && primaryBtn.text && (
              <a href={primaryBtn.link} className="btn-primary-red px-6 py-3.5 rounded-lg text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-2">
                <span>{primaryBtn.text}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
            )}
            {secondaryBtn && secondaryBtn.text && (
              <a href={secondaryBtn.link} className="px-6 py-3.5 rounded-lg border border-white/15 hover:border-white/30 bg-white/[0.02] text-xs font-semibold tracking-wider uppercase text-white transition-colors">
                {secondaryBtn.text}
              </a>
            )}
          </div>
        </div>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/10">
          {facts.map((f: any, i: number) => (
            <div key={i}>
              <div className="text-2xl sm:text-3xl font-sans font-bold text-white">{f.value}</div>
              <div className="text-xs text-textMuted mt-1">{f.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
