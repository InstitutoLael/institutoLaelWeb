// src/data/lsch.js
// === Lengua de Señas Chilena — Instituto Lael ===
// Estrategia de Precios 2025: Rentabilidad + Accesibilidad

// 🔢 Utilidad: formato CLP
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

// 🧾 Matrícula única (Cubre gastos administrativos iniciales)
// Subida leve para filtrar compromiso real.
export const LSCH_ENROLLMENT_FEE = 12990;

/**
 * 🎯 LÓGICA DE PRECIOS 2025
 * * 1. Precio Base (Mensual): $19.990 -> Posiciona el curso como profesional.
 * 2. "Sweet Spot" (Trimestral): $16.990 -> Incentiva el compromiso a mediano plazo.
 * 3. Convenio (Volumen): $12.990 -> Mantiene el acceso masivo rentable por volumen.
 * * Margen estimado (costo docente $7.200):
 * - Base: ~$12.790 de margen (Excelente)
 * - Trimestral: ~$9.790 de margen (Muy bueno)
 * - Convenio: ~$5.790 de margen (Bueno por volumen)
 */

// 🧩 Estructura Académica (Intacta, funciona bien)
export const LSCH_MODULES = [
  {
    id: "lsch-m1",
    name: "Módulo 1 · Inicial",
    tag: "A0–A1",
    bullets: [
      "Alfabeto, saludos y cultura sorda",
      "Vocabulario cotidiano esencial",
      "Estructura gramatical básica",
    ],
    servesFor: ["Personas sin conocimientos previos"],
    accent: "#16a34a",
  },
  {
    id: "lsch-m2",
    name: "Módulo 2 · Básico",
    tag: "A1–A2",
    bullets: [
      "Rutinas, verbos y tiempos",
      "Clasificadores y descripción",
      "Role-play de situaciones reales",
    ],
    servesFor: ["Quienes ya manejan el alfabeto y saludos"],
    accent: "#10b981",
  },
  {
    id: "lsch-m3",
    name: "Módulo 3 · Intermedio",
    tag: "A2–B1",
    bullets: [
      "Contextos laborales y técnicos",
      "Narración fluida y argumentación",
      "Interpretación básica",
    ],
    servesFor: ["Profundización gramatical y fluidez"],
    accent: "#22c55e",
  },
  {
    id: "lsch-adv",
    name: "Club de Práctica Avanzada",
    tag: "B1+",
    bullets: [
      "100% Conversación sin voz",
      "Análisis de videos de la comunidad sorda",
      "Debates y actualidad",
    ],
    servesFor: ["Mantener el nivel y agilidad"],
    accent: "#059669",
  },
];

// 💡 Planes Grupales (Estrategia de Anclaje)
export const LSCH_GROUP_PLANS = [
  { 
    id: "g-month", 
    title: "Plan Mensual", 
    monthly: 19990, 
    badge: "Flexible",
    desc: "Pago mes a mes, sin ataduras."
  },
  { 
    id: "g-quarter", 
    title: "Plan Trimestral", 
    monthly: 16990, // El precio atractivo
    save: "Ahorras $9.000",
    badge: "Recomendado",
    desc: "Compromiso ideal para ver resultados."
  },
  { 
    id: "g-semester", 
    title: "Plan Semestral", 
    monthly: 14990, 
    save: "Ahorras $30.000",
    desc: "La opción más económica a largo plazo."
  },
];

// 🙌 Convenio Iglesias (El "Gancho" de Volumen)
export const CHURCH_CONVENIO = {
  enabled: true,
  monthlyFlat: 12990, // Margen seguro sobre los $7.200 de la profe
  label: "Convenio Iglesias / Ministerios",
  note: "Tarifa preferencial aplicada por convenio activo.",
};

// 🧑‍🏫 Planes 1:1 (SIMPLIFICADO: PACKS DE HORAS)
// Esto es mucho más fácil de vender que una mensualidad fija 1:1.
// El alumno controla su presupuesto y el profesor llena sus huecos.
export const LSCH_ONE2ONE_PLANS = [
  { 
    id: "o-light", 
    title: "Pack Básico (4h/mes)", 
    monthly: 45000, 
    detail: "1 hora semanal",
    badge: "Refuerzo"
  },
  { 
    id: "o-standard", 
    title: "Pack Estándar (8h/mes)", 
    monthly: 80000, 
    detail: "2 horas semanales",
    badge: "Popular"
  },
  { 
    id: "o-intensive", 
    title: "Pack Intensivo (12h/mes)", 
    monthly: 110000, 
    detail: "3 horas semanales",
    badge: "Acelerado"
  },
];

// 🎯 Propósitos
export const LSCH_PURPOSES = [
  "Ministerio de Sordos / Iglesia",
  "Desarrollo Profesional (Salud/Educación)",
  "Interés Personal / Cultura",
  "Tengo familiares/amigos sordos",
];

// ===== Helpers =====
export function priceForGroupPlan(plan, { church = false } = {}) {
  if (!plan) return 0;
  // Si es convenio iglesia, el precio es plano ($12.990) sin importar el plan elegido
  // Esto simplifica la decisión para ellos: "Tengo convenio, pago esto".
  if (church && CHURCH_CONVENIO.enabled) return CHURCH_CONVENIO.monthlyFlat;
  return plan.monthly;
}