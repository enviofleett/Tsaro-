export default function QuoteBlock({ content = {} }: { content?: Record<string, any> }) {
  const {
    variant = 'standard',
    quote,
    attributionName,
    attributionTitle,
    attributionImage
  } = content;

  if (variant === 'large_statement') {
    return (
      <section className="py-32 px-6 bg-brandRed">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-3xl md:text-5xl font-bold text-white leading-tight font-serif italic mb-8">
            &ldquo;{quote}&rdquo;
          </p>
          {(attributionName || attributionTitle) && (
            <div className="mt-8 text-white/80">
              <span className="block font-bold text-lg uppercase tracking-wider">{attributionName}</span>
              <span className="block text-sm">{attributionTitle}</span>
            </div>
          )}
        </div>
      </section>
    );
  }

  // standard or with_attribution
  return (
    <section className="py-24 px-6 bg-obsidian">
      <div className="max-w-4xl mx-auto relative">
        <div className="absolute top-0 left-0 -ml-8 -mt-8 text-8xl text-white/5 font-serif select-none">&ldquo;</div>
        <blockquote className="relative z-10 text-xl md:text-3xl text-white leading-relaxed italic mb-10 border-l-4 border-brandRed pl-8 py-2">
          {quote}
        </blockquote>
        
        {(attributionName || attributionTitle) && (
          <div className="flex items-center gap-4 ml-8">
            {attributionImage && (
              <img src={attributionImage} alt={attributionName} className="w-12 h-12 rounded-full object-cover border-2 border-white/10" />
            )}
            <div>
              <div className="font-bold text-white">{attributionName}</div>
              <div className="text-sm text-brandRed">{attributionTitle}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
