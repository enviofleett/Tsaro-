const fs = require('fs');

const formPage = 'src/app/admin/pages/[id]/SectionForm.tsx';
let content = fs.readFileSync(formPage, 'utf8');

const startStr = "{section.section_type === 'where_we_operate' && (";
const endStr = "      {section.section_type === 'research_insights' && (";

const startIdx = content.indexOf(startStr);
const endIdx = content.indexOf(endStr);

if (startIdx !== -1 && endIdx !== -1) {
    const newForm = `{section.section_type === 'where_we_operate' && (
        <>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Section Headline</label>
            <input type="text" name="headline" value={content.headline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" placeholder="Where we operate" />
          </div>

          <div className="pt-4 border-t border-white/10 mt-4 space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-semibold">Locations / Cards</h4>
              <button
                type="button"
                onClick={() => {
                  const locations = [...(content.locations || [])]
                  locations.push({ name: '', image: '', address: '', link: '' })
                  setContent({ ...content, locations })
                }}
                className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors"
              >
                + Add Card
              </button>
            </div>
            {(content.locations || []).map((_: any, i: number) => {
              const loc = content.locations?.[i] || {}
              return (
                <div key={i} className="bg-deepGray/50 p-4 rounded border border-white/5 space-y-3 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-brandRed font-bold">CARD {i + 1}</div>
                    <button
                      type="button"
                      onClick={() => {
                        const locations = [...(content.locations || [])]
                        locations.splice(i, 1)
                        setContent({ ...content, locations })
                      }}
                      className="text-xs text-textMuted hover:text-brandRed"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-textMuted mb-1">Region / Location Name</label>
                    <input type="text" placeholder="e.g. Americas" value={loc.name || ''} onChange={(e) => handleArrayChange('locations', i, 'name', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-textMuted mb-1">Background Image URL</label>
                    <ImageUpload value={loc.image || ''} onChange={(url) => handleArrayChange('locations', i, 'image', url)} placeholder="Leave blank for black background" />
                  </div>

                  <div>
                    <label className="block text-xs text-textMuted mb-1">Details / Sub-agencies</label>
                    <textarea placeholder="e.g. Centerra" value={loc.address || ''} onChange={(e) => handleArrayChange('locations', i, 'address', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-20 text-sm" />
                  </div>

                  <div>
                    <label className="block text-xs text-textMuted mb-1">Action Link URL (optional)</label>
                    <input type="text" placeholder="e.g. /contact" value={loc.link || ''} onChange={(e) => handleArrayChange('locations', i, 'link', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                  </div>
                  
                </div>
              )
            })}
          </div>
        </>
      )}

`;

    content = content.substring(0, startIdx) + newForm + content.substring(endIdx);
    fs.writeFileSync(formPage, content);
}
