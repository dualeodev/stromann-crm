-- 0001_init_auth.sql
-- Bootstraps admin auth: a profile table for admin users, role enum, RLS, and a
-- public RPC that resolves a username to an email so the login form can sign in
-- through Supabase Auth's standard email/password flow.

create extension if not exists "pgcrypto";

-- Roles ----------------------------------------------------------------------
do $$ begin
  create type admin_role as enum ('super_admin', 'editor', 'viewer');
exception when duplicate_object then null; end $$;

-- Profile table linked 1:1 to auth.users -------------------------------------
create table if not exists public.admin_users (
  id           uuid primary key references auth.users (id) on delete cascade,
  username     text unique not null check (username ~ '^[a-z0-9_.-]{3,32}$'),
  full_name    text not null,
  role         admin_role not null default 'editor',
  is_active    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists admin_users_username_idx on public.admin_users (username);

-- updated_at trigger ---------------------------------------------------------
create or replace function public.tg_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists set_updated_at on public.admin_users;
create trigger set_updated_at
  before update on public.admin_users
  for each row execute function public.tg_set_updated_at();

-- Helper: is the current session an active admin? ---------------------------
create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.admin_users
    where id = auth.uid() and is_active = true
  );
$$;

-- Username -> email resolver, callable anonymously so the login page can use
-- it. Returns null when no active admin matches; never leaks which usernames
-- exist beyond that single bit.
create or replace function public.admin_email_for_username(p_username text)
returns text
language sql stable security definer set search_path = public, auth as $$
  select u.email
  from public.admin_users a
  join auth.users u on u.id = a.id
  where a.username = lower(p_username) and a.is_active = true
  limit 1;
$$;

grant execute on function public.admin_email_for_username(text) to anon, authenticated;
grant execute on function public.is_admin() to authenticated;

-- RLS ------------------------------------------------------------------------
alter table public.admin_users enable row level security;

drop policy if exists "admin_users self read" on public.admin_users;
create policy "admin_users self read"
  on public.admin_users for select
  to authenticated
  using (id = auth.uid() or public.is_admin());

drop policy if exists "admin_users super write" on public.admin_users;
create policy "admin_users super write"
  on public.admin_users for all
  to authenticated
  using (
    exists (
      select 1 from public.admin_users
      where id = auth.uid() and role = 'super_admin' and is_active = true
    )
  )
  with check (
    exists (
      select 1 from public.admin_users
      where id = auth.uid() and role = 'super_admin' and is_active = true
    )
  );
