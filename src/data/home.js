import idiomasBg from '../assets/img/Home/mundo_idiomas_bg_1777943491283.webp';
import lschBg from '../assets/img/Home/mundo_lsch_bg_1777943626827.webp';
import adultosBg from '../assets/img/Home/mundo_adultos_bg_1777944001677.webp';

const YELLOW = '#D7E400';

export const OBLIGATORIAS = [
  { code: 'M1', name: 'Matemática M1', doc: 'Diego Chaparro' },
  { code: 'CL', name: 'Competencia Lectora', doc: null }
];

export const ELECTIVAS = [
  { code: 'M2', name: 'Matemática M2', doc: 'Diego / Kathy' },
  { code: 'BIO', name: 'Biología', doc: 'Martín' },
  { code: 'QUI', name: 'Química', doc: 'Martín' },
  { code: 'FIS', name: 'Física', doc: null },
  { code: 'HIS', name: 'Historia', doc: null }
];

export const WORLDS = [
  { id: 'ingles', label: 'INGLÉS', title: 'Habla con', accent: 'seguridad.', desc: 'Clases en vivo por Google Meet. Fluidez real sin atajos. Plan Trimestral: $11.990/mes.', bg: idiomasBg, cta: 'Ver programa', route: '/idiomas', active: true, price: '$14.990/mes' },
  { id: 'lsch', label: 'LSCh', title: 'Inclusión', accent: 'para todos.', desc: 'Lengua de Señas Chilena con instructores nativos. Cultura Sorda.', bg: lschBg, cta: 'Aprender LSCh', route: '/lsch', active: true, price: '$19.990/mes' },
  { id: 'coreano', label: 'COREANO', title: 'Prepárate para', accent: 'el TOPIK.', desc: 'Clases en vivo con docente nativa. Estamos armando la planificación completa antes de abrir cupos.', bg: idiomasBg, cta: 'Próximamente', route: '/coreano', active: false, price: null },
  { id: 'adultos', label: 'NIVELACIÓN', title: 'Tu segunda', accent: 'oportunidad.', desc: 'Termina tus estudios con un programa flexible. Próximamente.', bg: adultosBg, cta: 'Próximamente', route: '/adultos', active: false, price: null },
];

export const TEACHERS = [
  { id: 'diego', name: 'Diego Chaparro', role: 'Director & Profe', subject: 'Matemática (Colegios & Preu)', initials: 'DC', color: YELLOW },
  { id: 'martin', name: 'Martín', role: 'Profe de Ciencias', subject: 'Biología + Química', initials: 'MA', color: YELLOW },
  { id: 'kathy', name: 'Kathy', role: 'Profe de HomeSchool', subject: 'Matemática M2 & HomeSchool', initials: 'KA', color: YELLOW },
  { id: 'monserrat', name: 'Monserrat González', role: 'Profe de Inglés', subject: 'Inglés', initials: 'MG', color: YELLOW },
];

export const METRICS = [
  { value: 1000, prefix: '+', suffix: '', label: 'Alumnos desde 2021', color: YELLOW },
  { value: 0, prefix: '$', suffix: '', label: 'Costo matrícula', color: '#FFFFFF' },
  { value: 3, prefix: '', suffix: '', label: 'Idiomas activos', color: YELLOW },
  { value: 100, prefix: '', suffix: '%', label: '100% Online', color: '#FFFFFF' },
];

// Los testimonios viven en data/testimonials.js (los comparte /casos-reales).
import { TESTIMONIALS as ALL_TESTIMONIALS } from './testimonials';
export const TESTIMONIALS = ALL_TESTIMONIALS.filter((t) => t.featured);
