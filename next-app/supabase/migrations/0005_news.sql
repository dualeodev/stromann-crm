-- 0005_news.sql
-- News / Insights — admin-managed articles shown on /news.
-- Categories are a fixed enum (4 values).
-- Body is sanitized rich-text HTML (sanitization happens in the server action,
-- not in the DB — column is plain text).
-- Cover images live in the `news-images` Storage bucket, mirroring banners.

create table if not exists public.news (
  id              uuid primary key default gen_random_uuid(),

  slug            text not null unique,
  title           text not null,
  excerpt         text,
  body_html       text not null default '',

  category        text not null
                    check (category in ('tech_knowledge','real_application','product','company')),

  cover_path      text,
  read_minutes    int  not null default 5,

  is_published    boolean     not null default false,
  published_at    timestamptz,

  lang_vn         boolean not null default true,
  lang_en         boolean not null default false,
  lang_cn         boolean not null default false,

  meta_title       text,
  meta_description text,

  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  created_by      uuid references auth.users(id) on delete set null,
  updated_by      uuid references auth.users(id) on delete set null
);

create index if not exists news_published_idx
  on public.news (is_published, published_at desc);
create index if not exists news_category_idx
  on public.news (category);

drop trigger if exists set_updated_at on public.news;
create trigger set_updated_at
  before update on public.news
  for each row execute function public.tg_set_updated_at();

-- RLS ------------------------------------------------------------------------
alter table public.news enable row level security;

drop policy if exists "news public read" on public.news;
create policy "news public read"
  on public.news for select
  to anon
  using (
    is_published = true
    and (published_at is null or published_at <= now())
  );

drop policy if exists "news admin all" on public.news;
create policy "news admin all"
  on public.news for all
  to authenticated
  using (true)
  with check (true);

-- Storage bucket -------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('news-images', 'news-images', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "news-images public read" on storage.objects;
create policy "news-images public read"
  on storage.objects for select
  to anon
  using (bucket_id = 'news-images');

drop policy if exists "news-images authenticated all" on storage.objects;
create policy "news-images authenticated all"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'news-images')
  with check (bucket_id = 'news-images');
