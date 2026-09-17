export default function PullQuote({ content = {} }: { content?: any }) {
  const quote = content.quote || ''
  const author = content.author || ''

  return (
    <section className="py-20 px-6 lg:px-12 bg-[#212126] border-y border-white/5 relative">
      <div className="max-w-5xl mx-auto text-center">
        <div className="w-12 h-12 rounded-full bg-[#18181B] border border-white/10 flex items-center justify-center text-brandRed mx-auto mb-8">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
        </div>
        <blockquote className="text-xl sm:text-2xl md:text-3xl font-medium text-white leading-relaxed mb-8 max-w-4xl mx-auto" dangerouslySetInnerHTML={{ __html: quote }} />
        <p className="text-textMuted text-sm font-mono uppercase tracking-widest">{author}</p>
      </div>
    </section>
  )
}
