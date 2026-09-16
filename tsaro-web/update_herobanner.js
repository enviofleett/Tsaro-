const fs = require('fs');
const file = 'src/components/sections/HeroBanner.tsx';
let content = fs.readFileSync(file, 'utf8');

// Update main wrapper
content = content.replace('text-left flex flex-col items-start', 'text-center flex flex-col items-center');

// Center the paragraph
content = content.replace('text-white/90 max-w-2xl mb-10 leading-relaxed', 'text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed');

// Center the buttons
content = content.replace('justify-start gap-8 w-full sm:w-auto', 'justify-center gap-8 w-full sm:w-auto');

// Center the footer text
content = content.replace('justify-start items-center gap-6', 'justify-center items-center gap-6');

fs.writeFileSync(file, content);
