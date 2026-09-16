const fs = require('fs');
let content = fs.readFileSync('src/app/admin/pages/[id]/SectionForm.tsx', 'utf8');
console.log(content.includes("Kinetic & Weapons"));
