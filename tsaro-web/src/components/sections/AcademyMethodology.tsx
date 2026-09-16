export default function AcademyMethodology({ content = {} }: { content?: any }) {
  const headline = content.headline || 'Evidence-Based Operational Mastery'
  const subheadline = content.subheadline || 'We bridge theory and battlefield realities through structured field doctrine, ensuring graduates perform reliably under extreme duress.'
  const pillars = content.pillars || [
    { title: 'Kinetic & Non-Kinetic Integration', desc: 'Modern threats require balanced competency. We fuse marksmanship and combat tactics with crisis psychology, situational de-escalation, and intelligence gathering.' },
    { title: 'Full-Spectrum Simulation', desc: 'Instruction takes place in dedicated shoot-houses, dynamic convoy routes, cyber laboratories, and emergency triage stations under realistic stress conditions.' },
    { title: 'Sovereign & Enterprise Vetting', desc: 'Each candidate and organizational delegation undergoes background verification. Certifications are recognized across military, law enforcement, and corporate security councils.' }
  ]

  return (
    <section id="methodology" className="py-24 px-6 lg:px-12 bg-[#212126] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" dangerouslySetInnerHTML={{ __html: headline }} />
          <p className="text-textLight text-sm sm:text-base mt-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: subheadline }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p: any, i: number) => (
            <div key={i} className="bg-[#18181B] border border-white/5 p-8 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brandRed font-mono font-bold text-sm mb-6">
                0{i + 1}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
              <p className="text-textMuted text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
