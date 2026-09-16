const fs = require('fs');
let content = fs.readFileSync('src/components/sections/WhereWeOperate.tsx', 'utf8');

content = content.replace(
  'const [activeIdx, setActiveIdx] = useState<number | null>(null);',
  'const [activeIdx, setActiveIdx] = useState<number | null>(null);\n  const [globeError, setGlobeError] = useState<string | null>(null);'
);

content = content.replace(
  '  } catch (err) {\n      console.error("Globe error:", err);\n  }',
  '  } catch (err: any) {\n      console.error("Globe error:", err);\n      setGlobeError(err.message || String(err));\n  }'
);

content = content.replace(
  '          <canvas',
  '          {globeError && <div className="absolute inset-0 z-50 flex items-center justify-center bg-red-900/50 text-white p-4 text-center rounded-lg border border-red-500"><p>Globe Error: {globeError}</p></div>}\n          <canvas'
);

fs.writeFileSync('src/components/sections/WhereWeOperate.tsx', content);
