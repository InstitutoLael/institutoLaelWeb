// src/data/paes.js
// === Sistema de Alto Rendimiento PAES Lael ===
import { Video, BookOpen, Award, Heart, Users } from "lucide-react";
import diegoPhoto from "../assets/img/Equipo/diego-chaparro-avatar.webp";

/* ──────────────────────────────────────────────────────────────────────────
   0. CONTENIDO DE LA PÁGINA /paes (LandingPAES.jsx)
   ────────────────────────────────────────────────────────────────────────── */

export const LANDING_FEATURES = [
  { title: "Clases en vivo", desc: "Clases interactivas vía Google Meet en tiempo real. Docentes reales que responden tus dudas en el acto.", icon: Video },
  { title: "Material de estudio", desc: "Guías de teoría y ejercicios para descargar, y la grabación de cada clase para repasar durante la semana.", icon: BookOpen },
  { title: "Ensayos PAES", desc: "Ensayos propios, hechos por nuestros profes con el formato y el tiempo de la PAES, una vez al mes.", icon: Award },
  { title: "Acompañamiento", desc: "Apoyo y mentoría constante de un equipo que se preocupa por tu bienestar y desarrollo integral.", icon: Heart },
  { title: "Comunidad activa", desc: "Un grupo dinámico con tus compañeros para resolver dudas grupales, compartir tips y motivarse día a día.", icon: Users }
];

export const LANDING_SUBJECTS = [
  { code: "M1", name: "Matemática M1", type: "Obligatoria", desc: "Resolución de problemas lógicos, modelamiento numérico y estadísticas fundamentales para asegurar tu puntaje base.", teacher: "Diego Chaparro" },
  { code: "M2", name: "Matemática M2", type: "Electiva", desc: "Álgebra avanzada, funciones complejas y razonamiento abstracto de alta selectividad para carreras STEM.", teacher: "Diego Chaparro & Kathy" },
  { code: "CL", name: "Competencia Lectora", type: "Obligatoria", desc: "Comprensión de lectura crítica, análisis de textos y técnicas de descarte rápido bajo presión de tiempo.", teacher: null },
  { code: "HIS", name: "Historia y Ciencias Sociales", type: "Electiva", desc: "Historia de Chile y global del siglo XX, formación ciudadana y análisis dinámico de procesos sociales.", teacher: null },
  { code: "BIO", name: "Ciencias - Biología", type: "Electiva", desc: "Estructuras celulares, genética, evolución de los ecosistemas y el temario oficial del DEMRE.", teacher: "Martín" },
  { code: "FIS", name: "Ciencias - Física", type: "Electiva", desc: "Ondas, mecánica newtoniana, energía y electricidad explicados de forma aplicable y libre de memorizaciones.", teacher: null },
  { code: "QUI", name: "Ciencias - Química", type: "Electiva", desc: "Modelamiento atómico, reacciones, química orgánica y termodinámica simplificadas al máximo.", teacher: "Martín" }
];

export const LANDING_TEACHERS = [
  { name: "Diego Chaparro", subject: "Matemática M1 + M2", bio: "Fundador de Instituto Lael. Enseña matemáticas con la misma exigencia con la que dirige el instituto: sin atajos, pero sin dejar a nadie atrás.", img: diegoPhoto },
  { name: "Martín", subject: "Biología + Química", bio: "Convierte biología y química en algo que se entiende, no que se memoriza. Cercano y directo, sin vueltas.", img: "https://ui-avatars.com/api/?name=Martin+Ciencias&background=071D49&color=D7E400&size=200&bold=true" },
  { name: "Kathy", subject: "Matemática M2", bio: "Matemática superior y HomeSchool. Le importa que entiendas el porqué, no solo el cómo.", img: "https://ui-avatars.com/api/?name=Kathy+M2&background=071D49&color=D7E400&size=200&bold=true" }
];

export const LANDING_STEPS = [
  { num: "01", title: "Inscripción Gratis", desc: "Haz clic en el botón de inscripción y asegura tu cupo - la matrícula no tiene costo." },
  { num: "02", title: "Clases por Asignatura", desc: "Conéctate a nuestras clases vespertinas en vivo a través de Google Meet con profesores reales." },
  { num: "03", title: "Ensayos Mensuales", desc: "Una vez al mes haces un ensayo con el tiempo real de la prueba, para ver cómo vas y acostumbrarte al reloj." }
];

export const LANDING_FAQS = [
  { q: "¿Cuánto cuesta? ¿Hay costos ocultos?", a: "La matrícula es gratis. Cada ramo tiene su propio valor desde $10.000/mes, y si tomas 4 o más, nunca pagas sobre $34.990 - sin letra chica ni cobros extra por material. Si aun así no puedes cubrirlo, puedes postular a una beca parcial: la revisamos caso a caso." },
  { q: "¿Qué necesito para participar en las clases?", a: "Solo requieres un dispositivo (computador, tablet o celular) con conexión a internet y una cuenta de Google para conectarte a las sesiones a través de Google Meet." },
  { q: "¿Cuántas clases tengo a la semana?", a: "Dos clases en vivo de una hora por cada ramo, en horario vespertino. Así alcanzamos a ver todo el temario antes de la prueba y dejamos las últimas semanas para un intensivo aparte." },
  { q: "¿Qué pasa si me pierdo una clase?", a: "Todas las clases se graban y cada semana compartimos las grabaciones con quienes tienen su mensualidad al día. Y si una clase no se puede hacer, la reagendamos: estás pagando por ella." },
  { q: "¿Puedo entrar al programa en cualquier momento?", a: "Sí, puedes unirte durante el año. Eso sí, cada curso tiene máximo 20 alumnos para que las clases sean personalizadas, así que conviene asegurar tu cupo pronto." },
  { q: "¿Cómo me inscribo?", a: "Haz clic en el botón INSCRIBIRME y llenarás un formulario breve. También puedes escribirnos por WhatsApp." },
  { q: "Soy menor de edad, ¿puedo inscribirme?", a: "Sí. En el formulario de inscripción te pedimos también los datos de tu apoderado, para mantenerlo al tanto." },
  { q: "¿En qué horario son las clases?", a: "Desde las 18:00, de lunes a viernes. Dejamos un día de la semana libre para hacer clases recuperativas. El horario exacto de cada ramo te lo enviamos al inscribirte." },
  { q: "¿Hay algo antes de marzo?", a: "Sí. En el verano haremos cursos cortos para partir con ventaja. Síguenos en Instagram o escríbenos por WhatsApp y te avisamos cuando abran." },
  { q: "¿Sirve si voy a rendir PAES en noviembre?", a: "Sí. Partimos la primera semana de marzo de 2027 para acompañarte con meses de anticipación. Y entre un mes y un mes y medio antes de la prueba hacemos un intensivo aparte, para repasar todo." }
];

/* ──────────────────────────────────────────────────────────────────────────
   1. CONFIGURACIÓN FINANCIERA Y BASE
   ────────────────────────────────────────────────────────────────────────── */

export const ENROLLMENT_FEE = 10990;
export const ACADEMIC_MONTHS = 8;

export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

/* ──────────────────────────────────────────────────────────────────────────
   2. EL CEREBRO: CALCULADORA DE INVERSIÓN
   ────────────────────────────────────────────────────────────────────────── */

// Cada profe cobra por SU ramo, independiente de si el alumno paga por
// asignatura o toma el Plan Completo. Si el pack hace que el alumno pague
// menos que la suma de sus ramos, la diferencia la absorbe el instituto -
// nunca el profe.
export const OBLIGATORIA_PRICE = 12000;
export const ELECTIVA_PRICE = 10000;
export const PACK_PRICE = 34990;
export const PACK_MIN_SUBJECTS = 4;

/* ──────────────────────────────────────────────────────────────────────────
   3. MÓDULOS DE ENTRENAMIENTO (DATA DETALLADA)
   ────────────────────────────────────────────────────────────────────────── */
/* ──────────────────────────────────────────────────────────────────────────
   4. PLANES (sección "Planes y precios" de /paes)
   Los montos salen de las constantes de arriba: si cambia un precio, se
   cambia ahí y los planes se actualizan solos.
   ────────────────────────────────────────────────────────────────────────── */

export const PAES_FORM_URL = "https://forms.gle/H86nFAQ2DJ8CCQ7y6";
export const BECAS_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSehVHEaZpQaQpSDKzHarHhPfgVzEPqyl5Q--Wa5r5KJFQwh9g/viewform";

const OBLIGATORIAS_TOTAL = OBLIGATORIA_PRICE * 2;
const TRES_RAMOS_TOTAL = OBLIGATORIAS_TOTAL + ELECTIVA_PRICE;

export const PAES_PLANS = [
  {
    id: "ramo",
    name: "Por ramo",
    priceLabel: `desde ${clp(ELECTIVA_PRICE)}`,
    period: "/mes por ramo",
    desc: "Para reforzar solo lo que te cuesta.",
    features: [
      `Electivas (M2, Historia, Biología, Química, Física): ${clp(ELECTIVA_PRICE)}/mes`,
      `Obligatorias (M1, Competencia Lectora): ${clp(OBLIGATORIA_PRICE)}/mes`,
      "2 clases en vivo a la semana + grabaciones",
    ],
  },
  {
    id: "obligatorias",
    name: "Obligatorias",
    priceLabel: clp(OBLIGATORIAS_TOTAL),
    period: "/mes",
    desc: "M1 + Competencia Lectora: la base para postular a cualquier carrera.",
    features: [
      "Matemática M1 y Competencia Lectora",
      `Suma una electiva por ${clp(ELECTIVA_PRICE)} más`,
      "Ensayo mensual de ambas pruebas",
    ],
  },
  {
    id: "completo",
    name: "Plan Completo",
    priceLabel: clp(PACK_PRICE),
    period: "/mes",
    desc: `${PACK_MIN_SUBJECTS} ramos o más, por un precio fijo.`,
    features: [
      `Desde ${PACK_MIN_SUBJECTS} ramos pagas ${clp(PACK_PRICE)}, aunque los tomes todos`,
      `3 ramos ya cuestan ${clp(TRES_RAMOS_TOTAL)}: el cuarto sale casi gratis`,
      "Clases, grabaciones y ensayos de todos tus ramos",
    ],
    featured: true,
  },
];

// "Trae un amigo": el descuento lo absorbe el instituto, nunca el profe
// (igual que el Plan Completo).
export const REFERRAL_DISCOUNT = 20; // % por amigo, en la siguiente mensualidad
export const REFERRAL_MAX_FRIENDS = 100 / REFERRAL_DISCOUNT; // 5 amigos = mes gratis

export const REFERRAL = {
  title: "Trae un amigo",
  desc: `Por cada amigo que se inscriba y pague su primer mes, tu siguiente mensualidad baja un ${REFERRAL_DISCOUNT}%. Con ${REFERRAL_MAX_FRIENDS} amigos, ese mes no pagas.`,
};

export const PAES_PLAN_INCLUDES = "Máximo 20 alumnos por curso. Todos los planes: matrícula gratis, clases en vivo por Google Meet en horario vespertino, grabaciones para repasar, guías descargables y ensayo mensual.";
