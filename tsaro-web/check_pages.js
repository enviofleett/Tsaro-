const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkPages() {
  console.log('Fetching pages from Supabase...')
  const { data: pages, error } = await supabase.from('pages').select('slug, title, is_published')
  
  if (error) {
    console.error('Error fetching pages:', error.message)
    return
  }

  if (pages.length === 0) {
    console.log('No pages found in the database.')
  } else {
    console.table(pages)
  }
}

checkPages()
