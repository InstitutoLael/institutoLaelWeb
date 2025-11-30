// src/data/homeschool.js
// === Lael Academy: Tutorías y Reforzamiento Académico ===
// Rebranding 2025: Enfoque en Packs de Horas y Soluciones B2B

// 🔢 Helper de Formato Moneda
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

// 🧾 Matrícula (Solo para alumnos nuevos)
// Esto cubre la gestión administrativa de ingreso.
export const ENROLLMENT_FEE = 15000;

// 📚 Materias Disponibles
export const SUBJECTS = [
  { id: 'mat', name: 'Matemáticas', icon: '📐', desc: 'Álgebra, Geometría, Cálculo, PAES.' },
  { id: 'len', name: 'Lenguaje', icon: '📚', desc: 'Comprensión lectora, Escritura.' },
  { id: 'cie', name: 'Ciencias', icon: '🧬', desc: 'Física, Química, Biología.' },
  { id: 'his', name: 'Historia', icon: '🏛️', desc: 'Historia de Chile y Cs. Sociales.' },
  { id: 'ing', name: 'Inglés Escolar', icon: '🇬🇧', desc: 'Refuerzo curricular.' },
];

// 🎓 Niveles Académicos
export const LEVELS = [
  { id: 'basica', label: 'Ed. Básica', desc: '1º a 8º Básico' },
  { id: 'media', label: 'Ed. Media', desc: 'Iº a IVº Medio' },
  { id: 'paes', label: 'Prep. PAES', desc: 'Intensivo Universitario' },
  { id: 'exam', label: 'Ex. Libres', desc: 'Validación Mineduc' },
];

// 📦 PACKS DE HORAS (El corazón de la venta B2C)
// Estrategia: Vender "Bolsas de horas" mensuales.
// Precio hora base calculado: ~$20.000 (1:1 Premium).
// Pack 8h: $18.750/h. Pack 12h: $17.500/h.
export const PACKS = [
  { 
    id: 'p4', 
    hours: 4, 
    title: 'Pack Mensual', 
    price: 79990, 
    badge: null,
    desc: "1 hora semanal. Ideal para mantenimiento y dudas puntuales."
  },
  { 
    id: 'p8', 
    hours: 8, 
    title: 'Pack Semestral', // Nombre comercial (refuerzo continuo)
    price: 149990, 
    badge: 'Popular',
    desc: "2 horas semanales. El estándar para ver mejoras reales en notas."
  },
  { 
    id: 'p12', 
    hours: 12, 
    title: 'Pack Intensivo', 
    price: 209990, 
    badge: 'Mejor Valor',
    desc: "3 horas semanales. Para preparar pruebas importantes o PAES."
  },
];

// 🏫 B2B: Datos para Colegios (Referenciales)
// Esto alimenta la sección de "Aliados Estratégicos".
export const SCHOOL_SERVICES = [
  {
    id: 'ensayos',
    title: 'Corrección Ensayos PAES',
    desc: 'Externalice la carga docente. Entregamos reportes por alumno y curso.',
    icon: '📝'
  },
  {
    id: 'nivelacion',
    title: 'Nivelación Académica',
    desc: 'Programas de reforzamiento intensivo para cursos completos.',
    icon: '📊'
  },
  {
    id: 'reemplazo',
    title: 'Cobertura Docente',
    desc: 'Profesores expertos disponibles para cubrir licencias online.',
    icon: '👩‍🏫'
  }
];

// --- (Helpers antiguos mantenidos por compatibilidad si algo falla) ---
export const RATES = { oneToOne: 20000, microGroup: 12000 };
export const MODES = [{id:'oneToOne', label:'1:1'}, {id:'microGroup', label:'Grupal'}];
export function estimateMonthly(){ return 0; } 
export function getUpliftRate(){ return 0; }
export function estimateSchoolEssaysTotal(){ return { total: 0 }; }