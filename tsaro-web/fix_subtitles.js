const fs = require('fs');

function replaceFile(path, search, replace) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(search, replace);
  fs.writeFileSync(path, content);
}

replaceFile('src/components/sections/Commitments.tsx',
  `<p className="text-textMuted text-sm leading-relaxed">\n                    {subtitle}\n                </p>`,
  `<p className="text-white/80 text-lg sm:text-xl leading-relaxed">\n                    {subtitle}\n                </p>`
);

replaceFile('src/components/sections/TheInstitute.tsx',
  `<p className="text-textMuted text-sm leading-relaxed max-w-sm">\n                    {subtitle}\n                </p>`,
  `<p className="text-white/80 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">\n                    {subtitle}\n                </p>`
);

replaceFile('src/components/sections/ResearchInsights.tsx',
  `<p className="text-textMuted text-sm leading-relaxed mt-2">\n            {subheadline}\n          </p>`,
  `<p className="text-white/80 text-lg sm:text-xl leading-relaxed mt-4 max-w-2xl mx-auto">\n            {subheadline}\n          </p>`
);

replaceFile('src/components/sections/OperationalDifferentiator.tsx',
  `<p className="text-textMuted text-sm leading-relaxed">\n                        {subtitle}\n                    </p>`,
  `<p className="text-white/80 text-lg sm:text-xl leading-relaxed mt-4">\n                        {subtitle}\n                    </p>`
);

// Wait! OperationalDifferentiator wasn't centralized yet! The user asked for "these" but didn't screenshot OperationalDifferentiator. I'll centralize it just in case!
let opContent = fs.readFileSync('src/components/sections/OperationalDifferentiator.tsx', 'utf8');
opContent = opContent.replace(
  `<div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">\n                <div className="md:w-1/2">\n                    <h2 \n                        className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold tracking-tighter text-white leading-[1.08]"\n                        dangerouslySetInnerHTML={{ __html: headline }}\n                    />\n                </div>\n                <div className="md:w-1/3">\n                    <p className="text-white/80 text-lg sm:text-xl leading-relaxed mt-4">\n                        {subtitle}\n                    </p>\n                </div>\n            </div>`,
  `<div className="flex flex-col items-center text-center mb-20 gap-4 max-w-3xl mx-auto">\n                <h2 \n                    className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold tracking-tighter text-white leading-[1.08]"\n                    dangerouslySetInnerHTML={{ __html: headline }}\n                />\n                <p className="text-white/80 text-lg sm:text-xl leading-relaxed mt-4">\n                    {subtitle}\n                </p>\n            </div>`
);
fs.writeFileSync('src/components/sections/OperationalDifferentiator.tsx', opContent);

console.log("Done");
