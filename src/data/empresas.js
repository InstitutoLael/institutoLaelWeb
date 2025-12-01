// src/data/empresas.js
// === Lael Corporate: Soluciones B2B ===

export const WAPP_INTL = "56964626568";

/**
 * 📊 LÍNEAS DE SERVICIO
 * Valores orientativos para el calculador.
 */
export const SERVICE_LINES = [
  {
    id: "ingles",
    label: "Inglés de Negocios",
    publicPphOnline: 12000,
    publicPphOnsite: 15500,
    instructorBasePphOnline: 26000,
    instructorBasePphOnsite: 32000,
    instructorVarPerStudentPphOnline: 200,
    instructorVarPerStudentPphOnsite: 260,
    cohortMax: 20,
    brandColor: "#6366f1", // Indigo
  },
  {
    id: "lsch",
    label: "Lengua de Señas & Inclusión",
    publicPphOnline: 14500,
    publicPphOnsite: 18500,
    instructorBasePphOnline: 32000,
    instructorBasePphOnsite: 38000,
    instructorVarPerStudentPphOnline: 260,
    instructorVarPerStudentPphOnsite: 340,
    cohortMax: 18,
    brandColor: "#14b8a6", // Teal
  },
  {
    id: "soft",
    label: "Liderazgo & Habilidades Blandas",
    publicPphOnline: 13500,
    publicPphOnsite: 16800,
    instructorBasePphOnline: 30000,
    instructorBasePphOnsite: 35000,
    instructorVarPerStudentPphOnline: 220,
    instructorVarPerStudentPphOnsite: 300,
    cohortMax: 22,
    brandColor: "#f59e0b", // Amber
  },
  {
    id: "empleo",
    label: "Outplacement & Marca Personal",
    publicPphOnline: 15000,
    publicPphOnsite: 19000,
    instructorBasePphOnline: 33000,
    instructorBasePphOnsite: 39000,
    instructorVarPerStudentPphOnline: 240,
    instructorVarPerStudentPphOnsite: 320,
    cohortMax: 20,
    brandColor: "#0ea5e9", // Sky
  },
  {
    id: "coaching",
    label: "Coaching Ejecutivo",
    publicPphOnline: 22000,
    publicPphOnsite: 26000,
    instructorBasePphOnline: 45000,
    instructorBasePphOnsite: 52000,
    instructorVarPerStudentPphOnline: 320,
    instructorVarPerStudentPphOnsite: 380,
    cohortMax: 12,
    brandColor: "#ef4444", // Red
  },
];

/**
 * 📦 PACKS PRE-ARMADOS (Para venta rápida)
 */
export const EMP_PACKS = [
  {
    id: "pack-ingles",
    line: "ingles",
    title: "English for Teams",
    subtitle: "Nivelación rápida para equipos que necesitan hablar ya.",
    bullets: ["Vocabulario técnico", "Simulación de reuniones", "Corrección de emails"],
    baseAudience: 10,
  },
  {
    id: "pack-lsch",
    line: "lsch",
    title: "Atención Inclusiva (Ley 21.015)",
    subtitle: "Cumple la normativa y mejora la experiencia de tus clientes.",
    bullets: ["Protocolos de atención", "Vocabulario de servicio", "Cultura Sorda"],
    baseAudience: 15,
  },
  {
    id: "pack-liderazgo",
    line: "soft",
    title: "Liderazgo Ágil",
    subtitle: "Herramientas de comunicación para jefaturas modernas.",
    bullets: ["Feedback efectivo", "Gestión del tiempo", "Resolución de conflictos"],
    baseAudience: 8,
  },
];

export const UI_OPTIONS = {
  weeksPerMonth: 4.33,
};

export const PRICING = {
  volumeDiscounts: [
    { min: 10, off: 0.05 },
    { min: 20, off: 0.10 },
    { min: 50, off: 0.15 },
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
  
  const headcount = clamp(_hc, 5, 200);
  const durationMonths = clamp(_dm, 1, 12);
  
  // Supuestos base para cálculo rápido
  const sessionsPerWeek = 2; 
  const hoursPerSession = 1.5;
  const weeksTotal = durationMonths * UI_OPTIONS.weeksPerMonth;
  const hoursTotal = weeksTotal * sessionsPerWeek * hoursPerSession;

  // Precio Base
  let pph = modality === "onsite" ? line.publicPphOnsite : line.publicPphOnline;

  // Descuento por Volumen
  const discount = PRICING.volumeDiscounts
    .sort((a, b) => b.min - a.min)
    .find((x) => headcount >= x.min)?.off || 0;

  const grossTotal = pph * hoursTotal * headcount;
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
    discountPercent: discount * 100
  };
}