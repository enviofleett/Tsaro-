'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface MediaPickerModalProps {
  onSelect: (url: string) => void;
  onClose: () => void;
}

export default function MediaPickerModal({ onSelect, onClose }: MediaPickerModalProps) {
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const supabase = createClient();

  const fetchFiles = useCallback(async () => {
    const { data } = await supabase.storage.from('media').list();
    if (data) {
      setFiles(data.filter(f => f.name !== '.emptyFolderPlaceholder'));
    }
    setIsLoading(false);
  }, [supabase]);

  useEffect(() => {
    let ignore = false;
    supabase.storage.from('media').list().then(({ data }) => {
      if (!ignore) {
        if (data) {
          setFiles(data.filter(f => f.name !== '.emptyFolderPlaceholder'));
        }
        setIsLoading(false);
      }
    });
    return () => {
      ignore = true;
    };
  }, [supabase]);

  const handleDelete = async (e: React.MouseEvent, fileName: string) => {
    e.stopPropagation(); // don't select the image
    if (!confirm('Are you sure you want to permanently delete this media file?')) return;
    
    setIsLoading(true);
    await supabase.storage.from('media').remove([fileName]);
    await fetchFiles();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      
      const { error } = await supabase.storage.from('media').upload(fileName, file);
      if (error) throw error;
      
      const { data: urlData } = supabase.storage.from('media').getPublicUrl(fileName);
      onSelect(urlData.publicUrl);
      onClose();
    } catch (err) {
      console.error('Error uploading:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const selectFile = (fileName: string) => {
    const { data } = supabase.storage.from('media').getPublicUrl(fileName);
    onSelect(data.publicUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-charcoal border border-white/10 rounded-lg w-full max-w-4xl max-h-[80vh] flex flex-col shadow-2xl">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-deepGray/50">
          <h2 className="text-xl font-bold text-white">Media Library</h2>
          <button onClick={onClose} className="text-textMuted hover:text-white transition-colors">
            ✕ Close
          </button>
        </div>
        
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <label className="btn-primary-red px-4 py-2 rounded text-sm font-semibold cursor-pointer">
            {isUploading ? 'Uploading...' : 'Upload New Image'}
            <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={isUploading} />
          </label>
          <button onClick={fetchFiles} className="text-sm text-textLight hover:text-white underline">Refresh</button>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          {isLoading ? (
            <div className="text-center text-textMuted py-10">Loading media...</div>
          ) : files.length === 0 ? (
            <div className="text-center text-textMuted py-10">No images found in the assets bucket.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {files.map(file => {
                const { data } = supabase.storage.from('media').getPublicUrl(file.name);
                return (
                  <div 
                    key={file.id} 
                    onClick={() => selectFile(file.name)}
                    className="group relative aspect-square bg-deepGray border border-white/10 rounded overflow-hidden cursor-pointer hover:border-brandRed transition-colors"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={data.publicUrl} alt={file.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                      <span className="text-xs text-white text-center font-medium bg-black/80 px-2 py-1 rounded truncate max-w-full">
                        Select Image
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
