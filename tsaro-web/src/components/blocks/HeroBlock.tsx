import { sanitizeHtml } from '@/lib/validation/sanitize';
export default function HeroBlock({ content = {} }: { content?: Record<string, any> }) {
  const {
    variant = 'center',
    eyebrow,
    heading,
    subheading,
    body,
    image,
    videoUrl,
    primaryCtaLabel,
    primaryCtaDest,
    secondaryCtaLabel,
    secondaryCtaDest,
    overlayStrength = '50'
  } = content;

  const overlayOpacity = parseInt(overlayStrength) / 100;

  const renderContent = (align: 'center' | 'left' = 'center') => (
    <div className={`flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start text-left'} max-w-4xl z-10 relative`}>
      {eyebrow && <span className="text-brandRed font-bold tracking-widest uppercase text-sm mb-4">{eyebrow}</span>}
      {heading && <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">{heading}</h1>}
      {subheading && <h2 className="text-xl md:text-2xl text-textLight font-light mb-6">{subheading}</h2>}
      {body && <div className="text-textMuted mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitizeHtml(body) }} />}
      
      {(primaryCtaLabel || secondaryCtaLabel) && (
        <div className="flex flex-wrap gap-4 mt-4">
          {primaryCtaLabel && (
            <a href={primaryCtaDest || '#'} className="btn-primary-red px-8 py-3 rounded font-bold">
              {primaryCtaLabel}
            </a>
          )}
          {secondaryCtaLabel && (
            <a href={secondaryCtaDest || '#'} className="bg-white/10 hover:bg-white/20 px-8 py-3 rounded font-bold text-white transition-colors">
              {secondaryCtaLabel}
            </a>
          )}
        </div>
      )}
    </div>
  );

  if (variant === 'bg_video' && videoUrl) {
    return (
      <section className="relative min-h-[80vh] flex items-center justify-center px-6 py-24 overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-obsidian" style={{ opacity: overlayOpacity }}></div>
        {renderContent('center')}
      </section>
    );
  }

  if (variant === 'bg_image') {
    return (
      <section className="relative min-h-[80vh] flex items-center justify-center px-6 py-24 overflow-hidden" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-obsidian" style={{ opacity: overlayOpacity }}></div>
        {renderContent('center')}
      </section>
    );
  }

  if (variant === 'split_text_left' || variant === 'split_image_left') {
    const isImageLeft = variant === 'split_image_left';
    return (
      <section className="bg-obsidian py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`${isImageLeft ? 'lg:order-2' : ''}`}>
            {renderContent('left')}
          </div>
          <div className={`relative h-[400px] md:h-[600px] rounded-xl overflow-hidden ${isImageLeft ? 'lg:order-1' : ''}`}>
            {image ? (
              <img src={image} alt="Hero" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-deepGray flex items-center justify-center text-textMuted border border-white/10">Image Placeholder</div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // center or left (no background image just solid)
  return (
    <section className="bg-obsidian min-h-[60vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-7xl mx-auto w-full flex justify-center">
        {renderContent(variant === 'left' ? 'left' : 'center')}
      </div>
    </section>
  );
}
