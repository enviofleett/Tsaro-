
import RichTextEditor from '@/components/admin/RichTextEditor';
import ImageUpload from '@/components/admin/ImageUpload';

export default function CardsEditor({ content, setContent, handleChange }: Record<string, any>) {
  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-textLight mb-1">Section Heading</label><input type="text" name="heading" value={content.heading || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
      <div><label className="block text-sm font-medium text-textLight mb-1">Section Subheading</label><input type="text" name="subheading" value={content.subheading || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
      <div>
        <div className="flex justify-between items-center mb-2 mt-4">
          <label className="block text-sm font-medium text-textLight">Cards</label>
          <button type="button" onClick={() => setContent({...content, cards: [...(content.cards || []), {}]})} className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-white">+ Add Card</button>
        </div>
        {content.cards?.map((card: Record<string, any>, i: number) => (
          <div key={i} className="p-4 bg-charcoal border border-white/10 rounded mb-4 space-y-3 relative">
            <button type="button" onClick={() => { const newArr = [...content.cards]; newArr.splice(i,1); setContent({...content, cards: newArr}) }} className="absolute top-2 right-2 text-brandRed text-xs uppercase font-bold">Remove</button>
            <div><label className="block text-xs text-textLight mb-1">Card Title</label><input type="text" value={card.title || ''} onChange={(e) => { const newArr = [...content.cards]; newArr[i].title = e.target.value; setContent({...content, cards: newArr}) }} className="w-full px-3 py-1 bg-deepGray border border-white/10 rounded text-white text-sm" /></div>
            <div><label className="block text-xs text-textLight mb-1">Card Description</label><RichTextEditor value={card.description || ''} onChange={(val: string) => { const newArr = [...content.cards]; newArr[i].description = val; setContent({...content, cards: newArr}) }} /></div>
            <div><label className="block text-xs text-textLight mb-1">Card Image URL</label><ImageUpload value={card.image || ''} onChange={(val: string) => { const newArr = [...content.cards]; newArr[i].image = val; setContent({...content, cards: newArr}) }} /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div><label className="block text-xs text-textLight mb-1">CTA Label</label><input type="text" value={card.ctaLabel || ''} onChange={(e) => { const newArr = [...content.cards]; newArr[i].ctaLabel = e.target.value; setContent({...content, cards: newArr}) }} className="w-full px-3 py-1 bg-deepGray border border-white/10 rounded text-white text-sm" /></div>
              <div><label className="block text-xs text-textLight mb-1">CTA Link</label><input type="text" value={card.ctaLink || ''} onChange={(e) => { const newArr = [...content.cards]; newArr[i].ctaLink = e.target.value; setContent({...content, cards: newArr}) }} className="w-full px-3 py-1 bg-deepGray border border-white/10 rounded text-white text-sm" /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
  