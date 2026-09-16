const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function test() {
  const { data, error } = await supabase.auth.signUp({
    email: 'test_admin_2@tsaro.com',
    password: 'password1234'
  });
  console.log("Register error:", error ? error.message : "None");
  console.log("Session created?:", !!data?.session);
}
test();
