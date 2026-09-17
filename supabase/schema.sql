-- Run this once in your Supabase project's SQL Editor (Database > SQL Editor > New query).

-- 1. PROFILE (single row: hero, about, contact info)
create table if not exists profile (
  id int primary key default 1,
  name text not null default '',
  short_name text not null default '',
  handle text not null default '',
  status text not null default 'Online',
  contact_button_text text not null default 'Contact Me',
  title text not null default '',
  typed_texts jsonb not null default '[]',
  hero_image_url text default '',
  university_name text default '',
  university_logo_url text default '',
  university_major text default '',
  badges jsonb not null default '[]',
  about_paragraphs jsonb not null default '[]',
  technical_skills jsonb not null default '[]',
  interests jsonb not null default '[]',
  contact_email text default '',
  contact_linkedin text default '',
  contact_github text default '',
  contact_instagram text default '',
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);

-- 2. EXPERIENCE
create table if not exists experiences (
  id uuid primary key default gen_random_uuid(),
  company text not null default '',
  position text not null default '',
  type text not null default '',
  duration text not null default '',
  location text not null default '',
  description jsonb not null default '[]',
  skills jsonb not null default '[]',
  logo_url text default '',
  photos jsonb not null default '[]',
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

-- 3. PROJECTS
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  nama text not null default '',
  gambar_url text default '',
  desk text default '',
  tools jsonb not null default '[]',
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

-- 4. CERTIFICATES
create table if not exists certificates (
  id uuid primary key default gen_random_uuid(),
  nama text not null default '',
  gambar_url text default '',
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

-- Seed the single profile row if it doesn't exist yet
insert into profile (id) values (1) on conflict (id) do nothing;

-- ROW LEVEL SECURITY: public can read, only logged-in (admin) users can write
alter table profile enable row level security;
alter table experiences enable row level security;
alter table projects enable row level security;
alter table certificates enable row level security;

create policy "Public read profile" on profile for select using (true);
create policy "Public read experiences" on experiences for select using (true);
create policy "Public read projects" on projects for select using (true);
create policy "Public read certificates" on certificates for select using (true);

create policy "Authenticated write profile" on profile for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated write experiences" on experiences for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated write projects" on projects for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated write certificates" on certificates for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- STORAGE: bucket for uploaded images (create via Dashboard > Storage if this insert fails)
insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do nothing;

create policy "Public read portfolio-assets" on storage.objects for select
  using (bucket_id = 'portfolio-assets');
create policy "Authenticated upload portfolio-assets" on storage.objects for insert
  with check (bucket_id = 'portfolio-assets' and auth.role() = 'authenticated');
create policy "Authenticated update portfolio-assets" on storage.objects for update
  using (bucket_id = 'portfolio-assets' and auth.role() = 'authenticated');
create policy "Authenticated delete portfolio-assets" on storage.objects for delete
  using (bucket_id = 'portfolio-assets' and auth.role() = 'authenticated');
