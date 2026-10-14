export default function StatisticsBlock({ content = {} }: { content?: Record<string, any> }) {
  const {
    variant = '3_stats',
    stats = []
  } = content;

  let gridClass = 'md:grid-cols-3';
  if (variant === '4_stats') gridClass = 'md:grid-cols-2 lg:grid-cols-4';

  return (
    <section className="py-20 px-6 bg-charcoal border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 ${gridClass} gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10`}>
          {stats.map((stat: Record<string, any>, idx: number) => (
            <div key={idx} className={`flex flex-col items-center text-center ${idx > 0 ? 'pt-8 md:pt-0' : ''}`}>
              <div className="text-4xl md:text-5xl font-extrabold text-brandRed mb-2">{stat.value}</div>
              <div className="text-lg font-bold text-white mb-2 uppercase tracking-wide">{stat.label}</div>
              {stat.description && <div className="text-sm text-textMuted max-w-xs">{stat.description}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
