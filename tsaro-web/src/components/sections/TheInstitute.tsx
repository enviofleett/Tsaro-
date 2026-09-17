import Link from 'next/link';

function getDomain(url?: string): string {
  if (!url) return ''
  if (url.startsWith('/')) return ''
  try {
    const parsed = new URL(url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`)
    return parsed.hostname.toUpperCase()
  } catch {
    return url.replace(/^https?:\/\//i, '').split('/')[0].toUpperCase()
  }
}

export default function TheInstitute({ content }: { content?: any }) {
  const headline = content?.headline || ''
  const subtitle = content?.subtitle || content?.text_1 || ''
  const platforms = (content?.platforms && content.platforms.length > 0)
    ? content.platforms
    : [
        {
          title: 'Tsaro Academy',
          description: 'Professional certification and command-tier training for the institutions we work with — run as its own school, not a page on this site.',
          link_url: '/academy',
          link_text: 'VISIT ACADEMY',
        },
        {
          title: 'Tsaro Security Conversations',
          description: 'A standing forum convening policymakers and practitioners across national, continental, and global tiers.',
          link_url: 'https://conversations.tsaroglobaldefence.com',
          link_text: 'VISIT CONVERSATIONS',
        },
      ]

  return (
    <section id="institute" className="py-24 px-6 md:px-12 bg-[#1A1A17] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
            
            {/* Header Section */}
            <div className="flex flex-col items-center text-center mb-16 gap-4 max-w-3xl mx-auto">
                <h2 
                    className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold tracking-tighter text-white leading-[1.08]"
                    dangerouslySetInnerHTML={{ __html: headline }}
                />
                <p className="text-white/80 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
                    {subtitle}
                </p>
            </div>

            {/* 2-Column Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 border border-white/10 rounded-sm">
                {platforms.map((platform: any, index: number) => {
                    const isLast = index === platforms.length - 1
                    const domain = getDomain(platform.link_url)

                    return (
                        <div 
                            key={index} 
                            className={`p-10 flex flex-col justify-between ${!isLast ? 'border-b md:border-b-0 md:border-r' : ''} border-white/10 hover:bg-white/[0.02] transition-colors group`}
                        >
                            <div>
                                {domain && (
                                    <a 
                                        href={platform.link_url || '#'} 
                                        target={platform.link_url?.startsWith('/') ? '_self' : '_blank'} 
                                        rel="noopener noreferrer" 
                                        className="inline-flex items-center gap-1 text-[10px] font-mono text-brandRed font-semibold tracking-widest uppercase mb-6 hover:text-white transition-colors"
                                    >
                                        {domain} 
                                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                        </svg>
                                    </a>
                                )}
                                <h3 className="text-2xl font-semibold text-white mb-4">
                                    {platform.title}
                                </h3>
                                <p className="text-textMuted text-sm leading-relaxed mb-12">
                                    {platform.description}
                                </p>
                            </div>
                            <div>
                                {platform.link_url?.startsWith('/') ? (
                                    <Link 
                                        href={platform.link_url} 
                                        className="inline-flex items-center gap-2 text-xs font-bold text-white tracking-widest uppercase border-b border-transparent group-hover:border-white transition-all pb-1"
                                    >
                                        {platform.link_text} <span className="font-normal">→</span>
                                    </Link>
                                ) : (
                                    <a 
                                        href={platform.link_url || '#'} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-xs font-bold text-white tracking-widest uppercase border-b border-transparent group-hover:border-white transition-all pb-1"
                                    >
                                        {platform.link_text} <span className="font-normal">→</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </section>
  )
}
