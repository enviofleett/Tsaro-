import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export default async function SettingsManager() {
  const supabase = await createClient()

  const { data: settings } = await supabase.from('site_settings').select('*').order('key')

  async function createSetting(formData: FormData) {
    'use server'
    const supabase = await createClient()
    
    await supabase.from('site_settings').insert({
      key: formData.get('key'),
      description: formData.get('description'),
      value: JSON.parse(formData.get('value') as string || '{}')
    })
    
    revalidatePath('/admin/settings')
  }

  async function updateSetting(formData: FormData) {
    'use server'
    const supabase = await createClient()
    
    try {
      const parsedValue = JSON.parse(formData.get('value') as string)
      await supabase.from('site_settings').update({
        value: parsedValue,
        description: formData.get('description')
      }).eq('id', formData.get('id'))
      revalidatePath('/admin/settings')
    } catch(e) {
      console.error("Invalid JSON")
    }
  }

  async function deleteSetting(formData: FormData) {
    'use server'
    const supabase = await createClient()
    await supabase.from('site_settings').delete().eq('id', formData.get('id'))
    revalidatePath('/admin/settings')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Global Site Settings</h1>

      {/* Add Setting Form */}
      <div className="bg-charcoal border border-white/10 rounded-lg p-6 mb-8 capability-card">
        <h2 className="text-xl font-semibold mb-4 text-white">Add Global Setting</h2>
        <form action={createSetting} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-textLight mb-1">Setting Key (e.g. contact_info)</label>
              <input type="text" name="key" required className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white focus:outline-none focus:border-brandRed" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-textLight mb-1">Description</label>
              <input type="text" name="description" className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white focus:outline-none focus:border-brandRed" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Value (JSON format)</label>
            <textarea name="value" defaultValue='{"text": ""}' className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24 font-mono text-sm" />
          </div>
          <button type="submit" className="btn-primary-red px-6 py-2 rounded font-semibold">
            Add Setting
          </button>
        </form>
      </div>

      {/* List Settings */}
      <div className="space-y-6">
        {settings?.map(setting => {
          
          if (setting.key === 'footer') {
            const val = setting.value as any || {};
            return (
              <div key={setting.id} className="bg-charcoal border border-white/10 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-brandRed">Footer Settings</h3>
                  </div>
                </div>
                
                <form action={async (formData) => {
                  'use server'
                  const supabase = await createClient()
                  await supabase.from('site_settings').update({
                    value: {
                      description: formData.get('description'),
                      copyright: formData.get('copyright')
                    }
                  }).eq('id', setting.id)
                  revalidatePath('/admin/settings')
                }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-textLight mb-1">Company Description</label>
                    <textarea name="description" defaultValue={val.description} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-textLight mb-1">Copyright Text</label>
                    <input type="text" name="copyright" defaultValue={val.copyright} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" />
                  </div>
                  <button type="submit" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded text-white font-medium text-sm transition-colors">
                    Save Footer Settings
                  </button>
                </form>
              </div>
            )
          }

          if (setting.key === 'contact_info') {
            const val = setting.value as any || {};
            return (
              <div key={setting.id} className="bg-charcoal border border-white/10 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-brandRed">Contact Information</h3>
                  </div>
                </div>
                
                <form action={async (formData) => {
                  'use server'
                  const supabase = await createClient()
                  await supabase.from('site_settings').update({
                    value: {
                      email: formData.get('email'),
                      phone: formData.get('phone'),
                      address: formData.get('address')
                    }
                  }).eq('id', setting.id)
                  revalidatePath('/admin/settings')
                }} className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-textLight mb-1">Email Address</label>
                      <input type="email" name="email" defaultValue={val.email} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-textLight mb-1">Phone Number</label>
                      <input type="text" name="phone" defaultValue={val.phone} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-textLight mb-1">Office Address</label>
                    <textarea name="address" defaultValue={val.address} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" />
                  </div>
                  <button type="submit" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded text-white font-medium text-sm transition-colors">
                    Save Contact Info
                  </button>
                </form>
              </div>
            )
          }

          // Fallback raw JSON editor
          return (
            <div key={setting.id} className="bg-charcoal border border-white/10 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold text-brandRed">{setting.key}</h3>
                </div>
                <form action={deleteSetting}>
                  <input type="hidden" name="id" value={setting.id} />
                  <button type="submit" className="text-textMuted hover:text-brandRed text-sm underline">Delete Setting</button>
                </form>
              </div>
              
              <form action={updateSetting} className="space-y-4">
                <input type="hidden" name="id" value={setting.id} />
                
                <div>
                  <label className="block text-xs font-medium text-textLight mb-1">Description</label>
                  <input type="text" name="description" defaultValue={setting.description} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" />
                </div>

                <div>
                  <label className="block text-xs font-medium text-textLight mb-1">Value (JSON)</label>
                  <textarea 
                    name="value" 
                    defaultValue={JSON.stringify(setting.value, null, 2)} 
                    className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-32 font-mono text-sm" 
                  />
                </div>

                <button type="submit" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded text-white font-medium text-sm transition-colors">
                  Save Changes
                </button>
              </form>
            </div>
          )
        })}
      </div>

    </div>
  )
}
