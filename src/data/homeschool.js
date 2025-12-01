// === Lael Academy: Hub de Entrenamiento Académico ===

// 🔢 Helper de Moneda
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

// 🧾 Matrícula (Gestión de ingreso)
export const ENROLLMENT_FEE = 15000;

// 🤝 ALIANZA ESTRATÉGICA (Validación Legal)
export const ALLIANCE = {
  name: "Los Olivos Homeschool",
  role: "Colegio Paraguas Partner",
  desc: "Validación de estudios y certificados Mineduc a través de nuestra alianza exclusiva.",
};

// 📚 Materias (Con colores para el diseño Bento)
export const SUBJECTS = [
  { id: 'mat', name: 'Matemáticas', icon: '📐', color: '#06b6d4', desc: 'Álgebra, Cálculo, PAES M1/M2.' },
  { id: 'len', name: 'Lenguaje', icon: '📚', color: '#f97316', desc: 'Lectura crítica y redacción.' },
  { id: 'cie', name: 'Ciencias', icon: '🧬', color: '#84cc16', desc: 'Biología, Física, Química.' },
  { id: 'his', name: 'Historia', icon: '🏛️', color: '#a855f7', desc: 'Historia y Cs. Sociales.' },
  { id: 'ing', name: 'Inglés', icon: '🇬🇧', color: '#3b82f6', desc: 'Refuerzo escolar bilingüe.' },
];

// 🎓 Niveles
export const LEVELS = [
  { id: 'basica', label: 'Ed. Básica', desc: '1º a 8º Básico' },
  { id: 'media', label: 'Ed. Media', desc: 'Iº a IVº Medio' },
  { id: 'paes', label: 'Prep. PAES', desc: 'Intensivo U' },
  { id: 'exam', label: 'Ex. Libres', desc: 'Apoyo temario' },
];

// 📦 PACKS DE HORAS (B2C)
export const PACKS = [
  { 
    id: 'p4', 
    hours: 4, 
    title: 'Pack Mantenimiento', 
    price: 79990, 
    badge: null,
    desc: "1 hora semanal. Ideal para resolver dudas puntuales."
  },
  { 
    id: 'p8', 
    hours: 8, 
    title: 'Pack Progreso', 
    price: 149990, 
    badge: 'Más Popular',
    desc: "2 horas semanales. El estándar para subir notas."
  },
  { 
    id: 'p12', 
    hours: 12, 
    title: 'Pack Intensivo', 
    price: 209990, 
    badge: 'Mejor Valor',
    desc: "3 horas semanales. Preparación de exámenes importantes."
  },
];

// 🏫 SERVICIOS COLEGIOS (B2B)
export const SCHOOL_SERVICES = [
  {
    id: 'ensayos',
    title: 'Corrección PAES',
    desc: 'Externaliza la corrección de ensayos. Entregamos data y analítica por alumno.',
    icon: '📊'
  },
  {
    id: 'nivelacion',
    title: 'Reforzamiento B2B',
    desc: 'Programas de nivelación intensiva para cursos con rezago académico.',
    icon: '🚀'
  },
  {
    id: 'reemplazo',
    title: 'Staff Docente',
    desc: 'Profesores expertos disponibles para cubrir licencias o talleres.',
    icon: '👨‍🏫'
  }
];