const fs = require('fs');

const adminPage = 'src/app/admin/pages/[id]/page.tsx';
if (fs.existsSync(adminPage)) {
  let content = fs.readFileSync(adminPage, 'utf8');
  content = content.replace(/<option value="intelligence_briefs">Intelligence Briefs<\/option>/g, '<option value="contact_section">Contact Form</option>');
  content = content.replace(/'intelligence_briefs'/g, "'contact_section'");
  fs.writeFileSync(adminPage, content);
}

const formPage = 'src/app/admin/pages/[id]/SectionForm.tsx';
if (fs.existsSync(formPage)) {
  let content = fs.readFileSync(formPage, 'utf8');
  content = content.replace(/section\.section_type === 'intelligence_briefs'/g, "(section.section_type === 'contact_section' || section.section_type === 'intelligence_briefs')");
  content = content.replace(/'intelligence_briefs'/g, "'contact_section'");
  fs.writeFileSync(formPage, content);
}
