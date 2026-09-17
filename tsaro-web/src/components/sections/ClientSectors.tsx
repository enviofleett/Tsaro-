export default function ClientSectors({ content = {} }: { content?: any }) {
  const sectors = content.sectors || []

  return (
    <section className="py-24 px-6 lg:px-12 bg-obsidian relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {sectors.map((sector: any, index: number) => (
            <div key={index} className="rounded-2xl p-8 sm:p-12 flex flex-col justify-between bg-[#212126] border border-white/10 shadow-2xl">
              <div>
                <div className="w-14 h-14 rounded-lg bg-[#18181B] border border-white/10 flex items-center justify-center text-brandRed mb-8">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-5 tracking-tight">{sector.title}</h2>
                <p className="text-textLight text-base leading-relaxed mb-8">{sector.desc}</p>
                <div className="space-y-3 font-mono text-xs text-textMuted border-t border-white/5 pt-6">
                  {sector.bullets?.map((b: string, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-brandRed font-bold">✓</span> {b}
                    </div>
                  ))}
                </div>
                {sector.logosImage && (
                  <div className="mt-8 pt-8 border-t border-white/5">
                    <span className="text-xs font-mono text-textMuted uppercase block mb-4">{sector.logosLabel}</span>
                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 flex justify-center items-center">
                      <img src={sector.logosImage} alt="Logos" className="w-full h-auto object-contain max-h-48 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] opacity-95 hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-mono text-textMuted uppercase">{sector.footerTag}</span>
                <span className="text-brandRed font-bold">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
