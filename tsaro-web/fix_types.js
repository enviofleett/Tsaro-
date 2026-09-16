const fs = require('fs');
let content = fs.readFileSync('src/app/admin/pages/[id]/SectionForm.tsx', 'utf8');

// The errors reported:
// src/app/admin/pages/[id]/SectionForm.tsx(646,45): Parameter 'loc' implicitly has an 'any' type.
// src/app/admin/pages/[id]/SectionForm.tsx(676,42): Parameter 'v' implicitly has an 'any' type.
// src/app/admin/pages/[id]/SectionForm.tsx(694,40): Parameter 'tag' implicitly has an 'any' type.
// src/app/admin/pages/[id]/SectionForm.tsx(708,43): Parameter 'sector' implicitly has an 'any' type.
// src/app/admin/pages/[id]/SectionForm.tsx(754,41): Parameter 'f' implicitly has an 'any' type.
// src/app/admin/pages/[id]/SectionForm.tsx(787,44): Parameter 'p' implicitly has an 'any' type.
// src/app/admin/pages/[id]/SectionForm.tsx(820,43): Parameter 'p' implicitly has an 'any' type.

content = content.replace(/\(loc, i\)/g, '(loc: any, i: number)');
content = content.replace(/\(v, i\)/g, '(v: any, i: number)');
content = content.replace(/\(tag, i\)/g, '(tag: any, i: number)');
content = content.replace(/\(sector, i\)/g, '(sector: any, i: number)');
content = content.replace(/\(f, i\)/g, '(f: any, i: number)');
content = content.replace(/\(p, i\)/g, '(p: any, i: number)');

fs.writeFileSync('src/app/admin/pages/[id]/SectionForm.tsx', content);
