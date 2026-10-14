
export default function StatsEditor({ content, setContent }: Record<string, any>) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2 mt-4">
        <label className="block text-sm font-medium text-textLight">Statistics</label>
        <button type="button" onClick={() => setContent({...content, stats: [...(content.stats || []), {}]})} className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-white">+ Add Stat</button>
      </div>
      {content.stats?.map((stat: Record<string, any>, i: number) => (
        <div key={i} className="p-4 bg-charcoal border border-white/10 rounded mb-4 space-y-3 relative">
          <button type="button" onClick={() => { const newArr = [...content.stats]; newArr.splice(i,1); setContent({...content, stats: newArr}) }} className="absolute top-2 right-2 text-brandRed text-xs uppercase font-bold">Remove</button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div><label className="block text-xs text-textLight mb-1">Value (e.g. 50M+)</label><input type="text" value={stat.value || ''} onChange={(e) => { const newArr = [...content.stats]; newArr[i].value = e.target.value; setContent({...content, stats: newArr}) }} className="w-full px-3 py-1 bg-deepGray border border-white/10 rounded text-white text-sm" /></div>
            <div><label className="block text-xs text-textLight mb-1">Label</label><input type="text" value={stat.label || ''} onChange={(e) => { const newArr = [...content.stats]; newArr[i].label = e.target.value; setContent({...content, stats: newArr}) }} className="w-full px-3 py-1 bg-deepGray border border-white/10 rounded text-white text-sm" /></div>
          </div>
          <div><label className="block text-xs text-textLight mb-1">Description (Optional)</label><input type="text" value={stat.description || ''} onChange={(e) => { const newArr = [...content.stats]; newArr[i].description = e.target.value; setContent({...content, stats: newArr}) }} className="w-full px-3 py-1 bg-deepGray border border-white/10 rounded text-white text-sm" /></div>
        </div>
      ))}
    </div>
  );
}
  