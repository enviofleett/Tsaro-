const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
async function go() {
  const { data } = await supabase.from('pages').select('slug')
  console.log(data)
}
go()
