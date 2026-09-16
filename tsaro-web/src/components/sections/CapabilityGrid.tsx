export default function CapabilityGrid({ content }: { content?: any }) {
  // Extract arms from content, or fallback to the new content with old layout
  const arms = content?.arms || [
    {
      title: "Strategy & Public Sector Advisory",
      description: "Policy design, regulatory structure, and the institutional groundwork a government needs settled before anything can be built on top of it.",
      link: "#",
      tag: "ARM 01"
    },
    {
      title: "Delivery, Procurement & Construction",
      description: "Programme management, supply chain, and construction oversight that carries a strategy through to something a minister can actually point to.",
      link: "#",
      tag: "ARM 02"
    },
    {
      title: "Institute",
      description: "A talent and convening arm — training programmes and a standing forum for the people who will run what we help build.",
      link: "/academy",
      tag: "ARM 03"
    }
  ]

  const svgs = [
    <svg key="1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>,
    <svg key="2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>,
    <svg key="3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
  ]

  return (
    <section id="capabilities" className="py-24 px-6 md:px-12 bg-obsidian relative">
        <div className="max-w-7xl mx-auto">
            
            {/* Header Section (Centered like original design) */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-3 mb-4 tracking-tight"
                    dangerouslySetInnerHTML={{ __html: content?.title || "Two disciplines. <br /> One accountable firm." }}
                />
                <p className="text-textMuted text-base sm:text-lg">
                    {content?.subtitle || "Most advisors stop at the strategy. We stay for the delivery."}
                </p>
            </div>

            {/* Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {arms.map((arm: any, index: number) => (
                    <div key={index} className="capability-card rounded-xl p-8 flex flex-col justify-between group">
                        <div>
                            <div className="w-12 h-12 rounded bg-[#161B22] border border-white/10 flex items-center justify-center text-brandRed mb-6">
                                {svgs[index % svgs.length]}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                {arm.title}
                            </h3>
                            <p className="text-textMuted text-sm leading-relaxed mb-6">
                                {arm.description}
                            </p>
                        </div>
                        <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-textMuted">
                            <a href={arm.link || "#"} className="hover:text-brandRed transition-colors uppercase tracking-widest">
                                EXPLORE
                            </a>
                            <a href={arm.link || "#"} className="text-brandRed font-bold group-hover:translate-x-1 transition-transform">
                                →
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}
