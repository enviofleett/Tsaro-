'use client'

import { useState } from 'react'

export default function SectionForm({ section, updateAction }: { section: any, updateAction: (formData: FormData) => Promise<void> }) {
  const [content, setContent] = useState(section.content || {})
  const [isSaving, setIsSaving] = useState(false)

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
            <input type="text" name="image_url" value={content.image_url || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" placeholder="/hero-banner.png" />
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
              <h4 className="text-white font-semibold">Locations</h4>
              <button
                type="button"
                onClick={() => {
                  const locations = [...(content.locations || [])]
                  locations.push({ name: '', image: '', address: '' })
                  setContent({ ...content, locations })
                }}
                className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors"
              >
                + Add Location
              </button>
            </div>
            {(content.locations || []).map((_: any, i: number) => {
              const loc = content.locations?.[i] || {}
              return (
                <div key={i} className="bg-deepGray/50 p-4 rounded border border-white/5 space-y-3 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-brandRed font-bold">LOCATION {i + 1}</div>
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
                  <input type="text" placeholder="Location Name (e.g. Abuja, Nigeria)" value={loc.name || ''} onChange={(e) => handleArrayChange('locations', i, 'name', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                  <input type="text" placeholder="Image URL (e.g. /earth-nigeria.jpg)" value={loc.image || ''} onChange={(e) => handleArrayChange('locations', i, 'image', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                  <textarea placeholder="Full Address (shown when user clicks the card)" value={loc.address || ''} onChange={(e) => handleArrayChange('locations', i, 'address', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-20 text-sm" />
                </div>
              )
            })}
            {(!content.locations || content.locations.length === 0) && (
              <div className="text-center py-4 text-textMuted text-sm border border-white/5 border-dashed rounded">
                No locations yet. Click &quot;+ Add Location&quot; to get started.
              </div>
            )}
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
                  <input type="text" placeholder="Cover Image URL (e.g. /research-cover.jpg)" value={item.image || ''} onChange={(e) => handleArrayChange('insights', i, 'image', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
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

      {section.section_type === 'intelligence_briefs' && (
        <>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Headline</label>
            <input
              type="text"
              name="headline"
              value={content.headline || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white"
              placeholder="Intelligence Briefs & Policy Research"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Subheadline</label>
            <textarea
              name="subheadline"
              value={content.subheadline || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24"
              placeholder="Stay ahead of the shifting geopolitical and economic landscape..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Bullet 1</label>
            <input
              type="text"
              name="bullet_1"
              value={content.bullet_1 || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white"
              placeholder="Regional threat-actor profiling and asymmetric risk analysis."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Bullet 2</label>
            <input
              type="text"
              name="bullet_2"
              value={content.bullet_2 || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white"
              placeholder="Critical infrastructure resilience recommendations."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Bullet 3</label>
            <input
              type="text"
              name="bullet_3"
              value={content.bullet_3 || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white"
              placeholder="Direct executive delivery for verified institutional inquiries."
            />
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

      {/* Fallback for unconfigured section types */}
      {!['hero_banner', 'text_block', 'capability_grid', 'where_we_operate', 'research_insights', 'authority_bar', 'commitments', 'operational_differentiator', 'intelligence_briefs', 'institute'].includes(section.section_type) && (
        <div>
          <label className="block text-sm font-medium text-textLight mb-1">Raw JSON Content</label>
          <textarea name="content" value={JSON.stringify(content, null, 2)} onChange={(e) => {
            try { setContent(JSON.parse(e.target.value)) } catch {}
          }} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-48 font-mono text-xs" />
        </div>
      )}

      <button type="submit" disabled={isSaving} className="bg-brandRed hover:bg-red-700 px-6 py-2 rounded text-white font-medium text-sm transition-colors mt-4">
        {isSaving ? 'Saving...' : 'Save Content'}
      </button>
    </form>
  )
}
