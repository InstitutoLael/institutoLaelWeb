// src/data/lsch.js
// === Lengua de Señas Chilena — Instituto Lael ===
// Actualizado 2025–2026: versión profesional y coherente con branding general.

// 🔢 Utilidad: formato CLP
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

// 🧾 Matrícula única (obligatoria, pago inicial)
export const LSCH_ENROLLMENT_FEE = 10990;

/**
 * 🎯 Política de precios 2025–2026
 * - Programas grupales con descuentos por duración.
 * - Precio preferente para iglesias o comunidades con convenio.
 * - Todos los cursos incluyen clases en vivo, material descargable y diploma.
 */

// 🧩 Estructura anual: 4 módulos + taller final
export const LSCH_MODULES = [
  {
    id: "lsch-m1",
    name: "Módulo 1 · Nivel Inicial",
    tag: "A0–A1",
    bullets: [
      "Alfabeto manual, saludos y presentaciones",
      "Vocabulario cotidiano y expresiones básicas",
      "Primer contacto con la comunidad sorda",
    ],
    servesFor: [
      "Comenzar desde cero en LSCh",
      "Voluntariado o atención básica inclusiva",
    ],
    accent: "#16a34a",
  },
  {
    id: "lsch-m2",
    name: "Módulo 2 · Nivel Básico",
    tag: "A1–A2",
    bullets: [
      "Rutinas y contextos de servicio",
      "Preguntas y respuestas frecuentes",
      "Role-play y vocabulario ampliado (hogar, trabajo, estudio)",
    ],
    servesFor: [
      "Atención de público inclusiva",
      "Apoyo a compañeros/as sordos en clases o trabajo",
    ],
    accent: "#10b981",
  },
  {
    id: "lsch-m3",
    name: "Módulo 3 · Nivel Intermedio",
    tag: "A2–B1",
    bullets: [
      "Contextos laborales y profesionales",
      "Narración de experiencias y opiniones",
      "Feedback y retroalimentación guiada",
    ],
    servesFor: [
      "Interacción fluida con personas sordas",
      "Comunicación en entornos laborales inclusivos",
    ],
    accent: "#22c55e",
  },
  {
    id: "lsch-conv",
    name: "Taller de Conversación y Práctica",
    tag: "B1+",
    bullets: [
      "Simulación de casos reales",
      "Conversación espontánea y correcciones en vivo",
      "Perfeccionamiento de precisión y fluidez",
    ],
    servesFor: [
      "Uso frecuente en trabajo o comunidad",
      "Mantener y profundizar la competencia comunicativa",
    ],
    accent: "#059669",
  },
];

// 💡 Planes grupales 100% online (mercado general)
export const LSCH_GROUP_PLANS = [
  { id: "g-month", title: "Mensual", months: 1, monthly: 16990, badge: "Flexible" },
  { id: "g-quarter", title: "Trimestral", months: 3, monthly: 14990, total: 14990 * 3, save: "–12%" },
  { id: "g-semester", title: "Semestral", months: 6, monthly: 12990, total: 12990 * 6, save: "–24%" },
  { id: "g-annual", title: "Anual", months: 12, monthly: 11990, total: 11990 * 12, save: "–29%" },
];

// 🙌 Convenio Iglesias o Comunidades
export const CHURCH_CONVENIO = {
  enabled: true,
  codeExamples: ["CCINT", "IGLESIA", "FUNDACIÓN"],
  monthlyFlat: 10990, // antes 11.990 → más coherente y simple
  label: "Convenio Iglesias / Fundaciones",
  note: "Valor preferente para comunidades con convenio confirmado.",
};

// 🧑‍🏫 Planes individuales (1:1) — 100% online
export const LSCH_ONE2ONE_PLANS = [
  { id: "o-month", title: "Mensual 1:1", months: 1, monthly: 34990, badge: "Personalizado" },
  { id: "o-quarter", title: "Trimestral 1:1", months: 3, monthly: 32990, total: 32990 * 3, save: "–6%" },
  { id: "o-semester", title: "Semestral 1:1", months: 6, monthly: 30990, total: 30990 * 6, save: "–12%" },
  { id: "o-annual", title: "Anual 1:1", months: 12, monthly: 28990, total: 28990 * 12, save: "–18%" },
];

// 🎯 Propósitos (orientativos, no alteran precio)
export const LSCH_PURPOSES = [
  "Atención de público inclusiva",
  "Trabajo con equipos o personas sordas",
  "Responsabilidad social / inclusión institucional",
  "Interés personal o familiar",
  "Otro (lo indicaré en mi mensaje)",
];

// ===== Helpers =====
export function priceForGroupPlan(plan, { church = false } = {}) {
  if (!plan) return 0;
  if (church && CHURCH_CONVENIO.enabled) return CHURCH_CONVENIO.monthlyFlat;
  return plan.monthly;
}