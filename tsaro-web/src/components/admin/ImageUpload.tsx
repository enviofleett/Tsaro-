'use client';

import { useState } from 'react';
import MediaPickerModal from './MediaPickerModal';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

export default function ImageUpload({ value, onChange, placeholder }: ImageUploadProps) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="space-y-2">
      {!value ? (
        <button
          type="button"
          onClick={() => setShowPicker(true)}
          className="w-full h-32 border-2 border-dashed border-white/20 hover:border-brandRed hover:bg-brandRed/5 rounded-lg flex flex-col items-center justify-center gap-2 text-textMuted hover:text-white transition-colors"
        >
          <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          <span className="text-sm font-medium">Click to Choose or Upload Image</span>
        </button>
      ) : (
        <div className="relative group rounded-lg overflow-hidden border border-white/20 bg-deepGray">
          {value.startsWith('http') || value.startsWith('/') ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={value} alt="Preview" className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
          ) : (
            <div className="w-full h-48 flex items-center justify-center bg-black/40">
              <span className="text-xs text-textMuted truncate max-w-full px-4">{value}</span>
            </div>
          )}
          
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setShowPicker(true)}
              className="px-4 py-2 bg-white text-black rounded text-sm font-bold hover:bg-gray-200 transition-colors"
            >
              Change Image
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="px-4 py-2 bg-brandRed text-white rounded text-sm font-bold hover:bg-red-700 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {showPicker && (
        <MediaPickerModal 
          onSelect={(url) => {
            onChange(url);
            setShowPicker(false);
          }} 
          onClose={() => setShowPicker(false)} 
        />
      )}
    </div>
  );
}
