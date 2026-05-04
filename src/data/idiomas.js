// src/data/idiomas.js

/* ──────────────────────────────────────────────────────────────────────────
   1. CONFIGURACIÓN DE INVERSIÓN
   ────────────────────────────────────────────────────────────────────────── */

export const ENROLLMENT_FEE = 10990; 
export const ACADEMIC_MONTHS = 9;

export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

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
    label = "Configura tu Programa";
  } else if (count === 1) {
    totalMonthly = PRICES.SINGLE;
    label = "Inmersión Singular";
  } else if (count === 2) {
    totalMonthly = PRICES.DUO;
    label = "Inmersión Dual Estratégica";
    saving = (PRICES.SINGLE * 2) - PRICES.DUO;
  } else {
    totalMonthly = PRICES.POLYGLOT;
    label = "Sistema Políglota Integral";
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
   2. PROGRAMAS DE INMERSIÓN
   ────────────────────────────────────────────────────────────────────────── */
export const LANGUAGES = [
  {
    id: "plan-ingles",
    name: "Dominio Estratégico Inglés",
    emoji: "🇺🇸",
    color: "#C6A66B",
    badge: "Alto Impacto",
    summary: "Ingeniería inversa del idioma. Estructuras de alto rendimiento para negocios, tecnología y certificación internacional.",
    features: [
      "Preparación táctica para IELTS/TOEFL",
      "Estructuras comunicativas corporativas",
      "Simulacros de speaking de alta presión"
    ],
    levels: ["A1 (Fundamentos)", "A2", "B1", "B2 (Dominio)"],
    comingSoon: false,
    paymentUrl: ""
  },
  {
    id: "plan-coreano",
    name: "Inmersión Estructural Coreana",
    emoji: "🇰🇷",
    color: "#C6A66B",
    badge: "Alta Demanda",
    summary: "Decodificación precisa del sistema Hangul y gramática coreana avanzada, conectada con su ecosistema cultural.",
    features: [
      "Lectura y escritura acelerada (Hangul)",
      "Sistema de honoríficos y jerarquía",
      "Preparación estratégica TOPIK"
    ],
    levels: ["Nivel 1 (Fundamentos)", "Nivel 2", "Nivel 3"],
    comingSoon: false,
    paymentUrl: ""
  },
  {
    id: "plan-espanol",
    name: "Integración Lingüística para Expats",
    emoji: "🇨🇱",
    color: "#C6A66B",
    badge: "Inserción Estratégica",
    summary: "Sistemas prácticos para dominar el español en el entorno chileno. Foco corporativo y de inmersión social profunda.",
    features: [
      "Desmitificación de la dialectología local",
      "Estructuras para entrevistas de alto nivel",
      "Negociación y persuasión en español"
    ],
    levels: ["A1 (Fundamentos)", "A2", "B1 (Dominio)"],
    comingSoon: false,
    paymentUrl: ""
  }
];

/* ──────────────────────────────────────────────────────────────────────────
   3. VALOR AGREGADO
   ────────────────────────────────────────────────────────────────────────── */
export const LANG_FEATURES = [
  { title: "Sistemas Dinámicos", desc: "No hay clases pasivas. Interacción constante y simulación de entornos reales.", icon: "🎥" },
  { title: "Entornos Exclusivos", desc: "Secciones de alta concentración para asegurar tu tiempo de participación.", icon: "👥" },
  { title: "Certificación Estratégica", desc: "Acreditación de dominio orientada a demostrar tu capacidad en el mercado.", icon: "📜" }
];

/* ──────────────────────────────────────────────────────────────────────────
   4. SYLLABUS PREVIEW
   ────────────────────────────────────────────────────────────────────────── */
export const SYLLABUS_PREVIEW = {
  ingles: [
    { level: "Fundamentos", topics: ["Estructuras base de persuasión", "Tácticas de negociación elemental", "Alineación fonética"] },
    { level: "Dominio", topics: ["Comunicación corporativa asertiva", "Defensa de argumentos complejos", "Optimización gramatical"] }
  ],
  coreano: [
    { level: "Nivel 1", topics: ["Decodificación del sistema Hangul", "Arquitectura de la oración (SOV)", "Protocolo base"] },
    { level: "Nivel 2", topics: ["Dominio de partículas complejas", "Análisis de estructuras idiomáticas", "Sistemas numéricos duales"] }
  ],
  espanol: [
    { level: "Fundamentos", topics: ["Navegación del sistema burocrático", "Comprensión del registro informal", "Adaptación fonética"] },
    { level: "Dominio", topics: ["Dominio del registro formal e informal", "Resolución de conflictos laborales", "Redacción estratégica"] }
  ]
};

/* ──────────────────────────────────────────────────────────────────────────
   5. ESTRATEGIA COMPARATIVA
   ────────────────────────────────────────────────────────────────────────── */
export const COMPARISON_DATA = [
  { feature: "Enfoque del Programa", lael: "Resultados y Dominio", app: "Repetición Mecánica", institute: "Gramática Teórica" },
  { feature: "Metodología", lael: "Sistemas Estructurales", app: "Algoritmos", institute: "Libros Genéricos" },
  { feature: "Interacción", lael: "Simulacros Reales", app: "Nula", institute: "Pasiva" },
  { feature: "Entorno Visual", lael: "Premium", app: "Básico", institute: "Convencional" },
  { feature: "Inversión Mensual", lael: "Alta Eficiencia", app: "Baja Eficiencia", institute: "Sobrevalorada" }
];

/* ──────────────────────────────────────────────────────────────────────────
   6. EXPERTOS (Mentores Estratégicos)
   ────────────────────────────────────────────────────────────────────────── */
export const TEACHERS_LIST = [
  { name: "Equipo Estratégico Inglés", origin: "🇺🇸", role: "Mentores de Alto Impacto", bio: "Especialistas en fonética y comunicación corporativa.", img: "💼" },
  { name: "Equipo Estructural Coreano", origin: "🇰🇷", role: "Especialistas en Inmersión", bio: "Dominio técnico del idioma y su psicología cultural.", img: "⛩️" },
  { name: "Equipo Inserción Español", origin: "🇨🇱", role: "Lingüistas Tácticos", bio: "Expertos en dialectología y adaptación social rápida.", img: "🏢" }
];

/* ──────────────────────────────────────────────────────────────────────────
   7. FAQS TÁCTICAS
   ────────────────────────────────────────────────────────────────────────── */
export const IDIOMAS_FAQS = [
  { q: "¿Cuál es el tiempo estimado de dominio?", a: "Nuestro sistema prioriza la fluidez funcional rápida. Podrás ejecutar interacciones estratégicas en el primer nivel (3-4 meses), y alcanzar dominio conversacional profundo en ciclos posteriores." },
  { q: "¿Existe un registro de mi progreso?", a: "Absolutamente. Toda sesión estratégica queda respaldada en nuestra plataforma cinemática para tu revisión y optimización de fallos." },
  { q: "¿La certificación es válida?", a: "Emitimos una Certificación Institucional verificable que acredita tu dominio de la estructura, perfecta para respaldar competencias laborales." },
  { q: "¿Cómo es el seguimiento?", a: "No te dejamos a tu suerte. Tienes contacto directo con el equipo de mentores para corregir tu trayectoria fuera de los simulacros en vivo." }
];