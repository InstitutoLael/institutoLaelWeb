// src/data/empresas.js

export const WAPP_INTL = "56964626568";

/**
 * Líneas de servicio (valores públicos orientativos + costos base profesor).
 * Todos los nombres están ajustados a lenguaje corporativo y comercial.
 */
export const SERVICE_LINES = [
  {
    id: "ingles",
    label: "Inglés Profesional y Empresarial",
    publicPphOnline: 12000,
    publicPphOnsite: 15500,
    instructorBasePphOnline: 26000,
    instructorBasePphOnsite: 32000,
    instructorVarPerStudentPphOnline: 200,
    instructorVarPerStudentPphOnsite: 260,
    cohortMax: 20,
    brandColor: "#4f46e5", // índigo
  },
  {
    id: "lsch",
    label: "Lengua de Señas Chilena e Inclusión",
    publicPphOnline: 14500,
    publicPphOnsite: 18500,
    instructorBasePphOnline: 32000,
    instructorBasePphOnsite: 38000,
    instructorVarPerStudentPphOnline: 260,
    instructorVarPerStudentPphOnsite: 340,
    cohortMax: 18,
    brandColor: "#16a34a", // verde
  },
  {
    id: "soft",
    label: "Liderazgo y Comunicación Efectiva",
    publicPphOnline: 13500,
    publicPphOnsite: 16800,
    instructorBasePphOnline: 30000,
    instructorBasePphOnsite: 35000,
    instructorVarPerStudentPphOnline: 220,
    instructorVarPerStudentPphOnsite: 300,
    cohortMax: 22,
    brandColor: "#f59e0b", // ámbar
  },
  {
    id: "empleo",
    label: "Empleabilidad y Desarrollo Profesional",
    publicPphOnline: 15000,
    publicPphOnsite: 19000,
    instructorBasePphOnline: 33000,
    instructorBasePphOnsite: 39000,
    instructorVarPerStudentPphOnline: 240,
    instructorVarPerStudentPphOnsite: 320,
    cohortMax: 20,
    brandColor: "#0ea5e9", // celeste
  },
  {
    id: "coaching",
    label: "Coaching Ejecutivo y Consultoría Organizacional",
    publicPphOnline: 22000,
    publicPphOnsite: 26000,
    instructorBasePphOnline: 45000,
    instructorBasePphOnsite: 52000,
    instructorVarPerStudentPphOnline: 320,
    instructorVarPerStudentPphOnsite: 380,
    cohortMax: 12,
    brandColor: "#ef4444", // rojo
  },
];

/**
 * Paquetes sugeridos (para precargar el estimador).
 */
export const EMP_PACKS = [
  {
    id: "pack-ingles-onboarding",
    line: "ingles",
    title: "Inglés para Nuevos Equipos (Onboarding Express)",
    subtitle: "Dominio básico de inglés corporativo para primeros meses",
    bullets: [
      "Expresiones clave en reuniones y correos",
      "Glosario interno personalizado",
      "Diagnóstico inicial y evaluación final",
    ],
    tag: "Inglés",
    baseAudience: 20,
  },
  {
    id: "pack-inclusion-lsch",
    line: "lsch",
    title: "Atención Inclusiva en Lengua de Señas Chilena",
    subtitle: "Protocolos y vocabulario esencial para trato accesible",
    bullets: [
      "Role-play y dinámicas de atención real",
      "Checklist de buenas prácticas",
      "Simulación de casos reales",
    ],
    tag: "Inclusión",
    baseAudience: 18,
  },
  {
    id: "pack-softskills",
    line: "soft",
    title: "Liderazgo Colaborativo y Comunicación Interna",
    subtitle: "Fortalece equipos y vínculos laborales",
    bullets: [
      "Escucha activa y comunicación asertiva",
      "Gestión emocional y feedback constructivo",
      "Dinámicas de confianza y colaboración",
    ],
    tag: "Liderazgo",
    baseAudience: 22,
  },
  {
    id: "pack-empleabilidad",
    line: "empleo",
    title: "Programa Intensivo de Empleabilidad y Marca Personal",
    subtitle: "Potencia tu perfil profesional en 4 semanas",
    bullets: [
      "Optimización de CV y LinkedIn",
      "Simulación de entrevistas reales",
      "Estrategias de inserción laboral",
    ],
    tag: "Empleabilidad",
    baseAudience: 20,
  },
  {
    id: "pack-coaching",
    line: "coaching",
    title: "Coaching Organizacional y Acompañamiento Directivo",
    subtitle: "Sesiones personalizadas para potenciar liderazgo y gestión",
    bullets: [
      "Hitos mensuales y seguimiento",
      "Retroalimentación 360°",
      "Informe ejecutivo de resultados",
    ],
    tag: "Consultoría",
    baseAudience: 8,
  },
];

/**
 * UI presets
 */
export const UI_OPTIONS = {
  durationUnits: ["months", "weeks"],
  months: [1, 2, 3, 4, 6, 9, 12],
  weeks: [1, 2, 3, 4, 6, 8, 12],
  sessionsPerWeek: [1, 2, 3, 4],
  hoursPerSession: [1, 1.5, 2, 2.5, 3],
  headcountPresets: [10, 15, 20, 30, 40, 50, 80],
  weeksPerMonth: 4.33,
};

/**
 * Política de precios y recargos
 */
export const PRICING = {
  mixedMaxOnsiteSessions: 4,
  mixedPerOnsiteSessionFlat: 110000,

  volumeDiscounts: [
    { min: 15, off: 0.05 },
    { min: 30, off: 0.10 },
    { min: 50, off: 0.16 },
    { min: 80, off: 0.20 },
  ],

  certificatePerPerson: 2500,
  materialsPerPerson: 2000,
  executiveReportFlat: 60000,
};

// Helper para mostrar CLP
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

const ceilTo = (n, step = 100) => Math.ceil(Number(n || 0) / step) * step;
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

/**
 * Estimador (con margen objetivo, redondeos y extras)
 */
export function calcQuote(opts) {
  const {
    lineId = "ingles",
    headcount: _headcount = 20,
    durationUnit = "months",
    durationValue: _durVal = 1,
    sessionsPerWeek: _spw = 2,
    hoursPerSession: _hps = 1.5,
    modality = "online",
    mixedOnsiteSessions: _mixed = 0,
    addCert = false,
    addMaterials = true,
    addExecReport = true,
    minMargin = 0.35,
  } = opts || {};

  const headcount = clamp(Math.floor(_headcount), 1, 200);
  const durationValue = clamp(Number(_durVal), 1, 24);
  const sessionsPerWeek = clamp(Number(_spw), 1, 6);
  const hoursPerSession = clamp(Number(_hps), 0.5, 6);

  const line = SERVICE_LINES.find((l) => l.id === lineId) || SERVICE_LINES[0];
  const cohortMax = Math.max(8, line.cohortMax || 20);
  const cohorts = Math.ceil(headcount / cohortMax);

  const weeksTotal =
    durationUnit === "months"
      ? durationValue * UI_OPTIONS.weeksPerMonth
      : durationValue;

  const hoursTotal = weeksTotal * sessionsPerWeek * hoursPerSession;

  let publicPph =
    modality === "onsite" ? line.publicPphOnsite : line.publicPphOnline;

  const volumeOff =
    [...PRICING.volumeDiscounts]
      .sort((a, b) => b.min - a.min)
      .find((x) => headcount >= x.min)?.off || 0;

  const tuitionBase = publicPph * hoursTotal * headcount;
  let tuition = Math.round(tuitionBase * (1 - volumeOff));

  const onsiteSessions =
    modality === "mixed"
      ? clamp(Number(_mixed || 0), 0, PRICING.mixedMaxOnsiteSessions)
      : 0;
  const mixedFlat =
    onsiteSessions * PRICING.mixedPerOnsiteSessionFlat * cohorts;

  const certificates = addCert
    ? PRICING.certificatePerPerson * headcount
    : 0;
  const materials = addMaterials
    ? PRICING.materialsPerPerson * headcount
    : 0;
  const executiveReport = addExecReport
    ? PRICING.executiveReportFlat
    : 0;

  const basePph =
    modality === "onsite"
      ? line.instructorBasePphOnsite
      : line.instructorBasePphOnline;
  const varPph =
    modality === "onsite"
      ? line.instructorVarPerStudentPphOnsite
      : line.instructorVarPerStudentPphOnline;

  const instructorBaseCost = basePph * hoursTotal * cohorts;
  const instructorVarCost = varPph * hoursTotal * headcount;
  const instructorCost = Math.round(instructorBaseCost + instructorVarCost);

  const extras = certificates + materials + executiveReport + mixedFlat;
  const initialTotal = tuition + extras;
  const currentMargin =
    initialTotal > 0 ? 1 - instructorCost / initialTotal : 0;

  if (currentMargin < minMargin) {
    const targetTotal = ceilTo(instructorCost / (1 - minMargin));
    tuition = Math.max(tuition, targetTotal - extras);
  }

  const subtotal = ceilTo(tuition + extras);
  const total = subtotal;
  const margin = total > 0 ? 1 - instructorCost / total : 0;

  const pricePerPerson = ceilTo(total / headcount);
  const pricePerCohort = ceilTo(total / cohorts);
  const pricePerPersonPerMonth = ceilTo(
    (total / headcount) / (weeksTotal / UI_OPTIONS.weeksPerMonth)
  );

  return {
    line,
    headcount,
    durationUnit,
    durationValue,
    weeksTotal,
    sessionsPerWeek,
    hoursPerSession,
    hoursTotal,
    cohorts,
    cohortMax,
    modality,
    mixedOnsiteSessions: onsiteSessions,
    volumeDiscount: volumeOff,
    publicPph,
    tuition,
    extrasBreakdown: {
      certificates,
      materials,
      executiveReport,
      mixedOnsiteFlat: mixedFlat,
    },
    subtotal,
    total,
    perPerson: pricePerPerson,
    perCohort: pricePerCohort,
    perPersonPerMonth: pricePerPersonPerMonth,
    _internal: {
      instructorCost,
      instructorBaseCost,
      instructorVarCost,
      margin,
    },
  };
}