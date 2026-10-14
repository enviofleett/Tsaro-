'use server'
import { requireAdmin } from '@/lib/auth/auth';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function deletePageAction(id: string) {
  await requireAdmin();
  const supabase = await createClient();
  // Due to our ON DELETE CASCADE constraint, deleting the page automatically purges sections and menu items.
  await supabase.from('pages').delete().eq('id', id);
  revalidatePath('/admin/pages');
  revalidatePath('/admin/menus'); // Menu might have changed
  return { success: true };
}
