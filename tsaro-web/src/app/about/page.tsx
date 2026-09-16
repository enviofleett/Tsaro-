import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* About Hero Section */}
        <section className="relative pt-36 pb-20 px-6 lg:px-12 overflow-hidden tactical-mesh border-b border-white/5">
            <div className="max-w-5xl mx-auto text-center">

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-8">
                    A Vanguard of <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-brandRed">Security & Defence.</span>
                </h1>

                <p className="text-lg sm:text-xl text-textLight leading-relaxed max-w-3xl mx-auto font-normal">
                    Tsaro Global Defence is a multinational private security firm with its operational headquarters in Nigeria and its subsidiary in the United States. We stand as a vanguard of security and defence, offering a spectrum of security products and services to a vast clientèle.
                </p>

                <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-xs font-mono text-textMuted border-t border-white/10 pt-8 max-w-xl mx-auto">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brandRed"></span>
                        <span>ABUJA, NIGERIA (HQ)</span>
                    </div>
                    <span>/</span>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brandRed"></span>
                        <span>ORLANDO, FL, USA (SUBSIDIARY)</span>
                    </div>
                </div>

            </div>
        </section>

        {/* Background Narrative & Operational Excellence */}
        <section className="py-24 px-6 lg:px-12 bg-obsidian relative">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* Left: Imagery with live tactical frame */}
                    <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        <div className="w-full h-[450px] overflow-hidden relative">
                            <img src="/hero-banner.png" alt="Tsaro Operatives" className="w-full h-full object-cover object-center brightness-95 contrast-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-60"></div>
                            <div className="absolute bottom-6 left-6 right-6 bg-obsidian/85 backdrop-blur-md p-4 rounded border border-white/10 flex items-center justify-between text-xs font-mono">
                                <span className="text-textLight uppercase tracking-wider">TACTICAL PRECISION & RIGOR</span>
                                <span className="text-brandRed font-semibold">ENTERPRISE STANDARD</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Background Text */}
                    <div className="lg:col-span-6 flex flex-col justify-center">
                        
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-6">
                            Committed to Unwavering Excellence & Acute Precision
                        </h2>

                        <p className="text-textLight text-base sm:text-lg leading-relaxed mb-6 font-normal">
                            With a legacy deeply rooted in unwavering commitment and resolute pursuit of excellence, we employ methods and assets that guarantee acute precision and utmost professionalism in meeting security and defence needs.
                        </p>

                        {/* Pull-Quote Box */}
                        <div className="bg-charcoal p-6 rounded-xl mb-8 border border-white/5">
                            <p className="italic text-white text-base leading-relaxed font-medium">
                                “We work closely with clients to individually select the best executive protection expert to match your criteria, profile and personal concerns.”
                            </p>
                        </div>

                        <p className="text-textMuted text-sm leading-relaxed mb-8">
                            Amidst growing insecurity, Tsaro Global Defence offers superior protection for families, businesses, and assets. We bridge the gap with effective security solutions, ensuring peace of mind in an uncertain world.
                        </p>

                        <div>
                            <a href="#contact" className="btn-primary-red inline-flex items-center gap-2 px-6 py-3 rounded text-xs font-semibold tracking-wider uppercase">
                                <span>Connect With Our Team</span>
                                <span>→</span>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* Core Values Section */}
        <section className="py-24 px-6 lg:px-12 bg-charcoal/40 border-y border-white/5 relative">
            <div className="max-w-7xl mx-auto">
                
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-3 mb-4 tracking-tight">
                        Our Core Values
                    </h2>
                    <p className="text-textMuted text-base sm:text-lg leading-relaxed">
                        We promise not to compromise on any of these core values as they form the very essence of our existence and have informed our success over the years.
                    </p>
                </div>

                {/* 3 Core Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Value 1: Confidentiality */}
                    <div className="value-card rounded-xl p-8 flex flex-col justify-between border border-white/5 bg-[#18181B]">
                        <div>
                            <div className="w-12 h-12 rounded bg-[#212126] border border-white/10 flex items-center justify-center text-brandRed mb-6">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                Confidentiality
                            </h3>
                            <p className="text-textMuted text-sm leading-relaxed mb-6">
                                Confidentiality is the bedrock of our operations at Tsaro. We understand the significance of safeguarding sensitive information and classified data. Our commitment to confidentiality ensures that the trust bestowed upon us by our clients and partners remains unfaltering as we treat every piece of information with utmost privacy.
                            </p>
                        </div>
                        <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-textMuted">
                            <span>DATA & IDENTITY INTEGRITY</span>
                            <span className="text-brandRed font-bold">01</span>
                        </div>
                    </div>

                    {/* Value 2: Integrity */}
                    <div className="value-card rounded-xl p-8 flex flex-col justify-between border border-white/5 bg-[#18181B]">
                        <div>
                            <div className="w-12 h-12 rounded bg-[#212126] border border-white/10 flex items-center justify-center text-brandRed mb-6">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                Integrity
                            </h3>
                            <p className="text-textMuted text-sm leading-relaxed mb-6">
                                At Tsaro, integrity is not just a value; it's a way of life. We uphold the highest ethical standards in every aspect of our work. Our unwavering commitment to honesty, transparency, and moral principles is a testament to our dedication to protecting client’s interests with honor and dignity.
                            </p>
                        </div>
                        <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-textMuted">
                            <span>ETHICAL LEADERSHIP</span>
                            <span className="text-brandRed font-bold">02</span>
                        </div>
                    </div>

                    {/* Value 3: Professionalism */}
                    <div className="value-card rounded-xl p-8 flex flex-col justify-between border border-white/5 bg-[#18181B]">
                        <div>
                            <div className="w-12 h-12 rounded bg-[#212126] border border-white/10 flex items-center justify-center text-brandRed mb-6">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                Professionalism
                            </h3>
                            <p className="text-textMuted text-sm leading-relaxed mb-6">
                                Professionalism is the cornerstone of our services. We hold ourselves to the highest professional standards in every endeavor we undertake. Our team is composed of skilled, disciplined, and dedicated experts who bring their best to bear at every given opportunity, taking pride in consistently delivering excellence.
                            </p>
                        </div>
                        <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-textMuted">
                            <span>DISCIPLINE & EXPERTISE</span>
                            <span className="text-brandRed font-bold">03</span>
                        </div>
                    </div>

                </div>

            </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
