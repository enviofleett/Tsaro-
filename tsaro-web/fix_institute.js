const fs = require('fs');
let content = fs.readFileSync('src/components/sections/TheInstitute.tsx', 'utf8');

content = content.replace(
`function getDomain(url?: string): string {
  if (!url) return ''
  try {
    const parsed = new URL(url.startsWith('http://') || url.startsWith('https://') ? url : \`https://\${url}\`)
    return parsed.hostname.toUpperCase()
  } catch {
    return url.replace(/^https?:\\/\\//i, '').split('/')[0].toUpperCase()
  }
}`,
`import Link from 'next/link';

function getDomain(url?: string): string {
  if (!url) return ''
  if (url.startsWith('/')) return ''
  try {
    const parsed = new URL(url.startsWith('http://') || url.startsWith('https://') ? url : \`https://\${url}\`)
    return parsed.hostname.toUpperCase()
  } catch {
    return url.replace(/^https?:\\/\\//i, '').split('/')[0].toUpperCase()
  }
}`
);

content = content.replace(
`          title: 'Tsaro Academy',
          description: 'Professional certification and command-tier training for the institutions we work with — run as its own school, not a page on this site.',
          link_url: 'https://academy.tsaroglobaldefence.com',
          link_text: 'VISIT ACADEMY',`,
`          title: 'Tsaro Academy',
          description: 'Professional certification and command-tier training for the institutions we work with — run as its own school.',
          link_url: '/academy',
          link_text: 'VISIT ACADEMY',`
);

content = content.replace(
`                                {domain && (
                                    <a 
                                        href={platform.link_url || '#'} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="inline-flex items-center gap-1 text-[10px] font-mono text-brandRed font-semibold tracking-widest uppercase mb-6 hover:text-white transition-colors"
                                    >
                                        {domain} 
                                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                        </svg>
                                    </a>
                                )}`,
`                                {domain && (
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
                                )}`
);

content = content.replace(
`                            <div>
                                <a 
                                    href={platform.link_url || '#'} 
                                    className="inline-flex items-center gap-2 text-xs font-bold text-white tracking-widest uppercase border-b border-transparent group-hover:border-white transition-all pb-1"
                                >
                                    {platform.link_text} <span className="font-normal">→</span>
                                </a>
                            </div>`,
`                            <div>
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
                            </div>`
);


fs.writeFileSync('src/components/sections/TheInstitute.tsx', content);
