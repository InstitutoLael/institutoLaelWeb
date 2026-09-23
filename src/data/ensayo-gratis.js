// src/data/ensayo-gratis.js
// === Ensayo PAES gratis (dos veces al año) · página /ensayo-gratis ===
// Las fechas se anuncian por Instagram y WhatsApp.
import { FileText, BarChart3, MessageSquare } from 'lucide-react';

export const ENSAYO_GRATIS = {
  id: 'ensayo-gratis',
  seo: {
    title: 'Ensayo PAES gratis online | Instituto Lael',
    description: 'Rinde un ensayo PAES online y gratis, abierto a todos. Dos veces al año, con resultados y comentarios para saber qué reforzar.',
  },
  hero: {
    eyebrow: 'Ensayo PAES gratis · Dos veces al año',
    title: 'Mide cómo vas',
    accent: 'antes de la prueba de verdad.',
    desc: 'Un ensayo PAES online y gratuito, abierto a cualquier persona. Lo rindes con el tiempo de la prueba y después recibes tus resultados con comentarios para saber qué reforzar.',
    stats: [['Gratis', 'Para todos'], ['2 veces', 'Al año'], ['Online', 'Desde tu casa']],
  },
  cta: {
    label: 'Inscribirme al ensayo',
    whatsapp: 'Hola, quiero inscribirme en el próximo ensayo PAES gratis de Lael',
  },
  includes: {
    eyebrow: 'Qué incluye',
    title: 'Un ensayo que te dice algo',
    items: [
      { icon: FileText, title: 'Formato PAES', desc: 'Preguntas hechas por nuestros profes según los temarios oficiales del DEMRE, con el tiempo que da la prueba.' },
      { icon: BarChart3, title: 'Tus resultados', desc: 'Te enviamos cuántas respuestas tuviste buenas y un puntaje de referencia para ubicarte.' },
      { icon: MessageSquare, title: 'Comentarios', desc: 'Te decimos en qué temas te conviene poner más energía de aquí a la PAES.' },
    ],
  },
  audience: {
    eyebrow: 'Para quién es',
    title: 'Abierto a todos',
    desc: 'No tienes que ser alumno de Lael.',
    items: [
      'Estás en 4° medio y quieres saber dónde estás parado.',
      'Vas en 3° medio y quieres conocer la prueba con tiempo.',
      'Ya egresaste y vas a volver a rendir la PAES.',
      'Estás pensando entrar a un preu y quieres ver cómo te va primero.',
    ],
  },
  steps: {
    eyebrow: 'Cómo funciona',
    title: 'Del registro a tus resultados',
    items: [
      { title: 'Te inscribes', desc: 'Dejas tus datos en el formulario y quedas en la lista.' },
      { title: 'Te avisamos', desc: 'Anunciamos la fecha por Instagram y WhatsApp, y te enviamos el acceso.' },
      { title: 'Rindes', desc: 'Online, desde tu casa, con el tiempo de la prueba real.' },
      { title: 'Recibes tu resultado', desc: 'Con tu puntaje de referencia y comentarios sobre qué reforzar.' },
    ],
  },
  price: {
    eyebrow: 'Valor',
    title: 'Sin letra chica',
    amount: 'Gratis',
    period: 'dos veces al año',
    note: 'Las fechas se anuncian por Instagram y WhatsApp.',
    features: [
      'No necesitas ser alumno de Lael',
      'Resultados con comentarios',
      'Online, por computador o celular',
    ],
  },
  related: [
    { to: '/paes', label: 'Ver preu PAES', title: '¿Quieres ensayos todos los meses?', desc: 'En el preu PAES hacemos un ensayo al mes, con el tiempo de la prueba.' },
    { to: '/calculadora', label: 'Ir a la calculadora', title: 'Calcula tu ponderado', desc: 'Mira qué puntaje necesitas para la carrera que te interesa.' },
  ],
  faqs: [
    { q: '¿Cuándo es el próximo ensayo?', a: 'Hacemos dos al año. Anunciamos las fechas por Instagram (@institutolael) y WhatsApp, y si te inscribes te avisamos directamente.' },
    { q: '¿Tengo que ser alumno de Lael?', a: 'No. Cualquier persona puede rendirlo.' },
    { q: '¿Qué pruebas incluye?', a: 'Te lo contamos junto con la fecha de cada ensayo.' },
    { q: '¿Es un ensayo oficial?', a: 'Es un ensayo propio de Lael, hecho por nuestros profes siguiendo los temarios oficiales. El puntaje que te damos es una referencia para ubicarte.' },
    { q: '¿Qué necesito para rendirlo?', a: 'Un computador o celular con buena conexión y el tiempo de la prueba libre, sin interrupciones.' },
  ],
  closing: {
    title: 'Sácale el miedo',
    accent: 'a la PAES.',
    desc: 'Inscríbete y te avisamos cuando abramos el próximo ensayo.',
  },
};
