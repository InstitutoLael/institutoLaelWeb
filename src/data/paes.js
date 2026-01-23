// src/data/paes.js
// === Preuniversitario Lael 2026: Estrategia de Volumen y Resultados ===

/* ──────────────────────────────────────────────────────────────────────────
   1. CONFIGURACIÓN FINANCIERA Y BASE
   ────────────────────────────────────────────────────────────────────────── */

export const ENROLLMENT_FEE = 10990;
export const ACADEMIC_MONTHS = 8; // Abril a Noviembre (Intensivo)

export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

/* ──────────────────────────────────────────────────────────────────────────
   2. EL CEREBRO: CALCULADORA DE PRECIOS
   ────────────────────────────────────────────────────────────────────────── */

/**
 * Calcula el total mensual basado en la cantidad de ramos.
 * M1 y Lenguaje son los pilares, los demás son complementos estratégicos.
 */
export function computePaesPrice(selectedIds = []) {
  const count = selectedIds.length;

  const TIER_PRICES = {
    1: 14990,
    2: 24990,
    3: 34990,
    FULL: 44990 // 4 o más ramos
  };

  let totalMonthly = 0;
  let label = "";
  let saving = 0;

  if (count === 0) {
    totalMonthly = 0;
    label = "Selecciona tus ramos";
  } else if (count === 1) {
    totalMonthly = TIER_PRICES[1];
    label = "Plan Monoramo";
  } else if (count === 2) {
    totalMonthly = TIER_PRICES[2];
    label = "Plan Dúo Dinámico";
    saving = (TIER_PRICES[1] * 2) - TIER_PRICES[2];
  } else if (count === 3) {
    totalMonthly = TIER_PRICES[3];
    label = "Plan Trío Fundamental";
    saving = (TIER_PRICES[1] * 3) - TIER_PRICES[3];
  } else {
    totalMonthly = TIER_PRICES.FULL;
    label = "🏆 Plan Full Intensivo (Tarifa Plana)";
    saving = (TIER_PRICES[1] * count) - TIER_PRICES.FULL;
  }

  return {
    count,
    label,
    totalMonthly,
    saving,
    enrollment: ENROLLMENT_FEE,
    totalFirstMonth: totalMonthly + ENROLLMENT_FEE,
    pricePerSubject: count > 0 ? Math.round(totalMonthly / count) : 0
  };
}

// Adaptadores para la UI
export const priceForSubjects = (ids) => computePaesPrice(ids).totalMonthly;
export const priceForCount = (count) => computePaesPrice(Array(count).fill(0)).totalMonthly;

/* ──────────────────────────────────────────────────────────────────────────
   3. CATÁLOGO DE ASIGNATURAS (DATA DETALLADA)
   ────────────────────────────────────────────────────────────────────────── */
export const PAES_SUBJECTS = [
  {
    id: "m1",
    name: "Matemática M1",
    category: "Obligatorio",
    icon: "📐",
    color: "#3b82f6",
    desc: "Base fundamental para todas las carreras. Números, Álgebra, Geometría y Datos.",
    hoursPerWeek: 3
  },
  {
    id: "len",
    name: "Comprensión Lectora",
    category: "Obligatorio",
    icon: "📚",
    color: "#f97316",
    desc: "Estrategias críticas para textos literarios y no literarios. Vocabulario en contexto.",
    hoursPerWeek: 3
  },
  {
    id: "m2",
    name: "Matemática M2",
    category: "Electivo Especializado",
    icon: "🚀",
    color: "#8b5cf6",
    desc: "Contenido avanzado para carreras STEM (Ingenierías, Ciencias, salud técnica).",
    hoursPerWeek: 2
  },
  {
    id: "his",
    name: "Historia y Cs. Sociales",
    category: "Electivo",
    icon: "🏛️",
    color: "#a855f7",
    desc: "Historia de Chile y el Mundo, Formación Ciudadana y Economía.",
    hoursPerWeek: 2
  },
  {
    id: "bio",
    name: "Ciencias - Biología",
    category: "Ciencias",
    icon: "🧬",
    color: "#10b981",
    desc: "Célula, Herencia, Ecosistemas y Procesos Biológicos Humanos.",
    hoursPerWeek: 2
  },
  {
    id: "fis",
    name: "Ciencias - Física",
    category: "Ciencias",
    icon: "⚡",
    color: "#ef4444",
    desc: "Mecánica, Energía, Ondas, Electricidad y Magnetismo.",
    hoursPerWeek: 2
  },
  {
    id: "qui",
    name: "Ciencias - Química",
    category: "Ciencias",
    icon: "🧪",
    color: "#06b6d4",
    desc: "Estructura Atómica, Química Orgánica y Estequiometría.",
    hoursPerWeek: 2
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   4. COMBOS PRE-ARMADOS (VENTA RÁPIDA)
   ────────────────────────────────────────────────────────────────────────── */
export const PAES_COMBOS = [
  {
    id: "humanista",
    title: "Pack Humanista",
    subtitle: "Para Derecho, Psicología o Artes",
    subjects: ["len", "his", "m1"],
    price: 27990,
    color: "amber",
    features: ["M1 + Lenguaje + Historia", "Ensayos semanales", "Taller de ansiedad"]
  },
  {
    id: "salud",
    title: "Pack Salud",
    subtitle: "Para Medicina o Enfermería",
    subjects: ["len", "m1", "m2", "bio", "qui"],
    price: 34990,
    color: "teal",
    tag: "Más Completo",
    features: ["Plan Full (5 Ramos)", "Biología + Química intensivo", "Preparación M2"]
  },
  {
    id: "ingenieria",
    title: "Pack Ingeniería",
    subtitle: "Para Civiles y Ciencias Exactas",
    subjects: ["len", "m1", "m2", "fis"],
    price: 34990,
    color: "indigo",
    features: ["Física + M1 + M2", "Estrategias de rapidez", "Foco en resolución"]
  }
];

/* ──────────────────────────────────────────────────────────────────────────
   5. VALOR AGREGADO (LO QUE INCLUYE SIEMPRE)
   ────────────────────────────────────────────────────────────────────────── */
export const PAES_FEATURES = [
  { title: "Plataforma 24/7", desc: "Clases grabadas y guías descargables en cualquier momento.", icon: "💻" },
  { title: "Ensayos Ilimitados", desc: "Simulacros con tiempo real y corrección automática.", icon: "📝" },
  { title: "Tutorías Personalizadas", desc: "Resolución de dudas vía WhatsApp con profesores reales.", icon: "📱" },
  { title: "Orientación Vocacional", desc: "Charlas sobre becas, gratuidad y postulación universitaria.", icon: "🎯" }
];

export const PAES_FAQS = [
  {
    q: "¿Cuándo comienzan las clases?",
    a: "Nuestro ciclo principal inicia la primera semana de Abril, pero tienes acceso a material nivelatorio apenas te inscribes.",
  },
  {
    q: "¿Las clases son en vivo?",
    a: "Sí, todas las clases son vía Zoom en vivo para que preguntes lo que quieras. Si no puedes asistir, quedan grabadas.",
  },
  {
  }
];

/* ──────────────────────────────────────────────────────────────────────────
   6. DATOS DE CONTENIDO (SYLLABUS & COMPARATIVA)
   ────────────────────────────────────────────────────────────────────────── */
export const PAES_SYLLABUS = {
  m1: [
    "Números: Racionales, Potencias y Raíces.",
    "Álgebra: Ecuaciones, Inecuaciones y Sistemas.",
    "Geometría: Figuras 2D, 3D y Vectores.",
    "Datos y Azar: Probabilidades y Estadística Descriptiva."
  ],
  len: [
    "Textos Literarios: Narrativa y Dramática.",
    "Textos No Literarios: Medios Masivos y Argumentación.",
    "Vocabulario Contextual y Plan de Redacción.",
    "Lectura Crítica e Inferencial."
  ]
};

export const PAES_COMPARISON = [
  { feature: "Clases en Vivo", lael: true, other: true, tutor: true },
  { feature: "Grabaciones 4K", lael: true, other: false, tutor: false },
  { feature: "Ensayo Semanal", lael: true, other: "Mensual", tutor: "No incluído" },
  { feature: "Corrección con IA", lael: true, other: false, tutor: false },
  { feature: "Orientación Vocacional", lael: true, other: false, tutor: false },
  { feature: "Precio Mensual Promedio", lael: "$27.990", other: "$85.000", tutor: "$160.000" },
];