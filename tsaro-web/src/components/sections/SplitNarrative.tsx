export default function SplitNarrative({ content = {} }: { content?: any }) {
  const image = content.image || '/hero-banner.png'
  const overline = content.overline || 'TACTICAL PRECISION & RIGOR'
  const badge = content.badge || 'ENTERPRISE STANDARD'
  const headline = content.headline || 'Committed to Unwavering Excellence & Acute Precision'
  const body = content.body || 'With a legacy deeply rooted in unwavering commitment and resolute pursuit of excellence, we employ methods and assets that guarantee acute precision and utmost professionalism in meeting security and defence needs.'
  const quote = content.quote || '“We work closely with clients to individually select the best executive protection expert to match your criteria, profile and personal concerns.”'
  const subbody = content.subbody || 'Amidst growing insecurity, Tsaro Global Defence offers superior protection for families, businesses, and assets. We bridge the gap with effective security solutions, ensuring peace of mind in an uncertain world.'
  const btnText = content.btnText || 'Connect With Our Team'
  const btnLink = content.btnLink || '/#contact'

  return (
    <section className="py-24 px-6 lg:px-12 bg-obsidian relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="w-full h-[450px] overflow-hidden relative">
              <img src={image} alt="Split Narrative Image" className="w-full h-full object-cover object-center brightness-95 contrast-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-6 left-6 right-6 bg-obsidian/85 backdrop-blur-md p-4 rounded border border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-textLight uppercase tracking-wider">{overline}</span>
                <span className="text-brandRed font-semibold">{badge}</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-6" dangerouslySetInnerHTML={{ __html: headline }} />
            <p className="text-textLight text-base sm:text-lg leading-relaxed mb-6 font-normal" dangerouslySetInnerHTML={{ __html: body }} />
            {quote && (
              <div className="bg-charcoal p-6 rounded-xl mb-8 border border-white/5">
                <p className="italic text-white text-base leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: quote }} />
              </div>
            )}
            {subbody && (
              <p className="text-textMuted text-sm leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: subbody }} />
            )}
            {btnText && (
              <div>
                <a href={btnLink} className="btn-primary-red inline-flex items-center gap-2 px-6 py-3 rounded text-xs font-semibold tracking-wider uppercase">
                  <span>{btnText}</span>
                  <span>→</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
