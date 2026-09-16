const fs = require('fs');

let content = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');
content = content.replace(
  `{ id: '4', label: 'Institute', url: '/#institute' },`,
  `{ id: '4', label: 'Institute', url: '/#institute' },\n      { id: '5', label: 'Careers', url: '/careers' },`
);

fs.writeFileSync('src/components/layout/Navbar.tsx', content);
