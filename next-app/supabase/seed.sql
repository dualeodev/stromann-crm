-- Seed data applied by `supabase db reset` after migrations run.
-- Idempotent: uses fixed UUIDs so re-runs don't duplicate.

-- Default super admin -------------------------------------------------------
-- username: admin   email: admin@stromann.local   password: Admin@12345
-- Change the password immediately after first login in any non-local env.
insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at,
  confirmation_token, email_change, email_change_token_new, recovery_token
) values (
  '00000000-0000-0000-0000-000000000000',
  'a0000000-0000-0000-0000-000000000001',
  'authenticated', 'authenticated',
  'admin@stromann.local',
  crypt('Admin@12345', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(), now(),
  '', '', '', ''
)
on conflict (id) do nothing;

insert into public.admin_users (id, username, full_name, role, is_active)
values (
  'a0000000-0000-0000-0000-000000000001',
  'admin',
  'Super Admin',
  'super_admin',
  true
)
on conflict (id) do nothing;

insert into public.banners (id, title, description, cta_label, cta_href, position, sort_order, starts_at, ends_at, is_enabled, lang_vn, lang_en, lang_cn)
values
  ('11111111-1111-1111-1111-111111111111',
   'AGITAN® thế hệ mới — đã có hàng tại VN',
   'Defoamer hiệu suất cao, không silicone, phù hợp cho mọi hệ sơn nước',
   'Khám phá sản phẩm', '/products/agitan-120',
   'hero_home', 1,
   '2026-04-01 00:00:00+07', '2026-06-30 23:59:00+07',
   true, true, true, false)
on conflict (id) do nothing;

-- ============================================================================
-- Catalog seed (categories, product_industries, technical_issues, products)
-- UUID prefixes:  c1xx = top-level categories,  c2xx = child categories,
--                 i1xx = product_industries,    t1xx = technical_issues,
--                 p1xx = products.
-- ============================================================================

-- Categories (matches "DANH MỤC SẢN PHẨM" sidebar mock) ---------------------
insert into public.categories (id, slug, name, description, sort_order, show_in_mega_menu, lang_vn, lang_en, lang_cn) values
  ('c1000000-0000-0000-0000-000000000001', 'hoa-chat-nganh-son',     'Hoá chất ngành sơn',   'Phụ gia cho sơn nước, sơn dầu, sơn công nghiệp.', 1, true, true, false, false),
  ('c1000000-0000-0000-0000-000000000002', 'hoa-chat-nganh-nhua',    'Hoá chất ngành nhựa',  'Phụ gia gia công nhựa và masterbatch.',           2, true, true, false, false),
  ('c1000000-0000-0000-0000-000000000003', 'hoa-chat-nganh-muc-in',  'Hoá chất ngành mực in','Phụ gia cho mực in flexo, gravure, offset.',      3, true, true, false, false),
  ('c1000000-0000-0000-0000-000000000004', 'phu-gia-thuc-pham',      'Phụ gia thực phẩm',    'Nhóm phụ gia an toàn cho thực phẩm.',             4, true, true, false, false),
  ('c1000000-0000-0000-0000-000000000005', 'san-pham-khac',          'Sản phẩm khác',        'Các nhóm phụ gia chuyên biệt khác.',              5, true, true, false, false)
on conflict (id) do nothing;

-- product_industries --------------------------------------------------------
insert into public.product_industries (id, slug, name, code, hex_color, show_on_homepage, show_in_mega_menu, sort_order, lang_vn, lang_en, lang_cn) values
  ('e1000000-0000-0000-0000-000000000001', 'son-coatings',                  'Sơn (Coatings)',                                  'S',  '#C8332D', true,  true, 1, true, true, false),
  ('e1000000-0000-0000-0000-000000000002', 'cai-thien-do-phan-tan',         'Cải thiện độ phân tán, độ trải và độ bền màng sơn','S2', '#A03028', false, true, 2, true, false, false),
  ('e1000000-0000-0000-0000-000000000003', 'muc-in-printing-inks',          'Mực in (Printing Inks)',                          'M',  '#1B3A8E', true,  true, 3, true, true, false),
  ('e1000000-0000-0000-0000-000000000004', 'tang-do-bong-do-min',           'Tăng độ bóng, độ mịn và chất lượng in',           'M2', '#0F2A6D', false, true, 4, true, false, false),
  ('e1000000-0000-0000-0000-000000000005', 'nhua-masterbatch',              'Nhựa / Masterbatch',                              'N',  '#E8B22F', true,  true, 5, true, true, false),
  ('e1000000-0000-0000-0000-000000000006', 'toi-uu-gia-cong-on-dinh-mau',   'Tối ưu gia công và độ ổn định màu',               'N2', '#D9A11F', false, true, 6, true, false, false)
on conflict (id) do nothing;

-- technical_issues ----------------------------------------------------------
insert into public.technical_issues (id, slug, name, description, show_in_mega_menu, sort_order, lang_vn, lang_en, lang_cn) values
  ('f1000000-0000-0000-0000-000000000001', 'bot',      'Bọt (Foam)',          'Khử bọt và chống tái tạo bọt trong quá trình gia công.',     true, 1, true, true, false),
  ('f1000000-0000-0000-0000-000000000002', 'phan-tan', 'Phân tán (Dispersion)','Phân tán pigment, hạ nhớt và ổn định màu.',                  true, 2, true, true, false),
  ('f1000000-0000-0000-0000-000000000003', 'do-nhot',  'Độ nhớt (Rheology)',  'Điều chỉnh lưu biến và chống chảy xệ.',                       true, 3, true, true, false),
  ('f1000000-0000-0000-0000-000000000004', 'be-mat',   'Bề mặt (Surface)',    'Cải thiện độ trải, chống mắt cá, độ bóng và độ mịn bề mặt.', true, 4, true, true, false)
on conflict (id) do nothing;

-- products ------------------------------------------------------------------
insert into public.products (id, slug, name, brand, short_description, status, is_featured, sort_order, lang_vn, lang_en, lang_cn) values
  ('d1000000-0000-0000-0000-000000000001', 'agitan-120',      'AGITAN® 120',         'MÜNZING', 'Defoamer hiệu quả cao cho sơn nước, mực in gốc nước.', 'published', true,  1, true, true, false),
  ('d1000000-0000-0000-0000-000000000002', 'edaplan-470',     'EDAPLAN® 470',        'MÜNZING', 'Dispersant hiệu quả cao cho sơn nước, mực in.',        'published', true,  2, true, true, true),
  ('d1000000-0000-0000-0000-000000000003', 'metolat-358',     'METOLAT® 358',        'MÜNZING', 'Wetting agent đa năng cho sơn nước.',                   'published', true,  3, true, true, false),
  ('d1000000-0000-0000-0000-000000000004', 'hydropalat-3475', 'HYDROPALAT® WE 3475', 'MÜNZING', 'Rheology modifier cho sơn nước, mực in.',               'published', true,  4, true, false, false),
  ('d1000000-0000-0000-0000-000000000005', 'agitan-282',      'AGITAN® 282',         'MÜNZING', 'Defoamer mạnh cho sơn epoxy 2K hệ dung môi.',           'draft',     false, 5, true, false, false),
  ('d1000000-0000-0000-0000-000000000006', 'agitan-df-6863',  'AGITAN® DF 6863',     'MÜNZING', 'Defoamer silicon-free cho sơn xây dựng.',               'published', false, 6, true, false, false),
  ('d1000000-0000-0000-0000-000000000007', 'agitan-305',      'AGITAN® 305',         'MÜNZING', 'Defoamer cho mực in flexo gốc nước.',                   'published', false, 7, true, false, false),
  ('d1000000-0000-0000-0000-000000000008', 'agitan-731',      'AGITAN® 731',         'MÜNZING', 'Defoamer cho sơn industrial 1K.',                       'published', false, 8, true, false, false),
  ('d1000000-0000-0000-0000-000000000009', 'edaplan-480',     'EDAPLAN® 480',        'MÜNZING', 'Dispersant cho mực in flexo gốc nước.',                 'published', false, 9, true, false, false),
  ('d1000000-0000-0000-0000-00000000000a', 'metolat-388',     'METOLAT® 388',        'MÜNZING', 'Leveling agent cho sơn UV, sơn 2K PU.',                 'published', false, 10, true, true, false),
  ('d1000000-0000-0000-0000-00000000000b', 'metolat-we-4150', 'METOLAT® WE 4150',    'MÜNZING', 'Wax additive cho sơn lót, sơn dầu.',                    'scheduled', false, 11, true, false, false),
  ('d1000000-0000-0000-0000-00000000000c', 'tafigel-pur-80',  'TAFIGEL® PUR 80',     'MÜNZING', 'PU rheology modifier cho sơn nước cao cấp.',            'published', false, 12, true, true, false)
on conflict (id) do nothing;

-- product_categories --------------------------------------------------------
insert into public.product_categories (product_id, category_id) values
  -- Paint products → "Hoá chất ngành sơn"
  ('d1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001'),
  ('d1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001'),
  ('d1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000001'),
  ('d1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000001'),
  ('d1000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000001'),
  ('d1000000-0000-0000-0000-000000000006', 'c1000000-0000-0000-0000-000000000001'),
  ('d1000000-0000-0000-0000-000000000008', 'c1000000-0000-0000-0000-000000000001'),
  ('d1000000-0000-0000-0000-00000000000a', 'c1000000-0000-0000-0000-000000000001'),
  ('d1000000-0000-0000-0000-00000000000c', 'c1000000-0000-0000-0000-000000000001'),
  -- Ink products → "Hoá chất ngành mực in"
  ('d1000000-0000-0000-0000-000000000007', 'c1000000-0000-0000-0000-000000000003'),
  ('d1000000-0000-0000-0000-000000000009', 'c1000000-0000-0000-0000-000000000003'),
  -- Plastic products → "Hoá chất ngành nhựa"
  ('d1000000-0000-0000-0000-00000000000b', 'c1000000-0000-0000-0000-000000000002')
on conflict do nothing;

-- product_industry_links ----------------------------------------------------
insert into public.product_industry_links (product_id, product_industry_id) values
  ('d1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000001'), -- AGITAN 120 → Sơn (Coatings)
  ('d1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000003'), -- AGITAN 120 → Mực in (Printing Inks)
  ('d1000000-0000-0000-0000-000000000002', 'e1000000-0000-0000-0000-000000000001'), -- EDAPLAN 470 → Sơn (Coatings)
  ('d1000000-0000-0000-0000-000000000002', 'e1000000-0000-0000-0000-000000000003'), -- EDAPLAN 470 → Mực in (Printing Inks)
  ('d1000000-0000-0000-0000-000000000003', 'e1000000-0000-0000-0000-000000000001'), -- METOLAT 358 → Sơn (Coatings)
  ('d1000000-0000-0000-0000-000000000004', 'e1000000-0000-0000-0000-000000000001'), -- HYDROPALAT → Sơn (Coatings)
  ('d1000000-0000-0000-0000-000000000004', 'e1000000-0000-0000-0000-000000000003'), -- HYDROPALAT → Mực in (Printing Inks)
  ('d1000000-0000-0000-0000-000000000005', 'e1000000-0000-0000-0000-000000000001'), -- AGITAN 282 → Sơn (Coatings)
  ('d1000000-0000-0000-0000-000000000006', 'e1000000-0000-0000-0000-000000000001'), -- AGITAN DF 6863 → Sơn (Coatings)
  ('d1000000-0000-0000-0000-000000000007', 'e1000000-0000-0000-0000-000000000003'), -- AGITAN 305 → Mực in (Printing Inks)
  ('d1000000-0000-0000-0000-000000000008', 'e1000000-0000-0000-0000-000000000001'), -- AGITAN 731 → Sơn (Coatings)
  ('d1000000-0000-0000-0000-000000000009', 'e1000000-0000-0000-0000-000000000003'), -- EDAPLAN 480 → Mực in (Printing Inks)
  ('d1000000-0000-0000-0000-00000000000a', 'e1000000-0000-0000-0000-000000000001'), -- METOLAT 388 → Sơn (Coatings)
  ('d1000000-0000-0000-0000-00000000000b', 'e1000000-0000-0000-0000-000000000005'), -- METOLAT WE 4150 → Nhựa / Masterbatch
  ('d1000000-0000-0000-0000-00000000000c', 'e1000000-0000-0000-0000-000000000001')  -- TAFIGEL PUR 80 → Sơn (Coatings)
on conflict do nothing;

-- product_technical_issues --------------------------------------------------
insert into public.product_technical_issues (product_id, technical_issue_id) values
  ('d1000000-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000001'), -- AGITAN 120  → Bọt
  ('d1000000-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000002'), -- EDAPLAN 470 → Phân tán
  ('d1000000-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000004'), -- METOLAT 358 → Bề mặt
  ('d1000000-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000003'), -- HYDROPALAT  → Độ nhớt
  ('d1000000-0000-0000-0000-000000000005', 'f1000000-0000-0000-0000-000000000001'), -- AGITAN 282  → Bọt
  ('d1000000-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000001'), -- AGITAN DF   → Bọt
  ('d1000000-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000001'), -- AGITAN 305  → Bọt
  ('d1000000-0000-0000-0000-000000000008', 'f1000000-0000-0000-0000-000000000001'), -- AGITAN 731  → Bọt
  ('d1000000-0000-0000-0000-000000000009', 'f1000000-0000-0000-0000-000000000002'), -- EDAPLAN 480 → Phân tán
  ('d1000000-0000-0000-0000-00000000000a', 'f1000000-0000-0000-0000-000000000004'), -- METOLAT 388 → Bề mặt
  ('d1000000-0000-0000-0000-00000000000b', 'f1000000-0000-0000-0000-000000000004'), -- METOLAT WE  → Bề mặt
  ('d1000000-0000-0000-0000-00000000000c', 'f1000000-0000-0000-0000-000000000003')  -- TAFIGEL     → Độ nhớt
on conflict do nothing;
