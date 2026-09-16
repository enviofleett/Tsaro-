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
    // Graceful fallback
  }

  const offices = footerData?.offices || [
    { city: 'ABUJA, NIGERIA', phone: '+234 704 341 9078' },
    { city: 'ORLANDO, FL', phone: '+1 929 888 2357' },
  ]
  const email = footerData?.email || 'info@tsaroglobaldefence.com'
  const linkedin = footerData?.linkedin || '#'
  
  // Custom links to match the new client mockup
    const col1Links = [
    { label: 'What We Do', href: '/#capabilities' },
    { label: 'Who We Serve', href: '/#about' },
    { label: 'Insights', href: '/#intelligence' },
    { label: 'Institute', href: '/#institute' },
    { label: 'Careers', href: '/careers' },
  ];
  
    const col2Links = [
    { label: 'Request a Briefing', href: '/#contact' },
    { label: 'Tsaro Academy', href: '/#institute' },
    { label: 'Contact Us', href: '/#contact' },
  ];

  return (
    <footer id="contact" className="bg-deepGray pt-16 pb-12 px-6 md:px-16 text-white font-sans border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 pb-12">
                
                {/* Left Side: Logo & Contact */}
                <div className="lg:col-span-5 space-y-8">
                    <Link href="/" className="flex items-center gap-3 group inline-flex">
                        <img src="/tsaro-icon.png" alt="Tsaro Icon" className="h-10 w-auto object-contain" />
                        <img src="/tsaro-logo.png" alt="Tsaro Global Defence" className="h-7 w-auto object-contain brightness-105" />
                    </Link>
                    
                    {/* Social Icons */}
                    <div className="flex items-center gap-5 text-white">
                        <a href={linkedin} className="hover:text-brandRed transition-colors" title="LinkedIn">
                            <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                        <a href="#" className="hover:text-brandRed transition-colors" title="X (Twitter)">
                            <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                        <a href="#" className="hover:text-brandRed transition-colors" title="Facebook">
                            <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                        </a>
                        <a href="#" className="hover:text-brandRed transition-colors" title="Instagram">
                            <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        </a>
                        <a href="#" className="hover:text-brandRed transition-colors" title="YouTube">
                            <svg className="w-[20px] h-[20px]" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.015 3.015 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        </a>
                    </div>

                    {/* Contact Methods */}
                    <div className="space-y-3 pt-2 text-sm font-medium tracking-wide">
                        <div className="flex items-center gap-3">
                            <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            <a href={`tel:${offices[0]?.phone?.replace(/\s/g, '')}`} className="hover:text-brandRed transition-colors">{offices[0]?.phone}</a>
                        </div>
                        <div className="flex items-center gap-3">
                            <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            <a href={`tel:${offices[1]?.phone?.replace(/\s/g, '')}`} className="hover:text-brandRed transition-colors">{offices[1]?.phone}</a>
                        </div>
                        <div className="flex items-center gap-3">
                            <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            <a href={`mailto:${email}`} className="hover:text-brandRed transition-colors">{email}</a>
                        </div>
                    </div>
                </div>

                {/* Right Side: Quick Links */}
                <div className="lg:col-span-7 pt-2">
                    <h4 className="text-white font-bold tracking-wider uppercase mb-8 text-[15px]">Quick Links</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-[15px] font-medium text-white/95">
                        {/* Column 1 */}
                        <div className="flex flex-col space-y-4">
                            {col1Links.map((link, idx) => (
                                <Link key={idx} href={link.href} className="hover:text-brandRed transition-colors inline-block w-fit">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        
                        {/* Column 2 */}
                        <div className="flex flex-col space-y-4">
                            {col2Links.map((link, idx) => (
                                <Link key={idx} href={link.href} className="hover:text-brandRed transition-colors inline-block w-fit">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </footer>
  )
}
