import idiomasBg from '../assets/img/Home/mundo_idiomas_bg_1777943491283.webp';
import lschBg from '../assets/img/Home/mundo_lsch_bg_1777943626827.webp';
import diegoPhoto from '../assets/img/Equipo/diego-chaparro-avatar.jpg';
import martinPhoto from '../assets/img/Equipo/martin-vargas-avatar.jpg';
import catalinaPhoto from '../assets/img/Equipo/catalina-avatar.jpg';
import marjoriePhoto from '../assets/img/Equipo/marjorie-maldonado-avatar.jpg';
import barbaraPhoto from '../assets/img/Equipo/barbara-contreras-avatar.jpg';
import adultosBg from '../assets/img/Home/mundo_adultos_bg_1777944001677.webp';

const YELLOW = '#D7E400';

export const OBLIGATORIAS = [
  { code: 'M1', name: 'Matemática M1', doc: 'Diego Chaparro' },
  { code: 'CL', name: 'Competencia Lectora', doc: 'Catalina' }
];

export const ELECTIVAS = [
  { code: 'M2', name: 'Matemática M2', doc: 'Diego Chaparro' },
  { code: 'BIO', name: 'Biología', doc: 'Martín / Bárbara' },
  { code: 'QUI', name: 'Química', doc: 'Martín / Bárbara' },
  { code: 'FIS', name: 'Física', doc: 'Marjorie Maldonado' },
  { code: 'HIS', name: 'Historia', doc: null }
];

export const WORLDS = [
  { id: 'ingles', label: 'INGLÉS', title: 'Habla inglés', accent: 'sin miedo.', desc: 'Clases en vivo por Google Meet para perderle el miedo a hablar. Plan Trimestral: $16.990/mes.', bg: idiomasBg, cta: 'Ver programa', route: '/idiomas', active: true, price: '$19.990/mes' },
  { id: 'lsch', label: 'LSCh', title: 'Las manos también', accent: 'tienen voz.', desc: 'Lengua de Señas Chilena con una persona de la comunidad Sorda. Estamos preparando el curso.', bg: lschBg, cta: 'Próximamente', route: '/lsch', active: false, price: null },
  { id: 'coreano', label: 'COREANO', title: 'Prepárate para', accent: 'el TOPIK.', desc: 'Clases en vivo con docente nativa. Estamos armando la planificación completa antes de abrir cupos.', bg: idiomasBg, cta: 'Próximamente', route: '/coreano', active: false, price: null },
  { id: 'adultos', label: 'ESCUELA DE SUEÑOS', title: 'Termina', accent: 'el colegio.', desc: 'Termina la básica o la media con los exámenes libres. Para mayores de 18, online y con clases de noche.', bg: adultosBg, cta: 'Ver programa', route: '/adultos', active: true, price: 'Gratis' },
];

export const TEACHERS = [
  { id: 'diego', photo: diegoPhoto, name: 'Diego Chaparro', role: 'Fundador & Profe', subject: 'Matemática M1 + M2', initials: 'DC', color: YELLOW },
  { id: 'martin', photo: martinPhoto, name: 'Martín Vargas', role: 'Profe de Ciencias', subject: 'Biología + Química', initials: 'MA', color: YELLOW },
  { id: 'barbara', photo: barbaraPhoto, name: 'Bárbara Contreras', role: 'Profe de Ciencias', subject: 'Biología + Química', initials: 'BC', color: YELLOW },
  { id: 'marjorie', photo: marjoriePhoto, name: 'Marjorie Maldonado', role: 'Profe de Ciencias', subject: 'Física', initials: 'MM', color: YELLOW },
  { id: 'catalina', photo: catalinaPhoto, name: 'Catalina', role: 'Profe de Lenguaje', subject: 'Competencia Lectora', initials: 'CA', color: YELLOW },
  { id: 'monserrat', name: 'Monserrat González', role: 'Profe de Inglés', subject: 'Inglés', initials: 'MG', color: YELLOW },
];

export const METRICS = [
  { value: 1000, prefix: '+', suffix: '', label: 'Alumnos desde 2021', color: YELLOW },
  { value: 0, prefix: '$', suffix: '', label: 'Costo matrícula', color: '#FFFFFF' },
  { value: 7, prefix: '', suffix: '', label: 'Ramos PAES', color: YELLOW },
  { value: 100, prefix: '', suffix: '%', label: 'Online por Google Meet', color: '#FFFFFF' },
];

// Los testimonios viven en data/testimonials.js (los comparte /casos-reales).
import { TESTIMONIALS as ALL_TESTIMONIALS } from './testimonials';
export const TESTIMONIALS = ALL_TESTIMONIALS.filter((t) => t.featured);
