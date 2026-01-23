-- product_sync_2026.sql
-- Run this to update your Catalog in Supabase

-- 1. PAES Products
INSERT INTO products (id, name, price, category) VALUES
('paes-1', 'PAES: 1 Asignatura', 14990, 'PAES'),
('paes-2', 'PAES: 2 Asignaturas', 24990, 'PAES'),
('paes-3', 'PAES: 3 Asignaturas', 34990, 'PAES'),
('paes-full', 'PAES: Plan Full (4+)', 44990, 'PAES')
ON CONFLICT (id) DO UPDATE SET price = EXCLUDED.price;

-- 2. Idiomas Products
INSERT INTO products (id, name, price, category) VALUES
('lang-single', 'Idioma: 1 Nivel', 24990, 'IDIOMAS'),
('lang-duo', 'Idiomas: Pack Dúo', 39990, 'IDIOMAS'),
('lang-poly', 'Idiomas: Plan Políglota', 54990, 'IDIOMAS')
ON CONFLICT (id) DO UPDATE SET price = EXCLUDED.price;

-- 3. LSCh Products
INSERT INTO products (id, name, price, category) VALUES
('lsch-monthly', 'LSCh: Plan Mensual', 24990, 'LSCH'),
('lsch-quarter', 'LSCh: Plan Trimestral', 19990, 'LSCH'),
('lsch-church', 'LSCh: Convenio Iglesia', 14990, 'LSCH')
ON CONFLICT (id) DO UPDATE SET price = EXCLUDED.price;
