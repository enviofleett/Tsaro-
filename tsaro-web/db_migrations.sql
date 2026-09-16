create table public.academy_bookings (
  id uuid default gen_random_uuid() primary key,
  course_name text not null,
  course_code text not null,
  candidate_name text not null,
  candidate_email text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on RLS
alter table public.academy_bookings enable row level security;

-- Allow anon to insert
create policy "Allow anon insert" on public.academy_bookings for insert with check (true);

-- Allow admin to read
create policy "Allow admin read" on public.academy_bookings for select using (
  exists (
    select 1 from public.user_roles
    where user_roles.user_id = auth.uid() and user_roles.role = 'admin'
  )
);
