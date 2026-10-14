
import ImageUpload from '@/components/admin/ImageUpload';

export default function CtaEditor({ content, setContent, handleChange }: Record<string, any>) {
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-textLight mb-1">Heading</label><input type="text" name="heading" value={content.heading || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
      <div><label className="block text-sm font-medium text-textLight mb-1">Supporting Text</label><input type="text" name="supportingText" value={content.supportingText || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-textLight mb-1">Primary Button Label</label><input type="text" name="primaryBtnLabel" value={content.primaryBtnLabel || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
        <div><label className="block text-sm font-medium text-textLight mb-1">Primary Button Destination</label><input type="text" name="primaryBtnDest" value={content.primaryBtnDest || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-textLight mb-1">Secondary Button Label</label><input type="text" name="secondaryBtnLabel" value={content.secondaryBtnLabel || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
        <div><label className="block text-sm font-medium text-textLight mb-1">Secondary Button Destination</label><input type="text" name="secondaryBtnDest" value={content.secondaryBtnDest || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-textLight mb-1">Background Color</label>
          <select name="bgColor" value={content.bgColor || 'red'} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white">
            <option value="red">Brand Red</option>
            <option value="black">Obsidian Black</option>
            <option value="gray">Charcoal Gray</option>
            <option value="white">White (Light Theme)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-textLight mb-1">Container Width</label>
          <select name="containerWidth" value={content.containerWidth || 'full'} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white">
            <option value="full">Full Width Edge-to-Edge</option>
            <option value="boxed">Boxed (Centered Card)</option>
            <option value="narrow">Narrow (1/3 Centered)</option>
          </select>
        </div>
      </div>

      <div><label className="block text-sm font-medium text-textLight mb-1">Optional Background Image</label><ImageUpload value={content.backgroundImage || ''} onChange={(url: string) => setContent({...content, backgroundImage: url})} /></div>
    </div>
  );
}
  