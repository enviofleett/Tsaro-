import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function ClientelePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Clientele Hero Section */}
        <section className="relative pt-36 pb-20 px-6 lg:px-12 overflow-hidden tactical-mesh border-b border-white/5">
            <div className="max-w-5xl mx-auto text-center">

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-8">
                    Trusted by Sovereign Entities & <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-brandRed">Global Corporations.</span>
                </h1>

                <p className="text-lg sm:text-xl text-textLight leading-relaxed max-w-3xl mx-auto font-normal">
                    We provide top-notch products and services to government agencies and private companies globally. Our engagements reinforce our position as a full-suite security and defence contractor, trusted across critical operations worldwide.
                </p>

                <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-xs font-mono text-textMuted border-t border-white/10 pt-8 max-w-xl mx-auto">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brandRed"></span>
                        <span>GOVERNMENT SECTORS</span>
                    </div>
                    <span>/</span>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brandRed"></span>
                        <span>PRIVATE ENTERPRISE</span>
                    </div>
                    <span>/</span>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brandRed"></span>
                        <span>CRITICAL INFRASTRUCTURE</span>
                    </div>
                </div>

            </div>
        </section>

        {/* Client Sectors (Government vs Private) */}
        <section className="py-24 px-6 lg:px-12 bg-obsidian relative">
            <div className="max-w-7xl mx-auto">
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    
                    {/* Sector 1: Government Agencies and Offices */}
                    <div className="rounded-2xl p-8 sm:p-12 flex flex-col justify-between bg-[#212126] border border-white/10 shadow-2xl">
                        <div>
                            <div className="w-14 h-14 rounded-lg bg-[#18181B] border border-white/10 flex items-center justify-center text-brandRed mb-8">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                </svg>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-5 tracking-tight">
                                Government Agencies and Offices
                            </h2>

                            <p className="text-textLight text-base leading-relaxed mb-8">
                                Our engagements with government agencies and offices reinforces our position as a full-suite security and defence contractor. From providing tactical security equipment to offering strategic security consultancy, we work closely with government entities to strengthen their operations.
                            </p>

                            <div className="space-y-3 font-mono text-xs text-textMuted border-t border-white/5 pt-6">
                                <div className="flex items-center gap-3">
                                    <span className="text-brandRed font-bold">✓</span> Tactical Security Hardware & Equipment Provisioning
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-brandRed font-bold">✓</span> Strategic Defence Consultancy & Risk Advisory
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-brandRed font-bold">✓</span> Institutional Operational Strengthening & Preparedness
                                </div>
                            </div>

                            {/* Government Logos block */}
                            <div className="mt-8 pt-8 border-t border-white/5">
                                <span className="text-xs font-mono text-textMuted uppercase block mb-4">Trusted By Sovereign Entities:</span>
                                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 flex justify-center items-center">
                                    <img src="/gov-logos.png" alt="Government Agencies Logos" className="w-full h-auto object-contain max-h-48 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] opacity-95 hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
                            <span className="text-xs font-mono text-textMuted uppercase">GOV & SOVEREIGN ACCREDITATION</span>
                            <span className="text-brandRed font-bold">→</span>
                        </div>
                    </div>

                    {/* Sector 2: Private Corporations and Businesses */}
                    <div className="rounded-2xl p-8 sm:p-12 flex flex-col justify-between bg-[#212126] border border-white/10 shadow-2xl">
                        <div>
                            <div className="w-14 h-14 rounded-lg bg-[#18181B] border border-white/10 flex items-center justify-center text-brandRed mb-8">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-5 tracking-tight">
                                Private Corporations and Businesses
                            </h2>

                            <p className="text-textLight text-base leading-relaxed mb-8">
                                Leading corporations and businesses turn to us for comprehensive security solutions. Whether it's securing critical infrastructure, implementing cybersecurity measures, or ensuring the safety of their workforce, we collaborate with businesses to mitigate risks and safeguard their interests.
                            </p>

                            <div className="space-y-3 font-mono text-xs text-textMuted border-t border-white/5 pt-6">
                                <div className="flex items-center gap-3">
                                    <span className="text-brandRed font-bold">✓</span> Critical Infrastructure Defense & Monitoring
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-brandRed font-bold">✓</span> Workforce Safety, Executive Escort & Perimeter Systems
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-brandRed font-bold">✓</span> Enterprise Threat Mitigation & Risk Safeguarding
                                </div>
                            </div>

                            {/* Private Logos block */}
                            <div className="mt-8 pt-8 border-t border-white/5">
                                <span className="text-xs font-mono text-textMuted uppercase block mb-4">Trusted By Private Enterprise:</span>
                                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 flex justify-center items-center">
                                    <img src="/private-logos.png" alt="Private Corporations Logos" className="w-full h-auto object-contain max-h-48 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] opacity-95 hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
                            <span className="text-xs font-mono text-textMuted uppercase">MULTINATIONAL & PRIVATE SECTOR</span>
                            <span className="text-brandRed font-bold">→</span>
                        </div>
                    </div>

                </div>

            </div>
        </section>

        {/* Global Expertise Pull-Quote Callout */}
        <section className="py-20 px-6 lg:px-12 bg-charcoal/40 border-y border-white/5 relative bg-[#212126]">
            <div className="max-w-5xl mx-auto text-center">
                
                <div className="w-12 h-12 rounded-full bg-[#18181B] border border-white/10 flex items-center justify-center text-brandRed mx-auto mb-8">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                </div>

                <blockquote className="text-xl sm:text-2xl md:text-3xl font-medium text-white leading-relaxed mb-8 max-w-4xl mx-auto">
                    “Our team brings decades of experience in navigating complex security landscapes across the globe. This broad expertise allows us to address contemporary threats and deliver tailored solutions to clients worldwide, ensuring readiness for the security challenges of tomorrow.”
                </blockquote>

                <p className="text-textMuted text-sm font-mono uppercase tracking-widest">
                    TSARO GLOBAL DEFENCE — EXECUTIVE CONSULTANCY CADRE
                </p>

            </div>
        </section>

        {/* Protection Assurance & CTA Banner */}
        <section className="py-24 px-6 lg:px-12 bg-obsidian relative">
            <div className="max-w-5xl mx-auto">
                <div className="bg-[#212126] rounded-2xl p-8 sm:p-14 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-2xl">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Superior Protection in an Uncertain World</h3>
                        <p className="text-textLight text-sm sm:text-base leading-relaxed">
                            Amidst growing insecurity, Tsaro Global Defence offers superior protection for families, businesses, and assets. We bridge the gap with effective security solutions, ensuring peace of mind.
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        <a href="#contact" className="btn-primary-red px-8 py-4 rounded text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-2">
                            <span>Initiate Client Briefing</span>
                            <span>→</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
