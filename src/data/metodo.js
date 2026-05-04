import { Target, Compass, Users, LineChart } from "lucide-react";

export const metodoData = {
  hero: {
    title: "No es cuánto estudias.\nEs cómo lo haces.",
    subtitle: "El Sistema Lael está diseñado para optimizar tu rendimiento académico mediante estrategia, foco y acompañamiento real.",
  },
  pillars: [
    {
      id: "diagnostico",
      title: "Diagnóstico de Precisión",
      description: "No empezamos a ciegas. Identificamos tu nivel real, tus brechas de conocimiento y tu estilo de aprendizaje para trazar la ruta más corta hacia tu objetivo.",
      icon: Target,
    },
    {
      id: "estrategia",
      title: "Estrategia Personalizada",
      description: "Diseñamos un plan de acción a tu medida. Transformamos el contenido complejo en un sistema dominable, priorizando lo que realmente impacta tus resultados.",
      icon: Compass,
    },
    {
      id: "acompanamiento",
      title: "Acompañamiento Táctico",
      description: "No te dejamos solo. Mentores expertos guían tu proceso, ajustan la estrategia en tiempo real y aseguran que mantengas el ritmo sin desgastarte.",
      icon: Users,
    },
    {
      id: "evaluacion",
      title: "Medición de Rendimiento",
      description: "Monitoreamos tu progreso con métricas claras. Simulamos el entorno real para que domines no solo el conocimiento, sino también la presión del momento.",
      icon: LineChart,
    }
  ]
};
