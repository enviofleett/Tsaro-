const fs = require('fs');

let content = fs.readFileSync('src/app/careers/CareersClient.tsx', 'utf8');

// 1. Button text: INITIALIZE APPLICATION -> Apply
content = content.replace(/Initialize Application/g, 'Apply');

// 2. Modal Header: Personnel Intake Form -> Application Form
content = content.replace(/Personnel Intake Form/g, 'Application Form');
content = content.replace(/ROLE:/g, 'Role:');

// 3. Demo names: John Doe -> Samuel Adeyemi, john@example.com -> s.adeyemi@example.com, phone number format
content = content.replace(/e\.g\. John Doe/g, 'e.g. Samuel Adeyemi');
content = content.replace(/john@example\.com/g, 's.adeyemi@example.com');
content = content.replace(/\+1 \(555\) 000-0000/g, '+234 800 000 0000');

// 4. Submit buttons and success state
content = content.replace(/Submit Dossier/g, 'Submit Application');
content = content.replace(/Dossier Received/g, 'Application Received');
content = content.replace(/Your application has been securely transmitted to our recruitment command\. We will initiate contact if your profile matches our operational vectors\./g, 'Thank you for your application. Our recruitment team will review your profile and get back to you shortly.');

// 5. Update header text to remove AI inspired stuff
content = content.replace(/We operate at the bleeding edge of kinetic operations and algorithmic intelligence\. Join a cadre of elite operators, data scientists, and strategists securing the next century\./g, 'Join our team of elite professionals working to secure critical infrastructure and shape the future of global defense.');
content = content.replace(/Open Vectors/g, 'Open Positions');
content = content.replace(/\[ STATUS: RECRUITING \]/g, 'Recruiting');
content = content.replace(/\[ POSITIONS: 4 \]/g, '4 Openings');

fs.writeFileSync('src/app/careers/CareersClient.tsx', content);

