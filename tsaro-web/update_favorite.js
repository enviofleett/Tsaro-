const fs = require('fs');

let content = fs.readFileSync('src/app/admin/pages/[id]/SectionForm.tsx', 'utf8');

// Add isFavorite checkbox to academy_catalog programs
content = content.replace(
  `<div className="flex items-center justify-between mb-2"><div className="text-xs text-brandRed font-bold">PROGRAM {i + 1}</div><button type="button" onClick={() => { const programs = [...(content.programs || [])]; programs.splice(i, 1); setContent({ ...content, programs }) }} className="text-xs text-textMuted hover:text-brandRed">Remove</button></div>`,
  `<div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="text-xs text-brandRed font-bold">PROGRAM {i + 1}</div>
                    <label className="flex items-center gap-1 text-xs text-textLight bg-black/20 px-2 py-1 rounded cursor-pointer hover:bg-black/40">
                      <input type="checkbox" checked={p.isFavorite || false} onChange={(e) => {
                        // Uncheck others
                        const programs = [...(content.programs || [])].map(prog => ({ ...prog, isFavorite: false }));
                        programs[i].isFavorite = e.target.checked;
                        setContent({ ...content, programs });
                      }} className="accent-brandRed" />
                      ⭐ Featured Flagship
                    </label>
                  </div>
                  <button type="button" onClick={() => { const programs = [...(content.programs || [])]; programs.splice(i, 1); setContent({ ...content, programs }) }} className="text-xs text-textMuted hover:text-brandRed">Remove</button>
                </div>`
);

fs.writeFileSync('src/app/admin/pages/[id]/SectionForm.tsx', content);

// Update page.tsx to map favorite to flagship
let page = fs.readFileSync('src/app/[slug]/page.tsx', 'utf8');

page = page.replace(
  `if (section.section_type === 'academy_flagship') return <AcademyFlagship key={section.id} content={section.content} />`,
  `if (section.section_type === 'academy_flagship') {
            const catalogSection = sections?.find((s: any) => s.section_type === 'academy_catalog')
            let favoriteContent = section.content as any;
            if (catalogSection && (catalogSection.content as any).programs) {
              const favorite = (catalogSection.content as any).programs.find((p: any) => p.isFavorite)
              if (favorite) {
                favoriteContent = {
                  ...favoriteContent,
                  badge: favorite.badge || favoriteContent.badge,
                  image: favorite.image || favoriteContent.image,
                  imageBadge: favorite.format ? \`\${favorite.format} • \${favorite.duration}\` : favoriteContent.imageBadge,
                  code: favorite.code || favoriteContent.code,
                  codeType: favorite.type || favoriteContent.codeType,
                  title: favorite.title || favoriteContent.title,
                  desc: favorite.desc || favoriteContent.desc,
                  startDate: favorite.startDate || favorite.date || favoriteContent.startDate,
                  endDate: favorite.endDate || favoriteContent.endDate,
                  timeRange: favorite.timeRange || favoriteContent.timeRange,
                }
              }
            }
            return <AcademyFlagship key={section.id} content={favoriteContent} />
          }`
);

fs.writeFileSync('src/app/[slug]/page.tsx', page);
