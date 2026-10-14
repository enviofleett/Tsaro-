'use client';

import { useState } from 'react';
import { deletePageAction } from '@/app/actions/deletePage';

export default function DeletePageButton({ pageId, pageTitle, menuUsages }: { pageId: string, pageTitle: string, menuUsages: Record<string, any>[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deletePageAction(pageId);
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to delete page.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button 
        type="button" 
        onClick={() => setIsOpen(true)}
        className="text-brandRed hover:text-brandRedHover text-sm font-semibold underline"
      >
        Delete
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-charcoal border border-white/10 rounded-lg w-full max-w-lg shadow-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Delete Page</h3>
            
            <p className="text-textLight mb-4">
              Are you sure you want to delete the page <strong className="text-white">&quot;{pageTitle}&quot;</strong>? This action cannot be undone.
            </p>

            {menuUsages.length > 0 && (
              <div className="bg-brandRed/10 border border-brandRed/30 rounded p-4 mb-6">
                <p className="text-brandRed font-semibold mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                  Navigation Warning
                </p>
                <p className="text-sm text-brandRed mb-2">This page is currently linked from navigation menus:</p>
                <ul className="list-disc list-inside text-sm text-brandRed/80 space-y-1">
                  {menuUsages.map(usage => (
                    <li key={usage.id}>{usage.menus?.name || 'Menu'} &gt; {usage.label}</li>
                  ))}
                </ul>
                <p className="text-sm text-brandRed mt-3">Deleting this page will automatically remove these navigation links.</p>
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setIsOpen(false)}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-textLight hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium bg-brandRed text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : (menuUsages.length > 0 ? 'Delete Page & Remove Menu Link' : 'Delete Page')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
