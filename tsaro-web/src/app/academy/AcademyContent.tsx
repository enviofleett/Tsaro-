"use client"
import { useState } from 'react'

export default function AcademyContent() {
  const [filter, setFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalState, setModalState] = useState<'form' | 'success'>('form')
  const [selectedCourse, setSelectedCourse] = useState({ name: '', code: '', duration: '' })

  const openBookingModal = (name: string, code: string, duration: string) => {
    setSelectedCourse({ name, code, duration })
    setModalState('form')
    setIsModalOpen(true)
  }

  const closeBookingModal = () => {
    setIsModalOpen(false)
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setModalState('success')
  }

  return (
    <main>
      {/* Academy Hero */}
      <section className="relative pt-36 pb-24 px-6 lg:px-12 border-b border-white/5" style={{
        backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(230, 32, 32, 0.06) 0%, transparent 55%), linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
        backgroundSize: '100% 100%, 48px 48px, 48px 48px'
      }}>
          <div className="max-w-6xl mx-auto">
              <div className="max-w-3xl">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                      Tsaro Defence & <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-brandRed">Security Academy</span>
                  </h1>

                  <p className="text-lg sm:text-xl text-textLight leading-relaxed font-normal mb-8">
                      Essential training in kinetic and non-kinetic security, filling a vital gap across sovereign and corporate defense landscapes. We combine evidence-based methodology with rigorous scenario immersions for armed forces, law enforcement, and private security cadres.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                      <a href="#catalog" className="btn-primary-red px-6 py-3.5 rounded-lg text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-2">
                          <span>Explore Certified Programs</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                      </a>
                      <a href="#methodology" className="px-6 py-3.5 rounded-lg border border-white/15 hover:border-white/30 bg-white/[0.02] text-xs font-semibold tracking-wider uppercase text-white transition-colors">
                          Training Methodology
                      </a>
                  </div>
              </div>

              {/* Key Fact Strip */}
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/10">
                  <div>
                      <div className="text-2xl sm:text-3xl font-bold text-white font-mono">100%</div>
                      <div className="text-xs text-textMuted mt-1">Field-Veteran Instructors</div>
                  </div>
                  <div>
                      <div className="text-2xl sm:text-3xl font-bold text-white font-mono">Tier-1</div>
                      <div className="text-xs text-textMuted mt-1">Accredited Tactical Ranges</div>
                  </div>
                  <div>
                      <div className="text-2xl sm:text-3xl font-bold text-white font-mono">Kinetic +</div>
                      <div className="text-xs text-textMuted mt-1">Non-Kinetic Hybrid Doctrine</div>
                  </div>
                  <div>
                      <div className="text-2xl sm:text-3xl font-bold text-white font-mono">Cohort</div>
                      <div className="text-xs text-textMuted mt-1">Small-Group Immersions</div>
                  </div>
              </div>
          </div>
      </section>

      {/* Featured Flagship Program */}
      <section className="py-16 px-6 lg:px-12 bg-obsidian border-b border-white/5">
          <div className="max-w-6xl mx-auto">
              
              <div className="text-xs font-mono uppercase tracking-widest text-brandRed font-semibold mb-3">
                  FLAGSHIP COHORT SPOTLIGHT
              </div>

              <div className="bg-charcoal border border-white/10 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl bg-[#212126]">
                  {/* Large Visual */}
                  <div className="lg:col-span-7 relative min-h-[340px] lg:min-h-full">
                      <img src="/academy-close-protection.jpg" alt="Executive Protection Detail Training" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-black/30 lg:bg-gradient-to-r lg:from-transparent lg:to-charcoal"></div>
                      <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 rounded bg-black/70 backdrop-blur-md border border-white/15 text-white font-mono text-xs uppercase tracking-wider">
                              Executive Detail • 3 Weeks
                          </span>
                      </div>
                  </div>

                  {/* Program Briefing */}
                  <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
                      <div>
                          <div className="flex items-center gap-2 text-xs font-mono text-textMuted mb-2">
                              <span>COURSE REF: CPES-01</span>
                              <span>/</span>
                              <span>DIPLOMATIC CADRE</span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                              Close Protection & Executive Escort Specialist
                          </h3>
                          <p className="text-textLight text-sm leading-relaxed mb-6">
                              An elite, intensive operational immersion designed for protective security details, corporate security directors, and diplomatic escorts. Covers principal motorcade tactics, evasive driving maneuvers, advance route profiling, and close-quarters protective drills under active threat conditions.
                          </p>

                          <div className="space-y-2.5 text-xs text-textLight/90 border-t border-white/10 pt-4 mb-8">
                              <div className="flex items-center gap-3">
                                  <span className="w-1.5 h-1.5 rounded-full bg-brandRed"></span>
                                  <span>Principal Foot Formations & Anti-Ambush Protocols</span>
                              </div>
                              <div className="flex items-center gap-3">
                                  <span className="w-1.5 h-1.5 rounded-full bg-brandRed"></span>
                                  <span>Armored Motorcade Tactics & Rapid Extraction</span>
                              </div>
                              <div className="flex items-center gap-3">
                                  <span className="w-1.5 h-1.5 rounded-full bg-brandRed"></span>
                                  <span>Threat Vector Profiling & Advance Reconnaissance</span>
                              </div>
                          </div>
                      </div>

                      <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                              <span className="block text-[11px] font-mono text-textMuted uppercase">Next Induction</span>
                              <span className="text-sm font-semibold text-white">October 15, 2026</span>
                          </div>
                          <button onClick={() => openBookingModal('Close Protection & Executive Escort Specialist', 'CPES-01', '3 Weeks')} className="btn-primary-red px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2">
                              <span>Book Program</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                              </svg>
                          </button>
                      </div>
                  </div>
              </div>

          </div>
      </section>

      {/* Catalog Section with Filter Tabs */}
      <section id="catalog" className="py-20 px-6 lg:px-12 bg-obsidian">
          <div className="max-w-6xl mx-auto">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/10 gap-6">
                  <div>
                      <h2 className="text-3xl font-extrabold text-white tracking-tight">
                          Tactical & Intelligence Programs
                      </h2>
                  </div>

                  {/* Clean Minimalist Filter Tabs */}
                  <div className="flex items-center gap-6 overflow-x-auto pb-1 text-sm font-medium">
                      <button onClick={() => setFilter('all')} className={`pb-3 font-medium whitespace-nowrap ${filter === 'all' ? 'text-brandRed border-b-2 border-brandRed' : 'text-textMuted hover:text-white'}`}>
                          All Disciplines
                      </button>
                      <button onClick={() => setFilter('kinetic')} className={`pb-3 font-medium whitespace-nowrap ${filter === 'kinetic' ? 'text-brandRed border-b-2 border-brandRed' : 'text-textMuted hover:text-white'}`}>
                          Kinetic & Weapons
                      </button>
                      <button onClick={() => setFilter('protection')} className={`pb-3 font-medium whitespace-nowrap ${filter === 'protection' ? 'text-brandRed border-b-2 border-brandRed' : 'text-textMuted hover:text-white'}`}>
                          Protection & Medical
                      </button>
                      <button onClick={() => setFilter('intel')} className={`pb-3 font-medium whitespace-nowrap ${filter === 'intel' ? 'text-brandRed border-b-2 border-brandRed' : 'text-textMuted hover:text-white'}`}>
                          Cyber & Intelligence
                      </button>
                      <button onClick={() => setFilter('infrastructure')} className={`pb-3 font-medium whitespace-nowrap ${filter === 'infrastructure' ? 'text-brandRed border-b-2 border-brandRed' : 'text-textMuted hover:text-white'}`}>
                          Infrastructure Defence
                      </button>
                  </div>
              </div>

              {/* Program Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  
                  {/* Program: Tactical Marksmanship */}
                  {(filter === 'all' || filter === 'kinetic') && (
                  <div className="bg-[#212126] border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between">
                      <div>
                          <div className="h-56 relative">
                              <img src="/academy-marksmanship.jpg" alt="Tactical Marksmanship Training" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#212126] via-transparent to-black/20"></div>
                              <div className="absolute top-3 left-3">
                                  <span className="px-2.5 py-1 rounded bg-black/75 backdrop-blur-sm border border-white/10 text-white font-mono text-[11px] uppercase tracking-wider">
                                      Kinetic • 2 Weeks
                                  </span>
                              </div>
                          </div>

                          <div className="p-6">
                              <div className="text-[11px] font-mono text-textMuted uppercase mb-1">COURSE // TMS-02</div>
                              <h3 className="text-xl font-bold text-white mb-3">
                                  Tactical Marksmanship & Dynamic Engagement
                              </h3>
                              <p className="text-textLight text-sm leading-relaxed mb-6">
                                  Advanced weapon manipulation and live-fire drills on tactical ranges. Emphasizes stress-fire target discrimination, low-light operations, and rapid primary-to-secondary transitions.
                              </p>

                              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-textMuted bg-[#18181B] p-3 rounded-xl border border-white/5 mb-6">
                                  <div>
                                      <span className="block text-[10px] uppercase text-textMuted/70">Format</span>
                                      <span className="text-white">Live-Fire Range</span>
                                  </div>
                                  <div>
                                      <span className="block text-[10px] uppercase text-textMuted/70">Prerequisite</span>
                                      <span className="text-white">Vetted LE / Armed</span>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center justify-between">
                          <div>
                              <span className="block text-[10px] font-mono text-textMuted uppercase">Next Intake</span>
                              <span className="text-xs font-semibold text-white">November 02, 2026</span>
                          </div>
                          <button onClick={() => openBookingModal('Tactical Marksmanship', 'TMS-02', '2 Weeks')} className="btn-primary-red px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider">
                              Book
                          </button>
                      </div>
                  </div>
                  )}

                  {/* Program: Counter-Terrorism CQB */}
                  {(filter === 'all' || filter === 'kinetic') && (
                  <div className="bg-[#212126] border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between">
                      <div>
                          <div className="h-56 relative">
                              <img src="/academy-cqb.jpg" alt="Counter-Terrorism CQB Training" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#212126] via-transparent to-black/20"></div>
                              <div className="absolute top-3 left-3">
                                  <span className="px-2.5 py-1 rounded bg-black/75 backdrop-blur-sm border border-white/10 text-white font-mono text-[11px] uppercase tracking-wider">
                                      Special Ops • 4 Weeks
                                  </span>
                              </div>
                          </div>

                          <div className="p-6">
                              <div className="text-[11px] font-mono text-textMuted uppercase mb-1">COURSE // CQB-03</div>
                              <h3 className="text-xl font-bold text-white mb-3">
                                  Counter-Terrorism & Urban Combat (CQB)
                              </h3>
                              <p className="text-textLight text-sm leading-relaxed mb-6">
                                  High-intensity simulation training in shoot-houses and structured urban environments. Teaches multi-room clearing, explosive/mechanical breaching, hostage recovery, and team coordination.
                              </p>

                              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-textMuted bg-[#18181B] p-3 rounded-xl border border-white/5 mb-6">
                                  <div>
                                      <span className="block text-[10px] uppercase text-textMuted/70">Format</span>
                                      <span className="text-white">Shoot-House</span>
                                  </div>
                                  <div>
                                      <span className="block text-[10px] uppercase text-textMuted/70">Prerequisite</span>
                                      <span className="text-white">Tier-1 / MIL</span>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center justify-between">
                          <div>
                              <span className="block text-[10px] font-mono text-textMuted uppercase">Next Intake</span>
                              <span className="text-xs font-semibold text-white">November 16, 2026</span>
                          </div>
                          <button onClick={() => openBookingModal('CQB Combat', 'CQB-03', '4 Weeks')} className="btn-primary-red px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider">
                              Book
                          </button>
                      </div>
                  </div>
                  )}

                  {/* Program: Tactical Emergency Casualty Care */}
                  {(filter === 'all' || filter === 'protection') && (
                  <div className="bg-[#212126] border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between">
                      <div>
                          <div className="h-56 relative">
                              <img src="/academy-combat-medic.jpg" alt="Tactical Combat Casualty Care" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#212126] via-transparent to-black/20"></div>
                              <div className="absolute top-3 left-3">
                                  <span className="px-2.5 py-1 rounded bg-black/75 backdrop-blur-sm border border-white/10 text-white font-mono text-[11px] uppercase tracking-wider">
                                      Medical • 10 Days
                                  </span>
                              </div>
                          </div>

                          <div className="p-6">
                              <div className="text-[11px] font-mono text-textMuted uppercase mb-1">COURSE // TECC-04</div>
                              <h3 className="text-xl font-bold text-white mb-3">
                                  Tactical Emergency Casualty Care
                              </h3>
                              <p className="text-textLight text-sm leading-relaxed mb-6">
                                  Standardized operational medicine for hostile zones. Prepares personnel to halt massive hemorrhage, manage airway trauma under fire, and execute rapid tactical evacuation (CASEVAC).
                              </p>

                              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-textMuted bg-[#18181B] p-3 rounded-xl border border-white/5 mb-6">
                                  <div>
                                      <span className="block text-[10px] uppercase text-textMuted/70">Format</span>
                                      <span className="text-white">Trauma Sim</span>
                                  </div>
                                  <div>
                                      <span className="block text-[10px] uppercase text-textMuted/70">Prerequisite</span>
                                      <span className="text-white">Security & Med</span>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center justify-between">
                          <div>
                              <span className="block text-[10px] font-mono text-textMuted uppercase">Next Intake</span>
                              <span className="text-xs font-semibold text-white">October 26, 2026</span>
                          </div>
                          <button onClick={() => openBookingModal('TECC Medical', 'TECC-04', '10 Days')} className="btn-primary-red px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider">
                              Book
                          </button>
                      </div>
                  </div>
                  )}
              </div>
          </div>
      </section>

      {/* Methodology & Pillars Section */}
      <section id="methodology" className="py-24 px-6 lg:px-12 bg-[#212126] border-t border-white/5">
          <div className="max-w-6xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-16">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                      Evidence-Based Operational Mastery
                  </h2>
                  <p className="text-textLight text-sm sm:text-base mt-3 leading-relaxed">
                      We bridge theory and battlefield realities through structured field doctrine, ensuring graduates perform reliably under extreme duress.
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-[#18181B] border border-white/5 p-8 rounded-2xl">
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brandRed font-mono font-bold text-sm mb-6">
                          01
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">Kinetic & Non-Kinetic Integration</h3>
                      <p className="text-textMuted text-sm leading-relaxed">
                          Modern threats require balanced competency. We fuse marksmanship and combat tactics with crisis psychology, situational de-escalation, and intelligence gathering.
                      </p>
                  </div>

                  <div className="bg-[#18181B] border border-white/5 p-8 rounded-2xl">
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brandRed font-mono font-bold text-sm mb-6">
                          02
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">Full-Spectrum Simulation</h3>
                      <p className="text-textMuted text-sm leading-relaxed">
                          Instruction takes place in dedicated shoot-houses, dynamic convoy routes, cyber laboratories, and emergency triage stations under realistic stress conditions.
                      </p>
                  </div>

                  <div className="bg-[#18181B] border border-white/5 p-8 rounded-2xl">
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brandRed font-mono font-bold text-sm mb-6">
                          03
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">Sovereign & Enterprise Vetting</h3>
                      <p className="text-textMuted text-sm leading-relaxed">
                          Each candidate and organizational delegation undergoes background verification. Certifications are recognized across military, law enforcement, and corporate security councils.
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* Modal Logic */}
      {isModalOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-[#212126] border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-10 my-8">
              <button onClick={closeBookingModal} className="absolute top-6 right-6 text-textMuted hover:text-white transition-colors p-2 rounded-lg bg-white/5 hover:bg-white/10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
              </button>

              {modalState === 'form' ? (
              <div>
                  <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white tracking-tight">Reserve Academy Cohort</h3>
                      <p className="text-xs font-mono text-textMuted mt-1">
                          COURSE REF: {selectedCourse.code} • {selectedCourse.duration.toUpperCase()} IMMERSION
                      </p>
                  </div>
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                              <label className="block text-xs font-medium text-textLight mb-1.5">Candidate Full Name *</label>
                              <input type="text" required placeholder="e.g. Samuel Adeyemi" className="w-full px-4 py-3 bg-[#18181B] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brandRed transition-colors" />
                          </div>
                          <div>
                              <label className="block text-xs font-medium text-textLight mb-1.5">Official / Corporate Email *</label>
                              <input type="email" required placeholder="s.adeyemi@enterprise.com" className="w-full px-4 py-3 bg-[#18181B] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brandRed transition-colors" />
                          </div>
                      </div>
                      <div className="pt-4 flex items-center justify-end gap-3">
                          <button type="button" onClick={closeBookingModal} className="px-5 py-3 rounded-lg border border-white/15 hover:border-white/30 text-xs font-mono uppercase tracking-wider text-white transition-colors">
                              Cancel
                          </button>
                          <button type="submit" className="btn-primary-red px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
                              <span>Submit Enrollment Request</span>
                          </button>
                      </div>
                  </form>
              </div>
              ) : (
              <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Reservation Received</h3>
                  <p className="text-textLight text-sm max-w-md mx-auto leading-relaxed mb-6">
                      Your preliminary reservation has been recorded. A secure intake dossier will be transmitted to your email within 24 hours.
                  </p>
                  <button onClick={closeBookingModal} className="btn-primary-red px-8 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider">
                      Return to Academy
                  </button>
              </div>
              )}
          </div>
      </div>
      )}

    </main>
  )
}
