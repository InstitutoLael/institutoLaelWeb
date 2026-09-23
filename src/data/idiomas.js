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
