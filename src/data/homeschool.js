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
// ESTRATEGIA: Matrícula baja para validar compromiso, gratis en packs grandes.
export const ENROLLMENT_FEE = 15000; 

// 🤝 ALIANZA ESTRATÉGICA (El gran diferenciador)
export const ALLIANCE = {
  name: "Los Olivos Homeschool",
  role: "Colegio Paraguas Partner",
  desc: "Nuestros alumnos pueden validar sus estudios y obtener certificados oficiales Mineduc (Exámenes Libres) gracias a nuestra alianza exclusiva.",
  benefits: ["Certificado Anual", "Tramitación Mineduc", "Pauta de Contenidos"],
};

// 📚 MATERIAS (Expandidas con Enfoque de Habilidades)
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
    name: 'Hábito de Estudio', // NUEVO: Muy demandado por padres
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
  { id: 'adultos', label: 'Adultos', desc: 'Nivelación 2x1' }, // Coherencia con tu otro programa
];

// 📦 PACKS DE HORAS (B2C - Estrategia de Precio Volumen)
// Precios ajustados para ser competitivos ($16k - $18k hora)
export const PACKS = [
  { 
    id: 'p4', 
    hours: 4, 
    title: 'Pack Rescate', 
    subtitle: 'Para salvar la prueba',
    price: 75000, // $18.750/hr
    badge: null,
    features: [
      "1 hora semanal",
      "Resolución de dudas puntuales",
      "Grabación de la clase"
    ]
  },
  { 
    id: 'p8', 
    hours: 8, 
    title: 'Pack Hábito', 
    subtitle: 'Constancia y mejora real',
    price: 139000, // ~$17.300/hr (Precio psicológico atractivo)
    badge: 'Más Popular',
    features: [
      "2 horas semanales",
      "Reporte mensual a apoderados",
      "Material de ejercitación PDF"
    ]
  },
  { 
    id: 'p12', 
    hours: 12, 
    title: 'Pack Excelencia', 
    subtitle: 'Transformación académica',
    price: 199000, // ~$16.500/hr (Gran oferta por volumen)
    badge: 'Mejor Valor',
    features: [
      "3 horas semanales",
      "Matrícula BONIFICADA (Gratis)",
      "Contacto directo con profesor",
      "Simulacros de examen"
    ]
  },
];

// 🏫 SERVICIOS COLEGIOS (B2B - Con precios referencia "Desde")
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