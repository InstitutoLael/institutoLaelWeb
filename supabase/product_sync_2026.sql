-- product_sync_2026_fixed.sql
-- Run this to update your Catalog in Supabase correctly

-- 1. Clean up existing (by name to be safe)
DELETE FROM products WHERE name IN (
  'Plan Monoramo PAES', 'Plan Dúo Dinámico', 'Plan Trío Fundamental', '🏆 Plan Full Intensivo (Tarifa Plana)',
  'Plan Mensual (1 Idioma)', 'Plan Dúo (Ahorro)', 'Plan Políglota (Tarifa Plana)',
  'Plan Mensual Flexible', 'Plan Trimestral (Ahorro)', 'Convenio Iglesia/Ministerio'
);

-- 2. Insert with correct names and categories for the Frontend logic
INSERT INTO products (name, price, category) VALUES
-- PAES (Category: PAES)
('Plan Monoramo PAES', 14990, 'PAES'),
('Plan Dúo Dinámico', 24990, 'PAES'),
('Plan Trío Fundamental', 34990, 'PAES'),
('🏆 Plan Full Intensivo (Tarifa Plana)', 44990, 'PAES'),

-- Idiomas (Category: Idioma)
('Plan Mensual (1 Idioma)', 24990, 'Idioma'),
('Plan Dúo (Ahorro)', 39990, 'Idioma'),
('Plan Políglota (Tarifa Plana)', 54990, 'Idioma'),

-- LSCh (Category: LSCH)
('Plan Mensual Flexible', 24990, 'LSCH'),
('Plan Trimestral (Ahorro)', 19990, 'LSCH'),
('Convenio Iglesia/Ministerio', 14990, 'LSCH');
