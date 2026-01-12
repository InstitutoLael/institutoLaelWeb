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
    desc: "Aprende el alfabeto, saludos, familia y estructura básica. Deja de usar la voz y activa tus manos.", // Cambié summary por desc para compatibilidad
  },
  {
    id: "nivel-2",
    tag: "A2 • Intermedio",
    name: "Gramática Espacial",
    desc: "Verbos direccionales, clasificadores y tiempos verbales. Construye oraciones complejas sin traducir del español.",
  },
  {
    id: "nivel-3",
    tag: "B1 • Avanzado",
    name: "Contexto Profesional",
    desc: "Vocabulario técnico para salud, educación y atención al cliente. Interpretación y fluidez conversacional.",
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
    price: 24990, // Usamos 'price' estándar para evitar errores
    monthly: 24990, 
    enrollmentWaived: false,
    features: [ // Agregado para que se vea la lista en la tarjeta
      "8 Clases en vivo por Zoom",
      "Acceso a grabaciones",
      "Certificado de asistencia",
      "Pago mes a mes"
    ],
    highlight: false,
  },
  { 
    id: "g-quarter", 
    title: "Plan Trimestral", 
    desc: "El favorito de los estudiantes.",
    price: 19990, // Precio visual referencia
    monthly: 19990,
    enrollmentWaived: true, 
    features: [
      "Todo lo del plan mensual",
      "🔥 Matrícula GRATIS",
      "Ahorras $15.000",
      "Diploma físico al aprobar"
    ],
    highlight: true, // Destaca la tarjeta
    tag: "Mejor Opción",
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
    price: 60000,
    monthly: 60000, 
    features: ["Horario Flexible", "Enfoque personalizado", "Material PDF"],
  },
  { 
    id: "o-standard", 
    title: "Pack 8 Sesiones", 
    price: 110000,
    monthly: 110000, 
    features: ["Ideal para nivelación", "Feedback intensivo", "Soporte WhatsApp"],
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
export function priceForGroupPlan(plan, options = {}) {
  const { church } = options;

  if (!plan) return 0;

  // Si marcó "Soy Iglesia/Ministerio", precio fijo congelado
  if (church) {
    return CHURCH_PRICE;
  }

  // Retornamos price o monthly (seguridad por si la variable cambia)
  return plan.price || plan.monthly;
}