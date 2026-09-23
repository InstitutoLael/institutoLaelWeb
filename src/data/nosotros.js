import { Corazon, Beca, Grupo, Escudo } from '../components/icons/LaelIcons';
import diegoPhoto from "../assets/img/Equipo/diego-chaparro-avatar.webp";

export const HERO = {
  eyebrow: "FUNDADO EN SANTIAGO DE CHILE · 2021",
  title: "Nacimos para los",
  accent: "que el sistema ignoró.",
  description: "En 2021 empezamos con un computador y una idea simple: una buena educación no debería ser solo para quien puede pagarla.",
  founderQuote: {
    line1: "El instituto no es mío.",
    line2: "Es de Dios."
  }
};

export const HISTORY = {
  title: "Cómo",
  accent: "empezó todo.",
  paragraphs: [
    {
      strong: "Lael nació en 2021 con una pizarra y un computador.",
      rest: " Diego empezó enseñando matemáticas gratis, sin oficina ni capital, convencido de que prepararse bien para la PAES no debería depender de cuánto puede pagar tu familia."
    },
    {
      strong: null,
      rest: "En pocos meses, ese taller llegó a tener 600 alumnos conectados a la vez desde distintas partes de Chile."
    },
    {
      strong: null,
      rest: "Después sumamos Inglés, Coreano y Lengua de Señas Chilena. La regla siguió siendo la misma: si alguien quiere aprender y se compromete, buscamos la forma de que pueda."
    }
  ],
  closingQuote: "Desde 2021 han pasado más de 1000 alumnos por Lael. En marzo de 2027 empieza una nueva temporada, con el mismo propósito: ayudar a quienes lo necesitan."
};

export const PILLARS = [
  { icon: Corazon, title: "FE ACTIVA", desc: "Creemos en Cristo y eso se nota en lo cotidiano: en cómo tratamos a cada alumno y en una palabra de aliento al final de la clase." },
  { icon: Beca, title: "ACCESIBLE", desc: "La matrícula es gratis y hay becas para quien lo necesite. Que el dinero no sea lo que te deja afuera." },
  { icon: Grupo, title: "INCLUSIÓN", desc: "Adultos que vuelven a estudiar, alumnos de educación diferencial, gente que quiere aprender señas. Aquí hay espacio para todos." },
  { icon: Escudo, title: "BIEN HECHO", desc: "Que sea barato no significa que lo hagamos a la rápida. Las clases se preparan con tiempo y cada profe está pendiente de cómo vas." }
];

export const TIMELINE = [
  { year: "2021", title: "El inicio", desc: "Nace como preuniversitario PAES gratuito. Diego lo arma desde cero." },
  { year: "2022", title: "600 alumnos", desc: "Llegamos a 600 alumnos a la vez y sumamos Inglés y Coreano." },
  { year: "2023-25", title: "Inclusión", desc: "Incorporamos Lengua de Señas Chilena y cultura Sorda." },
  { year: "2027", title: "Nueva temporada", desc: "Más de 1000 alumnos después, volvemos en marzo con más ramos y mejor organizados." }
];

export const TEAM = [
  {
    name: "Diego Chaparro",
    role: "Fundador & Director",
    subject: "Matemáticas (Colegio & Preu)",
    bio: "Fundó Lael en 2021 y hace las clases de matemática. Es exigente, pero si alguien se queda atrás, para y lo vuelve a explicar.",
    img: diegoPhoto,
    confirmed: true
  },
  {
    name: "Monserrat González",
    role: "Profesora de Inglés",
    subject: "Inglés Avanzado & Preparación",
    bio: "En sus clases se habla inglés desde el primer día. La gramática la vas aprendiendo mientras conversas.",
    img: "https://ui-avatars.com/api/?name=Monserrat+Gonzalez&background=071D49&color=D7E400&size=200&bold=true",
    confirmed: true
  },
  {
    name: "Martín",
    role: "Profe de Ciencias",
    subject: "Biología + Química",
    bio: "Hace biología y química. Explica directo y con calma, para que entiendas la materia en vez de aprenderla de memoria.",
    img: "https://ui-avatars.com/api/?name=Martin+Ciencias&background=071D49&color=D7E400&size=200&bold=true",
    confirmed: true
  },
  {
    name: "Kathy",
    role: "Profe de HomeSchool",
    subject: "Matemática M2 & HomeSchool",
    bio: "Hace M2 y trabaja con alumnos de HomeSchool. Antes de pasar a la fórmula, se asegura de que entiendas de dónde sale.",
    img: "https://ui-avatars.com/api/?name=Kathy+M2&background=071D49&color=D7E400&size=200&bold=true",
    confirmed: true
  },
  {
    name: "Próximamente CL",
    role: "Profe de Lenguaje",
    subject: "Competencia Lectora",
    bio: "Estamos buscando profe de Competencia Lectora. Apenas esté confirmado, lo presentamos acá.",
    img: "https://ui-avatars.com/api/?name=Proximamente+CL&background=F4F4F4&color=8D8D8D&size=200&bold=true",
    confirmed: false
  },
  {
    name: "Próximamente Electivos",
    role: "Profe de Ciencias / Historia",
    subject: "Física + Historia",
    bio: "Estamos buscando profes para Física e Historia. Apenas estén confirmados, los presentamos acá.",
    img: "https://ui-avatars.com/api/?name=Proximamente+Electivos&background=F4F4F4&color=8D8D8D&size=200&bold=true",
    confirmed: false
  }
];

export const CLOSING_QUOTE = {
  text: "\"El Espíritu del Señor está sobre mí, por cuanto me ha ungido para dar buenas nuevas a los pobres; Me ha enviado a sanar a los quebrantados de corazón; A pregonar libertad a los cautivos...\"",
  ref: "Lucas 4:18"
};
