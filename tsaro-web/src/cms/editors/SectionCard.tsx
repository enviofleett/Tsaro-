'use client';

import { useState } from 'react';
import { blockRegistry } from '@/cms/blocks/registry';
import HeroEditor from './HeroEditor';
import TextImageEditor from './TextImageEditor';
import RichContentEditor from './RichContentEditor';
import CtaEditor from './CtaEditor';
import CardsEditor from './CardsEditor';
import StatsEditor from './StatsEditor';
import QuoteEditor from './QuoteEditor';
import GalleryEditor from './GalleryEditor';
import LegacyEditor from './LegacyEditor';

interface SectionCardProps {
  section: Record<string, any>;
  isFirst: boolean;
  isLast: boolean;
  saveAction: (formData: FormData) => Promise<void>;
  moveAction: (id: string, direction: 'up' | 'down') => Promise<void>;
  duplicateAction: (id: string) => Promise<void>;
  deleteAction: (id: string) => Promise<void>;
}

export default function SectionCard({ section, isFirst, isLast, saveAction, moveAction, duplicateAction, deleteAction }: SectionCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(section.content || {});
  const [isSaving, setIsSaving] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const blockDef = blockRegistry[section.section_type] || {
    name: section.section_type,
    description: 'Unknown block type',
    variants: []
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContent((prev: Record<string, any>) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (formData: FormData) => {
    setIsSaving(true);
    formData.append('id', section.id);
    formData.append('content', JSON.stringify(content));
    await saveAction(formData);
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (isConfirmingDelete) {
      await deleteAction(section.id);
    } else {
      setIsConfirmingDelete(true);
      setTimeout(() => setIsConfirmingDelete(false), 3000); // Reset after 3 seconds
    }
  };

  const renderEditor = () => {
    const props = { content, setContent, handleChange };
    switch (section.section_type) {
      case 'hero': return <HeroEditor {...props} />;
      case 'text_image': return <TextImageEditor {...props} />;
      case 'rich_content': return <RichContentEditor {...props} />;
      case 'cta': return <CtaEditor {...props} />;
      case 'cards': return <CardsEditor {...props} />;
      case 'statistics': return <StatsEditor {...props} />;
      case 'quote': return <QuoteEditor {...props} />;
      case 'gallery': return <GalleryEditor {...props} />;
      default: return <LegacyEditor {...props} />;
    }
  };

  const currentVariant = content.variant || (blockDef.variants ? blockDef.variants[0] : 'Default');
  const displayVariant = currentVariant.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());

  return (
    <div className="bg-charcoal border border-white/10 rounded-xl mb-4 shadow-lg overflow-hidden transition-all">
      
      {/* CARD HEADER (Always Visible) */}
      <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/5">
        <div>
          <div className="text-white font-bold text-lg">{blockDef.name}</div>
          <div className="text-textMuted text-sm">{displayVariant}</div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
          <button onClick={() => setIsEditing(!isEditing)} className="px-3 py-1.5 bg-brandRed text-white rounded hover:bg-red-700 transition-colors">
            {isEditing ? 'Cancel Edit' : 'Edit'}
          </button>
          
          <button onClick={() => moveAction(section.id, 'up')} disabled={isFirst} className="px-3 py-1.5 bg-white/10 text-white rounded hover:bg-white/20 disabled:opacity-30 transition-colors">
            Move Up
          </button>
          
          <button onClick={() => moveAction(section.id, 'down')} disabled={isLast} className="px-3 py-1.5 bg-white/10 text-white rounded hover:bg-white/20 disabled:opacity-30 transition-colors">
            Move Down
          </button>
          
          <button onClick={() => duplicateAction(section.id)} className="px-3 py-1.5 bg-white/10 text-white rounded hover:bg-white/20 transition-colors">
            Duplicate
          </button>
          
          <button onClick={handleDelete} className={`px-3 py-1.5 rounded transition-colors ${isConfirmingDelete ? 'bg-red-600 text-white animate-pulse' : 'bg-transparent text-brandRed hover:bg-brandRed/10 border border-brandRed/50'}`}>
            {isConfirmingDelete ? 'Click to Confirm' : 'Delete'}
          </button>
        </div>
      </div>

      {/* CARD BODY (Only visible when editing) */}
      {isEditing && (
        <div className="p-6 border-t border-white/10 bg-obsidian">
          <form action={handleSave} className="space-y-6">
            
            {/* Variant Selector if available */}
            {blockDef.variants && blockDef.variants.length > 0 && (
              <div className="pb-6 border-b border-white/10">
                <label className="block text-sm font-medium text-textLight mb-2">Layout Variant</label>
                <select name="variant" value={content.variant || blockDef.variants[0]} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white focus:outline-none focus:border-brandRed appearance-none">
                  {blockDef.variants.map((v: string) => (
                    <option key={v} value={v}>{v.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Specific Editor Fields */}
            {renderEditor()}

            {/* Actions */}
            <div className="flex items-center gap-4 pt-6 border-t border-white/10">
              <button type="submit" disabled={isSaving} className="bg-brandRed hover:bg-red-700 px-8 py-2.5 rounded text-white font-bold transition-colors disabled:opacity-50">
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              <button type="button" onClick={() => { setIsEditing(false); setContent(section.content || {}); }} className="text-textLight hover:text-white font-medium">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
    </div>
  );
}
