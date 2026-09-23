import { Target, Compass, Users, LineChart } from "lucide-react";

export const metodoData = {
  hero: {
    title: "No es cuánto estudias.\nEs cómo lo haces.",
    subtitle: "No se trata de estudiar más horas. Se trata de saber exactamente qué estudiar, cuándo, y tener a alguien al lado que note cuando te estás perdiendo.",
  },
  pillars: [
    {
      id: "diagnostico",
      title: "Sabemos dónde estás parado",
      description: "No arrancamos a ciegas. Vemos qué sabes de verdad y qué se te escapa, antes de armar cualquier plan.",
      icon: Target,
    },
    {
      id: "estrategia",
      title: "Un plan hecho para ti",
      description: "Nada de guías iguales para todos. Priorizamos lo que a ti te va a subir el puntaje, no lo que se ve bien en un temario.",
      icon: Compass,
    },
    {
      id: "acompanamiento",
      title: "No estás solo en esto",
      description: "Un profe real revisa cómo vas y ajusta el plan si hace falta. Te avisa si te estás quedando atrás, antes de que sea tarde.",
      icon: Users,
    },
    {
      id: "evaluacion",
      title: "Practicas la presión, no solo la materia",
      description: "Un ensayo PAES cada mes, con tiempo real, para que el día de la prueba no sea la primera vez que corres contra el reloj.",
      icon: LineChart,
    }
  ]
};
