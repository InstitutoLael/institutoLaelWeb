// src/data/lsch.js
// === Lengua de Señas Chilena (LSCh) — Datos y Precios Oficiales ===

/* ──────────────────────────────────────────────────────────────────────────
   1. CONFIGURACIÓN BASE Y FORMATEADORES
   ────────────────────────────────────────────────────────────────────────── */

// 🔢 Formateador de Moneda (CLP)
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

// 🧾 Matrícula (Costo de incorporación)
export const ENROLLMENT_FEE = 15000; 
export const ENROLLMENT_LABEL = "Matrícula Anual y Plataforma";

// 📢 Slogan para WhatsApp
export const LSCH_TAGLINE = "Rompe la barrera del sonido.";

/* ──────────────────────────────────────────────────────────────────────────
   2. ESTRUCTURA ACADÉMICA (Módulos)
   ────────────────────────────────────────────────────────────────────────── */
export const LSCH_MODULES = [
  {
    id: "nivel-1",
    tag: "A1 • Básico",
    name: "Iniciación Visual",
    summary: "Aprende el alfabeto, saludos, familia y estructura básica. Deja de usar la voz y activa tus manos.",
  },
  {
    id: "nivel-2",
    tag: "A2 • Intermedio",
    name: "Gramática Espacial",
    summary: "Verbos direccionales, clasificadores y tiempos verbales. Construye oraciones complejas sin traducir del español.",
  },
  {
    id: "nivel-3",
    tag: "B1 • Avanzado",
    name: "Contexto Profesional",
    summary: "Vocabulario técnico para salud, educación y atención al cliente. Interpretación y fluidez conversacional.",
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   3. PLANES GRUPALES (Lógica de Suscripción)
   ────────────────────────────────────────────────────────────────────────── */
export const LSCH_GROUP_PLANS = [
  { 
    id: "g-month", 
    title: "Plan Mensual Flexible", 
    desc: "Sin compromiso de permanencia.",
    monthly: 24990, // Precio "caro" para incentivar el trimestral
    enrollmentWaived: false, // Paga matrícula
    badge: null,
  },
  { 
    id: "g-quarter", 
    title: "Plan Trimestral", 
    desc: "El favorito de los estudiantes.",
    monthly: 19990, // Ahorro de $5.000 mensuales
    enrollmentWaived: true, // Matrícula GRATIS
    badge: "🔥 Matrícula Gratis",
  },
];

// 🙌 CONVENIO IGLESIAS (Tarifa Plana Especial)
export const CHURCH_PRICE = 14990; 

/* ──────────────────────────────────────────────────────────────────────────
   4. CLASES PARTICULARES (Refuerzo 1 a 1)
   ────────────────────────────────────────────────────────────────────────── */
export const LSCH_ONE2ONE_PLANS = [
  { 
    id: "o-light", 
    title: "Pack 4 Sesiones", 
    monthly: 60000, // $15.000 por clase
  },
  { 
    id: "o-standard", 
    title: "Pack 8 Sesiones", 
    monthly: 110000, // ~$13.750 por clase
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   5. RAZONES CORPORATIVAS
   ────────────────────────────────────────────────────────────────────────── */
export const CORPORATE_WHY = [
  { 
    title: "Ley de Inclusión 21.015", 
    desc: "Capacita a tu equipo y cumple con la normativa laboral vigente en Chile." 
  },
  { 
    title: "Experiencia de Cliente", 
    desc: "Atender a una persona sorda en su idioma marca una diferencia competitiva." 
  },
  { 
    title: "Habilidad Blanda", 
    desc: "Desarrolla la empatía, expresión corporal y comunicación no verbal del equipo." 
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   6. CALCULADORA DE PRECIOS (La Lógica Maestra)
   ────────────────────────────────────────────────────────────────────────── */
/**
 * Calcula el precio mensual a pagar según el plan y si es convenio Iglesia.
 * @param {Object} plan - El objeto del plan seleccionado (del array LSCH_GROUP_PLANS)
 * @param {Object} options - { church: boolean }
 * @returns {Number} El precio mensual final.
 */
export function priceForGroupPlan(plan, options = {}) {
  const { church } = options;

  // 1. Si no hay plan seleccionado, $0
  if (!plan) return 0;

  // 2. Si marcó "Soy Iglesia/Ministerio", precio fijo congelado
  // (Anula el precio del plan normal porque es un convenio especial)
  if (church) {
    return CHURCH_PRICE;
  }

  // 3. Si es estudiante normal, devuelve el precio del plan (Mensual o Trimestral)
  return plan.monthly;
}