"use client";

import { useState, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  accept?: string;
}

export default function ImageUpload({ value, onChange, placeholder, accept }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setError(null);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file, { upsert: false });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      onChange(publicUrlData.publicUrl);
    } catch (err: any) {
      console.error('Error uploading file:', err);
      setError(err.message || 'Error uploading file');
    } finally {
      setIsUploading(false);
      // Reset input so the same file can be selected again if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "File URL"}
          className="flex-1 px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded text-white text-sm transition-colors whitespace-nowrap"
        >
          {isUploading ? 'Uploading...' : 'Upload File'}
        </button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        accept={accept || "image/*"}
        className="hidden"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      {value && value.startsWith('http') && (accept === undefined || accept.includes('image')) && (
        <div className="mt-2 relative w-32 h-20 rounded border border-white/10 overflow-hidden bg-deepGray/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
}
