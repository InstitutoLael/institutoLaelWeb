// src/data/talleres-ia.js
// === Talleres de IA para estudiantes y familias homeschool · página /talleres-ia ===
import { Brain, CalendarCheck, Palette, ShieldCheck } from 'lucide-react';

// Precio propuesto, confirmar con Diego: $19.990 por taller de 4 clases.
export const TALLERES_IA_PRICE = '$19.990';

export const TALLERES_IA = {
  id: 'talleres-ia',
  seo: {
    title: 'Talleres de IA para estudiantes y familias homeschool | Instituto Lael',
    description: 'Taller online de 4 clases para usar ChatGPT, Gemini, Claude y Canva a favor de tu estudio, con criterio y sin copiar. Para estudiantes y familias homeschool.',
  },
  hero: {
    eyebrow: 'Talleres de IA · Estudiantes y familias homeschool',
    title: 'Usa la IA para aprender,',
    accent: 'no para copiar.',
    desc: 'Un taller de 4 clases online para aprender a usar ChatGPT, Gemini, Claude y Canva a favor de tu estudio: resumir, practicar, organizarte y crear tus propios trabajos.',
    stats: [['4 clases', 'Por taller'], ['En vivo', 'Google Meet'], ['Familias', 'Homeschool']],
  },
  cta: {
    label: 'Inscribirme al taller',
    whatsapp: 'Hola, quiero información sobre los talleres de IA de Lael',
  },
  includes: {
    eyebrow: 'Qué vas a aprender',
    title: 'Herramientas que ya existen, bien usadas',
    chips: ['ChatGPT', 'Gemini', 'Claude', 'Canva'],
    items: [
      { icon: Brain, title: 'Estudiar con IA', desc: 'Pedirle que te explique algo de otra forma, que te haga preguntas de práctica y que te corrija.' },
      { icon: CalendarCheck, title: 'Organizarte', desc: 'Armar un plan de estudio para la semana o para una prueba, y cumplirlo.' },
      { icon: Palette, title: 'Crear con Canva', desc: 'Presentaciones e infografías hechas por ti, que se vean bien y digan lo que quieres decir.' },
      { icon: ShieldCheck, title: 'Con criterio', desc: 'Cuándo usarla y cuándo no, cómo revisar lo que te responde y cómo cuidar tus datos.' },
    ],
  },
  audience: {
    eyebrow: 'Para quién es',
    title: 'Para estudiantes y sus familias',
    items: [
      'Estudiantes de media y preu que quieren estudiar mejor en menos tiempo.',
      'Familias homeschool: papás e hijos pueden tomar el taller juntos.',
      'Apoderados que quieren entender las herramientas que usan sus hijos.',
      'Cualquiera que haya probado ChatGPT y sienta que le está sacando poco.',
    ],
  },
  steps: {
    eyebrow: 'Cómo funciona',
    title: 'Cuatro clases prácticas',
    items: [
      { title: 'Te inscribes', desc: 'Dejas tus datos y te enviamos las fechas del próximo taller.' },
      { title: 'Clases en vivo', desc: 'Cuatro clases por Google Meet. En cada una practicas con tus propias materias.' },
      { title: 'Te llevas ejemplos', desc: 'Terminas con instrucciones y ejemplos listos para usar cuando estudies.' },
    ],
  },
  price: {
    eyebrow: 'Valor',
    title: 'Un taller completo',
    amount: TALLERES_IA_PRICE,
    period: 'por taller de 4 clases',
    note: 'Usamos las versiones gratuitas de cada herramienta: no necesitas pagar suscripciones.',
    features: [
      '4 clases en vivo por Google Meet',
      'Práctica con tus propias materias',
      'Ideal para hacerlo en familia',
    ],
  },
  related: [
    { to: '/empresas', label: 'Ver empresas', title: '¿Lo quieres para tu equipo?', desc: 'Tenemos talleres de IA para empresas, online o presencial.' },
  ],
  faqs: [
    { q: '¿Necesito saber de tecnología?', a: 'No. Partimos desde cero y avanzamos con ejemplos simples.' },
    { q: '¿Tengo que pagar ChatGPT u otra herramienta?', a: 'No. Trabajamos con las versiones gratuitas.' },
    { q: '¿Usar IA para estudiar no es hacer trampa?', a: 'Depende de cómo la uses. En el taller vemos justamente eso: usarla para entender y practicar, y hacer tus trabajos con tus propias palabras.' },
    { q: '¿Desde qué edad se puede tomar?', a: 'Está pensado para estudiantes de enseñanza media. Los más chicos pueden tomarlo acompañados de un adulto.' },
    { q: '¿Cuándo es el próximo taller?', a: 'Anunciamos las fechas por Instagram y WhatsApp. Si te inscribes, te avisamos.' },
  ],
  closing: {
    title: 'Aprende a usarla',
    accent: 'a tu favor.',
    desc: 'Inscríbete y te avisamos cuando abra el próximo taller.',
  },
};
