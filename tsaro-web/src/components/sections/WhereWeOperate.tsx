"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Globe to disable SSR (SVG map requires browser APIs)
const DynamicGlobe = dynamic(() => import('./Globe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-full border border-white/10 animate-pulse bg-deepGray flex items-center justify-center">
      <div className="text-white/30 text-sm">Loading map…</div>
    </div>
  ),
});

interface Location {
  name: string;
  image: string;
  address: string;
  coords: [number, number];
}

function getCoordsFromName(name: string): [number, number] {
  const n = name.toLowerCase();
  if (n.includes('orlando')) return [28.5383, -81.3792];
  if (n.includes('abuja')) return [9.0579, 7.4951];
  if (n.includes('europe') || n.includes('london')) return [51.5072, -0.1276];
  return [0, 0];
}

const DEFAULT_LOCATIONS: Location[] = [
  { name: "Abuja, Nigeria", image: "", address: "Tsaro Africa Operations Center\nCentral Business District, Abuja", coords: [9.0579, 7.4951] },
  { name: "Orlando, FL", image: "", address: "Tsaro North America HQ\nDowntown Orlando, Florida", coords: [28.5383, -81.3792] },
  { name: "Europe", image: "", address: "Strategic Partnership Desk\nEuropean Union", coords: [51.5072, -0.1276] },
];

export default function WhereWeOperate({ content }: { content?: any }) {
  const rawLocations = content?.locations?.length ? content.locations : DEFAULT_LOCATIONS;
  const locations: Location[] = rawLocations.map((loc: any) => ({
    name: loc.name || "",
    image: loc.image || "",
    address: loc.address || "",
    coords: loc.coords || getCoordsFromName(loc.name || ""),
  }));

  const headline = content?.headline || "Where we operate";
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section className="py-32 px-6 md:px-12 bg-charcoal relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

        {/* Left Side: Location List */}
        <div className="lg:w-1/2 w-full z-10 flex flex-col">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold tracking-tighter text-white leading-[1.08] mb-12 text-left">
            {headline}
          </h2>

          <div className="flex flex-col gap-6">
            {locations.map((loc, idx) => (
              <div
                key={idx}
                onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
                className={`p-6 rounded-lg border transition-all duration-300 cursor-pointer ${
                  activeIdx === idx
                    ? 'bg-deepGray border-brandRed/50 shadow-[0_0_30px_rgba(215,35,35,0.15)]'
                    : 'bg-deepGray/40 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`mt-1.5 w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeIdx === idx ? 'bg-brandRed animate-pulse' : 'bg-white/20'}`} />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{loc.name}</h3>
                    {loc.address ? (
                      <p className="text-textMuted text-sm leading-relaxed whitespace-pre-line">
                        {loc.address}
                      </p>
                    ) : (
                      <p className="text-textMuted text-sm italic">Contact for clearance details</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Globe Map */}
        <div className="lg:w-1/2 w-full max-w-lg aspect-square relative flex items-center justify-center">
          <div className="absolute inset-0 bg-brandRed/5 rounded-full blur-[100px] pointer-events-none" />
          <DynamicGlobe
            locations={locations}
            activeIdx={activeIdx}
            onLocationClick={(idx) => setActiveIdx(activeIdx === idx ? null : idx)}
          />
        </div>

      </div>
    </section>
  );
}
