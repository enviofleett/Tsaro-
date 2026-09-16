import Link from 'next/link';

export default function WhereWeOperate({ content }: { content?: any }) {
  const headline = content?.headline || "Where we operate";
  
  // Default fallback matching the new client mockup
  const regions = (content?.locations && content.locations.length > 0) 
    ? content.locations.map((loc: any) => ({ ...loc, details: loc.details || loc.address })) 
    : [
        {
          name: "Americas",
          image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop", // Earth from space focusing on americas approx
          details: "",
          link: "#"
        },
        {
          name: "Europe & Middle East:",
          image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=800&auto=format&fit=crop", // Earth focusing on europe approx
          details: "",
          link: "#"
        },
        {
          name: "Indo-Pacific:",
          image: "", // Blank black background
          details: "Centerra\nTriple Canopy",
          link: ""
        }
      ];

  return (
    <section className="py-24 bg-[#0a0a0a] relative border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold tracking-tighter text-white mb-12 text-center lg:text-left">
          {headline}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {regions.map((region: any, idx: number) => (
            <div 
              key={idx}
              className={`relative h-[300px] sm:h-[400px] w-full group overflow-hidden ${!region.image ? 'bg-black border border-white/10' : ''}`}
            >
              {region.image && (
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${region.image}')` }}
                >
                  {/* Subtle dark gradient overlay so text is readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
              )}

              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex justify-between items-end w-full">
                  <div className="text-white">
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                      {region.name}
                    </h3>
                    {region.details && (
                      <p className="text-sm text-white/80 whitespace-pre-line font-medium leading-relaxed">
                        {region.details}
                      </p>
                    )}
                  </div>
                  
                  {region.link && (
                    <a 
                      href={region.link}
                      className="w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center text-white shrink-0 hover:bg-[#0099e6] transition-colors shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
