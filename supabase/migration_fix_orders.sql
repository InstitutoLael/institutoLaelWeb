-- SQL Migration: Fix Orders Table & Policies
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Add missing customer columns
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_name TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_email TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_phone TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_rut TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS items_summary TEXT;

-- 2. Make user_id nullable (Allows Guest Checkout / Pending Confirmation)
ALTER TABLE orders ALTER COLUMN user_id DROP NOT NULL;

-- 3. Fix RLS Policies
-- Allow anyone to insert (since we capture their data in the columns above)
-- Alternatively, if you want only registered users, the code must wait for login.
-- For now, we allow insertion to prevent the 500/Hang.
DROP POLICY IF EXISTS "Users can insert their own orders" ON orders;
CREATE POLICY "Allow anyone to insert orders" ON orders FOR INSERT WITH CHECK (true);

-- Ensure public can read products (just in case it was missing)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access to products" ON products;
CREATE POLICY "Allow public read access to products" ON products FOR SELECT USING (true);
