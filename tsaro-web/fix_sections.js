const fs = require('fs');

function replaceFile(path, search, replace) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(search, replace);
  fs.writeFileSync(path, content);
}

// 1. WhereWeOperate
replaceFile('src/components/sections/WhereWeOperate.tsx',
  `<h2 className="text-4xl sm:text-5xl font-serif font-normal text-white tracking-tight leading-tight mb-16">\n          {headline}\n        </h2>`,
  `<h2 className="text-4xl sm:text-5xl font-serif font-normal text-white tracking-tight leading-tight mb-16 text-center mx-auto">\n          {headline}\n        </h2>`
);

// 2. Commitments
replaceFile('src/components/sections/Commitments.tsx',
  `<div className="flex flex-col md:flex-row md:items-center justify-between mb-20 gap-8">\n                <div className="md:w-1/2">\n                    <h2 \n                        className="text-4xl sm:text-5xl font-serif font-normal text-white tracking-tight leading-tight"\n                        dangerouslySetInnerHTML={{ __html: headline }}\n                    />\n                </div>\n                <div className="md:w-1/3">\n                    <p className="text-textMuted text-sm leading-relaxed">\n                        {subtitle}\n                    </p>\n                </div>\n            </div>`,
  `<div className="flex flex-col items-center text-center mb-20 gap-4 max-w-3xl mx-auto">\n                <h2 \n                    className="text-4xl sm:text-5xl font-serif font-normal text-white tracking-tight leading-tight"\n                    dangerouslySetInnerHTML={{ __html: headline }}\n                />\n                <p className="text-textMuted text-sm leading-relaxed">\n                    {subtitle}\n                </p>\n            </div>`
);

// 3. TheInstitute
replaceFile('src/components/sections/TheInstitute.tsx',
  `<div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">\n                <div className="md:w-7/12">\n                    <h2 \n                        className="text-4xl sm:text-5xl font-serif font-normal text-white tracking-tight leading-tight"\n                        dangerouslySetInnerHTML={{ __html: headline }}\n                    />\n                </div>\n                <div className="md:w-4/12">\n                    <p className="text-textMuted text-sm leading-relaxed max-w-sm">\n                        {subtitle}\n                    </p>\n                </div>\n            </div>`,
  `<div className="flex flex-col items-center text-center mb-16 gap-4 max-w-3xl mx-auto">\n                <h2 \n                    className="text-4xl sm:text-5xl font-serif font-normal text-white tracking-tight leading-tight"\n                    dangerouslySetInnerHTML={{ __html: headline }}\n                />\n                <p className="text-textMuted text-sm leading-relaxed max-w-sm">\n                    {subtitle}\n                </p>\n            </div>`
);

// 4. ResearchInsights
replaceFile('src/components/sections/ResearchInsights.tsx',
  `<div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">\n          <div className="md:w-1/2">\n            <div className="text-[11px] font-mono text-brandRed font-semibold tracking-widest uppercase mb-4">\n              Insights\n            </div>\n            <h2 className="text-4xl sm:text-5xl font-serif font-normal text-white tracking-tight leading-tight">\n              {headline}\n            </h2>\n          </div>\n          <div className="md:w-1/3">\n            <p className="text-textMuted text-sm leading-relaxed">\n              {subheadline}\n            </p>\n          </div>\n        </div>`,
  `<div className="flex flex-col items-center text-center mb-16 gap-4 max-w-3xl mx-auto">\n          <div className="text-[11px] font-mono text-brandRed font-semibold tracking-widest uppercase">\n            Insights\n          </div>\n          <h2 className="text-4xl sm:text-5xl font-serif font-normal text-white tracking-tight leading-tight">\n            {headline}\n          </h2>\n          <p className="text-textMuted text-sm leading-relaxed mt-2">\n            {subheadline}\n          </p>\n        </div>`
);

console.log("Done");
