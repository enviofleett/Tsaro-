const fs = require('fs');
let content = fs.readFileSync('src/components/sections/WhereWeOperate.tsx', 'utf8');

content = content.replace(
  'baseColor: [0.15, 0.15, 0.15],',
  'baseColor: [0.3, 0.3, 0.3],'
);

content = content.replace(
  'glowColor: [0.05, 0.05, 0.05],',
  'glowColor: [0.1, 0.1, 0.1],'
);

fs.writeFileSync('src/components/sections/WhereWeOperate.tsx', content);
