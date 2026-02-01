// src/data/nivelacion.js
// === Programa Caminos: Nivelación de Estudios (2x1) ===
// Estrategia: "Robin Hood" (Subsidio Cruzado para el Chile real)

/* ──────────────────────────────────────────────────────────────────────────
   1. CONFIGURACIÓN FINANCIERA & BASE
   ────────────────────────────────────────────────────────────────────────── */

export const REGISTRATION_FEE = 2990; // Matrícula de compromiso
export const ACADEMIC_CYCLE = "Ciclo 2026";

export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

// Mensaje para el ticket de pago/inscripción
export const SOCIAL_CONTRACT = "Al elegir el Cupo Social, me comprometo a asistir al 80% de las clases para mantener el beneficio.";

/* ──────────────────────────────────────────────────────────────────────────
   2. MANIFIESTO Y PROPUESTA DE VALOR
   ────────────────────────────────────────────────────────────────────────── */
export const CAMINOS_CONTENT = {
  subtitle: "Programa Caminos 2026",
  title: "Tu segunda oportunidad comienza hoy",
  heroText: "No importa por qué dejaste de estudiar. Aquí no juzgamos tu pasado, celebramos tu futuro. Recupera tu confianza y tu licencia de 4to medio con un método diseñado para adultos.",
  impactQuote: "En Lael creemos que el dinero no debe ser la barrera para que un chileno termine su escolaridad."
};

/* ──────────────────────────────────────────────────────────────────────────
   3. CICLOS DE ESTUDIO (¿Qué nivelas?)
   ────────────────────────────────────────────────────────────────────────── */
export const STUDY_CYCLES = [
  {
    id: "eb-1",
    name: "Educación Básica (1er Nivel)",
    equivalence: "5to y 6to Básico",
    icon: "📖"
  },
  {
    id: "eb-2",
    name: "Educación Básica (2do Nivel)",
    equivalence: "7mo y 8vo Básico",
    icon: "🖊️"
  },
  {
    id: "em-1",
    name: "Enseñanza Media (1er Nivel)",
    equivalence: "1ero y 2do Medio",
    icon: "🔬"
  },
  {
    id: "em-2",
    name: "Enseñanza Media (2do Nivel)",
    equivalence: "3ero y 4to Medio",
    icon: "🎓"
  }
];

/* ──────────────────────────────────────────────────────────────────────────
   4. PLANES SOLIDARIOS
   ────────────────────────────────────────────────────────────────────────── */
export const PLANS = [
  {
    id: "adultos-social",
    tag: "Beca 100%", 
    title: "Cupo Social",
    price: 0,
    desc: "Para quienes tienen las ganas pero no los recursos. Tu pago es tu asistencia.",
    color: "#78716c", // Stone
    features: [
      "Clases en vivo vía Zoom",
      "Acceso a la plataforma 24/7",
      "Material PDF de estudio",
      "Preparación Exámenes Libres Mineduc",
      "Contrato de Asistencia (Mín. 80%)"
    ],
    cta: "Postular a Gratuidad",
    isPopular: false,
    paymentUrl: null // Gratuidad se gestiona manual
  },
  {
    id: "adultos-estandar",
    tag: "Precio Justo",
    title: "Plan Estándar",
    price: 12990, 
    desc: "Pagas lo justo para mantener la plataforma y apoyar la causa.",
    color: "#0ea5e9", // Sky
    features: [
      "Todo lo del plan Social",
      "Prioridad en corrección de ensayos",
      "Talleres de 'Habilidades para el Trabajo'",
      "Ayudas a financiar becas de otros",
      "Sin requisito mínimo de asistencia"
    ],
    cta: "Inscribirme con Plan Estándar",
    isPopular: true,
    paymentUrl: "" // Pegar link aquí
  },
  {
    id: "adultos-padrino",
    tag: "Héroe Lael",
    title: "Plan Padrino",
    price: 25000, 
    desc: "Pagas tus estudios y financias el cupo completo de un compañero.",
    color: "#f59e0b", // Amber
    features: [
      "Todo lo del plan Estándar",
      "Certificado Digital de 'Padrino Educativo'",
      "Reporte mensual de impacto social",
      "1 Clase particular de refuerzo al mes",
      "Acceso a todos los cursos de soft-skills"
    ],
    cta: "Ser Padrino Educativo",
    isPopular: false,
    paymentUrl: "" // Pegar link aquí
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   5. EL PROCESO (PASO A PASO)
   ────────────────────────────────────────────────────────────────────────── */
export const STEPS = [
  { title: "Inscripción", text: "Eliges tu ciclo y tu plan de pago ($0, $12k o $25k)." },
  { title: "Documentación", text: "Subes tu carnet y certificado de último curso (te ayudamos)." },
  { title: "Clases Online", text: "Conéctate 2 o 3 veces por semana en horario nocturno." },
  { title: "Examen Final", text: "Rindes tus exámenes en una sede asignada por el Mineduc." },
  { title: "Licencia", text: "¡Recibes tu certificado de estudios oficial y legal!" }
];

/* ──────────────────────────────────────────────────────────────────────────
   6. CALCULADORA & HELPERS
   ────────────────────────────────────────────────────────────────────────── */
export function getNivelacionQuote(planId) {
  const plan = PLANS.find(p => p.id === planId) || PLANS[0];
  
  return {
    planId: plan.id,
    title: plan.title,
    monthlyPrice: plan.price,
    registration: REGISTRATION_FEE,
    totalToPayNow: plan.price + REGISTRATION_FEE,
    isFree: plan.price === 0,
    summary: `${plan.title} - Matrícula ${clp(REGISTRATION_FEE)}`
  };
}

export const FAQS = [
  {
    q: "¿Necesito Internet?",
    a: "Sí, las clases son por Zoom. Pero si no puedes conectarte, puedes ver las grabaciones desde tu celular cuando tengas tiempo.",
  },
  {
    q: "¿Tienen límite de edad?",
    a: "Ninguno. Tenemos alumnos desde los 18 hasta los 75 años. Nunca es tarde para cerrar este ciclo.",
  },
  {
    q: "¿Qué pasa si pierdo mi Cupo Social?",
    a: "Si faltas injustificadamente, el cupo se libera para alguien en lista de espera. Puedes re-incorporarte pasando al Plan Estándar.",
  },
  {
    q: "¿El título sirve para la Universidad?",
    a: "Sí. Es el mismo certificado que entrega cualquier colegio de Chile. Puedes dar la PAES y seguir estudiando.",
  }
];

export const REQUIREMENTS = [
  "Cédula de Identidad vigente (o comprobante en trámite).",
  "Certificado de último curso aprobado (lo sacamos gratis con tu RUT).",
  "Tener al menos 18 años cumplidos."
];