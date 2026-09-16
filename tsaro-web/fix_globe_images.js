const fs = require('fs');

const file = 'src/components/sections/WhereWeOperate.tsx';
let content = fs.readFileSync(file, 'utf8');

// If a region is missing an image, assign a default globe image to it
content = content.replace(
  `const regions = (content?.locations && content.locations.length > 0) \n    ? content.locations.map((loc: any) => ({ ...loc, details: loc.details || loc.address }))`,
  `const defaultImages = [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=800&auto=format&fit=crop",
    "" // 3rd is black by design
  ];
  
  const regions = (content?.locations && content.locations.length > 0) 
    ? content.locations.map((loc: any, i: number) => ({ 
        ...loc, 
        details: loc.details || loc.address,
        image: loc.image || defaultImages[i % defaultImages.length] 
      }))`
);

fs.writeFileSync(file, content);
