const fs = require('fs');
let content = fs.readFileSync('src/components/sections/Globe.tsx', 'utf8');

content = content.replace(
`              style={{
                default: { outline: 'none' },
                hover: { fill: '#444', outline: 'none' },
                pressed: { outline: 'none' },
              } as any}
              }}`,
`              style={{
                default: { outline: 'none' },
                hover: { fill: '#444', outline: 'none' },
                pressed: { outline: 'none' },
              } as any}`
);

fs.writeFileSync('src/components/sections/Globe.tsx', content);
