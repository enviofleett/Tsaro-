import { sanitizeHtml } from '@/lib/validation/sanitize';
export default function CardsBlock({ content = {} }: { content?: Record<string, any> }) {
  const {
    variant = '3_col',
    heading,
    subheading,
    cards = []
  } = content;

  let gridClass = 'grid-cols-1 md:grid-cols-3';
  if (variant === '2_col') gridClass = 'grid-cols-1 md:grid-cols-2';
  if (variant === '4_col') gridClass = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';

  return (
    <section className="py-24 px-6 bg-obsidian">
      <div className="max-w-7xl mx-auto">
        {(heading || subheading) && (
          <div className="text-center mb-16 max-w-3xl mx-auto">
            {heading && <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{heading}</h2>}
            {subheading && <p className="text-textLight text-lg">{subheading}</p>}
          </div>
        )}

        <div className={`grid ${gridClass} gap-8`}>
          {cards.map((card: Record<string, any>, idx: number) => (
            <div key={idx} className="bg-charcoal border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors flex flex-col group">
              {card.image && (
                <div className="h-48 overflow-hidden bg-deepGray">
                  <img src={card.image} alt={card.title || 'Card'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="p-8 flex flex-col flex-1">
                {card.icon && <div className="text-brandRed text-3xl mb-4" dangerouslySetInnerHTML={{ __html: sanitizeHtml(card.icon) }} />}
                {card.title && <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>}
                {card.description && <div className="text-textMuted text-sm mb-6 flex-1" dangerouslySetInnerHTML={{ __html: sanitizeHtml(card.description) }} />}
                {card.ctaLabel && (
                  <div className="mt-auto pt-4 border-t border-white/5">
                    <a href={card.ctaLink || '#'} className="text-brandRed font-semibold text-sm hover:text-white transition-colors flex items-center gap-2">
                      {card.ctaLabel} <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
