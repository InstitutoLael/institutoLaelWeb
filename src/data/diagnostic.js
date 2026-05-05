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
      tone: "direct", // direct, empathetic, hard
      wa_msg: "",
      cta: "Activar mi Ruta Lael",
      entry_product: "Sesión de Diagnóstico Profundo (Gratuita)",
      stats: []
    };

    // LOGIC FOR SURGICAL PROFILES
    if (paes_pain === 'content') {
      profile.title = "El Memorístico Saturado";
      profile.subtitle = "Tu problema no es la falta de estudio, es el método de almacenamiento.";
      profile.description = "Estás intentando memorizar la PAES como si fuera una prueba de historia del colegio. No estás fallando por falta de esfuerzo, estás fallando porque tu cerebro está saturado de datos pero vacío de ejecución. Si sigues así, el día de la prueba tu cerebro 'se apagará' ante cualquier pregunta que no sea textual.";
      profile.wa_msg = "Hola, mi perfil es 'Memorístico Saturado'. Sé que estoy estudiando mal y necesito instalar el sistema de ejecución Lael.";
    } 
    else if (paes_pain === 'strategy' && (discipline === 'low' || discipline === 'mid')) {
      profile.title = "El Ansioso Bajo Presión";
      profile.subtitle = "Sé la materia, pero mi cerebro colapsa con el reloj.";
      profile.description = "Sabes más de lo que tus puntajes dicen. El problema es que no tienes un sistema de gestión de ansiedad táctica. Cada minuto que pasa en el ensayo es una distracción más. Si no activas simulaciones de presión real, tu puntaje seguirá siendo una moneda al aire.";
      profile.wa_msg = "Hola, mi perfil es 'Ansioso Bajo Presión'. Necesito el sistema de simulaciones para dejar de colapsar en los ensayos.";
    }
    else if (paes_pain === 'strategy' && discipline === 'high') {
      profile.title = "El Estratégicamente Perdido";
      profile.subtitle = "Alta disciplina, pero disparando a ciegas.";
      profile.description = "Eres una máquina de estudiar, pero sin arquitectura. Estás dedicando el mismo tiempo a lo que ya sabes que a tus brechas reales. Estás trabajando duro, no trabajando inteligente. Sin un diagnóstico de precisión semanal, estás desperdiciando tu potencial de 900+ puntos.";
      profile.wa_msg = "Hola, mi perfil es 'Estratégicamente Perdido'. Tengo la disciplina, pero necesito la arquitectura de puntaje Lael.";
    }
    else {
      profile.title = "El Inconsistente Crónico";
      profile.subtitle = "Estás practicando errores, no soluciones.";
      profile.description = "Haces ensayos por cumplir, pero no revisas el porqué de tus fallos. Estás 'practicando' equivocarte. No estás fallando por falta de inteligencia, sino porque te falta el hábito del feedback táctico. Sin una guía que te obligue a mirar tus brechas, el estancamiento es tu único futuro seguro.";
      profile.wa_msg = "Hola, mi perfil es 'Inconsistente Crónico'. Necesito un estratega que me obligue a mirar mis brechas reales.";
    }

    profile.stats = [
      { label: "Nivel de Ejecución", value: discipline === 'high' ? '68%' : '35%' },
      { label: "Puntaje Proyectado", value: paes_target === 'elite' ? '920+' : '780+' },
      { label: "Factor de Riesgo", value: "Crítico" }
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

