// src/data/catalogo.js
// Catálogo único de programas: nombre, ruta, etiqueta corta, color propio y
// para quién es. Lo usan el menú, el pie de página, la barra del celular y
// los colores de cada página. Para sumar un programa, agrégalo aquí.
//
// Cada programa tiene su color de acento. El azul (#071D49) sigue siendo la
// base de la marca y el amarillo (#D7E400) el color de los botones; el color
// del programa se usa en detalles (etiquetas, palabras destacadas, íconos)
// siempre sobre fondo azul o como fondo con texto azul, para que se lea bien.

export const COLORES = {
  paes: '#D7E400',          // lima (el amarillo de la marca)
  adultos: '#FF9F7A',       // durazno: Escuela de Sueños
  ingles: '#7CC6FF',        // cielo
  espanol: '#C3A6FF',       // lila
  lsch: '#6EDDB0',          // menta
  verano: '#FFC53D',        // sol
  reforzamiento: '#F7A8D0', // rosa
  'talleres-ia': '#A5B4FF', // índigo claro
  orientacion: '#5FD4E0',   // turquesa
  empresas: '#C7D2E8',      // plata
  apoderados: '#FFD6A5',    // crema
};

export const PROGRAMAS_CATALOGO = [
  { id: 'paes', name: 'Preu PAES', path: '/paes', tag: 'Desde $10.000/mes', inscripcion: '/inscripcion?programa=paes' },
  { id: 'reforzamiento', name: 'Clases particulares', path: '/reforzamiento', tag: '1 a 1 · 7° básico a 4° medio', inscripcion: '/inscripcion?programa=reforzamiento' },
  { id: 'verano', name: 'Verano Lael', path: '/verano', tag: 'Cursos de enero', inscripcion: '/inscripcion?programa=verano' },
  { id: 'talleres-ia', name: 'Talleres de IA', path: '/talleres-ia', tag: 'Para estudiantes', inscripcion: '/inscripcion?programa=talleres-ia' },
  { id: 'orientacion', name: 'Orientación vocacional', path: '/orientacion', tag: 'Sesión individual', inscripcion: '/inscripcion?programa=orientacion' },
  { id: 'adultos', name: 'Escuela de Sueños', path: '/adultos', tag: 'Gratis · mayores de 18', inscripcion: '/inscripcion?programa=adultos' },
  { id: 'ingles', name: 'Inglés', path: '/idiomas', tag: 'Hablar sin miedo', inscripcion: '/inscripcion?programa=ingles' },
  { id: 'espanol', name: 'Español para extranjeros', path: '/espanol', tag: 'Chile también es tu casa', inscripcion: '/inscripcion?programa=espanol' },
  { id: 'lsch', name: 'Lengua de Señas', path: '/lsch', tag: 'Próximamente', inscripcion: '/lsch#avisame' },
  { id: 'empresas', name: 'Empresas', path: '/empresas', tag: 'Capacitación a medida', inscripcion: '/empresas#cotizar' },
].map((p) => ({ ...p, color: COLORES[p.id] }));

const porId = (id) => PROGRAMAS_CATALOGO.find((p) => p.id === id);

// Menú "para quién": cada persona encuentra lo suyo sin leer diez programas.
export const AUDIENCIAS = [
  {
    id: 'estudiantes',
    title: 'Estudiantes',
    desc: 'Preu, refuerzo y verano',
    items: [porId('paes'), porId('reforzamiento'), porId('verano'), porId('talleres-ia'), porId('orientacion')],
  },
  {
    id: 'adultos',
    title: 'Adultos',
    desc: 'Terminar el colegio e idiomas',
    items: [porId('adultos'), porId('ingles'), porId('espanol'), porId('lsch')],
  },
  {
    id: 'apoderados',
    title: 'Apoderados',
    desc: 'Todo lo que necesitas saber',
    items: [
      { id: 'apoderados', name: 'Charla para apoderados', path: '/apoderados', tag: 'Gratis', color: COLORES.apoderados },
      { id: 'becas', name: 'Becas', path: '/becas', tag: 'Postula en 3 minutos', color: COLORES.apoderados },
      { id: 'como-pagar', name: 'Cómo pagar', path: '/como-pagar', tag: 'Transferencia mensual', color: COLORES.apoderados },
      { id: 'condiciones', name: 'Condiciones y reglamento', path: '/condiciones', tag: 'Lo que acordamos', color: COLORES.apoderados },
    ],
  },
  {
    id: 'empresas',
    title: 'Empresas',
    desc: 'Equipos e instituciones',
    items: [
      porId('empresas'),
      { id: 'alianzas', name: 'Alianzas', path: '/alianzas', tag: 'Colegios, iglesias y fundaciones', color: COLORES.empresas },
    ],
  },
];

// Herramientas gratis (menú y pie de página)
export const HERRAMIENTAS = [
  { name: 'Calculadora de puntaje', path: '/calculadora', tag: '2.000+ carreras' },
  { name: 'Calendario Admisión 2027', path: '/calendario-admision', tag: 'Fechas oficiales' },
  { name: 'Glosario PAES', path: '/glosario-paes', tag: 'Sin palabras raras' },
  { name: 'Test de nivel de inglés', path: '/idiomas/test', tag: '10 preguntas' },
  { name: 'Ensayo PAES gratis', path: '/ensayo-gratis', tag: 'Dos veces al año' },
];

// Color del programa según la ruta actual (o null si la página no es de un programa)
export function colorDeRuta(pathname) {
  const p = PROGRAMAS_CATALOGO.find((x) => pathname === x.path || pathname.startsWith(x.path + '/'));
  if (p) return p.color;
  if (pathname.startsWith('/espanol') || pathname.startsWith('/en/')) return COLORES.espanol;
  if (['/apoderados', '/becas', '/como-pagar', '/condiciones'].includes(pathname)) return COLORES.apoderados;
  if (pathname === '/alianzas') return COLORES.empresas;
  return null;
}

// Programa según la ruta (para la barra fija del celular)
export function programaDeRuta(pathname) {
  if (pathname === '/preuniversitario') return porId('paes');
  if (pathname.startsWith('/en/spanish') || pathname === '/espanol-para-extranjeros') return porId('espanol');
  return PROGRAMAS_CATALOGO.find((x) => pathname === x.path) || null;
}
