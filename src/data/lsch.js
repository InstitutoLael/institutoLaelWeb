// src/data/lsch.js
// === Lengua de Señas Chilena (LSCh) - El Idioma de las Manos ===
import entenderImg from '../assets/img/Home/media_lsch_entender_1780735268668.jpg';
import comenzarImg from '../assets/img/Home/media_lsch_comenzar_1780735268676.jpg';
import avanzarImg from '../assets/img/Home/media_lsch_avanzar_1780735268706.jpg';

/* ──────────────────────────────────────────────────────────────────────────
   0. CONTENIDO DE LA PÁGINA /lsch (LandingLSCh.jsx)
   ────────────────────────────────────────────────────────────────────────── */

export const LANDING_SLIDES = [
  { img: entenderImg, title: "Aprender señas es entender", desc: "Una decisión que transforma la forma de comunicar.", badge: "ENTENDER" },
  { img: comenzarImg, title: "Aprender señas es comenzar", desc: "Abre nuevas oportunidades de comunicación y conexión.", badge: "COMENZAR" },
  { img: avanzarImg, title: "Aprender señas es avanzar", desc: "Porque cada persona aprende de manera distinta.", badge: "AVANZAR" }
];

export const LANDING_LEVELS = [
  { code: "A1", name: "Nivel Inicial", duration: "3 Meses", desc: "Comienza desde cero. Aprende el abecedario dactilológico, vocabulario cotidiano, saludos formales e informales, y cómo estructurar tus primeras ideas sin usar la voz.", items: ["Abecedario y números", "Familia y entorno social", "Saludos y expresiones básicas", "Estructura espacial inicial"] },
  { code: "A2", name: "Nivel Intermedio", duration: "3 Meses", desc: "Profundiza tus habilidades comunicativas. Incorpora la gramática espacial tridimensional, clasificadores visuales y verbos direccionales para describir escenas complejas.", items: ["Direccionalidad verbal", "Clasificadores espaciales", "Descripción de trayectorias", "Vocabulario extendido"] },
  { code: "B1", name: "Nivel Conversacional", duration: "4 Meses", desc: "Desarrolla mayor fluidez y confianza. Orientado a contextos profesionales, atención al público y cumplimiento de los parámetros de la Ley de Inclusión Laboral 21.015.", items: ["Entornos laborales y de atención", "Léxico técnico de inclusión", "Conversación espontánea", "Inmersión cultural Sorda"] }
];

/* ──────────────────────────────────────────────────────────────────────────
   1. CONFIGURACIÓN BASE
   ────────────────────────────────────────────────────────────────────────── */

export const ENROLLMENT_FEE = 9990;
export const ENROLLMENT_LABEL = "Matrícula Anual y Acceso a Comunidad Lael";
export const LSCH_TAGLINE = "Rompe la barrera del sonido.";

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
      "🔥 Matrícula $0 (Ahorras $9.990)",
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
export function calculateLschPrice(planId) {
  // Buscar en planes grupales
  const groupPlan = LSCH_GROUP_PLANS.find(p => p.id === planId);
  if (groupPlan) {
    return {
      price: groupPlan.price,
      label: groupPlan.title,
      enrollment: groupPlan.enrollmentWaived ? 0 : ENROLLMENT_FEE
    };
  }

  // Buscar en planes 1 a 1
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
   8. COMPARATIVE DATA (LSCh)
   ────────────────────────────────────────────────────────────────────────── */
export const COMPARISON_DATA = [
  { feature: "Profesor", us: "Docentes Especializados", others: "Sin titulación formal" },
  { feature: "Metodología", us: "Inmersión Visual y Cultural", others: "Bimodal (Hablan y señan)" },
  { feature: "Enfoque", us: "Gramática & Cultura Sorda", others: "Vocabulario Suelto" },
  { feature: "Certificación", us: "Por Competencias", others: "Solo asistencia" }
];