// === Lael Careers: Base de Datos de Talentos ===

export const HR_EMAIL = "coordinacion@institutolael.cl";
export const HR_WAPP = "56964626568"; // Número para recibir CVs

/**
 * 🌟 BENEFICIOS (Cultura Lael)
 */
export const PERKS = [
  {
    icon: "🏠",
    title: "100% Remoto",
    desc: "Dicta clases desde tu casa. Solo necesitas buena conexión, cámara y compromiso."
  },
  {
    icon: "🚀",
    title: "Impacto Real",
    desc: "No somos una fábrica de clases. Aquí ayudas a personas reales a cumplir sus sueños."
  },
  {
    icon: "📚",
    title: "Material Propio",
    desc: "Te apoyamos con guías y recursos, pero tienes libertad de cátedra para brillar."
  },
  {
    icon: "💰",
    title: "Pagos Puntuales",
    desc: "Honorarios claros y transferencias en fecha sagrada. Respetamos tu trabajo."
  }
];

/**
 * 📋 OFERTAS LABORALES ACTUALES
 */
export const OPENINGS = [
  {
    id: "psico-vocacional",
    title: "Psicóloga/o Educacional",
    dept: "Orientación",
    type: "Part-time",
    tags: ["Vocacional", "Contención"],
    desc: "Buscamos un profesional para liderar talleres de orientación vocacional y manejo de ansiedad pre-PAES. Tu misión es darles seguridad a nuestros alumnos.",
    salary: "Honorarios por Taller/Sesión",
    requirements: ["Título de Psicólogo/a", "Exp. en área educativa", "Empatía a toda prueba"]
  },
  {
    id: "doc-lenguaje",
    title: "Profesor/a Comprensión Lectora PAES",
    dept: "Académico PAES",
    type: "Part-time",
    tags: ["Estrategia", "Lectura"],
    desc: "Más que gramática, necesitamos alguien que enseñe a LEER y ANALIZAR. Estrategias de descarte, tipos de texto y velocidad lectora.",
    salary: "Competitivo mercado / hora",
    requirements: ["Profesor/a de Lenguaje o Licenciado/a", "Exp. PAES Competencia Lectora", "Manejo de Zoom"]
  },
  {
    id: "doc-m1",
    title: "Profesor/a Matemáticas M1",
    dept: "Académico PAES",
    type: "Part-time",
    tags: ["Bases", "Paciencia"],
    desc: "El desafío: Enseñar matemáticas a quienes le tienen miedo. Buscamos a alguien capaz de explicar lo complejo en simple y re-encantar a los alumnos con los números.",
    salary: "Competitivo mercado / hora",
    requirements: ["Exp. M1 comprobable", "Uso de Tablet Gráfica (Ideal)", "Carisma"]
  },
  {
    id: "doc-m2",
    title: "Profesor/a Matemáticas M2",
    dept: "Académico PAES",
    type: "Part-time",
    tags: ["Avanzado", "Ingenierías"],
    desc: "Para nuestros alumnos que van por carreras STEM. Necesitamos rigor, velocidad y resolución de problemas de alta complejidad.",
    salary: "Competitivo mercado / hora",
    requirements: ["Dominio total temario M2", "Resolución de dudas en vivo", "Dinámico/a"]
  },
  {
    id: "doc-fisica",
    title: "Profesor/a de Física PAES",
    dept: "Ciencias",
    type: "Part-time",
    tags: ["Mecánica", "Ondas", "Electricidad"],
    desc: "Buscamos un apasionado de la ciencia que pueda aterrizar la física a la vida cotidiana y preparar para el módulo común y electivo.",
    salary: "Competitivo mercado / hora",
    requirements: ["Profesor/a de Física o Ing.", "Material didáctico propio", "Experiencia PAES"]
  },
  {
    id: "doc-adultos",
    title: "Docentes Escuela de Adultos (2x1)",
    dept: "Nivelación",
    type: "Vespertino",
    tags: ["Todas las Asignaturas", "Vocación Social"],
    desc: "Estamos armando el equipo para nuestro Programa Caminos (Nivelación de Estudios). Buscamos profes de Básica y Media con una vocación social gigante para enseñar a adultos.",
    salary: "Por hora cronológica",
    requirements: ["Título Profesional", "Paciencia y respeto absoluto", "Disponibilidad vespertina/sábados"]
  }
];