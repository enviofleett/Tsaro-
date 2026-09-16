const fs = require('fs');

let content = fs.readFileSync('src/components/sections/ContactSection.tsx', 'utf8');

// Insert the text intercept logic before the return statement
content = content.replace(
  '  return (\n    <section',
  `  let displayHeadline = content?.headline || "Contact Command";
  let displaySubheadline = content?.subheadline || "Initiate a secure dialogue with our executive team. For urgent institutional requirements or bespoke operational inquiries, please provide detailed context.";

  if (displayHeadline.includes("Intelligence Briefs")) {
    displayHeadline = "Contact Command";
  }
  if (displaySubheadline.includes("geopolitical")) {
    displaySubheadline = "Initiate a secure dialogue with our executive team. For urgent institutional requirements or bespoke operational inquiries, please provide detailed context.";
  }

  return (
    <section`
);

content = content.replace(
  `{content?.headline || "Contact Command"}`,
  `{displayHeadline}`
);

content = content.replace(
  `{content?.subheadline || "Initiate a secure dialogue with our executive team. For urgent institutional requirements or bespoke operational inquiries, please provide detailed context."}`,
  `{displaySubheadline}`
);

fs.writeFileSync('src/components/sections/ContactSection.tsx', content);
