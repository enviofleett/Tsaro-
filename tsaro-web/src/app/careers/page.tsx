import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-obsidian relative overflow-hidden">
        {/* Futuristic Background Mesh */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brandRed/30 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"></div>
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              perspective: '1000px',
              transform: 'rotateX(60deg) scale(2)',
              transformOrigin: 'top center'
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            
            <h1 className="text-5xl md:text-7xl font-sans font-bold text-white tracking-tight mb-6">
              Build the Future of <br className="hidden md:block" />
              <span className="text-brandRed">Global Defense</span>
            </h1>
            <p className="text-lg text-textLight leading-relaxed">
              We operate at the bleeding edge of kinetic operations and algorithmic intelligence. Join a cadre of elite operators, data scientists, and strategists securing the next century.
            </p>
          </div>



          {/* Open Positions */}
          <div>
            <div className="flex items-end justify-between border-b border-white/10 pb-6 mb-8">
              <h2 className="text-3xl font-bold text-white tracking-tight">Open Vectors</h2>
              <div className="hidden sm:flex text-xs font-mono text-textMuted gap-4">
                <span>[ STATUS: RECRUITING ]</span>
                <span>[ POSITIONS: 4 ]</span>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { role: 'Lead Tactical Data Scientist', division: 'Algorithmic Warfare', location: 'Hybrid / Orlando, FL', type: 'Full-Time' },
                { role: 'Field Operations Commander', division: 'Kinetic Deployments', location: 'Abuja, Nigeria', type: 'Contract' },
                { role: 'AI Infrastructure Engineer', division: 'Tsaro Labs', location: 'Remote', type: 'Full-Time' },
                { role: 'Geospatial Intelligence Analyst', division: 'Reconnaissance', location: 'Hybrid / Global', type: 'Full-Time' },
              ].map((job, idx) => (
                <div key={idx} className="group bg-charcoal/50 border border-white/5 hover:border-brandRed/50 rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between transition-all hover:shadow-[0_0_30px_-5px_rgba(230,32,32,0.15)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-brandRed/0 to-brandRed/0 group-hover:from-brandRed/5 group-hover:to-transparent transition-all pointer-events-none"></div>
                  
                  <div className="mb-4 md:mb-0 relative z-10">
                    <div className="text-[10px] font-mono text-brandRed uppercase tracking-widest mb-1.5">{job.division}</div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brandRed transition-colors">{job.role}</h3>
                    <div className="flex items-center gap-3 text-xs text-textMuted font-mono">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        {job.location}
                      </span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <button className="px-5 py-2.5 bg-white/5 border border-white/10 hover:border-brandRed hover:bg-brandRed/10 rounded text-xs font-semibold uppercase tracking-wider text-white transition-all w-full md:w-auto">
                      Initialize Application
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
