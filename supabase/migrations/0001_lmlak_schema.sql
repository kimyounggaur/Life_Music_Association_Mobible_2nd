create extension if not exists pgcrypto;

create schema if not exists private;

create type public.user_role as enum ('student', 'instructor', 'admin');
create type public.player_kind as enum ('pitched', 'percussion');
create type public.content_kind as enum ('book', 'songbook', 'demo', 'ppt');
create type public.target_audience as enum ('lower_grade', 'youth', 'adult', '7080');
create type public.skill_level as enum ('beginner', 'intermediate', 'advanced');
create type public.institution_type as enum ('school', 'welfare', 'culture', 'care');
create type public.match_status as enum ('open', 'requested', 'matched', 'closed');
create type public.post_type as enum ('notice', 'magazine');
create type public.enrollment_status as enum ('applied', 'in_review', 'issued', 'expired', 'rejected', 'cancelled');
create type public.device_platform as enum ('ios', 'android', 'web');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'student',
  display_name text,
  phone text,
  region text,
  bio text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.subjects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_ko text not null,
  name_en text,
  category text,
  player_kind public.player_kind not null default 'percussion',
  icon_slug text,
  player_slug text,
  summary text,
  description text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid references public.subjects(id) on delete set null,
  slug text unique not null,
  title text not null,
  level text,
  summary text,
  description text,
  curriculum jsonb not null default '[]'::jsonb,
  fee integer,
  apply_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contents (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  kind public.content_kind not null,
  title text not null,
  subject_id uuid references public.subjects(id) on delete set null,
  cover_slug text,
  instrument text,
  audience public.target_audience,
  skill_level public.skill_level,
  music_key text,
  level_label text,
  media_path text,
  media_type text,
  is_offline_available boolean not null default false,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.institutions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type public.institution_type,
  region text,
  contact text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.matches (
  id uuid primary key default gen_random_uuid(),
  institution_id uuid not null references public.institutions(id) on delete cascade,
  instructor_id uuid references auth.users(id) on delete set null,
  created_by uuid references auth.users(id) on delete set null,
  subjects text[] not null default '{}',
  status public.match_status not null default 'open',
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  status public.enrollment_status not null default 'applied',
  applied_at timestamptz not null default now(),
  issued_at timestamptz,
  cert_no text unique,
  expires_at timestamptz,
  note text,
  unique (user_id, course_id)
);

create table public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  content_id uuid not null references public.contents(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, content_id)
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  type public.post_type not null default 'notice',
  title text not null,
  body text,
  cover_slug text,
  author_id uuid references auth.users(id) on delete set null,
  published_at timestamptz,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id uuid references public.subjects(id) on delete set null,
  author_name text,
  rating int not null check (rating between 1 and 5),
  body text not null,
  is_public boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.device_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  token text not null,
  platform public.device_platform not null,
  updated_at timestamptz not null default now(),
  unique (user_id, token)
);

create index idx_courses_subject on public.courses(subject_id);
create index idx_contents_subject on public.contents(subject_id);
create index idx_contents_kind_active on public.contents(kind, is_active);
create index idx_contents_instrument on public.contents(instrument);
create index idx_subjects_active_sort on public.subjects(is_active, sort_order);
create index idx_matches_institution on public.matches(institution_id);
create index idx_matches_instructor on public.matches(instructor_id);
create index idx_matches_status on public.matches(status);
create index idx_enrollments_user on public.enrollments(user_id);
create index idx_enrollments_course on public.enrollments(course_id);
create index idx_favorites_content on public.favorites(content_id);
create index idx_posts_type_pub on public.posts(type, is_published, published_at desc);
create index idx_reviews_subject on public.reviews(subject_id);
create index idx_reviews_user on public.reviews(user_id);
create index idx_reviews_public on public.reviews(is_public);
create index idx_device_tokens_user on public.device_tokens(user_id);

create or replace function private.current_user_role()
returns public.user_role
language sql stable security definer set search_path = ''
as $$ select role from public.profiles where id = (select auth.uid()) $$;

create or replace function private.is_admin()
returns boolean
language sql stable security definer set search_path = ''
as $$ select coalesce(private.current_user_role() = 'admin', false) $$;

create or replace function private.is_instructor_or_admin()
returns boolean
language sql stable security definer set search_path = ''
as $$ select coalesce(private.current_user_role() in ('instructor','admin'), false) $$;

revoke all on function private.current_user_role() from public;
revoke all on function private.is_admin() from public;
revoke all on function private.is_instructor_or_admin() from public;
grant execute on function private.is_admin() to authenticated;
grant execute on function private.is_instructor_or_admin() to authenticated;

create or replace function public.tg_set_updated_at()
returns trigger language plpgsql security invoker set search_path = ''
as $$ begin new.updated_at = now(); return new; end $$;

create trigger set_updated_at before update on public.profiles for each row execute function public.tg_set_updated_at();
create trigger set_updated_at before update on public.subjects for each row execute function public.tg_set_updated_at();
create trigger set_updated_at before update on public.courses for each row execute function public.tg_set_updated_at();
create trigger set_updated_at before update on public.contents for each row execute function public.tg_set_updated_at();
create trigger set_updated_at before update on public.posts for each row execute function public.tg_set_updated_at();
create trigger set_updated_at before update on public.matches for each row execute function public.tg_set_updated_at();

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(coalesce(new.email, ''), '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.admin_set_role(target uuid, new_role public.user_role)
returns void language plpgsql security definer set search_path = ''
as $$
begin
  if not private.is_admin() then
    raise exception 'forbidden: admin only';
  end if;
  update public.profiles set role = new_role where id = target;
end $$;

revoke all on function public.admin_set_role(uuid, public.user_role) from public;
grant execute on function public.admin_set_role(uuid, public.user_role) to authenticated;

alter table public.profiles enable row level security;
alter table public.subjects enable row level security;
alter table public.courses enable row level security;
alter table public.contents enable row level security;
alter table public.institutions enable row level security;
alter table public.matches enable row level security;
alter table public.enrollments enable row level security;
alter table public.favorites enable row level security;
alter table public.posts enable row level security;
alter table public.reviews enable row level security;
alter table public.device_tokens enable row level security;

create policy profiles_select_own on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy profiles_select_admin on public.profiles for select to authenticated using (private.is_admin());
create policy profiles_insert_own on public.profiles for insert to authenticated with check ((select auth.uid()) = id);
create policy profiles_update_own on public.profiles for update to authenticated
  using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy subjects_select_public on public.subjects for select to anon, authenticated using (is_active);
create policy subjects_admin_all on public.subjects for all to authenticated using (private.is_admin()) with check (private.is_admin());

create policy courses_select_public on public.courses for select to anon, authenticated using (is_active);
create policy courses_admin_all on public.courses for all to authenticated using (private.is_admin()) with check (private.is_admin());

create policy contents_select_public on public.contents for select to anon, authenticated using (is_active);
create policy contents_admin_all on public.contents for all to authenticated using (private.is_admin()) with check (private.is_admin());

create policy posts_select_public on public.posts for select to anon, authenticated using (is_published);
create policy posts_admin_all on public.posts for all to authenticated using (private.is_admin()) with check (private.is_admin());

create policy reviews_select_public on public.reviews for select to anon, authenticated using (is_public);
create policy reviews_select_own on public.reviews for select to authenticated using ((select auth.uid()) = user_id or private.is_admin());
create policy reviews_insert_own on public.reviews for insert to authenticated with check ((select auth.uid()) = user_id);
create policy reviews_update_own on public.reviews for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy reviews_delete_own on public.reviews for delete to authenticated using ((select auth.uid()) = user_id or private.is_admin());

create policy favorites_select_own on public.favorites for select to authenticated using ((select auth.uid()) = user_id);
create policy favorites_insert_own on public.favorites for insert to authenticated with check ((select auth.uid()) = user_id);
create policy favorites_delete_own on public.favorites for delete to authenticated using ((select auth.uid()) = user_id);

create policy enrollments_select_own on public.enrollments for select to authenticated using ((select auth.uid()) = user_id or private.is_admin());
create policy enrollments_insert_own on public.enrollments for insert to authenticated with check ((select auth.uid()) = user_id and status = 'applied');
create policy enrollments_cancel_own on public.enrollments for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id and status = 'cancelled');
create policy enrollments_admin_update on public.enrollments for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy enrollments_admin_delete on public.enrollments for delete to authenticated using (private.is_admin());

create policy institutions_select_priv on public.institutions for select to authenticated using (private.is_instructor_or_admin());
create policy institutions_admin_all on public.institutions for all to authenticated using (private.is_admin()) with check (private.is_admin());

create policy matches_select on public.matches for select to authenticated
  using (
    private.is_admin()
    or (status = 'open' and private.is_instructor_or_admin())
    or (select auth.uid()) = instructor_id
    or (select auth.uid()) = created_by
  );
create policy matches_insert_admin on public.matches for insert to authenticated with check (private.is_admin());
create policy matches_claim_instructor on public.matches for update to authenticated
  using (status = 'open' and private.is_instructor_or_admin())
  with check (instructor_id = (select auth.uid()) and status = 'requested');
create policy matches_admin_update on public.matches for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy matches_admin_delete on public.matches for delete to authenticated using (private.is_admin());

create policy device_tokens_select_own on public.device_tokens for select to authenticated using ((select auth.uid()) = user_id);
create policy device_tokens_insert_own on public.device_tokens for insert to authenticated with check ((select auth.uid()) = user_id);
create policy device_tokens_update_own on public.device_tokens for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy device_tokens_delete_own on public.device_tokens for delete to authenticated using ((select auth.uid()) = user_id);

insert into storage.buckets (id, name, public) values
  ('public-assets', 'public-assets', true),
  ('avatars', 'avatars', true),
  ('media', 'media', false)
on conflict (id) do nothing;

create policy storage_public_read on storage.objects for select to anon, authenticated
  using (bucket_id = 'public-assets');
create policy storage_public_admin_write on storage.objects for all to authenticated
  using (bucket_id = 'public-assets' and private.is_admin())
  with check (bucket_id = 'public-assets' and private.is_admin());

create policy storage_avatars_read on storage.objects for select to anon, authenticated
  using (bucket_id = 'avatars');
create policy storage_avatars_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy storage_avatars_update on storage.objects for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text)
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy storage_avatars_delete on storage.objects for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);

create policy storage_media_read on storage.objects for select to authenticated
  using (bucket_id = 'media');
create policy storage_media_admin_write on storage.objects for all to authenticated
  using (bucket_id = 'media' and private.is_admin())
  with check (bucket_id = 'media' and private.is_admin());

grant usage on schema public to anon, authenticated;
grant select on public.subjects, public.courses, public.contents, public.posts, public.reviews to anon, authenticated;
grant insert, update, delete on public.subjects, public.courses, public.contents, public.posts to authenticated;
grant select, insert, update, delete on public.reviews, public.favorites, public.enrollments, public.device_tokens, public.matches, public.institutions to authenticated;
grant select, insert on public.profiles to authenticated;
revoke update on public.profiles from anon, authenticated;
grant update (display_name, phone, region, bio, avatar_url, updated_at) on public.profiles to authenticated;
