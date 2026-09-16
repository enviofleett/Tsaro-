"use client";

import Image from 'next/image';
import { useState } from 'react';

interface InsightCard {
  category: string;
  title: string;
  excerpt: string;
  image: string;
  link: string;
}

const DEFAULT_INSIGHTS: InsightCard[] = [
  {
    category: "Policy Analysis",
    title: "National Security Architecture in Transitional Democracies",
    excerpt: "An examination of institutional frameworks governing defence and intelligence reform across emerging democracies in West Africa.",
    image: "/earth-nigeria.jpg",
    link: "#",
  },
  {
    category: "Infrastructure",
    title: "Critical Infrastructure Risk in the Age of Hybrid Threats",
    excerpt: "How converging physical and cyber vulnerabilities are reshaping the way governments protect essential services.",
    image: "/earth-orlando.jpg",
    link: "#",
  },
  {
    category: "Strategy",
    title: "From Advisory to Accountability: Rethinking the Consultancy Model",
    excerpt: "Why the separation between those who plan and those who build creates structural failure in complex programmes.",
    image: "/earth-europe.jpg",
    link: "#",
  },
];

export default function ResearchInsights({ content }: { content?: any }) {
  const insights: InsightCard[] = content?.insights?.length
    ? content.insights.map((item: any) => ({
        category: item.category || "",
        title: item.title || "",
        excerpt: item.excerpt || "",
        image: item.image || "",
        link: item.link || "#",
      }))
    : DEFAULT_INSIGHTS;

  const headline = content?.headline || "Research & Insights";
  const subheadline = content?.subheadline || "Original analysis from the field — informed by operations, not observation.";

  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="intelligence" className="py-24 px-6 md:px-12 bg-obsidian relative">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 gap-4 max-w-3xl mx-auto">
          <div className="text-[11px] font-mono text-brandRed font-semibold tracking-widest uppercase">
            Insights
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold tracking-tighter text-white leading-[1.08]">
            {headline}
          </h2>
          <p className="text-white/80 text-lg sm:text-xl leading-relaxed mt-4 max-w-2xl mx-auto">
            {subheadline}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map((item, idx) => (
            <article
              key={idx}
              className="group bg-charcoal border border-white/10 rounded-sm overflow-hidden hover:border-white/20 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              {item.image && (
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                </div>
              )}

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Category tag */}
                {item.category && (
                  <span className="text-[11px] font-mono text-brandRed font-semibold tracking-widest uppercase mb-4">
                    {item.category}
                  </span>
                )}

                <h3 className="text-lg font-semibold text-white mb-3 leading-snug group-hover:text-white/90 transition-colors">
                  {item.title}
                </h3>

                <p className="text-textMuted text-sm leading-relaxed mb-6 flex-1">
                  {item.excerpt}
                </p>

                {/* Read more link */}
                {item.link && item.link !== "#" ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-white/70 hover:text-brandRed transition-colors mt-auto"
                  >
                    Read more
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-xs font-mono text-white/40 mt-auto">
                    Coming soon
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
