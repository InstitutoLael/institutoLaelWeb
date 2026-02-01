// src/data/idiomas.js

/* ──────────────────────────────────────────────────────────────────────────
   1. CONFIGURACIÓN DE NEGOCIO (PRECIOS)
   ────────────────────────────────────────────────────────────────────────── */

export const ENROLLMENT_FEE = 10990; // Matrícula única
export const ACADEMIC_MONTHS = 9;    // Marzo a Diciembre

/**
 * 🔢 Formateador de CLP
 * Uso: clp(17990) -> "$17.990"
 */
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

/**
 * 🧠 MOTOR DE BUNDLES (DESCUENTOS POR CANTIDAD)
 * Lógica: 
 * 1 Idioma: $17.990 | 2 Idiomas: $32.990 | 3+ Idiomas: $45.990
 */
export function computeLangBundle(countSelected) {
  const count = Math.max(0, Number(countSelected || 0));

  const PRICES = {
    SINGLE: 24990,
    DUO: 39990,
    POLYGLOT: 54990
  };

  let totalMonthly = 0;
  let label = "";
  let saving = 0;

  if (count === 0) {
    totalMonthly = 0;
    label = "Selecciona tus idiomas";
  } else if (count === 1) {
    totalMonthly = PRICES.SINGLE;
    label = "Plan Mensual (1 Idioma)";
  } else if (count === 2) {
    totalMonthly = PRICES.DUO;
    label = "Plan Dúo (Ahorro)";
    saving = (PRICES.SINGLE * 2) - PRICES.DUO;
  } else {
    totalMonthly = PRICES.POLYGLOT;
    label = "Plan Políglota (Tarifa Plana)";
    saving = (PRICES.SINGLE * count) - PRICES.POLYGLOT;
  }

  return {
    count,
    label,
    totalMonthly,
    saving,
    enrollment: ENROLLMENT_FEE,
    totalFirstMonth: totalMonthly + ENROLLMENT_FEE,
    pricePerLanguage: count > 0 ? Math.round(totalMonthly / count) : 0
  };
}

/* ──────────────────────────────────────────────────────────────────────────
   2. CATÁLOGO DE IDIOMAS (DATA)
   ────────────────────────────────────────────────────────────────────────── */
export const LANGUAGES = [
  {
    id: "plan-ingles",
    name: "English Booster",
    emoji: "🇺🇸",
    color: "#3b82f6", // Blue
    badge: "Más Vendido",
    summary: "Entrenamiento dinámico para el mundo real. Olvida la gramática aburrida y empieza a hablar desde el primer día.",
    features: [
      "Preparación certificaciones (IELTS/TOEFL)",
      "Enfoque en Business English & Tech",
      "Club de conversación semanal incluido"
    ],
    levels: ["A1 (Básico)", "A2", "B1", "B2 (Avanzado)"],
    comingSoon: false,
    paymentUrl: "https://www.mercadopago.cl/checkout/v1/redirect?pref_id=placeholder-ingles"
  },
  {
    id: "plan-coreano",
    name: "Coreano + Cultura",
    emoji: "🇰🇷",
    color: "#ec4899", // Pink
    badge: "Tendencia K-Pop",
    summary: "Aprende Hangul y gramática coreana mientras analizas tus K-Dramas y canciones favoritas.",
    features: [
      "Lectura y escritura Hangul en 4 sesiones",
      "Protocolo y etiqueta coreana",
      "Preparación examen oficial TOPIK"
    ],
    levels: ["Nivel 1 (Inicial)", "Nivel 2", "Nivel 3"],
    comingSoon: false,
    paymentUrl: "https://www.mercadopago.cl/checkout/v1/redirect?pref_id=placeholder-coreano"
  },
  {
    id: "plan-espanol",
    name: "Spanish for Expats",
    emoji: "🇨🇱",
    color: "#f59e0b", // Amber
    badge: "Inserción Local",
    summary: "Practical Spanish for everyday life in Chile. Focused on work, residency paperwork, and local culture.",
    features: [
      "Survival Chilean slang & idioms",
      "Job interview preparation",
      "Administrative support (Migración)"
    ],
    levels: ["A1 (Survival)", "A2", "B1 (Fluent)"],
    comingSoon: false,
    paymentUrl: "https://www.mercadopago.cl/checkout/v1/redirect?pref_id=placeholder-espanol"
  }
];

/* ──────────────────────────────────────────────────────────────────────────
   3. INFO EXTRA PARA LA UI (FAQ/VENTAJAS)
   ────────────────────────────────────────────────────────────────────────── */
export const LANG_FEATURES = [
  { title: "Clases en Vivo", desc: "Nada de videos grabados. Interactúa con tu profesor en tiempo real.", icon: "🎥" },
  { title: "Grupos Reducidos", desc: "Máximo 10-12 alumnos por sección para asegurar tu aprendizaje.", icon: "👥" },
  { title: "Certificado Lael", desc: "Obtén un certificado que avale tus horas de estudio al finalizar el nivel.", icon: "📜" }
];

/* ──────────────────────────────────────────────────────────────────────────
   4. SYLLABUS PREVIEW (Lo que aprenderás)
   ────────────────────────────────────────────────────────────────────────── */
export const SYLLABUS_PREVIEW = {
  ingles: [
    { level: "A1-A2", topics: ["Presentaciones y 'Small Talk'", "Survival English para Viajes", "Pronunciación: TH, R, V vs B"] },
    { level: "B1-B2", topics: ["Inglés para Negocios (Emails/Meetings)", "Debate y Argumentación", "Phrasal Verbs esenciales"] }
  ],
  coreano: [
    { level: "Nivel 1", topics: ["Hangul: Lectura y Escritura", "Saludos y Etiqueta Coreana", "Estructura de Oración SOV"] },
    { level: "Nivel 2", topics: ["Partículas Complejas", "Vocabulario de K-Dramas", "Números Sino-Coreanos vs Nativos"] }
  ],
  espanol: [
    { level: "Survival", topics: ["RUT & Visas: Vocabulary", "Chilean Slang (Weón, Cachái)", "Navigating Santiago Metro"] },
    { level: "Business", topics: ["Formal vs Informal Register", "Job Interviews in Chile", "Writing Reports"] }
  ]
};

/* ──────────────────────────────────────────────────────────────────────────
   5. COMPARATIVE CHART
   ────────────────────────────────────────────────────────────────────────── */
export const COMPARISON_DATA = [
  { feature: "Clases en Vivo", lael: true, app: false, institute: true },
  { feature: "Corrección de Pronunciación", lael: "En tiempo real", app: "IA Básica", institute: "Grupal" },
  { feature: "Enfoque Cultural", lael: true, app: false, institute: "A veces" },
  { feature: "Comunidad/Club", lael: "Incluido", app: "No", institute: "Pago extra" },
  { feature: "Precio Mensual", lael: "$17.990", app: "$9.000", institute: "$95.000+" }
];

/* ──────────────────────────────────────────────────────────────────────────
   6. TEACHERS (Expertos)
   ────────────────────────────────────────────────────────────────────────── */
export const TEACHERS_LIST = [
  { name: "Javiera", origin: "🇺🇸", role: "Head of English", bio: "Especialista en reducción de acento.", img: "👩🏼‍🏫" },
  { name: "Fernanda", origin: "🇰🇷", role: "Lead Korean Tutor", bio: "Enseña con K-Pop y situaciones de la vida real.", img: "👩🏻‍🏫" },
  { name: "Diego", origin: "🇨🇱", role: "Spanish Coach", bio: "Lingüista experto en dialectología chilena.", img: "👨🏻‍🏫" }
];