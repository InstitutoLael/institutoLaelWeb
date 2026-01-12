// src/data/nivelacion.js
// === Programa Caminos: Nivelación de Estudios (2x1) ===
// Estrategia: "Robin Hood" (Subsidio Cruzado)

/* ──────────────────────────────────────────────────────────────────────────
   1. CONFIGURACIÓN FINANCIERA
   ────────────────────────────────────────────────────────────────────────── */

// 🔢 Formateador
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

// 🧾 Matrícula Simbólica
// $2.990 filtra a los "curiosos" sin dinero, pero es pagable por casi cualquiera.
export const REGISTRATION_FEE = 2990; 

// 🌟 MANIFIESTO (El alma del proyecto)
export const CAMINOS_MANIFESTO = {
  subtitle: "Programa Caminos 2026",
  title: "Tu segunda oportunidad comienza hoy",
  text: "No importa por qué dejaste de estudiar. Aquí no juzgamos tu pasado, celebramos tu futuro. Recupera tu confianza y tu licencia de 4to medio.",
};

/* ──────────────────────────────────────────────────────────────────────────
   2. PLANES (MODELO SOLIDARIO)
   ────────────────────────────────────────────────────────────────────────── */
export const PLANS = [
  {
    id: "social",
    tag: "Beca 100%", 
    title: "Cupo Social",
    price: 0, // GRATIS
    frequency: "mensual",
    desc: "Para quienes tienen las ganas pero no los recursos. Tu pago es tu asistencia.",
    features: [
      "Clases en vivo y grabadas",
      "Material PDF básico",
      "Licencia válida Mineduc",
    ],
    cta: "Postular a Gratuidad",
    isPopular: false,
    color: "stone"
  },
  {
    id: "consciente",
    tag: "Costo Real",
    title: "Plan Estándar",
    price: 12990, // Precio bajo, pero sostenible
    frequency: "mensual",
    desc: "Pagas lo justo para mantener la plataforma y a los profesores.",
    features: [
      "Todo lo del plan Social",
      "Prioridad en corrección de ensayos",
      "Talleres de oficio extra",
      "Ayudas a financiar becas",
    ],
    cta: "Elegir Estándar",
    isPopular: true, // El que queremos vender
    color: "sky"
  },
  {
    id: "padrino",
    tag: "Héroe",
    title: "Plan Padrino",
    price: 25000, 
    frequency: "mensual",
    desc: "Pagas tus estudios y financias el cupo de alguien que no puede pagar.",
    features: [
      "Certificado de 'Padrino Educativo'",
      "Reunión mensual de avance",
      "Clase particular de refuerzo",
      "Karma positivo instantáneo ✨",
    ],
    cta: "Ser Padrino",
    isPopular: false,
    color: "amber"
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   3. CALCULADORA SIMPLE (Para compatibilidad con Checkout)
   ────────────────────────────────────────────────────────────────────────── */
export function getNivelacionQuote(planId) {
  const plan = PLANS.find(p => p.id === planId);
  
  if (!plan) return { total: 0, label: "Elige un plan" };

  return {
    total: plan.price,
    label: plan.title,
    isFree: plan.price === 0,
    enrollment: REGISTRATION_FEE
  };
}

/* ──────────────────────────────────────────────────────────────────────────
   4. METODOLOGÍA (Derribando Miedos)
   ────────────────────────────────────────────────────────────────────────── */
export const METHODOLOGY = [
  {
    icon: "HeartHandshake", // Icono mental (Frontend lo mapea)
    title: "Sin Vergüenza",
    text: "Aquí nadie se ríe. Si te cuesta leer o sumar, empezamos de cero. Paciencia infinita garantizada."
  },
  {
    icon: "Clock", 
    title: "A tu Ritmo",
    text: "Si trabajas o cuidas familia, no te preocupes. Todo queda grabado. No te retamos, te apoyamos."
  },
  {
    icon: "Award", 
    title: "Validez Oficial",
    text: "Te preparamos para los exámenes libres del Mineduc. Tu licencia es 100% real y válida para trabajar o estudiar."
  }
];

export const FAQS = [
  {
    q: "¿De verdad es gratis el Cupo Social?",
    a: "Sí, es $0 mensual. Solo pagas la matrícula anual ($2.990). La condición es no faltar: si te ausentas sin aviso, el cupo pasa a otro.",
  },
  {
    q: "Llevo 20 años sin estudiar...",
    a: "Mejor. Tienes experiencia de vida. Usamos el método de 'Andragogía' (enseñanza para adultos) que aprovecha lo que ya sabes.",
  },
  {
    q: "¿Qué necesito para inscribirme?",
    a: "Cédula de identidad y certificado del último curso aprobado (te ayudamos a sacarlo en línea).",
  },
];