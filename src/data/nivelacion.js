// src/data/nivelacion.js
// === Nivelación de estudios para adultos (exámenes libres, mayores de 18) ===
// Fuente de los datos oficiales: Mineduc / epja.mineduc.cl / ChileAtiende
// (cartilla "Exámenes de validación de estudios - Mayores de 18 años", 2026).
// Revisar cada año: las fechas de inscripción y examen cambian.

export const ADULT_HERO = {
  eyebrow: 'Nivelación de estudios · Mayores de 18',
  title: 'Termina el colegio.',
  accent: 'Nunca es tarde.',
  desc: 'Te preparamos para rendir los exámenes libres del Mineduc y sacar tu enseñanza básica o media. Clases online en vivo, a tu ritmo y gratis.',
};

export const ADULT_FREE_NOTE = 'La nivelación para adultos es gratis. La sostenemos con lo que aportan nuestros otros programas y las empresas, porque creemos que terminar el colegio no debería depender del bolsillo.';

// Niveles que se pueden validar (Mineduc, mayores de 18)
export const ADULT_LEVELS = [
  {
    id: 'basica',
    title: 'Enseñanza básica',
    equiv: 'Nivel Básico 1, 2 y 3 (1° a 8° básico)',
    subjects: ['Lenguaje', 'Matemática', 'Ciencias Naturales (desde 5° básico)', 'Estudios Sociales (desde 5° básico)'],
  },
  {
    id: 'media1',
    title: 'Primer Nivel Medio',
    equiv: 'Equivale a 1° y 2° medio',
    subjects: ['Lengua Castellana', 'Matemática', 'Ciencias Naturales', 'Estudios Sociales', 'Inglés'],
  },
  {
    id: 'media2',
    title: 'Segundo Nivel Medio',
    equiv: 'Equivale a 3° y 4° medio · te da la Licencia de Enseñanza Media',
    subjects: ['Lengua Castellana', 'Matemática', 'Ciencias Naturales', 'Estudios Sociales', 'Inglés'],
  },
];

// Un ciclo por semestre = dos oportunidades de rendir al año
export const ADULT_CYCLES = [
  { title: 'Ciclo 1', when: 'Marzo a mayo', exam: 'Rindes en junio (según calendario Mineduc)', note: 'Si quieres entrar a la educación superior, este es el período recomendado por el Mineduc para validar 3° y 4° medio.' },
  { title: 'Ciclo 2', when: 'Julio a septiembre', exam: 'Rindes en octubre (según calendario Mineduc)', note: 'Segunda oportunidad del año, para seguir con el siguiente nivel o volver a rendir.' },
];

export const ADULT_STEPS = [
  { num: '01', title: 'Nos escribes', desc: 'Vemos juntos hasta qué curso llegaste y qué nivel te toca rendir.' },
  { num: '02', title: 'Te inscribes en el Mineduc', desc: 'La inscripción es personal y gratuita en ayudamineduc.cl. Te explicamos paso a paso qué documentos necesitas.' },
  { num: '03', title: 'Clases en vivo', desc: 'Estudias con nosotros por Google Meet los temarios oficiales de cada asignatura. Las clases quedan grabadas.' },
  { num: '04', title: 'Rindes y apruebas', desc: 'Das los exámenes en el colegio que te asigna el Mineduc. Con nota 4,0 o más en todo, apruebas el nivel.' },
];

export const ADULT_FAQS = [
  { q: '¿Cuánto cuesta?', a: 'Nada. La preparación en Lael es gratis y la inscripción en el Mineduc también.' },
  { q: '¿Quién puede participar?', a: 'Personas de 18 años o más que no estén matriculadas en un colegio o programa de educación de adultos al momento de inscribirse.' },
  { q: '¿Validar para seguir estudiando o para trabajar?', a: 'El Mineduc tiene dos procesos. El de "continuidad de estudios" te da la licencia y te permite seguir a la educación superior. El de "fines laborales" solo sirve para el trabajo y no da la Licencia de Enseñanza Media. Nosotros te preparamos para el de continuidad de estudios.' },
  { q: '¿Qué necesito para inscribirme en el Mineduc?', a: 'Tu cédula de identidad vigente y tu último certificado de estudios. Si eres extranjero, primero debes hacer el enrolamiento presencial en Ayuda Mineduc; te orientamos en eso.' },
  { q: '¿Cómo se aprueba?', a: 'Hay una prueba por cada asignatura del nivel. Apruebas con nota 4,0 o más en todas. En media, si repruebas una igual puedes pasar con promedio 4,5 o más (5,0 si la reprobada es Lenguaje o Matemática).' },
  { q: '¿Y si no apruebo?', a: 'Te puedes volver a inscribir en el siguiente período. Con nosotros sigues en el ciclo siguiente sin costo.' },
];
