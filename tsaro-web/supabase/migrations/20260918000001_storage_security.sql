-- 1. Create/Update the 'media' bucket (Public Website Assets)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Create/Update the 'cvs' bucket (Private, Restricted Uploads)
INSERT INTO storage.buckets (id, name, public, allowed_mime_types, file_size_limit) 
VALUES (
    'cvs', 
    'cvs', 
    false, 
    ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']::text[], 
    5242880 -- 5MB limit
)
ON CONFLICT (id) DO UPDATE SET 
    public = false, 
    allowed_mime_types = ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']::text[], 
    file_size_limit = 5242880;

-- 3. Ensure RLS is enabled on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 4. Clean up any previous policies on these buckets
DO $$ DECLARE
  r RECORD;
BEGIN
  FOR r IN (SELECT policyname FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects') LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', r.policyname);
  END LOOP;
END $$;

-- 5. Media Bucket Policies
-- Public can read media
CREATE POLICY "Public read media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
-- Admin can do all on media
CREATE POLICY "Admin all media" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'media' AND public.is_admin()) WITH CHECK (bucket_id = 'media' AND public.is_admin());

-- 6. CVs Bucket Policies
-- Public can only INSERT (upload) CVs. They cannot select/read them back.
CREATE POLICY "Public upload cvs" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'cvs');
-- Admin can do all on cvs (including reading/generating signed URLs)
CREATE POLICY "Admin all cvs" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'cvs' AND public.is_admin()) WITH CHECK (bucket_id = 'cvs' AND public.is_admin());
