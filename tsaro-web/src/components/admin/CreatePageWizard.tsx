'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CreatePageWizardProps {
  customTemplates: Record<string, any>[];
  createAction: (data: Record<string, any>) => Promise<string | null>;
  menus: Record<string, any>[];
}

export default function CreatePageWizard({ customTemplates, createAction, menus }: CreatePageWizardProps) {
  const [step, setStep] = useState(1);
  const router = useRouter();

  // Step 1 State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Step 2 State
  const [templateId, setTemplateId] = useState('blank');
  
  // Step 3 State
  const [addToNav, setAddToNav] = useState(false);
  const [menuLocation, setMenuLocation] = useState('top');
  const [menuLabel, setMenuLabel] = useState('');
  
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!slugManuallyEdited) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSlug(val.toLowerCase().replace(/[^a-z0-9-]/g, ''));
    setSlugManuallyEdited(true);
  };

  const nextStep = () => {
    if (step === 1 && (!title || !slug)) return;
    setStep(s => s + 1);
    if (step === 2 && !menuLabel && title) setMenuLabel(title);
  };

  const prevStep = () => setStep(s => s - 1);

  const handleCreate = async () => {
    setIsCreating(true);
    setError(null);
    try {
      const newPageId = await createAction({
        title,
        slug,
        templateId,
        addToNav,
        menuLocation,
        menuLabel
      });
      if (newPageId) {
        router.push(`/admin/pages/${newPageId}`);
      }
    } catch (err: any) {
      setError(err.message || 'Error creating page');
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-charcoal border border-white/10 rounded-lg p-8 mb-8 shadow-2xl">
      
      {/* Progress Bar */}
      <div className="flex items-center mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 rounded-full"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brandRed rounded-full transition-all" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
        
        <div className="flex justify-between w-full relative z-10">
          {[1, 2, 3].map(i => (
            <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= i ? 'bg-brandRed text-white shadow-[0_0_15px_rgba(204,0,0,0.5)]' : 'bg-deepGray text-textMuted border border-white/20'}`}>
              {i}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between text-xs text-textLight font-medium mb-8">
        <span>Page Details</span>
        <span>Choose Template</span>
        <span>Navigation</span>
      </div>

      {error && <div className="mb-6 p-4 bg-brandRed/20 text-brandRed rounded-lg text-sm">{error}</div>}

      {/* STEP 1 */}
      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="text-2xl font-bold text-white mb-6">Let&apos;s create a new page</h2>
          <div className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-textLight mb-2">Page Name</label>
              <input 
                type="text" 
                value={title} 
                onChange={handleTitleChange} 
                placeholder="e.g. Corporate Services" 
                className="w-full px-4 py-3 bg-deepGray border border-white/10 rounded-lg text-white text-lg focus:outline-none focus:border-brandRed" 
                autoFocus
              />
            </div>
            
            <div className="bg-black/20 p-4 rounded-lg flex items-center gap-2">
              <span className="text-textMuted">URL:</span>
              <span className="text-white font-mono bg-white/5 px-2 py-1 rounded">/{slug}</span>
            </div>

            <div>
              <button 
                type="button" 
                onClick={() => setShowAdvanced(!showAdvanced)} 
                className="text-sm text-textLight hover:text-white underline"
              >
                {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
              </button>
              
              {showAdvanced && (
                <div className="mt-4 p-4 border border-white/10 rounded-lg bg-white/5">
                  <label className="block text-sm font-medium text-textLight mb-2">Custom URL Slug</label>
                  <input 
                    type="text" 
                    value={slug} 
                    onChange={handleSlugChange} 
                    className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white font-mono focus:outline-none focus:border-brandRed" 
                  />
                  <p className="text-xs text-textMuted mt-2">Lowercase letters, numbers, and hyphens only.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="text-2xl font-bold text-white mb-6">Choose a starting template</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div 
              onClick={() => setTemplateId('blank')}
              className={`p-6 rounded-xl border cursor-pointer transition-all ${templateId === 'blank' ? 'bg-brandRed/10 border-brandRed' : 'bg-deepGray border-white/10 hover:border-white/30'}`}
            >
              <h3 className="font-bold text-white text-lg mb-2">Blank Page</h3>
              <p className="text-sm text-textLight">Start from scratch with no sections.</p>
            </div>
            
            <div 
              onClick={() => setTemplateId('standard')}
              className={`p-6 rounded-xl border cursor-pointer transition-all ${templateId === 'standard' ? 'bg-brandRed/10 border-brandRed' : 'bg-deepGray border-white/10 hover:border-white/30'}`}
            >
              <h3 className="font-bold text-white text-lg mb-2">Standard Content Page</h3>
              <div className="flex flex-wrap gap-1 mt-3">
                <span className="text-xs bg-white/10 px-2 py-1 rounded">Hero</span>
                <span className="text-xs bg-white/10 px-2 py-1 rounded">Rich Content</span>
                <span className="text-xs bg-white/10 px-2 py-1 rounded">CTA</span>
              </div>
            </div>

            <div 
              onClick={() => setTemplateId('split')}
              className={`p-6 rounded-xl border cursor-pointer transition-all ${templateId === 'split' ? 'bg-brandRed/10 border-brandRed' : 'bg-deepGray border-white/10 hover:border-white/30'}`}
            >
              <h3 className="font-bold text-white text-lg mb-2">Split Content Page</h3>
              <div className="flex flex-wrap gap-1 mt-3">
                <span className="text-xs bg-white/10 px-2 py-1 rounded">Hero</span>
                <span className="text-xs bg-white/10 px-2 py-1 rounded">Text Left / Image Right</span>
                <span className="text-xs bg-white/10 px-2 py-1 rounded">Rich Content</span>
                <span className="text-xs bg-white/10 px-2 py-1 rounded">CTA</span>
              </div>
            </div>

            <div 
              onClick={() => setTemplateId('landing')}
              className={`p-6 rounded-xl border cursor-pointer transition-all ${templateId === 'landing' ? 'bg-brandRed/10 border-brandRed' : 'bg-deepGray border-white/10 hover:border-white/30'}`}
            >
              <h3 className="font-bold text-white text-lg mb-2">Landing Page</h3>
              <div className="flex flex-wrap gap-1 mt-3">
                <span className="text-xs bg-white/10 px-2 py-1 rounded">Hero</span>
                <span className="text-xs bg-white/10 px-2 py-1 rounded">Feature Cards</span>
                <span className="text-xs bg-white/10 px-2 py-1 rounded">Split Content</span>
                <span className="text-xs bg-white/10 px-2 py-1 rounded">CTA</span>
              </div>
            </div>

            <div 
              onClick={() => setTemplateId('about')}
              className={`p-6 rounded-xl border cursor-pointer transition-all ${templateId === 'about' ? 'bg-brandRed/10 border-brandRed' : 'bg-deepGray border-white/10 hover:border-white/30'}`}
            >
              <h3 className="font-bold text-white text-lg mb-2">About/Profile Page</h3>
              <div className="flex flex-wrap gap-1 mt-3">
                <span className="text-xs bg-white/10 px-2 py-1 rounded">Hero</span>
                <span className="text-xs bg-white/10 px-2 py-1 rounded">Split Content</span>
                <span className="text-xs bg-white/10 px-2 py-1 rounded">Values/Card Grid</span>
                <span className="text-xs bg-white/10 px-2 py-1 rounded">Quote</span>
                <span className="text-xs bg-white/10 px-2 py-1 rounded">CTA</span>
              </div>
            </div>

            <div 
              onClick={() => setTemplateId('contact')}
              className={`p-6 rounded-xl border cursor-pointer transition-all ${templateId === 'contact' ? 'bg-brandRed/10 border-brandRed' : 'bg-deepGray border-white/10 hover:border-white/30'}`}
            >
              <h3 className="font-bold text-white text-lg mb-2">Contact Page</h3>
              <div className="flex flex-wrap gap-1 mt-3">
                <span className="text-xs bg-white/10 px-2 py-1 rounded">Hero</span>
                <span className="text-xs bg-white/10 px-2 py-1 rounded">Contact Section</span>
              </div>
            </div>
          </div>

          {customTemplates.length > 0 && (
            <>
              <h3 className="text-lg font-bold text-white mt-10 mb-4 border-t border-white/10 pt-6">Custom Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {customTemplates.map(t => (
                  <div 
                    key={t.id}
                    onClick={() => setTemplateId(t.id)}
                    className={`p-6 rounded-xl border cursor-pointer transition-all ${templateId === t.id ? 'bg-brandRed/10 border-brandRed' : 'bg-deepGray border-white/10 hover:border-white/30'}`}
                  >
                    <h3 className="font-bold text-white text-lg mb-2">{t.name}</h3>
                    <p className="text-xs text-brandRed mt-2 font-mono">Custom Template</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="text-2xl font-bold text-white mb-6">Navigation</h2>
          <div className="space-y-8 max-w-2xl">
            
            <label className="flex items-center gap-4 cursor-pointer p-6 border border-white/10 rounded-xl bg-deepGray hover:bg-white/5 transition-colors">
              <div className="relative">
                <input type="checkbox" className="sr-only" checked={addToNav} onChange={(e) => setAddToNav(e.target.checked)} />
                <div className={`block w-14 h-8 rounded-full transition-colors ${addToNav ? 'bg-brandRed' : 'bg-black/50'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${addToNav ? 'translate-x-6' : ''}`}></div>
              </div>
              <div>
                <div className="font-bold text-white text-lg">Add this page to navigation</div>
                <div className="text-sm text-textLight mt-1">Make this page discoverable in the main website menu immediately.</div>
              </div>
            </label>

            {addToNav && (
              <div className="p-6 border border-brandRed/30 rounded-xl bg-brandRed/5 space-y-6 animate-in fade-in slide-in-from-top-2">
                <div>
                  <label className="block text-sm font-medium text-textLight mb-2">Menu Label</label>
                  <input 
                    type="text" 
                    value={menuLabel} 
                    onChange={(e) => setMenuLabel(e.target.value)}
                    className="w-full px-4 py-3 bg-deepGray border border-white/10 rounded-lg text-white focus:outline-none focus:border-brandRed" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-textLight mb-2">Position</label>
                  <select 
                    value={menuLocation} 
                    onChange={(e) => setMenuLocation(e.target.value)}
                    className="w-full px-4 py-3 bg-deepGray border border-white/10 rounded-lg text-white focus:outline-none focus:border-brandRed appearance-none"
                  >
                    <option value="top">Top Level (Main Menu)</option>
                    {menus.map((m: Record<string, any>) => (
                      <option key={m.id} value={m.id}>Under &quot;{m.label}&quot;</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Navigation Controls */}
      <div className="flex justify-between mt-12 pt-6 border-t border-white/10">
        {step > 1 ? (
          <button onClick={prevStep} className="px-6 py-2 rounded text-textLight hover:text-white transition-colors">
            Back
          </button>
        ) : <div></div>}
        
        {step < 3 ? (
          <button 
            onClick={nextStep} 
            disabled={!title || !slug}
            className="btn-primary-red px-8 py-2 rounded font-bold disabled:opacity-50"
          >
            Continue
          </button>
        ) : (
          <button 
            onClick={handleCreate} 
            disabled={isCreating}
            className="btn-primary-red px-10 py-3 rounded font-bold shadow-lg shadow-brandRed/20 hover:shadow-brandRed/40 transition-all disabled:opacity-50"
          >
            {isCreating ? 'Creating Page...' : 'Create Page & Edit Design'}
          </button>
        )}
      </div>

    </div>
  );
}
