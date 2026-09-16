const fs = require('fs')

const filepath = 'src/app/admin/pages/[id]/SectionForm.tsx'
let code = fs.readFileSync(filepath, 'utf8')

const newForms = `
      {section.section_type === 'about_hero' && (
        <>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Headline (HTML allowed)</label>
            <textarea name="headline" value={content.headline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Subheadline (HTML allowed)</label>
            <textarea name="subheadline" value={content.subheadline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" />
          </div>
          <div className="pt-4 border-t border-white/10 mt-4 space-y-6">
            <div className="flex items-center justify-between"><h4 className="text-white font-semibold">Locations</h4>
            <button type="button" onClick={() => { const locations = [...(content.locations || [])]; locations.push(''); setContent({ ...content, locations }); }} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors">+ Add Location</button></div>
            {(content.locations || []).map((loc, i) => (
              <div key={i} className="flex gap-2">
                <input type="text" value={loc || ''} onChange={(e) => { const locations = [...(content.locations || [])]; locations[i] = e.target.value; setContent({ ...content, locations }) }} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                <button type="button" onClick={() => { const locations = [...(content.locations || [])]; locations.splice(i, 1); setContent({ ...content, locations }) }} className="text-brandRed text-xs">Remove</button>
              </div>
            ))}
          </div>
        </>
      )}

      {section.section_type === 'split_narrative' && (
        <>
          <div><label className="block text-sm font-medium text-textLight mb-1">Image URL</label><input type="text" name="image" value={content.image || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Overline</label><input type="text" name="overline" value={content.overline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Badge</label><input type="text" name="badge" value={content.badge || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Headline</label><textarea name="headline" value={content.headline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Body Text</label><textarea name="body" value={content.body || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Quote Block</label><textarea name="quote" value={content.quote || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Secondary Body Text</label><textarea name="subbody" value={content.subbody || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Button Text</label><input type="text" name="btnText" value={content.btnText || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Button Link</label><input type="text" name="btnLink" value={content.btnLink || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
        </>
      )}

      {section.section_type === 'core_values' && (
        <>
          <div><label className="block text-sm font-medium text-textLight mb-1">Headline</label><textarea name="headline" value={content.headline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-16" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Subheadline</label><textarea name="subheadline" value={content.subheadline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-16" /></div>
          <div className="pt-4 border-t border-white/10 mt-4 space-y-6">
            <div className="flex items-center justify-between"><h4 className="text-white font-semibold">Values</h4><button type="button" onClick={() => { const values = [...(content.values || [])]; values.push({}); setContent({ ...content, values }); }} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors">+ Add Value</button></div>
            {(content.values || []).map((v, i) => (
              <div key={i} className="bg-deepGray/50 p-4 rounded border border-white/5 space-y-3 relative">
                <div className="flex items-center justify-between mb-2"><div className="text-xs text-brandRed font-bold">VALUE {i + 1}</div><button type="button" onClick={() => { const values = [...(content.values || [])]; values.splice(i, 1); setContent({ ...content, values }) }} className="text-xs text-textMuted hover:text-brandRed">Remove</button></div>
                <input type="text" placeholder="Title" value={v.title || ''} onChange={(e) => handleArrayChange('values', i, 'title', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                <textarea placeholder="Description" value={v.desc || ''} onChange={(e) => handleArrayChange('values', i, 'desc', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-20 text-sm" />
                <input type="text" placeholder="Bottom Tag" value={v.tag || ''} onChange={(e) => handleArrayChange('values', i, 'tag', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
              </div>
            ))}
          </div>
        </>
      )}

      {section.section_type === 'clientele_hero' && (
        <>
          <div><label className="block text-sm font-medium text-textLight mb-1">Headline (HTML allowed)</label><textarea name="headline" value={content.headline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Subheadline</label><textarea name="subheadline" value={content.subheadline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" /></div>
          <div className="pt-4 border-t border-white/10 mt-4 space-y-6">
            <div className="flex items-center justify-between"><h4 className="text-white font-semibold">Tags</h4><button type="button" onClick={() => { const tags = [...(content.tags || [])]; tags.push(''); setContent({ ...content, tags }); }} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors">+ Add Tag</button></div>
            {(content.tags || []).map((tag, i) => (
              <div key={i} className="flex gap-2">
                <input type="text" value={tag || ''} onChange={(e) => { const tags = [...(content.tags || [])]; tags[i] = e.target.value; setContent({ ...content, tags }) }} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                <button type="button" onClick={() => { const tags = [...(content.tags || [])]; tags.splice(i, 1); setContent({ ...content, tags }) }} className="text-brandRed text-xs">Remove</button>
              </div>
            ))}
          </div>
        </>
      )}

      {section.section_type === 'client_sectors' && (
        <>
          <div className="pt-4 border-t border-white/10 mt-4 space-y-6">
            <div className="flex items-center justify-between"><h4 className="text-white font-semibold">Sectors</h4><button type="button" onClick={() => { const sectors = [...(content.sectors || [])]; sectors.push({ bullets: [] }); setContent({ ...content, sectors }); }} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors">+ Add Sector</button></div>
            {(content.sectors || []).map((sector, i) => (
              <div key={i} className="bg-deepGray/50 p-4 rounded border border-white/5 space-y-3 relative">
                <div className="flex items-center justify-between mb-2"><div className="text-xs text-brandRed font-bold">SECTOR {i + 1}</div><button type="button" onClick={() => { const sectors = [...(content.sectors || [])]; sectors.splice(i, 1); setContent({ ...content, sectors }) }} className="text-xs text-textMuted hover:text-brandRed">Remove</button></div>
                <input type="text" placeholder="Title" value={sector.title || ''} onChange={(e) => handleArrayChange('sectors', i, 'title', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                <textarea placeholder="Description" value={sector.desc || ''} onChange={(e) => handleArrayChange('sectors', i, 'desc', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-20 text-sm" />
                <div>
                  <label className="text-xs text-textMuted">Bullets (comma separated)</label>
                  <input type="text" placeholder="Bullet 1, Bullet 2" value={sector.bullets?.join(',') || ''} onChange={(e) => { const sectors = [...(content.sectors || [])]; sectors[i].bullets = e.target.value.split(',').map(s=>s.trim()); setContent({ ...content, sectors }) }} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                </div>
                <input type="text" placeholder="Logos Image URL" value={sector.logosImage || ''} onChange={(e) => handleArrayChange('sectors', i, 'logosImage', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                <input type="text" placeholder="Logos Label" value={sector.logosLabel || ''} onChange={(e) => handleArrayChange('sectors', i, 'logosLabel', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                <input type="text" placeholder="Footer Tag" value={sector.footerTag || ''} onChange={(e) => handleArrayChange('sectors', i, 'footerTag', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
              </div>
            ))}
          </div>
        </>
      )}

      {section.section_type === 'pull_quote' && (
        <>
          <div><label className="block text-sm font-medium text-textLight mb-1">Quote Block</label><textarea name="quote" value={content.quote || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-32" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Author / Subtext</label><input type="text" name="author" value={content.author || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
        </>
      )}

      {section.section_type === 'cta_banner' && (
        <>
          <div><label className="block text-sm font-medium text-textLight mb-1">Headline</label><input type="text" name="headline" value={content.headline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Subheadline</label><textarea name="subheadline" value={content.subheadline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Button Text</label><input type="text" name="btnText" value={content.btnText || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Button Link</label><input type="text" name="btnLink" value={content.btnLink || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
        </>
      )}

      {section.section_type === 'academy_hero' && (
        <>
          <div><label className="block text-sm font-medium text-textLight mb-1">Headline</label><textarea name="headline" value={content.headline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-20" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Body Text</label><textarea name="body" value={content.body || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-20" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-medium text-textLight">Primary Button Text</label><input type="text" value={content.primaryBtn?.text || ''} onChange={(e) => setContent({...content, primaryBtn: {...content.primaryBtn, text: e.target.value}})} className="w-full px-2 py-1 bg-deepGray border border-white/10 rounded text-white text-sm" /></div>
            <div><label className="block text-xs font-medium text-textLight">Primary Button Link</label><input type="text" value={content.primaryBtn?.link || ''} onChange={(e) => setContent({...content, primaryBtn: {...content.primaryBtn, link: e.target.value}})} className="w-full px-2 py-1 bg-deepGray border border-white/10 rounded text-white text-sm" /></div>
            <div><label className="block text-xs font-medium text-textLight">Secondary Button Text</label><input type="text" value={content.secondaryBtn?.text || ''} onChange={(e) => setContent({...content, secondaryBtn: {...content.secondaryBtn, text: e.target.value}})} className="w-full px-2 py-1 bg-deepGray border border-white/10 rounded text-white text-sm" /></div>
            <div><label className="block text-xs font-medium text-textLight">Secondary Button Link</label><input type="text" value={content.secondaryBtn?.link || ''} onChange={(e) => setContent({...content, secondaryBtn: {...content.secondaryBtn, link: e.target.value}})} className="w-full px-2 py-1 bg-deepGray border border-white/10 rounded text-white text-sm" /></div>
          </div>
          <div className="pt-4 border-t border-white/10 mt-4 space-y-6">
            <div className="flex items-center justify-between"><h4 className="text-white font-semibold">Key Facts</h4><button type="button" onClick={() => { const facts = [...(content.facts || [])]; facts.push({}); setContent({ ...content, facts }); }} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors">+ Add Fact</button></div>
            {(content.facts || []).map((f, i) => (
              <div key={i} className="flex gap-2">
                <input type="text" placeholder="Value (e.g. 100%)" value={f.value || ''} onChange={(e) => handleArrayChange('facts', i, 'value', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                <input type="text" placeholder="Label (e.g. Instructors)" value={f.label || ''} onChange={(e) => handleArrayChange('facts', i, 'label', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                <button type="button" onClick={() => { const facts = [...(content.facts || [])]; facts.splice(i, 1); setContent({ ...content, facts }) }} className="text-brandRed text-xs">Remove</button>
              </div>
            ))}
          </div>
        </>
      )}

      {section.section_type === 'academy_flagship' && (
        <>
          <div><label className="block text-sm font-medium text-textLight mb-1">Badge</label><input type="text" name="badge" value={content.badge || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Image URL</label><input type="text" name="image" value={content.image || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Image Overlay Badge</label><input type="text" name="imageBadge" value={content.imageBadge || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Course Code</label><input type="text" name="code" value={content.code || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Code Type / Category</label><input type="text" name="codeType" value={content.codeType || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Title</label><input type="text" name="title" value={content.title || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Description</label><textarea name="desc" value={content.desc || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Next Induction Date</label><input type="text" name="date" value={content.date || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Bullets (comma separated)</label>
            <input type="text" value={content.bullets?.join(',') || ''} onChange={(e) => setContent({...content, bullets: e.target.value.split(',').map(s=>s.trim())})} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" />
          </div>
        </>
      )}

      {section.section_type === 'academy_catalog' && (
        <>
          <div><label className="block text-sm font-medium text-textLight mb-1">Headline</label><input type="text" name="headline" value={content.headline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          <div className="pt-4 border-t border-white/10 mt-4 space-y-6">
            <div className="flex items-center justify-between"><h4 className="text-white font-semibold">Programs</h4><button type="button" onClick={() => { const programs = [...(content.programs || [])]; programs.push({}); setContent({ ...content, programs }); }} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors">+ Add Program</button></div>
            {(content.programs || []).map((p, i) => (
              <div key={i} className="bg-deepGray/50 p-4 rounded border border-white/5 space-y-3 relative">
                <div className="flex items-center justify-between mb-2"><div className="text-xs text-brandRed font-bold">PROGRAM {i + 1}</div><button type="button" onClick={() => { const programs = [...(content.programs || [])]; programs.splice(i, 1); setContent({ ...content, programs }) }} className="text-xs text-textMuted hover:text-brandRed">Remove</button></div>
                <select value={p.type || ''} onChange={(e) => handleArrayChange('programs', i, 'type', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm">
                  <option value="">Select Category...</option>
                  <option value="kinetic">Kinetic & Weapons</option>
                  <option value="protection">Protection & Medical</option>
                  <option value="intel">Cyber & Intelligence</option>
                  <option value="infrastructure">Infrastructure Defence</option>
                </select>
                <input type="text" placeholder="Title" value={p.title || ''} onChange={(e) => handleArrayChange('programs', i, 'title', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                <input type="text" placeholder="Code" value={p.code || ''} onChange={(e) => handleArrayChange('programs', i, 'code', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                <input type="text" placeholder="Badge" value={p.badge || ''} onChange={(e) => handleArrayChange('programs', i, 'badge', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                <input type="text" placeholder="Image URL" value={p.image || ''} onChange={(e) => handleArrayChange('programs', i, 'image', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                <textarea placeholder="Description" value={p.desc || ''} onChange={(e) => handleArrayChange('programs', i, 'desc', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-20 text-sm" />
                <div className="grid grid-cols-3 gap-2">
                  <input type="text" placeholder="Format" value={p.format || ''} onChange={(e) => handleArrayChange('programs', i, 'format', e.target.value)} className="w-full px-2 py-1 bg-deepGray border border-white/10 rounded text-white text-sm" />
                  <input type="text" placeholder="Prerequisite" value={p.prerequisite || ''} onChange={(e) => handleArrayChange('programs', i, 'prerequisite', e.target.value)} className="w-full px-2 py-1 bg-deepGray border border-white/10 rounded text-white text-sm" />
                  <input type="text" placeholder="Duration" value={p.duration || ''} onChange={(e) => handleArrayChange('programs', i, 'duration', e.target.value)} className="w-full px-2 py-1 bg-deepGray border border-white/10 rounded text-white text-sm" />
                </div>
                <input type="text" placeholder="Next Intake Date" value={p.date || ''} onChange={(e) => handleArrayChange('programs', i, 'date', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
              </div>
            ))}
          </div>
        </>
      )}

      {section.section_type === 'academy_methodology' && (
        <>
          <div><label className="block text-sm font-medium text-textLight mb-1">Headline</label><textarea name="headline" value={content.headline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-16" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Subheadline</label><textarea name="subheadline" value={content.subheadline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-16" /></div>
          <div className="pt-4 border-t border-white/10 mt-4 space-y-6">
            <div className="flex items-center justify-between"><h4 className="text-white font-semibold">Pillars</h4><button type="button" onClick={() => { const pillars = [...(content.pillars || [])]; pillars.push({}); setContent({ ...content, pillars }); }} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors">+ Add Pillar</button></div>
            {(content.pillars || []).map((p, i) => (
              <div key={i} className="bg-deepGray/50 p-4 rounded border border-white/5 space-y-3 relative">
                <div className="flex items-center justify-between mb-2"><div className="text-xs text-brandRed font-bold">PILLAR {i + 1}</div><button type="button" onClick={() => { const pillars = [...(content.pillars || [])]; pillars.splice(i, 1); setContent({ ...content, pillars }) }} className="text-xs text-textMuted hover:text-brandRed">Remove</button></div>
                <input type="text" placeholder="Title" value={p.title || ''} onChange={(e) => handleArrayChange('pillars', i, 'title', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                <textarea placeholder="Description" value={p.desc || ''} onChange={(e) => handleArrayChange('pillars', i, 'desc', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-20 text-sm" />
              </div>
            ))}
          </div>
        </>
      )}
`

// Replace the fallback condition array
const oldArrayStr = "['hero_banner', 'text_block', 'capability_grid', 'where_we_operate', 'research_insights', 'authority_bar', 'commitments', 'operational_differentiator', 'intelligence_briefs', 'institute']"
const newArrayStr = "['hero_banner', 'text_block', 'capability_grid', 'where_we_operate', 'research_insights', 'authority_bar', 'commitments', 'operational_differentiator', 'intelligence_briefs', 'institute', 'about_hero', 'split_narrative', 'core_values', 'clientele_hero', 'client_sectors', 'pull_quote', 'cta_banner', 'academy_hero', 'academy_flagship', 'academy_catalog', 'academy_methodology']"

code = code.replace(oldArrayStr, newArrayStr)

// Insert the newForms just before the Fallback comment
const fallbackMarker = "{/* Fallback for unconfigured section types */}"
code = code.replace(fallbackMarker, newForms + "\n      " + fallbackMarker)

fs.writeFileSync(filepath, code)
console.log('Successfully injected 11 new forms into SectionForm.tsx')
