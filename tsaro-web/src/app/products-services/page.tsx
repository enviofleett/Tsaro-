import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function ProductsServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page Header */}
        <section className="relative pt-36 pb-20 px-6 lg:px-12 overflow-hidden tactical-mesh border-b border-white/5">
            <div className="max-w-5xl mx-auto text-center">

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-8">
                    Products & <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-brandRed">Services.</span>
                </h1>

                <p className="text-lg sm:text-xl text-textLight leading-relaxed max-w-3xl mx-auto font-normal">
                    Powered by innovation, delivered with excellence. We provide cutting-edge solutions built for modern threats, supporting Armed Forces, Law Enforcement, and Private Enterprise worldwide.
                </p>

            </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 px-6 lg:px-12 bg-obsidian relative">
            <div className="max-w-7xl mx-auto">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    
                    {/* Firearms */}
                    <div className="service-card rounded-2xl p-8 sm:p-10 flex flex-col h-full bg-[#1e1e22] border border-white/10">
                        <div className="w-12 h-12 rounded bg-[#18181B] border border-white/10 flex items-center justify-center text-brandRed mb-6">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Firearms</h3>
                        <p className="text-textLight leading-relaxed mb-6 flex-grow">
                            We deliver mission-specific weapon systems from small arms to heavy-duty artillery and tactical-grade ammo. We proudly support Armed Forces, Law Enforcement, and Security Agencies with world-class firepower, built to meet modern-day challenges.
                        </p>
                        <div className="pt-6 border-t border-white/5 font-mono text-xs text-textMuted uppercase flex items-center justify-between">
                            <span>Lethal Hardware</span>
                            <span className="text-brandRed">→</span>
                        </div>
                    </div>

                    {/* High Tech Security Equipments */}
                    <div className="service-card rounded-2xl p-8 sm:p-10 flex flex-col h-full bg-[#1e1e22] border border-white/10">
                        <div className="w-12 h-12 rounded bg-[#18181B] border border-white/10 flex items-center justify-center text-brandRed mb-6">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">High Tech Security Equipments</h3>
                        <p className="text-textLight leading-relaxed mb-6 flex-grow">
                            From AI-powered surveillance systems and biometrics ID tech to secure communications, cyber defense, and drone surveillance, our gear is designed for unmatched efficiency. We believe in innovating to secure the future by continuously integrating emerging technologies into our solutions.
                        </p>
                        <div className="pt-6 border-t border-white/5 font-mono text-xs text-textMuted uppercase flex items-center justify-between">
                            <span>Digital & Surveillance</span>
                            <span className="text-brandRed">→</span>
                        </div>
                    </div>

                    {/* Accessories */}
                    <div className="service-card rounded-2xl p-8 sm:p-10 flex flex-col h-full bg-[#1e1e22] border border-white/10">
                        <div className="w-12 h-12 rounded bg-[#18181B] border border-white/10 flex items-center justify-center text-brandRed mb-6">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Tactical Accessories</h3>
                        <p className="text-textLight leading-relaxed mb-6 flex-grow">
                            We supply high-performance tactical gear, uniforms and accessories built for the toughest environments. Our designs focus on comfort, durability, and mission-ready functionality, utilizing the latest in material and tech innovation. Every item is field-tested for those who serve on the frontlines.
                        </p>
                        <div className="pt-6 border-t border-white/5 font-mono text-xs text-textMuted uppercase flex items-center justify-between">
                            <span>Field Equipment</span>
                            <span className="text-brandRed">→</span>
                        </div>
                    </div>

                    {/* Building and Construction */}
                    <div className="service-card rounded-2xl p-8 sm:p-10 flex flex-col h-full bg-[#1e1e22] border border-white/10">
                        <div className="w-12 h-12 rounded bg-[#18181B] border border-white/10 flex items-center justify-center text-brandRed mb-6">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Building & Construction</h3>
                        <p className="text-textLight leading-relaxed mb-6 flex-grow">
                            We develop high-performance buildings and infrastructure engineered for utility, security, and long-term value. From fortified command centers and border infrastructure to residential and commercial projects, our builds are smart, secure, and sustainable.
                        </p>
                        <div className="pt-6 border-t border-white/5 font-mono text-xs text-textMuted uppercase flex items-center justify-between">
                            <span>Secure Infrastructure</span>
                            <span className="text-brandRed">→</span>
                        </div>
                    </div>

                </div>

            </div>
        </section>

        {/* CTA Banner */}
        <section className="py-24 px-6 lg:px-12 bg-obsidian relative">
            <div className="max-w-5xl mx-auto">
                <div className="bg-charcoal rounded-2xl p-8 sm:p-14 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
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
