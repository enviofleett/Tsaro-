
import RichTextEditor from '@/components/admin/RichTextEditor';
import ImageUpload from '@/components/admin/ImageUpload';

export default function HeroEditor({ content, setContent, handleChange }: Record<string, any>) {
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-textLight mb-1">Eyebrow / Small Heading</label><input type="text" name="eyebrow" value={content.eyebrow || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
      <div><label className="block text-sm font-medium text-textLight mb-1">Main Heading</label><input type="text" name="heading" value={content.heading || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
      <div><label className="block text-sm font-medium text-textLight mb-1">Subheading</label><input type="text" name="subheading" value={content.subheading || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
      <div className="mt-1 mb-4"><label className="block text-sm font-medium text-textLight mb-1">Body Text</label><RichTextEditor value={content.body || ''} onChange={(val: string) => setContent({...content, body: val})} /></div>
      <div><label className="block text-sm font-medium text-textLight mb-1">Background/Hero Image</label><ImageUpload value={content.image || ''} onChange={(url: string) => setContent({...content, image: url})} /></div>
      <div><label className="block text-sm font-medium text-textLight mb-1">Background Video URL (Optional)</label><input type="text" name="videoUrl" value={content.videoUrl || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-textLight mb-1">Primary CTA Label</label><input type="text" name="primaryCtaLabel" value={content.primaryCtaLabel || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
        <div><label className="block text-sm font-medium text-textLight mb-1">Primary CTA Destination</label><input type="text" name="primaryCtaDest" value={content.primaryCtaDest || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-textLight mb-1">Secondary CTA Label</label><input type="text" name="secondaryCtaLabel" value={content.secondaryCtaLabel || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
        <div><label className="block text-sm font-medium text-textLight mb-1">Secondary CTA Destination</label><input type="text" name="secondaryCtaDest" value={content.secondaryCtaDest || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
      </div>
      <div><label className="block text-sm font-medium text-textLight mb-1">Overlay Strength (0-100)</label><input type="number" min="0" max="100" name="overlayStrength" value={content.overlayStrength || '50'} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
    </div>
  );
}
  