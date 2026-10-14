-- Create page_templates table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.page_templates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    sections JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for page_templates
ALTER TABLE public.page_templates ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to ensure idempotency)
DO $$ DECLARE
  r RECORD;
BEGIN
  FOR r IN (SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = 'page_templates') LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.page_templates', r.policyname);
  END LOOP;
END $$;

-- Admin can manage templates, public can read
CREATE POLICY "Public read templates" ON public.page_templates FOR SELECT USING (true);
CREATE POLICY "Admin all templates" ON public.page_templates FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Add new columns to the pages table if they don't exist
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'pages' AND column_name = 'is_archived') THEN
        ALTER TABLE public.pages ADD COLUMN is_archived BOOLEAN DEFAULT false;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'pages' AND column_name = 'canonical_url') THEN
        ALTER TABLE public.pages ADD COLUMN canonical_url TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'pages' AND column_name = 'social_image') THEN
        ALTER TABLE public.pages ADD COLUMN social_image TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'pages' AND column_name = 'no_index') THEN
        ALTER TABLE public.pages ADD COLUMN no_index BOOLEAN DEFAULT false;
    END IF;
END $$;
