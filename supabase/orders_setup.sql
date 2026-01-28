-- Create Orders Table for Instituto Lael
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  payment_id text,
  payment_status text,
  total_amount numeric,
  customer_email text,
  customer_name text,
  items jsonb,
  metadata jsonb
);

-- Enable RLS
alter table orders enable row level security;

-- Policies (Only Service Role or Admin can interact for now, or authenticated users can read their own)
create policy "Service role can do everything on orders"
  on orders for all
  using ( auth.role() = 'service_role' );
