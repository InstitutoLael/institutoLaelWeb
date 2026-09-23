// src/data/orientacion.js
// === Orientación vocacional · página /orientacion ===
// No nombrar a la persona especialista en la web.
import { ClipboardList, MessageSquare, Map } from 'lucide-react';

// Precio propuesto, confirmar con Diego: $15.000 por sesión de 60 minutos.
// Gratis para alumnos del Plan Completo del preu PAES.
export const ORIENTACION_PRICE = '$15.000';

export const ORIENTACION = {
  id: 'orientacion',
  seo: {
    title: 'Orientación vocacional online | Instituto Lael',
    description: 'Sesión individual de 60 minutos con un especialista en orientación vocacional: test, conversación y un plan para tu postulación. Online por Google Meet.',
  },
  hero: {
    eyebrow: 'Orientación vocacional',
    title: '¿No sabes qué estudiar?',
    accent: 'Lo conversamos.',
    desc: 'Una sesión individual de 60 minutos, online, con un especialista en orientación. Haces un test, conversamos de lo que te gusta y te llevas un plan para tu postulación.',
    stats: [['60 min', 'Sesión individual'], ['Online', 'Google Meet'], ['Gratis', 'Con Plan Completo']],
  },
  cta: {
    label: 'Agendar mi sesión',
    whatsapp: 'Hola, quiero agendar una sesión de orientación vocacional en Lael',
  },
  includes: {
    eyebrow: 'Qué incluye',
    title: 'Una hora solo para ti',
    items: [
      { icon: ClipboardList, title: 'Test vocacional', desc: 'Respondes un test de intereses y habilidades. En la sesión lo revisamos juntos y vemos qué dice de ti.' },
      { icon: MessageSquare, title: 'Conversación', desc: 'Hablamos de lo que te gusta, de lo que te preocupa y de lo que esperas de tu futuro. Sin apuro y sin juzgar.' },
      { icon: Map, title: 'Tu plan', desc: 'Sales con carreras para mirar, qué pruebas PAES te conviene rendir y los próximos pasos para postular.' },
    ],
  },
  audience: {
    eyebrow: 'Para quién es',
    title: 'Para cuando la duda pesa',
    items: [
      'Estás en 3° o 4° medio y tienes varias carreras en la cabeza, o ninguna.',
      'Ya egresaste y quieres volver a postular o cambiarte de carrera.',
      'Terminaste el colegio con la Escuela de Sueños y quieres seguir estudiando.',
      'Tienes una idea clara, pero quieres confirmarla antes de postular.',
    ],
  },
  steps: {
    eyebrow: 'Cómo funciona',
    title: 'Paso a paso',
    items: [
      { title: 'Agendas', desc: 'Te inscribes y coordinamos contigo el día y la hora por WhatsApp.' },
      { title: 'Haces el test', desc: 'Te enviamos el test para que lo respondas con calma antes de la sesión.' },
      { title: 'Sesión de 60 minutos', desc: 'Te conectas por Google Meet con el especialista. Si quieres, tu apoderado puede acompañarte en una parte.' },
      { title: 'Te llevas tu plan', desc: 'Carreras que calzan contigo, pruebas que te conviene rendir y qué hacer desde ahora.' },
    ],
  },
  price: {
    eyebrow: 'Valor',
    title: 'Una sesión, un plan',
    amount: ORIENTACION_PRICE,
    period: 'por sesión de 60 minutos',
    note: 'Si estás en el Plan Completo del preu PAES, la sesión es gratis.',
    features: [
      'Sesión individual por Google Meet',
      'Test de intereses y habilidades',
      'Plan con carreras, pruebas y próximos pasos',
    ],
  },
  related: [
    { to: '/calculadora', label: 'Ir a la calculadora', title: 'Calcula tu puntaje ponderado', desc: 'Mira cuánto necesitas para la carrera que te interesa, con las ponderaciones oficiales.' },
    { to: '/paes', label: 'Ver preu PAES', title: 'Preu PAES', desc: 'Con el Plan Completo, la orientación va incluida.' },
  ],
  faqs: [
    { q: '¿Me van a decir qué tengo que estudiar?', a: 'La decisión siempre es tuya. Te ayudamos a ordenar lo que sientes y lo que sabes, para que elijas con más información y menos presión.' },
    { q: '¿Con quién es la sesión?', a: 'Con un especialista en orientación vocacional que trabaja con Lael. Te confirmamos todo al agendar.' },
    { q: '¿Puede estar mi mamá, papá o apoderado?', a: 'Sí, si tú quieres. Muchas veces sirve que escuchen una parte de la conversación.' },
    { q: 'Estoy en el Plan Completo del preu, ¿cómo la pido?', a: 'Escríbenos por WhatsApp o inscríbete aquí y te agendamos sin costo.' },
    { q: '¿Sirve si ya salí del colegio hace años?', a: 'Sí. Nunca es tarde para elegir qué estudiar, y el plan se arma según tu situación.' },
  ],
  closing: {
    title: 'Tu sueño no tiene',
    accent: 'fecha de vencimiento.',
    desc: 'Agenda tu sesión y empieza a ordenar lo que viene.',
  },
};
