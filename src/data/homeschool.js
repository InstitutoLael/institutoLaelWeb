// src/data/homeschool.js
// === Lael Academy: Hub de Entrenamiento Académico & Homeschool ===

// 🔢 Helper de Moneda
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

// 🧾 Matrícula
// Bajamos a 10.000 para que la barrera de entrada sea casi nula.
export const ENROLLMENT_FEE = 10000; 

// 🤝 ALIANZA ESTRATÉGICA
export const ALLIANCE = {
  name: "Los Olivos Homeschool",
  role: "Colegio Paraguas Partner",
  desc: "Nuestros alumnos pueden validar sus estudios y obtener certificados oficiales Mineduc (Exámenes Libres) gracias a nuestra alianza exclusiva.",
  benefits: ["Certificado Anual", "Tramitación Mineduc", "Pauta de Contenidos"],
};

// 📚 MATERIAS
export const SUBJECTS = [
  { 
    id: 'mat', 
    name: 'Matemáticas', 
    icon: '📐', 
    color: '#06b6d4', // Cyan
    desc: 'Desde aritmética básica hasta Cálculo y PAES M1/M2.' 
  },
  { 
    id: 'len', 
    name: 'Lenguaje', 
    icon: '📚', 
    color: '#f97316', // Orange
    desc: 'Comprensión lectora, redacción y vocabulario crítico.' 
  },
  { 
    id: 'cie', 
    name: 'Ciencias', 
    icon: '🧬', 
    color: '#84cc16', // Lime
    desc: 'Física, Química y Biología con enfoque experimental.' 
  },
  { 
    id: 'his', 
    name: 'Historia', 
    icon: '🏛️', 
    color: '#a855f7', // Purple
    desc: 'Formación ciudadana, Historia de Chile y Universal.' 
  },
  { 
    id: 'ing', 
    name: 'Inglés Escolar', 
    icon: '🇬🇧', 
    color: '#3b82f6', // Blue
    desc: 'Refuerzo del currículum escolar y pronunciación.' 
  },
  { 
    id: 'hab', 
    name: 'Hábito de Estudio',
    icon: '🧠', 
    color: '#ec4899', // Pink
    desc: 'Organización, gestión del tiempo y técnicas de aprendizaje.' 
  },
];

// 🎓 NIVELES
export const LEVELS = [
  { id: 'basica', label: 'Ed. Básica', desc: '1º a 8º Básico' },
  { id: 'media', label: 'Ed. Media', desc: 'Iº a IVº Medio' },
  { id: 'paes', label: 'Prep. PAES', desc: 'Intensivo U' },
  { id: 'adultos', label: 'Adultos', desc: 'Nivelación 2x1' }, 
];

// 📦 PACKS DE HORAS (Precios ajustados estratégicamente)
// Idea: "Más barato que un profe particular promedio, pero con calidad de academia"
export const PACKS = [
  { 
    id: 'p4', 
    hours: 4, 
    title: 'Pack Rescate', 
    subtitle: 'Apoyo puntual',
    // Antes 75.000 -> Ahora 52.000 ($13k/hora)
    price: 52000, 
    badge: null,
    features: [
      "1 hora semanal por ramo",
      "Resolución de dudas puntuales",
      "Grabación de la clase",
      "Acceso a material básico"
    ]
  },
  { 
    id: 'p8', 
    hours: 8, 
    title: 'Pack Pro', 
    subtitle: 'Aprendizaje real',
    // Antes 139.000 -> Ahora 96.000 ($12k/hora)
    // *Rompe la barrera psicológica de los 100mil pesos*
    price: 96000, 
    badge: 'Más Popular',
    features: [
      "2 horas semanales por ramo",
      "Seguimiento de notas",
      "Guías de ejercicios PDF",
      "Reporte de avance mensual"
    ]
  },
  { 
    id: 'p12', 
    hours: 12, 
    title: 'Pack Intensivo', 
    subtitle: 'Dominio total',
    // Antes 199.000 -> Ahora 138.000 ($11.5k/hora)
    // *Mucho valor por hora, ideal para PAES o nivelación crítica*
    price: 138000, 
    badge: 'Mejor Valor',
    features: [
      "3 horas semanales por ramo",
      "Matrícula GRATIS",
      "Simulacros de examen",
      "Contacto directo con profesor"
    ]
  },
];

// 🏫 SERVICIOS COLEGIOS
export const SCHOOL_SERVICES = [
  {
    id: 'ensayos',
    title: 'Corrección Externa PAES',
    desc: 'Nos envías los ensayos, nosotros devolvemos data. Evita la ceguera de taller.',
    icon: '📊',
    priceRef: 'Desde $2.500 por alumno'
  },
  {
    id: 'talleres',
    title: 'Talleres Extra-programáticos',
    desc: 'Robótica, Lengua de Señas o Refuerzo PAES en tu colegio.',
    icon: '🚀',
    priceRef: 'Cotizar por semestre'
  },
  {
    id: 'reemplazo',
    title: 'Banco de Suplentes',
    desc: '¿Profesor con licencia? Enviamos un experto Lael para cubrir la clase online o híbrida.',
    icon: '👨‍🏫',
    priceRef: 'Valor hora colegio'
  }
];