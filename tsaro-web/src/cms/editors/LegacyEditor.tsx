
// Fallback editor for raw JSON of legacy sections
export default function LegacyEditor({ content, setContent }: Record<string, any>) {
  return (
    <div>
      <label className="block text-sm font-medium text-textLight mb-1">Raw JSON Content</label>
      <textarea name="content" value={JSON.stringify(content, null, 2)} onChange={(e) => {
        try { setContent(JSON.parse(e.target.value)) } catch {}
      }} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-48 font-mono text-xs" />
    </div>
  );
}
  