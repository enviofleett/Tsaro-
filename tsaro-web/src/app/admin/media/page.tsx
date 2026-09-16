import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export default async function MediaLibrary() {
  const supabase = await createClient()

  // Fetch files from 'assets' bucket
  const { data: files, error } = await supabase.storage.from('assets').list()

  async function uploadFile(formData: FormData) {
    'use server'
    const file = formData.get('file') as File
    if (!file || file.size === 0) return

    const supabase = await createClient()
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
    
    await supabase.storage.from('assets').upload(fileName, file)
    revalidatePath('/admin/media')
  }

  async function deleteFile(formData: FormData) {
    'use server'
    const fileName = formData.get('fileName') as string
    if (!fileName) return

    const supabase = await createClient()
    await supabase.storage.from('assets').remove([fileName])
    revalidatePath('/admin/media')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Media Library</h1>

      {error && (
        <div className="bg-red-500/20 text-red-400 p-4 rounded mb-8">
          <p className="font-bold">Error connecting to Storage Bucket</p>
          <p className="text-sm mt-1">Please ensure you have created a public bucket named <strong>assets</strong> in your Supabase dashboard.</p>
        </div>
      )}

      {/* Upload Form */}
      <div className="bg-charcoal border border-white/10 rounded-lg p-6 mb-8 capability-card">
        <h2 className="text-xl font-semibold mb-4 text-white">Upload New Image</h2>
        <form action={uploadFile} className="flex gap-4 items-end">
          <div className="flex-1">
            <input type="file" name="file" accept="image/*" required className="w-full text-sm text-textLight file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20" />
          </div>
          <button type="submit" className="btn-primary-red px-6 py-2 rounded font-semibold">
            Upload Image
          </button>
        </form>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {files?.map(file => {
          // Skip placeholder files that Supabase sometimes creates
          if (file.name === '.emptyFolderPlaceholder') return null

          // Get public URL
          const { data: { publicUrl } } = supabase.storage.from('assets').getPublicUrl(file.name)

          return (
            <div key={file.id} className="bg-charcoal border border-white/10 rounded-lg overflow-hidden group">
              <div className="aspect-square bg-deepGray relative">
                <img src={publicUrl} alt={file.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <div className="text-center">
                    <p className="text-xs text-white mb-2 truncate max-w-full">{file.name}</p>
                    {/* The copy to clipboard functionality requires client-side JS, so we'll just show the path for the admin to copy */}
                    <input type="text" readOnly value={publicUrl} className="w-full text-[10px] bg-black/50 text-white border border-white/20 rounded px-2 py-1 mb-2" />
                  </div>
                </div>
              </div>
              <div className="p-3 bg-charcoal border-t border-white/10 flex justify-between items-center">
                <span className="text-xs text-textMuted truncate pr-2">{file.name}</span>
                <form action={deleteFile}>
                  <input type="hidden" name="fileName" value={file.name} />
                  <button type="submit" className="text-brandRed hover:text-red-400 text-xs underline">Delete</button>
                </form>
              </div>
            </div>
          )
        })}

        {(!files || files.length === 0) && !error && (
          <div className="col-span-full text-center p-10 border border-white/10 border-dashed rounded-lg text-textMuted">
            No images uploaded yet.
          </div>
        )}
      </div>
    </div>
  )
}
