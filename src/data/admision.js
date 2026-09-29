// src/data/admision.js
// Fechas oficiales del Proceso de Admisión 2027 (fuente: Mineduc / DEMRE,
// revisadas en septiembre de 2026). Cada año hay que actualizarlas.
// Las horas van en hora de Chile.

export const PAES_INICIO = '2026-11-30T09:00:00-03:00';

export const CALENDARIO_2027 = [
  { fecha: '2026-06-01', fin: '2026-07-22', t: 'Inscripción a la PAES', d: 'Desde el 1 de junio hasta el 22 de julio a las 13:00. Este año no hubo período extra.' },
  { fecha: '2026-06-15', fin: '2026-06-17', t: 'PAES de invierno', d: 'Rendición el 15, 16 y 17 de junio. Resultados el 17 de julio.' },
  { fecha: '2026-09-24', t: 'Ponderaciones y vacantes', d: 'Las universidades publican la oferta definitiva de carreras, vacantes y ponderaciones.' },
  { fecha: '2026-11-30', fin: '2026-12-02', t: 'PAES regular', d: 'Rendición el lunes 30 de noviembre y el martes 1 y miércoles 2 de diciembre.', destacado: true },
  { fecha: '2027-01-04', t: 'Resultados de la PAES', d: 'Se publican tus puntajes y ese mismo día parte la postulación.' },
  { fecha: '2027-01-04', fin: '2027-01-07', t: 'Postulación a las universidades', d: 'Del 4 al 7 de enero eliges tus carreras en orden de preferencia.' },
  { fecha: '2027-01-18', t: 'Resultados de selección', d: 'Sabes en qué carrera quedaste seleccionado o en qué lista de espera estás.' },
  { fecha: '2027-01-19', fin: '2027-01-21', t: 'Matrícula: primera etapa', d: 'Del 19 al 21 de enero te matriculas si quedaste seleccionado.' },
  { fecha: '2027-01-22', fin: '2027-01-28', t: 'Matrícula: segunda etapa', d: 'Del 22 al 28 de enero corren las listas de espera.' },
];

export const FUENTE_ADMISION = { label: 'demre.cl', url: 'https://demre.cl/calendario/' };
