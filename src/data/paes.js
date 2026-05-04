// src/data/paes.js
// === Sistema de Alto Rendimiento PAES Lael ===

/* ──────────────────────────────────────────────────────────────────────────
   1. CONFIGURACIÓN FINANCIERA Y BASE
   ────────────────────────────────────────────────────────────────────────── */

export const ENROLLMENT_FEE = 10990;
export const ACADEMIC_MONTHS = 8;

export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

/* ──────────────────────────────────────────────────────────────────────────
   2. EL CEREBRO: CALCULADORA DE INVERSIÓN
   ────────────────────────────────────────────────────────────────────────── */

export function computePaesPrice(selectedIds = []) {
  const count = selectedIds.length;

  const TIER_PRICES = {
    1: 14990,
    2: 24990,
    3: 34990,
    FULL: 44990
  };

  let totalMonthly = 0;
  let label = "";
  let saving = 0;

  if (count === 0) {
    totalMonthly = 0;
    label = "Configura tu Sistema";
  } else if (count === 1) {
    totalMonthly = TIER_PRICES[1];
    label = "Módulo de Especialización";
  } else if (count === 2) {
    totalMonthly = TIER_PRICES[2];
    label = "Estrategia Dual";
    saving = (TIER_PRICES[1] * 2) - TIER_PRICES[2];
  } else if (count === 3) {
    totalMonthly = TIER_PRICES[3];
    label = "Estrategia de Alto Impacto";
    saving = (TIER_PRICES[1] * 3) - TIER_PRICES[3];
  } else {
    totalMonthly = TIER_PRICES.FULL;
    label = "🏆 Sistema Integral de Rendimiento";
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

export const priceForSubjects = (ids) => computePaesPrice(ids).totalMonthly;
export const priceForCount = (count) => computePaesPrice(Array(count).fill(0)).totalMonthly;

/* ──────────────────────────────────────────────────────────────────────────
   3. MÓDULOS DE ENTRENAMIENTO (DATA DETALLADA)
   ────────────────────────────────────────────────────────────────────────── */
export const PAES_SUBJECTS = [
  {
    id: "m1",
    name: "Matemática M1",
    category: "Prueba Obligatoria",
    icon: "📐",
    color: "#C6A66B",
    desc: "Resolución de problemas, razonamiento lógico y tácticas de puntaje máximo.",
    hoursPerWeek: 3
  },
  {
    id: "len",
    name: "Competencia Lectora",
    category: "Prueba Obligatoria",
    icon: "📚",
    color: "#C6A66B",
    desc: "Comprensión, análisis e interpretación de textos bajo presión de tiempo.",
    hoursPerWeek: 3
  },
  {
    id: "m2",
    name: "Matemática M2",
    category: "Prueba Electiva",
    icon: "🚀",
    color: "#C6A66B",
    desc: "Profundización matemática para carreras STEM de alta selectividad.",
    hoursPerWeek: 2
  },
  {
    id: "his",
    name: "Historia y Ciencias Sociales",
    category: "Prueba Electiva",
    icon: "🏛️",
    color: "#C6A66B",
    desc: "Análisis histórico, procesos sociales y dominio de la prueba humanista.",
    hoursPerWeek: 2
  },
  {
    id: "bio",
    name: "Ciencias — Biología",
    category: "Prueba Electiva",
    icon: "🧬",
    color: "#C6A66B",
    desc: "Comprensión sistémica del mundo natural enfocada en el modelo PAES.",
    hoursPerWeek: 2
  },
  {
    id: "fis",
    name: "Ciencias — Física",
    category: "Prueba Electiva",
    icon: "⚡",
    color: "#C6A66B",
    desc: "Mecánica y energía aplicada a la resolución de problemas bajo presión.",
    hoursPerWeek: 2
  },
  {
    id: "qui",
    name: "Ciencias — Química",
    category: "Prueba Electiva",
    icon: "🧪",
    color: "#C6A66B",
    desc: "Dominio de la materia y sus interacciones para maximizar tu puntaje.",
    hoursPerWeek: 2
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   4. ESTRATEGIAS DE RENDIMIENTO
   ────────────────────────────────────────────────────────────────────────── */
export const PAES_COMBOS = [
  {
    id: "combo-humanista",
    title: "Estrategia Humanista Premium",
    subtitle: "Comprensión Lectora + Perspectiva Histórica + M1",
    subjects: ["len", "his", "m1"], 
    price: 34990,
    color: "amber",
    tag: "Alto Rendimiento",
    features: ["Acompañamiento Táctico", "Módulo de Filosofía Incan", "Simulacros de Presión", "Feedback en Tiempo Real"],
    paymentUrl: "" 
  },
  {
    id: "combo-cientifico",
    title: "Estrategia STEM Avanzada",
    subtitle: "M1 + M2 + Ciencias Específicas",
    subjects: ["m1", "m2", "bio", "fis"], 
    price: 34990,
    color: "teal",
    tag: "Selectivo",
    features: ["Enfoque 100% Lógico", "Resolución de Alta Complejidad", "Preparación M2 Intensiva", "Simulacros de Presión"],
    paymentUrl: "" 
  },
  {
    id: "combo-full",
    title: "Sistema Integral Lael",
    subtitle: "Dominio absoluto para asegurar tu objetivo",
    subjects: ["len", "m1", "m2", "his", "bio"],
    price: 44990,
    color: "indigo",
    features: ["Acceso a Todo el Sistema", "Orientación Estratégica Vocacional", "Manejo Táctico de Ansiedad", "Seguimiento Diario"],
    paymentUrl: "" 
  }
];

/* ──────────────────────────────────────────────────────────────────────────
   5. VALOR AGREGADO (LO QUE INCLUYE SIEMPRE)
   ────────────────────────────────────────────────────────────────────────── */
export const PAES_FEATURES = [
  { title: "Entorno de Alto Rendimiento", desc: "Infraestructura digital premium y contenido cinemático disponible 24/7.", icon: "💻" },
  { title: "Simulacros de Presión", desc: "Entrenamientos bajo condiciones reales para destruir la ansiedad en la prueba.", icon: "📝" },
  { title: "Mentores Tácticos", desc: "No son profesores, son expertos en estrategia que corrigen tu trayectoria en tiempo real.", icon: "📱" },
  { title: "Estrategia de Ingreso", desc: "Análisis de ponderaciones y rutas tácticas para asegurar tu carrera objetivo.", icon: "🎯" }
];

export const PAES_FAQS = [
  {
    q: "¿Cuándo inicia el entrenamiento?",
    a: "El sistema inicia la primera semana de Abril, pero tu diagnóstico de precisión y nivelación comienzan en el momento en que postulas.",
  },
  {
    q: "¿Las sesiones son grabadas?",
    a: "Las sesiones son dinámicas y en vivo, enfocadas en la resolución de problemas. Toda sesión estratégica queda respaldada en el sistema.",
  }
];

/* ──────────────────────────────────────────────────────────────────────────
   6. DATOS DE CONTENIDO
   ────────────────────────────────────────────────────────────────────────── */
export const PAES_SYLLABUS = {
  m1: [
    "Patrones Numéricos y Operatoria Estratégica.",
    "Modelamiento Algebraico de Problemas Complejos.",
    "Visualización Espacial y Geometría.",
    "Análisis de Datos y Toma de Decisiones."
  ],
  len: [
    "Decodificación de Textos Literarios.",
    "Análisis Argumentativo y Medios Masivos.",
    "Inferencia Avanzada y Contexto.",
    "Estrategias de Descarte Rápido."
  ]
};

export const PAES_COMPARISON = [
  { feature: "Enfoque Principal", lael: "Sistema Estratégico de Rendimiento", other: "Clases Tradicionales", tutor: "Resolución de Dudas" },
  { feature: "Ambiente Visual", lael: "Premium & Cinemático", other: "Escolar / Básico", tutor: "N/A" },
  { feature: "Simulacros de Presión", lael: "Semanal", other: "Mensual", tutor: "No incluído" },
  { feature: "Mentores Tácticos", lael: "Feedback Inmediato", other: "Respuestas lentas", tutor: "Depende de la tarifa" },
  { feature: "Orientación Vocacional", lael: "Estrategia de Ponderación", other: "Charlas Genéricas", tutor: "No incluído" },
];