
import ImageUpload from '@/components/admin/ImageUpload';

export default function QuoteEditor({ content, setContent, handleChange }: Record<string, any>) {
  return (
    <div className="space-y-4">
      <div className="mt-1 mb-4"><label className="block text-sm font-medium text-textLight mb-1">Quote</label><textarea name="quote" value={content.quote || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" /></div>
      <div><label className="block text-sm font-medium text-textLight mb-1">Attribution Name</label><input type="text" name="attributionName" value={content.attributionName || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
      <div><label className="block text-sm font-medium text-textLight mb-1">Attribution Title</label><input type="text" name="attributionTitle" value={content.attributionTitle || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
      <div><label className="block text-sm font-medium text-textLight mb-1">Attribution Image</label><ImageUpload value={content.attributionImage || ''} onChange={(url: string) => setContent({...content, attributionImage: url})} /></div>
    </div>
  );
}
  