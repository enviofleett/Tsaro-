const fs = require('fs');
let content = fs.readFileSync('src/components/sections/TheInstitute.tsx', 'utf8');

content = content.replace(
  "link_url: 'https://academy.tsaroglobal.com',",
  "link_url: '/academy',"
);

fs.writeFileSync('src/components/sections/TheInstitute.tsx', content);
