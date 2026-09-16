export default function CoreValues({ content = {} }: { content?: any }) {
  const headline = content.headline || 'Our Core Values'
  const subheadline = content.subheadline || 'We promise not to compromise on any of these core values as they form the very essence of our existence and have informed our success over the years.'
  const values = content.values || [
    { title: 'Confidentiality', desc: 'Confidentiality is the bedrock of our operations at Tsaro. We understand the significance of safeguarding sensitive information and classified data. Our commitment to confidentiality ensures that the trust bestowed upon us by our clients and partners remains unfaltering as we treat every piece of information with utmost privacy.', tag: 'DATA & IDENTITY INTEGRITY' },
    { title: 'Integrity', desc: 'At Tsaro, integrity is not just a value; it\'s a way of life. We uphold the highest ethical standards in every aspect of our work. Our unwavering commitment to honesty, transparency, and moral principles is a testament to our dedication to protecting client’s interests with honor and dignity.', tag: 'ETHICAL LEADERSHIP' },
    { title: 'Professionalism', desc: 'Professionalism is the cornerstone of our services. We hold ourselves to the highest professional standards in every endeavor we undertake. Our team is composed of skilled, disciplined, and dedicated experts who bring their best to bear at every given opportunity, taking pride in consistently delivering excellence.', tag: 'DISCIPLINE & EXPERTISE' }
  ]

  return (
    <section className="py-24 px-6 lg:px-12 bg-charcoal/40 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-3 mb-4 tracking-tight" dangerouslySetInnerHTML={{ __html: headline }} />
          <p className="text-textMuted text-base sm:text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: subheadline }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v: any, i: number) => (
            <div key={i} className="value-card rounded-xl p-8 flex flex-col justify-between border border-white/5 bg-[#18181B]">
              <div>
                <div className="w-12 h-12 rounded bg-[#212126] border border-white/10 flex items-center justify-center text-brandRed mb-6">
                  {i === 0 && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>}
                  {i === 1 && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>}
                  {i > 1 && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
                <p className="text-textMuted text-sm leading-relaxed mb-6">{v.desc}</p>
              </div>
              <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-textMuted">
                <span>{v.tag}</span>
                <span className="text-brandRed font-bold">0{i + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
