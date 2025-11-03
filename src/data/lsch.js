// src/data/lsch.js
// === LSCh 100% online — Instituto Lael ===

// 🔢 Util: CLP (reutilizable)
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

// 🧾 Matrícula única (obligatoria, pago inicial)
export const LSCH_ENROLLMENT_FEE = 10990;

/**
 * 🎯 Política de precios (2025)
 * - Mercado “general” (grupal): mensual flexible alto, y mejores precios por duración.
 * - Iglesias con convenio (p. ej. CCINT del Ps. Abel Palma): precio preferente
 *   plano por mes (simple de comunicar): 11.990/mes.
 *
 * Nota: El precio preferente se aplica sólo a planes GRUPALES.
 */

// 🧩 4 cursos al año (cada uno con diploma)
export const LSCH_MODULES = [
  {
    id: "lsch-m1",
    name: "Módulo 1 · Inicial",
    tag: "A0–A1",
    bullets: [
      "Alfabeto, saludos y presentaciones",
      "Vocabulario cotidiano",
      "Estructuras básicas y expresiones frecuentes",
    ],
    servesFor: [
      "Primer acercamiento a la comunidad sorda",
      "Voluntariado o atención básica inclusiva",
    ],
    accent: "#16a34a",
  },
  {
    id: "lsch-m2",
    name: "Módulo 2 · Básico",
    tag: "A1–A2",
    bullets: [
      "Rutinas y contextos de servicio",
      "Preguntas/respuestas y role-play",
      "Vocabulario ampliado (hogar/estudio/trabajo)",
    ],
    servesFor: [
      "Atención de público inclusiva",
      "Apoyo a compañeros/as sordos en clases o trabajo",
    ],
    accent: "#10b981",
  },
  {
    id: "lsch-m3",
    name: "Módulo 3 · Intermedio",
    tag: "A2–B1",
    bullets: [
      "Contextos laborales (reuniones/procesos)",
      "Narración de experiencias",
      "Feedback y correcciones guiadas",
    ],
    servesFor: [
      "Desenvolvimiento fluido en equipos",
      "Interacción cotidiana con usuarios sordos",
    ],
    accent: "#22c55e",
  },
  {
    id: "lsch-conv",
    name: "Taller de Conversación",
    tag: "B1+",
    bullets: [
      "Situaciones reales y casos",
      "Correcciones en vivo",
      "Refuerzo de precisión y fluidez",
    ],
    servesFor: [
      "Uso laboral frecuente",
      "Mantener y escalar la competencia comunicativa",
    ],
    accent: "#059669",
  },
];

// 💡 Planes GRUPALES (100% online) — mercado general
export const LSCH_GROUP_PLANS = [
  { id: "g-month",    title: "Mensual",     months: 1,  monthly: 17990, badge: "Flexible" },
  { id: "g-quarter",  title: "Trimestral",  months: 3,  monthly: 15990, total: 15990 * 3, save: "–11%" },
  { id: "g-semester", title: "Semestral",   months: 6,  monthly: 13990, total: 13990 * 6, save: "–22%" },
  { id: "g-annual",   title: "Anual",       months: 12, monthly: 12990, total: 12990 * 12, save: "–27%" },
];

// 🙌 Convenio Iglesias (p. ej. CCINT): precio preferente simple
export const CHURCH_CONVENIO = {
  enabled: true,
  codeExamples: ["CCINT", "IGLESIA"], // referencial; lo puedes mostrar en UI
  monthlyFlat: 11990,                  // precio por mes (cualquier duración)
  label: "Convenio Iglesias",
  note: "Precio preferente por convenio (requiere confirmar iglesia).",
};

// 🧑‍🏫 Planes 1:1 (particulares) — 100% online
export const LSCH_ONE2ONE_PLANS = [
  { id: "o-month",    title: "Mensual 1:1",     months: 1,  monthly: 39990, badge: "Personalizado" },
  { id: "o-quarter",  title: "Trimestral 1:1",  months: 3,  monthly: 37990, total: 37990 * 3, save: "–5%" },
  { id: "o-semester", title: "Semestral 1:1",   months: 6,  monthly: 35990, total: 35990 * 6, save: "–10%" },
  { id: "o-annual",   title: "Anual 1:1",       months: 12, monthly: 33990, total: 33990 * 12, save: "–14%" },
];

// 🎯 Propósitos (no alteran precio; nos ayudan a orientar)
export const LSCH_PURPOSES = [
  "Atención de público inclusiva",
  "Trabajo con equipo/personas sordas",
  "Innovación y RSE",
  "Interés personal / familiar",
  "Otro (lo indico en el mensaje)",
];

// ===== Helpers de precio =====
export function priceForGroupPlan(plan, { church = false } = {}) {
  if (!plan) return 0;
  if (church && CHURCH_CONVENIO.enabled) return CHURCH_CONVENIO.monthlyFlat;
  return plan.monthly;
}