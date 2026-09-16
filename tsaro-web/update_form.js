const fs = require('fs');
const file = 'src/app/admin/pages/[id]/SectionForm.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add saveStatus state
content = content.replace('const [isSaving, setIsSaving] = useState(false)', 'const [isSaving, setIsSaving] = useState(false)\n  const [saveStatus, setSaveStatus] = useState<string | null>(null)');

// Update onSubmit
content = content.replace(
  'await updateAction(formData)\n    setIsSaving(false)',
  'await updateAction(formData)\n    setIsSaving(false)\n    setSaveStatus("Saved!")\n    setTimeout(() => setSaveStatus(null), 3000)'
);

// Update submit button to show saveStatus
content = content.replace(
  '<button type="submit" disabled={isSaving} className="bg-brandRed hover:bg-red-700 px-6 py-2 rounded text-white font-medium text-sm transition-colors mt-4">\n        {isSaving ? \'Saving...\' : \'Save Content\'}\n      </button>',
  `<div className="flex items-center gap-4 mt-4">
        <button type="submit" disabled={isSaving} className="bg-brandRed hover:bg-red-700 px-6 py-2 rounded text-white font-medium text-sm transition-colors disabled:opacity-50">
          {isSaving ? 'Saving...' : 'Save Content'}
        </button>
        {saveStatus && <span className="text-green-500 text-sm font-medium animate-pulse">{saveStatus}</span>}
      </div>`
);

fs.writeFileSync(file, content);
