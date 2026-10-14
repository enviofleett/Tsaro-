'use client';

import { useState } from 'react';
import { blockRegistry } from '@/cms/blocks/registry';
import { BlockDefinition } from '@/cms/blocks/types';

interface AddSectionModalProps {
  onAdd: (sectionType: string, variant?: string) => void;
  onClose: () => void;
}

export default function AddSectionModal({ onAdd, onClose }: AddSectionModalProps) {
  const [selectedBlock, setSelectedBlock] = useState<BlockDefinition | null>(null);

  const blocks = Object.values(blockRegistry);

  const handleBlockClick = (block: BlockDefinition) => {
    if (block.variants && block.variants.length > 0) {
      setSelectedBlock(block);
    } else {
      onAdd(block.type);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-charcoal border border-white/10 rounded-lg w-full max-w-5xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        <div className="p-5 border-b border-white/10 flex justify-between items-center bg-deepGray/50 shrink-0">
          <h2 className="text-xl font-bold text-white">
            {selectedBlock ? `Select Layout for ${selectedBlock.name}` : 'Add a New Section'}
          </h2>
          <button onClick={onClose} className="text-textMuted hover:text-white transition-colors">
            ✕ Close
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 bg-obsidian">
          {!selectedBlock ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {blocks.map((block) => (
                <div 
                  key={block.type}
                  onClick={() => handleBlockClick(block)}
                  className="bg-charcoal border border-white/10 hover:border-brandRed hover:bg-white/5 rounded-lg p-5 cursor-pointer transition-all group flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center text-brandRed group-hover:bg-brandRed/10 transition-colors shrink-0">
                      {/* Simple placeholder icon if block.icon doesn't exist */}
                      {block.icon || (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                        </svg>
                      )}
                    </div>
                    <h3 className="font-semibold text-white text-lg">{block.name}</h3>
                  </div>
                  <p className="text-textMuted text-sm leading-relaxed flex-1">{block.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <button 
                onClick={() => setSelectedBlock(null)} 
                className="text-brandRed hover:text-white transition-colors text-sm font-medium flex items-center gap-2"
              >
                &larr; Back to Block Library
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedBlock.variants?.map((variant) => (
                  <div 
                    key={variant}
                    onClick={() => onAdd(selectedBlock.type, variant)}
                    className="bg-charcoal border border-white/10 hover:border-brandRed hover:bg-white/5 rounded-lg p-6 cursor-pointer transition-all flex flex-col items-center justify-center min-h-[160px]"
                  >
                    <div className="w-full max-w-[200px] h-24 bg-deepGray border border-white/5 rounded mb-4 flex items-center justify-center overflow-hidden">
                      {/* Abstract visualization of the layout could go here based on variant string */}
                      <span className="text-xs text-textMuted font-mono bg-black/40 px-3 py-1 rounded-full">{variant}</span>
                    </div>
                    <h4 className="font-semibold text-white capitalize text-center">
                      {variant.replace(/_/g, ' ')}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
