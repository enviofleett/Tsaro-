const fs = require('fs');

let content = fs.readFileSync('next.config.ts', 'utf8');

if (!content.includes('devIndicators')) {
  content = content.replace(
    'images: {',
    'devIndicators: {\n    appIsrStatus: false,\n    buildActivity: false,\n  },\n  images: {'
  );
  fs.writeFileSync('next.config.ts', content);
}
