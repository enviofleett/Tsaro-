const fs = require('fs');
let content = fs.readFileSync('src/app/admin/pages/[id]/SectionForm.tsx', 'utf8');

content = content.replace(
  `<div><label className="block text-sm font-medium text-textLight mb-1">Next Induction Date</label><input type="text" name="date" value={content.date || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>`,
  `<div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-textLight mb-1">Start Date</label><input type="date" name="startDate" value={content.startDate || content.date || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
            <div><label className="block text-sm font-medium text-textLight mb-1">End Date</label><input type="date" name="endDate" value={content.endDate || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          </div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Time Range</label><input type="text" name="timeRange" placeholder="e.g. 0900 HRS - 1700 HRS" value={content.timeRange || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>`
);

content = content.replace(
  `<input type="text" placeholder="Next Intake Date" value={p.date || ''} onChange={(e) => handleArrayChange('programs', i, 'date', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />`,
  `<div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-textMuted uppercase mb-1">Start Date</span>
                    <input type="date" value={p.startDate || p.date || ''} onChange={(e) => handleArrayChange('programs', i, 'startDate', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-textMuted uppercase mb-1">End Date</span>
                    <input type="date" value={p.endDate || ''} onChange={(e) => handleArrayChange('programs', i, 'endDate', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                  </div>
                </div>
                <input type="text" placeholder="Time Range (e.g. 0900 HRS - 1700 HRS)" value={p.timeRange || ''} onChange={(e) => handleArrayChange('programs', i, 'timeRange', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />`
);

fs.writeFileSync('src/app/admin/pages/[id]/SectionForm.tsx', content);
