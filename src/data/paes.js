// src/data/paes.js
// === Sistema de Alto Rendimiento PAES Lael ===
import { Video, BookOpen, Award, Heart, Users } from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────
   0. CONTENIDO DE LA PÁGINA /paes (LandingPAES.jsx)
   ────────────────────────────────────────────────────────────────────────── */

export const LANDING_FEATURES = [
  { title: "Clases en vivo", desc: "Clases interactivas vía Google Meet en tiempo real. Docentes reales que responden tus dudas en el acto.", icon: Video },
  { title: "Material de estudio", desc: "Guías teóricas, prácticas y resúmenes semanales diseñados estratégicamente para maximizar tu estudio personal.", icon: BookOpen },
  { title: "Ensayos PAES", desc: "Simulacros periódicos cronometrados para habituarte a la presión del examen y medir tu puntaje real.", icon: Award },
  { title: "Acompañamiento", desc: "Apoyo y mentoría constante de un equipo que se preocupa por tu bienestar y desarrollo integral.", icon: Heart },
  { title: "Comunidad activa", desc: "Un grupo dinámico con tus compañeros para resolver dudas grupales, compartir tips y motivarse día a día.", icon: Users }
];

export const LANDING_SUBJECTS = [
  { code: "M1", name: "Matemática M1", type: "Obligatoria", desc: "Resolución de problemas lógicos, modelamiento numérico y estadísticas fundamentales para asegurar tu puntaje base.", teacher: "Diego Chaparro" },
  { code: "M2", name: "Matemática M2", type: "Electiva", desc: "Álgebra avanzada, funciones complejas y razonamiento abstracto de alta selectividad para carreras STEM.", teacher: "Diego Chaparro & Kathy" },
  { code: "CL", name: "Competencia Lectora", type: "Obligatoria", desc: "Comprensión de lectura crítica, análisis de textos y técnicas de descarte rápido bajo presión de tiempo.", teacher: "Próximamente CL" },
  { code: "HIS", name: "Historia y Ciencias Sociales", type: "Electiva", desc: "Historia de Chile y global del siglo XX, formación ciudadana y análisis dinámico de procesos sociales.", teacher: "Docente Especialista" },
  { code: "BIO", name: "Ciencias - Biología", type: "Electiva", desc: "Estructuras celulares, genética, evolución de los ecosistemas y el temario oficial del DEMRE.", teacher: "Martín" },
  { code: "FIS", name: "Ciencias - Física", type: "Electiva", desc: "Ondas, mecánica newtoniana, energía y electricidad explicados de forma aplicable y libre de memorizaciones.", teacher: "Docente Especialista" },
  { code: "QUI", name: "Ciencias - Química", type: "Electiva", desc: "Modelamiento atómico, reacciones, química orgánica y termodinámica simplificadas al máximo.", teacher: "Martín" }
];

export const LANDING_TEACHERS = [
  { name: "Diego Chaparro", subject: "Matemática M1 + M2", bio: "Fundador de Instituto Lael. Enseña matemáticas con la misma exigencia con la que dirige el instituto: sin atajos, pero sin dejar a nadie atrás.", img: "https://ui-avatars.com/api/?name=Diego+Chaparro&background=071D49&color=D7E400&size=200&bold=true" },
  { name: "Martín", subject: "Biología + Química", bio: "Convierte biología y química en algo que se entiende, no que se memoriza. Cercano y directo, sin vueltas.", img: "https://ui-avatars.com/api/?name=Martin+Ciencias&background=071D49&color=D7E400&size=200&bold=true" },
  { name: "Kathy", subject: "Matemática M2", bio: "Matemática superior y HomeSchool. Le importa que entiendas el porqué, no solo el cómo.", img: "https://ui-avatars.com/api/?name=Kathy+M2&background=071D49&color=D7E400&size=200&bold=true" },
  { name: "Próximamente CL", subject: "Competencia Lectora", bio: "Estamos seleccionando al docente de lenguaje con mayor trayectoria en comprensión de lectura para acompañarte en tu proceso.", img: "https://ui-avatars.com/api/?name=Proximamente+CL&background=F4F4F4&color=8D8D8D&size=200&bold=true" }
];

export const LANDING_STEPS = [
  { num: "01", title: "Inscripción Gratis", desc: "Haz clic en el botón de inscripción y asegura tu cupo - la matrícula no tiene costo." },
  { num: "02", title: "Clases por Asignatura", desc: "Conéctate a nuestras clases vespertinas en vivo a través de Google Meet con profesores reales." },
  { num: "03", title: "Ensayos Semanales", desc: "Realiza simulacros semanales cronometrados para medir tu avance y habituarte a la prueba real." }
];

export const LANDING_FAQS = [
  { q: "¿Cuánto cuesta? ¿Hay costos ocultos?", a: "La matrícula es gratis. Cada ramo tiene su propio valor desde $10.000/mes, y si tomas 4 o más, nunca pagas sobre $34.990 - sin letra chica ni cobros extra por material. Si aun así no puedes cubrirlo, puedes postular a una beca: la revisamos caso a caso." },
  { q: "¿Qué necesito para participar en las clases?", a: "Solo requieres un dispositivo (computador, tablet o celular) con conexión a internet y una cuenta de Google para conectarte a las sesiones a través de Google Meet." },
  { q: "¿Cuántas horas a la semana se dictan?", a: "Se dedican aproximadamente de 2 a 3 horas a la semana por asignatura. Todas las sesiones se programan en horario vespertino para facilitar tu asistencia." },
  { q: "¿Puedo entrar al programa en cualquier momento?", a: "Sí, puedes unirte en cualquier punto del año. Sin embargo, te recomendamos hacerlo cuanto antes debido a que los cupos en nuestras aulas en vivo son limitados por motivos de capacidad virtual." },
  { q: "¿Cómo me inscribo?", a: "Haz clic en el botón INSCRIBIRME y llenarás un formulario breve. También puedes escribirnos por WhatsApp." },
  { q: "¿En qué horario son las clases?", a: "Las clases son en horario vespertino. Los horarios exactos se comunican al momento de inscribirse." },
  { q: "¿Sirve si voy a rendir PAES en noviembre?", a: "Sí. El programa comienza en marzo de 2027 y está diseñado para acompañarte con meses de anticipación, no solo el tramo final antes del examen." }
];

/* ──────────────────────────────────────────────────────────────────────────
   1. CONFIGURACIÓN FINANCIERA Y BASE
   ────────────────────────────────────────────────────────────────────────── */

export const ENROLLMENT_FEE = 10990;
export const ACADEMIC_MONTHS = 8;
export const AVAILABLE_SPOTS = 12;
export const START_DATE_EXACT = "Inicios de marzo";

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

export function computePaesPrice(selectedIds = []) {
  const count = selectedIds.length;

  if (count === 0) {
    return {
      count,
      label: "Inicia tu preparación",
      totalMonthly: 0,
      nominalTotal: 0,
      saving: 0,
      enrollment: 0, // Matrícula $0
      totalFirstMonth: 0,
      pricePerSubject: 0
    };
  }

  // nominalTotal es lo que se le paga a cada profe según su ramo - no cambia
  // aunque el alumno esté en el Plan Completo.
  const nominalTotal = selectedIds.reduce((sum, id) => {
    const subject = PAES_SUBJECTS.find((s) => s.id === id);
    const isObligatoria = subject?.category === "Prueba Obligatoria";
    return sum + (isObligatoria ? OBLIGATORIA_PRICE : ELECTIVA_PRICE);
  }, 0);

  const usesPack = count >= PACK_MIN_SUBJECTS && nominalTotal > PACK_PRICE;
  const totalMonthly = usesPack ? PACK_PRICE : nominalTotal;

  return {
    count,
    label: usesPack ? "Plan Completo" : "Plan por asignatura",
    totalMonthly,
    nominalTotal, // lo que reciben los profes en conjunto, sea cual sea el plan
    saving: usesPack ? nominalTotal - PACK_PRICE : 0,
    enrollment: 0, // Matrícula $0
    totalFirstMonth: totalMonthly,
    pricePerSubject: Math.round(totalMonthly / count)
  };
}

export const priceForSubjects = (ids) => computePaesPrice(ids).totalMonthly;

/* ──────────────────────────────────────────────────────────────────────────
   3. MÓDULOS DE ENTRENAMIENTO (DATA DETALLADA)
   ────────────────────────────────────────────────────────────────────────── */
export const PAES_SUBJECTS = [
  {
    id: "m1",
    name: "Matemática M1",
    category: "Prueba Obligatoria",
    icon: "📐",
    color: "#C6A66B",
    desc: "Resolución de problemas, razonamiento lógico y tácticas de puntaje máximo.",
    hoursPerWeek: 3
  },
  {
    id: "len",
    name: "Competencia Lectora",
    category: "Prueba Obligatoria",
    icon: "📚",
    color: "#C6A66B",
    desc: "Comprensión, análisis e interpretación de textos bajo presión de tiempo.",
    hoursPerWeek: 3
  },
  {
    id: "m2",
    name: "Matemática M2",
    category: "Prueba Electiva",
    icon: "🚀",
    color: "#C6A66B",
    desc: "Profundización matemática para carreras STEM de alta selectividad.",
    hoursPerWeek: 2
  },
  {
    id: "his",
    name: "Historia y Ciencias Sociales",
    category: "Prueba Electiva",
    icon: "🏛️",
    color: "#C6A66B",
    desc: "Análisis histórico, procesos sociales y dominio de la prueba humanista.",
    hoursPerWeek: 2
  },
  {
    id: "bio",
    name: "Ciencias - Biología",
    category: "Prueba Electiva",
    icon: "🧬",
    color: "#C6A66B",
    desc: "Comprensión sistémica del mundo natural enfocada en el modelo PAES.",
    hoursPerWeek: 2
  },
  {
    id: "fis",
    name: "Ciencias - Física",
    category: "Prueba Electiva",
    icon: "⚡",
    color: "#C6A66B",
    desc: "Mecánica y energía aplicada a la resolución de problemas bajo presión.",
    hoursPerWeek: 2
  },
  {
    id: "qui",
    name: "Ciencias - Química",
    category: "Prueba Electiva",
    icon: "🧪",
    color: "#C6A66B",
    desc: "Dominio de la materia y sus interacciones para maximizar tu puntaje.",
    hoursPerWeek: 2
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   4. ESTRATEGIAS DE RENDIMIENTO
   ────────────────────────────────────────────────────────────────────────── */
export const PAES_COMBOS = [
  {
    id: "combo-humanista",
    title: "Estrategia Humanista",
    subtitle: "Comprensión Lectora + Perspectiva Histórica + M1",
    subjects: ["len", "his", "m1"],
    price: 34000,
    color: "amber",
    tag: "$34.000/mes",
    features: ["Clases en vivo por Google Meet", "Simulacros de Presión", "Material de Quiebre", "Comunidad de Apoyo"],
    paymentUrl: "" 
  },
  {
    id: "combo-cientifico",
    title: "Estrategia STEM",
    subtitle: "M1 + M2 + Ciencias Específicas",
    subjects: ["m1", "m2", "bio", "fis"],
    price: 34990,
    color: "teal",
    tag: "$34.990/mes · Plan Completo",
    features: ["Enfoque 100% Lógico", "Preparación M2 Intensiva", "Clases en vivo", "Simulacros Semanales"],
    paymentUrl: "" 
  },
  {
    id: "combo-full",
    title: "Sistema Integral Lael",
    subtitle: "Dominio absoluto para asegurar tu objetivo",
    subjects: ["len", "m1", "m2", "his", "bio"],
    price: 34990,
    color: "indigo",
    tag: "$34.990/mes · Plan Completo",
    features: ["Acceso a Todo el Sistema", "Orientación Vocacional", "Clases en vivo", "Soporte de Comunidad"],
    paymentUrl: "" 
  }
];

/* ──────────────────────────────────────────────────────────────────────────
   5. VALOR AGREGADO (LO QUE INCLUYE SIEMPRE)
   ────────────────────────────────────────────────────────────────────────── */
export const PAES_CONFIG = {
  AVAILABLE_SPOTS: AVAILABLE_SPOTS,
  START_DATE: "Marzo 2027",
  START_DATE_EXACT: START_DATE_EXACT,
  FREE_BADGE: "DESDE $10.000/MES"
};

export const PAES_FEATURES = [
  { title: "Comunidad de Apoyo", desc: "No estás solo. Profesores y alumnos te acompañan en cada paso del proceso.", icon: "🤝" },
  { title: "Ensayos Semanales", desc: "Entrenamientos para que llegues tranquilo y seguro el día de la PAES.", icon: "📝" },
  { title: "Profesores Reales", desc: "Profes que saben tu nombre, te responden dudas y se preocupan por tu puntaje.", icon: "👨‍🏫" },
  { title: "Clases Grabadas", desc: "Si no pudiste conectarte a la clase en vivo, queda guardada para que la veas después.", icon: "🎥" }
];

export const PAES_FAQS = [
  {
    q: "¿Cuánto cuesta? ¿Hay letra chica?",
    a: "Matrícula gratis. Cada asignatura tiene su propio valor (desde $10.000/mes), y si tomas 4 o más, pagas el Plan Completo a $34.990/mes en vez de la suma. Sin sorpresas, y si aun así no lo puedes cubrir, puedes postular a una beca."
  },
  { 
    q: "¿Cómo son las clases?", 
    a: "En vivo por Google Meet. Tienes un horario fijo y un profe real que te conoce por tu nombre y te ayuda a resolver dudas en el momento." 
  },
  { 
    q: "¿Qué pasa si me pierdo una clase?", 
    a: "No pasa nada. Todas las clases se graban y quedan disponibles en tu panel para que las veas cuando puedas." 
  },
  { 
    q: "¿Cuántas horas a la semana?", 
    a: "Depende de las materias que elijas rendir. En promedio dedicamos 2-3 horas semanales por asignatura, enfocadas en técnica y práctica real." 
  },
  { 
    q: "¿Puedo estudiar si trabajo o voy al colegio?", 
    a: "Sí. Los horarios son vespertinos y están diseñados para ser flexibles, permitiéndote compatibilizar el estudio con tus otras responsabilidades." 
  }
];

/* ──────────────────────────────────────────────────────────────────────────
   6. DATOS DE CONTENIDO
   ────────────────────────────────────────────────────────────────────────── */
export const PAES_SYLLABUS = {
  m1: [
    "Patrones Numéricos y Operatoria Estratégica.",
    "Modelamiento Algebraico de Problemas Complejos.",
    "Visualización Espacial y Geometría.",
    "Análisis de Datos y Toma de Decisiones."
  ],
  len: [
    "Decodificación de Textos Literarios.",
    "Análisis Argumentativo y Medios Masivos.",
    "Inferencia Avanzada y Contexto.",
    "Estrategias de Descarte Rápido."
  ]
};

export const PAES_COMPARISON = [
  { feature: "Enfoque Principal", lael: "Sistema Estratégico de Rendimiento", other: "Clases Tradicionales", tutor: "Resolución de Dudas" },
  { feature: "Ambiente Visual", lael: "Premium & Cinemático", other: "Escolar / Básico", tutor: "N/A" },
  { feature: "Simulacros de Presión", lael: "Semanal", other: "Mensual", tutor: "No incluído" },
  { feature: "Mentores Tácticos", lael: "Feedback Inmediato", other: "Respuestas lentas", tutor: "Depende de la tarifa" },
  { feature: "Orientación Vocacional", lael: "Estrategia de Ponderación", other: "Charlas Genéricas", tutor: "No incluído" },
];