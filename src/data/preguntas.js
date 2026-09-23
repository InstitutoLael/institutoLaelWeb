import { DollarSign, Clock, Target } from 'lucide-react';

export const FAQ_DATA = [
  {
    category: "Costos & Acceso",
    icon: DollarSign,
    items: [
      { q: "¿Cuánto cuesta el preu PAES en Lael?", a: "Pagas por ramo: $12.000 al mes por cada obligatoria (M1 y Competencia Lectora) y $10.000 al mes por cada electiva. Si tomas 4 ramos o más, pagas el Plan Completo de $34.990 al mes. Y si no te alcanza, puedes postular a una beca. No queremos que la plata sea la razón por la que alguien se queda fuera." },
      { q: "¿Hay algún costo oculto o matrícula?", a: "No. La matrícula es gratis y solo pagas los ramos que tomas. No hay cobros extra por materiales." }
    ]
  },
  {
    category: "Tiempo & Gestión",
    icon: Clock,
    items: [
      { q: "¿Cuánto tiempo al día necesito?", a: "Depende de tus ramos y de tu meta. Lo importante es ir a las clases en vivo, hacer el ensayo de cada mes y repasar con las grabaciones lo que te cuesta. Es mejor estudiar poco pero todos los días que muchas horas sin orden." },
      { q: "Tengo un horario difícil, ¿puedo entrar?", a: "Sí. Las clases son en vivo por Google Meet, en la tarde, y se graban: cada semana te compartimos las grabaciones por si un día no alcanzas a conectarte. Así puedes combinarlas con el colegio o el trabajo." }
    ]
  },
  {
    category: "Metodología & Resultados",
    icon: Target,
    items: [
      { q: "¿Qué pasa si me bloqueo en la prueba?", a: "Para eso están los ensayos mensuales: te acostumbras al tiempo y a la presión antes de la prueba real. En clase también practicamos técnicas de descarte y cómo manejar los nervios." },
      { q: "¿Es solo para alumnos brillantes?", a: "No. Muchos de nuestros alumnos sienten que 'no les da la cabeza'. Vamos paso a paso y, si algo no quedó claro, te lo explicamos de nuevo." }
    ]
  }
];
