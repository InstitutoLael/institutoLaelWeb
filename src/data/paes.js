// src/data/paes.js
// === Sistema de Alto Rendimiento PAES Lael ===

/* ──────────────────────────────────────────────────────────────────────────
   1. CONFIGURACIÓN FINANCIERA Y BASE
   ────────────────────────────────────────────────────────────────────────── */

export const ENROLLMENT_FEE = 10990;
export const ACADEMIC_MONTHS = 8;
export const AVAILABLE_SPOTS = 12;
export const START_DATE_EXACT = "Inicios de marzo";

export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

/* ──────────────────────────────────────────────────────────────────────────
   2. EL CEREBRO: CALCULADORA DE INVERSIÓN
   ────────────────────────────────────────────────────────────────────────── */

// Cada profe cobra por SU ramo, independiente de si el alumno paga por
// asignatura o toma el Plan Completo. Si el pack hace que el alumno pague
// menos que la suma de sus ramos, la diferencia la absorbe el instituto —
// nunca el profe.
export const OBLIGATORIA_PRICE = 12000;
export const ELECTIVA_PRICE = 10000;
export const PACK_PRICE = 34990;
export const PACK_MIN_SUBJECTS = 4;

export function computePaesPrice(selectedIds = []) {
  const count = selectedIds.length;

  if (count === 0) {
    return {
      count,
      label: "Inicia tu preparación",
      totalMonthly: 0,
      nominalTotal: 0,
      saving: 0,
      enrollment: 0, // Matrícula $0
      totalFirstMonth: 0,
      pricePerSubject: 0
    };
  }

  // nominalTotal es lo que se le paga a cada profe según su ramo — no cambia
  // aunque el alumno esté en el Plan Completo.
  const nominalTotal = selectedIds.reduce((sum, id) => {
    const subject = PAES_SUBJECTS.find((s) => s.id === id);
    const isObligatoria = subject?.category === "Prueba Obligatoria";
    return sum + (isObligatoria ? OBLIGATORIA_PRICE : ELECTIVA_PRICE);
  }, 0);

  const usesPack = count >= PACK_MIN_SUBJECTS && nominalTotal > PACK_PRICE;
  const totalMonthly = usesPack ? PACK_PRICE : nominalTotal;

  return {
    count,
    label: usesPack ? "Plan Completo" : "Plan por asignatura",
    totalMonthly,
    nominalTotal, // lo que reciben los profes en conjunto, sea cual sea el plan
    saving: usesPack ? nominalTotal - PACK_PRICE : 0,
    enrollment: 0, // Matrícula $0
    totalFirstMonth: totalMonthly,
    pricePerSubject: Math.round(totalMonthly / count)
  };
}

export const priceForSubjects = (ids) => computePaesPrice(ids).totalMonthly;

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
    price: 34000,
    color: "amber",
    tag: "$34.000/mes",
    features: ["Clases en vivo por Google Meet", "Simulacros de Presión", "Material de Quiebre", "Comunidad de Apoyo"],
    paymentUrl: "" 
  },
  {
    id: "combo-cientifico",
    title: "Estrategia STEM",
    subtitle: "M1 + M2 + Ciencias Específicas",
    subjects: ["m1", "m2", "bio", "fis"],
    price: 34990,
    color: "teal",
    tag: "$34.990/mes · Plan Completo",
    features: ["Enfoque 100% Lógico", "Preparación M2 Intensiva", "Clases en vivo", "Simulacros Semanales"],
    paymentUrl: "" 
  },
  {
    id: "combo-full",
    title: "Sistema Integral Lael",
    subtitle: "Dominio absoluto para asegurar tu objetivo",
    subjects: ["len", "m1", "m2", "his", "bio"],
    price: 34990,
    color: "indigo",
    tag: "$34.990/mes · Plan Completo",
    features: ["Acceso a Todo el Sistema", "Orientación Vocacional", "Clases en vivo", "Soporte de Comunidad"],
    paymentUrl: "" 
  }
];

/* ──────────────────────────────────────────────────────────────────────────
   5. VALOR AGREGADO (LO QUE INCLUYE SIEMPRE)
   ────────────────────────────────────────────────────────────────────────── */
export const PAES_CONFIG = {
  AVAILABLE_SPOTS: AVAILABLE_SPOTS,
  START_DATE: "Marzo 2027",
  START_DATE_EXACT: START_DATE_EXACT,
  FREE_BADGE: "DESDE $10.000/MES"
};

export const PAES_FEATURES = [
  { title: "Comunidad de Apoyo", desc: "No estás solo. Profesores y alumnos te acompañan en cada paso del proceso.", icon: "🤝" },
  { title: "Ensayos Semanales", desc: "Entrenamientos para que llegues tranquilo y seguro el día de la PAES.", icon: "📝" },
  { title: "Profesores Reales", desc: "Profes que saben tu nombre, te responden dudas y se preocupan por tu puntaje.", icon: "👨‍🏫" },
  { title: "Clases Grabadas", desc: "Si no pudiste conectarte a la clase en vivo, queda guardada para que la veas después.", icon: "🎥" }
];

export const PAES_FAQS = [
  {
    q: "¿Cuánto cuesta? ¿Hay letra chica?",
    a: "Matrícula gratis. Cada asignatura tiene su propio valor (desde $10.000/mes), y si tomas 4 o más, pagas el Plan Completo a $34.990/mes en vez de la suma. Sin sorpresas, y si aun así no lo puedes cubrir, puedes postular a una beca."
  },
  { 
    q: "¿Cómo son las clases?", 
    a: "En vivo por Google Meet. Tienes un horario fijo y un profe real que te conoce por tu nombre y te ayuda a resolver dudas en el momento." 
  },
  { 
    q: "¿Qué pasa si me pierdo una clase?", 
    a: "No pasa nada. Todas las clases se graban y quedan disponibles en tu panel para que las veas cuando puedas." 
  },
  { 
    q: "¿Cuántas horas a la semana?", 
    a: "Depende de las materias que elijas rendir. En promedio dedicamos 2-3 horas semanales por asignatura, enfocadas en técnica y práctica real." 
  },
  { 
    q: "¿Puedo estudiar si trabajo o voy al colegio?", 
    a: "Sí. Los horarios son vespertinos y están diseñados para ser flexibles, permitiéndote compatibilizar el estudio con tus otras responsabilidades." 
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