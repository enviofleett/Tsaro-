const fs = require('fs');

let content = fs.readFileSync('src/app/admin/pages/[id]/SectionForm.tsx', 'utf8');

const oldSelect = `<select value={p.type || ''} onChange={(e) => handleArrayChange('programs', i, 'type', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm">
                  <option value="">Select Category...</option>
                  <option value="kinetic">Kinetic & Weapons</option>
                  <option value="protection">Protection & Medical</option>
                  <option value="intel">Cyber & Intelligence</option>
                  <option value="infrastructure">Infrastructure Defence</option>
                </select>`;

const newSelect = `<select value={p.type || ''} onChange={(e) => handleArrayChange('programs', i, 'type', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm">
                  <option value="">Select Category...</option>
                  {(content.categories || 'kinetic:Kinetic & Weapons, protection:Protection & Medical, intel:Cyber & Intelligence, infrastructure:Infrastructure Defence').split(',').map((catStr: string, idx: number) => {
                    const parts = catStr.split(':');
                    const val = parts[0].trim();
                    const label = parts[1] ? parts[1].trim() : val;
                    return <option key={idx} value={val}>{label}</option>
                  })}
                </select>`;

content = content.replace(oldSelect, newSelect);

const oldHeader = `<div className="flex items-center justify-between"><h4 className="text-white font-semibold">Programs</h4><button type="button" onClick={() => { const programs = [...(content.programs || [])]; programs.push({}); setContent({ ...content, programs }); }} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors">+ Add Program</button></div>`;

const newHeader = `
          <div className="mb-6">
            <label className="block text-sm font-medium text-textLight mb-1">Available Categories (format: value:Label, comma separated)</label>
            <textarea 
              value={content.categories || 'kinetic:Kinetic & Weapons, protection:Protection & Medical, intel:Cyber & Intelligence, infrastructure:Infrastructure Defence'} 
              onChange={(e) => setContent({...content, categories: e.target.value})} 
              className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm h-16"
              placeholder="e.g. kinetic:Kinetic & Weapons, protection:Protection & Medical"
            />
          </div>
          <div className="flex items-center justify-between"><h4 className="text-white font-semibold">Programs</h4><button type="button" onClick={() => { const programs = [...(content.programs || [])]; programs.push({}); setContent({ ...content, programs }); }} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors">+ Add Program</button></div>`;

content = content.replace(oldHeader, newHeader);

fs.writeFileSync('src/app/admin/pages/[id]/SectionForm.tsx', content);

