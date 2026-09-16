import Link from "next/link";
import { createClient } from '@/utils/supabase/server'

export default async function Footer() {
  let footerData: any = null

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'footer')
      .single()
    footerData = data?.value
  } catch {
    // Graceful fallback to hardcoded values
  }

  const description = footerData?.description || 'Bridging innovation and absolute protection. Architecting defense postures that secure sovereigns, critical infrastructure, and enterprise operations.'
  const headquarters = footerData?.headquarters || 'GLOBAL HEADQUARTERS: USA & NIGERIA'
  const offices = footerData?.offices || [
    { city: 'ABUJA, NIGERIA', address: 'Suite 600, 6th Floor, Sector A,\nShashilga Court, Ahmadu Bello Way,\nAbuja, Nigeria', phone: '+234 7043419078' },
    { city: 'ORLANDO, FL', address: '520 East Church Street,\nUnit 1109,\nOrlando Florida, 32801, USA', phone: '+1 9298882357' },
  ]
  const email = footerData?.email || 'info@tsaroglobaldefence.com'
  const linkedin = footerData?.linkedin || '#'
  const copyright = footerData?.copyright || '© 2026 Tsaro Global Defence. All rights reserved.'

  return (
    <footer id="contact" className="bg-deepGray border-t border-white/10 pt-20 pb-12 px-6 md:px-12 text-sm">
        <div className="max-w-7xl mx-auto">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
                
                <div className="space-y-4">
                    <Link href="/" className="flex items-center gap-3 group inline-flex mb-6">
                        <img src="/tsaro-icon.png" alt="Tsaro Icon" className="h-10 w-auto object-contain" />
                        <img src="/tsaro-logo.png" alt="Tsaro Global Defence" className="h-6 w-auto object-contain brightness-105" />
                    </Link>
                    <p className="text-textMuted text-sm leading-relaxed">
                        {description}
                    </p>
                    <div className="pt-2 font-mono text-xs text-textLight/70">
                        {headquarters}
                    </div>
                </div>

                {offices.map((office: any, idx: number) => (
                  <div key={idx} className="space-y-3">
                      <h4 className="font-mono text-xs uppercase tracking-widest text-brandRed font-bold">{office.city}</h4>
                      <p className="text-textLight leading-relaxed" dangerouslySetInnerHTML={{ __html: (office.address || '').replace(/\n/g, '<br />') }} />
                      <p className="font-mono text-xs pt-1">
                          <span className="text-textMuted">TEL:</span>{' '}
                          <a href={`tel:${office.phone?.replace(/\s/g, '')}`} className="text-white hover:text-brandRed transition-colors">{office.phone}</a>
                      </p>
                  </div>
                ))}

                <div className="space-y-4">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-brandRed font-bold">COMMUNICATIONS</h4>
                    <p className="text-xs font-mono text-textMuted">
                        GENERAL INQUIRIES:<br />
                        <a href={`mailto:${email}`} className="text-white hover:text-brandRed transition-colors">{email}</a>
                    </p>
                    
                    <div className="flex items-center gap-3 pt-2">
                        <a href={linkedin} className="w-8 h-8 rounded bg-[#161B22] border border-white/10 hover:border-brandRed flex items-center justify-center text-textLight hover:text-white transition-colors" title="LinkedIn">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                    </div>
                </div>

            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-textMuted">
                <p>{copyright}</p>
                <div className="flex items-center gap-6">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <span>/</span>
                    <a href="#" className="hover:text-white transition-colors">Terms of Engagement</a>
                    <span>/</span>
                    <a href="#" className="hover:text-white transition-colors">Compliance</a>
                </div>
            </div>

        </div>
    </footer>
  )
}
