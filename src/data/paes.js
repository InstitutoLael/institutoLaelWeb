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

  // El modelo ahora es 100% gratuito
  const TIER_PRICES = {
    1: 0,
    2: 0,
    3: 0,
    FULL: 0
  };

  let totalMonthly = 0;
  let label = "";
  let saving = 0;

  if (count === 0) {
    totalMonthly = 0;
    label = "Inicia tu preparación";
  } else {
    totalMonthly = 0;
    label = "Sistema de Alto Rendimiento — Gratis";
    saving = 0;
  }

  return {
    count,
    label,
    totalMonthly: 0,
    saving: 0,
    enrollment: 0, // Matrícula $0
    totalFirstMonth: 0,
    pricePerSubject: 0
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
    title: "Estrategia Humanista",
    subtitle: "Comprensión Lectora + Perspectiva Histórica + M1",
    subjects: ["len", "his", "m1"], 
    price: 0,
    color: "amber",
    tag: "100% Gratuito",
    features: ["Clases en vivo por Google Meet", "Simulacros de Presión", "Material de Quiebre", "Comunidad de Apoyo"],
    paymentUrl: "" 
  },
  {
    id: "combo-cientifico",
    title: "Estrategia STEM",
    subtitle: "M1 + M2 + Ciencias Específicas",
    subjects: ["m1", "m2", "bio", "fis"], 
    price: 0,
    color: "teal",
    tag: "100% Gratuito",
    features: ["Enfoque 100% Lógico", "Preparación M2 Intensiva", "Clases en vivo", "Simulacros Semanales"],
    paymentUrl: "" 
  },
  {
    id: "combo-full",
    title: "Sistema Integral Lael",
    subtitle: "Dominio absoluto para asegurar tu objetivo",
    subjects: ["len", "m1", "m2", "his", "bio"],
    price: 0,
    color: "indigo",
    features: ["Acceso a Todo el Sistema", "Orientación Vocacional", "Clases en vivo", "Soporte de Comunidad"],
    paymentUrl: "" 
  }
];

/* ──────────────────────────────────────────────────────────────────────────
   5. VALOR AGREGADO (LO QUE INCLUYE SIEMPRE)
   ────────────────────────────────────────────────────────────────────────── */
export const PAES_CONFIG = {
  AVAILABLE_SPOTS: 12,
  START_DATE: "Junio 2026",
  FREE_BADGE: "100% GRATIS"
};

export const PAES_FEATURES = [
  { title: "Comunidad de Apoyo", desc: "No estás solo. Profesores y alumnos te acompañan en cada paso del proceso.", icon: "🤝" },
  { title: "Ensayos Semanales", desc: "Entrenamientos para que llegues tranquilo y seguro el día de la PAES.", icon: "📝" },
  { title: "Profesores Reales", desc: "Profes que saben tu nombre, te responden dudas y se preocupan por tu puntaje.", icon: "👨‍🏫" },
  { title: "Clases Grabadas", desc: "Si no pudiste conectarte a la clase en vivo, queda guardada para que la veas después.", icon: "🎥" }
];

export const PAES_FAQS = [
  { 
    q: "¿De verdad es gratis? ¿Hay trampa?", 
    a: "Sí, es gratis. La PAES en Lael nunca ha tenido costo y nunca lo tendrá. Nuestra misión es que el dinero no sea una barrera para tu futuro." 
  },
  { 
    q: "¿Cómo son las clases?", 
    a: "Son 100% en vivo por Google Meet. Con fecha y hora fija, donde puedes interactuar con el profesor y resolver tus dudas en el momento." 
  },
  { 
    q: "¿Qué pasa si me pierdo una clase?", 
    a: "No te preocupes. Todas las clases quedan grabadas en tu panel de alumno para que las veas cuando quieras." 
  },
  { 
    q: "¿Cuántas horas de clases hay a la semana?", 
    a: "Depende de las materias. En promedio son 2 a 3 horas por asignatura a la semana, enfocadas totalmente en lo que realmente entra en la prueba." 
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