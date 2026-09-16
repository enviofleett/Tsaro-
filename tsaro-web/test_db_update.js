const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function main() {
  const { data, error } = await supabase.from('page_sections').update({ content: { test: 1 } }).eq('section_type', 'hero_banner');
  console.log('Update Error:', error);
  console.log('Update Data:', data);
}
main();
