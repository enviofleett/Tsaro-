const fs = require('fs');

const files = [
  'src/app/page.tsx',
  'src/app/[slug]/page.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/IntelligenceBriefs/g, 'ContactSection');
    content = content.replace(/intelligence_briefs/g, 'contact_section');
    fs.writeFileSync(file, content);
  }
});
