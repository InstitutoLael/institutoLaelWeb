// src/data/alumnos.js
// === Alumnos Lael: centro de ayuda para alumnos actuales · página /alumnos ===
// Mantenerlo genérico: no poner horarios ni links de clases aquí (cada curso
// los recibe por Classroom / WhatsApp).
import { ClaseEnVivo, Grabacion, Ensayo, Recuperativa, Pago, Beca, Amigo, Documento } from '../components/icons/LaelIcons';
import { BECAS_FORM_URL } from './paes';

export const ALUMNOS_HERO = {
  eyebrow: 'Alumnos Lael',
  title: 'Todo lo de tus clases,',
  accent: 'en un solo lugar.',
  desc: 'Cómo funcionan las clases, dónde están las grabaciones, cómo pagar y a quién escribirle si algo no anda.',
};

// Tarjetas del centro de ayuda. `link` es opcional; `soon` marca lo que aún no está listo.
export const ALUMNOS_CARDS = [
  {
    icon: ClaseEnVivo,
    title: 'Clases',
    desc: 'Las clases son en vivo por Google Meet. En Google Classroom encuentras el material de tu curso y los avisos de tus profes.',
  },
  {
    icon: Grabacion,
    title: 'Grabaciones',
    desc: 'Cada semana compartimos las grabaciones por Classroom, para quienes tienen su mensualidad al día.',
  },
  {
    icon: Ensayo,
    title: 'Ensayos',
    desc: 'Una vez al mes hay ensayo, con el tiempo de la prueba real. Te avisamos la fecha por Classroom y WhatsApp.',
  },
  {
    icon: Recuperativa,
    title: 'Clases recuperativas',
    desc: 'Dejamos un día de la semana libre. Si una clase no se pudo hacer, la recuperamos ese día.',
  },
  {
    icon: Pago,
    title: 'Cómo pagar',
    desc: 'Puedes pagar con Mercado Pago o por transferencia. Te enviamos los datos por WhatsApp o correo. Dudas de pagos: pagos@institutolael.cl.',
    link: { href: 'mailto:pagos@institutolael.cl', label: 'Escribir a pagos' },
  },
  {
    icon: Beca,
    title: 'Becas',
    desc: 'Si se te complica pagar, puedes postular a una beca parcial. La revisamos caso a caso.',
    link: { href: BECAS_FORM_URL, label: 'Postular a beca' },
  },
  {
    icon: Amigo,
    title: 'Trae un amigo',
    desc: '20% de descuento en tu siguiente mensualidad por cada amigo que se inscribe y paga su primer mes.',
    link: { href: '/trae-un-amigo', label: 'Ver cómo funciona' },
  },
  {
    icon: Documento,
    title: 'Reglamento',
    desc: 'Estamos terminando el reglamento de alumnos. Lo publicaremos aquí.',
    soon: true,
  },
];

export const ALUMNOS_CONTACTO = [
  { label: 'WhatsApp', value: '+56 9 6462 6568', href: 'https://wa.me/56964626568?text=Hola,%20soy%20alumno%20de%20Lael%20y%20tengo%20una%20consulta' },
  { label: 'Clases y horarios', value: 'coordinacion@institutolael.cl', href: 'mailto:coordinacion@institutolael.cl' },
  { label: 'Pagos', value: 'pagos@institutolael.cl', href: 'mailto:pagos@institutolael.cl' },
  { label: 'Otras consultas', value: 'contacto@institutolael.cl', href: 'mailto:contacto@institutolael.cl' },
];
