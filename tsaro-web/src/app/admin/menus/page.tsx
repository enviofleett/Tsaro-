import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export default async function MenusManager() {
  const supabase = await createClient()

  // Fetch menus
  const { data: menus } = await supabase.from('menus').select('*').order('created_at')
  
  // Fetch menu items for all menus
  const { data: menuItems } = await supabase.from('menu_items').select('*').order('sort_order')

  async function createMenu(formData: FormData) {
    'use server'
    const supabase = await createClient()
    await supabase.from('menus').insert({ 
      name: formData.get('name'), 
      description: formData.get('description') 
    })
    revalidatePath('/admin/menus')
  }

  async function createMenuItem(formData: FormData) {
    'use server'
    const supabase = await createClient()
    const parent_id = formData.get('parent_id') as string
    
    await supabase.from('menu_items').insert({
      menu_id: formData.get('menu_id'),
      parent_id: parent_id ? parent_id : null,
      label: formData.get('label'),
      url: formData.get('url'),
      sort_order: parseInt(formData.get('sort_order') as string) || 0
    })
    revalidatePath('/admin/menus')
  }

  async function deleteMenuItem(formData: FormData) {
    'use server'
    const supabase = await createClient()
    await supabase.from('menu_items').delete().eq('id', formData.get('id'))
    revalidatePath('/admin/menus')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Navigation Menus</h1>

      {/* Create Menu Form */}
      <div className="bg-charcoal border border-white/10 rounded-lg p-6 mb-8 capability-card">
        <h2 className="text-xl font-semibold mb-4 text-white">Create New Menu Location</h2>
        <form action={createMenu} className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-textLight mb-1">Menu Name Identifier</label>
            <input type="text" name="name" required placeholder="e.g. main_header" className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white focus:outline-none focus:border-brandRed" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-textLight mb-1">Description</label>
            <input type="text" name="description" placeholder="e.g. Primary top navigation" className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white focus:outline-none focus:border-brandRed" />
          </div>
          <button type="submit" className="btn-primary-red px-6 py-2 rounded font-semibold h-10">
            Create Location
          </button>
        </form>
      </div>

      {/* Display Menus & their items */}
      <div className="space-y-8">
        {menus?.map(menu => {
          // Get items for this menu
          const items = menuItems?.filter(i => i.menu_id === menu.id) || []
          // Group by parent to find top level vs submenus
          const topLevel = items.filter(i => !i.parent_id)

          return (
            <div key={menu.id} className="bg-charcoal border border-white/10 rounded-lg p-6">
              <div className="border-b border-white/10 pb-4 mb-4">
                <h3 className="text-xl font-bold text-white">{menu.name}</h3>
                <p className="text-textMuted text-sm">{menu.description}</p>
              </div>

              {/* Add Menu Item */}
              <div className="mb-6 bg-deepGray/50 p-4 rounded border border-white/5">
                <h4 className="text-sm font-semibold text-white mb-3">Add Link to {menu.name}</h4>
                <form action={createMenuItem} className="flex flex-wrap gap-3 items-end">
                  <input type="hidden" name="menu_id" value={menu.id} />
                  
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-xs text-textLight mb-1">Label</label>
                    <input type="text" name="label" required placeholder="e.g. About Us" className="w-full px-3 py-1.5 bg-deepGray border border-white/10 rounded text-white text-sm" />
                  </div>
                  
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-xs text-textLight mb-1">URL / Link</label>
                    <input type="text" name="url" required placeholder="/about" className="w-full px-3 py-1.5 bg-deepGray border border-white/10 rounded text-white text-sm" />
                  </div>

                  <div className="w-32">
                    <label className="block text-xs text-textLight mb-1">Parent (Dropdown)</label>
                    <select name="parent_id" className="w-full px-3 py-1.5 bg-deepGray border border-white/10 rounded text-white text-sm">
                      <option value="">None (Top Level)</option>
                      {items.map(i => (
                        <option key={i.id} value={i.id}>{i.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="w-20">
                    <label className="block text-xs text-textLight mb-1">Order</label>
                    <input type="number" name="sort_order" defaultValue="0" className="w-full px-3 py-1.5 bg-deepGray border border-white/10 rounded text-white text-sm" />
                  </div>

                  <button type="submit" className="bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded text-white font-medium text-sm transition-colors h-9">
                    Add
                  </button>
                </form>
              </div>

              {/* Tree view of items */}
              <div>
                <h4 className="text-sm font-semibold text-textLight mb-3 uppercase tracking-wider">Current Links</h4>
                {topLevel.length === 0 && <p className="text-textMuted text-sm">No links added yet.</p>}
                
                <ul className="space-y-2">
                  {topLevel.map(item => (
                    <li key={item.id} className="bg-deepGray border border-white/5 rounded p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium text-white">{item.label}</span>
                          <span className="text-textMuted text-xs ml-3">{item.url}</span>
                        </div>
                        <form action={deleteMenuItem}>
                          <input type="hidden" name="id" value={item.id} />
                          <button type="submit" className="text-brandRed hover:text-brandRedHover text-xs underline">Delete</button>
                        </form>
                      </div>
                      
                      {/* Submenus */}
                      {items.filter(sub => sub.parent_id === item.id).length > 0 && (
                        <ul className="mt-3 pl-4 border-l-2 border-white/10 space-y-2">
                          {items.filter(sub => sub.parent_id === item.id).map(subItem => (
                            <li key={subItem.id} className="flex justify-between items-center bg-white/5 rounded p-2">
                              <div>
                                <span className="font-medium text-white text-sm">{subItem.label}</span>
                                <span className="text-textMuted text-xs ml-3">{subItem.url}</span>
                              </div>
                              <form action={deleteMenuItem}>
                                <input type="hidden" name="id" value={subItem.id} />
                                <button type="submit" className="text-brandRed hover:text-brandRedHover text-xs underline">Delete</button>
                              </form>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}
