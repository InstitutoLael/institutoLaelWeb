// src/data/lsch.js
// === Lengua de Señas Chilena — Instituto Lael ===
// Edición "Professional Impact"

// 🔢 Formateador CLP
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

// 🧾 Matrícula única
export const LSCH_ENROLLMENT_FEE = 12990;

// 📢 Slogan Central (Para usar en el Hero)
export const LSCH_TAGLINE = "Rompe la barrera del sonido. Conecta sin límites.";

/**
 * 🎓 ESTRUCTURA ACADÉMICA RENOVADA
 * Usamos una paleta "Teal/Cyan" para evocar tecnología, salud y comunidad sorda.
 */
export const LSCH_MODULES = [
  {
    id: "nivel-1",
    code: "N1",
    name: "Fundamentos Visuales", // Nombre más técnico
    tag: "A1 · Inicial",
    color: "#2dd4bf", // Teal 400 (Brillante)
    icon: "HandWave",
    summary: "Domina la dactilología y la estructura gramatical básica. Pierde el miedo a usar tu cuerpo como herramienta de comunicación.",
    bullets: [
      "Alfabeto y Dactilología",
      "Expresión facial y corporal",
      "Cultura y Comunidad Sorda",
    ],
  },
  {
    id: "nivel-2",
    code: "N2",
    name: "Gramática Espacial",
    tag: "A2 · Básico",
    color: "#06b6d4", // Cyan 500 (Tecnológico)
    icon: "HandOkay",
    summary: "Deja de pensar en español y empieza a pensar en imágenes. Aprende clasificadores y verbos direccionales.",
    bullets: [
      "Verbos y Tiempos verbales",
      "Clasificadores y descripción",
      "Role-play situaciones reales",
    ],
  },
  {
    id: "nivel-3",
    code: "N3",
    name: "Fluidez y Contexto",
    tag: "B1 · Intermedio",
    color: "#0ea5e9", // Sky 500 (Profundo)
    icon: "HandRock",
    summary: "Para contextos laborales y técnicos. Ideal para profesionales de la salud, educación y atención al cliente.",
    bullets: [
      "Vocabulario técnico/laboral",
      "Narración y argumentación",
      "Interpretación básica",
    ],
  },
  {
    id: "club-adv",
    code: "PRO",
    name: "Club de Práctica Avanzada",
    tag: "B1+ · Experto",
    color: "#6366f1", // Indigo (Diferenciador)
    icon: "HandSparkle",
    summary: "Mantenimiento de nivel. 100% inmersión visual sin voz. Análisis de videos nativos.",
    bullets: [
      "Debates y actualidad",
      "Análisis de videos nativos",
      "Velocidad de respuesta",
    ],
  },
];

// 💡 Planes Grupales (Estrategia de Anclaje)
export const LSCH_GROUP_PLANS = [
  { 
    id: "g-month", 
    title: "Plan Mensual", 
    monthly: 19990, 
    badge: "Flexible",
    color: "slate",
    desc: "Pago mes a mes. Sin ataduras ni contratos a largo plazo."
  },
  { 
    id: "g-quarter", 
    title: "Plan Trimestral", 
    monthly: 16990, // PRECIO GANCHO
    save: "Ahorras $9.000",
    badge: "Más Vendido",
    color: "teal", // Color principal para destacar
    desc: "El compromiso ideal para ver resultados reales y certificar nivel."
  },
  { 
    id: "g-semester", 
    title: "Plan Semestral", 
    monthly: 14990, 
    save: "Ahorras $30.000",
    badge: "Mejor Valor",
    color: "cyan",
    desc: "La opción inteligente para dominar el idioma completo."
  },
];

// 🙌 Convenio Iglesias (Motor de Volumen)
export const CHURCH_CONVENIO = {
  enabled: true,
  monthlyFlat: 12990, 
  label: "Convenio Iglesias / Ministerios",
  subLabel: "Tarifa preferencial activa",
  desc: "Precio especial para grupos de ministerio de sordos.",
  color: "amber"
};

// 🧑‍🏫 Planes 1:1 (Personalizado)
export const LSCH_ONE2ONE_PLANS = [
  { 
    id: "o-light", 
    title: "Pack Refuerzo", 
    hours: 4,
    monthly: 45000, 
    detail: "1 hora/semana"
  },
  { 
    id: "o-standard", 
    title: "Pack Estándar", 
    hours: 8,
    monthly: 80000, 
    detail: "2 horas/semana",
    badge: "Recomendado"
  },
  { 
    id: "o-intensive", 
    title: "Pack Intensivo", 
    hours: 12,
    monthly: 110000, 
    detail: "3 horas/semana"
  },
];

// 🏢 Datos para Sección Corporativa (Ley 21.015)
export const CORPORATE_WHY = [
  { icon: "Briefcase", title: "Ley de Inclusión 21.015", desc: "Cumple con la normativa capacitando a tu equipo en gestión inclusiva." },
  { icon: "Heart", title: "Responsabilidad Social", desc: "Genera un ambiente laboral empático y accesible para todos." },
  { icon: "UserCheck", title: "Atención al Cliente", desc: "Marca la diferencia atendiendo a la comunidad sorda en su idioma." },
];

// Helpers de Precio
export function priceForGroupPlan(plan, { church = false } = {}) {
  if (!plan) return 0;
  if (church && CHURCH_CONVENIO.enabled) return CHURCH_CONVENIO.monthlyFlat;
  return plan.monthly;
}