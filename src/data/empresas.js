// src/data/empresas.js

// === Lael Corporate: Soluciones B2B ===
// Estrategia: Market Entry (Precios competitivos para generar tracción rápida)

/**
 * CONTENIDO REAL DE LA PÁGINA /empresas (pages/Empresas/index.jsx)
 * Más simple que el cotizador de abajo, que todavía no está conectado.
 */
export const LANDING_SERVICES = [
  {
    id: 'paes',
    title: 'PAES Institucional',
    desc: 'Preparación PAES para colegios y liceos, con clases en vivo, ensayos y seguimiento del avance de cada curso.',
    tags: ['Resultados de ensayos por curso', 'Docentes por asignatura', 'Reportes por alumno'],
  },
  {
    id: 'idiomas',
    title: 'Idiomas Corporativos',
    desc: 'Clases de inglés, coreano o español para equipos que trabajan con clientes o colegas de otros países.',
    tags: ['Grupos reducidos', 'Horario flexible', 'Certificación institucional'],
  },
  {
    id: 'lsch',
    title: 'Lengua de Señas (LSCh)',
    desc: 'Curso de Lengua de Señas Chilena para equipos que trabajan o atienden a personas Sordas, con contexto de la Ley 21.015.',
    tags: ['Contexto Ley 21.015', 'Instructora Sorda nativa', 'Certificado por nivel'],
  },
];

/**
 * 📊 LÍNEAS DE SERVICIO
 * Configuración centralizada de precios y lógica de cobro.
 * * - type: "hourly" -> Se cobra por hora/persona (Idiomas, Talleres)
 * - type: "flat"   -> Se cobra fijo por mes/persona (Preu, Software)
 */
export const SERVICE_LINES = [
  {
    id: "ingles",
    label: "Inglés Corporativo",
    type: "hourly",
    // Bajamos de 12.000 a 6.500 la hora base para penetración agresiva.
    publicPphOnline: 6500,
    publicPphOnsite: 9500,
    defaultHoursMonth: 8, // 2 veces por semana estándar
    brandColor: "#6366f1", // Indigo
    icon: "🌍",
    desc: "Clases de inglés para equipos de trabajo."
  },
  {
    id: "lsch",
    label: "Lengua de Señas (Ley 21.015)",
    type: "hourly",
    // Precio gancho para cumplimiento normativo rápido.
    publicPphOnline: 7500,
    publicPphOnsite: 10500,
    defaultHoursMonth: 8,
    brandColor: "#14b8a6", // Teal
    icon: "🤟",
    desc: "Señas básicas y cultura Sorda para tu equipo."
  },
  {
    id: "soft",
    label: "Liderazgo & Habilidades",
    type: "hourly",
    // Talleres prácticos de alto valor percibido.
    publicPphOnline: 8000,
    publicPphOnsite: 12000,
    defaultHoursMonth: 4, // 1 taller intensivo al mes
    brandColor: "#f59e0b", // Amber
    icon: "⚡",
    desc: "Talleres de comunicación y trabajo en equipo."
  },
  {
    id: "beneficio-hijos",
    label: "Beneficio Hijos (Preu PAES)",
    type: "flat", // <--- Lógica de cobro mensual fijo
    // ESTO ES ORO: Vender cupos masivos a empresas.
    flatPriceMonth: 35000, // Precio "Mayorista" (En web público vale +80k)
    brandColor: "#ec4899", // Pink
    icon: "🎓",
    desc: "Preu PAES para los hijos de tus colaboradores."
  },
  {
    id: "coaching",
    label: "Coaching Ejecutivo 1:1",
    type: "hourly",
    // Servicio Premium (High Ticket)
    publicPphOnline: 25000,
    publicPphOnsite: 35000,
    defaultHoursMonth: 4, // 1 sesión semanal
    brandColor: "#ef4444", // Red
    icon: "🎯",
    desc: "Sesiones individuales para jefaturas."
  },
];

/**
 * 📦 PACKS "GANCHO" (Low Cost / High Impact)
 * Diseñados para reducir la fricción de entrada.
 */
/**
 * 💰 REGLAS DE DESCUENTO POR VOLUMEN
 */
// --- UTILS ---

// Formateador de moneda CLP
export const clp = (amount) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(amount || 0);



/**
 * 🧮 MOTOR DE CÁLCULO DE PRESUPUESTO
 * Esta función es el cerebro del cotizador.
 */
