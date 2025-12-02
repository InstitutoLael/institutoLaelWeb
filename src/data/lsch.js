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
// Estrategia: Le damos nombre de producto para aumentar valor percibido.
export const ENROLLMENT_FEE = 12990;
export const ENROLLMENT_LABEL = "Starter Pack Digital (Plataforma + Grabaciones)";

// 📢 Slogan Aspirational
export const LSCH_TAGLINE = "Tus manos tienen voz. Rompe la barrera del sonido.";

/**
 * 🎓 ESTRUCTURA ACADÉMICA (Mejorada)
 * Nombres más atractivos que "Nivel 1".
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
 * 💡 PLANES GRUPALES (Estrategia de Precios)
 * Objetivo: Empujar a la gente al Plan Trimestral (Cashflow asegurado).
 */
export const LSCH_GROUP_PLANS = [
  { 
    id: "g-month", 
    title: "Plan Mensual", 
    monthly: 19990, // Subimos un poco para que el trimestral se vea barato
    enrollment: true, // Paga matrícula
    badge: null,
    features: ["Pago mes a mes", "Acceso a clases en vivo", "Grabaciones HD"],
    cta: "Elegir Mensual"
  },
  { 
    id: "g-quarter", 
    title: "Plan Trimestral", 
    monthly: 16990, // Precio gancho (cercano al antiguo)
    enrollment: false, // MATRÍCULA GRATIS (El gran incentivo)
    save: "Ahorras matrícula + dcto.",
    badge: "Recomendado",
    features: ["Matrícula GRATIS ($0)", "Certificado al finalizar", "Acceso a Club de Práctica"],
    cta: "Ahorrar con Trimestral"
  },
];

// 🙌 CONVENIO IGLESIAS / MINISTERIOS
// Mantenemos el precio histórico como beneficio exclusivo.
export const CHURCH_CONVENIO = {
  enabled: true,
  price: 12990, 
  label: "Beca Ministerio",
  desc: "Precio especial para líderes de iglesias, intérpretes de culto y fundaciones.",
  req: "Requiere validación simple",
};

/**
 * 🏢 CORPORATIVO (B2B - Ley de Inclusión)
 * Argumentos de venta para empresas.
 */
export const CORPORATE_WHY = [
  { 
    icon: "⚖️", 
    title: "Ley 21.015 (Inclusión)", 
    desc: "Capacitar a tu equipo es la forma más genuina de cumplir con la normativa de gestor de inclusión." 
  },
  { 
    icon: "❤️", 
    title: "Experiencia de Cliente", 
    desc: "Que una persona sorda sea atendida en su idioma fideliza y marca una diferencia humana enorme." 
  },
  { 
    icon: "🤝", 
    title: "Clima Laboral", 
    desc: "Aprender LSCh desarrolla empatía y comunicación no verbal en tus equipos de trabajo." 
  },
];

// Helper para calcular precio final en el componente
export function calculateTotal(planId, isChurch) {
  const plan = LSCH_GROUP_PLANS.find(p => p.id === planId);
  if (!plan) return 0;

  // Si es iglesia, el precio mensual es fijo y reducido
  if (isChurch) return CHURCH_CONVENIO.price;

  return plan.monthly;
}