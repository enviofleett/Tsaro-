import { sanitizeHtml } from '@/lib/validation/sanitize';
export default function RichContentBlock({ content = {} }: { content?: Record<string, any> }) {
  const {
    variant = 'standard',
    heading,
    subheading,
    body,
    ctaLabel,
    ctaDest
  } = content;

  let widthClass = 'max-w-4xl';
  if (variant === 'narrow') widthClass = 'max-w-2xl';
  if (variant === 'wide') widthClass = 'max-w-7xl';

  return (
    <section className="py-24 px-6 bg-obsidian">
      <div className={`${widthClass} mx-auto`}>
        {(heading || subheading) && (
          <div className="mb-12">
            {heading && <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{heading}</h2>}
            {subheading && <h3 className="text-xl text-textLight">{subheading}</h3>}
          </div>
        )}

        <div className={`prose prose-invert prose-brand prose-lg w-full max-w-none ${variant === 'two_column' ? 'md:columns-2 md:gap-12' : ''}`} dangerouslySetInnerHTML={{ __html: sanitizeHtml(body || '') }} />

        {ctaLabel && (
          <div className="mt-12">
            <a href={ctaDest || '#'} className="btn-primary-red px-8 py-3 rounded font-bold inline-block">
              {ctaLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
