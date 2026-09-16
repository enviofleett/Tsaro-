export default function OperationalDifferentiator({ content }: { content?: any }) {
  const headline = content?.headline || 'Five stages, the same<br />firm throughout.'
  const subtitle = content?.subtitle || content?.text_1 || 'No handoff between the people who wrote the plan and the people who built it.'
  const stages = (content?.stages && content.stages.length > 0)
    ? content.stages
    : [
        {
          title: 'Assess',
          description: 'Establish the real constraints — legal, fiscal, political — before proposing anything.',
        },
        {
          title: 'Design',
          description: 'Build the structure the solution will run inside, not just the solution itself.',
        },
        {
          title: 'Mobilise',
          description: 'Procurement, staffing, and supply chain set up to carry the design forward.',
        },
        {
          title: 'Deliver',
          description: 'Construction and implementation, managed by the firm that designed it.',
        },
        {
          title: 'Sustain',
          description: 'Training, certification, and operating support that outlast the engagement.',
        },
      ]

  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-charcoal/30 relative">
        <div className="max-w-7xl mx-auto">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
                <div className="md:w-1/2">
                    <h2 
                        className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold tracking-tighter text-white leading-[1.08]"
                        dangerouslySetInnerHTML={{ __html: headline }}
                    />
                </div>
                <div className="md:w-1/3">
                    <p className="text-white/80 text-lg sm:text-xl leading-relaxed mt-4">
                        {subtitle}
                    </p>
                </div>
            </div>

            {/* 5-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-white/10 rounded-sm">
                {stages.map((stage: any, index: number) => {
                    const isLast = index === stages.length - 1
                    return (
                        <div 
                            key={index} 
                            className={`p-8 flex flex-col ${!isLast ? 'border-b lg:border-b-0 lg:border-r border-white/10' : ''} hover:bg-white/[0.02] transition-colors`}
                        >
                            <div className="text-[11px] font-mono text-brandRed font-semibold tracking-widest uppercase mb-6">
                                N° {String(index + 1).padStart(2, '0')}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">
                                {stage.title}
                            </h3>
                            <p className="text-textMuted text-xs leading-relaxed">
                                {stage.description}
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    </section>
  )
}
