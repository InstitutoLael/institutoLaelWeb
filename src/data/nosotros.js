import { Heart, Star, Users, Shield } from "lucide-react";

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
  closingQuote: "Desde 2021 han pasado más de 1000 alumnos por Lael. En 2026 decidimos parar, ordenar la casa y empezar de nuevo. No es el fin del camino: el propósito sigue vigente."
};

export const PILLARS = [
  { icon: Heart, title: "FE ACTIVA", desc: "Una mirada centrada en Cristo, sin clichés. Se nota en los detalles: en cómo tratamos a cada alumno y en una palabra de aliento al final de la clase." },
  { icon: Star, title: "ACCESIBLE", desc: "La matrícula es gratis y hay becas para quien lo necesite. Que el dinero no sea lo que te deja afuera." },
  { icon: Users, title: "INCLUSIÓN REAL", desc: "Lengua de Señas, educación diferencial, adultos que vuelven a estudiar: aquí todos tienen un lugar." },
  { icon: Shield, title: "BIEN HECHO", desc: "Ser accesible no es excusa para hacer las cosas a medias. Cada clase se prepara y cada profe se hace cargo de tu avance." }
];

export const TIMELINE = [
  { year: "2021", title: "El inicio", desc: "Nace como preuniversitario PAES gratuito. Diego lo arma desde cero." },
  { year: "2022", title: "600 alumnos", desc: "Llegamos a 600 alumnos a la vez y sumamos Inglés y Coreano." },
  { year: "2023-25", title: "Inclusión", desc: "Incorporamos Lengua de Señas Chilena y cultura Sorda." },
  { year: "2026", title: "Nuevo comienzo", desc: "Más de 1000 alumnos después, paramos, ordenamos y volvemos con más orden y el mismo propósito." }
];

export const TEAM = [
  {
    name: "Diego Chaparro",
    role: "Fundador & Director",
    subject: "Matemáticas (Colegio & Preu)",
    bio: "Fundador de Instituto Lael. Enseña matemáticas con la misma exigencia con la que dirige el instituto: sin atajos, pero sin dejar a nadie atrás.",
    img: "https://ui-avatars.com/api/?name=Diego+Chaparro&background=071D49&color=D7E400&size=200&bold=true",
    confirmed: true
  },
  {
    name: "Monserrat González",
    role: "Profesora de Inglés",
    subject: "Inglés Avanzado & Preparación",
    bio: "Enseña inglés desde la práctica real, no desde la gramática memorizada. Conversación desde la primera clase, no desde el mes tres.",
    img: "https://ui-avatars.com/api/?name=Monserrat+Gonzalez&background=071D49&color=D7E400&size=200&bold=true",
    confirmed: true
  },
  {
    name: "Martín",
    role: "Profe de Ciencias",
    subject: "Biología + Química",
    bio: "Convierte biología y química en algo que se entiende, no que se memoriza. Cercano y directo, sin vueltas.",
    img: "https://ui-avatars.com/api/?name=Martin+Ciencias&background=071D49&color=D7E400&size=200&bold=true",
    confirmed: true
  },
  {
    name: "Kathy",
    role: "Profe de HomeSchool",
    subject: "Matemática M2 & HomeSchool",
    bio: "Matemática superior y HomeSchool. Le importa que entiendas el porqué, no solo el cómo.",
    img: "https://ui-avatars.com/api/?name=Kathy+M2&background=071D49&color=D7E400&size=200&bold=true",
    confirmed: true
  },
  {
    name: "Próximamente CL",
    role: "Profe de Lenguaje",
    subject: "Competencia Lectora",
    bio: "Estamos seleccionando al docente especialista con la mayor trayectoria en comprensión de lectura crítica y descarte rápido.",
    img: "https://ui-avatars.com/api/?name=Proximamente+CL&background=F4F4F4&color=8D8D8D&size=200&bold=true",
    confirmed: false
  },
  {
    name: "Próximamente Electivos",
    role: "Profe de Ciencias / Historia",
    subject: "Física + Historia",
    bio: "Sumaremos nuevos docentes especialistas dedicados a preparar las electivas de física e historia con alto rendimiento.",
    img: "https://ui-avatars.com/api/?name=Proximamente+Electivos&background=F4F4F4&color=8D8D8D&size=200&bold=true",
    confirmed: false
  }
];

export const CLOSING_QUOTE = {
  text: "\"El Espíritu del Señor está sobre mí, por cuanto me ha ungido para dar buenas nuevas a los pobres; Me ha enviado a sanar a los quebrantados de corazón; A pregonar libertad a los cautivos...\"",
  ref: "Lucas 4:18"
};
