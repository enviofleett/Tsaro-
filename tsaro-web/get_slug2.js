const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jjpmkukccvqkonvpxrgz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqcG1rdWtjY3Zxa29udnB4cmd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzMjY2MjUsImV4cCI6MjEwNDkwMjYyNX0.dJFSC_qxZax3kPneu2u5IEUnuryYIm4KusRZQqsT9Xk';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('pages').select('slug, title');
  if (error) console.error(error);
  else console.log(data);
}
check();
