-- Create the feedback table
create table public.feedback (
  id uuid default gen_random_uuid() primary key,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text,
  contact_info text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security
alter table public.feedback enable row level security;

-- Allow anonymous inserts (since the 'Gracias' page might be public)
create policy "Allow anonymous inserts"
on public.feedback
for insert
with check (true);

-- Allow only authenticated staff to view feedback (optional, adjust as needed)
create policy "Allow staff to select"
on public.feedback
for select
using (auth.role() = 'authenticated');
