const fs = require('fs');
let content = fs.readFileSync('src/components/sections/WhereWeOperate.tsx', 'utf8');

content = content.replace(
  'state.width = width * 2;',
  'state.width = width > 0 ? width * 2 : 1000;'
);

content = content.replace(
  'state.height = width * 2;',
  'state.height = width > 0 ? width * 2 : 1000;'
);

fs.writeFileSync('src/components/sections/WhereWeOperate.tsx', content);
