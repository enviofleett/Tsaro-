const fs = require('fs');
let content = fs.readFileSync('src/components/sections/WhereWeOperate.tsx', 'utf8');

content = content.replace(
  'width = canvasRef.current.offsetWidth;',
  'width = canvasRef.current.offsetWidth || 500;'
);

content = content.replace(
  'width: width * 2,\n      height: width * 2,',
  'width: 1000,\n      height: 1000,'
);

fs.writeFileSync('src/components/sections/WhereWeOperate.tsx', content);
