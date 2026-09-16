const fs = require('fs');
let content = fs.readFileSync('src/components/sections/WhereWeOperate.tsx', 'utf8');

content = content.replace(
  'baseColor: [0.3, 0.3, 0.3],',
  'baseColor: [1, 1, 1],'
);

fs.writeFileSync('src/components/sections/WhereWeOperate.tsx', content);
