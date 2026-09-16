const fs = require('fs');

let content = fs.readFileSync('src/app/admin/layout.tsx', 'utf8');

content = content.replace(
  `<Link href="/admin/pages" className="px-3 py-2 rounded text-sm font-medium text-textLight hover:bg-white/5 hover:text-white transition-colors">
                  Pages & Content
                </Link>`,
  `<Link href="/admin/pages" className="px-3 py-2 rounded text-sm font-medium text-textLight hover:bg-white/5 hover:text-white transition-colors">
                  Pages
                </Link>
                <Link href="/admin/bookings" className="px-3 py-2 rounded text-sm font-medium text-textLight hover:bg-white/5 hover:text-white transition-colors">
                  Academy Bookings
                </Link>`
);

fs.writeFileSync('src/app/admin/layout.tsx', content);
