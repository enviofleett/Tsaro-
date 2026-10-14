export default function CtaBlock({ content = {} }: { content?: Record<string, any> }) {
  const {
    variant = 'center',
    heading,
    supportingText,
    primaryBtnLabel,
    primaryBtnDest,
    secondaryBtnLabel,
    secondaryBtnDest,
    backgroundImage,
    bgColor = 'red',
    containerWidth = 'full'
  } = content;

  const bgStyle = backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {};

  // Background color classes
  let bgClass = '';
  let textClass = 'text-white';
  let subTextClass = 'text-white/80';
  let primaryBtnClass = 'bg-white text-black hover:bg-gray-100';
  let secondaryBtnClass = 'bg-transparent border-2 border-white text-white hover:bg-white/10';

  if (bgColor === 'red') {
    bgClass = 'bg-brandRed';
    primaryBtnClass = 'bg-white text-brandRed hover:bg-gray-100';
  } else if (bgColor === 'black') {
    bgClass = 'bg-obsidian';
  } else if (bgColor === 'gray') {
    bgClass = 'bg-charcoal';
  } else if (bgColor === 'white') {
    bgClass = 'bg-white border-y border-gray-200';
    textClass = 'text-black';
    subTextClass = 'text-gray-600';
    primaryBtnClass = 'bg-brandRed text-white hover:bg-red-700';
    secondaryBtnClass = 'bg-transparent border-2 border-black text-black hover:bg-black/5';
  }

  // Width classes
  let wrapperClass = 'py-24 px-6';
  let innerClass = 'relative z-10 flex flex-col';

  if (containerWidth === 'boxed') {
    wrapperClass = 'py-16 px-6 max-w-7xl mx-auto';
    innerClass = `relative z-10 flex flex-col p-12 md:p-16 rounded-2xl shadow-2xl ${bgClass} ${backgroundImage ? 'overflow-hidden' : ''}`;
    // clear outer bg
    bgClass = '';
  } else if (containerWidth === 'narrow') {
    wrapperClass = 'py-16 px-6 max-w-4xl mx-auto';
    innerClass = `relative z-10 flex flex-col p-10 md:p-14 rounded-2xl shadow-xl ${bgClass} ${backgroundImage ? 'overflow-hidden' : ''}`;
    // clear outer bg
    bgClass = '';
  } else {
    // full width
    innerClass += ' max-w-4xl mx-auto';
  }

  if (variant === 'compact') {
    return (
      <section className={`py-12 px-6 ${bgClass}`} style={containerWidth === 'full' ? bgStyle : {}}>
        <div className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 ${containerWidth !== 'full' ? bgClass : 'bg-black/20'} p-8 rounded-xl backdrop-blur-sm`} style={containerWidth !== 'full' ? bgStyle : {}}>
          <div>
            {heading && <h2 className={`text-2xl font-bold mb-2 ${textClass}`}>{heading}</h2>}
            {supportingText && <p className={subTextClass}>{supportingText}</p>}
          </div>
          <div className="flex gap-4 shrink-0">
            {primaryBtnLabel && <a href={primaryBtnDest || '#'} className={`${primaryBtnClass} px-6 py-2 rounded font-bold transition-colors`}>{primaryBtnLabel}</a>}
            {secondaryBtnLabel && <a href={secondaryBtnDest || '#'} className={`${secondaryBtnClass} px-6 py-2 rounded font-bold transition-colors`}>{secondaryBtnLabel}</a>}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'image') {
    return (
      <section className={`py-24 px-6 ${bgClass}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
          <div className={`p-12 md:p-16 flex flex-col justify-center ${containerWidth !== 'full' ? bgClass : 'bg-charcoal'}`}>
            {heading && <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textClass}`}>{heading}</h2>}
            {supportingText && <p className={`${subTextClass} mb-8 leading-relaxed`}>{supportingText}</p>}
            <div className="flex flex-wrap gap-4">
              {primaryBtnLabel && <a href={primaryBtnDest || '#'} className={`${primaryBtnClass} px-6 py-3 rounded font-bold`}>{primaryBtnLabel}</a>}
              {secondaryBtnLabel && <a href={secondaryBtnDest || '#'} className={`${secondaryBtnClass} px-6 py-3 rounded font-bold transition-colors`}>{secondaryBtnLabel}</a>}
            </div>
          </div>
          <div className="h-64 md:h-auto relative">
             {backgroundImage ? (
                <img src={backgroundImage} alt="CTA" className="w-full h-full object-cover" />
             ) : (
                <div className="w-full h-full bg-deepGray flex items-center justify-center text-white/20">Image Here</div>
             )}
          </div>
        </div>
      </section>
    );
  }

  // full width, boxed, or narrow
  return (
    <section className={`${wrapperClass} ${containerWidth === 'full' ? bgClass : ''} ${containerWidth === 'full' && backgroundImage ? 'relative' : ''}`} style={containerWidth === 'full' ? bgStyle : {}}>
      {containerWidth === 'full' && backgroundImage && <div className={`absolute inset-0 opacity-90 mix-blend-multiply ${bgColor === 'red' ? 'bg-brandRed' : bgColor === 'white' ? 'bg-white' : 'bg-black'}`}></div>}
      
      <div className={`${innerClass} ${variant === 'center' ? 'items-center text-center' : 'items-start text-left'}`} style={containerWidth !== 'full' ? bgStyle : {}}>
        {containerWidth !== 'full' && backgroundImage && <div className={`absolute inset-0 opacity-90 mix-blend-multiply ${bgColor === 'red' ? 'bg-brandRed' : bgColor === 'white' ? 'bg-white' : 'bg-black'}`}></div>}
        
        <div className="relative z-10 w-full flex flex-col items-center">
          {heading && <h2 className={`text-4xl md:text-5xl font-extrabold mb-6 leading-tight ${textClass}`}>{heading}</h2>}
          {supportingText && <p className={`${subTextClass} text-lg md:text-xl mb-10 text-center`}>{supportingText}</p>}
          <div className="flex flex-wrap gap-4 justify-center">
            {primaryBtnLabel && <a href={primaryBtnDest || '#'} className={`${primaryBtnClass} px-8 py-4 rounded font-bold text-lg transition-colors shadow-lg`}>{primaryBtnLabel}</a>}
            {secondaryBtnLabel && <a href={secondaryBtnDest || '#'} className={`${secondaryBtnClass} px-8 py-4 rounded font-bold text-lg transition-colors`}>{secondaryBtnLabel}</a>}
          </div>
        </div>
      </div>
    </section>
  );
}
