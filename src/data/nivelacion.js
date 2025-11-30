// src/data/nivelacion.js

export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

export const PLANS = [
  {
    id: "beca",
    title: "Beca Reinserción",
    price: 0,
    tag: "Cupos Sociales",
    desc: "Para personas en programas de reinserción, gendarmería o situación de calle.",
    features: [
      "Clases grabadas (YouTube)",
      "Material de estudio PDF",
      "Inscripción a exámenes Mineduc",
      "Certificado de participación"
    ],
    cta: "Postular a Beca",
    color: "#34D399", // Verde Esperanza
    wapp: "Hola, necesito postular a la Beca de Reinserción Gratuita. Vengo de..."
  },
  {
    id: "trabajador",
    title: "Plan Solidario",
    price: 12990,
    frequency: "mensual",
    tag: "Tú estudias, tú ayudas",
    desc: "Para trabajadores. Tu mensualidad financia tu educación y apoya una beca.",
    features: [
      "Todo lo de la Beca",
      "Campus Virtual 24/7",
      "Resolución de dudas por WhatsApp",
      "Ayudas a financiar a otros ❤️"
    ],
    cta: "Inscribirme",
    color: "#FBBF24", // Dorado
    wapp: "Hola, quiero terminar mis estudios con el Plan Solidario de $12.990."
  },
  {
    id: "tutor",
    title: "Plan Tutoría",
    price: 29990,
    frequency: "mensual",
    tag: "Clases en Vivo",
    desc: "Para quienes necesitan un profesor en vivo y guía constante.",
    features: [
      "Clases en vivo (Zoom)",
      "Corrección de ensayos",
      "Tutoría personalizada",
      "Donas 2 becas completas ❤️"
    ],
    cta: "Inscribirme",
    color: "#818CF8", // Indigo
    wapp: "Hola, quiero el Plan Tutoría con clases en vivo."
  }
];

export const FAQS = [
  {
    q: "¿Las clases consumen muchos datos?",
    a: "No. Usamos un formato optimizado para celular. Además, enviamos guías en PDF liviano por WhatsApp."
  },
  {
    q: "¿Esto es válido por el Ministerio?",
    a: "Sí. Nosotros te preparamos para rendir los 'Exámenes Libres' del Mineduc. El certificado que obtienes es oficial y válido para trabajar o estudiar."
  },
  {
    q: "¿Cuándo puedo empezar?",
    a: "¡Hoy mismo! Al ser una plataforma online, no dependemos de marzo. Inscríbete y recibe tu acceso inmediato."
  }
];