import { DollarSign, Clock, Target } from 'lucide-react';

export const FAQ_DATA = [
  {
    category: "Costos & Acceso",
    icon: DollarSign,
    items: [
      { q: "¿Por qué la PAES es tan accesible en Lael?", a: "Porque creemos que el talento no tiene estrato social. Pagas por ramo desde $10.000 al mes, con un tope de $34.990 si tomas 4 o más - una fracción de lo que cobra un preuniversitario tradicional. Y si no te alcanza, puedes postular a una beca. La meta es que el dinero nunca sea la razón por la que alguien se queda fuera." },
      { q: "¿Hay algún costo oculto o matrícula?", a: "No hay costos ocultos. La matrícula es gratis; solo pagas tus asignaturas, sin cargos extra por materiales." }
    ]
  },
  {
    category: "Tiempo & Gestión",
    icon: Clock,
    items: [
      { q: "¿Cuánto tiempo al día necesito?", a: "El sistema se adapta a ti. Tenemos alumnos que estudian 2 horas diarias de alta eficiencia y logran más que quienes pasan 6 horas en un preuniversitario tradicional disparando a ciegas." },
      { q: "Tengo un horario difícil, ¿puedo entrar?", a: "Absolutamente. Nuestras clases son vespertinas y quedan grabadas para que puedas compatibilizar el estudio con el colegio, el trabajo o tu vida personal." }
    ]
  },
  {
    category: "Metodología & Resultados",
    icon: Target,
    items: [
      { q: "¿Qué pasa si me bloqueo en la prueba?", a: "Nuestro sistema de diagnóstico detecta fallas antes de la prueba real. Te enseñamos estrategias de manejo de ansiedad y técnicas de descarte para que tu conocimiento se traduzca en puntaje." },
      { q: "¿Es solo para alumnos brillantes?", a: "Al contrario. Nuestro sistema brilla con alumnos que sienten que 'no les da la cabeza' y necesitan un método claro, paso a paso, para recuperar la confianza." }
    ]
  }
];
