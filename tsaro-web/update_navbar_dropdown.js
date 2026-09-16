const fs = require('fs');
const file = 'src/components/layout/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace dark dropdown styling with white dropdown styling
content = content.replace(
  'absolute top-full left-0 mt-2 w-48 bg-charcoal border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col py-2',
  'absolute top-full left-0 mt-4 w-56 bg-white border border-gray-200 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col py-3 z-50'
);

content = content.replace(
  'px-4 py-2 hover:bg-white/5 text-textLight hover:text-white transition-colors',
  'px-6 py-3 hover:bg-gray-50 text-black font-bold uppercase text-xs tracking-wider transition-colors'
);

fs.writeFileSync(file, content);
