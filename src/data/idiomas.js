// src/data/idiomas.js

/* ──────────────────────────────────────────────────────────────────────────
   1. CONFIGURACIÓN DE INVERSIÓN
   ────────────────────────────────────────────────────────────────────────── */

import { ClaseEnVivo, Ruta, Certificado, Grupo } from '../components/icons/LaelIcons';

/* ──────────────────────────────────────────────────────────────────────────
   CONTENIDO DE LA PÁGINA /idiomas (LandingIdiomas.jsx)
   ────────────────────────────────────────────────────────────────────────── */

export const LANDING_SELECTOR = [
  { id: 'ingles', label: 'Inglés', flag: '🇺🇸', tag: 'Programa Principal' },
  { id: 'espanol', label: 'Español para Expats', flag: '🇨🇱', tag: 'Para Expats' }
];

export const LANDING_REASONS = [
  { title: "Profesores en vivo", desc: "Clases en vivo con un docente que te escucha, te corrige en el momento y responde tus dudas.", icon: ClaseEnVivo },
  { title: "Progresión por niveles", desc: "Niveles basados en el Marco Común Europeo (MCER), con lo que vas a aprender en cada etapa definido desde el inicio.", icon: Ruta },
  { title: "Certificación Lael", desc: "Al aprobar cada nivel recibes un certificado del Instituto Lael que indica el nivel alcanzado.", icon: Certificado },
  { title: "Comunidad de práctica", desc: "Sesiones de conversación con otros alumnos, para que se te suelte la lengua antes de tener que usarlo afuera.", icon: Grupo }
];

export const LANDING_PLANS = [
  {
    name: 'Inglés en Vivo',
    flag: '🇺🇸',
    priceMonthly: '$14.990',
    priceQuarterly: '$11.990',
    enrollment: 'gratis',
    features: ['Clases en vivo con mucha conversación', 'Preparación para IELTS/TOEFL', 'Material de estudio incluido', 'Dudas por WhatsApp en horario hábil'],
    link: "/inscripcion?programa=ingles",
    comingSoon: false,
  },
  {
    name: 'Español para Expats',
    flag: '🇨🇱',
    priceMonthly: '$14.990',
    priceQuarterly: '$11.990',
    enrollment: 'gratis',
    features: ['Modismos y chilenismos', 'Práctica de entrevistas de trabajo', 'Material de estudio incluido', 'Dudas por WhatsApp en horario hábil'],
    link: "/inscripcion?programa=ingles",
    comingSoon: false,
  }
];

export const ENROLLMENT_FEE = 0;
export const ACADEMIC_MONTHS = 9;

export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

export const PRICE_MONTHLY = 14990;
export const PRICE_QUARTERLY = 11990; // precio por mes al pagar trimestral

/* ──────────────────────────────────────────────────────────────────────────
   2. PROGRAMAS DE INMERSIÓN
   ────────────────────────────────────────────────────────────────────────── */
/* ──────────────────────────────────────────────────────────────────────────
   3. VALOR AGREGADO
   ────────────────────────────────────────────────────────────────────────── */
/* ──────────────────────────────────────────────────────────────────────────
   4. SYLLABUS PREVIEW
   ────────────────────────────────────────────────────────────────────────── */
/* ──────────────────────────────────────────────────────────────────────────
   5. ESTRATEGIA COMPARATIVA
   ────────────────────────────────────────────────────────────────────────── */
export const COMPARISON_DATA = [
  { feature: "Enfoque", lael: "Conversación", app: "Repetición", institute: "Gramática" },
  { feature: "Clases", lael: "En vivo con docente", app: "Sin docente", institute: "En sala" },
  { feature: "Práctica oral", lael: "En cada clase", app: "Poca", institute: "Variable" },
  { feature: "Corrección", lael: "Del docente, al momento", app: "Automática", institute: "En pruebas" },
  { feature: "Pago", lael: "Mensual o trimestral", app: "Suscripción", institute: "Variable" }
];

/* ──────────────────────────────────────────────────────────────────────────
   6. EXPERTOS (Mentores Estratégicos)
   ────────────────────────────────────────────────────────────────────────── */
/* ──────────────────────────────────────────────────────────────────────────
   7. FAQS TÁCTICAS
   ────────────────────────────────────────────────────────────────────────── */

/* ──────────────────────────────────────────────────────────────────────────
   8. NIVELES DE INGLÉS (según la planificación anual de Lael)
   ────────────────────────────────────────────────────────────────────────── */
export const INGLES_NIVELES = [
  { code: 'A1', name: 'Empiezas', desc: 'Presente simple y continuo, rutinas, objetos y lugares. Te presentas y hablas de tu día.' },
  { code: 'A2', name: 'Te defiendes', desc: 'Pasado, futuro con will y going to, comparaciones. Compras, pides en un restaurante y cuentas lo que hiciste.' },
  { code: 'B1', name: 'Conversas', desc: 'Pasado perfecto, condicionales, lo que dijo otra persona y expresiones que se usan de verdad.' },
  { code: 'B2', name: 'Te desenvuelves', desc: 'Voz pasiva, dar tu opinión y argumentar, noticias y distintos acentos. Estrategias para exámenes tipo TOEFL o IELTS.' },
];

export const INGLES_PARA_QUIEN = [
  { t: 'Entiendes, pero te bloqueas', d: 'Lees y escuchas bastante, pero cuando te toca hablar no sale nada. Es lo más común, y se arregla hablando.' },
  { t: 'Lo necesitas para la pega', d: 'Una entrevista, reuniones con gente de afuera o un ascenso que pide inglés.' },
  { t: 'Quieres viajar o irte a estudiar', d: 'Moverte tranquilo afuera o prepararte para un examen internacional.' },
  { t: 'Partes de cero', d: 'Nunca aprendiste o se te olvidó todo. Empiezas en A1, sin vergüenza.' },
];

export const INGLES_FAQS = [
  { q: '¿Y si nunca he hablado inglés?', a: 'Partes en el nivel A1. Nadie te va a pedir que hables perfecto: la idea es que te equivoques tranquilo y vayas ganando confianza.' },
  { q: '¿Cómo sé en qué nivel estoy?', a: 'Haz el test de nivel gratis de 10 preguntas. Toma tres minutos y te dice desde dónde partir. En la primera clase lo confirmamos.' },
  { q: '¿Las clases se graban?', a: 'Sí. Cada semana compartimos las grabaciones con quienes tienen su mensualidad al día.' },
  { q: '¿Me dan un certificado?', a: 'Sí, al cerrar cada nivel recibes un certificado de Instituto Lael con el nivel alcanzado. Es un certificado de Lael, no un examen internacional.' },
  { q: '¿Me preparan para el TOEFL o el IELTS?', a: 'En el nivel B2 vemos estrategias para ese tipo de exámenes. Si necesitas una preparación específica para una fecha, escríbenos y lo conversamos.' },
  { q: '¿Hay clases individuales?', a: 'Pregúntanos por WhatsApp por el valor de las clases 1 a 1.' },
];
