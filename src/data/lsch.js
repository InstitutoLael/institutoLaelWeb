// src/data/lsch.js
// === Lengua de Señas Chilena (LSCh) — El Idioma de las Manos ===

/* ──────────────────────────────────────────────────────────────────────────
   1. CONFIGURACIÓN BASE
   ────────────────────────────────────────────────────────────────────────── */

export const ENROLLMENT_FEE = 15000;
export const ENROLLMENT_LABEL = "Matrícula Anual y Acceso a Comunidad Lael";
export const LSCH_TAGLINE = "Rompe la barrera del sonido.";
export const CHURCH_PRICE = 14990; // Precio social protegido

export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

/* ──────────────────────────────────────────────────────────────────────────
   2. ESTRUCTURA ACADÉMICA (Módulos de Aprendizaje)
   ────────────────────────────────────────────────────────────────────────── */
export const LSCH_MODULES = [
  {
    id: "nivel-1",
    tag: "A1 • Principiante",
    name: "Iniciación Visual y Dactilológica",
    duration: "3 meses",
    icon: "👋",
    color: "#06b6d4",
    desc: "El primer paso. Aprenderás el abecedario, saludos, familia y cómo estructurar tus primeras ideas sin usar la voz.",
    outcomes: ["Dominio del abecedario dactilológico", "Presentación personal completa", "Vocabulario de entorno cotidiano"]
  },
  {
    id: "nivel-2",
    tag: "A2 • Intermedio",
    name: "Gramática Espacial y Clasificadores",
    duration: "3 meses",
    icon: "🤟",
    color: "#8b5cf6",
    desc: "Entra en la lógica visual. Verbos direccionales y uso del espacio para describir escenas complejas.",
    outcomes: ["Uso correcto del espacio gestual", "Narración de rutinas y pasado", "Comprensión de relatos fluidos"]
  },
  {
    id: "nivel-3",
    tag: "B1 • Avanzado",
    name: "Contexto Profesional e Inclusión",
    duration: "4 meses",
    icon: "🎓",
    color: "#f43f5e",
    desc: "Especialización. Vocabulario técnico para salud, educación y atención al público con enfoque en la Ley de Inclusión.",
    outcomes: ["Vocabulario técnico avanzado", "Interpretación básica", "Fluidez en debates y opinión"]
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   3. PLANES GRUPALES (Suscripción Mensual)
   ────────────────────────────────────────────────────────────────────────── */
export const LSCH_GROUP_PLANS = [
  {
    id: "lsch-g-month",
    title: "Plan Mensual Flexible",
    desc: "Ideal para ir a tu propio ritmo.",
    price: 24990,
    enrollmentWaived: false,
    badge: "Flexibilidad Total",
    features: [
      "Clases en vivo vía Zoom",
      "Material de apoyo en PDF",
      "Acceso a grabaciones por 7 días",
      "Diploma de participación"
    ],
    paymentUrl: "" // Pegar link aquí
  },
  {
    id: "lsch-g-quarter",
    title: "Plan Trimestral (Ahorro)",
    desc: "Compromiso real con el aprendizaje.",
    price: 19990, // Precio por mes pagando el trimestre
    totalPayment: 59970,
    enrollmentWaived: true,
    badge: "Más Conveniente",
    features: [
      "Todo lo del plan mensual",
      "🔥 Matrícula $0 (Ahorras $15.000)",
      "Acceso permanente a grabaciones",
      "Certificado de Nivel aprobado"
    ],
    highlight: true,
    paymentUrl: "" // Pegar link aquí
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   4. CLASES PARTICULARES (Personalizado)
   ────────────────────────────────────────────────────────────────────────── */
export const LSCH_ONE2ONE_PLANS = [
  {
    id: "o-light",
    title: "Pack 4 Sesiones",
    price: 60000,
    desc: "Para dudas puntuales o nivelación rápida.",
    features: ["Sesiones de 60 min", "Horario a convenir", "Profesor exclusivo"],
  },
  {
    id: "o-standard",
    title: "Pack 8 Sesiones",
    price: 110000,
    desc: "Avance acelerado y personalizado.",
    features: ["Sesiones de 60 min", "Corrección de señas en video", "Prioridad de agenda"],
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   5. VALORES CORPORATIVOS (Para la Web)
   ────────────────────────────────────────────────────────────────────────── */
export const LSCH_WHY_US = [
  { title: "Cultura Sorda", desc: "No solo enseñamos señas, enseñamos el respeto por la identidad de la Comunidad Sorda." },
  { title: "Ley 21.015", desc: "Ayudamos a las empresas a cumplir con la cuota de inclusión mediante capacitación real." },
  { title: "Certificación", desc: "Nuestros cursos están diseñados bajo estándares de comunicación efectiva." }
];

/* ──────────────────────────────────────────────────────────────────────────
   6. CALCULADORA DE PRECIOS
   ────────────────────────────────────────────────────────────────────────── */
export function calculateLschPrice(planId, isChurch = false) {
  // 1. Si es convenio de iglesia, ignoramos el plan y damos el precio social
  if (isChurch) {
    return {
      price: CHURCH_PRICE,
      label: "Convenio Iglesia/Ministerio",
      enrollment: 0 // Usualmente exonerada en convenios
    };
  }

  // 2. Buscar en planes grupales
  const groupPlan = LSCH_GROUP_PLANS.find(p => p.id === planId);
  if (groupPlan) {
    return {
      price: groupPlan.price,
      label: groupPlan.title,
      enrollment: groupPlan.enrollmentWaived ? 0 : ENROLLMENT_FEE
    };
  }

  // 3. Buscar en planes 1 a 1
  const soloPlan = LSCH_ONE2ONE_PLANS.find(p => p.id === planId);
  if (soloPlan) {
    return {
      price: soloPlan.price,
      label: soloPlan.title,
      enrollment: ENROLLMENT_FEE
    };
  }

  return { price: 0, label: "No seleccionado", enrollment: 0 };
}

/* ──────────────────────────────────────────────────────────────────────────
   7. TEACHER PROFILE (Fernanda)
   ────────────────────────────────────────────────────────────────────────── */
export const TEACHER_PROFILE = {
  name: "Fernanda",
  role: "Educadora de Párvulos & Instructora Sorda",
  img: "👩🏻‍🏫",
  bio: "Fernanda no solo es hablante nativa de LSCh, es una pedagoga profesional titulada. Esta combinación es única: posee la paciencia y didáctica de una educadora de párvulos, sumado a la autoridad cultural de una persona Sorda. Ella no te enseñará 'español señado', te enseñará a pensar visualmente.",
  badges: ["Nativa LSCh", "Pedagogía Profesional", "Cultura Sorda", "Experta en Inclusión"]
};

/* ──────────────────────────────────────────────────────────────────────────
   8. COMPARATIVE DATA (LSCh)
   ────────────────────────────────────────────────────────────────────────── */
export const COMPARISON_DATA = [
  { feature: "Profesor", us: "Sordo Nativo + Pedagogo", others: "Oyente (o Sordo sin título)" },
  { feature: "Metodología", us: "Inmersión Visual (Sin Voz)", others: "Bimodal (Hablan y señan)" },
  { feature: "Enfoque", us: "Gramática & Cultura", others: "Vocabulario Suelto" },
  { feature: "Certificación", us: "Por Competencias (Ley 21.015)", others: "Solo asistencia" }
];