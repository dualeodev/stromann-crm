-- 0004_products.sql
-- Catalog schema: products + three M2M taxonomies that drive the public site's
-- mega-menu, sidebar and filters.
--
-- Entities:   products, categories (hierarchical), product_industries, technical_issues
-- Junctions:  product_categories, product_industry_links, product_technical_issues
--
-- Storage buckets created here so a fresh `supabase db reset` provisions them.

-- ============================================================================
-- categories ----------------------------------------------------------------
-- Flat list — drives the "DANH MỤC SẢN PHẨM" sidebar and the mega-menu's
-- first column.
-- ============================================================================
create table if not exists public.categories (
  id                  uuid primary key default gen_random_uuid(),

  slug                text not null unique,
  name                text not null,
  description         text,
  icon_path           text,

  is_enabled          boolean not null default true,
  show_in_mega_menu   boolean not null default true,
  sort_order          int     not null default 0,

  lang_vn             boolean not null default true,
  lang_en             boolean not null default false,
  lang_cn             boolean not null default false,

  meta_title          text,
  meta_description    text,

  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  created_by          uuid references auth.users(id) on delete set null,
  updated_by          uuid references auth.users(id) on delete set null
);

create index if not exists categories_sort_idx
  on public.categories (sort_order);
create index if not exists categories_enabled_idx
  on public.categories (is_enabled);

drop trigger if exists set_updated_at on public.categories;
create trigger set_updated_at
  before update on public.categories
  for each row execute function public.tg_set_updated_at();

alter table public.categories enable row level security;

drop policy if exists "categories public read" on public.categories;
create policy "categories public read"
  on public.categories for select
  to anon
  using (is_enabled = true);

drop policy if exists "categories admin all" on public.categories;
create policy "categories admin all"
  on public.categories for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================================
-- product_industries --------------------------------------------------------
-- Single-table entity (per requirement). Carries the rich industry fields
-- previously held in lib/admin/data.ts: code, hex color, banner, etc.
-- ============================================================================
create table if not exists public.product_industries (
  id                    uuid primary key default gen_random_uuid(),

  slug                  text not null unique,
  name                  text not null,
  code                  text,
  hex_color             text,

  short_description     text,
  overview_description  text,

  thumbnail_path        text,
  banner_path           text,

  is_enabled            boolean not null default true,
  show_on_homepage      boolean not null default false,
  show_in_mega_menu     boolean not null default true,
  sort_order            int     not null default 0,

  lang_vn               boolean not null default true,
  lang_en               boolean not null default false,
  lang_cn               boolean not null default false,

  meta_title            text,
  meta_description      text,

  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  created_by            uuid references auth.users(id) on delete set null,
  updated_by            uuid references auth.users(id) on delete set null
);

create index if not exists product_industries_mega_idx
  on public.product_industries (show_in_mega_menu, sort_order);
create index if not exists product_industries_enabled_idx
  on public.product_industries (is_enabled);

drop trigger if exists set_updated_at on public.product_industries;
create trigger set_updated_at
  before update on public.product_industries
  for each row execute function public.tg_set_updated_at();

alter table public.product_industries enable row level security;

drop policy if exists "product_industries public read" on public.product_industries;
create policy "product_industries public read"
  on public.product_industries for select
  to anon
  using (is_enabled = true);

drop policy if exists "product_industries admin all" on public.product_industries;
create policy "product_industries admin all"
  on public.product_industries for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================================
-- technical_issues ----------------------------------------------------------
-- Flat list of problems products solve ("Bọt", "Phân tán", …). Sub-problems
-- and solutions are deferred to a later migration.
-- ============================================================================
create table if not exists public.technical_issues (
  id                  uuid primary key default gen_random_uuid(),

  slug                text not null unique,
  name                text not null,
  description         text,

  is_enabled          boolean not null default true,
  show_in_mega_menu   boolean not null default true,
  sort_order          int     not null default 0,

  lang_vn             boolean not null default true,
  lang_en             boolean not null default false,
  lang_cn             boolean not null default false,

  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  created_by          uuid references auth.users(id) on delete set null,
  updated_by          uuid references auth.users(id) on delete set null
);

create index if not exists technical_issues_mega_idx
  on public.technical_issues (show_in_mega_menu, sort_order);
create index if not exists technical_issues_enabled_idx
  on public.technical_issues (is_enabled);

drop trigger if exists set_updated_at on public.technical_issues;
create trigger set_updated_at
  before update on public.technical_issues
  for each row execute function public.tg_set_updated_at();

alter table public.technical_issues enable row level security;

drop policy if exists "technical_issues public read" on public.technical_issues;
create policy "technical_issues public read"
  on public.technical_issues for select
  to anon
  using (is_enabled = true);

drop policy if exists "technical_issues admin all" on public.technical_issues;
create policy "technical_issues admin all"
  on public.technical_issues for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================================
-- products ------------------------------------------------------------------
-- ============================================================================
create table if not exists public.products (
  id                    uuid primary key default gen_random_uuid(),

  slug                  text not null unique,
  name                  text not null,
  brand                 text,
  region                text,

  short_description     text,
  detailed_description  text,

  status                text not null default 'draft'
                          check (status in ('published','draft','scheduled')),
  published_at          timestamptz,

  is_enabled            boolean not null default true,
  is_featured           boolean not null default false,
  sort_order            int     not null default 0,

  main_image_path       text,
  gallery_paths         text[]  not null default '{}',
  documents             jsonb   not null default '[]'::jsonb,

  meta_title            text,
  meta_description      text,
  og_image_path         text,

  lang_vn               boolean not null default true,
  lang_en               boolean not null default false,
  lang_cn               boolean not null default false,

  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  created_by            uuid references auth.users(id) on delete set null,
  updated_by            uuid references auth.users(id) on delete set null
);

create index if not exists products_status_sort_idx
  on public.products (status, sort_order);
create index if not exists products_enabled_idx
  on public.products (is_enabled);
create index if not exists products_featured_idx
  on public.products (is_featured) where is_featured = true;

drop trigger if exists set_updated_at on public.products;
create trigger set_updated_at
  before update on public.products
  for each row execute function public.tg_set_updated_at();

alter table public.products enable row level security;

drop policy if exists "products public read" on public.products;
create policy "products public read"
  on public.products for select
  to anon
  using (is_enabled = true and status = 'published');

drop policy if exists "products admin all" on public.products;
create policy "products admin all"
  on public.products for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================================
-- Junction tables -----------------------------------------------------------
-- Composite PKs guarantee no duplicate links. Cascading deletes on both sides
-- so removing a product or a tag cleans up the join rows automatically.
-- ============================================================================

create table if not exists public.product_categories (
  product_id   uuid not null references public.products(id)   on delete cascade,
  category_id  uuid not null references public.categories(id) on delete cascade,
  sort_order   int  not null default 0,
  primary key (product_id, category_id)
);
create index if not exists product_categories_category_idx
  on public.product_categories (category_id);
create index if not exists product_categories_product_idx
  on public.product_categories (product_id);

alter table public.product_categories enable row level security;

drop policy if exists "product_categories public read" on public.product_categories;
create policy "product_categories public read"
  on public.product_categories for select
  to anon
  using (true);

drop policy if exists "product_categories admin all" on public.product_categories;
create policy "product_categories admin all"
  on public.product_categories for all
  to authenticated
  using (true)
  with check (true);


create table if not exists public.product_industry_links (
  product_id           uuid not null references public.products(id)            on delete cascade,
  product_industry_id  uuid not null references public.product_industries(id)  on delete cascade,
  primary key (product_id, product_industry_id)
);
create index if not exists product_industry_links_industry_idx
  on public.product_industry_links (product_industry_id);
create index if not exists product_industry_links_product_idx
  on public.product_industry_links (product_id);

alter table public.product_industry_links enable row level security;

drop policy if exists "product_industry_links public read" on public.product_industry_links;
create policy "product_industry_links public read"
  on public.product_industry_links for select
  to anon
  using (true);

drop policy if exists "product_industry_links admin all" on public.product_industry_links;
create policy "product_industry_links admin all"
  on public.product_industry_links for all
  to authenticated
  using (true)
  with check (true);


create table if not exists public.product_technical_issues (
  product_id          uuid not null references public.products(id)          on delete cascade,
  technical_issue_id  uuid not null references public.technical_issues(id)  on delete cascade,
  primary key (product_id, technical_issue_id)
);
create index if not exists product_technical_issues_issue_idx
  on public.product_technical_issues (technical_issue_id);
create index if not exists product_technical_issues_product_idx
  on public.product_technical_issues (product_id);

alter table public.product_technical_issues enable row level security;

drop policy if exists "product_technical_issues public read" on public.product_technical_issues;
create policy "product_technical_issues public read"
  on public.product_technical_issues for select
  to anon
  using (true);

drop policy if exists "product_technical_issues admin all" on public.product_technical_issues;
create policy "product_technical_issues admin all"
  on public.product_technical_issues for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================================
-- Storage buckets -----------------------------------------------------------
-- Mirrors the banner-images pattern from 0003_banners.sql.
-- ============================================================================
insert into storage.buckets (id, name, public) values
  ('product-images',    'product-images',    true),
  ('product-documents', 'product-documents', true),
  ('industry-images',   'industry-images',   true),
  ('category-icons',    'category-icons',    true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "catalog buckets public read" on storage.objects;
create policy "catalog buckets public read"
  on storage.objects for select
  to anon
  using (bucket_id in ('product-images','product-documents','industry-images','category-icons'));

drop policy if exists "catalog buckets authenticated all" on storage.objects;
create policy "catalog buckets authenticated all"
  on storage.objects for all
  to authenticated
  using (bucket_id in ('product-images','product-documents','industry-images','category-icons'))
  with check (bucket_id in ('product-images','product-documents','industry-images','category-icons'));
