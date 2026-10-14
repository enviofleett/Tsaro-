
import RichTextEditor from '@/components/admin/RichTextEditor';

export default function RichContentEditor({ content, setContent, handleChange }: Record<string, any>) {
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-textLight mb-1">Heading</label><input type="text" name="heading" value={content.heading || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
      <div><label className="block text-sm font-medium text-textLight mb-1">Subheading</label><input type="text" name="subheading" value={content.subheading || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
      <div className="mt-1 mb-4"><label className="block text-sm font-medium text-textLight mb-1">Body Text</label><RichTextEditor value={content.body || ''} onChange={(val: string) => setContent({...content, body: val})} /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-textLight mb-1">Optional CTA Label</label><input type="text" name="ctaLabel" value={content.ctaLabel || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
        <div><label className="block text-sm font-medium text-textLight mb-1">Optional CTA Destination</label><input type="text" name="ctaDest" value={content.ctaDest || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
      </div>
    </div>
  );
}
  