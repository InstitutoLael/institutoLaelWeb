-- 1. Table: products
create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price numeric not null,
  category text check (category in ('PAES', 'Idioma', 'Taller', 'LSCh')),
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Table: orders
create table orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  total_amount numeric not null,
  status text check (status in ('pending', 'paid', 'cancelled')) default 'pending',
  payment_method text check (payment_method in ('transfer', 'mercadopago')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Table: order_items
create table order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references orders on delete cascade not null,
  product_id uuid references products not null,
  price_at_purchase numeric not null
);

-- 4. Table: inscriptions (links users to products)
create table inscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  product_id uuid references products not null,
  order_id uuid references orders,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, product_id)
);

-- RLS (Row Level Security)
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table inscriptions enable row level security;

-- Policies: Products (Public read)
create policy "Allow public read access to products" on products for select using (true);

-- Policies: Orders (User can see their own)
create policy "Users can see their own orders" on orders for select using (auth.uid() = user_id);
create policy "Users can insert their own orders" on orders for insert with check (auth.uid() = user_id);

-- Policies: Order Items (User can see their own items)
create policy "Users can see their own order items" on order_items for select using (
  exists (select 1 from orders where orders.id = order_id and orders.user_id = auth.uid())
);

-- Policies: Inscriptions
create policy "Users can see their own inscriptions" on inscriptions for select using (auth.uid() = user_id);

-- SEED DATA
insert into products (name, description, price, category) values
('PAES Anual 2026', 'Preparación completa para M1, M2, Lenguaje y Ciencias.', 450000, 'PAES'),
('PAES Intensivo Invierno', 'Repaso acelerado con foco en resolución estratégica.', 220000, 'PAES'),
('Curso Inglés (A1/A2)', 'Base fundamental de comunicación en inglés.', 180000, 'Idioma'),
('Curso Coreano Básico', 'Iniciación al idioma coreano y cultura Hallyu.', 195000, 'Idioma'),
('Curso LSCh (Nivel 1)', 'Lengua de Señas Chilena básica para comunicación efectiva.', 150000, 'LSCh');
