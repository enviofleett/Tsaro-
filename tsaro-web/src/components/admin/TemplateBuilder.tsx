'use client';

import { useState } from 'react';
import { blockRegistry } from '@/cms/blocks/registry';
import AddSectionModal from './AddSectionModal';

interface TemplateBlock {
  id: string; // temporary local id for reordering
  type: string;
  variant: string;
}

export default function TemplateBuilder({ createAction }: { createAction: (data: Record<string, any>) => Promise<void> }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [blocks, setBlocks] = useState<TemplateBlock[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleAddBlock = (type: string, variant?: string) => {
    const blockDef = blockRegistry[type];
    const defaultVariant = blockDef?.variants ? blockDef.variants[0] : 'default';
    setBlocks([...blocks, { id: generateId(), type, variant: variant || defaultVariant }]);
    setShowAddModal(false);
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks];
    if (direction === 'up' && index > 0) {
      [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
    } else if (direction === 'down' && index < newBlocks.length - 1) {
      [newBlocks[index + 1], newBlocks[index]] = [newBlocks[index], newBlocks[index + 1]];
    }
    setBlocks(newBlocks);
  };

  const updateVariant = (id: string, variant: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, variant } : b));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      setError('Template name is required');
      return;
    }
    setIsSaving(true);
    setError(null);
    try {
      await createAction({ name, description, blocks: blocks.map(b => ({ type: b.type, variant: b.variant })) });
      setName('');
      setDescription('');
      setBlocks([]);
    } catch (err: any) {
      setError(err.message || 'Error saving template');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-charcoal border border-white/10 rounded-lg p-6 mb-8 capability-card">
      <h2 className="text-xl font-semibold mb-6 text-white">Create Template</h2>
      
      {error && <div className="mb-4 p-3 bg-brandRed/20 text-brandRed rounded text-sm">{error}</div>}

      <form onSubmit={handleSave} className="space-y-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Template Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
              placeholder="e.g. Executive Profile Template" 
              className="w-full max-w-lg px-4 py-3 bg-deepGray border border-white/10 rounded text-white focus:outline-none focus:border-brandRed" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Description (Optional)</label>
            <input 
              type="text" 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              placeholder="Internal note about when to use this template" 
              className="w-full max-w-lg px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm focus:outline-none focus:border-brandRed" 
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <h3 className="text-lg font-bold text-white">Template Structure</h3>
            <button 
              type="button" 
              onClick={() => setShowAddModal(true)}
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded text-white font-medium text-sm transition-colors"
            >
              + Add Section
            </button>
          </div>

          <div className="space-y-3">
            {blocks.map((block, idx) => {
              const def = blockRegistry[block.type];
              const displayVariant = block.variant.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
              
              return (
                <div key={block.id} className="bg-obsidian border border-white/10 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-white/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded bg-brandRed/20 text-brandRed flex items-center justify-center font-bold text-sm shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-bold text-white">{def?.name || block.type}</div>
                      <div className="text-textMuted text-sm">{displayVariant}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {def?.variants && def.variants.length > 0 && (
                      <select 
                        value={block.variant} 
                        onChange={(e) => updateVariant(block.id, e.target.value)}
                        className="bg-deepGray border border-white/10 rounded text-white text-xs px-2 py-1.5 focus:outline-none focus:border-brandRed"
                      >
                        {def.variants.map((v: string) => (
                          <option key={v} value={v}>{v.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
                        ))}
                      </select>
                    )}
                    
                    <button type="button" onClick={() => moveBlock(idx, 'up')} disabled={idx === 0} className="p-1.5 text-textMuted hover:text-white disabled:opacity-30 disabled:hover:text-textMuted">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7"></path></svg>
                    </button>
                    <button type="button" onClick={() => moveBlock(idx, 'down')} disabled={idx === blocks.length - 1} className="p-1.5 text-textMuted hover:text-white disabled:opacity-30 disabled:hover:text-textMuted">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <button type="button" onClick={() => removeBlock(block.id)} className="ml-2 text-xs px-3 py-1.5 bg-brandRed/10 text-brandRed hover:bg-brandRed hover:text-white rounded font-medium transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}

            {blocks.length === 0 && (
              <div className="text-center py-10 border border-white/5 border-dashed rounded-lg">
                <p className="text-textMuted">This template has no sections. Click &quot;+ Add Section&quot; to begin building.</p>
              </div>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex justify-end">
          <button 
            type="submit" 
            disabled={isSaving || !name} 
            className="btn-primary-red px-8 py-3 rounded font-bold disabled:opacity-50"
          >
            {isSaving ? 'Saving Template...' : 'Save Template'}
          </button>
        </div>
      </form>

      {showAddModal && (
        <AddSectionModal 
          onAdd={handleAddBlock} 
          onClose={() => setShowAddModal(false)} 
        />
      )}
    </div>
  );
}
