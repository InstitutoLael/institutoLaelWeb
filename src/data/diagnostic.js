// src/data/diagnostic.js

export const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'category',
    question: "¿En qué etapa de tu vida te encuentras hoy?",
    options: [
      { label: "Estoy en el colegio (o saliendo)", value: "paes", icon: "🏫" },
      { label: "Necesito terminar mi enseñanza media", value: "adultos", icon: "🎓" },
      { label: "Soy profesional y busco crecer", value: "idiomas", icon: "💼" },
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
      { label: "Élite (850 - 1000)", value: "elite" }
    ]
  },
  {
    id: 'discipline',
    question: "¿Cómo calificarías tu nivel de disciplina actual?",
    options: [
      { label: "Bajo (Necesito que me empujen)", value: "low" },
      { label: "Medio (Estudio pero me distraigo)", value: "mid" },
      { label: "Alto (Soy autodidacta pero quiero técnica)", value: "high" }
    ]
  }
];

export const getDiagnosticResult = (answers) => {
  const { category, paes_pain, paes_target, discipline } = answers;

  if (category === 'paes') {
    let profile = {
      title: "",
      subtitle: "",
      description: "",
      tone: "direct",
      wa_msg: "",
      cta: "Activar mi Ruta Lael",
      entry_product: "Sesión de Diagnóstico Profundo (Gratuita)",
      stats: [],
      attributes: [], // Data metrics for the profile
      case_study: null // Linked success story
    };

    // LOGIC FOR SURGICAL PROFILES
    if (paes_pain === 'content') {
      profile.title = "El Memorístico Saturado";
      profile.subtitle = "Detectamos un patrón de retención pasiva (presente en el 72% de los alumnos que evaluamos).";
      profile.description = "Tu problema no es la falta de estudio, es el método de almacenamiento. Estás intentando memorizar la PAES como si fuera una prueba de colegio. No estás fallando por falta de esfuerzo, estás fallando porque tu cerebro está saturado de datos pero vacío de ejecución táctica.";
      profile.attributes = [
        { label: "Retención Teórica", value: "Alta", score: 85 },
        { label: "Ejecución Táctica", value: "Baja", score: 20 },
        { label: "Eficiencia de Tiempo", value: "Crítica", score: 15 }
      ];
      profile.case_study = {
        name: "Caso Javiera",
        text: "Mismo perfil: Memorístico Saturado. Resultado: +130 puntos en 10 semanas tras activar el sistema de flujo.",
        metrics: "+130 pts"
      };
      profile.wa_msg = "Hola, completé el diagnóstico y salió 'Memorístico Saturado'. Me hizo mucho sentido lo de la saturación de datos. ¿Cómo podemos empezar?";
    } 
    else if (paes_pain === 'strategy' && (discipline === 'low' || discipline === 'mid')) {
      profile.title = "El Ansioso Bajo Presión";
      profile.subtitle = "Un patrón reactivo detectado en el 84% de los perfiles con alta capacidad teórica.";
      profile.description = "Sabes más de lo que tus puntajes dicen. El problema no es el conocimiento, es que no tienes un sistema de gestión de ansiedad táctica. Cada minuto que pasa en el ensayo es una distracción más que drena tu rendimiento real.";
      profile.attributes = [
        { label: "Gestión de Estrés", value: "Crítica", score: 10 },
        { label: "Análisis de Variable", value: "Media", score: 50 },
        { label: "Velocidad de Respuesta", value: "Inconsistente", score: 30 }
      ];
      profile.case_study = {
        name: "Caso Matías",
        text: "Mismo perfil: Ansioso Bajo Presión. Resultado: Pasó de 620 a 745 puntos al dominar la gestión del reloj.",
        metrics: "+125 pts"
      };
      profile.wa_msg = "Hola, me salió 'Ansioso Bajo Presión'. Es justo lo que me pasa en los ensayos, me bloqueo con el tiempo. ¿Me ayudan?";
    }
    else if (paes_pain === 'strategy' && discipline === 'high') {
      profile.title = "El Estratégicamente Perdido";
      profile.subtitle = "Un perfil de alta disciplina (visto en el 65% de los alumnos que vienen de otros preuniversitarios).";
      profile.description = "Eres una máquina de estudiar, pero sin arquitectura. Estás dedicando el mismo tiempo a lo que ya sabes que a tus brechas reales. Estás trabajando duro, no trabajando inteligente. Tu disciplina es tu mayor activo, pero hoy está mal dirigida.";
      profile.attributes = [
        { label: "Disciplina Operativa", value: "Máxima", score: 95 },
        { label: "Foco en Brechas", value: "Nulo", score: 5 },
        { label: "Retorno de Esfuerzo", value: "Bajo", score: 40 }
      ];
      profile.case_study = {
        name: "Caso Sofía",
        text: "Mismo perfil: Estratégicamente Perdido. Resultado: 960 puntos en Matemáticas tras redirigir su esfuerzo.",
        metrics: "960 pts"
      };
      profile.wa_msg = "Hola, mi resultado fue 'Estratégicamente Perdido'. Tengo las ganas y el tiempo, pero necesito la arquitectura que mencionan.";
    }
    else {
      profile.title = "El Inconsistente Crónico";
      profile.subtitle = "Patrón de práctica circular detectado en el 78% de los alumnos sin feedback externo.";
      profile.description = "Haces ensayos por cumplir, pero no revisas el porqué de tus fallos. Estás practicando equivocarte. No es falta de capacidad, es falta de un sistema de retroalimentación táctica que te obligue a cerrar tus brechas reales.";
      profile.attributes = [
        { label: "Hábito de Feedback", value: "Ausente", score: 0 },
        { label: "Consistencia de Puntaje", value: "Errática", score: 25 },
        { label: "Identificación de Error", value: "Baja", score: 15 }
      ];
      profile.case_study = {
        name: "Caso Diego",
        text: "Mismo perfil: Inconsistente Crónico. Resultado: Estabilizó su puntaje sobre los 800 pts en 2 meses.",
        metrics: "800+ pts"
      };
      profile.wa_msg = "Hola, me salió 'Inconsistente Crónico'. Siento que hago muchos ensayos pero siempre saco lo mismo. Ayuda.";
    }

    profile.stats = [
      { label: "Potencial", value: paes_target === 'elite' ? '940+' : '820+' },
      { label: "Urgencia", value: "Alta" },
      { label: "Confiabilidad", value: "98.2%" }
    ];

    return profile;
  }



  if (category === 'adultos') {
    return {
      title: "El Arquitecto de su Propio Destino",
      subtitle: "Detectamos que tu problema no fue la capacidad, sino el contexto.",
      description: "Dejar los estudios no fue un fracaso, fue una pausa obligatoria por la vida. Hoy, tu madurez es tu mayor activo. No necesitas un colegio, necesitas un sistema que respete tu tiempo y potencie tu experiencia real.",
      tone: "empathetic",
      wa_msg: "Hola, me salió 'El Arquitecto de su Propio Destino'. Quiero terminar mi enseñanza media con la Escuela de Sueños Lael.",
      cta: "Iniciar mi Plan de Sueños",
      entry_product: "Sesión de Nivelación Inicial (Gratis)",
      attributes: [
        { label: "Madurez Operativa", value: "Máxima", score: 90 },
        { label: "Foco en Metas", value: "Alto", score: 80 },
        { label: "Disponibilidad Horaria", value: "Flexible", score: 100 }
      ],
      stats: [
        { label: "Potencial Laboral", value: "+45%" },
        { label: "Tiempo Meta", value: "6-8 meses" },
        { label: "Factibilidad", value: "99%" }
      ]
    };
  }

  if (category === 'idiomas') {
    return {
      title: "El Comunicador Global Estratégico",
      subtitle: "Buscas fluidez, no teoría gramatical.",
      description: "Tu cerebro ya domina un código (español). Ahora necesita instalar los drivers de un nuevo sistema de comunicación. No te enseñaremos a conjugar verbos en una pizarra, te entrenaremos para que cierres negocios y navegues el mundo sin fricción.",
      tone: "direct",
      wa_msg: "Hola, mi resultado fue 'Comunicador Global'. Busco fluidez real para mi carrera profesional.",
      cta: "Configurar mi Programa",
      entry_product: "Diagnóstico de Nivel Comunicativo",
      attributes: [
        { label: "Lógica de Estructura", value: "Profesional", score: 75 },
        { label: "Miedo al Error", value: "A trabajar", score: 40 },
        { label: "Potencial de Fluidez", value: "Alto", score: 85 }
      ],
      stats: [
        { label: "Crecimiento Laboral", value: "3x" },
        { label: "Enfoque", value: "Simulación" }
      ]
    };
  }

  // Fallback for other categories (Empresas)
  return {
    title: "Socio de Rendimiento Organizacional",
    subtitle: "Analizando la arquitectura de tu equipo...",
    description: "Las empresas no necesitan cursos, necesitan resultados medibles. El sistema Lael para empresas optimiza el rendimiento humano a través de datos y acompañamiento táctico.",
    tone: "professional",
    wa_msg: "Hola, busco una solución corporativa basada en el sistema de rendimiento Lael.",
    cta: "Solicitar Propuesta Técnica",
    entry_product: "Auditoría de Capacitación",
    stats: [
      { label: "ROI Estimado", value: "High" },
      { label: "Personalización", value: "100%" }
    ]
  };
};

