// src/data/lsch.js
// === Lengua de Señas Chilena (LSCh) — Estrategia 2025 ===

// 🔢 Formateador CLP
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

// 🧾 "Starter Pack" (Ex-Matrícula)
export const ENROLLMENT_FEE = 12990;
export const ENROLLMENT_LABEL = "Starter Pack Digital (Plataforma + Grabaciones)";

// 📢 Slogan Aspirational
export const LSCH_TAGLINE = "Tus manos tienen voz. Rompe la barrera del sonido.";

/**
 * 🎓 ESTRUCTURA ACADÉMICA
 */
export const LSCH_MODULES = [
  {
    id: "nivel-1",
    code: "A1",
    name: "Iniciación Visual",
    color: "#2dd4bf", // Teal
    summary: "El despertar de tus manos. Aprende a presentarte, el alfabeto y la estructura básica para dejar de depender de tu voz.",
    bullets: ["Alfabeto y Dactilología", "Saludos y Cortesía", "Romper el hielo"],
  },
  {
    id: "nivel-2",
    code: "A2",
    name: "Construcción Espacial",
    color: "#3b82f6", // Blue
    summary: "Deja de traducir español a señas. Aprende la gramática propia de la LSCh, el uso del espacio y los clasificadores.",
    bullets: ["Verbos Direccionales", "Tiempos (Pasado/Futuro)", "Narración visual"],
  },
  {
    id: "nivel-3",
    code: "B1",
    name: "Fluidez & Contexto",
    color: "#8b5cf6", // Violet
    summary: "Enfoque profesional. Prepárate para situaciones reales en salud, educación y atención al cliente. Velocidad y precisión.",
    bullets: ["Vocabulario Técnico", "Interpretación básica", "Atención de público"],
  },
  {
    id: "club-adv",
    code: "PRO",
    name: "Inmersión Total",
    color: "#f43f5e", // Rose
    summary: "Solo para valientes. Clases 100% en silencio (sin voz). Debates, cultura sorda profunda y perfeccionamiento.",
    bullets: ["Cultura Sorda", "Modismos avanzados", "Velocidad nativa"],
  },
];

/**
 * 💡 PLANES GRUPALES
 */
export const LSCH_GROUP_PLANS = [
  { 
    id: "g-month", 
    title: "Plan Mensual", 
    monthly: 19990, 
    enrollment: true,
    badge: null,
    features: ["Pago mes a mes", "Acceso a clases en vivo", "Grabaciones HD"],
    cta: "Elegir Mensual"
  },
  { 
    id: "g-quarter", 
    title: "Plan Trimestral", 
    monthly: 16990, 
    enrollment: false, // MATRÍCULA GRATIS
    save: "Ahorras matrícula + dcto.",
    badge: "Recomendado",
    features: ["Matrícula GRATIS ($0)", "Certificado al finalizar", "Acceso a Club de Práctica"],
    cta: "Ahorrar con Trimestral"
  },
];

// 🙌 CONVENIO IGLESIAS
export const CHURCH_CONVENIO = {
  enabled: true,
  price: 12990, // Precio histórico mantenido
  label: "Beca Ministerio",
  desc: "Precio especial para líderes de iglesias, intérpretes de culto y fundaciones.",
  req: "Requiere validación simple",
};

/**
 * 🧑‍🏫 PLANES 1 A 1 (Personalizados)
 * ESTO ES LO QUE FALTABA Y ROMPÍA EL BUILD
 */
export const LSCH_ONE2ONE_PLANS = [
  { 
    id: "o-light", 
    title: "Pack Refuerzo", 
    monthly: 55000,
    desc: "4 sesiones al mes. Ideal para corregir dudas específicas o preparar un examen." 
  },
  { 
    id: "o-standard", 
    title: "Pack Estándar", 
    monthly: 95000,
    desc: "8 sesiones al mes. Avance rápido y personalizado a tu ritmo." 
  },
  { 
    id: "o-intensive", 
    title: "Pack Intensivo", 
    monthly: 135000,
    desc: "12 sesiones al mes. Inmersión total para aprender en tiempo récord." 
  },
];

/**
 * 🏢 CORPORATIVO (B2B)
 */
export const CORPORATE_WHY = [
  { 
    icon: "⚖️", 
    title: "Ley 21.015", 
    desc: "Capacita a tu equipo para cumplir con la normativa de inclusión laboral." 
  },
  { 
    icon: "❤️", 
    title: "Experiencia Cliente", 
    desc: "Atender a una persona sorda en su idioma fideliza y marca la diferencia." 
  },
  { 
    icon: "🤝", 
    title: "Clima Laboral", 
    desc: "Desarrolla empatía y comunicación no verbal en tus equipos." 
  },
];

// Helper para calcular precio (Renombrado para compatibilidad con tu página actual)
export function priceForGroupPlan(plan, { church = false } = {}) {
  if (!plan) return 0;
  // Si es iglesia y el plan es compatible, devolvemos precio iglesia
  if (church && CHURCH_CONVENIO.enabled) return CHURCH_CONVENIO.price;
  // Si no, precio normal del plan
  return plan.monthly;
}