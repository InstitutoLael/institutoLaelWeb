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
      case_study: null //    // LOGIC FOR SURGICAL PROFILES
    if (paes_pain === 'content') {
      profile.title = "El Alumno 'Materia-Dependiente'";
      profile.subtitle = "Sientes que necesitas saberlo todo antes de empezar, y eso te está frenando.";
      profile.description = "Tu problema no es la falta de estudio, es que estás tratando la PAES como una prueba de memoria. Te falta técnica para aplicar lo que sabes bajo presión. En nuestras clases gratuitas en vivo, te enseñamos a pensar como el examen, no solo a memorizarlo.";
      profile.attributes = [
        { label: "Base Teórica", value: "Sólida", score: 80 },
        { label: "Técnica de Descarte", value: "Baja", score: 20 },
        { label: "Confianza al Responder", value: "Baja", score: 15 }
      ];
      profile.case_study = {
        name: "Caso Javiera",
        text: "Mismo perfil. Logró +130 puntos al dejar de memorizar y empezar a entrenar estrategia con nosotros.",
        metrics: "+130 pts"
      };
      profile.wa_msg = "Hola, me salió el perfil 'Alumno Materia-Dependiente'. Quiero unirme a las clases gratis y aprender a aplicar lo que sé.";
      profile.entry_product = "Acceso a Clases PAES Gratuitas";
    } 
    else if (paes_pain === 'strategy' && (discipline === 'low' || discipline === 'mid')) {
      profile.title = "El Bloqueo por Presión";
      profile.subtitle = "Sabes la materia, pero los nervios y el reloj te juegan en contra.";
      profile.description = "No te falta inteligencia, te falta un sistema para dominar la ansiedad. Cada minuto que pasa en el ensayo es una distracción que drena tu rendimiento. Te vamos a entrenar en vivo para que el tiempo sea tu aliado, no tu enemigo.";
      profile.attributes = [
        { label: "Manejo de Estrés", value: "Crítico", score: 10 },
        { label: "Velocidad de Respuesta", value: "Media", score: 45 },
        { label: "Lógica de Examen", value: "Media", score: 50 }
      ];
      profile.case_study = {
        name: "Caso Matías",
        text: "Mismo perfil. Pasó de 620 a 745 puntos al aprender a dominar el reloj en nuestras sesiones en vivo.",
        metrics: "+125 pts"
      };
      profile.wa_msg = "Hola, mi perfil es 'Bloqueo por Presión'. Me pasa mucho que me pongo nervioso con el tiempo, quiero entrar a las clases gratis.";
      profile.entry_product = "Acceso a Clases PAES Gratuitas";
    }
    else if (paes_pain === 'strategy' && discipline === 'high') {
      profile.title = "El Esfuerzo sin Brújula";
      profile.subtitle = "Eres disciplinado, pero estás dedicando tiempo a cosas que no suben tu puntaje.";
      profile.description = "Eres una máquina de estudiar, pero te falta foco. Estás trabajando duro, pero no de forma inteligente. Necesitas identificar tus brechas reales para que tu esfuerzo rinda frutos. Te daremos el mapa táctico que necesitas sin cobrarte un peso.";
      profile.attributes = [
        { label: "Disciplina de Estudio", value: "Excelente", score: 95 },
        { label: "Foco Estratégico", value: "Bajo", score: 10 },
        { label: "Retorno de Esfuerzo", value: "Bajo", score: 30 }
      ];
      profile.case_study = {
        name: "Caso Sofía",
        text: "Mismo perfil. Logró 960 puntos en Matemáticas tras redirigir su disciplina hacia sus puntos débiles.",
        metrics: "960 pts"
      };
      profile.wa_msg = "Hola, mi resultado fue 'Esfuerzo sin Brújula'. Tengo las ganas pero necesito el mapa para no perder tiempo. ¡Me inscribo gratis!";
      profile.entry_product = "Acceso a Clases PAES Gratuitas";
    }
    else {
      profile.title = "La Práctica sin Dirección";
      profile.subtitle = "Haces ensayos por cumplir, pero cometes siempre los mismos errores.";
      profile.description = "Estás practicando equivocarte. Sin un sistema de feedback real, solo estás repitiendo fallos. En nuestras sesiones en vivo, detectamos por qué te equivocas y lo corregimos en el momento. Es gratis, solo necesitas disposición.";
      profile.attributes = [
        { label: "Hábito de Feedback", value: "Ausente", score: 5 },
        { label: "Consistencia de Puntaje", value: "Baja", score: 20 },
        { label: "Detección de Error", value: "Crítica", score: 10 }
      ];
      profile.case_study = {
        name: "Caso Diego",
        text: "Mismo perfil. Estabilizó su puntaje sobre los 800 pts en solo 2 meses de entrenamiento guiado.",
        metrics: "800+ pts"
      };
      profile.wa_msg = "Hola, me salió 'Práctica sin Dirección'. Me inscribo a las clases gratis para dejar de repetir los mismos errores.";
      profile.entry_product = "Acceso a Clases PAES Gratuitas";
    }

    profile.stats = [
      { label: "Potencial Real", value: paes_target === 'elite' ? '940+' : '820+' },
      { label: "Estado de Urgencia", value: "Activo" },
      { label: "Costo Mensual", value: "$0" }
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

