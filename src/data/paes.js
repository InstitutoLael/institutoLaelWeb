// src/data/paes.js
/* ──────────────────────────────────────────────────────────────────────────
   PAES — Única fuente de verdad (2026) - ESTRATEGIA EQUILIBRIO (Volumen + Sueldo Profe)
   
   Estrategia de Precios:
   - Base: $6.990 (Permite pagar $2.000/alumno al profe y deja margen)
   - Pack 5 Ramos: Queda en aprox $26.000 (Súper competitivo vs competencia)
   - Matrícula: Baja ($4.990) para reducir fricción de entrada.
   ────────────────────────────────────────────────────────────────────────── */

// 🔢 CLP formatter (reutilizable en componentes)
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

// 📅 Parámetros de anualidad académica (mar–oct: 8 meses)
export const ACADEMIC_MONTHS = 8; 
export const ACADEMIC_PERIOD_LABEL = "marzo a octubre"; 

// 🧾 Matrícula obligatoria (pago único)
// BAJADA A $4.990 para eliminar barrera de entrada
export const ENROLLMENT_FEE = 4990;

/**
 * 💵 Precio base por ramo/mes
 * ANTES: 8.990 (Muy caro, espanta alumnos)
 * AHORA: 6.990 (Equilibrio perfecto para pagar $2.000 al profe)
 */
export const PER_SUBJECT_MONTHLY = 6990;

/**
 * 🔻 Descuentos por cantidad de ramos (graduales)
 * Aumentados para premiar el Pack Full y asegurar volumen
 */
export const DISCOUNTS_BY_COUNT = [
  { min: 5, rate: 0.25 }, // 25% OFF (El Pack de 5 queda muy atractivo)
  { min: 4, rate: 0.20 }, // 20% OFF 
  { min: 3, rate: 0.15 }, // 15% OFF
  { min: 2, rate: 0.10 }, // 10% OFF
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
  tagline: "Ramo Individual",
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
  badge: s.id === "m1" ? "Base Fundamental" : undefined,
  color: "slate", 
}));

/* ───────── Combos estratégicos (SIMPLIFICADOS Y OPTIMIZADOS) ───────── 
   Menos opciones = Más ventas.
*/
export const PAES_COMBOS = [
  // 1. EL GANCHO ECONÓMICO (Humanista)
  {
    id: "hum-duo",
    title: "Pack Humanista",
    tagline: "Lenguaje + Historia",
    subjects: ["len", "his"],
    monthly: priceForSubjects(["len", "his"]), // ~$12.580 (Súper pagable)
    annual: priceAnnualForSubjects(["len", "his"]),
    essaysPerMonth: essaysForCount(2),
    features: ["2 ramos", "Clases en vivo + cápsulas", "2 ensayos/mes"],
    badge: "Económico",
    color: "amber",
  },

  // 2. EL CIENTÍFICO BÁSICO
  {
    id: "stem-basico",
    title: "Pack Ciencias",
    tagline: "M1 + Biología (o Física/Química)",
    subjects: ["m1", "bio"],
    monthly: priceForSubjects(["m1", "bio"]),
    annual: priceAnnualForSubjects(["m1", "bio"]),
    essaysPerMonth: essaysForCount(2),
    features: ["2 ramos", "2 ensayos/mes", "Material descargable"],
    color: "green",
  },

  // 3. EL RECOMENDADO (3 Ramos)
  {
    id: "trio-fundamental",
    title: "Trío Fundamental",
    tagline: "M1 + Lenguaje + Historia",
    subjects: ["len", "his", "m1"],
    monthly: priceForSubjects(["len", "his", "m1"]), // ~$17.800
    annual: priceAnnualForSubjects(["len", "his", "m1"]),
    essaysPerMonth: essaysForCount(3),
    features: ["3 ramos", "Tutoría mensual", "3 ensayos/mes"],
    badge: "Recomendado",
    color: "indigo",
  },

  // 4. LA ESTRELLA: FULL 5 RAMOS
  {
    id: "full-5",
    title: "Full 5 Ramos",
    tagline: "Lenguaje + M1 + Historia + 2 de Ciencias",
    subjects: ["len", "m1", "his", "bio", "qui"], // Ejemplo configurable
    monthly: priceForSubjects(["len", "m1", "his", "bio", "qui"]), // ~$26.200
    annual: priceAnnualForSubjects(["len", "m1", "his", "bio", "qui"]),
    essaysPerMonth: essaysForCount(5),
    features: ["5 ramos", "Tutoría avanzada", "5 ensayos/mes", "Soporte 24/7"],
    badge: "Mejor Precio/Valor",
    color: "rose",
  },

  // 5. PARA EL QUE QUIERE TODO (7 Ramos)
  {
    id: "completo-7",
    title: "Plan Maestro (7 Ramos)",
    tagline: "Todos los ramos PAES",
    subjects: ["m1", "m2", "len", "his", "bio", "fis", "qui"],
    monthly: priceForSubjects(["m1", "m2", "len", "his", "bio", "fis", "qui"]),
    annual: priceAnnualForSubjects(["m1", "m2", "len", "his", "bio", "fis", "qui"]),
    essaysPerMonth: essaysForCount(7),
    features: ["7 ramos", "Tutoría avanzada", "7 ensayos/mes", "Soporte premium"],
    badge: "Máxima cobertura",
    color: "violet",
  },
];

/* ───────── Sugerencias rápidas (para selector simple) ───────── */
export const RECOMMENDED_BUNDLES = [
  { id: "his-len",  name: "Historia + Lenguaje", subjects: ["his", "len"] },
  { id: "his-m1",   name: "Historia + M1",       subjects: ["his", "m1"] },
  { id: "stem-fis", name: "M2 + Física",         subjects: ["m2", "fis"] },
  { id: "salud",    name: "Biología + Química",  subjects: ["bio", "qui"] },
];