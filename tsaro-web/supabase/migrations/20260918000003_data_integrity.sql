-- 1. Ensure pages have unique slugs
ALTER TABLE public.pages DROP CONSTRAINT IF EXISTS pages_slug_key;
ALTER TABLE public.pages ADD CONSTRAINT pages_slug_key UNIQUE (slug);

-- 2. Ensure page_sections cascade on page deletion
DO $$
DECLARE
    r record;
BEGIN
    FOR r IN (
        SELECT conname
        FROM pg_constraint
        WHERE conrelid = 'public.page_sections'::regclass
          AND contype = 'f'
          AND confrelid = 'public.pages'::regclass
    ) LOOP
        EXECUTE 'ALTER TABLE public.page_sections DROP CONSTRAINT ' || quote_ident(r.conname);
    END LOOP;
END$$;

ALTER TABLE public.page_sections 
ADD CONSTRAINT fk_page_sections_page_id 
FOREIGN KEY (page_id) REFERENCES public.pages (id) ON DELETE CASCADE;

-- 3. Ensure menu_items cascade on parent deletion or menu deletion
DO $$
DECLARE
    r record;
BEGIN
    FOR r IN (
        SELECT conname
        FROM pg_constraint
        WHERE conrelid = 'public.menu_items'::regclass
          AND contype = 'f'
          AND confrelid = 'public.menus'::regclass
    ) LOOP
        EXECUTE 'ALTER TABLE public.menu_items DROP CONSTRAINT ' || quote_ident(r.conname);
    END LOOP;
    
    FOR r IN (
        SELECT conname
        FROM pg_constraint
        WHERE conrelid = 'public.menu_items'::regclass
          AND contype = 'f'
          AND confrelid = 'public.menu_items'::regclass
    ) LOOP
        EXECUTE 'ALTER TABLE public.menu_items DROP CONSTRAINT ' || quote_ident(r.conname);
    END LOOP;

    FOR r IN (
        SELECT conname
        FROM pg_constraint
        WHERE conrelid = 'public.menu_items'::regclass
          AND contype = 'f'
          AND confrelid = 'public.pages'::regclass
    ) LOOP
        EXECUTE 'ALTER TABLE public.menu_items DROP CONSTRAINT ' || quote_ident(r.conname);
    END LOOP;
END$$;

ALTER TABLE public.menu_items 
ADD CONSTRAINT fk_menu_items_menu_id 
FOREIGN KEY (menu_id) REFERENCES public.menus (id) ON DELETE CASCADE;

ALTER TABLE public.menu_items 
ADD CONSTRAINT fk_menu_items_parent_id 
FOREIGN KEY (parent_id) REFERENCES public.menu_items (id) ON DELETE CASCADE;

ALTER TABLE public.menu_items 
ADD CONSTRAINT fk_menu_items_page_id 
FOREIGN KEY (page_id) REFERENCES public.pages (id) ON DELETE CASCADE;

