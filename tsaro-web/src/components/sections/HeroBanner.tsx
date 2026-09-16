"use client";

import { useMemo } from 'react';

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default function HeroBanner({ content }: { content?: any }) {
  const headline = content?.headline || `Strategy that survives <br /> contact with the ground.`;
  const subheadline = content?.subheadline || `We take on the kind of national and institutional problems that most firms will diagnose but few will stay to solve — carrying the work from the first policy question through to the contractors, budgets, and people who make it real.`;
  const image_url = content?.image_url || "/hero-banner.png";
  const video_url = content?.video_url || "";

  const youtubeId = useMemo(() => extractYouTubeId(video_url), [video_url]);
  const hasVideo = !!youtubeId;

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden tactical-mesh">
        {/* Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {hasVideo ? (
              <>
                {/* YouTube iframe embed — muted autoplay loop, no controls */}
                <div className="absolute inset-0 overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3&fs=0`}
                    title="Background Video"
                    allow="autoplay; encrypted-media"
                    allowFullScreen={false}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                      width: '177.78vh',   // 16:9 ratio — always covers
                      height: '100vh',
                      minWidth: '100%',
                      minHeight: '100%',
                      border: 'none',
                    }}
                  />
                </div>
              </>
            ) : (
              <img src={image_url} alt="Defense Operations" className="w-full h-full object-cover object-center opacity-95 filter contrast-105 brightness-95" />
            )}
            {/* Subtle edge-blend and text scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/40"></div>
            <div className="absolute inset-0" style={{background: 'radial-gradient(circle at 50% 45%, rgba(24, 24, 27, 0.1) 0%, rgba(24, 24, 27, 0.5) 80%, #18181B 100%)'}}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl w-full mx-auto text-left flex flex-col items-start">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-white tracking-tight leading-[1.08] mb-6 drop-shadow-2xl" 
                style={{textShadow: '0 4px 24px rgba(0,0,0,0.85)'}}
                dangerouslySetInnerHTML={{ __html: headline }}
            />

            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mb-10 leading-relaxed drop-shadow-lg" 
               style={{textShadow: '0 2px 14px rgba(0,0,0,0.9)'}}>
                {subheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-start gap-8 w-full sm:w-auto">
                <a href="#contact" className="btn-primary-red w-full sm:w-auto px-8 py-4 rounded-sm text-sm font-semibold tracking-widest uppercase text-center">
                    Request a Briefing
                </a>
                <a href="#capabilities" className="text-base font-bold text-white border-b-2 border-brandRed hover:border-white transition-colors pb-1">
                    See What We Do
                </a>
            </div>

            <div className="mt-14 flex flex-wrap justify-start items-center gap-6 text-xs text-textMuted/70 font-mono">
                <span>EST. 2018</span>
                <span>/</span>
                <span>USA &amp; NIGERIA HEADQUARTERS</span>
                <span>/</span>
                <span>ENTERPRISE &amp; SOVEREIGN ACCREDITED</span>
            </div>
        </div>
    </section>
  )
}
