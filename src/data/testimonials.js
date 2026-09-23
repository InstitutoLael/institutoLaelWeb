/*
  TESTIMONIOS REALES
  Única lista de testimonios del sitio: la usan Home y /casos-reales.
  Solo testimonios reales y autorizados (formulario de testimonios). Si alguien
  pidió aparecer solo con iniciales, se respeta. 'featured' = aparece en Home.
*/

export const TESTIMONIALS = [
  {
    id: 't-camila',
    name: 'C. J.',
    program: 'PAES · 2025',
    quote: 'La forma tan única de los profesores de explicar me terminó facilitando muchos temas que después veía en clases del colegio.',
    memory: 'Lo que más recuerdo, y hasta hoy considero mi parte favorita, eran los versículos al final de la clase del Profe Diego: siempre tenía una palabra de aliento.',
    rating: 5,
    initials: 'CJ',
    featured: true,
  },
  {
    id: 't-matias',
    name: 'M. M.',
    program: 'PAES · 2023',
    quote: 'Me dio seguridad y confianza. Tener buenos profes hizo que fuera una instancia de aprendizaje cálido y agradable, lo que me ayudó mucho a bajar la ansiedad y el estrés antes de la PAES.',
    memory: 'Recuerdo el entusiasmo, la dedicación y el esfuerzo de cada profe al enseñar, siempre atentos y dispuestos. Fue hace tiempo, pero recuerdo con cariño cada clase.',
    rating: 5,
    initials: 'MM',
    featured: true,
  },
  {
    id: 't-rocio',
    name: 'R. R.',
    program: 'PAES · 2025',
    quote: 'Cambió mi forma de organizarme frente a distintos horarios de clases, ayudándome a adaptarme a cambios que me beneficiarán a futuro, además de traerme aprendizajes que no vi en el colegio.',
    memory: 'Recuerdo muchísimo las clases de biología. El profe explicaba de forma sencilla, podíamos participar y nunca sentimos que un error fuera algo malo, sino parte del proceso.',
    rating: 5,
    initials: 'RR',
    featured: true,
  },
  {
    id: 't-victoria',
    name: 'Victoria',
    program: 'Inglés · 2023',
    quote: 'Me inscribí con una gran expectativa y la verdad fue muy motivador para seguir esforzándome en aprender. La profe era muy simpática y muy dinámica en sus clases.',
    rating: 5,
    initials: 'V',
    featured: true,
  },
  {
    id: 't-pamela',
    name: 'Pamela Ortega',
    program: 'Lengua de Señas Chilena · 2025',
    area: 'lsch',
    quote: 'Estar en Lael me abrió un mundo de posibilidades, de gente interesante, y me acercó a algo hermoso que es la Lengua de Señas Chilena. Hoy volvería a tomar el curso, y otros más avanzados si tuviera la oportunidad.',
    memory: 'Clases muy dinámicas y divertidas. La profesora Fernanda, un 7: súper clara, graciosa y cercana. Yo no sabía nada y ahora me siento preparada para comunicarme con la comunidad Sorda.',
    rating: 5,
    initials: 'PO',
  },
  {
    id: 't-daniela',
    name: 'Daniela R.',
    program: 'Lengua de Señas Chilena',
    area: 'lsch',
    quote: 'El curso es excelente. Aprendí cultura sorda con una pedagogía muy paciente y estructurada.',
    rating: 5,
    initials: 'DR',
  },
];

// Empresas familiares que trabajaron con Lael (también aparecen en /empresas).
export const COMPANY_TESTIMONIALS = [
  {
    id: 'naama',
    name: 'Naama Studio',
    program: 'Idiomas para equipos',
    quote: 'El sistema de idiomas de Lael permitió que nuestro equipo creativo se comunicara con fluidez con clientes en el extranjero, eliminando la barrera del idioma en solo meses.',
  },
  {
    id: 'siloe',
    name: 'Siloé D&V Construcciones',
    program: 'LSCh para equipos',
    quote: 'Implementar el programa de LSCh no solo nos permitió cumplir con la ley, sino que transformó la cultura de inclusión en nuestra oficina técnica.',
  },
];

export const SHARE_STORY_URL = 'https://wa.me/56964626568?text=Hola,%20quiero%20compartir%20mi%20testimonio%20con%20Instituto%20Lael';
