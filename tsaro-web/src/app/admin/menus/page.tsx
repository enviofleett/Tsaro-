import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export default async function MenusManager() {
  const supabase = await createClient()

  const { data: menu } = await supabase.from('menus').select('*').eq('name', 'main_header').maybeSingle()
  let menuItems: any[] = []
  
  if (menu) {
    const { data: items } = await supabase.from('menu_items').select('*').eq('menu_id', menu.id).order('sort_order')
    if (items) menuItems = items
  }

  async function initializeMainMenu() {
    'use server'
    const supabase = await createClient()
    const { data: newMenu } = await supabase.from('menus').insert({ name: 'main_header', description: 'Primary top navigation' }).select().single()
    if (newMenu) {
      const defaults = [
        { menu_id: newMenu.id, label: 'What We Do', url: '/#capabilities', sort_order: 0 },
        { menu_id: newMenu.id, label: 'Who We Serve', url: '/#about', sort_order: 1 },
        { menu_id: newMenu.id, label: 'Insights', url: '/#intelligence', sort_order: 2 },
        { menu_id: newMenu.id, label: 'Institute', url: '/#institute', sort_order: 3 },
        { menu_id: newMenu.id, label: 'Careers', url: '/careers', sort_order: 4 },
      ]
      await supabase.from('menu_items').insert(defaults)
    }
    revalidatePath('/admin/menus')
  }

  async function createMenuItem(formData: FormData) {
    'use server'
    const supabase = await createClient()
    const parent_id = formData.get('parent_id') as string
    const { data: items } = await supabase.from('menu_items').select('sort_order').eq('menu_id', formData.get('menu_id'))
    const nextOrder = items ? items.length : 0

    await supabase.from('menu_items').insert({
      menu_id: formData.get('menu_id'),
      parent_id: parent_id ? parent_id : null,
      label: formData.get('label'),
      url: formData.get('url'),
      sort_order: nextOrder
    })
    revalidatePath('/admin/menus')
  }

  async function editMenuItem(formData: FormData) {
    'use server'
    const supabase = await createClient()
    await supabase.from('menu_items').update({
      label: formData.get('label'),
      url: formData.get('url')
    }).eq('id', formData.get('id'))
    revalidatePath('/admin/menus')
  }

  async function deleteMenuItem(formData: FormData) {
    'use server'
    const supabase = await createClient()
    await supabase.from('menu_items').delete().eq('id', formData.get('id'))
    revalidatePath('/admin/menus')
  }

  async function moveMenuItem(formData: FormData) {
    'use server'
    const supabase = await createClient()
    const id = formData.get('id') as string
    const direction = formData.get('direction') as string
    const menu_id = formData.get('menu_id') as string

    const { data: item } = await supabase.from('menu_items').select('parent_id').eq('id', id).single()
    const parent_id = item?.parent_id

    let query = supabase.from('menu_items').select('*').eq('menu_id', menu_id).order('sort_order')
    if (parent_id) query = query.eq('parent_id', parent_id)
    else query = query.is('parent_id', null)
    
    const { data: items } = await query
    if (!items) return

    const currentIndex = items.findIndex(i => i.id === id)
    if (currentIndex === -1) return

    const swapIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (swapIndex >= 0 && swapIndex < items.length) {
      const current = items[currentIndex]
      const swap = items[swapIndex]
      await supabase.from('menu_items').update({ sort_order: swap.sort_order }).eq('id', current.id)
      await supabase.from('menu_items').update({ sort_order: current.sort_order }).eq('id', swap.id)
    }
    revalidatePath('/admin/menus')
  }

  const topLevelItems = menuItems.filter(i => !i.parent_id)

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-bold text-white mb-8">Navigation Menus</h1>

      {!menu ? (
        <div className="bg-charcoal border border-white/10 rounded-lg p-12 text-center capability-card">
          <form action={initializeMainMenu}>
            <button type="submit" className="btn-primary-red px-8 py-3 rounded-md font-semibold tracking-wide uppercase text-sm">
              Unlock Menu Editor
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-charcoal border border-white/10 rounded-lg overflow-hidden shadow-2xl">
          <div className="bg-deepGray/50 border-b border-white/10 p-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">Main Top Navigation</h2>
              <p className="text-textMuted text-sm mt-1">Click any label or URL to edit it, then click Save.</p>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4 mb-8">
              {topLevelItems.map((item, idx) => {
                const subItems = menuItems.filter(sub => sub.parent_id === item.id)
                return (
                  <div key={item.id} className="bg-deepGray/40 border border-white/5 rounded-lg overflow-hidden">
                    {/* Top Level Item */}
                    <div className="flex items-center justify-between p-4 group hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-6 flex-1">
                        <div className="flex flex-col gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                          <form action={moveMenuItem}>
                            <input type="hidden" name="id" value={item.id} />
                            <input type="hidden" name="menu_id" value={menu.id} />
                            <input type="hidden" name="direction" value="up" />
                            <button type="submit" disabled={idx === 0} className="hover:text-white disabled:opacity-30 -mb-1 block"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7"></path></svg></button>
                          </form>
                          <form action={moveMenuItem}>
                            <input type="hidden" name="id" value={item.id} />
                            <input type="hidden" name="menu_id" value={menu.id} />
                            <input type="hidden" name="direction" value="down" />
                            <button type="submit" disabled={idx === topLevelItems.length - 1} className="hover:text-white disabled:opacity-30 block"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg></button>
                          </form>
                        </div>
                        
                        <form action={editMenuItem} className="flex-1 flex gap-4 items-center">
                          <input type="hidden" name="id" value={item.id} />
                          <input type="text" name="label" defaultValue={item.label} className="font-semibold text-white text-[15px] bg-transparent border border-transparent focus:border-white/20 focus:bg-black/20 focus:outline-none rounded px-2 py-1 w-1/3 hover:bg-black/10 transition-colors" />
                          <input type="text" name="url" defaultValue={item.url} className="text-textMuted text-xs font-mono bg-transparent border border-transparent focus:border-white/20 focus:bg-black/20 focus:outline-none rounded px-2 py-1 w-1/2 hover:bg-black/10 transition-colors" />
                          <button type="submit" className="text-xs font-semibold px-3 py-1.5 bg-white/10 hover:bg-white text-white hover:text-black rounded opacity-0 group-hover:opacity-100 transition-all focus:opacity-100">Save</button>
                        </form>
                      </div>

                      <form action={deleteMenuItem}>
                        <input type="hidden" name="id" value={item.id} />
                        <button type="submit" className="text-brandRed hover:text-red-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 bg-red-500/10 rounded ml-4">Remove</button>
                      </form>
                    </div>

                    {/* Sub Items */}
                    {subItems.length > 0 && (
                      <div className="pl-14 pr-4 pb-4 space-y-2">
                        {subItems.map((sub, sIdx) => (
                          <div key={sub.id} className="flex items-center justify-between bg-black/20 border border-white/5 p-3 rounded group/sub hover:border-white/20 transition-colors">
                            <div className="flex items-center gap-4 flex-1">
                              <div className="flex flex-col gap-1 opacity-10 group-hover/sub:opacity-100 transition-opacity">
                                <form action={moveMenuItem} className="h-3 overflow-hidden">
                                  <input type="hidden" name="id" value={sub.id} />
                                  <input type="hidden" name="menu_id" value={menu.id} />
                                  <input type="hidden" name="direction" value="up" />
                                  <button type="submit" disabled={sIdx === 0} className="hover:text-white disabled:opacity-30"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7"></path></svg></button>
                                </form>
                                <form action={moveMenuItem} className="h-3 overflow-hidden mt-1">
                                  <input type="hidden" name="id" value={sub.id} />
                                  <input type="hidden" name="menu_id" value={menu.id} />
                                  <input type="hidden" name="direction" value="down" />
                                  <button type="submit" disabled={sIdx === subItems.length - 1} className="hover:text-white disabled:opacity-30"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg></button>
                                </form>
                              </div>

                              <div className="flex items-center gap-2">
                                <svg className="w-3 h-3 text-textMuted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                              </div>
                              
                              <form action={editMenuItem} className="flex-1 flex gap-3 items-center">
                                <input type="hidden" name="id" value={sub.id} />
                                <input type="text" name="label" defaultValue={sub.label} className="font-medium text-white/90 text-sm bg-transparent border border-transparent focus:border-white/20 focus:bg-black/40 focus:outline-none rounded px-2 py-1 w-1/3 hover:bg-black/20 transition-colors" />
                                <input type="text" name="url" defaultValue={sub.url} className="text-textMuted text-[10px] font-mono bg-transparent border border-transparent focus:border-white/20 focus:bg-black/40 focus:outline-none rounded px-2 py-1 w-1/2 hover:bg-black/20 transition-colors" />
                                <button type="submit" className="text-xs font-semibold px-2 py-1 bg-white/10 hover:bg-white text-white hover:text-black rounded opacity-0 group-hover/sub:opacity-100 transition-all focus:opacity-100">Save</button>
                              </form>
                            </div>

                            <form action={deleteMenuItem}>
                              <input type="hidden" name="id" value={sub.id} />
                              <button type="submit" className="text-brandRed text-xs font-medium opacity-0 group-hover/sub:opacity-100 transition-opacity ml-4">Delete</button>
                            </form>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Add New Link Form */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-5">
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Add New Link</h4>
              <form action={createMenuItem} className="flex flex-col sm:flex-row gap-4 items-end">
                <input type="hidden" name="menu_id" value={menu.id} />
                
                <div className="flex-1 w-full">
                  <label className="block text-xs font-medium text-textLight mb-1.5">Link Name</label>
                  <input type="text" name="label" required className="w-full px-4 py-2.5 bg-deepGray border border-white/10 rounded text-white text-sm focus:border-brandRed outline-none" />
                </div>
                
                <div className="flex-1 w-full">
                  <label className="block text-xs font-medium text-textLight mb-1.5">URL</label>
                  <input type="text" name="url" required className="w-full px-4 py-2.5 bg-deepGray border border-white/10 rounded text-white text-sm focus:border-brandRed outline-none" />
                </div>

                <div className="flex-1 w-full max-w-[200px]">
                  <label className="block text-xs font-medium text-textLight mb-1.5">Attach Dropdown To (Optional)</label>
                  <select name="parent_id" className="w-full px-4 py-2.5 bg-deepGray border border-white/10 rounded text-white text-sm focus:border-brandRed outline-none">
                    <option value="">-- No Dropdown (Top Level) --</option>
                    {topLevelItems.map(item => (
                      <option key={item.id} value={item.id}>{item.label}</option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="bg-white text-black hover:bg-gray-200 px-6 py-2.5 rounded font-semibold text-sm transition-colors">
                  + Add
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
