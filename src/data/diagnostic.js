// src/data/diagnostic.js

export const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'category',
    question: "¿En qué estás hoy?",
    options: [
      { label: "Estoy en el colegio (o saliendo)", value: "paes", icon: "🏫" },
      { label: "Necesito terminar el colegio (básica o media)", value: "adultos", icon: "🎓" },
      { label: "Quiero aprender otro idioma", value: "idiomas", icon: "💼" },
      { label: "Represento a una empresa", value: "empresas", icon: "🏢" }
    ]
  },
  {
    id: 'paes_pain',
    dependsOn: { category: 'paes' },
    question: "¿Cuál de estos errores cometes más al estudiar?",
    options: [
      { label: "Leo sin analizar (Materia)", value: "content", desc: "Siento que me falta base teórica." },
      { label: "Resuelvo sin estrategia (Tiempo)", value: "strategy", desc: "Sé la materia pero me falta tiempo." },
      { label: "No reviso mis errores (Feedback)", value: "feedback", desc: "Hago ensayos pero no subo el puntaje." }
    ]
  },
  {
    id: 'paes_target',
    dependsOn: { category: 'paes' },
    question: "¿Cuál es tu meta de puntaje?",
    options: [
      { label: "Básico (600 - 700)", value: "basic" },
      { label: "Medio (700 - 850)", value: "mid" },
      { label: "Alto (850 - 1000)", value: "elite" }
    ]
  },
  {
    id: 'discipline',
    question: "¿Cómo calificarías tu nivel de disciplina actual?",
    options: [
      { label: "Bajo (Necesito que me empujen)", value: "low" },
      { label: "Medio (Estudio pero me distraigo)", value: "mid" },
      { label: "Alto (Estudio solo, pero quiero orden)", value: "high" }
    ]
  }
];

export const getDiagnosticResult = (answers) => {
  const { category, paes_pain, discipline } = answers;

  if (category === 'paes') {
    let profile = {
      title: "",
      subtitle: "",
      description: "",
      tone: "direct",
      wa_msg: "",
      cta: "Quiero inscribirme",
      entry_product: "Clases PAES en vivo",
      stats: [],
      attributes: [], // Data metrics for the profile
      case_study: null
    };

    // LOGIC FOR SURGICAL PROFILES
    if (paes_pain === 'content') {
      profile.title = "Me va bien en unas, mal en otras";
      profile.subtitle = "Sientes que necesitas saberlo todo antes de empezar, y eso te está frenando.";
      profile.description = "Estudias, pero estás tratando la PAES como una prueba de memoria. Te falta practicar cómo aplicar lo que sabes con el reloj corriendo, y eso es justo lo que hacemos en las clases en vivo.";
      profile.attributes = [
        { label: "Base Teórica", value: "Sólida", score: 80 },
        { label: "Técnica de Descarte", value: "Baja", score: 20 },
        { label: "Confianza al Responder", value: "Baja", score: 15 }
      ];
      profile.wa_msg = "Hola, mi perfil es 'Me va bien en unas, mal en otras'. Quiero unirme a las clases y aprender a aplicar lo que sé.";
      profile.entry_product = "Acceso a Clases PAES";
    } 
    else if (paes_pain === 'strategy' && (discipline === 'low' || discipline === 'mid')) {
      profile.title = "Me bloqueo aunque sepa la materia";
      profile.subtitle = "Sabes la materia, pero los nervios y el reloj te juegan en contra.";
      profile.description = "Te pasa algo muy común: los nervios y el reloj te hacen perder puntos en preguntas que sí sabes. Con el ensayo de cada mes y las clases en vivo aprendes a repartir el tiempo y a mantener la calma.";
      profile.attributes = [
        { label: "Manejo de Nervios", value: "Por trabajar", score: 10 },
        { label: "Velocidad de Respuesta", value: "Media", score: 45 },
        { label: "Lógica de Examen", value: "Media", score: 50 }
      ];
      profile.wa_msg = "Hola, mi perfil es 'Me bloqueo aunque sepa la materia'. Me pasa mucho que me pongo nervioso con el tiempo, quiero entrar a las clases.";
      profile.entry_product = "Acceso a Clases PAES";
    }
    else if (paes_pain === 'strategy' && discipline === 'high') {
      profile.title = "No sé cómo estudiar";
      profile.subtitle = "Eres disciplinado, pero estás dedicando tiempo a cosas que no suben tu puntaje.";
      profile.description = "Eres constante y le pones horas, pero parte de ese tiempo se va en temas que no te suben el puntaje. Necesitas saber bien qué te falta para ordenar tu estudio. Eso lo vemos contigo en clases y con los ensayos mensuales.";
      profile.attributes = [
        { label: "Disciplina de Estudio", value: "Alta", score: 95 },
        { label: "Foco en lo Importante", value: "Bajo", score: 10 },
        { label: "Resultado del Esfuerzo", value: "Bajo", score: 30 }
      ];
      profile.wa_msg = "Hola, mi resultado fue 'No sé cómo estudiar'. Tengo las ganas, pero necesito orden para no perder tiempo. ¿Cómo me inscribo?";
      profile.entry_product = "Acceso a Clases PAES";
    }
    else {
      profile.title = "Lo intenté antes y no resultó";
      profile.subtitle = "Haces ensayos por cumplir, pero cometes siempre los mismos errores.";
      profile.description = "Si haces ensayos y nadie los revisa contigo, es fácil repetir los mismos errores una y otra vez. En las clases en vivo vemos por qué te equivocas y lo corregimos. Y si no te alcanza para pagar, puedes postular a una beca.";
      profile.attributes = [
        { label: "Revisión de Errores", value: "Por construir", score: 5 },
        { label: "Consistencia de Puntaje", value: "Baja", score: 20 },
        { label: "Detección de Error", value: "Baja", score: 10 }
      ];
      profile.wa_msg = "Hola, me salió 'Lo intenté antes y no resultó'. Quiero inscribirme para dejar de repetir los mismos errores.";
      profile.entry_product = "Acceso a Clases PAES";
    }

    profile.stats = [
      { label: "Clases", value: "En vivo" },
      { label: "Ensayos PAES", value: "Mensuales" },
      { label: "Costo Mensual", value: "Desde $10.000" }
    ];

    return profile;
  }

  if (category === 'adultos') {
    return {
      title: "Listo para terminar lo pendiente",
      subtitle: "Si dejaste el colegio, fue por algo. Ahora te toca terminarlo.",
      description: "A mucha gente la vida se le cruzó: el trabajo, los hijos, la casa. La preparación en Lael es gratis y las clases son de noche, desde las 20:00, para que la puedas combinar con tu trabajo y tu familia. Te acompañamos hasta que rindas los exámenes libres.",
      tone: "empathetic",
      wa_msg: "Hola, me salió 'Listo para terminar lo pendiente'. Quiero terminar mi enseñanza media con la Escuela de Sueños Lael.",
      cta: "Quiero terminar la media",
      entry_product: "Nivelación de Estudios para Adultos",
      attributes: [
        { label: "Experiencia de Vida", value: "Mucha", score: 90 },
        { label: "Foco en Metas", value: "Alto", score: 80 },
        { label: "Disponibilidad Horaria", value: "Flexible", score: 100 }
      ],
      stats: [
        { label: "Modalidad", value: "Online" },
        { label: "Clases", value: "En vivo" },
        { label: "Horario", value: "Desde las 20:00" }
      ]
    };
  }

  if (category === 'idiomas') {
    return {
      title: "Quieres soltarte a hablar",
      subtitle: "Lo que buscas es poder conversar tranquilo.",
      description: "Ya aprendiste un idioma una vez: el tuyo. Ahora se trata de practicar mucho en voz alta. En nuestras clases en vivo hablas desde el principio, con situaciones de trabajo y de viaje, y el profe te corrige en el momento.",
      tone: "direct",
      wa_msg: "Hola, mi resultado fue 'Quieres soltarte a hablar'. Quiero información sobre los cursos de idiomas.",
      cta: "Quiero información",
      entry_product: "Cursos de Idiomas en Vivo",
      attributes: [
        { label: "Base para Aprender", value: "Buena", score: 75 },
        { label: "Miedo al Error", value: "A trabajar", score: 40 },
        { label: "Ganas de Hablar", value: "Altas", score: 85 }
      ],
      stats: [
        { label: "Clases", value: "En vivo" },
        { label: "Enfoque", value: "Conversación" }
      ]
    };
  }

  // Fallback for other categories (Empresas)
  return {
    title: "Capacitación para tu equipo",
    subtitle: "Conversemos qué necesita tu equipo.",
    description: "Hacemos talleres de IA, inglés para equipos, nivelación de estudios para trabajadores y preu PAES para sus hijos, online o presencial en Santiago. Cuéntanos qué necesitas y te enviamos una propuesta.",
    tone: "professional",
    wa_msg: "Hola, busco capacitación para el equipo de mi empresa.",
    cta: "Pedir una propuesta",
    entry_product: "Propuesta para tu Empresa",
    stats: [
      { label: "Formato", value: "A medida" },
      { label: "Modalidad", value: "En vivo" }
    ]
  };
};

