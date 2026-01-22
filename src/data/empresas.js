// src/data/empresas.js

// === Lael Corporate: Soluciones B2B ===
// Estrategia: Market Entry (Precios competitivos para generar tracción rápida)

export const WAPP_INTL = "56964626568";

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
    desc: "Capacitación lingüística para equipos de alto rendimiento."
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
    desc: "Cumplimiento normativo y sensibilización cultural."
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
    desc: "Talleres de comunicación efectiva y gestión de equipos."
  },
  {
    id: "beneficio-hijos",
    label: "Beneficio Hijos (Preu PAES)",
    type: "flat", // <--- Lógica de cobro mensual fijo
    // ESTO ES ORO: Vender cupos masivos a empresas.
    flatPriceMonth: 35000, // Precio "Mayorista" (En web público vale +80k)
    brandColor: "#ec4899", // Pink
    icon: "🎓",
    desc: "Beneficio social para las familias de tus colaboradores."
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
    desc: "Acompañamiento personalizado para gerencia."
  },
];

/**
 * 📦 PACKS "GANCHO" (Low Cost / High Impact)
 * Diseñados para reducir la fricción de entrada.
 */
export const EMP_PACKS = [
  {
    id: "pack-starter",
    lineId: "ingles",
    title: "Pack 'Meeting Ready'",
    subtitle: "Taller intensivo de 1 mes: Pierde el miedo a hablar.",
    bullets: ["4 Sesiones de Roleplay", "Vocabulario de Negocios", "Feedback Personalizado"],
    priceLabel: "Desde $250.000 / equipo"
  },
  {
    id: "pack-inclusion",
    lineId: "lsch",
    title: "Charla Ley de Inclusión",
    subtitle: "Cumple la norma y sensibiliza en una sola jornada.",
    bullets: ["Contexto Ley 21.015", "Mitos de la Sordera", "Señas de Cortesía Básicas"],
    priceLabel: "Valor fijo: UF 5"
  },
  {
    id: "pack-bienestar",
    lineId: "beneficio-hijos",
    title: "Pack Futuro (Hijos)",
    subtitle: "El beneficio más valorado por los colaboradores padres.",
    bullets: ["Plataforma PAES 24/7", "Ensayos y Clases en vivo", "Reporte de Asistencia a RRHH"],
    priceLabel: "$35.000 por alumno"
  },
];

/**
 * 💰 REGLAS DE DESCUENTO POR VOLUMEN
 */
export const PRICING_RULES = {
  volumeDiscounts: [
    { min: 5, off: 0.00 },  // 0% hasta 4 personas
    { min: 10, off: 0.10 }, // 10% descuento
    { min: 20, off: 0.15 }, // 15% descuento
    { min: 50, off: 0.25 }, // 25% descuento (Gran volumen)
  ],
};

// --- UTILS ---

// Formateador de moneda CLP
export const clp = (amount) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(amount || 0);

// Restrictor de rangos (para que no pongan -5 personas)
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);


/**
 * 🧮 MOTOR DE CÁLCULO DE PRESUPUESTO
 * Esta función es el cerebro del cotizador.
 */
export function calcQuote(options) {
  const {
    lineId = "ingles",
    headcount: _hc = 10,
    durationMonths: _dm = 3,
    modality = "online", // 'online' | 'onsite'
  } = options || {};

  // 1. Encontrar el servicio
  const service = SERVICE_LINES.find((l) => l.id === lineId) || SERVICE_LINES[0];

  // 2. Sanitizar entradas (Evitar números negativos o locos)
  const headcount = clamp(_hc, 1, 500);
  const durationMonths = clamp(_dm, 1, 12);

  // 3. Calcular Descuento por Volumen
  // Se busca el descuento más alto aplicable según la cantidad de gente
  const discountRule = PRICING_RULES.volumeDiscounts
    .sort((a, b) => b.min - a.min) // Ordenar descendente (50, 20, 10...)
    .find((rule) => headcount >= rule.min);

  const discountRate = discountRule ? discountRule.off : 0;

  let totalGross = 0;
  let baseUnitCost = 0; // Costo base unitario (hora o mes)

  // 4. Lógica Bifurcada según Tipo de Servicio

  if (service.type === "flat") {
    // === CASO TARIFA PLANA (Ej: Preu) ===
    // Fórmula: Personas * PrecioFijo * Meses
    baseUnitCost = service.flatPriceMonth;
    totalGross = baseUnitCost * headcount * durationMonths;

  } else {
    // === CASO POR HORA (Ej: Inglés) ===
    // Fórmula: Personas * (PrecioHora * HorasMes) * Meses
    const hourlyRate = modality === "onsite" ? service.publicPphOnsite : service.publicPphOnline;
    const hoursMonth = service.defaultHoursMonth || 8;

    baseUnitCost = hourlyRate * hoursMonth; // Costo mensual por persona sin descuento
    totalGross = baseUnitCost * headcount * durationMonths;
  }

  // 5. Aplicar Descuentos y Finales
  const totalNet = Math.round(totalGross * (1 - discountRate));

  // 6. MÉTRICAS DE IMPACTO ROI (Simuladas/Matemáticas)
  // - Ahorro por Retención: Evitar 1 renuncia al año cuesta ~2M CLP
  const retentionSavings = headcount > 10 ? 2500000 : 800000;
  // - Ganancia Productividad: +10% de efectividad por hora
  const productivityGain = headcount * (modality === 'online' ? 120000 : 150000);

  // Métricas unitarias para mostrar "Desde $X por persona"
  const costPerPersonTotal = Math.round(totalNet / headcount);
  const costPerPersonMonth = Math.round(costPerPersonTotal / durationMonths);

  return {
    service,
    params: { headcount, durationMonths, modality },
    financials: {
      total: totalNet,
      totalBeforeDiscount: totalGross,
      discountAmount: totalGross - totalNet,
      discountPercent: Math.round(discountRate * 100),
      perPersonTotal: costPerPersonTotal,
      perPersonMonth: costPerPersonMonth,
    },
    impact: {
      retentionSavings,
      productivityGain,
      totalROI: (retentionSavings + productivityGain) / totalNet
    }
  };
}