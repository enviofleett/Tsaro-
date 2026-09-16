const fs = require('fs');
let content = fs.readFileSync('src/app/admin/pages/[id]/SectionForm.tsx', 'utf8');

// Replace array insights image input
content = content.replace(
  /<input type="text" placeholder="Cover Image URL [^>]*value=\{item\.image \|\| ''\} onChange=\{\(e\) => handleArrayChange\('insights', i, 'image', e\.target\.value\)\} [^>]*\/>/g,
  '<ImageUpload value={item.image || \'\'} onChange={(url) => handleArrayChange(\'insights\', i, \'image\', url)} placeholder="Cover Image URL (e.g. /research-cover.jpg)" />'
);

// Replace raw object image input 1
content = content.replace(
  /<input type="text" name="image" value=\{content\.image \|\| ''\} onChange=\{handleChange\} className="w-full px-4 py-2 bg-deepGray border border-white\/10 rounded text-white" \/>/g,
  '<ImageUpload value={content.image || \'\'} onChange={(url) => setContent({ ...content, image: url })} placeholder="Image URL" />'
);

// Replace array programs image input
content = content.replace(
  /<input type="text" placeholder="Image URL" value=\{p\.image \|\| ''\} onChange=\{\(e\) => handleArrayChange\('programs', i, 'image', e\.target\.value\)\} className="w-full px-4 py-2 bg-deepGray border border-white\/10 rounded text-white text-sm" \/>/g,
  '<ImageUpload value={p.image || \'\'} onChange={(url) => handleArrayChange(\'programs\', i, \'image\', url)} placeholder="Image URL" />'
);

fs.writeFileSync('src/app/admin/pages/[id]/SectionForm.tsx', content);
