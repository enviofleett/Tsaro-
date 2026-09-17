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
  const headline = content?.headline || "";
  const subheadline = content?.subheadline || "";
  const image_url = content?.image_url || "";
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
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen={false}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                      width: '100vw',
                      height: '56.25vw', /* 16:9 aspect ratio (9/16 = 0.5625) */
                      minHeight: '100vh',
                      minWidth: '177.77vh', /* 16:9 aspect ratio (16/9 = 1.7777) */
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
        <div className="relative z-10 max-w-7xl w-full mx-auto text-center flex flex-col items-center">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold text-white tracking-tighter leading-[1.08] mb-6 drop-shadow-2xl" 
                style={{textShadow: '0 4px 24px rgba(0,0,0,0.85)'}}
                dangerouslySetInnerHTML={{ __html: headline }}
            />

            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-lg" 
               style={{textShadow: '0 2px 14px rgba(0,0,0,0.9)'}}>
                {subheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full sm:w-auto">
                <a href="#contact" className="btn-primary-red w-full sm:w-auto px-8 py-4 rounded-sm text-sm font-semibold tracking-widest uppercase text-center">
                    Request a Briefing
                </a>
                <a href="#capabilities" className="text-base font-bold text-white border-b-2 border-brandRed hover:border-white transition-colors pb-1">
                    See What We Do
                </a>
            </div>

            <div className="mt-14 flex flex-wrap justify-center items-center gap-6 text-xs text-textMuted/70 font-mono">
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
