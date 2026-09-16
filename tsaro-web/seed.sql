-- Seed the Pages
insert into public.pages (slug, title, is_published) values 
('home', 'Home', true),
('about', 'About Us', true),
('academy', 'Tsaro Academy', true),
('clientele', 'Our Clientele', true),
('products-services', 'Products & Services', true);

-- Insert Home sections
with p as (select id from public.pages where slug = 'home' limit 1)
insert into public.page_sections (page_id, section_type, sort_order, content) values
((select id from p), 'hero_banner', 1, '{}'::jsonb),
((select id from p), 'authority_bar', 2, '{}'::jsonb),
((select id from p), 'capability_grid', 3, '{}'::jsonb),
((select id from p), 'where_we_operate', 4, '{}'::jsonb),
((select id from p), 'research_insights', 5, '{}'::jsonb),
((select id from p), 'operational_differentiator', 6, '{}'::jsonb),
((select id from p), 'commitments', 7, '{}'::jsonb),
((select id from p), 'institute', 8, '{}'::jsonb),
((select id from p), 'intelligence_briefs', 9, '{}'::jsonb);

-- Insert About sections
with p as (select id from public.pages where slug = 'about' limit 1)
insert into public.page_sections (page_id, section_type, sort_order, content) values
((select id from p), 'about_hero', 1, '{}'::jsonb),
((select id from p), 'split_narrative', 2, '{}'::jsonb),
((select id from p), 'core_values', 3, '{}'::jsonb);

-- Insert Clientele sections
with p as (select id from public.pages where slug = 'clientele' limit 1)
insert into public.page_sections (page_id, section_type, sort_order, content) values
((select id from p), 'clientele_hero', 1, '{}'::jsonb),
((select id from p), 'client_sectors', 2, '{}'::jsonb),
((select id from p), 'pull_quote', 3, '{}'::jsonb),
((select id from p), 'cta_banner', 4, '{}'::jsonb);

-- Insert Academy sections
with p as (select id from public.pages where slug = 'academy' limit 1)
insert into public.page_sections (page_id, section_type, sort_order, content) values
((select id from p), 'academy_hero', 1, '{}'::jsonb),
((select id from p), 'academy_flagship', 2, '{}'::jsonb),
((select id from p), 'academy_catalog', 3, '{}'::jsonb),
((select id from p), 'academy_methodology', 4, '{}'::jsonb);

-- Insert Products Services sections
with p as (select id from public.pages where slug = 'products-services' limit 1)
insert into public.page_sections (page_id, section_type, sort_order, content) values
((select id from p), 'hero_banner', 1, '{"headline": "Tactical Hardware & <span class=\"text-brandRed\">Strategic Services</span>", "subheadline": "End-to-end security procurement and risk advisory for complex operational environments."}'::jsonb),
((select id from p), 'capability_grid', 2, '{}'::jsonb),
((select id from p), 'cta_banner', 3, '{}'::jsonb);
