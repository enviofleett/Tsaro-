"use client"
import { useState } from 'react'
import { submitAcademyBooking } from '@/app/actions/bookAcademy'

export default function AcademyCatalog({ content = {} }: { content?: any }) {
  const [filter, setFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalState, setModalState] = useState<'form' | 'success'>('form')
  const [selectedCourse, setSelectedCourse] = useState({ name: '', code: '', duration: '' })

  const headline = content.headline || 'Tactical & Intelligence Programs'
  const programs = content.programs || [
    { type: 'kinetic', image: '/academy-marksmanship.jpg', badge: 'Kinetic • 2 Weeks', code: 'TMS-02', title: 'Tactical Marksmanship & Dynamic Engagement', desc: 'Advanced weapon manipulation and live-fire drills on tactical ranges. Emphasizes stress-fire target discrimination, low-light operations, and rapid primary-to-secondary transitions.', format: 'Live-Fire Range', prerequisite: 'Vetted LE / Armed', date: 'November 02, 2026', duration: '2 Weeks' },
    { type: 'kinetic', image: '/academy-cqb.jpg', badge: 'Special Ops • 4 Weeks', code: 'CQB-03', title: 'Counter-Terrorism & Urban Combat (CQB)', desc: 'High-intensity simulation training in shoot-houses and structured urban environments. Teaches multi-room clearing, explosive/mechanical breaching, hostage recovery, and team coordination.', format: 'Shoot-House', prerequisite: 'Tier-1 / MIL', date: 'November 16, 2026', duration: '4 Weeks' },
    { type: 'protection', image: '/academy-combat-medic.jpg', badge: 'Medical • 10 Days', code: 'TECC-04', title: 'Tactical Emergency Casualty Care', desc: 'Standardized operational medicine for hostile zones. Prepares personnel to halt massive hemorrhage, manage airway trauma under fire, and execute rapid tactical evacuation (CASEVAC).', format: 'Trauma Sim', prerequisite: 'Security & Med', date: 'October 26, 2026', duration: '10 Days' }
  ]

  const openBookingModal = (name: string, code: string, duration: string) => {
    setSelectedCourse({ name, code, duration })
    setModalState('form')
    setIsModalOpen(true)
  }

  async function handleBookingSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.append('courseCode', selectedCourse.code)
    formData.append('courseName', selectedCourse.name)
    const res = await submitAcademyBooking(formData)
    if (res.success) {
      setModalState('success')
    } else {
      alert(res.error)
    }
  }

  return (
    <section id="catalog" className="py-20 px-6 lg:px-12 bg-obsidian">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/10 gap-6">
          <div><h2 className="text-3xl font-extrabold text-white tracking-tight">{headline}</h2></div>
          <div className="flex items-center gap-6 overflow-x-auto pb-1 text-sm font-medium">
            {['all', 'kinetic', 'protection', 'intel', 'infrastructure'].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`pb-3 font-medium whitespace-nowrap ${filter === f ? 'text-brandRed border-b-2 border-brandRed' : 'text-textMuted hover:text-white'}`}>
                {f === 'all' ? 'All Disciplines' : f === 'kinetic' ? 'Kinetic & Weapons' : f === 'protection' ? 'Protection & Medical' : f === 'intel' ? 'Cyber & Intelligence' : 'Infrastructure Defence'}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.filter((p: any) => filter === 'all' || p.type === filter).map((p: any, i: number) => (
            <div key={i} className="bg-[#212126] border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between">
              <div>
                <div className="h-56 relative">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#212126] via-transparent to-black/20"></div>
                  <div className="absolute top-3 left-3"><span className="px-2.5 py-1 rounded bg-black/75 backdrop-blur-sm border border-white/10 text-white font-mono text-[11px] uppercase tracking-wider">{p.badge}</span></div>
                </div>
                <div className="p-6">
                  <div className="text-[11px] font-mono text-textMuted uppercase mb-1">COURSE // {p.code}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                  <p className="text-textLight text-sm leading-relaxed mb-6">{p.desc}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-textMuted bg-[#18181B] p-3 rounded-xl border border-white/5 mb-6">
                    <div><span className="block text-[10px] uppercase text-textMuted/70">Format</span><span className="text-white">{p.format}</span></div>
                    <div><span className="block text-[10px] uppercase text-textMuted/70">Prerequisite</span><span className="text-white">{p.prerequisite}</span></div>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center justify-between">
                <div><span className="block text-[10px] font-mono text-textMuted uppercase">Next Intake</span><span className="text-xs font-semibold text-white">{p.date}</span></div>
                <button onClick={() => openBookingModal(p.title, p.code, p.duration)} className="btn-primary-red px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider">Book</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl bg-[#212126] border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-10 my-8">
                <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-textMuted hover:text-white transition-colors p-2 rounded-lg bg-white/5 hover:bg-white/10">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                {modalState === 'form' ? (
                <div>
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-white tracking-tight">Reserve Academy Cohort</h3>
                        <p className="text-xs font-mono text-textMuted mt-1">COURSE REF: {selectedCourse.code} • {selectedCourse.duration?.toUpperCase()} IMMERSION</p>
                    </div>
                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-textLight mb-1.5">Candidate Full Name *</label>
                                <input type="text" name="candidateName" required placeholder="e.g. Samuel Adeyemi" className="w-full px-4 py-3 bg-[#18181B] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brandRed transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-textLight mb-1.5">Official / Corporate Email *</label>
                                <input type="email" name="candidateEmail" required placeholder="s.adeyemi@enterprise.com" className="w-full px-4 py-3 bg-[#18181B] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brandRed transition-colors" />
                            </div>
                        </div>
                        <div className="pt-4 flex items-center justify-end gap-3">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-3 rounded-lg border border-white/15 hover:border-white/30 text-xs font-mono uppercase tracking-wider text-white transition-colors">Cancel</button>
                            <button type="submit" className="btn-primary-red px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-2"><span>Submit Enrollment Request</span></button>
                        </div>
                    </form>
                </div>
                ) : (
                <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Reservation Received</h3>
                    <p className="text-textLight text-sm max-w-md mx-auto leading-relaxed mb-6">Your preliminary reservation has been recorded. A secure intake dossier will be transmitted to your email within 24 hours.</p>
                    <button onClick={() => setIsModalOpen(false)} className="btn-primary-red px-8 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider">Return to Academy</button>
                </div>
                )}
            </div>
        </div>
      )}
    </section>
  )
}
