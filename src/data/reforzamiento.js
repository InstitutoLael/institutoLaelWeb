// src/data/reforzamiento.js
// === Reforzamiento escolar (7° básico a 2° medio) · página /reforzamiento ===
import { ClaseEnVivo, Grupo, Grabacion, Guia } from '../components/icons/LaelIcons';

// Precio propuesto, confirmar con Diego: $12.000/mes por asignatura,
// 1 clase semanal de 1 hora.
export const REFORZAMIENTO_PRICE = '$12.000';

export const REFORZAMIENTO = {
  id: 'reforzamiento',
  seo: {
    title: 'Reforzamiento escolar online 7° básico a 2° medio | Instituto Lael',
    description: 'Clases online en vivo de Matemática, Lenguaje, Ciencias e Inglés para 7° básico a 2° medio, en grupos pequeños. También para familias homeschool.',
  },
  hero: {
    eyebrow: 'Reforzamiento escolar · 7° básico a 2° medio',
    title: 'Que el colegio',
    accent: 'no se te haga cuesta arriba.',
    desc: 'Clases online en vivo de Matemática, Lenguaje, Ciencias e Inglés, en grupos pequeños. Para ponerte al día con lo que ves en el colegio y llegar más tranquilo a las pruebas.',
    stats: [['7° a 2°', 'Básico y medio'], ['1 hora', 'Clase semanal'], ['En vivo', 'Google Meet']],
  },
  cta: {
    label: 'Inscribirme',
    whatsapp: 'Hola, quiero información sobre el reforzamiento escolar de Lael',
  },
  includes: {
    eyebrow: 'Qué incluye',
    title: 'Un profe que te explica con calma',
    desc: 'Eliges la asignatura que te está costando. Puedes tomar una o varias.',
    chips: ['Matemática', 'Lenguaje', 'Ciencias', 'Inglés'],
    items: [
      { icon: ClaseEnVivo, title: 'Clase en vivo', desc: 'Una clase de una hora a la semana por asignatura, por Google Meet. Si algo no se entiende, preguntas ahí mismo.' },
      { icon: Grupo, title: 'Grupos pequeños', desc: 'Pocos alumnos por curso, así el profe sabe cómo vas y nadie se queda mirando desde atrás.' },
      { icon: Grabacion, title: 'Grabaciones', desc: 'Cada semana compartimos la grabación de la clase para que repases antes de una prueba.' },
      { icon: Guia, title: 'Ejercicios', desc: 'Material para practicar entre una clase y otra, con los contenidos que estás viendo en el colegio.' },
    ],
  },
  audience: {
    eyebrow: 'Para quién es',
    title: '¿Te suena alguno de estos casos?',
    desc: 'Si estás entre 7° básico y 2° medio, este espacio es para ti.',
    items: [
      'Te fue mal en una prueba y quieres entender la materia antes de la siguiente.',
      'Hay un ramo que siempre se te complica y quieres dejar de arrastrarlo.',
      'Tu familia hace homeschool y busca clases en vivo con un profe y compañeros, para complementar lo que ven en casa.',
      'Te va bien, pero quieres llegar con una base firme a 3° medio y al preu.',
    ],
  },
  steps: {
    eyebrow: 'Cómo funciona',
    title: 'Partir es simple',
    items: [
      { title: 'Te inscribes', desc: 'Eliges la asignatura y nos dices en qué curso vas. La matrícula es gratis.' },
      { title: 'Armamos tu grupo', desc: 'Te ubicamos con compañeros de tu mismo nivel y te enviamos el horario por WhatsApp o correo.' },
      { title: 'Clases cada semana', desc: 'Te conectas a tu clase por Google Meet y repasas con la grabación cuando lo necesites.' },
    ],
  },
  price: {
    eyebrow: 'Valor',
    title: 'Un precio por asignatura',
    amount: REFORZAMIENTO_PRICE,
    period: 'al mes por asignatura',
    note: 'Si el costo es un problema, puedes postular a una beca parcial. La revisamos caso a caso.',
    features: [
      '1 clase en vivo de 1 hora a la semana',
      'Grabación de cada clase',
      'Matrícula gratis',
      'Puedes sumar más asignaturas cuando quieras',
    ],
  },
  related: [
    { to: '/paes', label: 'Ver preu PAES', title: '¿Vas en 3° o 4° medio?', desc: 'Para ti está el preu PAES, con clases desde marzo.' },
    { to: '/talleres-ia', label: 'Ver talleres', title: 'Talleres de IA', desc: 'Aprende a usar la IA para estudiar mejor, sin copiar.' },
  ],
  faqs: [
    { q: '¿Qué necesito para las clases?', a: 'Un computador, tablet o celular con internet, y una cuenta de Google para entrar a Google Meet.' },
    { q: '¿Puedo tomar más de una asignatura?', a: 'Sí. Cada asignatura tiene su propia clase semanal y se paga por separado.' },
    { q: 'Hacemos homeschool, ¿nos sirve?', a: 'Sí. Trabajamos los contenidos del currículum nacional de cada curso, así que las clases sirven como apoyo para lo que ven en casa y para preparar los exámenes.' },
    { q: '¿En qué horario son?', a: 'Depende del grupo. Cuando te inscribes, armamos los grupos según curso y asignatura, y te enviamos el horario.' },
    { q: '¿Qué pasa si falto a una clase?', a: 'Cada semana compartimos la grabación, así que puedes verla después y preguntarle al profe en la clase siguiente.' },
    { q: '¿Cómo me inscribo si soy menor de edad?', a: 'En el formulario te pedimos los datos de tu apoderado, para mantenerlo al tanto.' },
  ],
  closing: {
    title: 'Un ramo menos',
    accent: 'que te quite el sueño.',
    desc: 'Inscríbete o escríbenos y vemos juntos qué asignatura te conviene reforzar.',
  },
};
