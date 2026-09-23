// src/data/paes.js
// === Sistema de Alto Rendimiento PAES Lael ===
import { Video, BookOpen, Award, Heart, Users } from "lucide-react";
import diegoPhoto from "../assets/img/Equipo/diego-chaparro-avatar.webp";

/* ──────────────────────────────────────────────────────────────────────────
   0. CONTENIDO DE LA PÁGINA /paes (LandingPAES.jsx)
   ────────────────────────────────────────────────────────────────────────── */

export const LANDING_FEATURES = [
  { title: "Clases en vivo", desc: "Dos clases a la semana por ramo, por Google Meet. Si no entiendes algo, le preguntas al profe ahí mismo.", icon: Video },
  { title: "Material de estudio", desc: "Guías de teoría y ejercicios para descargar, y la grabación de cada clase para repasar durante la semana.", icon: BookOpen },
  { title: "Ensayos PAES", desc: "Ensayos propios, hechos por nuestros profes con el formato y el tiempo de la PAES, una vez al mes.", icon: Award },
  { title: "Acompañamiento", desc: "Si te estás quedando atrás o andas bajoneado, lo conversamos. Nos importa cómo estás, además de tu puntaje.", icon: Heart },
  { title: "Comunidad activa", desc: "Un grupo con tus compañeros de curso para preguntar dudas, pasarse datos y darse ánimo cuando cuesta.", icon: Users }
];

export const LANDING_SUBJECTS = [
  { code: "M1", name: "Matemática M1", type: "Obligatoria", desc: "Números, álgebra, funciones, geometría y probabilidades. Todo lo que entra en la M1, con mucha ejercitación.", teacher: "Diego Chaparro" },
  { code: "M2", name: "Matemática M2", type: "Electiva", desc: "Los contenidos más avanzados de matemática. La piden muchas carreras de ingeniería y ciencias.", teacher: "Diego Chaparro & Kathy" },
  { code: "CL", name: "Competencia Lectora", type: "Obligatoria", desc: "Practicas con textos tipo PAES para entender bien qué te preguntan y descartar alternativas sin perder tiempo.", teacher: null },
  { code: "HIS", name: "Historia y Ciencias Sociales", type: "Electiva", desc: "Historia de Chile y del mundo en el siglo XX y formación ciudadana, con preguntas al estilo de la PAES.", teacher: null },
  { code: "BIO", name: "Ciencias: Biología", type: "Electiva", desc: "Célula, genética, evolución y el resto del temario oficial del DEMRE.", teacher: "Martín" },
  { code: "FIS", name: "Ciencias: Física", type: "Electiva", desc: "Ondas, mecánica, energía y electricidad, con ejemplos para que entiendas las fórmulas antes de usarlas.", teacher: null },
  { code: "QUI", name: "Ciencias: Química", type: "Electiva", desc: "Modelo atómico, reacciones, química orgánica y termodinámica, explicadas paso a paso.", teacher: "Martín" }
];

export const LANDING_TEACHERS = [
  { name: "Diego Chaparro", subject: "Matemática M1 + M2", bio: "Fundó Lael en 2021 y hace las clases de matemática. Es exigente, pero si alguien se queda atrás, para y lo vuelve a explicar.", img: diegoPhoto },
  { name: "Martín", subject: "Biología + Química", bio: "Hace biología y química. Explica directo y con calma, para que entiendas la materia en vez de aprenderla de memoria.", img: "https://ui-avatars.com/api/?name=Martin+Ciencias&background=071D49&color=D7E400&size=200&bold=true" },
  { name: "Kathy", subject: "Matemática M2", bio: "Hace M2 y trabaja con alumnos de HomeSchool. Antes de pasar a la fórmula, se asegura de que entiendas de dónde sale.", img: "https://ui-avatars.com/api/?name=Kathy+M2&background=071D49&color=D7E400&size=200&bold=true" }
];

export const LANDING_STEPS = [
  { num: "01", title: "Inscripción Gratis", desc: "Llenas el formulario y quedas con tu cupo. La matrícula no se paga." },
  { num: "02", title: "Clases en vivo", desc: "Desde marzo te conectas por Google Meet, a partir de las 18:00. Son dos clases a la semana por ramo." },
  { num: "03", title: "Ensayos Mensuales", desc: "Una vez al mes haces un ensayo con el mismo tiempo que da la PAES, para ver cómo vas y acostumbrarte al reloj." }
];

export const LANDING_FAQS = [
  { q: "¿Cuánto cuesta? ¿Hay costos ocultos?", a: "La matrícula es gratis. Cada ramo tiene su propio valor desde $10.000/mes, y si tomas 4 o más, nunca pagas sobre $34.990. El material no se cobra aparte. Si aun así no te alcanza, puedes postular a una beca parcial: la revisamos caso a caso." },
  { q: "¿Qué necesito para participar en las clases?", a: "Un computador, tablet o celular con internet, y una cuenta de Google para entrar a Google Meet. Nada más." },
  { q: "¿Cuántas clases tengo a la semana?", a: "Dos clases en vivo de una hora por cada ramo, desde las 18:00. Así alcanzamos a ver todo el temario antes de la prueba y dejamos las últimas semanas para un intensivo aparte." },
  { q: "¿Qué pasa si me pierdo una clase?", a: "Todas las clases se graban y cada semana compartimos las grabaciones con quienes tienen su mensualidad al día. Y si una clase no se puede hacer, la reagendamos: estás pagando por ella." },
  { q: "¿Puedo entrar al programa en cualquier momento?", a: "Sí, puedes unirte durante el año. Eso sí, cada curso tiene máximo 20 alumnos para que el profe alcance a ver a cada uno, así que conviene asegurar tu cupo pronto." },
  { q: "¿Cómo me inscribo?", a: "Aprietas el botón INSCRIBIRME y llenas un formulario corto. Si prefieres, nos escribes por WhatsApp y te ayudamos." },
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

export const PAES_FORM_URL = "/inscripcion?programa=paes";
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

export const PAES_PLAN_INCLUDES = "Máximo 20 alumnos por curso. Todos los planes: matrícula gratis, clases en vivo por Google Meet desde las 18:00, grabaciones para repasar, guías descargables y ensayo mensual.";
