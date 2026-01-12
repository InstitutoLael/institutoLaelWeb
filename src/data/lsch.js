// src/data/empresas.js
// === Lael Corporate: Soluciones B2B ===

/* ──────────────────────────────────────────────────────────────────────────
   1. CONFIGURACIÓN Y FORMATO
   ────────────────────────────────────────────────────────────────────────── */
export const WAPP_INTL = "56964626568"; // Tu número para cerrar ventas

// 🔢 Helper de Moneda
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

/* ──────────────────────────────────────────────────────────────────────────
   2. LÍNEAS DE SERVICIO (CATÁLOGO)
   ────────────────────────────────────────────────────────────────────────── */
export const SERVICE_LINES = [
  {
    id: "ingles",
    label: "Inglés de Negocios",
    // Precio por hora/persona. 
    // Si son 10 personas a $6.000 c/u = $60.000 la hora ingreso. 
    // Pagas $25.000 al profe y te quedan $35.000. Negocio redondo.
    pricePerHourOnline: 6000, 
    pricePerHourOnsite: 9000,
    hoursPerMonth: 8, // 2 veces por semana
    minPeople: 3,
    icon: "🌍",
    desc: "Equipos que hablan, venden y negocian en inglés."
  },
  {
    id: "lsch",
    label: "Lengua de Señas (Ley 21.015)",
    // Un poco más caro por ser especialidad
    pricePerHourOnline: 7000,
    pricePerHourOnsite: 10000,
    hoursPerMonth: 4, // 1 vez por semana (Taller)
    minPeople: 5,
    icon: "🤟",
    desc: "Cumplimiento normativo y cultura inclusiva real."
  },
  {
    id: "coaching",
    label: "Coaching Ejecutivo 1 a 1",
    // Producto Premium (High Ticket)
    pricePerHourOnline: 35000,
    pricePerHourOnsite: 45000,
    hoursPerMonth: 4,
    minPeople: 1,
    icon: "🎯",
    desc: "Liderazgo y oratoria para Gerentes y Jefaturas."
  },
  {
    id: "preu",
    label: "Beneficio Hijos (Preu PAES)",
    // Tarifa plana mensual por alumno (Muy barata para volumen)
    priceFixedMonthly: 35000, 
    hoursPerMonth: 0, // No aplica cálculo por hora
    minPeople: 5,
    icon: "🎓",
    desc: "El beneficio más valorado por los colaboradores padres."
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   3. PACKS DE MARKETING (Ganchos Visuales)
   ────────────────────────────────────────────────────────────────────────── */
export const EMP_PACKS = [
  {
    id: "meeting-ready",
    title: "Pack 'Meeting Ready'",
    lineId: "ingles",
    subtitle: "Taller intensivo de 1 mes para perder el miedo a hablar.",
    features: ["Vocabulario de Reuniones", "Roleplay de Negociación", "Corrección de acento"],
    priceDisplay: "Desde $180.000 / equipo"
  },
  {
    id: "law-21015",
    title: "Charla Ley Inclusión",
    lineId: "lsch",
    subtitle: "Sensibilización rápida para cumplir la normativa.",
    features: ["Contexto Legal", "Mitos de la Sordera", "Señas de Cortesía"],
    priceDisplay: "Valor fijo por sesión"
  },
  {
    id: "family-pack",
    title: "Pack Futuro (Hijos)",
    lineId: "preu",
    subtitle: "Preuniversitario completo para hijos de colaboradores.",
    features: ["Plataforma 24/7", "Ensayos Mensuales", "Reporte de Asistencia"],
    priceDisplay: "$35.000 / alumno mes"
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   4. CALCULADORA DE COTIZACIÓN (El Cerebro)
   ────────────────────────────────────────────────────────────────────────── */

// Descuentos por volumen de personas
const VOLUME_DISCOUNTS = [
  { min: 20, rate: 0.20 }, // 20% OFF si traen a 20+ personas
  { min: 10, rate: 0.10 }, // 10% OFF si traen a 10+ personas
  { min: 5,  rate: 0.05 }, // 5% OFF
];

function getDiscount(count) {
  return VOLUME_DISCOUNTS.find(d => count >= d.min)?.rate || 0;
}

export function calcQuote(options) {
  const {
    lineId = "ingles",
    headcount = 10, // Cantidad de personas
    durationMonths = 3,
    modality = "online" // 'online' | 'onsite'
  } = options || {};

  // 1. Buscar el servicio
  const service = SERVICE_LINES.find(s => s.id === lineId) || SERVICE_LINES[0];

  // 2. Validar mínimos
  const count = Math.max(1, Number(headcount));
  const months = Math.max(1, Number(durationMonths));

  let monthlyTotal = 0;
  let totalProject = 0;
  let label = "";

  // 3. Lógica según tipo de servicio
  if (service.id === "preu") {
    // === CASO ESPECIAL: PREU (Cobro fijo por cabeza) ===
    const basePrice = service.priceFixedMonthly;
    const discount = getDiscount(count); // Aplica descuento por volumen
    
    const pricePerStudent = basePrice * (1 - discount);
    
    monthlyTotal = pricePerStudent * count;
    totalProject = monthlyTotal * months;
    label = `Plan Empresa PAES (${count} cupos)`;

  } else {
    // === CASO ESTÁNDAR: IDIOMAS / SKILLS (Cobro por Hora/Persona) ===
    const pricePerHour = modality === "onsite" ? service.pricePerHourOnsite : service.pricePerHourOnline;
    const hours = service.hoursPerMonth;
    
    // Cálculo Base: PrecioHora * HorasMes * Personas
    const baseMonthly = pricePerHour * hours * count;
    
    // Aplicar Descuento
    const discount = getDiscount(count);
    monthlyTotal = baseMonthly * (1 - discount);
    totalProject = monthlyTotal * months;

    label = `${service.label} (${modality === "onsite" ? "Presencial" : "Online"})`;
  }

  // 4. Retornar Objeto Formateado
  return {
    serviceName: service.label,
    monthlyTotal: Math.round(monthlyTotal),
    totalProject: Math.round(totalProject),
    perPersonMonthly: Math.round(monthlyTotal / count),
    headcount: count,
    duration: months,
    label: label,
    hasDiscount: getDiscount(count) > 0
  };
}