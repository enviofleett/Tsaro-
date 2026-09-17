export default function ClienteleHero({ content = {} }: { content?: any }) {
  const headline = content.headline || ''
  const subheadline = content.subheadline || ''
  const tags = content.tags || []

  return (
    <section className="relative pt-36 pb-20 px-6 lg:px-12 overflow-hidden tactical-mesh border-b border-white/5">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-8" dangerouslySetInnerHTML={{ __html: headline }} />
        <p className="text-lg sm:text-xl text-textLight leading-relaxed max-w-3xl mx-auto font-normal" dangerouslySetInnerHTML={{ __html: subheadline }} />

        {tags.length > 0 && (
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-xs font-mono text-textMuted border-t border-white/10 pt-8 max-w-xl mx-auto">
            {tags.map((tag: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brandRed"></span>
                <span>{tag}</span>
                {index < tags.length - 1 && <span className="ml-8">/</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
