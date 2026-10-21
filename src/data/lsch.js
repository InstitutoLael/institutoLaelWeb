// src/data/lsch.js
// === Lengua de Señas Chilena (LSCh) - El Idioma de las Manos ===
import entenderImg from '../assets/img/Home/media_lsch_entender_1780735268668.webp';
import comenzarImg from '../assets/img/Home/media_lsch_comenzar_1780735268676.webp';
import avanzarImg from '../assets/img/Home/media_lsch_avanzar_1780735268706.webp';

/* ──────────────────────────────────────────────────────────────────────────
   0. CONTENIDO DE LA PÁGINA /lsch (LandingLSCh.jsx)
   ────────────────────────────────────────────────────────────────────────── */

export const LANDING_SLIDES = [
  { img: entenderImg, title: "Aprender señas es entender", desc: "Aprendes a comunicarte con personas Sordas.", badge: "ENTENDER" },
  { img: comenzarImg, title: "Aprender señas es comenzar", desc: "Empiezas desde cero, sin saber ninguna seña.", badge: "COMENZAR" },
  { img: avanzarImg, title: "Aprender señas es avanzar", desc: "Vas nivel por nivel, del A1 al B1.", badge: "AVANZAR" }
];

export const LANDING_LEVELS = [
  { code: "A1", name: "Nivel Inicial", duration: "3 Meses", desc: "Partes de cero: el abecedario con las manos (dactilológico), saludos, vocabulario del día a día y tus primeras frases sin usar la voz.", items: ["Abecedario y números", "Familia y entorno social", "Saludos y expresiones básicas", "Estructura espacial inicial"] },
  { code: "A2", name: "Nivel Intermedio", duration: "3 Meses", desc: "Aquí aprendes a usar el espacio al señar, los clasificadores y los verbos direccionales, para describir un lugar o contar algo que pasó.", items: ["Direccionalidad verbal", "Clasificadores espaciales", "Descripción de trayectorias", "Vocabulario extendido"] },
  { code: "B1", name: "Nivel Conversacional", duration: "4 Meses", desc: "Ya conversas con más soltura. Practicas situaciones de trabajo y atención al público, y vemos qué dice la Ley de Inclusión Laboral 21.015.", items: ["Entornos laborales y de atención", "Vocabulario de inclusión", "Conversación espontánea", "Cultura de la comunidad Sorda"] }
];

/* ──────────────────────────────────────────────────────────────────────────
   1. CONFIGURACIÓN BASE
   ────────────────────────────────────────────────────────────────────────── */

export const ENROLLMENT_FEE = 9990;
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

/* ──────────────────────────────────────────────────────────────────────────
   2. ESTRUCTURA ACADÉMICA (Módulos de Aprendizaje)
   ────────────────────────────────────────────────────────────────────────── */
/* ──────────────────────────────────────────────────────────────────────────
   3. PLANES GRUPALES (Suscripción Mensual)
   ────────────────────────────────────────────────────────────────────────── */
/* ──────────────────────────────────────────────────────────────────────────
   4. CLASES PARTICULARES (Personalizado)
   ────────────────────────────────────────────────────────────────────────── */
/* ──────────────────────────────────────────────────────────────────────────
   5. VALORES CORPORATIVOS (Para la Web)
   ────────────────────────────────────────────────────────────────────────── */
/* ──────────────────────────────────────────────────────────────────────────
   6. CALCULADORA DE PRECIOS
   ────────────────────────────────────────────────────────────────────────── */
/* ──────────────────────────────────────────────────────────────────────────
   8. COMPARATIVE DATA (LSCh)
   ────────────────────────────────────────────────────────────────────────── */
export const COMPARISON_DATA = [
  { feature: "Profesor", us: "Docentes de LSCh", others: "Variable" },
  { feature: "Clases", us: "En señas, sin voz", others: "Hablan y señan" },
  { feature: "Enfoque", us: "Gramática y cultura Sorda", others: "Vocabulario suelto" },
  { feature: "Certificado", us: "Por nivel aprobado", others: "Solo asistencia" }
];
/* ──────────────────────────────────────────────────────────────────────────
   9. PRÓXIMA APERTURA (ya hay docente, aún sin anunciar)
   ────────────────────────────────────────────────────────────────────────── */
// Mostrar u ocultar el precio en /lsch (franja de datos, plan y preguntas).
export const SHOW_PRICE = true;
export const PRECIO_MES = 24990;

// Docente: mientras falte algo, el bloque no se muestra en la página.
// Completar con su autorización: foto (importada), nombre y una frase.
export const DOCENTE_LSCH = {
  foto: null,
  nombre: '',
  frase: '',
  // Video de bienvenida en LSCh con subtítulos (link de YouTube). Vacío = oculto.
  video: '',
};

export const FAQ_LSCH = [
  { q: '¿Necesito saber algo antes?', a: 'No. El curso parte desde cero.' },
  { q: '¿Cuándo empieza?', a: 'Te avisamos apenas se complete el grupo. Mientras, puedes guardar tu cupo sin pagar.' },
  { q: '¿Tengo que pagar para guardar mi cupo?', a: 'No. Guardar tu cupo es gratis y sin compromiso.' },
  { q: '¿Cómo son las clases?', a: 'Online en vivo, en grupo, con docente de la comunidad Sorda.' },
  { q: '¿Entregan certificado?', a: 'Sí, un certificado por cada nivel que apruebas.' },
  { q: '¿Cuánto cuesta?', a: '$24.990 al mes. La matrícula es gratis.', precio: true },
];
