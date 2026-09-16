"use client";

import Image from 'next/image';
import { useState } from 'react';

interface Location {
  name: string;
  image: string;
  address: string;
}

const DEFAULT_LOCATIONS: Location[] = [
  { name: "Abuja, Nigeria", image: "/earth-nigeria.jpg", address: "" },
  { name: "Orlando, FL", image: "/earth-orlando.jpg", address: "" },
  { name: "Europe", image: "/earth-europe.jpg", address: "" }
];

export default function WhereWeOperate({ content }: { content?: any }) {
  const locations: Location[] = content?.locations?.length
    ? content.locations.map((loc: any) => ({
        name: loc.name || "",
        image: loc.image || "",
        address: loc.address || "",
      }))
    : DEFAULT_LOCATIONS;

  const headline = content?.headline || "Where we operate";

  const [activeCard, setActiveCard] = useState<number | null>(null);

  const toggleCard = (idx: number) => {
    setActiveCard(activeCard === idx ? null : idx);
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-charcoal relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-serif font-normal text-white tracking-tight leading-tight mb-16">
          {headline}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((loc, idx) => (
            <div 
              key={idx} 
              className="relative aspect-[16/10] rounded-sm overflow-hidden group cursor-pointer"
              onClick={() => loc.address && toggleCard(idx)}
            >
              {/* Background satellite image */}
              <Image
                src={loc.image}
                alt={`Satellite view of ${loc.name}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Address overlay — shown on click */}
              {activeCard === idx && loc.address && (
                <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col justify-center p-6 animate-in fade-in duration-300">
                  <h3 className="text-lg font-semibold text-white mb-3">{loc.name}</h3>
                  <p className="text-textMuted text-sm leading-relaxed whitespace-pre-line">{loc.address}</p>
                  <span className="mt-4 text-xs text-textMuted/60">Click to close</span>
                </div>
              )}
              
              {/* Location name + tap hint */}
              {activeCard !== idx && (
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                  <h3 className="text-xl font-semibold text-white">
                    {loc.name}
                  </h3>
                  {loc.address && (
                    <span className="text-xs text-textMuted/70 group-hover:text-white transition-colors">
                      View address →
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
