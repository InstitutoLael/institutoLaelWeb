-- Instituto Lael: Real Catalog Sync 2026 - FINAL PRODUCTION VERSION
-- This script replaces test products with the 100% real institutional catalog.

-- 1. Clean the table
TRUNCATE TABLE products CASCADE;

-- 2. Insert PAES Products (Preuniversitario)
INSERT INTO products (name, description, price, category, image_url) VALUES
('Plan Monoramo PAES', '1 asignatura a elección con simulacros y material digital.', 9990, 'PAES', NULL),
('Plan Dúo Dinámico PAES', '2 asignaturas a elección. Ahorro significativo.', 18990, 'PAES', NULL),
('Plan Trío Fundamental PAES', '3 asignaturas a elección. El balance ideal.', 27990, 'PAES', NULL),
('Plan Full Intensivo PAES', '4 o más asignaturas. Acceso total a todas las clases.', 34990, 'PAES', NULL),
('Pack Humanista PAES', 'M1 + Lenguaje + Historia. Especial para Derecho y Psicología.', 27990, 'PAES', NULL),
('Pack Salud PAES', 'M1 + M2 + Lenguaje + Biología + Química. El más completo.', 34990, 'PAES', NULL),
('Pack Ingeniería PAES', 'M1 + M2 + Lenguaje + Física. Foco en ciencias exactas.', 34990, 'PAES', NULL);

-- 3. Insert Idiomas Products
INSERT INTO products (name, description, price, category, image_url) VALUES
('Plan Idiomas (1 Idioma)', 'Acceso a un idioma a elección con clases en vivo.', 17990, 'Idioma', NULL),
('Plan Dúo Idiomas (2 Idiomas)', 'Domina dos lenguas simultáneamente con descuento.', 32990, 'Idioma', NULL),
('Plan Políglota (3+ Idiomas)', 'Tarifa plana para aprender todos los idiomas disponibles.', 45990, 'Idioma', NULL);

-- 4. Insert LSCh (Lengua de Señas)
INSERT INTO products (name, description, price, category, image_url) VALUES
('LSCh: Plan Mensual Flexible', 'Clases grupales en vivo. Sin compromiso a largo plazo.', 24990, 'LSCH', NULL),
('LSCh: Plan Trimestral (Ahorro)', '3 meses de clases con matrícula gratis y acceso permanente.', 59970, 'LSCH', NULL),
('LSCh: Pack 4 Sesiones 1-a-1', 'Clases particulares personalizadas para nivelación rápida.', 60000, 'LSCH', NULL),
('LSCh: Pack 8 Sesiones 1-a-1', 'Avance acelerado con profesor exclusivo y corrección de video.', 110000, 'LSCH', NULL),
('LSCh: Convenio Iglesia/Social', 'Precio protegido para ministerios y organizaciones sociales.', 14990, 'LSCH', NULL);

-- 5. Insert Adult Education (Nivelación)
INSERT INTO products (name, description, price, category, image_url) VALUES
('Caminos: Plan Estándar', 'Pagas lo justo para nivelar tus estudios y apoyar la beca de otros.', 12990, 'NIVELACION', NULL),
('Caminos: Plan Padrino', 'Pagas tus estudios y financias el cupo de un compañero en necesidad.', 25000, 'NIVELACION', NULL),
('Caminos: Cupo Social (Beca)', 'Inscripción gratuita sujeta a 80% de asistencia.', 0, 'NIVELACION', NULL);

-- 6. Insert Academy & Homeschooling
INSERT INTO products (name, description, price, category, image_url) VALUES
('Academy: Pack Rescate (4 hrs)', 'Apoyo puntual para pruebas y resolución de dudas.', 52000, 'TALLER', NULL),
('Academy: Pack Pro (8 hrs)', 'Aprendizaje continuo con seguimiento de notas y guías.', 96000, 'TALLER', NULL),
('Academy: Pack Intensivo (12 hrs)', 'Dominio total de materias con simulacros y matrícula gratis.', 138000, 'TALLER', NULL);

-- 7. Insert Corporate Solutions (B2B)
INSERT INTO products (name, description, price, category, image_url) VALUES
('Corporate: Inglés para Equipos', 'Capacitación lingüística para empresas. Base 8 hrs/mes.', 52000, 'CORPORATIVO', NULL),
('Corporate: LSCh Ley 21.015', 'Cumplimiento normativo y sensibilización cultural para el staff.', 60000, 'CORPORATIVO', NULL),
('Corporate: Beneficio Hijos Preu', 'Pack futuro para familias de colaboradores. Precio mayorista.', 35000, 'CORPORATIVO', NULL),
('Corporate: Pack Meeting Ready', 'Taller intensivo de 1 mes: Pierde el miedo a hablar en inglés.', 250000, 'CORPORATIVO', NULL);

-- 8. Insert Digital Resources (On-Demand)
INSERT INTO products (name, description, price, category, image_url) VALUES
('Pack Química M1 + M2 (2025)', 'Acceso a 50+ clases grabadas de Química PAES. On-demand.', 19990, 'RECURSOS', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d');

-- 9. Insert Naama Studio (Beauty & Wellness)
-- Including top services as sellable online items
INSERT INTO products (name, description, price, category, image_url) VALUES
('Studio: Maquillaje Social Pro', 'Maquillaje profesional con técnica de contorno Allison.', 30000, 'STUDIO', NULL),
('Studio: BB Glow Coreano', 'Unifica tono y aporta luminosidad. Piel de porcelana.', 39000, 'STUDIO', NULL),
('Studio: Manicura Permanente', 'Limpieza profunda y color LED de larga duración.', 21000, 'STUDIO', NULL),
('Studio: Alisado Profesional', 'Tratamiento termofijado para cabello corto/medio.', 55990, 'STUDIO', NULL);

-- Final Confirmation
SELECT category, name, price FROM products ORDER BY category, price ASC;
