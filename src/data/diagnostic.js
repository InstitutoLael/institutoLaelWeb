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
    let profile = "";
    let plan = "";
    let gap = "";

    if (paes_pain === 'content') {
      profile = "El Teórico Estancado";
      gap = "Falta de Arquitectura de Rendimiento";
      plan = "Nivelación intensiva + Módulos de Aplicación Táctica.";
    } else if (paes_pain === 'strategy') {
      profile = "El Corredor sin Mapa";
      gap = "Gestión de Presión y Tiempo";
      plan = "Simulaciones de Presión con corrección en tiempo real.";
    } else {
      profile = "El Ciclo de Error";
      gap = "Ausencia de Feedback Estratégico";
      plan = "Mentoría 1:1 para recalibrar tu sistema de resolución.";
    }

    return {
      title: profile,
      subtitle: `Detectamos una ${gap}`,
      description: `Tu perfil indica que ${plan}`,
      stats: [
        { label: "Nivel Actual", value: discipline === 'high' ? '65%' : '40%' },
        { label: "Potencial", value: paes_target === 'elite' ? '950+' : '800+' },
        { label: "Urgencia", value: "Alta" }
      ],
      cta: "Activar mi Ruta Lael"
    };
  }

  // Fallback for other categories
  return {
    title: "Perfil en Construcción",
    subtitle: "Analizando tu contexto...",
    description: "Estamos diseñando tu propuesta estratégica personalizada.",
    stats: [{ label: "Estado", value: "En Proceso" }],
    cta: "Hablar con un Estratega"
  };
};
