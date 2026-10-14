import { sanitizeHtml } from '@/lib/validation/sanitize';
export default function TextImageBlock({ content = {} }: { content?: Record<string, any> }) {
  const {
    variant = '50_50',
    eyebrow,
    heading,
    subheading,
    body,
    image,
    imageAlt,
    ctaLabel,
    ctaDest
  } = content;

  let textColClass = 'lg:col-span-6';
  let imgColClass = 'lg:col-span-6';
  let isImageLeft = false;

  if (variant === 'image_left') {
    isImageLeft = true;
  } else if (variant === '60_40') {
    textColClass = 'lg:col-span-7';
    imgColClass = 'lg:col-span-5';
  } else if (variant === '40_60') {
    textColClass = 'lg:col-span-5';
    imgColClass = 'lg:col-span-7';
  } else if (variant === 'image_left_60_40') {
    isImageLeft = true;
    textColClass = 'lg:col-span-5';
    imgColClass = 'lg:col-span-7';
  }

  return (
    <section className="py-24 px-6 bg-charcoal">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className={`${textColClass} ${isImageLeft ? 'lg:order-2' : ''}`}>
            {eyebrow && <span className="text-brandRed font-bold tracking-widest uppercase text-xs mb-3 block">{eyebrow}</span>}
            {heading && <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{heading}</h2>}
            {subheading && <h3 className="text-xl text-textLight mb-6">{subheading}</h3>}
            {body && <div className="text-textMuted leading-relaxed mb-8 prose prose-invert prose-brand" dangerouslySetInnerHTML={{ __html: sanitizeHtml(body) }} />}
            
            {ctaLabel && (
              <a href={ctaDest || '#'} className="inline-flex items-center gap-2 text-brandRed font-semibold hover:text-white transition-colors">
                {ctaLabel} &rarr;
              </a>
            )}
          </div>

          <div className={`${imgColClass} ${isImageLeft ? 'lg:order-1' : ''}`}>
            <div className="rounded-xl overflow-hidden border border-white/10 relative shadow-xl">
              {image ? (
                <img src={image} alt={imageAlt || 'Content Image'} className="w-full h-auto object-cover" />
              ) : (
                <div className="w-full aspect-[4/3] bg-deepGray flex items-center justify-center text-textMuted">Image Placeholder</div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
