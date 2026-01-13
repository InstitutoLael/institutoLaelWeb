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
    SINGLE: 17990,
    DUO: 32990,
    POLYGLOT: 45990
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
    id: "ingles",
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
  },
  {
    id: "coreano",
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
  },
  {
    id: "espanol",
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
  },
  {
    id: "japones",
    name: "Japonés Nihongo",
    emoji: "🇯🇵",
    color: "#dc2626", // Red
    badge: "Próximamente",
    summary: "Un viaje a través del Hiragana, Katakana y el fascinante mundo de los Kanji. Ideal para fans del anime y cultura nipona.",
    features: [
      "Escritura y caligrafía básica",
      "Preparación examen JLPT N5",
      "Cultura y tradiciones"
    ],
    levels: ["Inicial N5", "Básico N4"],
    comingSoon: true,
  },
  {
    id: "portugues",
    name: "Portugués Brasil",
    emoji: "🇧🇷",
    color: "#22c55e", // Green
    badge: "Próximamente",
    summary: "Aprende el idioma más alegre del mundo. Enfocado en turismo, negocios en Latinoamérica y fluidez comunicativa.",
    features: [
      "Pronunciación y ritmo brasileño",
      "Portugués para negocios",
      "Diferencias con el español"
    ],
    levels: ["A1/A2 (Iniciación)", "B1 (Fluidez)"],
    comingSoon: true,
  },
  {
    id: "chino",
    name: "Mandarín Negocios",
    emoji: "🇨🇳",
    color: "#ef4444", // Light Red
    badge: "Próximamente",
    summary: "Domina el idioma con mayor proyección comercial del mundo. Enfoque en tonos, pinyin y caracteres clave.",
    features: [
      "Sistema de tonos simplificado",
      "Vocabulario de importaciones",
      "Preparación examen HSK"
    ],
    levels: ["HSK 1", "HSK 2"],
    comingSoon: true,
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