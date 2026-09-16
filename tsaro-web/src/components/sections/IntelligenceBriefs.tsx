export default function IntelligenceBriefs({ content }: { content?: any }) {
  return (
    <section id="intelligence" className="py-24 px-6 md:px-12 bg-obsidian relative">
        <div className="max-w-7xl mx-auto">
            
            <div className="bg-charcoal rounded-2xl p-8 sm:p-12 md:p-16 border border-white/10 shadow-2xl relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    <div className="lg:col-span-6">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4 tracking-tight">
                            {content?.headline || "Intelligence Briefs & Policy Research"}
                        </h2>
                        <p className="text-textLight text-base leading-relaxed mb-6">
                            {content?.subheadline || "Stay ahead of the shifting geopolitical and economic landscape. Download our comprehensive analysis on national security frameworks and strategic risk roadmaps."}
                        </p>
                        
                        <div className="space-y-3 font-mono text-xs text-textMuted">
                            <div className="flex items-center gap-2">
                                <span className="text-brandRed font-bold">✓</span> {content?.bullet_1 || "Regional threat-actor profiling and asymmetric risk analysis."}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-brandRed font-bold">✓</span> {content?.bullet_2 || "Critical infrastructure resilience recommendations."}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-brandRed font-bold">✓</span> {content?.bullet_3 || "Direct executive delivery for verified institutional inquiries."}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-6 bg-obsidian/75 backdrop-blur-sm p-8 rounded-xl border border-white/10">
                        <form id="leadCaptureForm" className="space-y-5">
                            <div>
                                <label htmlFor="fullName" className="block text-xs font-mono font-medium text-textLight uppercase tracking-wider mb-2">Full Name</label>
                                <input type="text" id="fullName" required placeholder="e.g. Samuel Adeyemi" className="w-full px-4 py-3 bg-charcoal/70 border border-white/10 rounded text-white placeholder-textMuted/40 text-sm focus:outline-none focus:border-brandRed transition-colors" />
                            </div>

                            <div>
                                <label htmlFor="corpEmail" className="block text-xs font-mono font-medium text-textLight uppercase tracking-wider mb-2">Official / Corporate Email</label>
                                <input type="email" id="corpEmail" required placeholder="official@organization.com" className="w-full px-4 py-3 bg-charcoal/70 border border-white/10 rounded text-white placeholder-textMuted/40 text-sm focus:outline-none focus:border-brandRed transition-colors" />
                            </div>

                            <button type="button" className="btn-primary-red w-full py-3.5 rounded text-sm font-semibold tracking-wide uppercase flex items-center justify-center gap-2">
                                <span>Download Strategic Brief</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                                </svg>
                            </button>

                            <p className="text-[11px] text-textMuted text-center font-mono">
                                Protected by enterprise data privacy standards. Confidential inquiry handling.
                            </p>
                        </form>
                    </div>

                </div>
            </div>

        </div>
    </section>
  )
}
