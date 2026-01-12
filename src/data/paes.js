// src/data/paes.js

/* ──────────────────────────────────────────────────────────────────────────
   PAES 2026 — ESTRATEGIA FINANCIERA "SUELDO DIGNO + CAJA"
   
   Objetivo: Pagar $3.000 por alumno/ramo al docente y mantener rentabilidad.
   ────────────────────────────────────────────────────────────────────────── */

// 🔢 Helper de Moneda
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

// 📅 Calendario Académico 2026
export const ACADEMIC_MONTHS = 8; // Abril - Noviembre (aprox)
export const ACADEMIC_PERIOD_LABEL = "temporada 2026"; 

// 🧾 Matrícula
export const ENROLLMENT_FEE = 5990;

/**
 * 💵 PRECIO BASE POR RAMO INDIVIDUAL
 */
export const PER_SUBJECT_MONTHLY = 6990;

/**
 * 🔻 ESCALA DE DESCUENTOS POR VOLUMEN
 */
export const DISCOUNTS_BY_COUNT = [
  { min: 5, rate: 0.25 }, // 5+ Ramos: 25% OFF
  { min: 4, rate: 0.20 }, // 4 Ramos: 20% OFF
  { min: 3, rate: 0.15 }, // 3 Ramos: 15% OFF
  { min: 2, rate: 0.10 }, // 2 Ramos: 10% OFF
];

// 📝 Ensayos incluidos por ramo
export const ESSAYS_PER_SUBJECT_PER_MONTH = 1;

// 🎯 Redondeo a decenas
const friendlyRound10 = (n) => Math.round(n / 10) * 10;

/* --- MOTORES DE CÁLCULO --- */

function discountFor(count) {
  return DISCOUNTS_BY_COUNT.find((x) => count >= x.min)?.rate ?? 0;
}

function clampCount(n) {
  return Math.max(1, Math.min(7, Number(n || 0)));
}

// 💰 Precio Mensual Final
export function priceForCount(count) {
  const c = clampCount(count);
  const d = discountFor(c);
  const base = PER_SUBJECT_MONTHLY * c;
  return friendlyRound10(Math.round(base * (1 - d)));
}

export function essaysForCount(count) {
  return clampCount(count) * ESSAYS_PER_SUBJECT_PER_MONTH;
}

export function priceForSubjects(subjectIds = []) {
  return priceForCount((subjectIds || []).length);
}

export function priceAnnual(count, months = ACADEMIC_MONTHS) {
  return priceForCount(count) * Math.max(1, Number(months || ACADEMIC_MONTHS));
}

export function priceAnnualForSubjects(subjectIds = [], months = ACADEMIC_MONTHS) {
  return priceAnnual((subjectIds || []).length, months);
}

/* ──────────────────────────────────────────────────────────────────────────
   CATÁLOGO DE RAMOS
   ────────────────────────────────────────────────────────────────────────── */
export const PAES_SUBJECTS = [
  { id: "m1",  name: "Matemática M1", icon: "📐" },
  { id: "m2",  name: "Matemática M2", icon: "🚀" },
  { id: "len", name: "Comprensión Lectora", icon: "📚" },
  { id: "his", name: "Historia", icon: "🏛️" },
  { id: "bio", name: "Biología", icon: "🧬" },
  { id: "fis", name: "Física", icon: "⚡" },
  { id: "qui", name: "Química", icon: "🧪" },
];

/* ──────────────────────────────────────────────────────────────────────────
   PACKS ESTRATÉGICOS (COMBOS 2026)
   ────────────────────────────────────────────────────────────────────────── */
export const PAES_COMBOS = [
  // 1. EL PACK BÁSICO (Humanista)
  {
    id: "hum-duo",
    title: "Pack Humanista",
    tagline: "Lenguaje + Historia",
    subjects: ["len", "his"],
    monthly: priceForSubjects(["len", "his"]), 
    annual: priceAnnualForSubjects(["len", "his"]),
    essaysPerMonth: essaysForCount(2),
    features: ["Clases en vivo", "2 Ensayos al mes", "Material PDF"],
    badge: "Económico",
    color: "amber",
  },

  // 2. EL PACK CIENCIAS
  {
    id: "stem-basico",
    title: "Pack Ciencias",
    tagline: "M1 + 1 Ciencia a elección",
    subjects: ["m1", "bio"], 
    monthly: priceForSubjects(["m1", "bio"]),
    annual: priceAnnualForSubjects(["m1", "bio"]),
    essaysPerMonth: essaysForCount(2),
    features: ["Enfoque práctico", "Resolución de guías", "Grabaciones HD"],
    color: "green",
  },

  // 3. EL PACK FUNDAMENTAL (3 Ramos)
  {
    id: "trio-fundamental",
    title: "Trío Fundamental",
    tagline: "M1 + Lenguaje + Historia (o Ciencia)",
    subjects: ["len", "his", "m1"],
    monthly: priceForSubjects(["len", "his", "m1"]),
    annual: priceAnnualForSubjects(["len", "his", "m1"]),
    essaysPerMonth: essaysForCount(3),
    features: ["Los 3 obligatorios", "Tutoría grupal", "3 Ensayos al mes"],
    badge: "Equilibrado",
    color: "indigo",
  },

  // 4. EL PLAN ESTRELLA (Full 5 Ramos)
  {
    id: "full-5",
    title: "Pack Full 5",
    tagline: "Prepara la prueba completa sin estrés",
    subjects: ["len", "m1", "his", "bio", "qui"], 
    monthly: priceForSubjects(["len", "m1", "his", "bio", "qui"]), 
    annual: priceAnnualForSubjects(["len", "m1", "his", "bio", "qui"]),
    essaysPerMonth: essaysForCount(5),
    features: ["5 Ramos a elección", "Orientación Vocacional", "Ensayo Masivo Mensual", "Soporte 24/7"],
    badge: "Recomendado 2026",
    color: "rose",
  },

  // 5. EL PLAN MAESTRO (7 Ramos)
  {
    id: "completo-7",
    title: "Plan Medicina (7)",
    tagline: "Para puntajes nacionales",
    subjects: ["m1", "m2", "len", "his", "bio", "fis", "qui"],
    monthly: priceForSubjects(["m1", "m2", "len", "his", "bio", "fis", "qui"]),
    annual: priceAnnualForSubjects(["m1", "m2", "len", "his", "bio", "fis", "qui"]),
    essaysPerMonth: essaysForCount(7),
    features: ["Todo incluido", "Tutoría M2 Exclusiva", "Feedback personalizado"],
    badge: "Máxima Exigencia",
    color: "violet",
  },
];