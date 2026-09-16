const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function main() {
  const { data, error } = await supabase.from('page_sections').select('*');
  console.log('Error:', error);
  console.log('Rows:', data ? data.length : 0);
}
main();
