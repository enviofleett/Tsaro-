const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
async function run() {
  const { data: page } = await supabase.from('pages').select('id, title').limit(1).single();
  if (!page) return console.log("No page");
  console.log("Updating page", page.title);
  const { error } = await supabase.from('pages').update({ is_published: true }).eq('id', page.id);
  console.log("Update error:", error);
}
run();
