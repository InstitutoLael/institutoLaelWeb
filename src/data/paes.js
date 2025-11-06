// src/data/paes.js
/* ──────────────────────────────────────────────────────────────────────────
   PAES — Única fuente de verdad (2026)
   - Ensayos: 1 por ramo inscrito / mes (regla global)
   - Descuentos automáticos por n° de ramos (sin “regalar” el full)
   - Planes por asignatura + Combos estratégicos (copy claro)
   - Helpers de ANUALIDAD (mar–oct: 8 meses) y tabla de referencia
   ────────────────────────────────────────────────────────────────────────── */

// 🔢 CLP formatter (reutilizable en componentes)
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

// 📅 Parámetros de anualidad académica (mar–oct: 8 meses)
export const ACADEMIC_MONTHS = 8; // cambia a 9 si cierras en noviembre
export const ACADEMIC_PERIOD_LABEL = "marzo a octubre"; // para UI

// 🧾 Matrícula obligatoria (pago único)
export const ENROLLMENT_FEE = 7990;

/**
 * 💵 Precio base por ramo/mes
 * - 2026 propuesto: 8.990 (ajustado para 2 h/sem sostenibles)
 */
export const PER_SUBJECT_MONTHLY = 8990;

/**
 * 🔻 Descuentos por cantidad de ramos (graduales)
 * - Cap en 20% para 5+
 */
export const DISCOUNTS_BY_COUNT = [
  { min: 5, rate: 0.20 }, // 20% (5+)
  { min: 4, rate: 0.15 }, // 15% (4)
  { min: 3, rate: 0.10 }, // 10% (3)
  { min: 2, rate: 0.05 }, // 5%  (2)
];

// 📝 Ensayos: 1 por ramo / mes (regla global)
export const ESSAYS_PER_SUBJECT_PER_MONTH = 1;

// 🎯 Redondeos amigables a decenas (más “marketinero”)
const friendlyRound10 = (n) => Math.round(n / 10) * 10;

// 📉 Descuento aplicable según cantidad
function discountFor(count) {
  return DISCOUNTS_BY_COUNT.find((x) => count >= x.min)?.rate ?? 0;
}

// ✅ Normaliza cantidad (1…7)
function clampCount(n) {
  const v = Math.max(1, Math.min(7, Number(n || 0)));
  return v;
}

// 💰 Precio mensual para N ramos (con redondeo)
export function priceForCount(count) {
  const c = clampCount(count);
  const d = discountFor(c);
  const base = PER_SUBJECT_MONTHLY * c;
  return friendlyRound10(Math.round(base * (1 - d)));
}

// 🧪 Ensayos/mes para N ramos
export function essaysForCount(count) {
  return clampCount(count) * ESSAYS_PER_SUBJECT_PER_MONTH;
}

// 🧮 Precio mensual según lista de asignaturas
export function priceForSubjects(subjectIds = []) {
  return priceForCount((subjectIds || []).length);
}

/* 💼 Helpers de ANUALIDAD (mar–oct/nov) */
// Total anual para N ramos (por defecto 8 meses)
export function priceAnnual(count, months = ACADEMIC_MONTHS) {
  return priceForCount(count) * Math.max(1, Number(months || ACADEMIC_MONTHS));
}

// Total anual según lista de asignaturas
export function priceAnnualForSubjects(subjectIds = [], months = ACADEMIC_MONTHS) {
  return priceAnnual((subjectIds || []).length, months);
}

// Resumen útil para UI (mensual + anual + ensayos)
export function planBreakdown(subjectIds = [], months = ACADEMIC_MONTHS) {
  const count = clampCount((subjectIds || []).length);
  const monthly = priceForCount(count);
  return {
    count,
    monthly,
    annual: priceAnnual(count, months),
    essaysPerMonth: essaysForCount(count),
    months,
    periodLabel: ACADEMIC_PERIOD_LABEL,
  };
}

/* 📊 Tabla rápida para UI (ej. “ver cómo baja el valor al sumar ramos”) */
export function buildMonthlyTable(max = 7) {
  const rows = [];
  for (let i = 1; i <= Math.max(1, Math.min(7, max)); i++) {
    rows.push({
      subjects: i,
      monthly: priceForCount(i),
      essaysPerMonth: essaysForCount(i),
      discountRate: discountFor(i), // 0..0.2
    });
  }
  return rows;
}

/* ───────── Ramos disponibles ───────── */
export const PAES_SUBJECTS = [
  { id: "m1",  name: "Matemáticas M1" },
  { id: "m2",  name: "Matemáticas M2" },
  { id: "len", name: "Lenguaje" },
  { id: "his", name: "Historia" },
  { id: "bio", name: "Biología" },
  { id: "fis", name: "Física" },
  { id: "qui", name: "Química" },
];

/* ───────── Planes por asignatura (1 ramo) ─────────
   Copy breve y consistente para tarjetas individuales
*/
export const PAES_PLANS = PAES_SUBJECTS.map((s) => ({
  id: `plan-${s.id}`,
  title: s.name,
  tagline: "Comienza por 1 ramo (puedes sumar después)",
  subjectsIncluded: 1,
  subjects: [s.id],
  monthly: priceForCount(1),
  annual: priceAnnual(1),
  essaysPerMonth: essaysForCount(1),
  features: [
    "Clases en vivo + cápsulas",
    "1 ensayo/mes",
    "Material descargable",
    "Soporte por WhatsApp",
  ],
  // toques visuales suaves (opcionales en UI)
  badge: s.id === "his" ? "Impulsa Historia" : undefined,
  color: s.id === "his" ? "amber" : undefined,
}));

/* ───────── Combos estratégicos (copy claro) ───────── */
export const PAES_COMBOS = [
  // HUMANIDADES
  {
    id: "hum-duo",
    title: "Dúo Humanidades",
    tagline: "Lenguaje + Historia",
    subjects: ["len", "his"],
    monthly: priceForSubjects(["len", "his"]),
    annual: priceAnnualForSubjects(["len", "his"]),
    essaysPerMonth: essaysForCount(2),
    features: ["2 ramos", "Clases en vivo + cápsulas", "2 ensayos/mes"],
    badge: "Popular",
    color: "amber",
  },
  {
    id: "hum-trio",
    title: "Trío Humanidades",
    tagline: "Lenguaje + Historia + M1",
    subjects: ["len", "his", "m1"],
    monthly: priceForSubjects(["len", "his", "m1"]),
    annual: priceAnnualForSubjects(["len", "his", "m1"]),
    essaysPerMonth: essaysForCount(3),
    features: ["3 ramos", "Tutoría mensual", "3 ensayos/mes"],
    color: "indigo",
  },

  // STEM / CIENCIAS
  {
    id: "stem-basico",
    title: "STEM Básico",
    tagline: "M1 + Biología",
    subjects: ["m1", "bio"],
    monthly: priceForSubjects(["m1", "bio"]),
    annual: priceAnnualForSubjects(["m1", "bio"]),
    essaysPerMonth: essaysForCount(2),
    features: ["2 ramos", "2 ensayos/mes", "Material descargable"],
    color: "green",
  },
  {
    id: "stem-fuerte",
    title: "STEM Fuerte",
    tagline: "M1 + M2 + Física",
    subjects: ["m1", "m2", "fis"],
    monthly: priceForSubjects(["m1", "m2", "fis"]),
    annual: priceAnnualForSubjects(["m1", "m2", "fis"]),
    essaysPerMonth: essaysForCount(3),
    features: ["3 ramos", "Tutoría mensual", "3 ensayos/mes"],
    badge: "Recomendado",
    color: "green",
  },
  {
    id: "stem-quimica",
    title: "Ciencias con Química",
    tagline: "M1 + Química",
    subjects: ["m1", "qui"],
    monthly: priceForSubjects(["m1", "qui"]),
    annual: priceAnnualForSubjects(["m1", "qui"]),
    essaysPerMonth: essaysForCount(2),
    features: ["2 ramos", "2 ensayos/mes"],
    color: "rose",
  },

  // SALUD
  {
    id: "salud-trio",
    title: "Ruta Salud",
    tagline: "Biología + Química + M1",
    subjects: ["bio", "qui", "m1"],
    monthly: priceForSubjects(["bio", "qui", "m1"]),
    annual: priceAnnualForSubjects(["bio", "qui", "m1"]),
    essaysPerMonth: essaysForCount(3),
    features: ["3 ramos", "Tutoría mensual", "3 ensayos/mes"],
    color: "rose",
  },

  // COMPLETOS
  {
    id: "cuatro-equilibrado",
    title: "Cuatro Equilibrado",
    tagline: "Lenguaje + Historia + M1 + Biología",
    subjects: ["len", "his", "m1", "bio"],
    monthly: priceForSubjects(["len", "his", "m1", "bio"]),
    annual: priceAnnualForSubjects(["len", "his", "m1", "bio"]),
    essaysPerMonth: essaysForCount(4),
    features: ["4 ramos", "Tutoría mensual", "4 ensayos/mes"],
    color: "indigo",
  },
  {
    id: "full-5",
    title: "Full 5",
    tagline: "Lenguaje + M1 + Historia + 2 de Ciencias",
    subjects: ["len", "m1", "his", "bio", "qui"],
    monthly: priceForSubjects(["len", "m1", "his", "bio", "qui"]),
    annual: priceAnnualForSubjects(["len", "m1", "his", "bio", "qui"]),
    essaysPerMonth: essaysForCount(5),
    features: ["5 ramos", "Tutoría avanzada", "5 ensayos/mes"],
    badge: "Precio/valor",
    color: "indigo",
  },
  {
    id: "full-6",
    title: "Full 6",
    tagline: "Lenguaje + M1 + Historia + 3 de Ciencias",
    subjects: ["len", "m1", "his", "bio", "qui", "fis"],
    monthly: priceForSubjects(["len", "m1", "his", "bio", "qui", "fis"]),
    annual: priceAnnualForSubjects(["len", "m1", "his", "bio", "qui", "fis"]),
    essaysPerMonth: essaysForCount(6),
    features: ["6 ramos", "Tutoría avanzada", "6 ensayos/mes"],
    color: "indigo",
  },
  {
    id: "completo-7",
    title: "Completo 7",
    tagline: "Todos los ramos PAES",
    subjects: ["m1", "m2", "len", "his", "bio", "fis", "qui"],
    monthly: priceForSubjects(["m1", "m2", "len", "his", "bio", "fis", "qui"]),
    annual: priceAnnualForSubjects(["m1", "m2", "len", "his", "bio", "fis", "qui"]),
    essaysPerMonth: essaysForCount(7),
    features: ["7 ramos", "Tutoría avanzada", "7 ensayos/mes", "Soporte premium"],
    badge: "Máxima cobertura",
    color: "amber",
  },

  // INTENSIVOS (push Historia/Lenguaje)
  {
    id: "intensivo-historia",
    title: "Intensivo Historia",
    tagline: "Historia + Lenguaje",
    subjects: ["his", "len"],
    monthly: priceForSubjects(["his", "len"]),
    annual: priceAnnualForSubjects(["his", "len"]),
    essaysPerMonth: essaysForCount(2),
    features: ["2 ramos", "2 ensayos/mes", "Refuerzo crítico"],
    badge: "Dale fuerte a Historia",
    color: "amber",
  },
  {
    id: "intensivo-len-m1",
    title: "Intensivo Base",
    tagline: "Lenguaje + M1",
    subjects: ["len", "m1"],
    monthly: priceForSubjects(["len", "m1"]),
    annual: priceAnnualForSubjects(["len", "m1"]),
    essaysPerMonth: essaysForCount(2),
    features: ["2 ramos", "2 ensayos/mes"],
  },
];

/* ───────── Sugerencias rápidas (para selector simple) ───────── */
export const RECOMMENDED_BUNDLES = [
  { id: "his-len",  name: "Historia + Lenguaje", subjects: ["his", "len"] },
  { id: "his-m1",   name: "Historia + M1",       subjects: ["his", "m1"] },
  { id: "stem-fis", name: "M2 + Física",         subjects: ["m2", "fis"] },
  { id: "salud",    name: "Biología + Química",  subjects: ["bio", "qui"] },
];