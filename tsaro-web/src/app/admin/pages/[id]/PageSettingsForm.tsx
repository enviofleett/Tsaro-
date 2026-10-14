'use client'

import { useState } from 'react'

export default function PageSettingsForm({ 
  page, 
  updateAction,
  previewToken
}: { 
  page: Record<string, any>, 
  updateAction: (formData: FormData) => Promise<void>,
  previewToken?: string
}) {
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const isArchived = page.is_archived;
  const isPublished = page.is_published && !isArchived;
  const isDraft = !page.is_published && !isArchived;

  const getStatusBadge = () => {
    if (isArchived) return <span className="bg-gray-500/20 text-gray-400 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">Archived</span>
    if (isPublished) return <span className="bg-green-500/20 text-green-500 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">Published</span>
    return <span className="bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">Draft</span>
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)
    setSaveStatus(null)

    // Find the button that submitted the form to get its value
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
    const actionValue = submitter?.value || 'save_draft';

    const formData = new FormData(e.currentTarget)
    formData.append('submit_action', actionValue);
    
    try {
      await updateAction(formData)
      let msg = "Draft Saved!";
      if (actionValue === 'publish') msg = "Page Published!";
      if (actionValue === 'unpublish') msg = "Page Unpublished!";
      if (actionValue === 'archive') msg = "Page Archived!";
      
      setSaveStatus(msg)
      setTimeout(() => setSaveStatus(null), 3000)
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Failed to save")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <input type="hidden" name="page_id" value={page.id} />
      
      <div className="flex items-center justify-between bg-black/20 p-3 rounded-lg border border-white/5">
        <span className="text-sm font-medium text-textLight">Current Status:</span>
        {getStatusBadge()}
      </div>

      <div>
        <label className="block text-sm font-medium text-textLight mb-1">Title</label>
        <input type="text" name="title" defaultValue={page.title} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-textLight mb-1">Slug</label>
        <input type="text" name="slug" defaultValue={page.slug} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-textLight mb-1">Meta Description</label>
        <textarea name="meta_description" defaultValue={page.meta_description} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" />
      </div>

      
      <div className="pt-4 border-t border-white/10 mt-4 space-y-4">
        <label className="block text-sm font-medium text-white mb-2">Advanced SEO</label>
        
        <div>
          <label className="block text-sm font-medium text-textLight mb-1">Canonical URL (Optional)</label>
          <input type="url" name="canonical_url" defaultValue={page.canonical_url} placeholder="https://example.com/original-source" className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
          <p className="text-[10px] text-textMuted mt-1">Leave blank to use the default Tsaro URL.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-textLight mb-1">Social Image URL (Optional)</label>
          <input type="url" name="social_image" defaultValue={page.social_image} placeholder="https://example.com/image.jpg" className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
        </div>

        <div className="flex items-center gap-2 mt-2">
          <input type="checkbox" name="no_index" id="no_index" defaultChecked={page.no_index} className="w-4 h-4 accent-brandRed" />
          <label htmlFor="no_index" className="text-sm font-medium text-textLight">Hide from Search Engines (noindex)</label>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 mt-4">
        <label className="block text-sm font-medium text-textLight mb-2">Navigation</label>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="add_to_nav" id="add_to_nav" className="w-4 h-4 accent-brandRed" />
          <label htmlFor="add_to_nav" className="text-sm text-textLight">Add to Main Menu (Top Level)</label>
        </div>
      </div>

      {error && (
        <div className="text-brandRed text-sm bg-brandRed/10 p-3 rounded font-medium border border-brandRed/20">
          {error}
        </div>
      )}
      {saveStatus && (
        <div className="text-green-500 text-sm bg-green-500/10 p-3 rounded font-medium border border-green-500/20">
          {saveStatus}
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-4 border-t border-white/10 mt-6 grid grid-cols-2 gap-3">
        
        {/* Preview is always available */}
        <a href={`/${page.slug}?preview=true${previewToken ? '&preview_token=' + previewToken : ''}`} target="_blank" rel="noopener noreferrer" className="col-span-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded font-semibold text-white transition-colors text-center">
          Preview Page
        </a>

        {/* Save Draft vs Publish */}
        <button type="submit" name="submit_action" value="save_draft" disabled={isSaving} className="px-4 py-2.5 bg-deepGray hover:bg-white/10 border border-white/10 rounded font-semibold text-white transition-colors disabled:opacity-50">
          Save Draft
        </button>

        <button type="submit" name="submit_action" value="publish" disabled={isSaving || isPublished} className="px-4 py-2.5 btn-primary-red rounded font-bold disabled:opacity-50 disabled:grayscale transition-colors">
          Publish
        </button>

        {/* Unpublish & Archive */}
        {isPublished && (
          <button type="submit" name="submit_action" value="unpublish" disabled={isSaving} className="px-4 py-2.5 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 border border-yellow-500/20 rounded font-semibold transition-colors">
            Unpublish
          </button>
        )}
        
        {!isArchived && (
          <button type="submit" name="submit_action" value="archive" disabled={isSaving} onClick={(e) => { if(!confirm('Are you sure you want to archive this page? It will be unpublished.')) e.preventDefault() }} className={`px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded font-semibold transition-colors ${!isPublished ? 'col-span-2' : ''}`}>
            Archive
          </button>
        )}

      </div>
    </form>
  )
}
