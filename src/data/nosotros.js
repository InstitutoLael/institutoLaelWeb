import { Heart, Star, Users, Shield } from "lucide-react";

export const HERO = {
  eyebrow: "FUNDADO EN SANTIAGO DE CHILE · 2021",
  title: "Nacimos para los",
  accent: "que el sistema ignoró.",
  description: "En 2021 comenzamos con un computador y una convicción radical: la excelencia académica es un derecho fundamental, no un privilegio del mercado.",
  founderQuote: {
    line1: "El instituto no es mío.",
    line2: "Es de Dios."
  }
};

export const HISTORY = {
  title: "La realidad",
  accent: "detrás del código.",
  paragraphs: [
    {
      strong: "Lael nació como un acto de rebeldía educativa.",
      rest: " Diego comenzó enseñando matemáticas desde cero en 2021, sin oficina ni capital, solo con la certeza de que el talento no tiene código postal."
    },
    {
      strong: null,
      rest: "En pocos meses, lo que empezó como un taller se convirtió en un ecosistema de 600 alumnos simultáneos conectados desde todo Chile. No escalamos por marketing, escalamos por resultados que el sistema tradicional no podía explicar."
    },
    {
      strong: null,
      rest: "Luego crecimos. Sumamos programas de Inglés, Coreano y LSCh. Construimos un sistema de alto rendimiento que no filtraba por billetera, sino por compromiso innegociable."
    }
  ],
  closingQuote: "En 2026 tomamos la decisión más honesta: parar, reestructurar y volver mejor. Este sitio es el resultado de esa pausa sagrada."
};

export const PILLARS = [
  { icon: Heart, title: "FE ACTIVA", desc: "La fe es nuestro fundamento, no nuestra etiqueta. Se nota en cómo tratamos a cada alumno, no en cuántos versículos publicamos." },
  { icon: Star, title: "ACCESIBILIDAD RADICAL", desc: "La matrícula es gratis y hay becas para quien lo necesite. La barrera para aprender en Lael es cero. Sin excusas." },
  { icon: Users, title: "INCLUSIÓN REAL", desc: "LSCh, educación diferencial, adultos: todos tienen un lugar como estructura, no como estrategia de marketing." },
  { icon: Shield, title: "EXCELENCIA SIN EXCUSA", desc: "Ser accesible no justifica ser mediocre. Cada clase preparada. Cada profesor comprometido con tu resultado final." }
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
