export default function CtaBanner({ content = {} }: { content?: any }) {
  const headline = content.headline || 'Superior Protection in an Uncertain World'
  const subheadline = content.subheadline || 'Amidst growing insecurity, Tsaro Global Defence offers superior protection for families, businesses, and assets. We bridge the gap with effective security solutions, ensuring peace of mind.'
  const btnText = content.btnText || 'Initiate Client Briefing'
  const btnLink = content.btnLink || '/#contact'

  return (
    <section className="py-24 px-6 lg:px-12 bg-obsidian relative">
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#212126] rounded-2xl p-8 sm:p-14 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3" dangerouslySetInnerHTML={{ __html: headline }} />
            <p className="text-textLight text-sm sm:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: subheadline }} />
          </div>
          <div className="flex-shrink-0">
            <a href={btnLink} className="btn-primary-red px-8 py-4 rounded text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-2">
              <span>{btnText}</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
