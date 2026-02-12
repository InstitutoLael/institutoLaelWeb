// === Lael Academy: Hub de Entrenamiento Académico & Homeschool ===

// 🔢 Helper de Moneda (Local para este archivo)
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

// 🧾 Matrícula & Datos Base
export const ACADEMY_CONFIG = {
  enrollmentFee: 10000, // Barrera de entrada baja
  enrollmentText: "Matrícula Anual",
};

// 🤝 ALIANZA ESTRATÉGICA
export const ALLIANCE = {
  name: "Los Olivos Homeschool",
  role: "Colegio Partner",
  desc: "Nuestros alumnos pueden estudiar sin límites para los Exámenes Libres gracias a nuestra alianza exclusiva.",
  benefits: ["Certificado Anual", "Tramitación Mineduc", "Pauta de Contenidos"],
};

// 📚 MATERIAS DISPONIBLES
export const SUBJECTS = [
  { 
    id: 'mat', name: 'Matemáticas', icon: '📐', color: '#06b6d4', 
    desc: 'Desde aritmética básica hasta Cálculo y PAES M1/M2.' 
  },
  { 
    id: 'len', name: 'Lenguaje', icon: '📚', color: '#f97316', 
    desc: 'Comprensión lectora, redacción y vocabulario crítico.' 
  },
  { 
    id: 'cie', name: 'Ciencias', icon: '🧬', color: '#84cc16', 
    desc: 'Física, Química y Biología con enfoque experimental.' 
  },
  { 
    id: 'his', name: 'Historia', icon: '🏛️', color: '#a855f7', 
    desc: 'Formación ciudadana, Historia de Chile y Universal.' 
  },
  { 
    id: 'ing', name: 'Inglés Escolar', icon: '🇬🇧', color: '#3b82f6', 
    desc: 'Refuerzo del currículum escolar y pronunciación.' 
  },
  { 
    id: 'hab', name: 'Hábito de Estudio', icon: '🧠', color: '#ec4899', 
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

// 📦 PACKS DE HORAS (PRODUCTOS VENDIBLES)
// IMPORTANTE: Asegúrate de que diga "export const PACKS"
export const PACKS = [
  { 
    id: 'academy-p4', 
    hours: 4, 
    title: 'Pack Rescate', 
    subtitle: 'Apoyo puntual para pruebas',
    price: 52000, 
    badge: null,
    features: ["1 hora semanal por ramo", "Resolución de dudas", "Grabación de clase"]
  },
  { 
    id: 'academy-p8', 
    hours: 8, 
    title: 'Pack Pro', 
    subtitle: 'Aprendizaje real y continuo',
    price: 96000, 
    badge: 'Más Popular',
    features: ["2 horas semanales por ramo", "Seguimiento de notas", "Guías PDF"]
  },
  { 
    id: 'academy-p12', 
    hours: 12, 
    title: 'Pack Intensivo', 
    subtitle: 'Dominio total de la materia',
    price: 138000, 
    badge: 'Mejor Valor',
    features: ["3 horas semanales por ramo", "Matrícula GRATIS", "Simulacros examen"]
  },
];

// 🏫 SERVICIOS COLEGIOS (B2B)
export const SCHOOL_SERVICES = [
  {
    id: 'ensayos', title: 'Corrección Externa PAES',
    desc: 'Nos envías los ensayos, nosotros devolvemos data.', icon: '📊', priceRef: 'Desde $2.500/alumno'
  },
  {
    id: 'talleres', title: 'Talleres Extra-programáticos',
    desc: 'Robótica, Lengua de Señas o Refuerzo.', icon: '🚀', priceRef: 'Cotizar'
  },
  {
    id: 'reemplazo', title: 'Banco de Suplentes',
    desc: 'Profesores expertos Lael para cubrir licencias.', icon: '👨‍🏫', priceRef: 'Valor hora'
  }
];

// ❓ PREGUNTAS FRECUENTES
export const HOMESCHOOL_FAQS = [
  { q: "¿Son clases todos los días?", a: "Depende del plan. El Plan Full tiene clases diarias de lunes a viernes. Los planes parciales se ajustan a tu horario y necesidades." },
  { q: "¿Cómo valido los estudios ante el Mineduc?", a: "Nosotros te asesoramos en todo el proceso de Exámenes Libres. Además, gracias a nuestra alianza con Colegio Los Olivos, puedes optar a certificación directa (cupos limitados)." },
  { q: "¿Es educación religiosa?", a: "Somos una institución con principios cristianos. No somos una iglesia, pero nuestros valores bíblicos transversales (integridad, excelencia, servicio) permean toda nuestra enseñanza." },
  { q: "¿Qué tecnología necesito?", a: "Solo un computador o tablet con conexión estable a internet, cámara y micrófono. Usamos Zoom y nuestra Aula Virtual propia." },
  { q: "¿Aceptan postulaciones a mitad de año?", a: "Sí, tenemos matrícula abierta todo el año sujetos a cupo. Hacemos un diagnóstico inicial para nivelar al estudiante." }
];