const fs = require('fs');
let content = fs.readFileSync('src/components/sections/WhereWeOperate.tsx', 'utf8');

content = content.replace(
  'pointerInteractionMovement.current = delta;',
  'pointerInteractionMovement.current = delta / 200;'
);

fs.writeFileSync('src/components/sections/WhereWeOperate.tsx', content);
