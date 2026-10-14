
import ImageUpload from '@/components/admin/ImageUpload';

export default function GalleryEditor({ content, setContent, handleChange }: Record<string, any>) {
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-textLight mb-1">Main Caption</label><input type="text" name="caption" value={content.caption || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
      <div>
        <div className="flex justify-between items-center mb-2 mt-4">
          <label className="block text-sm font-medium text-textLight">Images</label>
          <button type="button" onClick={() => setContent({...content, images: [...(content.images || []), {}]})} className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-white">+ Add Image</button>
        </div>
        {content.images?.map((img: Record<string, any>, i: number) => (
          <div key={i} className="p-4 bg-charcoal border border-white/10 rounded mb-4 space-y-3 relative">
            <button type="button" onClick={() => { const newArr = [...content.images]; newArr.splice(i,1); setContent({...content, images: newArr}) }} className="absolute top-2 right-2 text-brandRed text-xs uppercase font-bold">Remove</button>
            <div><label className="block text-xs text-textLight mb-1">Image URL</label><ImageUpload value={img.url || ''} onChange={(val: string) => { const newArr = [...content.images]; newArr[i].url = val; setContent({...content, images: newArr}) }} /></div>
            <div><label className="block text-xs text-textLight mb-1">Alt Text</label><input type="text" value={img.alt || ''} onChange={(e) => { const newArr = [...content.images]; newArr[i].alt = e.target.value; setContent({...content, images: newArr}) }} className="w-full px-3 py-1 bg-deepGray border border-white/10 rounded text-white text-sm" /></div>
            <div><label className="block text-xs text-textLight mb-1">Caption</label><input type="text" value={img.caption || ''} onChange={(e) => { const newArr = [...content.images]; newArr[i].caption = e.target.value; setContent({...content, images: newArr}) }} className="w-full px-3 py-1 bg-deepGray border border-white/10 rounded text-white text-sm" /></div>
          </div>
        ))}
      </div>
    </div>
  );
}
  