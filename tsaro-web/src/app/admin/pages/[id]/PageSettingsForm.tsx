'use client'

import { useState } from 'react'

export default function PageSettingsForm({ 
  page, 
  updateAction 
}: { 
  page: any, 
  updateAction: (formData: FormData) => Promise<void> 
}) {
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)
    setSaveStatus(null)

    const formData = new FormData(e.currentTarget)
    
    try {
      await updateAction(formData)
      setSaveStatus("Settings Saved!")
      setTimeout(() => setSaveStatus(null), 3000)
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Failed to save")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="hidden" name="page_id" value={page.id} />
      
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
      
      <div className="flex items-center gap-2">
        <input type="checkbox" name="is_published" id="is_published" defaultChecked={page.is_published} className="w-4 h-4 accent-brandRed" />
        <label htmlFor="is_published" className="text-sm font-medium text-textLight">Published</label>
      </div>

      {error && (
        <div className="text-brandRed text-sm bg-brandRed/10 p-2 rounded">
          {error}
        </div>
      )}

      <div className="flex items-center gap-4 mt-2">
        <button type="submit" disabled={isSaving} className="flex-1 btn-primary-red py-2 rounded font-semibold disabled:opacity-50">
          {isSaving ? "Saving..." : "Save Settings"}
        </button>
        {saveStatus && (
          <span className="text-green-500 text-sm font-medium animate-pulse shrink-0">
            {saveStatus}
          </span>
        )}
      </div>
    </form>
  )
}
