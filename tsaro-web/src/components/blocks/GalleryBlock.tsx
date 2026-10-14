export default function GalleryBlock({ content = {} }: { content?: Record<string, any> }) {
  const {
    variant = 'single',
    images = [], // Array of { url, alt, caption }
    caption
  } = content;

  if (!images || images.length === 0) return null;

  if (variant === 'single') {
    return (
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <figure className="relative rounded-xl overflow-hidden shadow-2xl">
          <img src={images[0].url} alt={images[0].alt || 'Feature Image'} className="w-full h-auto object-cover max-h-[80vh]" />
          {(caption || images[0].caption) && (
            <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white text-sm text-center">
              {caption || images[0].caption}
            </figcaption>
          )}
        </figure>
      </section>
    );
  }

  if (variant === 'two_column') {
    return (
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.slice(0, 2).map((img: Record<string, any>, idx: number) => (
            <figure key={idx} className="relative rounded-xl overflow-hidden shadow-xl aspect-square md:aspect-[4/3] bg-deepGray">
              <img src={img.url} alt={img.alt || 'Gallery Image'} className="w-full h-full object-cover" />
              {img.caption && (
                <figcaption className="absolute bottom-0 inset-x-0 bg-black/60 p-4 text-white text-xs text-center backdrop-blur-sm">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </section>
    );
  }

  // grid or gallery
  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${variant === 'gallery' ? 'auto-rows-[200px]' : ''}`}>
        {images.map((img: Record<string, any>, idx: number) => (
          <div key={idx} className={`relative rounded-lg overflow-hidden bg-deepGray group ${variant === 'gallery' && idx % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
            <img src={img.url} alt={img.alt || 'Gallery Image'} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
               {img.caption && <span className="text-white text-xs truncate w-full">{img.caption}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
