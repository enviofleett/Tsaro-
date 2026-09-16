const fs = require('fs');

const footerFile = 'src/components/layout/Footer.tsx';
let content = fs.readFileSync(footerFile, 'utf8');

// 1. Change background color
content = content.replace('className="bg-[#04243e]', 'className="bg-deepGray');

// 2. Fix the logo to show its original colors
content = content.replace(/className="h-10 w-auto object-contain filter brightness-0 invert"/g, 'className="h-10 w-auto object-contain"');
content = content.replace(/className="h-7 w-auto object-contain filter brightness-0 invert"/g, 'className="h-7 w-auto object-contain brightness-105"');

// 3. Use real links
const realCol1Links = `  const col1Links = [
    { label: 'What We Do', href: '/#capabilities' },
    { label: 'Who We Serve', href: '/#about' },
    { label: 'Insights', href: '/#intelligence' },
    { label: 'Institute', href: '/#institute' },
    { label: 'Careers', href: '/careers' },
  ];`;

const realCol2Links = `  const col2Links = [
    { label: 'Request a Briefing', href: '/#contact' },
    { label: 'Tsaro Academy', href: '/#institute' },
    { label: 'Contact Us', href: '/#contact' },
  ];`;

// Replace the old links definitions
content = content.replace(/const col1Links = \[.*?\];/s, realCol1Links);
content = content.replace(/const col2Links = \[.*?\];/s, realCol2Links);

fs.writeFileSync(footerFile, content);
