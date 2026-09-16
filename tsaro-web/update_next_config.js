const fs = require('fs');

let content = fs.readFileSync('next.config.ts', 'utf8');

content = content.replace(
  `devIndicators: {\n    appIsrStatus: false,\n    buildActivity: false,\n  },\n  `,
  ''
);

fs.writeFileSync('next.config.ts', content);
