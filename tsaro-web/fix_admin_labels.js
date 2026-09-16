const fs = require('fs');
let content = fs.readFileSync('src/app/admin/pages/[id]/page.tsx', 'utf8');

const formatLabelFn = `
function formatSectionType(type: string) {
  return type
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
`;

// Insert the helper function after the imports
content = content.replace(
  "import SectionForm from './SectionForm'",
  "import SectionForm from './SectionForm'\n\n" + formatLabelFn
);

// Replace the hardcoded {section.section_type}
content = content.replace(
  '<h3 className="text-lg font-semibold text-white mt-1">{section.section_type}</h3>',
  '<h3 className="text-lg font-semibold text-white mt-1">{formatSectionType(section.section_type)}</h3>'
);

fs.writeFileSync('src/app/admin/pages/[id]/page.tsx', content);
