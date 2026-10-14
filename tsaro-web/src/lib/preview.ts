import crypto from 'crypto';

export function generatePreviewToken(pageId: string) {
  // Use a dedicated PREVIEW_SECRET, or fallback to the service role key.
  // If neither exists (e.g. local development), fallback to the ANON_KEY to prevent crashes,
  // since the ANON_KEY is at least a stable environment string.
  const secret = process.env.PREVIEW_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!secret) {
    throw new Error('A secret is required to generate preview tokens. Please set PREVIEW_SECRET in your environment variables.');
  }

  return crypto.createHmac('sha256', secret).update(pageId).digest('hex');
}
