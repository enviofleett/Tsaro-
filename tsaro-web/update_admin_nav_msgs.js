const fs = require('fs');

let content = fs.readFileSync('src/app/admin/layout.tsx', 'utf8');

if (!content.includes('/admin/messages')) {
  content = content.replace(
    `<Link href="/admin/careers" className="px-3 py-2 rounded text-sm font-medium text-textLight hover:bg-white/5 hover:text-white transition-colors">
                  Careers Applications
                </Link>`,
    `<Link href="/admin/careers" className="px-3 py-2 rounded text-sm font-medium text-textLight hover:bg-white/5 hover:text-white transition-colors">
                  Careers Applications
                </Link>
                <Link href="/admin/messages" className="px-3 py-2 rounded text-sm font-medium text-textLight hover:bg-white/5 hover:text-white transition-colors">
                  Contact Messages
                </Link>`
  );
  fs.writeFileSync('src/app/admin/layout.tsx', content);
}
