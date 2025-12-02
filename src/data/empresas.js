// src/data/empresas.js
// === Lael Corporate: Soluciones B2B (Estrategia Market Entry) ===

export const WAPP_INTL = "56964626568";

/**
 * 📊 LÍNEAS DE SERVICIO
 * Precios ajustados para penetración de mercado (competitivos para PYMEs).
 * Objetivo: Cerrar los primeros 10 contratos.
 */
export const SERVICE_LINES = [
  {
    id: "ingles",
    label: "Inglés Corporativo",
    // Bajamos de 12.000 a 6.500 la hora/persona base.
    // Esto deja el mensual aprox en $85.000 pp (muy vendible).
    publicPphOnline: 6500, 
    publicPphOnsite: 9500,
    cohortMax: 15, // Grupos más manejables
    brandColor: "#6366f1", // Indigo
    icon: "🌍"
  },
  {
    id: "lsch",
    label: "Lengua de Señas (Ley 21.015)",
    // Estratégico: Precio gancho para cumplimiento normativo.
    publicPphOnline: 7500,
    publicPphOnsite: 10500,
    cohortMax: 20,
    brandColor: "#14b8a6", // Teal
    icon: "🤟"
  },
  {
    id: "soft",
    label: "Liderazgo & Habilidades",
    // Talleres prácticos
    publicPphOnline: 8000,
    publicPphOnsite: 12000,
    cohortMax: 25,
    brandColor: "#f59e0b", // Amber
    icon: "⚡"
  },
  {
    id: "beneficio-hijos",
    label: "Beneficio Hijos (Preu PAES)",
    // ESTO ES ORO: Vender cupos del Preu a empresas.
    // Precio volumen muy agresivo.
    publicPphOnline: 4500, // Simbólico, se cobra por cupo mensual
    publicPphOnsite: 0, // No aplica
    cohortMax: 100,
    brandColor: "#ec4899", // Pink
    icon: "🎓"
  },
  {
    id: "coaching",
    label: "Coaching 1 a 1",
    // Servicio Premium para Gerentes (se mantiene más alto)
    publicPphOnline: 25000,
    publicPphOnsite: 35000,
    cohortMax: 1,
    brandColor: "#ef4444", // Red
    icon: "🎯"
  },
];

/**
 * 📦 PACKS "GANCHO" (Low Cost / High Impact)
 * Diseñados para que prueben el servicio sin miedo.
 */
export const EMP_PACKS = [
  {
    id: "pack-starter",
    line: "ingles",
    title: "Pack 'Meeting Ready'",
    subtitle: "Taller intensivo de 1 mes para perder el miedo a hablar.",
    bullets: ["4 Sesiones de Roleplay", "Vocabulario de Reuniones", "Corrección de Pronunciación"],
    baseAudience: 5,
    priceLabel: "Desde $250.000 total" // Gancho visual
  },
  {
    id: "pack-inclusion",
    line: "lsch",
    title: "Charla Ley de Inclusión",
    subtitle: "Cumple con la normativa y sensibiliza a tu equipo en 1 jornada.",
    bullets: ["Contexto Ley 21.015", "Mitos de la Sordera", "Señas de Cortesía"],
    baseAudience: 20,
    priceLabel: "UF 5 por sesión" // Precio cerrado atractivo
  },
  {
    id: "pack-bienestar",
    line: "beneficio-hijos",
    title: "Pack Futuro (Hijos)",
    subtitle: "Apoya a las familias de tus colaboradores con Preuniversitario.",
    bullets: ["Acceso a Plataforma PAES", "Ensayos Mensuales", "Reporte de Asistencia a RRHH"],
    baseAudience: 10,
    priceLabel: "$35.000 por hijo/mes" // Muy barato para empresa, alto valor percibido
  },
];

export const UI_OPTIONS = {
  weeksPerMonth: 4, // Simplificamos a 4 semanas para números redondos
};

export const PRICING = {
  volumeDiscounts: [
    { min: 5, off: 0.0 },   // Base
    { min: 10, off: 0.10 }, // 10%
    { min: 20, off: 0.15 }, // 15%
    { min: 50, off: 0.25 }, // 25% (Agresivo para grandes volúmenes)
  ],
};

// Helper CLP
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

/**
 * 🧮 MOTOR DE CÁLCULO DE PRESUPUESTO
 */
export function calcQuote(opts) {
  const {
    lineId = "ingles",
    headcount: _hc = 10,
    durationMonths: _dm = 3,
    modality = "online",
  } = opts || {};

  const line = SERVICE_LINES.find((l) => l.id === lineId) || SERVICE_LINES[0];
  
  // Limites lógicos
  const headcount = clamp(_hc, 1, 500);
  const durationMonths = clamp(_dm, 1, 12);
  
  // LÓGICA ESPECIAL PARA PREU (Beneficio Hijos)
  if (line.id === "beneficio-hijos") {
      // Precio fijo por alumno mensual (ej: $45.000 base)
      const baseMonthlyPrice = 45000; 
      
      // Descuento por volumen
      const discount = PRICING.volumeDiscounts
        .sort((a, b) => b.min - a.min)
        .find((x) => headcount >= x.min)?.off || 0;

      const monthlyTotal = baseMonthlyPrice * headcount * (1 - discount);
      const total = monthlyTotal * durationMonths;

      return {
        line, headcount, durationMonths, modality,
        total,
        perPerson: Math.round(total / headcount),
        perPersonMonth: Math.round(monthlyTotal / headcount),
        discountPercent: discount * 100,
        isSpecial: true
      };
  }

  // LÓGICA ESTÁNDAR (Cursos de Idiomas/Skills)
  // Supuesto: 8 horas mensuales por persona (2 horas semanales)
  const hoursPerMonth = 8; 
  const totalHoursProject = hoursPerMonth * durationMonths;

  // Precio Base PPH
  let pph = modality === "onsite" ? line.publicPphOnsite : line.publicPphOnline;

  // Descuento por Volumen
  const discount = PRICING.volumeDiscounts
    .sort((a, b) => b.min - a.min)
    .find((x) => headcount >= x.min)?.off || 0;

  // Cálculo: (Precio Hora * Horas Totales * Personas) * Descuento
  const grossTotal = pph * totalHoursProject * headcount;
  const total = Math.round(grossTotal * (1 - discount));
  
  const perPerson = Math.round(total / headcount);
  const perPersonMonth = Math.round(perPerson / durationMonths);

  return {
    line,
    headcount,
    durationMonths,
    modality,
    total,
    perPerson,
    perPersonMonth,
    discountPercent: discount * 100,
    isSpecial: false
  };
}