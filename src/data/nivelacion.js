// src/data/nivelacion.js
// === Programa Caminos: Nivelación de Estudios (2x1) ===
// "Nunca es tarde para cumplir la promesa que te hiciste."

export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

// 🧾 Matrícula Simbólica (Compromiso)
export const REGISTRATION_FEE = 5000; 

// 🌟 MANIFIESTO DEL PROGRAMA (Para usar en el UI)
export const CAMINOS_MANIFESTO = {
  title: "Honor y Dignidad",
  text: "Este programa existe para honrar a nuestros padres y abuelos que no tuvieron la oportunidad. No te vamos a juzgar por lo que no sabes; te vamos a celebrar por atreverte a aprender hoy.",
};

/* ESTRATEGIA SOLIDARIA 1x1 (El corazón de Lael)
   ------------------------------------------------
   El modelo se basa en la solidaridad. Quienes pueden pagar un poco más, 
   ayudan a sostener a quienes hoy no tienen nada más que sus ganas.
*/

export const PLANS = [
  {
    id: "beca",
    tag: "Cupos Limitados",
    title: "Beca Semilla",
    price: 0,
    frequency: "mes",
    desc: "Tu pago es tu esfuerzo. Para quienes tienen el coraje de terminar pero hoy no cuentan con los recursos.",
    features: [
      "Clases en vivo y grabadas",
      "Material de estudio PDF",
      "Comunidad de apoyo",
      "Certificado de alumno regular",
    ],
    cta: "Postular a Beca",
    color: "#78716c", // Stone (Solidez y Humildad)
    wapp: "Hola, tengo muchas ganas de terminar mis estudios y quisiera postular a la Beca Semilla.",
    isPopular: false
  },
  {
    id: "caminos",
    tag: "Precio Justo",
    title: "Plan Caminos",
    price: 16990, // Un precio digno, accesible pero que valida el servicio
    frequency: "mes",
    desc: "Para el trabajador que quiere progresar. Tu aporte cubre los costos de los profesores y plataforma.",
    features: [
      "Todo lo incluido en la Beca",
      "Horarios flexibles (Noche/Sábados)",
      "Tramitación de inscripción Mineduc",
      "Ensayo de examen real",
    ],
    cta: "Inscribirme",
    color: "#0ea5e9", // Sky Blue (Esperanza y Claridad)
    wapp: "Hola, soy trabajador y quiero terminar mis estudios con el Plan Caminos.",
    isPopular: true
  },
  {
    id: "legado",
    tag: "Héroe Educativo",
    title: "Plan Legado",
    price: 29990, // Sube un poco para subsidiar realmente
    frequency: "mes",
    desc: "Estudias tú y apadrinas a otro. Tu mensualidad financia el 50% de una Beca Semilla.",
    features: [
      "Todos los beneficios académicos",
      "Diploma de 'Padrino Educativo'",
      "Acceso directo a dudas con profes",
      "Ayudas a cambiar una historia",
    ],
    cta: "Ser Padrino",
    color: "#f59e0b", // Ámbar (Luz y Generosidad)
    wapp: "Hola, quiero estudiar y además dejar un legado apadrinando a alguien.",
    isPopular: false
  },
];

// 🧠 EL MÉTODO "SIN MIEDO" (Argumentos de venta)
export const METHODOLOGY = [
  {
    icon: "shield", // Icono de escudo/protección
    title: "Espacio Seguro",
    text: "Aquí nadie se ríe. Todos somos adultos con el mismo sueño. Si te cuesta, te explicamos de nuevo."
  },
  {
    icon: "clock", 
    title: "A tu Ritmo",
    text: "Las clases quedan grabadas. Si tuviste turno extra o se enfermó un hijo, no pierdes la materia."
  },
  {
    icon: "target", 
    title: "Enfoque Práctico",
    text: "No te llenamos de materia innecesaria. Te enseñamos exactamente lo que preguntan en el examen."
  }
];

export const FAQS = [
  {
    q: "¿Mi licencia sirve igual que la de un colegio normal?",
    a: "¡Absolutamente! El certificado lo entrega el Ministerio de Educación (Mineduc). Es 100% válido para trabajar, subir de sueldo, entrar a la Universidad o estudiar una carrera técnica.",
  },
  {
    q: "Me da vergüenza, hace 20 años que no estudio...",
    a: "Ese miedo es normal, pero se pasa en la primera clase. Nuestro método 'Andragogía' está diseñado para adultos. No enseñamos como a niños; enseñamos con respeto a tu experiencia de vida.",
  },
  {
    q: "¿Cómo funciona el 2x1?",
    a: "El sistema de Exámenes Libres permite rendir dos cursos en un solo año. Por ejemplo: 1º y 2º Medio juntos, o 3º y 4º Medio juntos. En un año puedes avanzar lo que antes tomaba dos.",
  },
  {
    q: "¿Qué necesito para matricularme?",
    a: "Solo tu certificado de notas del último curso aprobado (lo puedes sacar gratis en la web del Mineduc con tu RUT) y tus ganas de superarte.",
  },
];