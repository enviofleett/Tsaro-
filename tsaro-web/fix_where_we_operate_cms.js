const fs = require('fs');

const file = 'src/components/sections/WhereWeOperate.tsx';
let content = fs.readFileSync(file, 'utf8');

// Map 'address' to 'details' from CMS if available
content = content.replace(
  `const regions = (content?.locations && content.locations.length > 0) \n    ? content.locations`,
  `const regions = (content?.locations && content.locations.length > 0) \n    ? content.locations.map((loc: any) => ({ ...loc, details: loc.details || loc.address }))`
);

fs.writeFileSync(file, content);
