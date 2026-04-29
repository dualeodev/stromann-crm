-- 0003_banners.sql
-- Banners shown on the homepage hero (and other slots). One row per banner.
-- Status is computed from is_enabled + the time window — we don't store it.
--
-- Image files live in the public Storage bucket `banner-images`. Bucket is
-- created idempotently here so a fresh `supabase db reset` provisions it too.

create table if not exists public.banners (
  id           uuid primary key default gen_random_uuid(),

  title        text not null,
  description  text,
  cta_label    text,
  cta_href     text,

  -- Path inside the banner-images bucket, e.g. "abc-123.jpg".
  -- Build the public URL with `${SUPABASE_URL}/storage/v1/object/public/banner-images/${image_path}`.
  image_path   text,

  position     text not null default 'hero_home'
                 check (position in ('hero_home','product_hero','home_mid')),
  sort_order   int  not null default 0,

  starts_at    timestamptz,
  ends_at      timestamptz,
  is_enabled   boolean not null default true,

  -- Per-language visibility flags. (Translations of title/description will
  -- come later in a separate banner_translations table.)
  lang_vn      boolean not null default true,
  lang_en      boolean not null default false,
  lang_cn      boolean not null default false,

  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  created_by   uuid references auth.users(id) on delete set null,
  updated_by   uuid references auth.users(id) on delete set null
);

create index if not exists banners_position_sort_idx
  on public.banners (position, sort_order);

create index if not exists banners_window_idx
  on public.banners (is_enabled, starts_at, ends_at);

drop trigger if exists set_updated_at on public.banners;
create trigger set_updated_at
  before update on public.banners
  for each row execute function public.tg_set_updated_at();

-- RLS ------------------------------------------------------------------------
alter table public.banners enable row level security;

drop policy if exists "banners public active read" on public.banners;
create policy "banners public active read"
  on public.banners for select
  to anon
  using (
    is_enabled = true
    and (starts_at is null or starts_at <= now())
    and (ends_at   is null or ends_at   >= now())
  );

drop policy if exists "banners admin all" on public.banners;
create policy "banners admin all"
  on public.banners for all
  to authenticated
  using (true)
  with check (true);

-- Storage bucket -------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('banner-images', 'banner-images', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "banner-images public read" on storage.objects;
create policy "banner-images public read"
  on storage.objects for select
  to anon
  using (bucket_id = 'banner-images');

drop policy if exists "banner-images authenticated all" on storage.objects;
create policy "banner-images authenticated all"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'banner-images')
  with check (bucket_id = 'banner-images');
