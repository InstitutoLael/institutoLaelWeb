// src/data/nivelacion.js
// === Programa Caminos: Nivelación de Estudios (2x1) ===

export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

// 🧾 Matrícula: SIMBÓLICA. 
// Si la pones en $0, la gente se inscribe y no va. 
// $1.000 es suficiente para "doler" un poquito y generar compromiso.
export const REGISTRATION_FEE = 1000; 

// 🌟 MANIFIESTO (El alma del proyecto)
export const CAMINOS_MANIFESTO = {
  subtitle: "Nivelación de Estudios 2x1",
  title: "Honor, Dignidad y una Segunda Oportunidad",
  text: "Este programa existe para honrar a quienes tuvieron que dejar el lápiz para tomar una pala. No te vamos a juzgar por lo que no sabes; te vamos a celebrar por atreverte a volver.",
};

/* ESTRATEGIA ROBIN HOOD 🏹
   El que tiene, pone por el que no tiene.
   Transparencia total: "Esto cuesta dinero, pero si no tienes, no pagas".
*/

export const PLANS = [
  {
    id: "social",
    tag: "Gratuidad", // Más directo que "Beca"
    title: "Cupo Social",
    price: 0,
    frequency: "total",
    desc: "Si hoy no puedes pagar, no importa. Tu pago es tu asistencia y tu compromiso de no abandonar.",
    features: [
      "Clases en vivo y grabadas",
      "Material de estudio PDF",
      "Comunidad de apoyo WhatsApp",
      "Certificado al finalizar",
    ],
    cta: "Solicitar Cupo",
    color: "#57534e", // Stone (Austero pero digno)
    btnColor: "btn-outline", // Botón menos llamativo visualmente
    wapp: "Hola, necesito terminar mis estudios y quisiera acceder al Cupo Social gratuito.",
    isPopular: false
  },
  {
    id: "consciente",
    tag: "Costo Real",
    title: "Aporte Consciente",
    price: 10000, // Bajamos la barrera para que más gente se anime a pagar algo
    frequency: "mes",
    desc: "Pagas lo justo para mantener la plataforma y el sueldo de los profesores. Ni más, ni menos.",
    features: [
      "Todo lo incluido en el Plan Social",
      "Nos ayudas a seguir existiendo",
      "Prioridad en corrección de ensayos",
      "Acceso a talleres extra",
    ],
    cta: "Pagar lo Justo",
    color: "#0ea5e9", // Sky Blue (Esperanza)
    btnColor: "btn-primary",
    wapp: "Hola, quiero estudiar y puedo pagar el Aporte Consciente de $10.000.",
    isPopular: true // Queremos que la mayoría caiga aquí
  },
  {
    id: "padrino",
    tag: "Héroe Anónimo",
    title: "Plan Padrino",
    price: 25000, 
    frequency: "mes",
    desc: "Estudias tú y financias a 2 personas que no pueden. Conviértete en el motor de cambio de alguien más.",
    features: [
      "Diploma de 'Padrino Educativo'",
      "Reunión mensual de avance",
      "Clase particular de refuerzo",
      "Karma positivo instantáneo ✨",
    ],
    cta: "Apadrinar",
    color: "#f59e0b", // Gold/Amber (Generosidad)
    btnColor: "btn-gold",
    wapp: "Hola, quiero estudiar y además apadrinar a otros alumnos.",
    isPopular: false
  },
];

// 🧠 DERRIBANDO MIEDOS (Copywriting Emocional)
export const METHODOLOGY = [
  {
    icon: "HeartHandshake", 
    title: "Sin Vergüenza",
    text: "Aquí nadie se ríe. Todos somos adultos con cicatrices y sueños. Si te cuesta leer o sumar, empezamos de cero, con paciencia infinita."
  },
  {
    icon: "Clock", 
    title: "A tu Ritmo Real",
    text: "Sabemos que trabajas o cuidas familia. Si faltas a una clase, queda grabada. No te vamos a retar, te vamos a apoyar para que te pongas al día."
  },
  {
    icon: "Award", 
    title: "Validez Total",
    text: "No es un curso 'de mentira'. Te preparamos para rendir los exámenes oficiales del Mineduc. Tu licencia de 4to medio será 100% real y válida."
  }
];

export const FAQS = [
  {
    q: "¿De verdad es gratis? ¿Cuál es la letra chica?",
    a: "Si eliges el Cupo Social, es $0 mensual. La única condición es tu compromiso: si faltas a 3 clases seguidas sin avisar, liberamos tu cupo para alguien de la lista de espera.",
  },
  {
    q: "Tengo 50 años y se me olvidó todo...",
    a: "Mejor. Tienes experiencia de vida, y eso vale más que la memoria. Nuestro método 'Andragogía' usa lo que ya sabes de la vida para enseñarte las materias.",
  },
  {
    q: "¿Qué necesito para inscribirme?",
    a: "Solo tu carnet de identidad, tu certificado del último curso aprobado (te ayudamos a sacarlo) y perder el miedo.",
  },
];