// src/data/homeschool.js
// Homeschool — Acompañamiento para exámenes libres (familias)
// + Ensayos por volumen para colegios/escuelas (institucional)

// Matrícula única por alumno/año (mantengo tu valor para no romper flujos)
export const ENROLLMENT_FEE = 10990;

// Tarifas base por alumno (precios accesibles y redondeados)
export const RATES = {
  oneToOne: 9900,   // CLP/h — 1:1 (antes 12.000)
  microGroup: 6900, // CLP/h — por alumno (3 a 6) (antes 7.500)
};

// Uplifts por cantidad de materias (recargo de planificación suavizado)
export const MULTI_SUBJECT_UPLIFTS = [
  { min: 1, max: 2, rate: 0.00 },
  { min: 3, max: 4, rate: 0.05 }, // antes 0.07
  { min: 5, max: 99, rate: 0.10 }, // antes 0.12
];

// Packs sugeridos (naming más claro y en español)
export const PACKS = [
  { id: "starter", title: "Inicio",      hoursPerWeek: 1, months: 3, mode: "oneToOne",  badge: "Comienza hoy", blurb: "Refuerzo suave semanal." },
  { id: "focus",   title: "Progreso",    hoursPerWeek: 2, months: 6, mode: "oneToOne",  badge: "Popular",      blurb: "Avance sostenido y preparación." },
  { id: "squad",   title: "Equipo",      hoursPerWeek: 2, months: 4, mode: "microGroup",badge: "Micro-grupo",  blurb: "Aprende en equipo (3 a 6)." },
  { id: "sprint",  title: "Intensivo",   hoursPerWeek: 3, months: 2, mode: "oneToOne",  badge: "Rinde pronto", blurb: "Empuje corto antes de rendir." },
];

// Materias típicas
export const SUBJECTS = [
  { id: "leng", name: "Lenguaje y Comunicación" },
  { id: "mat",  name: "Matemática" },
  { id: "cie",  name: "Ciencias / Biología" },
  { id: "his",  name: "Historia y Cs. Sociales" },
  { id: "ing",  name: "Inglés" },
];

// Ensayos para familias (add-on) — valores más amables
export const ESSAY_ADDONS = [
  { id: "ens-1",  label: "1 ensayo + feedback",  price: 12990 }, // antes 14.990
  { id: "ens-3",  label: "3 ensayos + feedback", price: 34990 }, // antes 39.990
  { id: "ens-6",  label: "6 ensayos + feedback", price: 62990 }, // antes 69.990
];

// Selecciones de duración
export const MONTH_CHOICES = [
  { v: 1,  label: "1 mes" },
  { v: 2,  label: "2 meses" },
  { v: 3,  label: "3 meses" },
  { v: 4,  label: "4 meses" },
  { v: 6,  label: "6 meses" },
  { v: 8,  label: "8 meses" },
  { v: 10, label: "10 meses" },
];

// Horas por semana sugeridas
export const HOURS_CHOICES = [
  { v: 1, label: "1 h/sem" },
  { v: 2, label: "2 h/sem" },
  { v: 3, label: "3 h/sem" },
  { v: 4, label: "4 h/sem" },
];

// Modalidades UI
export const MODES = [
  { id: "oneToOne",  label: "1:1 (individual)" },
  { id: "microGroup", label: "Micro-grupo (3 a 6)" },
];

// ====== Instituciones: Ensayos por volumen ======

// Tramos por estudiante por ensayo (ajuste ↓ para competitividad)
export function schoolUnitPrice(students) {
  if (students >= 200) return 3490; // igual
  if (students >= 100) return 3990; // igual
  if (students >= 50)  return 4490; // antes 4.990
  return 4990;                       // antes 5.990
}

// Add-ons institucionales (por estudiante por ensayo)
export const SCHOOL_ADDONS = {
  grading: 1800, // antes 2000
  printed: 900,  // antes 1000
};

// Cálculo institucional
export function estimateSchoolEssaysTotal({ students, examsPerStudent, withGrading, printed }) {
  const nStudents = Math.max(1, Number(students || 1));
  const nExams = Math.max(1, Number(examsPerStudent || 1));
  const unit = schoolUnitPrice(nStudents);
  const addons = (withGrading ? SCHOOL_ADDONS.grading : 0) + (printed ? SCHOOL_ADDONS.printed : 0);
  const perStudentPerExam = unit + addons;
  const total = perStudentPerExam * nStudents * nExams;
  return { unit, addons, perStudentPerExam, total };
}

// Utils
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

// Uplift por # materias
export function getUpliftRate(subjectsCount = 1) {
  const rule = MULTI_SUBJECT_UPLIFTS.find(r => subjectsCount >= r.min && subjectsCount <= r.max);
  return rule ? rule.rate : 0;
}

// Estimador mensual por alumno (familias)
export function estimateMonthly({ mode, hoursPerWeek, subjectsCount }) {
  const base = mode === "microGroup" ? RATES.microGroup : RATES.oneToOne;
  const weekly = Math.max(1, Number(hoursPerWeek || 1));
  const monthlyHours = weekly * 4; // ~4 semanas
  const uplift = getUpliftRate(subjectsCount);
  return Math.round(monthlyHours * base * (1 + uplift));
}