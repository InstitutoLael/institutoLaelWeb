// src/data/teachers.js

export const teachers = [
  // === REALES / CONFIRMADOS ===
  {
    id: "diego",
    name: "Diego Chaparro",
    role: "Director & Profe de Matemáticas",
    subject: "PAES M1/M2 · Estrategia",
    bio: "Fundador de Instituto Lael. El profesor de matemáticas más buscado por colegios y estudiantes de preuniversitario gracias a su claridad y efectividad. Comenzó enseñando con una pizarra y hoy lidera la visión educativa de la institución.",
    accent: "#F59E0B", // Gold
    img: "https://ui-avatars.com/api/?name=Diego+Chaparro&background=F59E0B&color=fff&size=200&bold=true",
    tags: ["Matemáticas", "Estrategia PAES", "Sought-after"],
    social: { linkedin: "#", instagram: "#" },
    featured: true
  },
  {
    id: "monserrat",
    name: "Monserrat González",
    role: "Profesora de Inglés",
    subject: "Inglés Avanzado & Preparación",
    bio: "Docente de inglés altamente calificada. Especialista en inmersión práctica, fonética y comunicación activa para un dominio fluido desde el primer día.",
    accent: "#10B981", // Emerald
    img: "https://ui-avatars.com/api/?name=Monserrat+Gonzalez&background=10B981&color=fff&size=200&bold=true",
    tags: ["Inglés", "Inmersión", "Fluidez"],
    featured: true
  },
  {
    id: "martin",
    name: "Martín",
    role: "Profe de Ciencias",
    subject: "Biología · Química · PAES",
    bio: "Docente de ciencias altamente solicitado por su metodología didáctica, dinámica y cercana. Transforma la Biología y la Química en experiencias de aprendizaje sumamente sencillas y apasionantes.",
    accent: "#3B82F6", // Blue
    img: "https://ui-avatars.com/api/?name=Martin+Ciencias&background=3B82F6&color=fff&size=200&bold=true",
    tags: ["Biología", "Química", "Ciencia"],
    featured: true
  },

  // === Placeholder / Staff Ejemplos (Desde PAES.jsx) ===
  // Estos se usan para llenar la UI mientras se confirma el equipo completo
  {
    id: "javiera",
    name: "Javiera Paz",
    role: "Docente Lenguaje",
    subject: "Comprensión Lectora",
    title: "Magíster en Literatura",
    uni: "U. de Chile",
    area: "Lenguaje",
    img: "https://ui-avatars.com/api/?name=Javiera+Paz&background=F43F5E&color=fff&size=200&bold=true",
    bio: "Experta en letras y comprensión lectora. Te enseñará a leer entre líneas.",
    accent: "#F43F5E",
    tags: ["Lenguaje", "Literatura"],
    placeholder: true
  },
  {
    id: "carlos",
    name: "Carlos Soto",
    role: "Docente Matemáticas",
    subject: "Matemática Avanzada",
    title: "Ingeniero Civil",
    uni: "PUC",
    area: "Matemática",
    img: "https://ui-avatars.com/api/?name=Carlos+Soto&background=3B82F6&color=fff&size=200&bold=true",
    bio: "Ingeniero Civil con pasión por la docencia. Hace fácil lo difícil.",
    accent: "#3B82F6",
    tags: ["Ingeniería", "Matemática"],
    placeholder: true
  },
  {
    id: "ana",
    name: "Ana María",
    role: "Docente Ciencias",
    subject: "Biología Celular",
    title: "Dra. en Ciencias",
    uni: "U. de Concepción",
    area: "Biología",
    img: "https://ui-avatars.com/api/?name=Ana+Maria&background=10B981&color=fff&size=200&bold=true",
    bio: "Doctora en Ciencias que ama enseñar desde la evidencia y el asombro.",
    accent: "#10B981",
    tags: ["Ciencia", "Investigación"],
    placeholder: true
  },
];