import AcademyContent from './AcademyContent'
import Link from 'next/link'

export default function AcademyPage() {
  return (
    <div className="bg-[#1A1A17] min-h-screen text-white">
      {/* Standalone Academy Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 py-4 px-6 lg:px-12 bg-obsidian/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
                <img src="/tsaro-icon.png" alt="Tsaro Icon" className="h-8 sm:h-9 w-auto object-contain group-hover:opacity-90 transition-opacity" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold tracking-widest uppercase leading-tight">TSARO</span>
                  <span className="text-[10px] font-mono text-brandRed tracking-widest uppercase">ACADEMY</span>
                </div>
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-textLight">
                <a href="#catalog" className="hover:text-white transition-colors">Course Catalog</a>
                <a href="#methodology" className="hover:text-white transition-colors">Methodology</a>
                <a href="https://tsaroglobaldefence.com" className="text-xs font-mono text-textMuted hover:text-white transition-colors uppercase tracking-widest">
                  ← Back to Main Site
                </a>
            </nav>
        </div>
      </header>

      <AcademyContent />
      
      {/* Standalone Academy Footer */}
      <footer className="bg-obsidian border-t border-white/5 py-12 px-6 lg:px-12 text-center">
        <p className="text-textMuted text-sm">
          &copy; {new Date().getFullYear()} Tsaro Academy. A division of Tsaro Global Defence.
        </p>
      </footer>
    </div>
  )
}
