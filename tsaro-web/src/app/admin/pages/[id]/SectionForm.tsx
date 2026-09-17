'use client'

import { useState } from 'react'
import ImageUpload from '@/components/admin/ImageUpload'

export default function SectionForm({ section, updateAction }: { section: any, updateAction: (formData: FormData) => Promise<void> }) {
  const [content, setContent] = useState(section.content || {})
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<string | null>(null)

  // Handle nested form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent({ ...content, [e.target.name]: e.target.value })
  }

  // Handle generic array items (e.g. arms in Capability Grid)
  const handleArrayChange = (arrayName: string, index: number, field: string, value: string) => {
    const updatedArray = [...(content[arrayName] || [])]
    if (!updatedArray[index]) updatedArray[index] = {}
    updatedArray[index][field] = value
    setContent({ ...content, [arrayName]: updatedArray })
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    const formData = new FormData()
    formData.append('section_id', section.id)
    formData.append('content', JSON.stringify(content))
    await updateAction(formData)
    setIsSaving(false)
    setSaveStatus("Saved!")
    setTimeout(() => setSaveStatus(null), 3000)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Dynamic Fields based on Section Type */}
      
      {section.section_type === 'hero_banner' && (
        <>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Headline (HTML allowed)</label>
            <textarea name="headline" value={content.headline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" placeholder="Strategy that survives <br /> contact with the ground." />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Subheadline</label>
            <textarea name="subheadline" value={content.subheadline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Background Image URL</label>
            <ImageUpload 
              value={content.image_url || ''} 
              onChange={(url) => setContent({ ...content, image_url: url })} 
              placeholder="/hero-banner.png" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Background Video URL (e.g., YouTube link)</label>
            <input type="text" name="video_url" value={content.video_url || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" placeholder="https://www.youtube.com/watch?v=..." />
            <p className="text-[10px] text-textMuted mt-1">If provided, this video will play in the background instead of the image.</p>
          </div>
        </>
      )}

      {section.section_type === 'text_block' && (
        <>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Title</label>
            <input type="text" name="title" value={content.title || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Body Text (HTML allowed)</label>
            <textarea name="body" value={content.body || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-32" />
          </div>
        </>
      )}

      {section.section_type === 'capability_grid' && (
        <>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Main Title (HTML allowed)</label>
            <textarea name="title" value={content.title || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-16" placeholder="Two disciplines. <br /> One accountable firm." />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Subtitle</label>
            <textarea name="subtitle" value={content.subtitle || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-16" />
          </div>

          <div className="pt-4 border-t border-white/10 mt-4 space-y-6">
            <h4 className="text-white font-semibold">Grid Items (Arms)</h4>
            {[0, 1, 2].map((i) => {
              const arm = content.arms?.[i] || {}
              return (
                <div key={i} className="bg-deepGray/50 p-4 rounded border border-white/5 space-y-3">
                  <div className="text-xs text-brandRed font-bold mb-2">ARM 0{i + 1}</div>
                  <input type="text" placeholder="Title" value={arm.title || ''} onChange={(e) => handleArrayChange('arms', i, 'title', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                  <textarea placeholder="Description" value={arm.description || ''} onChange={(e) => handleArrayChange('arms', i, 'description', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-20 text-sm" />
                  <input type="text" placeholder="Link URL" value={arm.link || ''} onChange={(e) => handleArrayChange('arms', i, 'link', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                </div>
              )
            })}
          </div>
        </>
      )}

      {section.section_type === 'where_we_operate' && (
        <>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Section Headline</label>
            <input type="text" name="headline" value={content.headline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" placeholder="Where we operate" />
          </div>

          <div className="pt-4 border-t border-white/10 mt-4 space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-semibold">Locations / Cards</h4>
              <button
                type="button"
                onClick={() => {
                  const locations = [...(content.locations || [])]
                  locations.push({ name: '', image: '', address: '', link: '' })
                  setContent({ ...content, locations })
                }}
                className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors"
              >
                + Add Card
              </button>
            </div>
            {(content.locations || []).map((_: any, i: number) => {
              const loc = content.locations?.[i] || {}
              return (
                <div key={i} className="bg-deepGray/50 p-4 rounded border border-white/5 space-y-3 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-brandRed font-bold">CARD {i + 1}</div>
                    <button
                      type="button"
                      onClick={() => {
                        const locations = [...(content.locations || [])]
                        locations.splice(i, 1)
                        setContent({ ...content, locations })
                      }}
                      className="text-xs text-textMuted hover:text-brandRed"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-textMuted mb-1">Region / Location Name</label>
                    <input type="text" placeholder="e.g. Americas" value={loc.name || ''} onChange={(e) => handleArrayChange('locations', i, 'name', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-textMuted mb-1">Background Image URL</label>
                    <ImageUpload value={loc.image || ''} onChange={(url) => handleArrayChange('locations', i, 'image', url)} placeholder="Leave blank for black background" />
                  </div>

                  <div>
                    <label className="block text-xs text-textMuted mb-1">Details / Sub-agencies</label>
                    <textarea placeholder="e.g. Centerra" value={loc.address || ''} onChange={(e) => handleArrayChange('locations', i, 'address', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-20 text-sm" />
                  </div>

                  <div>
                    <label className="block text-xs text-textMuted mb-1">Action Link URL (optional)</label>
                    <input type="text" placeholder="e.g. /contact" value={loc.link || ''} onChange={(e) => handleArrayChange('locations', i, 'link', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                  </div>
                  
                </div>
              )
            })}
          </div>
        </>
      )}

      {section.section_type === 'research_insights' && (
        <>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Section Headline</label>
            <input type="text" name="headline" value={content.headline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" placeholder="Research & Insights" />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Subheadline</label>
            <textarea name="subheadline" value={content.subheadline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-16" placeholder="Original analysis from the field..." />
          </div>

          <div className="pt-4 border-t border-white/10 mt-4 space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-semibold">Insight Cards</h4>
              <button
                type="button"
                onClick={() => {
                  const insights = [...(content.insights || [])]
                  insights.push({ category: '', title: '', excerpt: '', image: '', link: '' })
                  setContent({ ...content, insights })
                }}
                className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors"
              >
                + Add Insight
              </button>
            </div>
            {(content.insights || []).map((_: any, i: number) => {
              const item = content.insights?.[i] || {}
              return (
                <div key={i} className="bg-deepGray/50 p-4 rounded border border-white/5 space-y-3 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-brandRed font-bold">INSIGHT {i + 1}</div>
                    <button
                      type="button"
                      onClick={() => {
                        const insights = [...(content.insights || [])]
                        insights.splice(i, 1)
                        setContent({ ...content, insights })
                      }}
                      className="text-xs text-textMuted hover:text-brandRed"
                    >
                      Remove
                    </button>
                  </div>
                  <input type="text" placeholder="Category (e.g. Policy Analysis)" value={item.category || ''} onChange={(e) => handleArrayChange('insights', i, 'category', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                  <input type="text" placeholder="Title" value={item.title || ''} onChange={(e) => handleArrayChange('insights', i, 'title', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                  <textarea placeholder="Excerpt / Summary" value={item.excerpt || ''} onChange={(e) => handleArrayChange('insights', i, 'excerpt', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-20 text-sm" />
                  <ImageUpload value={item.image || ''} onChange={(url) => handleArrayChange('insights', i, 'image', url)} placeholder="Cover Image URL (e.g. /research-cover.jpg)" />
                  <input type="text" placeholder="Link URL (e.g. https://...)" value={item.link || ''} onChange={(e) => handleArrayChange('insights', i, 'link', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                </div>
              )
            })}
            {(!content.insights || content.insights.length === 0) && (
              <div className="text-center py-4 text-textMuted text-sm border border-white/5 border-dashed rounded">
                No insights yet. Click &quot;+ Add Insight&quot; to get started.
              </div>
            )}
          </div>
        </>
      )}

      {section.section_type === 'authority_bar' && (
        <>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Label</label>
            <input
              type="text"
              name="label"
              value={content.label || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white"
              placeholder="OPERATIONAL ACCREDITATION & CAPABILITY"
            />
          </div>

          <div className="pt-4 border-t border-white/10 mt-4 space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-semibold">Items</h4>
              <button
                type="button"
                onClick={() => {
                  const items = [...(content.items || [])]
                  items.push('')
                  setContent({ ...content, items })
                }}
                className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors"
              >
                + Add Item
              </button>
            </div>
            {(content.items || []).map((item: any, i: number) => (
              <div key={i} className="bg-deepGray/50 p-4 rounded border border-white/5 space-y-3 relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-brandRed font-bold">ITEM {i + 1}</div>
                  <button
                    type="button"
                    onClick={() => {
                      const items = [...(content.items || [])]
                      items.splice(i, 1)
                      setContent({ ...content, items })
                    }}
                    className="text-xs text-textMuted hover:text-brandRed"
                  >
                    Remove
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Item text"
                  value={item || ''}
                  onChange={(e) => {
                    const items = [...(content.items || [])]
                    items[i] = e.target.value
                    setContent({ ...content, items })
                  }}
                  className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm"
                />
              </div>
            ))}
            {(!content.items || content.items.length === 0) && (
              <div className="text-center py-4 text-textMuted text-sm border border-white/5 border-dashed rounded">
                No items yet. Click &quot;+ Add Item&quot; to get started.
              </div>
            )}
          </div>
        </>
      )}

      {section.section_type === 'commitments' && (
        <>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Headline (HTML allowed)</label>
            <textarea
              name="headline"
              value={content.headline || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24"
              placeholder="What we won't do<br />differently for speed."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Subtitle</label>
            <textarea
              name="subtitle"
              value={content.subtitle || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-20"
              placeholder="Three commitments that hold regardless of client, sector, or deadline."
            />
          </div>

          <div className="pt-4 border-t border-white/10 mt-4 space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-semibold">Commitment Items</h4>
              <button
                type="button"
                onClick={() => {
                  const items = [...(content.items || [])]
                  items.push({ title: '', description: '' })
                  setContent({ ...content, items })
                }}
                className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors"
              >
                + Add Item
              </button>
            </div>
            {(content.items || []).map((_: any, i: number) => {
              const item = content.items?.[i] || {}
              return (
                <div key={i} className="bg-deepGray/50 p-4 rounded border border-white/5 space-y-3 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-brandRed font-bold">ITEM {i + 1}</div>
                    <button
                      type="button"
                      onClick={() => {
                        const items = [...(content.items || [])]
                        items.splice(i, 1)
                        setContent({ ...content, items })
                      }}
                      className="text-xs text-textMuted hover:text-brandRed"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Title"
                    value={item.title || ''}
                    onChange={(e) => handleArrayChange('items', i, 'title', e.target.value)}
                    className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm"
                  />
                  <textarea
                    placeholder="Description"
                    value={item.description || ''}
                    onChange={(e) => handleArrayChange('items', i, 'description', e.target.value)}
                    className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-20 text-sm"
                  />
                </div>
              )
            })}
            {(!content.items || content.items.length === 0) && (
              <div className="text-center py-4 text-textMuted text-sm border border-white/5 border-dashed rounded">
                No items yet. Click &quot;+ Add Item&quot; to get started.
              </div>
            )}
          </div>
        </>
      )}

      {section.section_type === 'operational_differentiator' && (
        <>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Headline (HTML allowed)</label>
            <textarea
              name="headline"
              value={content.headline || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24"
              placeholder="Five stages, the same<br />firm throughout."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Subtitle</label>
            <textarea
              name="subtitle"
              value={content.subtitle || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-20"
              placeholder="No handoff between the people who wrote the plan and the people who built it."
            />
          </div>

          <div className="pt-4 border-t border-white/10 mt-4 space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-semibold">Stages</h4>
              <button
                type="button"
                onClick={() => {
                  const stages = [...(content.stages || [])]
                  stages.push({ title: '', description: '' })
                  setContent({ ...content, stages })
                }}
                className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors"
              >
                + Add Stage
              </button>
            </div>
            {(content.stages || []).map((_: any, i: number) => {
              const stage = content.stages?.[i] || {}
              return (
                <div key={i} className="bg-deepGray/50 p-4 rounded border border-white/5 space-y-3 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-brandRed font-bold">STAGE {i + 1}</div>
                    <button
                      type="button"
                      onClick={() => {
                        const stages = [...(content.stages || [])]
                        stages.splice(i, 1)
                        setContent({ ...content, stages })
                      }}
                      className="text-xs text-textMuted hover:text-brandRed"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Title"
                    value={stage.title || ''}
                    onChange={(e) => handleArrayChange('stages', i, 'title', e.target.value)}
                    className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm"
                  />
                  <textarea
                    placeholder="Description"
                    value={stage.description || ''}
                    onChange={(e) => handleArrayChange('stages', i, 'description', e.target.value)}
                    className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-20 text-sm"
                  />
                </div>
              )
            })}
            {(!content.stages || content.stages.length === 0) && (
              <div className="text-center py-4 text-textMuted text-sm border border-white/5 border-dashed rounded">
                No stages yet. Click &quot;+ Add Stage&quot; to get started.
              </div>
            )}
          </div>
        </>
      )}

            {(section.section_type === 'contact_section' || section.section_type === 'intelligence_briefs') && (
        <>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Headline</label>
            <input
              type="text"
              name="headline"
              value={content.headline || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white"
              placeholder="Contact Command"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Subheadline</label>
            <textarea
              name="subheadline"
              value={content.subheadline || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24"
              placeholder="Initiate a secure dialogue with our executive team..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Address Text</label>
            <textarea
              name="address"
              value={content.address || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24"
              placeholder="Suite 600, 6th Floor, Sector A,
Shashilga Court, Ahmadu Bello Way,
Abuja, Nigeria"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Email Address</label>
            <input type="text" name="email" value={content.email || ''} onChange={handleChange} placeholder="info@tsaroglobaldefence.com" className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Phone Number</label>
            <input type="text" name="phone" value={content.phone || ''} onChange={handleChange} placeholder="+234 704 341 9078" className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" />
          </div>
        </>
      )}

      {section.section_type === 'institute' && (
        <>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Headline (HTML allowed)</label>
            <textarea
              name="headline"
              value={content.headline || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24"
              placeholder="Where the next<br />generation of this work<br />gets built."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Subtitle</label>
            <textarea
              name="subtitle"
              value={content.subtitle || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-20"
              placeholder="Two standing platforms, separately run, feeding expertise back into everything above."
            />
          </div>

          <div className="pt-4 border-t border-white/10 mt-4 space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-semibold">Platforms</h4>
              <button
                type="button"
                onClick={() => {
                  const platforms = [...(content.platforms || [])]
                  platforms.push({ title: '', description: '', link_url: '', link_text: '' })
                  setContent({ ...content, platforms })
                }}
                className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors"
              >
                + Add Platform
              </button>
            </div>
            {(content.platforms || []).map((_: any, i: number) => {
              const platform = content.platforms?.[i] || {}
              return (
                <div key={i} className="bg-deepGray/50 p-4 rounded border border-white/5 space-y-3 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-brandRed font-bold">PLATFORM {i + 1}</div>
                    <button
                      type="button"
                      onClick={() => {
                        const platforms = [...(content.platforms || [])]
                        platforms.splice(i, 1)
                        setContent({ ...content, platforms })
                      }}
                      className="text-xs text-textMuted hover:text-brandRed"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Title (e.g. Tsaro Academy)"
                    value={platform.title || ''}
                    onChange={(e) => handleArrayChange('platforms', i, 'title', e.target.value)}
                    className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm"
                  />
                  <textarea
                    placeholder="Description"
                    value={platform.description || ''}
                    onChange={(e) => handleArrayChange('platforms', i, 'description', e.target.value)}
                    className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-20 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Link URL (e.g. https://academy.tsaroglobaldefence.com)"
                    value={platform.link_url || ''}
                    onChange={(e) => handleArrayChange('platforms', i, 'link_url', e.target.value)}
                    className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Link Text (e.g. VISIT ACADEMY)"
                    value={platform.link_text || ''}
                    onChange={(e) => handleArrayChange('platforms', i, 'link_text', e.target.value)}
                    className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm"
                  />
                </div>
              )
            })}
            {(!content.platforms || content.platforms.length === 0) && (
              <div className="text-center py-4 text-textMuted text-sm border border-white/5 border-dashed rounded">
                No platforms yet. Click &quot;+ Add Platform&quot; to get started.
              </div>
            )}
          </div>
        </>
      )}

      
      {section.section_type === 'about_hero' && (
        <>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Headline (HTML allowed)</label>
            <textarea name="headline" value={content.headline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Subheadline (HTML allowed)</label>
            <textarea name="subheadline" value={content.subheadline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" />
          </div>
          <div className="pt-4 border-t border-white/10 mt-4 space-y-6">
            <div className="flex items-center justify-between"><h4 className="text-white font-semibold">Locations</h4>
            <button type="button" onClick={() => { const locations = [...(content.locations || [])]; locations.push(''); setContent({ ...content, locations }); }} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors">+ Add Location</button></div>
            {(content.locations || []).map((loc: any, i: number) => (
              <div key={i} className="flex gap-2">
                <input type="text" value={loc || ''} onChange={(e) => { const locations = [...(content.locations || [])]; locations[i] = e.target.value; setContent({ ...content, locations }) }} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                <button type="button" onClick={() => { const locations = [...(content.locations || [])]; locations.splice(i, 1); setContent({ ...content, locations }) }} className="text-brandRed text-xs">Remove</button>
              </div>
            ))}
          </div>
        </>
      )}

      {section.section_type === 'split_narrative' && (
        <>
          <div><label className="block text-sm font-medium text-textLight mb-1">Image URL</label><ImageUpload value={content.image || ''} onChange={(url) => setContent({ ...content, image: url })} placeholder="Image URL" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Overline</label><input type="text" name="overline" value={content.overline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Badge</label><input type="text" name="badge" value={content.badge || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Headline</label><textarea name="headline" value={content.headline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Body Text</label><textarea name="body" value={content.body || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Quote Block</label><textarea name="quote" value={content.quote || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Secondary Body Text</label><textarea name="subbody" value={content.subbody || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Button Text</label><input type="text" name="btnText" value={content.btnText || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Button Link</label><input type="text" name="btnLink" value={content.btnLink || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
        </>
      )}

      {section.section_type === 'core_values' && (
        <>
          <div><label className="block text-sm font-medium text-textLight mb-1">Headline</label><textarea name="headline" value={content.headline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-16" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Subheadline</label><textarea name="subheadline" value={content.subheadline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-16" /></div>
          <div className="pt-4 border-t border-white/10 mt-4 space-y-6">
            <div className="flex items-center justify-between"><h4 className="text-white font-semibold">Values</h4><button type="button" onClick={() => { const values = [...(content.values || [])]; values.push({}); setContent({ ...content, values }); }} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors">+ Add Value</button></div>
            {(content.values || []).map((v: any, i: number) => (
              <div key={i} className="bg-deepGray/50 p-4 rounded border border-white/5 space-y-3 relative">
                <div className="flex items-center justify-between mb-2"><div className="text-xs text-brandRed font-bold">VALUE {i + 1}</div><button type="button" onClick={() => { const values = [...(content.values || [])]; values.splice(i, 1); setContent({ ...content, values }) }} className="text-xs text-textMuted hover:text-brandRed">Remove</button></div>
                <input type="text" placeholder="Title" value={v.title || ''} onChange={(e) => handleArrayChange('values', i, 'title', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                <textarea placeholder="Description" value={v.desc || ''} onChange={(e) => handleArrayChange('values', i, 'desc', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-20 text-sm" />
                <input type="text" placeholder="Bottom Tag" value={v.tag || ''} onChange={(e) => handleArrayChange('values', i, 'tag', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
              </div>
            ))}
          </div>
        </>
      )}

      {section.section_type === 'clientele_hero' && (
        <>
          <div><label className="block text-sm font-medium text-textLight mb-1">Headline (HTML allowed)</label><textarea name="headline" value={content.headline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Subheadline</label><textarea name="subheadline" value={content.subheadline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" /></div>
          <div className="pt-4 border-t border-white/10 mt-4 space-y-6">
            <div className="flex items-center justify-between"><h4 className="text-white font-semibold">Tags</h4><button type="button" onClick={() => { const tags = [...(content.tags || [])]; tags.push(''); setContent({ ...content, tags }); }} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors">+ Add Tag</button></div>
            {(content.tags || []).map((tag: any, i: number) => (
              <div key={i} className="flex gap-2">
                <input type="text" value={tag || ''} onChange={(e) => { const tags = [...(content.tags || [])]; tags[i] = e.target.value; setContent({ ...content, tags }) }} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                <button type="button" onClick={() => { const tags = [...(content.tags || [])]; tags.splice(i, 1); setContent({ ...content, tags }) }} className="text-brandRed text-xs">Remove</button>
              </div>
            ))}
          </div>
        </>
      )}

      {section.section_type === 'client_sectors' && (
        <>
          <div className="pt-4 border-t border-white/10 mt-4 space-y-6">
            <div className="flex items-center justify-between"><h4 className="text-white font-semibold">Sectors</h4><button type="button" onClick={() => { const sectors = [...(content.sectors || [])]; sectors.push({ bullets: [] }); setContent({ ...content, sectors }); }} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors">+ Add Sector</button></div>
            {(content.sectors || []).map((sector: any, i: number) => (
              <div key={i} className="bg-deepGray/50 p-4 rounded border border-white/5 space-y-3 relative">
                <div className="flex items-center justify-between mb-2"><div className="text-xs text-brandRed font-bold">SECTOR {i + 1}</div><button type="button" onClick={() => { const sectors = [...(content.sectors || [])]; sectors.splice(i, 1); setContent({ ...content, sectors }) }} className="text-xs text-textMuted hover:text-brandRed">Remove</button></div>
                <input type="text" placeholder="Title" value={sector.title || ''} onChange={(e) => handleArrayChange('sectors', i, 'title', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                <textarea placeholder="Description" value={sector.desc || ''} onChange={(e) => handleArrayChange('sectors', i, 'desc', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-20 text-sm" />
                <div>
                  <label className="text-xs text-textMuted">Bullets (comma separated)</label>
                  <input type="text" placeholder="Bullet 1, Bullet 2" value={sector.bullets?.join(',') || ''} onChange={(e) => { const sectors = [...(content.sectors || [])]; sectors[i].bullets = e.target.value.split(',').map(s=>s.trim()); setContent({ ...content, sectors }) }} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                </div>
                <ImageUpload value={sector.logosImage || ''} onChange={(url) => handleArrayChange('sectors', i, 'logosImage', url)} placeholder="Logos Image URL" />
                <input type="text" placeholder="Logos Label" value={sector.logosLabel || ''} onChange={(e) => handleArrayChange('sectors', i, 'logosLabel', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                <input type="text" placeholder="Footer Tag" value={sector.footerTag || ''} onChange={(e) => handleArrayChange('sectors', i, 'footerTag', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
              </div>
            ))}
          </div>
        </>
      )}

      {section.section_type === 'pull_quote' && (
        <>
          <div><label className="block text-sm font-medium text-textLight mb-1">Quote Block</label><textarea name="quote" value={content.quote || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-32" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Author / Subtext</label><input type="text" name="author" value={content.author || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
        </>
      )}

      {section.section_type === 'cta_banner' && (
        <>
          <div><label className="block text-sm font-medium text-textLight mb-1">Headline</label><input type="text" name="headline" value={content.headline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Subheadline</label><textarea name="subheadline" value={content.subheadline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Button Text</label><input type="text" name="btnText" value={content.btnText || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Button Link</label><input type="text" name="btnLink" value={content.btnLink || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
        </>
      )}

      {section.section_type === 'academy_hero' && (
        <>
          <div><label className="block text-sm font-medium text-textLight mb-1">Headline</label><textarea name="headline" value={content.headline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-20" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Body Text</label><textarea name="body" value={content.body || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-20" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-medium text-textLight">Primary Button Text</label><input type="text" value={content.primaryBtn?.text || ''} onChange={(e) => setContent({...content, primaryBtn: {...content.primaryBtn, text: e.target.value}})} className="w-full px-2 py-1 bg-deepGray border border-white/10 rounded text-white text-sm" /></div>
            <div><label className="block text-xs font-medium text-textLight">Primary Button Link</label><input type="text" value={content.primaryBtn?.link || ''} onChange={(e) => setContent({...content, primaryBtn: {...content.primaryBtn, link: e.target.value}})} className="w-full px-2 py-1 bg-deepGray border border-white/10 rounded text-white text-sm" /></div>
            <div><label className="block text-xs font-medium text-textLight">Secondary Button Text</label><input type="text" value={content.secondaryBtn?.text || ''} onChange={(e) => setContent({...content, secondaryBtn: {...content.secondaryBtn, text: e.target.value}})} className="w-full px-2 py-1 bg-deepGray border border-white/10 rounded text-white text-sm" /></div>
            <div><label className="block text-xs font-medium text-textLight">Secondary Button Link</label><input type="text" value={content.secondaryBtn?.link || ''} onChange={(e) => setContent({...content, secondaryBtn: {...content.secondaryBtn, link: e.target.value}})} className="w-full px-2 py-1 bg-deepGray border border-white/10 rounded text-white text-sm" /></div>
          </div>
          <div className="pt-4 border-t border-white/10 mt-4 space-y-6">
            <div className="flex items-center justify-between"><h4 className="text-white font-semibold">Key Facts</h4><button type="button" onClick={() => { const facts = [...(content.facts || [])]; facts.push({}); setContent({ ...content, facts }); }} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors">+ Add Fact</button></div>
            {(content.facts || []).map((f: any, i: number) => (
              <div key={i} className="flex gap-2">
                <input type="text" placeholder="Value (e.g. 100%)" value={f.value || ''} onChange={(e) => handleArrayChange('facts', i, 'value', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                <input type="text" placeholder="Label (e.g. Instructors)" value={f.label || ''} onChange={(e) => handleArrayChange('facts', i, 'label', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                <button type="button" onClick={() => { const facts = [...(content.facts || [])]; facts.splice(i, 1); setContent({ ...content, facts }) }} className="text-brandRed text-xs">Remove</button>
              </div>
            ))}
          </div>
        </>
      )}

      {section.section_type === 'academy_flagship' && (
        <>
          <div><label className="block text-sm font-medium text-textLight mb-1">Badge</label><input type="text" name="badge" value={content.badge || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Image URL</label><ImageUpload value={content.image || ''} onChange={(url) => setContent({ ...content, image: url })} placeholder="Image URL" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Image Overlay Badge</label><input type="text" name="imageBadge" value={content.imageBadge || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Course Code</label><input type="text" name="code" value={content.code || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Code Type / Category</label><input type="text" name="codeType" value={content.codeType || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Title</label><input type="text" name="title" value={content.title || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Description</label><textarea name="desc" value={content.desc || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-textLight mb-1">Start Date</label><input type="date" name="startDate" value={content.startDate || content.date || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
            <div><label className="block text-sm font-medium text-textLight mb-1">End Date</label><input type="date" name="endDate" value={content.endDate || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          </div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Time Range</label><input type="text" name="timeRange" placeholder="e.g. 0900 HRS - 1700 HRS" value={content.timeRange || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Bullets (comma separated)</label>
            <input type="text" value={content.bullets?.join(',') || ''} onChange={(e) => setContent({...content, bullets: e.target.value.split(',').map(s=>s.trim())})} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" />
          </div>
        </>
      )}

      {section.section_type === 'academy_catalog' && (
        <>
          <div><label className="block text-sm font-medium text-textLight mb-1">Headline</label><input type="text" name="headline" value={content.headline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" /></div>
          <div className="pt-4 border-t border-white/10 mt-4 space-y-6">
            
          <div className="mb-6">
            <label className="block text-sm font-medium text-textLight mb-1">Available Categories (format: value:Label, comma separated)</label>
            <textarea 
              value={content.categories || 'kinetic:Kinetic & Weapons, protection:Protection & Medical, intel:Cyber & Intelligence, infrastructure:Infrastructure Defence'} 
              onChange={(e) => setContent({...content, categories: e.target.value})} 
              className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm h-16"
              placeholder="e.g. kinetic:Kinetic & Weapons, protection:Protection & Medical"
            />
          </div>
          <div className="flex items-center justify-between"><h4 className="text-white font-semibold">Programs</h4><button type="button" onClick={() => { const programs = [...(content.programs || [])]; programs.push({}); setContent({ ...content, programs }); }} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors">+ Add Program</button></div>
            {(content.programs || []).map((p: any, i: number) => (
              <div key={i} className="bg-deepGray/50 p-4 rounded border border-white/5 space-y-3 relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="text-xs text-brandRed font-bold">PROGRAM {i + 1}</div>
                    <label className="flex items-center gap-1 text-xs text-textLight bg-black/20 px-2 py-1 rounded cursor-pointer hover:bg-black/40">
                      <input type="checkbox" checked={p.isFavorite || false} onChange={(e) => {
                        // Uncheck others
                        const programs = [...(content.programs || [])].map(prog => ({ ...prog, isFavorite: false }));
                        programs[i].isFavorite = e.target.checked;
                        setContent({ ...content, programs });
                      }} className="accent-brandRed" />
                      ⭐ Featured Flagship
                    </label>
                  </div>
                  <button type="button" onClick={() => { const programs = [...(content.programs || [])]; programs.splice(i, 1); setContent({ ...content, programs }) }} className="text-xs text-textMuted hover:text-brandRed">Remove</button>
                </div>
                <select value={p.type || ''} onChange={(e) => handleArrayChange('programs', i, 'type', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm">
                  <option value="">Select Category...</option>
                  {(content.categories || 'kinetic:Kinetic & Weapons, protection:Protection & Medical, intel:Cyber & Intelligence, infrastructure:Infrastructure Defence').split(',').map((catStr: string, idx: number) => {
                    const parts = catStr.split(':');
                    const val = parts[0].trim();
                    const label = parts[1] ? parts[1].trim() : val;
                    return <option key={idx} value={val}>{label}</option>
                  })}
                </select>
                <input type="text" placeholder="Title" value={p.title || ''} onChange={(e) => handleArrayChange('programs', i, 'title', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                <input type="text" placeholder="Code" value={p.code || ''} onChange={(e) => handleArrayChange('programs', i, 'code', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                <input type="text" placeholder="Badge" value={p.badge || ''} onChange={(e) => handleArrayChange('programs', i, 'badge', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                <ImageUpload value={p.image || ''} onChange={(url) => handleArrayChange('programs', i, 'image', url)} placeholder="Image URL" />
                <textarea placeholder="Description" value={p.desc || ''} onChange={(e) => handleArrayChange('programs', i, 'desc', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-20 text-sm" />
                <div className="grid grid-cols-3 gap-2">
                  <input type="text" placeholder="Format" value={p.format || ''} onChange={(e) => handleArrayChange('programs', i, 'format', e.target.value)} className="w-full px-2 py-1 bg-deepGray border border-white/10 rounded text-white text-sm" />
                  <input type="text" placeholder="Prerequisite" value={p.prerequisite || ''} onChange={(e) => handleArrayChange('programs', i, 'prerequisite', e.target.value)} className="w-full px-2 py-1 bg-deepGray border border-white/10 rounded text-white text-sm" />
                  <input type="text" placeholder="Duration" value={p.duration || ''} onChange={(e) => handleArrayChange('programs', i, 'duration', e.target.value)} className="w-full px-2 py-1 bg-deepGray border border-white/10 rounded text-white text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-textMuted uppercase mb-1">Start Date</span>
                    <input type="date" value={p.startDate || p.date || ''} onChange={(e) => handleArrayChange('programs', i, 'startDate', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-textMuted uppercase mb-1">End Date</span>
                    <input type="date" value={p.endDate || ''} onChange={(e) => handleArrayChange('programs', i, 'endDate', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                  </div>
                </div>
                <input type="text" placeholder="Time Range (e.g. 0900 HRS - 1700 HRS)" value={p.timeRange || ''} onChange={(e) => handleArrayChange('programs', i, 'timeRange', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
              </div>
            ))}
          </div>
        </>
      )}

      {section.section_type === 'academy_methodology' && (
        <>
          <div><label className="block text-sm font-medium text-textLight mb-1">Headline</label><textarea name="headline" value={content.headline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-16" /></div>
          <div><label className="block text-sm font-medium text-textLight mb-1">Subheadline</label><textarea name="subheadline" value={content.subheadline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-16" /></div>
          <div className="pt-4 border-t border-white/10 mt-4 space-y-6">
            <div className="flex items-center justify-between"><h4 className="text-white font-semibold">Pillars</h4><button type="button" onClick={() => { const pillars = [...(content.pillars || [])]; pillars.push({}); setContent({ ...content, pillars }); }} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors">+ Add Pillar</button></div>
            {(content.pillars || []).map((p: any, i: number) => (
              <div key={i} className="bg-deepGray/50 p-4 rounded border border-white/5 space-y-3 relative">
                <div className="flex items-center justify-between mb-2"><div className="text-xs text-brandRed font-bold">PILLAR {i + 1}</div><button type="button" onClick={() => { const pillars = [...(content.pillars || [])]; pillars.splice(i, 1); setContent({ ...content, pillars }) }} className="text-xs text-textMuted hover:text-brandRed">Remove</button></div>
                <input type="text" placeholder="Title" value={p.title || ''} onChange={(e) => handleArrayChange('pillars', i, 'title', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                <textarea placeholder="Description" value={p.desc || ''} onChange={(e) => handleArrayChange('pillars', i, 'desc', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-20 text-sm" />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Fallback for unconfigured section types */}
      {!['hero_banner', 'text_block', 'capability_grid', 'where_we_operate', 'research_insights', 'authority_bar', 'commitments', 'operational_differentiator', 'contact_section', 'institute', 'about_hero', 'split_narrative', 'core_values', 'clientele_hero', 'client_sectors', 'pull_quote', 'cta_banner', 'academy_hero', 'academy_flagship', 'academy_catalog', 'academy_methodology'].includes(section.section_type) && (
        <div>
          <label className="block text-sm font-medium text-textLight mb-1">Raw JSON Content</label>
          <textarea name="content" value={JSON.stringify(content, null, 2)} onChange={(e) => {
            try { setContent(JSON.parse(e.target.value)) } catch {}
          }} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-48 font-mono text-xs" />
        </div>
      )}

      <div className="flex items-center gap-4 mt-4">
        <button type="submit" disabled={isSaving} className="bg-brandRed hover:bg-red-700 px-6 py-2 rounded text-white font-medium text-sm transition-colors disabled:opacity-50">
          {isSaving ? 'Saving...' : 'Save Content'}
        </button>
        {saveStatus && <span className="text-green-500 text-sm font-medium animate-pulse">{saveStatus}</span>}
      </div>
    </form>
  )
}
