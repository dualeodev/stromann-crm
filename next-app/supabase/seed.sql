-- Seed data applied by `supabase db reset` after migrations run.
-- Idempotent: uses fixed UUIDs so re-runs don't duplicate.

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
