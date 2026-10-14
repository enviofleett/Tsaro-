'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { useEffect } from 'react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm prose-invert max-w-none min-h-[150px] outline-none p-4 text-white',
      },
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '')
    }
  }, [value, editor])

  if (!editor) {
    return null
  }

  return (
    <div className="bg-deepGray border border-white/10 rounded overflow-hidden">
      <div className="bg-charcoal border-b border-white/10 p-2 flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('bold') ? 'bg-white/20 text-white' : 'text-textLight hover:bg-white/10'}`}
        >
          <b>B</b>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('italic') ? 'bg-white/20 text-white' : 'text-textLight hover:bg-white/10'}`}
        >
          <i>I</i>
        </button>
        <div className="w-px h-6 bg-white/10 mx-1 self-center" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('heading', { level: 2 }) ? 'bg-white/20 text-white' : 'text-textLight hover:bg-white/10'}`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('heading', { level: 3 }) ? 'bg-white/20 text-white' : 'text-textLight hover:bg-white/10'}`}
        >
          H3
        </button>
        <div className="w-px h-6 bg-white/10 mx-1 self-center" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('bulletList') ? 'bg-white/20 text-white' : 'text-textLight hover:bg-white/10'}`}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('orderedList') ? 'bg-white/20 text-white' : 'text-textLight hover:bg-white/10'}`}
        >
          1. List
        </button>
        <div className="w-px h-6 bg-white/10 mx-1 self-center" />
        <button
          type="button"
          onClick={() => {
            const url = window.prompt('URL')
            if (url) {
              editor.chain().focus().setLink({ href: url }).run()
            } else if (url === '') {
              editor.chain().focus().unsetLink().run()
            }
          }}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('link') ? 'bg-white/20 text-white' : 'text-textLight hover:bg-white/10'}`}
        >
          Link
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
