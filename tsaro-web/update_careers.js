const fs = require('fs');

let content = fs.readFileSync('src/app/careers/page.tsx', 'utf8');

// 1. Remove Neural Recruitment badge
content = content.replace(
  /<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white\/5 border border-white\/10 mb-6">[\s\S]*?<\/div>/g,
  ''
);

// 2. Make hero text solid white instead of gradient
content = content.replace(
  /text-transparent bg-clip-text bg-gradient-to-b from-white to-white\/50/g,
  'text-white'
);

// 3. Remove the core values grid (the one with Algorithmic Precision, etc)
// I will use regex or just string replacement since I know the exact structure
const gridBlock = `          {/* AI-Inspired Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            {[
              { id: '01', title: 'Algorithmic Precision', desc: 'Every tactical decision is backed by petabytes of real-time geospatial and threat-vector data.' },
              { id: '02', title: 'Radical Autonomy', desc: 'We deploy small, highly-empowered units that operate independently across theaters.' },
              { id: '03', title: 'Asymmetric Impact', desc: 'Your code and your strategy directly dictate the safety of sovereign infrastructures.' }
            ].map((v) => (
              <div key={v.id} className="bg-[#212126]/80 backdrop-blur-sm border border-white/10 p-8 rounded-xl hover:border-brandRed/50 transition-colors group">
                <div className="text-4xl font-mono text-white/10 font-bold mb-4 group-hover:text-brandRed/20 transition-colors">{v.id}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{v.title}</h3>
                <p className="text-sm text-textMuted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>`;

content = content.replace(gridBlock, '');

fs.writeFileSync('src/app/careers/page.tsx', content);

