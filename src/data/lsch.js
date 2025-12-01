// src/data/lsch.js
// === Lengua de Señas Chilena — Instituto Lael ===

// 🔢 Formateador CLP
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

// 🧾 Matrícula única
export const LSCH_ENROLLMENT_FEE = 12990;

// 📢 Slogan
export const LSCH_TAGLINE = "Rompe la barrera del sonido. Conecta sin límites.";

/**
 * 🎓 ESTRUCTURA ACADÉMICA
 */
export const LSCH_MODULES = [
  {
    id: "nivel-1",
    code: "N1",
    name: "Fundamentos Visuales",
    tag: "A1 · Inicial",
    summary: "Domina la dactilología y la estructura gramatical básica. Pierde el miedo a usar tu cuerpo como herramienta.",
    bullets: ["Alfabeto y Dactilología", "Expresión facial", "Cultura Sorda"],
  },
  {
    id: "nivel-2",
    code: "N2",
    name: "Gramática Espacial",
    tag: "A2 · Básico",
    summary: "Deja de pensar en español y empieza a pensar en imágenes. Aprende clasificadores y verbos direccionales.",
    bullets: ["Verbos y Tiempos", "Clasificadores", "Role-play real"],
  },
  {
    id: "nivel-3",
    code: "N3",
    name: "Fluidez y Contexto",
    tag: "B1 · Intermedio",
    summary: "Para contextos laborales. Ideal para profesionales de la salud, educación y atención al cliente.",
    bullets: ["Vocabulario técnico", "Narración", "Interpretación básica"],
  },
  {
    id: "club-adv",
    code: "PRO",
    name: "Club Avanzado",
    tag: "B1+ · Experto",
    summary: "Mantenimiento de nivel. 100% inmersión visual sin voz. Análisis de videos nativos.",
    bullets: ["Debates y actualidad", "Velocidad de respuesta", "Sin voz"],
  },
];

// 💡 Planes Grupales
export const LSCH_GROUP_PLANS = [
  { 
    id: "g-month", 
    title: "Plan Mensual", 
    monthly: 19990, 
    badge: "Flexible",
    desc: "Pago mes a mes. Sin ataduras."
  },
  { 
    id: "g-quarter", 
    title: "Plan Trimestral", 
    monthly: 16990, 
    save: "Ahorras $9.000",
    badge: "Más Vendido",
    desc: "El compromiso ideal para ver resultados."
  },
  { 
    id: "g-semester", 
    title: "Plan Semestral", 
    monthly: 14990, 
    save: "Ahorras $30.000",
    badge: "Mejor Valor",
    desc: "Opción inteligente a largo plazo."
  },
];

// 🙌 Convenio Iglesias
export const CHURCH_CONVENIO = {
  enabled: true,
  monthlyFlat: 12990, 
  label: "Convenio Iglesias / Ministerios",
};

// 🧑‍🏫 Planes 1:1
export const LSCH_ONE2ONE_PLANS = [
  { id: "o-light", title: "Pack Refuerzo", monthly: 45000 },
  { id: "o-standard", title: "Pack Estándar", monthly: 80000 },
  { id: "o-intensive", title: "Pack Intensivo", monthly: 110000 },
];

// 🏢 IMPORTANTE: Esta es la variable nueva que seguro faltaba
export const CORPORATE_WHY = [
  { title: "Ley de Inclusión 21.015", desc: "Cumple con la normativa capacitando a tu equipo." },
  { title: "Responsabilidad Social", desc: "Genera un ambiente laboral empático y accesible." },
  { title: "Atención al Cliente", desc: "Marca la diferencia atendiendo en su idioma." },
];

// Helper
export function priceForGroupPlan(plan, { church = false } = {}) {
  if (!plan) return 0;
  if (church && CHURCH_CONVENIO.enabled) return CHURCH_CONVENIO.monthlyFlat;
  return plan.monthly;
}