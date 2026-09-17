export default function Commitments({ content }: { content?: any }) {
  const headline = content?.headline || ""
  const subtitle = content?.subtitle || content?.text_1 || ""
  const items = (content?.items && content.items.length > 0)
    ? content.items : []

  return (
    <section id="commitments" className="py-24 px-6 md:px-12 bg-obsidian relative">
        <div className="max-w-7xl mx-auto">
            
            {/* Header Section */}
            <div className="flex flex-col items-center text-center mb-20 gap-4 max-w-3xl mx-auto">
                <h2 
                    className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold tracking-tighter text-white leading-[1.08]"
                    dangerouslySetInnerHTML={{ __html: headline }}
                />
                <p className="text-white/80 text-lg sm:text-xl leading-relaxed">
                    {subtitle}
                </p>
            </div>

            {/* 2x2 Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                {items.map((item: any, index: number) => (
                    <div key={index} className="border-t border-white/10 pt-8">
                        <div className="text-[11px] font-mono text-brandRed font-semibold tracking-widest uppercase mb-6">
                            {String(index + 1).padStart(2, '0')}
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">
                            {item.title}
                        </h3>
                        <p className="text-textMuted text-sm leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}
