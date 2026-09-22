import { Users, Target, Heart, BookOpen } from 'lucide-react';
import idiomasBg from '../assets/img/Home/mundo_idiomas_bg_1777943491283.png';
import lschBg from '../assets/img/Home/mundo_lsch_bg_1777943626827.png';
import adultosBg from '../assets/img/Home/mundo_adultos_bg_1777944001677.png';

const YELLOW = '#D7E400';

export const OBLIGATORIAS = [
  { code: 'M1', name: 'Matemática M1', doc: 'Diego Chaparro' },
  { code: 'CL', name: 'Competencia Lectora', doc: 'Por confirmar' }
];

export const ELECTIVAS = [
  { code: 'M2', name: 'Matemática M2', doc: 'Diego / Kathy' },
  { code: 'BIO', name: 'Biología', doc: 'Martín' },
  { code: 'QUI', name: 'Química', doc: 'Martín' },
  { code: 'FIS', name: 'Física', doc: 'Por confirmar' },
  { code: 'HIS', name: 'Historia', doc: 'Por confirmar' }
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
  { id: 'cl', name: 'Próximamente', role: 'Profe de Lenguaje', subject: 'Comprensión Lectora', initials: '?', color: '#8D8D8D', placeholder: true },
];

export const WHY_LAEL = [
  { icon: Users, title: 'Acompañamiento real', desc: 'No estudias solo. Profesores que te conocen por tu nombre y se preocupan por tu avance.' },
  { icon: Target, title: 'Ensayos y práctica', desc: 'Preparación constante con simulacros reales para que llegues tranquilo el día de la PAES.' },
  { icon: Heart, title: 'Comunidad', desc: 'Aprende junto a otros estudiantes con el mismo objetivo. Nunca estás solo en el proceso.' },
  { icon: BookOpen, title: 'Formación integral', desc: 'Más que puntajes. Desarrollamos tu potencial como persona, no solo como estudiante.' },
];

export const METRICS = [
  { value: 600, prefix: '+', suffix: '', label: 'Alumnos activos', color: YELLOW },
  { value: 0, prefix: '$', suffix: '', label: 'Costo matrícula', color: '#FFFFFF' },
  { value: 3, prefix: '', suffix: '', label: 'Idiomas activos', color: YELLOW },
  { value: 100, prefix: '', suffix: '%', label: '100% Online', color: '#FFFFFF' },
];

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Daniela R.',
    program: 'Lengua de Señas Chilena',
    quote: 'El curso es excelente. Aprendí cultura sorda con una pedagogía muy paciente y estructurada.',
    rating: 5,
    initials: 'DR',
    real: true,
  },
  {
    id: 't2',
    name: 'Rocío R.',
    program: 'PAES · 2025',
    quote: 'Cambió mi forma de organizarme frente a distintos horarios de clases, ayudándome a adaptarme a cambios que me beneficiarán a futuro, además de traerme aprendizajes que no vi en el colegio.',
    rating: 5,
    initials: 'RR',
    real: true,
  },
];
