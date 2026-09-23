// src/data/empresas.js
// === Lael Empresas: capacitación para equipos ===
// Todo se cotiza a medida (online o presencial). Lo que pagan las empresas
// ayuda a sostener la nivelación gratuita para adultos.
import { Sparkles, Languages, GraduationCap, BookOpenCheck, HandHeart } from 'lucide-react';

export const EMPRESAS_SERVICES = [
  {
    id: 'ia',
    icon: Sparkles,
    title: 'Talleres de IA para el trabajo',
    desc: 'Tu equipo aprende a usar herramientas de inteligencia artificial en tareas reales: redactar, resumir, ordenar datos, preparar presentaciones y responder clientes.',
    tags: ['Práctico, con casos de tu empresa', 'Desde un taller de 2 horas', 'Online o presencial'],
  },
  {
    id: 'ingles',
    icon: Languages,
    title: 'Inglés para equipos',
    desc: 'Clases en vivo para equipos que atienden clientes, proveedores o colegas de otros países. Por niveles y con foco en conversación.',
    tags: ['Grupos por nivel', 'Horario a convenir', 'Informe de asistencia'],
  },
  {
    id: 'nivelacion',
    icon: BookOpenCheck,
    title: 'Nivelación de estudios para trabajadores',
    desc: 'Preparamos a tus trabajadores para terminar la enseñanza básica o media con los exámenes libres del Mineduc. Un beneficio que cambia vidas.',
    tags: ['Mayores de 18', 'Básica y media', 'Te ayudamos con la inscripción'],
  },
  {
    id: 'hijos',
    icon: GraduationCap,
    title: 'Preu PAES para hijos de trabajadores',
    desc: 'Un beneficio concreto para las familias de tu equipo: preparación PAES en vivo para sus hijos, con precio preferente por convenio.',
    tags: ['Beneficio para las familias', 'Precio por convenio', 'Clases en vivo'],
  },
  {
    id: 'lsch',
    icon: HandHeart,
    title: 'Lengua de Señas Chilena (próximamente)',
    desc: 'Para equipos que trabajan con personas Sordas o las atienden. Lo dictará una persona de la comunidad Sorda.',
    tags: ['Ley 21.015 de inclusión laboral', 'Próximamente'],
    soon: true,
  },
];

export const EMPRESAS_STEPS = [
  { num: '01', title: 'Conversamos', desc: 'Nos cuentas qué necesita tu equipo, cuántas personas son y en qué horario pueden.' },
  { num: '02', title: 'Propuesta a medida', desc: 'Te enviamos una propuesta con contenidos, duración y precio. Sin compromiso.' },
  { num: '03', title: 'Clases', desc: 'Online por Google Meet o presencial en tu empresa. Las clases online quedan grabadas.' },
  { num: '04', title: 'Seguimiento', desc: 'Te enviamos la asistencia y el avance del grupo, para que veas en qué se usó tu inversión.' },
];

// Opciones del formulario de cotización.
export const EMPRESAS_FORM_OPTIONS = [...EMPRESAS_SERVICES.filter((s) => !s.soon).map((s) => s.title), 'Otro'];
