const fs = require('fs');

const formPage = 'src/app/admin/pages/[id]/SectionForm.tsx';
let content = fs.readFileSync(formPage, 'utf8');

// Replace the contact_section form block
const oldForm = `      {(section.section_type === 'contact_section' || section.section_type === 'contact_section') && (
        <>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Headline</label>
            <input
              type="text"
              name="headline"
              value={content.headline || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white"
              placeholder="Intelligence Briefs & Policy Research"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Subheadline</label>
            <textarea
              name="subheadline"
              value={content.subheadline || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24"
              placeholder="Stay ahead of the shifting geopolitical and economic landscape..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Bullet 1</label>
            <input type="text" name="bullet_1" value={content.bullet_1 || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Bullet 2</label>
            <input type="text" name="bullet_2" value={content.bullet_2 || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Bullet 3</label>
            <input type="text" name="bullet_3" value={content.bullet_3 || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">PDF URL</label>
            <input type="text" name="pdf_url" value={content.pdf_url || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" />
          </div>
        </>
      )}`;

const newForm = `      {(section.section_type === 'contact_section' || section.section_type === 'intelligence_briefs') && (
        <>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Headline</label>
            <input
              type="text"
              name="headline"
              value={content.headline || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white"
              placeholder="Contact Command"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Subheadline</label>
            <textarea
              name="subheadline"
              value={content.subheadline || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24"
              placeholder="Initiate a secure dialogue with our executive team..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Address Text</label>
            <textarea
              name="address"
              value={content.address || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24"
              placeholder="Suite 600, 6th Floor, Sector A,\nShashilga Court, Ahmadu Bello Way,\nAbuja, Nigeria"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Email Address</label>
            <input type="text" name="email" value={content.email || ''} onChange={handleChange} placeholder="info@tsaroglobaldefence.com" className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Phone Number</label>
            <input type="text" name="phone" value={content.phone || ''} onChange={handleChange} placeholder="+234 704 341 9078" className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" />
          </div>
        </>
      )}`;

if (content.includes("contact_section' || section.section_type === 'contact_section'")) {
    const startIdx = content.indexOf(`{(section.section_type === 'contact_section' || section.section_type === 'contact_section')`);
    const endIdx = content.indexOf(`</>\n      )}`, startIdx) + 12;
    content = content.substring(0, startIdx) + newForm + content.substring(endIdx);
} else {
    console.error("Could not find the target block to replace");
}

fs.writeFileSync(formPage, content);
