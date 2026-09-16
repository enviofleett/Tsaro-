const fs = require('fs');

const files = [
  'src/app/page.tsx',
  'src/app/[slug]/page.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    // We previously replaced 'intelligence_briefs' with 'contact_section'
    // Let's find that line and make it accept both the new and old names
    content = content.replace(
      /if \(section\.section_type === 'contact_section'\)/g,
      "if (section.section_type === 'contact_section' || section.section_type === 'intelligence_briefs')"
    );
    fs.writeFileSync(file, content);
  }
});
