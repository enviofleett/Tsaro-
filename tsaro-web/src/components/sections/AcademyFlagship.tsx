"use client"
import { useState } from 'react'
import { submitAcademyBooking } from '@/app/actions/bookAcademy'

export default function AcademyFlagship({ content = {} }: { content?: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalState, setModalState] = useState<'form' | 'success'>('form')

  const badge = content.badge || 'FLAGSHIP COHORT SPOTLIGHT'
  const image = content.image || '/academy-close-protection.jpg'
  const imageBadge = content.imageBadge || 'Executive Detail • 3 Weeks'
  const code = content.code || 'CPES-01'
  const codeType = content.codeType || 'DIPLOMATIC CADRE'
  const title = content.title || 'Close Protection & Executive Escort Specialist'
  const desc = content.desc || 'An elite, intensive operational immersion designed for protective security details, corporate security directors, and diplomatic escorts. Covers principal motorcade tactics, evasive driving maneuvers, advance route profiling, and close-quarters protective drills under active threat conditions.'
  const bullets = content.bullets || [
    'Principal Foot Formations & Anti-Ambush Protocols',
    'Armored Motorcade Tactics & Rapid Extraction',
    'Threat Vector Profiling & Advance Reconnaissance'
  ]
  const startDate = content.startDate || content.date || '2026-10-15'
  const endDate = content.endDate || ''
  const timeRange = content.timeRange || '0900 - 1700 HRS'
  
  const formatDate = (dStr: string) => {
    if (!dStr) return '';
    try {
      return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(dStr));
    } catch {
      return dStr;
    }
  }
  
  const formattedStart = formatDate(startDate);
  const formattedEnd = endDate ? formatDate(endDate) : '';
  const displayDate = formattedEnd ? `${formattedStart} - ${formattedEnd}` : formattedStart;

  async function handleBookingSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.append('courseCode', code)
    formData.append('courseName', title)
    const res = await submitAcademyBooking(formData)
    if (res.success) {
      setModalState('success')
    } else {
      alert(res.error)
    }
  }

  return (
    <section className="py-16 px-6 lg:px-12 bg-obsidian border-b border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-xs font-mono uppercase tracking-widest text-brandRed font-semibold mb-3">{badge}</div>
        <div className="bg-charcoal border border-white/10 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl bg-[#212126]">
          <div className="lg:col-span-7 relative min-h-[340px] lg:min-h-full">
            <img src={image} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-black/30 lg:bg-gradient-to-r lg:from-transparent lg:to-charcoal"></div>
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 rounded bg-black/70 backdrop-blur-md border border-white/15 text-white font-mono text-xs uppercase tracking-wider">{imageBadge}</span>
            </div>
          </div>
          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-textMuted mb-2">
                <span>COURSE REF: {code}</span><span>/</span><span>{codeType}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">{title}</h3>
              <p className="text-textLight text-sm leading-relaxed mb-6">{desc}</p>
              <div className="space-y-2.5 text-xs text-textLight/90 border-t border-white/10 pt-4 mb-8">
                {bullets.map((b: string, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brandRed"></span><span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="block text-[11px] font-mono text-textMuted uppercase">Next Induction</span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">{displayDate}</span>
                  {timeRange && <span className="text-xs text-textMuted mt-0.5">{timeRange}</span>}
                </div>
              </div>
              <button onClick={() => { setIsModalOpen(true); setModalState('form'); }} className="btn-primary-red px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2">
                <span>Book Program</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          </div>
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
                        <p className="text-xs font-mono text-textMuted mt-1">COURSE REF: {code}</p>
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
