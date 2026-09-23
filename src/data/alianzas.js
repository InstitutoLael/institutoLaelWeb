// src/data/alianzas.js
// === Alianzas / Sé parte · página /alianzas ===
// No mostrar el logo del DEMRE ni sugerir una alianza con el DEMRE: solo se
// puede decir que seguimos sus temarios oficiales.
import { Escuela, Iglesia, Empresa, Megafono } from '../components/icons/LaelIcons';
import inoLogo from '../assets/img/Partners/INO.webp';
import olivosLogo from '../assets/img/Partners/LosOlivos.webp';
import mercadoPagoLogo from '../assets/img/Partners/MercadoPago.webp';

export const ALIANZAS_EMAIL = 'coordinacion@institutolael.cl';
export const ALIANZAS_WHATSAPP_TEXT = 'Hola, quiero conversar sobre una alianza con Instituto Lael';

export const ALIANZAS_HERO = {
  eyebrow: 'Alianzas · Sé parte de Lael',
  title: 'Más personas estudiando.',
  accent: 'Hagámoslo juntos.',
  desc: 'Trabajamos con colegios, iglesias, comunidades, empresas y creadores que quieren abrir oportunidades de estudio. Si tu organización quiere sumarse, conversemos.',
  stats: [['2021', 'Desde'], ['+1000', 'Estudiantes'], ['Online', 'Todo Chile']],
};

// Qué ofrecemos a cada tipo de aliado
export const ALIANZAS_TIPOS = [
  {
    id: 'colegios',
    icon: Escuela,
    title: 'Colegios',
    desc: 'Para que tus estudiantes lleguen mejor preparados a la PAES y a la educación media.',
    items: [
      'Charla PAES gratis para 3° y 4° medio, y para apoderados',
      'Descuento para tus alumnos en el preu PAES',
      'Ensayo PAES gratis en tu colegio',
      'Reforzamiento de 7° básico a 2° medio',
    ],
  },
  {
    id: 'iglesias',
    icon: Iglesia,
    title: 'Iglesias y comunidades',
    desc: 'Para que los jóvenes y adultos de tu comunidad tengan dónde estudiar, aunque el dinero no alcance.',
    items: [
      'Becas para jóvenes de la comunidad',
      'Charlas para jóvenes y familias',
      'Escuela de Sueños: nivelación gratis para adultos que quieren terminar el colegio',
    ],
  },
  {
    id: 'empresas',
    icon: Empresa,
    title: 'Empresas',
    desc: 'Capacitación para tus equipos en IA e inglés, nivelación de estudios para trabajadores y preu para sus hijos.',
    items: [
      'Programas a medida, online o presencial',
      'Beneficio educativo para las familias de tu equipo',
    ],
    link: { to: '/empresas', label: 'Ver Lael Empresas' },
  },
  {
    id: 'partners',
    icon: Megafono,
    title: 'Sé partner',
    desc: 'Para cuentas, creadores y organizaciones que quieren colaborar con nosotros.',
    items: [
      'Contenido educativo en conjunto',
      'Difusión de becas, ensayos y charlas gratis',
      'Beneficios para tu comunidad o tus seguidores',
    ],
  },
];

// Convenios vigentes. Si se suma uno nuevo, agregarlo aquí con su logo en WebP.
export const ALIANZAS_CONVENIOS = [
  {
    name: 'INO · Instituto Nacional de Ortodoncia',
    logo: inoLogo,
    desc: 'Descuento en ortodoncia para estudiantes de Lael.',
  },
  {
    name: 'Colegio Los Olivos HomeSchool',
    logo: olivosLogo,
    desc: 'Trabajamos en alianza para acompañar a sus estudiantes.',
  },
];

export const ALIANZAS_PAGOS = {
  logo: mercadoPagoLogo,
  text: 'Los pagos de nuestros programas se pueden hacer con Mercado Pago.',
};

export const ALIANZAS_POR_QUE = [
  { title: 'Clases en vivo', desc: 'Por Google Meet, con profes que conocen a sus alumnos por nombre. Las grabaciones se comparten cada semana.' },
  { title: 'Temarios oficiales', desc: 'Nuestras clases de PAES siguen los temarios oficiales que publica el DEMRE.' },
  { title: 'Nadie se queda afuera', desc: 'Matrícula gratis, becas parciales y nivelación gratuita para adultos. Creemos en Cristo y en que nadie debería dejar de estudiar por falta de plata.' },
];

export const ALIANZAS_FORM_TIPOS = ['Colegio', 'Iglesia o comunidad', 'Empresa', 'Creador o partner', 'Otro'];
