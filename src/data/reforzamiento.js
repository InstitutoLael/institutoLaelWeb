// src/data/reforzamiento.js
// === Clases particulares (7° básico a 4° medio) · página /reforzamiento ===
// Son 1 a 1: un profe y un alumno. Precio por clase de 1 hora, o pack de 4.
import { ClaseEnVivo, Grupo, Grabacion, Guia } from '../components/icons/LaelIcons';

export const REFORZAMIENTO_PRICE = '$10.000';
export const REFORZAMIENTO_PACK = '$36.000'; // 4 clases al mes

export const REFORZAMIENTO = {
  id: 'reforzamiento',
  seo: {
    title: 'Clases particulares online, 7° básico a 4° medio | Instituto Lael',
    description: 'Clases particulares 1 a 1 en vivo de Matemática, Lenguaje, Ciencias, Historia, Inglés y ramos PAES, de 7° básico a 4° medio. Desde $9.000 la hora. También para homeschool.',
  },
  hero: {
    eyebrow: 'Clases particulares · 7° básico a 4° medio',
    title: 'Que el colegio',
    accent: 'no se te haga cuesta arriba.',
    desc: 'Clases 1 a 1 por Google Meet, solo tú y el profe. Para ponerte al día con lo que ves en el colegio, preparar una prueba o reforzar un ramo PAES.',
    stats: [['1 a 1', 'Solo tú y el profe'], ['1 hora', 'Por clase'], ['Tu horario', 'Lo acordamos contigo']],
  },
  cta: {
    label: 'Inscribirme',
    whatsapp: 'Hola, quiero información sobre las clases particulares de Lael',
  },
  includes: {
    eyebrow: 'Qué incluye',
    title: 'Un profe que te explica con calma',
    desc: 'Eliges la asignatura que te está costando y la clase se arma en torno a tus dudas.',
    chips: ['Matemática', 'Lenguaje', 'Ciencias', 'Historia', 'Inglés', 'Ramos PAES'],
    items: [
      { icon: ClaseEnVivo, title: 'Clase en vivo', desc: 'Una hora por Google Meet. Llevas tus dudas, tu guía o la prueba que viene, y trabajan sobre eso.' },
      { icon: Grupo, title: 'Solo para ti', desc: 'El profe va a tu ritmo. Nadie te apura y puedes preguntar las veces que necesites.' },
      { icon: Grabacion, title: 'Grabaciones', desc: 'Cada semana compartimos la grabación de la clase para que repases antes de una prueba.' },
      { icon: Guia, title: 'Ejercicios', desc: 'Material para practicar entre una clase y otra, con los contenidos que estás viendo en el colegio.' },
    ],
  },
  audience: {
    eyebrow: 'Para quién es',
    title: '¿Te suena alguno de estos casos?',
    desc: 'Si estás entre 7° básico y 4° medio, este espacio es para ti.',
    items: [
      'Te fue mal en una prueba y quieres entender la materia antes de la siguiente.',
      'Hay un ramo que siempre se te complica y quieres dejar de arrastrarlo.',
      'Tu familia hace homeschool y busca un profe en vivo que complemente lo que ven en casa.',
      'Vas en 3° o 4° medio y quieres reforzar un ramo PAES con un profe solo para ti.',
    ],
  },
  steps: {
    eyebrow: 'Cómo funciona',
    title: 'Partir es simple',
    items: [
      { title: 'Te inscribes', desc: 'Eliges la asignatura y nos cuentas en qué curso vas y qué te está costando.' },
      { title: 'Acordamos el horario', desc: 'Te escribimos por WhatsApp para buscar un horario que te acomode y te presentamos a tu profe.' },
      { title: 'Tu clase', desc: 'Te conectas por Google Meet. Después puedes repasar con la grabación.' },
    ],
  },
  price: {
    eyebrow: 'Valor',
    title: 'Pagas por clase',
    amount: REFORZAMIENTO_PRICE,
    period: 'la clase de 1 hora',
    note: `O toma 4 clases al mes por ${REFORZAMIENTO_PACK} (te sale a $9.000 cada una). Si el costo es un problema, puedes postular a una beca parcial.`,
    features: [
      'Clase 1 a 1 en vivo de 1 hora',
      'Grabación de cada clase',
      'Horario acordado contigo',
      'Sin matrícula ni permanencia',
    ],
  },
  related: [
    { to: '/paes', label: 'Ver preu PAES', title: '¿Vas en 3° o 4° medio?', desc: 'Si quieres preparar toda la PAES, el preu tiene clases en grupo desde marzo.' },
    { to: '/talleres-ia', label: 'Ver talleres', title: 'Talleres de IA', desc: 'Aprende a usar la IA para estudiar mejor, sin copiar.' },
  ],
  faqs: [
    { q: '¿Qué necesito para las clases?', a: 'Un computador, tablet o celular con internet, y una cuenta de Google para entrar a Google Meet.' },
    { q: '¿Es solo para mí o hay más alumnos?', a: 'Es solo para ti: un profe y un alumno. Si quieren venir dos hermanos o dos amigos juntos a la misma clase, conversémoslo.' },
    { q: '¿Tengo que tomar un mínimo de clases?', a: 'No. Puedes tomar una sola clase antes de una prueba, o el pack de 4 clases al mes si quieres algo constante.' },
    { q: 'Hacemos homeschool, ¿nos sirve?', a: 'Sí. Trabajamos los contenidos del currículum nacional de cada curso, así que las clases sirven como apoyo para lo que ven en casa y para preparar los exámenes.' },
    { q: '¿En qué horario son?', a: 'El que acordemos contigo, según tu disponibilidad y la del profe.' },
    { q: '¿Qué pasa si no puedo ir a una clase?', a: 'Avísanos con al menos 24 horas y la cambiamos a otro día sin costo.' },
    { q: '¿Cómo me inscribo si soy menor de edad?', a: 'En el formulario te pedimos los datos de tu apoderado, para mantenerlo al tanto.' },
  ],
  closing: {
    title: 'Un ramo menos',
    accent: 'que te quite el sueño.',
    desc: 'Inscríbete o escríbenos y vemos juntos qué asignatura te conviene reforzar.',
  },
};
