-- 1. Tabla de Usuarios (Alumnos, Profesores, Admin)
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password TEXT, -- Aquí guardaremos la contraseña encriptada
  full_name TEXT,
  role TEXT DEFAULT 'student', -- 'student', 'teacher', 'admin'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de Cursos (Tus productos)
DROP TABLE IF EXISTS courses;
CREATE TABLE courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE, -- ej: 'ingles-b1' (para la URL)
  title TEXT,
  price INTEGER,
  is_active BOOLEAN DEFAULT 1
);

-- 3. Tabla de Matrículas (Ventas)
DROP TABLE IF EXISTS enrollments;
CREATE TABLE enrollments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  course_id INTEGER,
  purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'active', -- 'active', 'completed', 'dropped'
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);