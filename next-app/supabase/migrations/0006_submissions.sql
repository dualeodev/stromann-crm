-- 0006_submissions.sql
-- Public form submissions: quote / technical / contact.
-- Single table; type-specific columns are nullable depending on `type`.
--   quote:     products (jsonb), general_note
--   technical: issue_type, message
--   contact:   message
-- Public anon can insert; admins (authenticated) can read/update/delete.

create table if not exists public.submissions (
  id              uuid primary key default gen_random_uuid(),

  type            text not null
                    check (type in ('quote','technical','contact')),

  -- shared basic info
  full_name       text not null,
  company         text not null,
  email           text not null,
  phone           text not null,
  address         text,

  -- technical / contact
  message             text,
  technical_issue_id  uuid references public.technical_issues(id) on delete set null,

  -- quote
  products        jsonb,
  general_note    text,

  -- workflow
  status          text not null default 'new'
                    check (status in ('new','in-progress','done')),
  assignee_id     uuid references auth.users(id) on delete set null,

  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists submissions_type_idx           on public.submissions (type);
create index if not exists submissions_status_idx         on public.submissions (status, created_at desc);
create index if not exists submissions_created_at_idx     on public.submissions (created_at desc);
create index if not exists submissions_technical_issue_idx on public.submissions (technical_issue_id);

drop trigger if exists set_updated_at on public.submissions;
create trigger set_updated_at
  before update on public.submissions
  for each row execute function public.tg_set_updated_at();

-- RLS ------------------------------------------------------------------------
alter table public.submissions enable row level security;

drop policy if exists "submissions public insert" on public.submissions;
create policy "submissions public insert"
  on public.submissions for insert
  to anon, authenticated
  with check (true);

drop policy if exists "submissions admin read" on public.submissions;
create policy "submissions admin read"
  on public.submissions for select
  to authenticated
  using (true);

drop policy if exists "submissions admin update" on public.submissions;
create policy "submissions admin update"
  on public.submissions for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "submissions admin delete" on public.submissions;
create policy "submissions admin delete"
  on public.submissions for delete
  to authenticated
  using (true);
