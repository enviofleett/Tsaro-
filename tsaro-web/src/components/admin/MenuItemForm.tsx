'use client';

import { useState } from 'react';

export default function MenuItemForm({ menuId, topLevelItems, pages, action }: Record<string, any>) {
  const [linkType, setLinkType] = useState('page');
  const [pageId, setPageId] = useState('');
  const [url, setUrl] = useState('');
  const [label, setLabel] = useState('');
  const [parentId, setParentId] = useState('');
  
  const [isSaving, setIsSaving] = useState(false);

  // If page changes, maybe auto-fill label
  const handlePageChange = (e: Record<string, any>) => {
    const selectedPageId = e.target.value;
    setPageId(selectedPageId);
    
    if (!label) {
      const page = pages.find((p: Record<string, any>) => p.id === selectedPageId);
      if (page) setLabel(page.title);
    }
  };

  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="menu_id" value={menuId} />
      
      <div className="flex flex-col sm:flex-row gap-4">
        
        <div className="flex-1">
          <label className="block text-xs font-medium text-textLight mb-1.5">Link Type</label>
          <select 
            name="link_type" 
            value={linkType} 
            onChange={e => setLinkType(e.target.value)}
            className="w-full px-4 py-2.5 bg-deepGray border border-white/10 rounded text-white text-sm focus:border-brandRed outline-none"
          >
            <option value="page">Internal Page (CMS)</option>
            <option value="custom">Custom URL</option>
            <option value="anchor">Anchor (#)</option>
          </select>
        </div>

        {linkType === 'page' && (
          <div className="flex-1 w-full">
            <label className="block text-xs font-medium text-textLight mb-1.5">Select Page</label>
            <select 
              name="page_id" 
              value={pageId} 
              onChange={handlePageChange}
              required
              className="w-full px-4 py-2.5 bg-deepGray border border-white/10 rounded text-white text-sm focus:border-brandRed outline-none"
            >
              <option value="">-- Choose Page --</option>
              {pages.map((p: Record<string, any>) => (
                <option key={p.id} value={p.id}>{p.title} (/{p.slug})</option>
              ))}
            </select>
          </div>
        )}

        {linkType === 'custom' && (
          <div className="flex-1 w-full">
            <label className="block text-xs font-medium text-textLight mb-1.5">URL</label>
            <input type="text" name="url" value={url} onChange={e => setUrl(e.target.value)} required placeholder="https://" className="w-full px-4 py-2.5 bg-deepGray border border-white/10 rounded text-white text-sm focus:border-brandRed outline-none" />
          </div>
        )}

        {linkType === 'anchor' && (
          <div className="flex-1 w-full">
            <label className="block text-xs font-medium text-textLight mb-1.5">Anchor</label>
            <input type="text" name="url" value={url} onChange={e => setUrl(e.target.value)} required placeholder="#section" className="w-full px-4 py-2.5 bg-deepGray border border-white/10 rounded text-white text-sm focus:border-brandRed outline-none" />
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-xs font-medium text-textLight mb-1.5">Menu Label</label>
          <input type="text" name="label" value={label} onChange={e => setLabel(e.target.value)} required className="w-full px-4 py-2.5 bg-deepGray border border-white/10 rounded text-white text-sm focus:border-brandRed outline-none" />
        </div>
        
        <div className="flex-1 w-full">
          <label className="block text-xs font-medium text-textLight mb-1.5">Attach Dropdown To (Optional)</label>
          <select name="parent_id" value={parentId} onChange={e => setParentId(e.target.value)} className="w-full px-4 py-2.5 bg-deepGray border border-white/10 rounded text-white text-sm focus:border-brandRed outline-none">
            <option value="">-- No Dropdown (Top Level) --</option>
            {topLevelItems.map((item: Record<string, any>) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-white text-black hover:bg-gray-200 px-6 py-2.5 rounded font-semibold text-sm transition-colors shrink-0">
          + Add Link
        </button>
      </div>
    </form>
  );
}
