// src/data/nivelacion.js
// === Programa Caminos: Nivelación de Estudios ===

// Formateador de dinero
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

/* ESTRATEGIA SOLIDARIA 1x1
  - Plan Semilla: Beca 100% (Financiado por Padrinos/Empresas)
  - Plan Oficio: Precio justo para el trabajador.
  - Plan Padrino: Paga un poco más para subsidiar a otros.
*/

export const PLANS = [
  {
    id: "beca",
    tag: "Cupos Limitados",
    title: "Beca Semilla",
    price: 0,
    frequency: "mes",
    desc: "Para quienes tienen ganas pero hoy no tienen recursos. Postulación con asistente social.",
    features: [
      "Clases en vivo y grabadas",
      "Material digital gratuito",
      "Tutoría grupal",
      "Certificado de alumno regular",
    ],
    cta: "Postular a Beca",
    color: "#a8a29e", // Gris piedra (Dignidad austera)
    wapp: "Hola, necesito terminar mis estudios y quisiera postular a la Beca Semilla.",
  },
  {
    id: "trabajador",
    tag: "Recomendado",
    title: "Plan Oficio",
    price: 15000,
    frequency: "mes",
    desc: "Tarifa justa para trabajadores. Tu pago cubre tus costos operativos.",
    features: [
      "Todo lo incluido en la Beca",
      "Horarios flexibles noche/fines de semana",
      "Trámite de inscripción a exámenes",
      "Acceso prioritario a dudas",
    ],
    cta: "Inscribirme",
    color: "#fbbf24", // Dorado (El estándar)
    wapp: "Hola, trabajo y quiero terminar mis estudios con el Plan Oficio.",
  },
  {
    id: "padrino",
    tag: "Héroe Solidario",
    title: "Plan Padrino",
    price: 25000,
    frequency: "mes",
    desc: "Tu mensualidad paga tus estudios y financia el 50% de una Beca Semilla.",
    features: [
      "Todos los beneficios académicos",
      "Diploma de 'Padrino Educativo'",
      "Reporte de impacto social",
      "Ayudas a cambiar una vida",
    ],
    cta: "Ser Padrino",
    color: "#f59e0b", // Ámbar intenso (Generosidad)
    wapp: "Hola, quiero estudiar y además apadrinar a alguien con el Plan Padrino.",
  },
];

export const FAQS = [
  {
    q: "¿Esto es válido por el Ministerio (Mineduc)?",
    a: "¡Sí! Nosotros te preparamos para rendir los 'Exámenes Libres'. Al aprobar, recibes el Certificado Oficial del Ministerio de Educación, válido para trabajar, estudiar en la U o trámites.",
  },
  {
    q: "¿Qué pasa si dejé de estudiar hace 20 años?",
    a: "No importa. Nuestro método 'Desde Cero' está hecho para adultos que han olvidado materia. Vamos paso a paso, con paciencia y respeto.",
  },
  {
    q: "¿Tengo que ir presencial?",
    a: "No. Todo es 100% online. Puedes ver las clases desde tu celular, en tu casa o en el trabajo. Si no puedes conectarte en vivo, ves la grabación cuando puedas.",
  },
  {
    q: "¿Qué cursos puedo hacer?",
    a: "Hacemos nivelación de Enseñanza Básica (3º y 4º, 5º y 6º, 7º y 8º) y Enseñanza Media (1º y 2º, 3º y 4º). Puedes sacar dos cursos en un año (2x1).",
  },
];