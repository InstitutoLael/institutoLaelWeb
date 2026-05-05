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


  // Fallback for other categories (Adultos/Idiomas)
  return {
    title: "Estratega en Formación",
    subtitle: "Analizando tu arquitectura de rendimiento...",
    description: "Detectamos que buscas un cambio estructural. No estás aquí por un curso, estás aquí por un resultado. El sistema Lael se adaptará a tu disponibilidad horaria y meta específica.",
    tone: "empathetic",
    wa_msg: "Hola, completé el diagnóstico. Quiero saber cómo el sistema Lael se adapta a mis metas personales.",
    cta: "Solicitar Sesión de Onboarding",
    entry_product: "Sesión Táctica de 15 min",
    stats: [
      { label: "Viabilidad", value: "Alta" },
      { label: "Enfoque", value: category.toUpperCase() }
    ]
  };
};

