const fs = require('fs');
let content = fs.readFileSync('src/components/sections/AcademyHero.tsx', 'utf8');

content = content.replace(
  `const headline = content.headline || 'Tsaro Defence & <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-brandRed">Security Academy</span>'`,
  `const headline = content.headline || 'Tsaro Defence & <span class="text-brandRed">Security Academy</span>'`
);

content = content.replace(
  `className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6"`,
  `className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tight leading-[1.1] mb-6"`
);

content = content.replace(
  `className="text-lg sm:text-xl text-textLight leading-relaxed font-normal mb-8"`,
  `className="text-lg sm:text-xl text-textLight leading-relaxed font-sans mb-8"`
);

// Match background to homepage sections (remove inline tactical-mesh and use bg-[#1A1A17])
content = content.replace(
  `<section className="relative pt-36 pb-24 px-6 lg:px-12 border-b border-white/5" style={{
      backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(230, 32, 32, 0.06) 0%, transparent 55%), linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
      backgroundSize: '100% 100%, 48px 48px, 48px 48px'
    }}>`,
  `<section className="relative pt-36 pb-24 px-6 lg:px-12 border-b border-white/5 bg-[#1A1A17]">`
);

fs.writeFileSync('src/components/sections/AcademyHero.tsx', content);
