// src/data/apoderados.js
// === Preu para apoderados (charla gratis) · página /apoderados ===
// Las fechas se anuncian por Instagram y WhatsApp: no poner fechas aquí
// hasta que estén confirmadas.
import { GraduationCap, HeartHandshake, Wallet, Smile } from 'lucide-react';

export const APODERADOS = {
  id: 'apoderados',
  seo: {
    title: 'Preu para apoderados: charla PAES gratis | Instituto Lael',
    description: 'Charla online y gratuita para apoderados: cómo funciona la PAES, cómo acompañar a tu hijo, becas y apoyo emocional. Por Google Meet.',
  },
  hero: {
    eyebrow: 'Preu para apoderados · Charla gratis',
    title: 'Tu hijo da la PAES.',
    accent: 'Tú también puedes prepararte.',
    desc: 'Una charla online y gratuita para mamás, papás y apoderados. Te contamos cómo funciona la PAES, cómo acompañar sin presionar y qué becas existen.',
    stats: [['Gratis', 'Para familias'], ['Online', 'Google Meet'], ['En vivo', 'Con preguntas']],
  },
  cta: {
    label: 'Inscribirme a la charla',
    whatsapp: 'Hola, quiero inscribirme en la charla para apoderados de Lael',
  },
  includes: {
    eyebrow: 'De qué hablamos',
    title: 'Lo que nos preguntan las familias',
    items: [
      { icon: GraduationCap, title: 'Cómo funciona la PAES', desc: 'Pruebas obligatorias y electivas, puntajes, ponderaciones y las fechas importantes del proceso de admisión.' },
      { icon: HeartHandshake, title: 'Cómo apoyar a tu hijo', desc: 'Rutinas de estudio en casa, cómo hablar de los resultados y cuándo conviene pedir ayuda.' },
      { icon: Wallet, title: 'Becas y beneficios', desc: 'Gratuidad, becas del Estado, el FUAS y las becas parciales que damos en Lael.' },
      { icon: Smile, title: 'Apoyo emocional', desc: 'El cansancio, la ansiedad y los días antes de la prueba. Cómo acompañar sin sumar presión.' },
    ],
  },
  audience: {
    eyebrow: 'Para quién es',
    title: 'Para quien acompaña',
    desc: 'No necesitas saber de la PAES ni que tu hijo sea alumno de Lael.',
    items: [
      'Apoderados de estudiantes de 3° y 4° medio.',
      'Familias donde será la primera persona en entrar a la educación superior.',
      'Familias homeschool que están viendo cómo preparar la PAES.',
      'Abuelos, tíos o hermanos mayores que acompañan a un estudiante.',
    ],
  },
  steps: {
    eyebrow: 'Cómo funciona',
    title: 'Tres pasos',
    items: [
      { title: 'Te inscribes', desc: 'Dejas tus datos en el formulario. Toma un par de minutos.' },
      { title: 'Te avisamos', desc: 'Te enviamos la fecha y el link de Google Meet por WhatsApp o correo.' },
      { title: 'Te conectas', desc: 'Escuchas la charla y al final preguntas lo que quieras.' },
    ],
  },
  price: {
    eyebrow: 'Valor',
    title: 'Sin costo',
    amount: 'Gratis',
    period: 'para todas las familias',
    note: 'Las fechas se anuncian por Instagram y WhatsApp. Si te inscribes, te avisamos directamente.',
    features: [
      'Charla en vivo por Google Meet',
      'Espacio de preguntas al final',
      'Tu hijo no necesita ser alumno de Lael',
    ],
  },
  related: [
    { to: '/ensayo-gratis', label: 'Ver ensayo', title: 'Ensayo PAES gratis', desc: 'Para que tu hijo mida cómo va, sin costo.' },
    { to: '/paes', label: 'Ver preu PAES', title: 'Preu PAES', desc: 'Clases en vivo desde marzo, con matrícula gratis y becas parciales.' },
  ],
  faqs: [
    { q: '¿Tiene costo?', a: 'No. La charla es gratis.' },
    { q: '¿Mi hijo tiene que estar en Lael?', a: 'No. Está abierta a cualquier familia.' },
    { q: '¿Cuándo es?', a: 'Anunciamos las fechas por Instagram (@institutolael) y WhatsApp. Si te inscribes, te avisamos apenas estén.' },
    { q: '¿Puedo preguntar por el caso de mi hijo?', a: 'Sí. Al final hay tiempo para preguntas, y si prefieres algo más privado, nos escribes por WhatsApp después.' },
    { q: '¿Qué necesito para conectarme?', a: 'Un celular o computador con internet. Te enviamos el link de Google Meet antes de la charla.' },
  ],
  closing: {
    title: 'Acompañar también',
    accent: 'se aprende.',
    desc: 'Inscríbete y te avisamos cuando tengamos la próxima fecha.',
  },
};
