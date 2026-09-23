// src/data/verano.js
// === Verano Lael 2027: cursos cortos antes de marzo ===
// Enero 2027: lunes 4 al viernes 29. En febrero no hay clases (vacaciones),
// salvo las charlas de Escuela de Sueños.

export const VERANO_WHATSAPP = (curso) =>
  `https://wa.me/56964626568?text=${encodeURIComponent(`Hola, quiero inscribirme en ${curso} (Verano Lael 2027)`)}`;

export const VERANO_COURSES = [
  {
    id: 'arranque-paes',
    tag: 'PAES',
    name: 'Arranque PAES',
    when: 'Del 4 al 29 de enero',
    desc: 'Llega a marzo con la base lista. Repasamos lo más importante de M1 y Competencia Lectora para que el año del preu no parta cuesta arriba.',
    details: ['M1 y Competencia Lectora', '2 clases de 1 hora a la semana por ramo', 'Por Google Meet, con grabaciones'],
    price: '$15.000 por ramo',
    priceNote: 'o $25.000 los dos ramos, por todo el curso',
    featured: true,
  },
  {
    id: 'ia-estudiar',
    tag: 'Gratis',
    name: 'IA para estudiar',
    when: '2 clases en enero',
    desc: 'Diego te enseña a usar ChatGPT, Gemini y otras herramientas para estudiar mejor: resumir, hacerte preguntas de práctica y entender lo que no te quedó claro. Sin copiar, aprendiendo.',
    details: ['Para estudiantes de media y preu', 'Con Diego Chaparro', 'Fechas por WhatsApp e Instagram'],
    price: 'Gratis',
    priceNote: 'solo tienes que inscribirte',
  },
  {
    id: 'ingles-verano',
    tag: 'Inglés',
    name: 'Hablar sin miedo: verano',
    when: '4 semanas en enero',
    desc: 'Un mes para soltarte a conversar en inglés con Monse. Ideal si entiendes harto pero te cuesta hablar.',
    details: ['2 clases a la semana', 'Conversación desde el primer día', 'Por Google Meet'],
    price: '$19.990',
    priceNote: 'por todo el curso',
  },
  {
    id: 'escuela-suenos',
    tag: 'Adultos',
    name: 'Escuela de Sueños: charlas de inicio',
    when: '2 charlas en febrero',
    desc: 'Si quieres terminar el colegio este año, en estas charlas te explicamos cómo inscribirte en el Mineduc (abre en abril) y cómo funcionan las clases gratuitas desde marzo.',
    details: ['Para mayores de 18', 'Te ayudamos con los documentos', 'Online'],
    price: 'Gratis',
    priceNote: 'y la nivelación también',
  },
];
