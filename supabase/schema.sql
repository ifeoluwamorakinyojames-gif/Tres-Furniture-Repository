-- Run in a new Supabase project. Enable email confirmation and MFA for owner accounts.
create extension if not exists pgcrypto;
create type public.staff_role as enum ('owner','staff');
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.staff_role not null default 'staff',
  display_name text not null default '',
  active boolean not null default false,
  created_at timestamptz not null default now()
);
create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  category text not null,
  price_ngn numeric(12,2) check (price_ngn >= 0),
  stock integer check (stock >= 0),
  image_urls text[] not null default '{}',
  published boolean not null default false,
  created_by uuid references auth.users(id),
  updated_at timestamptz not null default now()
);
create table public.audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id),
  action text not null,
  product_id uuid,
  occurred_at timestamptz not null default now()
);
create function public.is_active_staff() returns boolean language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.profiles where id = (select auth.uid()) and active = true);
$$;
create function public.is_owner() returns boolean language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.profiles where id = (select auth.uid()) and role = 'owner' and active = true);
$$;
revoke all on function public.is_active_staff() from public;
revoke all on function public.is_owner() from public;
grant execute on function public.is_active_staff() to authenticated;
grant execute on function public.is_owner() to authenticated;
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.audit_log enable row level security;
create policy "read own profile or owner" on public.profiles for select to authenticated using (id = (select auth.uid()) or public.is_owner());
create policy "owner manages profiles" on public.profiles for all to authenticated using (public.is_owner()) with check (public.is_owner());
create policy "public reads published products" on public.products for select to anon, authenticated using (published = true or public.is_active_staff());
create policy "staff creates unpublished products" on public.products for insert to authenticated with check (
  public.is_active_staff() and created_by = (select auth.uid()) and (published = false or public.is_owner())
);
create policy "staff updates products" on public.products for update to authenticated using (public.is_active_staff())
  with check (public.is_active_staff());
create policy "only owner deletes products" on public.products for delete to authenticated using (public.is_owner());
create policy "owner reads audit log" on public.audit_log for select to authenticated using (public.is_owner());
-- Prevent staff escalating permissions or publishing directly, even with raw API calls.
create function public.guard_product_changes() returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if tg_op = 'UPDATE' and not public.is_owner() then
    if new.published is distinct from old.published then
      raise exception 'Only owners may change publication status';
    end if;
  end if;
  if tg_op = 'INSERT' then
    if not public.is_owner() and new.published then
      raise exception 'Only owners may publish products';
    end if;
  end if;
  return new;
end;
$$;
create trigger guard_product_changes before insert or update on public.products for each row execute function public.guard_product_changes();
-- Owner bootstrap: after signing up, manually set the first trusted user's
-- profile role='owner', active=true using the Supabase SQL editor.
-- Never expose the service-role key in browser code.
