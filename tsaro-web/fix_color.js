const fs = require('fs');
let content = fs.readFileSync('src/app/careers/page.tsx', 'utf8');

content = content.replace(
  '<span className="text-brandRed">Global Defense</span>',
  'Global Defense'
);

fs.writeFileSync('src/app/careers/page.tsx', content);
