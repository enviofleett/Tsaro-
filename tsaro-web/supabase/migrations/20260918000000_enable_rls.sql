-- Enable RLS on all tables
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE academy_bookings ENABLE ROW LEVEL SECURITY;

-- Helper Function: Check if user is admin
CREATE OR REPLACE FUNCTION is_admin() RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. pages
-- Public can read published, unarchived pages. Admins can do everything.
CREATE POLICY "Public read published pages" ON pages FOR SELECT USING (is_published = true AND is_archived = false);
CREATE POLICY "Admin all on pages" ON pages FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- 2. page_sections
-- Public can read sections if parent page is published. Admins can do everything.
CREATE POLICY "Public read published sections" ON page_sections FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM pages 
    WHERE pages.id = page_sections.page_id 
    AND pages.is_published = true 
    AND pages.is_archived = false
  )
);
CREATE POLICY "Admin all on page_sections" ON page_sections FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- 3. page_templates
-- Internal admin structure. No public access.
CREATE POLICY "Admin all on page_templates" ON page_templates FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- 4. menus & menu_items
-- Public can read all menus and items (needed for Navbar/Footer). Admins can do everything.
CREATE POLICY "Public read menus" ON menus FOR SELECT USING (true);
CREATE POLICY "Admin all on menus" ON menus FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Public read menu_items" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Admin all on menu_items" ON menu_items FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- 5. site_settings
-- Public can read settings. Admins can do everything.
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admin all on site_settings" ON site_settings FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- 6. user_roles
-- Users can read their own role. Admins can do everything.
CREATE POLICY "Users read own role" ON user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admin all on user_roles" ON user_roles FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- 7. career_applications
-- Public can insert. Admins can do everything.
CREATE POLICY "Public insert career_applications" ON career_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin all on career_applications" ON career_applications FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- 8. contact_messages
-- Public can insert. Admins can do everything.
CREATE POLICY "Public insert contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin all on contact_messages" ON contact_messages FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- 9. academy_bookings
-- Public can insert. Admins can do everything.
CREATE POLICY "Public insert academy_bookings" ON academy_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin all on academy_bookings" ON academy_bookings FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

