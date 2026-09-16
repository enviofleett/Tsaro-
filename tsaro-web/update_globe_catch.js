const fs = require('fs');
let content = fs.readFileSync('src/components/sections/WhereWeOperate.tsx', 'utf8');

content = content.replace(
  'const globe = createGlobe(canvasRef.current, {',
  'let globe; try { globe = createGlobe(canvasRef.current, {'
);

content = content.replace(
  '      globe.destroy();\n      window.removeEventListener(\'resize\', onResize);\n    };\n  }, [locations]);',
  '      if (globe) globe.destroy();\n      window.removeEventListener(\'resize\', onResize);\n    };\n  } catch (err) {\n      console.error("Globe error:", err);\n  }\n  }, [locations]);'
);

fs.writeFileSync('src/components/sections/WhereWeOperate.tsx', content);
