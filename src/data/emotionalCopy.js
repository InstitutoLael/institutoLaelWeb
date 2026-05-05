// src/data/emotionalCopy.js

export const EMOTIONAL_DATA = {
  pains: {
    stagnation: {
      title: "Estoy estancado",
      short: "Siento que estudio pero saco lo mismo",
      long: "¿Sientes que haces ensayos por cumplir, pero tu puntaje no se mueve? No es falta de capacidad, es que estás practicando tus propios errores.",
      cta: "Quiero entender mi error"
    },
    anxiety: {
      title: "El tiempo me come",
      short: "Me bloqueo en los ensayos",
      long: "Sabes la materia, pero cuando el reloj empieza a correr, tu cerebro se nubla. Necesitas un sistema de gestión, no más libros.",
      cta: "Esto me está pasando"
    },
    confusion: {
      title: "No sé por dónde empezar",
      short: "Tanta materia me abruma",
      long: "Hay demasiado contenido y no sabes qué es prioridad. Estás perdiendo tiempo en lo que ya sabes y descuidando lo que te daría el puntaje.",
      cta: "Muéstrame por dónde empezar"
    }
  },
  urgency: {
    loss: "Si no activas hoy, pierdes 1 semana completa de avance estratégico.",
    cycle: "Próximo ciclo de diagnóstico cierra este domingo.",
    spots: "Solo 5 cupos para validación táctica esta semana."
  },
  objections: [
    {
      q: "¿Es otro preuniversitario más?",
      a: "No. Un preu te da materia. Nosotros te damos una arquitectura de respuesta para que dejes de fallar en lo que ya sabes."
    },
    {
      q: "¿Tengo que dedicarle todo mi día?",
      a: "Al revés. El sistema es para gente con poco tiempo que necesita que cada minuto de estudio se traduzca en puntos reales."
    }
  ],
  human_moments: [
    {
      type: "correction",
      text: "Ojo aquí: no fallaste por no saber la fórmula, fallaste por no leer la restricción del enunciado. Es un error de lectura táctica, no de contenido.",
      context: "Feedback real en plataforma"
    },
    {
      type: "chat",
      text: "Profe, por fin bajé de los 2 minutos por pregunta en Geometría. ¡El truco de la variable me salvó!",
      context: "WhatsApp de alumno"
    }
  ]
};
