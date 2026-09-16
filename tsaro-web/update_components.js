const fs = require('fs');

// Update AcademyFlagship
let flagship = fs.readFileSync('src/components/sections/AcademyFlagship.tsx', 'utf8');

flagship = flagship.replace(
  `const date = content.date || 'October 15, 2026'`,
  `const startDate = content.startDate || content.date || '2026-10-15'
  const endDate = content.endDate || ''
  const timeRange = content.timeRange || '0900 - 1700 HRS'
  
  const formatDate = (dStr: string) => {
    if (!dStr) return '';
    try {
      return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(dStr));
    } catch {
      return dStr;
    }
  }
  
  const formattedStart = formatDate(startDate);
  const formattedEnd = endDate ? formatDate(endDate) : '';
  const displayDate = formattedEnd ? \`\${formattedStart} - \${formattedEnd}\` : formattedStart;`
);

flagship = flagship.replace(
  `<div>
                <span className="block text-[11px] font-mono text-textMuted uppercase">Next Induction</span>
                <span className="text-sm font-semibold text-white">{date}</span>
              </div>`,
  `<div>
                <span className="block text-[11px] font-mono text-textMuted uppercase">Next Induction</span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">{displayDate}</span>
                  {timeRange && <span className="text-xs text-textMuted mt-0.5">{timeRange}</span>}
                </div>
              </div>`
);

fs.writeFileSync('src/components/sections/AcademyFlagship.tsx', flagship);

// Update AcademyCatalog
let catalog = fs.readFileSync('src/components/sections/AcademyCatalog.tsx', 'utf8');

catalog = catalog.replace(
  `                      <span className="text-sm font-bold text-white">{p.date || 'TBA'}</span>`,
  `                      <div className="flex flex-col text-right">
                        <span className="text-sm font-bold text-white">
                          {p.startDate ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(p.startDate)) : (p.date || 'TBA')}
                          {p.endDate && \` - \${new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(p.endDate))}\`}
                        </span>
                        {p.timeRange && <span className="text-[10px] text-textMuted mt-0.5">{p.timeRange}</span>}
                      </div>`
);

fs.writeFileSync('src/components/sections/AcademyCatalog.tsx', catalog);
