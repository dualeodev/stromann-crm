-- 0002_fix_admin_users_rls.sql
-- The 0001 policies recursed: the super-write policy was `for all` (so it
-- evaluated on SELECT too) AND it queried admin_users in its USING clause,
-- and the self-read policy called is_admin() which also queries admin_users.
-- Postgres flagged the chain (42P17 infinite recursion).
--
-- Fix:
--  • Read policy: any authenticated user can SELECT (admin_users contains no
--    secrets — username + name + role + is_active — and only admins ever
--    sign in).
--  • Drop the in-table super-write policy. Admin-user management happens
--    server-side via the service-role key, which bypasses RLS by design,
--    so we don't need a policy to permit it. RLS-default-deny correctly
--    blocks regular authenticated writes.

drop policy if exists "admin_users self read"           on public.admin_users;
drop policy if exists "admin_users super write"         on public.admin_users;
drop policy if exists "admin_users authenticated read"  on public.admin_users;

create policy "admin_users authenticated read"
  on public.admin_users for select
  to authenticated
  using (true);
