const fs = require('fs');
let content = fs.readFileSync('src/components/sections/TheInstitute.tsx', 'utf8');

// Undo the description / link_url changes
content = content.replace(
`          title: 'Tsaro Academy',
          description: 'Professional certification and command-tier training for the institutions we work with — run as its own school.',
          link_url: '/academy',
          link_text: 'VISIT ACADEMY',`,
`          title: 'Tsaro Academy',
          description: 'Professional certification and command-tier training for the institutions we work with — run as its own school, not a page on this site.',
          link_url: 'https://academy.tsaroglobal.com',
          link_text: 'VISIT ACADEMY',`
);

fs.writeFileSync('src/components/sections/TheInstitute.tsx', content);
