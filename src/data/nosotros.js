import { Corazon, Beca, Grupo, Escudo } from '../components/icons/LaelIcons';
import diegoPhoto from "../assets/img/Equipo/diego-chaparro-avatar.jpg";
import martinPhoto from "../assets/img/Equipo/martin-vargas-avatar.jpg";
import catalinaPhoto from "../assets/img/Equipo/catalina-avatar.jpg";
import marjoriePhoto from "../assets/img/Equipo/marjorie-maldonado-avatar.jpg";
import fabianPhoto from "../assets/img/Equipo/fabian-neira-avatar.jpg";
import barbaraPhoto from "../assets/img/Equipo/barbara-contreras-avatar.jpg";

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
    subject: "Matemática M1 + M2",
    bio: "Fundó Lael en 2021 enseñando matemática gratis, convencido de que prepararse bien para la PAES no debería depender de cuánto puede pagar tu familia. Hoy dirige el instituto y sigue haciendo las clases de M1 y M2: explica paso a paso y no avanza si alguien quedó atrás.",
    img: diegoPhoto,
    confirmed: true
  },
  {
    name: "Monserrat González",
    role: "Profesora de Inglés",
    subject: "Inglés Avanzado & Preparación",
    bio: "En sus clases se habla inglés desde el primer día. La gramática la vas aprendiendo mientras conversas.",
    img: null,
    confirmed: true
  },
  {
    name: "Martín Vargas",
    role: "Profe de Ciencias",
    subject: "Biología + Química",
    bio: "Estudió en la Universidad de Talca. \"Cada célula de tu cuerpo está trabajando en equipo para que hoy cumplas tus metas, no les falles.\"",
    img: martinPhoto,
    confirmed: true
  },
  {
    name: "Bárbara Contreras",
    role: "Profe de Ciencias",
    subject: "Biología + Química",
    bio: "Estudiante de tercer año en la Universidad Viña del Mar. \"Me gusta enseñar porque disfruto compartir mis conocimientos y transformar lo complejo en algo fácil de comprender. Me motiva ayudar a los demás a aprender, despertar su curiosidad y demostrar que el conocimiento es aún más valioso cuando se comparte.\"",
    img: barbaraPhoto,
    confirmed: true
  },
  {
    name: "Marjorie Maldonado",
    role: "Profe de Ciencias",
    subject: "Física",
    bio: "Estudiante de Bioquímica. \"Me encanta explicar los fenómenos físicos de una manera agradable, para que entiendas la física no como algo complejo, sino como algo valioso: con paciencia y constancia, descubres las rarezas del universo.\"",
    img: marjoriePhoto,
    confirmed: true
  },
  {
    name: "Catalina",
    role: "Profe de Lenguaje",
    subject: "Competencia Lectora",
    bio: "Estudiante de Pedagogía en Castellano en la Universidad Metropolitana de Ciencias de la Educación (UMCE). \"Creo en enseñar como el camino para formar mejores ciudadanos y una mejor sociedad.\"",
    img: catalinaPhoto,
    confirmed: true
  },
  {
    name: "Fabián Neira",
    role: "Profe de Historia",
    subject: "Historia y Ciencias Sociales",
    bio: "Cientista social. Comparte su pasión por la historia de manera atractiva y clara, y te entrega las herramientas necesarias para rendir al máximo en la PAES.",
    img: fabianPhoto,
    confirmed: true
  }
];

export const CLOSING_QUOTE = {
  text: "\"El Espíritu del Señor está sobre mí, por cuanto me ha ungido para dar buenas nuevas a los pobres; Me ha enviado a sanar a los quebrantados de corazón; A pregonar libertad a los cautivos...\"",
  ref: "Lucas 4:18"
};
