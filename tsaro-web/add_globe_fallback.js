const fs = require('fs');
let content = fs.readFileSync('src/components/sections/WhereWeOperate.tsx', 'utf8');

content = content.replace(
  '{globeError && <div className="absolute inset-0 z-50 flex items-center justify-center bg-red-900/50 text-white p-4 text-center rounded-lg border border-red-500"><p>Globe Error: {globeError}</p></div>}',
  '{globeError && <div className="absolute inset-0 z-50 flex items-center justify-center bg-charcoal text-white/50 text-sm p-4 text-center rounded-lg border border-white/10"><p>Interactive Globe requires WebGL. Please enable it in your browser.</p></div>}'
);

fs.writeFileSync('src/components/sections/WhereWeOperate.tsx', content);
