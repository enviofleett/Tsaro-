'use client';

import { useState } from 'react';
import AddSectionModal from './AddSectionModal';

interface AddSectionButtonProps {
  addAction: (type: string, variant?: string) => Promise<void>;
}

export default function AddSectionButton({ addAction }: AddSectionButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async (type: string, variant?: string) => {
    setIsAdding(true);
    try {
      await addAction(type, variant);
      setShowModal(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      <button 
        type="button" 
        onClick={() => setShowModal(true)}
        disabled={isAdding}
        className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded text-white font-medium text-sm transition-colors"
      >
        {isAdding ? 'Adding...' : '+ Add Section'}
      </button>

      {showModal && (
        <AddSectionModal 
          onAdd={handleAdd} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
}
