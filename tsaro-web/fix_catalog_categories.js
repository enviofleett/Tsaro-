const fs = require('fs');
let catalog = fs.readFileSync('src/components/sections/AcademyCatalog.tsx', 'utf8');

const oldTabs = `{['all', 'kinetic', 'protection', 'intel', 'infrastructure'].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={\`pb-3 font-medium whitespace-nowrap \${filter === f ? 'text-brandRed border-b-2 border-brandRed' : 'text-textMuted hover:text-white'}\`}>
                {f === 'all' ? 'All Disciplines' : f === 'kinetic' ? 'Kinetic & Weapons' : f === 'protection' ? 'Protection & Medical' : f === 'intel' ? 'Cyber & Intelligence' : 'Infrastructure Defence'}
              </button>
            ))}`;

const newTabs = `
            <button onClick={() => setFilter('all')} className={\`pb-3 font-medium whitespace-nowrap \${filter === 'all' ? 'text-brandRed border-b-2 border-brandRed' : 'text-textMuted hover:text-white'}\`}>
              All Disciplines
            </button>
            {(content.categories || 'kinetic:Kinetic & Weapons, protection:Protection & Medical, intel:Cyber & Intelligence, infrastructure:Infrastructure Defence').split(',').map((catStr: string, idx: number) => {
              const parts = catStr.split(':');
              const val = parts[0].trim();
              const label = parts[1] ? parts[1].trim() : val;
              return (
                <button key={idx} onClick={() => setFilter(val)} className={\`pb-3 font-medium whitespace-nowrap \${filter === val ? 'text-brandRed border-b-2 border-brandRed' : 'text-textMuted hover:text-white'}\`}>
                  {label}
                </button>
              )
            })}`;

catalog = catalog.replace(oldTabs, newTabs);

fs.writeFileSync('src/components/sections/AcademyCatalog.tsx', catalog);

