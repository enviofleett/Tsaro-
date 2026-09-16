const fs = require('fs');
let content = fs.readFileSync('src/components/sections/AcademyHero.tsx', 'utf8');

content = content.replace(
  `const headline = content.headline || 'Tsaro Defence & <span class="text-brandRed">Security Academy</span>'`,
  `const headline = content.headline || 'Tsaro Defence & Security Academy'`
);

fs.writeFileSync('src/components/sections/AcademyHero.tsx', content);
