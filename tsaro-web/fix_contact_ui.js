const fs = require('fs');

const contactPage = 'src/components/sections/ContactSection.tsx';
let content = fs.readFileSync(contactPage, 'utf8');

content = content.replace(
  `Suite 600, 6th Floor, Sector A,<br/>Shashilga Court, Ahmadu Bello Way,<br/>Abuja, Nigeria`,
  `{content?.address ? <span dangerouslySetInnerHTML={{ __html: content.address.replace(/\\n/g, '<br/>') }} /> : <>Suite 600, 6th Floor, Sector A,<br/>Shashilga Court, Ahmadu Bello Way,<br/>Abuja, Nigeria</>}`
);

content = content.replace(
  `info@tsaroglobaldefence.com<br/>\n                                    +234 704 341 9078`,
  `{content?.email || 'info@tsaroglobaldefence.com'}<br/>\n                                    {content?.phone || '+234 704 341 9078'}`
);

fs.writeFileSync(contactPage, content);
