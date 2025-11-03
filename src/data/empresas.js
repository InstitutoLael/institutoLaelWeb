// src/data/empresas.js

export const WAPP_INTL = "56964626568";

/**
 * Líneas de servicio (valores públicos orientativos + costos base profesor).
 * - Online más económico.
 * - Presencial con recargo (logística/producción/tiempo).
 * - Coaching/Consultoría (Cami) con ticket más alto.
 */
export const SERVICE_LINES = [
  {
    id: "ingles",
    label: "Inglés corporativo",
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
    label: "LSCh (inclusión / atención a público sordo)",
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
    label: "Habilidades blandas & liderazgo",
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
    label: "Inserción laboral / Empleabilidad",
    publicPphOnline: 15000,  // ticket competitivo (branding personal, CV, entrevistas, LinkedIn, ATS)
    publicPphOnsite: 19000,
    instructorBasePphOnline: 33000,  // facilitador senior + role-play
    instructorBasePphOnsite: 39000,
    instructorVarPerStudentPphOnline: 240,
    instructorVarPerStudentPphOnsite: 320,
    cohortMax: 20,
    brandColor: "#0ea5e9", // celeste
  },
  {
    id: "coaching",
    label: "Coaching & Consultoría (Cami)",
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
 * Tip: “subtitle” y “bullets” son puro copy comercial; ajusta libremente.
 */
export const EMP_PACKS = [
  {
    id: "pack-ingles-onboarding",
    line: "ingles",
    title: "Onboarding en Inglés (Express)",
    subtitle: "Survival English para nuevos ingresos",
    bullets: ["Standups, email y reporting", "Glosario corporativo", "Diagnóstico + evaluación final"],
    tag: "Inglés",
    baseAudience: 20,
  },
  {
    id: "pack-inclusion-lsch",
    line: "lsch",
    title: "Inclusión & Atención a Público Sordo",
    subtitle: "Vocabulario clave + protocolos de atención",
    bullets: ["Role-play", "Checklist de buenas prácticas", "Derivación efectiva"],
    tag: "LSCh",
    baseAudience: 18,
  },
  {
    id: "pack-softskills",
    line: "soft",
    title: "Soft Skills para Equipos",
    subtitle: "Comunicación, feedback y liderazgo situacional",
    bullets: ["Escucha activa", "Feedback sin fricción", "Dinámicas de equipo"],
    tag: "Habilidades blandas",
    baseAudience: 22,
  },
  {
    id: "pack-empleabilidad",
    line: "empleo",
    title: "Bootcamp de Empleabilidad",
    subtitle: "CV + LinkedIn + entrevista en 4 semanas",
    bullets: ["CV ganador (ATS)", "Branding personal en LinkedIn", "Role-play de entrevistas"],
    tag: "Empleabilidad",
    baseAudience: 20,
  },
  {
    id: "pack-coaching",
    line: "coaching",
    title: "Coaching ejecutivo (Cami)",
    subtitle: "1:1 u observación de equipo + plan de mejora",
    bullets: ["Hitos mensuales", "Reporte ejecutivo", "Seguimiento"],
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

// Util CLP
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

/**
 * Estimador
 */
export function calcQuote(opts) {
  const {
    lineId = "ingles",
    headcount = 20,

    durationUnit = "months",
    durationValue = 1,
    sessionsPerWeek = 2,
    hoursPerSession = 1.5,

    modality = "online", // "online" | "mixed" | "onsite"
    mixedOnsiteSessions = 0,

    addCert = false,
    addMaterials = true,
    addExecReport = true,
  } = opts || {};

  const line = SERVICE_LINES.find((l) => l.id === lineId) || SERVICE_LINES[0];
  const cohortMax = Math.max(8, line.cohortMax || 20);
  const cohorts = Math.ceil(headcount / cohortMax);

  const weeksTotal =
    durationUnit === "months"
      ? Math.max(1, durationValue) * UI_OPTIONS.weeksPerMonth
      : Math.max(1, durationValue);

  const hoursTotal =
    weeksTotal * Math.max(1, sessionsPerWeek) * Math.max(0.5, hoursPerSession);

  // Precio público base por modalidad
  let publicPph = modality === "onsite" ? line.publicPphOnsite : line.publicPphOnline;

  // Descuento por volumen
  const volumeOff =
    [...PRICING.volumeDiscounts]
      .sort((a, b) => b.min - a.min)
      .find((x) => headcount >= x.min)?.off || 0;

  // Tuition
  const tuitionBase = publicPph * hoursTotal * headcount;
  const tuition = Math.round(tuitionBase * (1 - volumeOff));

  // Mixto → flat por sesión presencial por cohorte
  const onsiteSessions =
    modality === "mixed"
      ? Math.max(0, Math.min(PRICING.mixedMaxOnsiteSessions, Number(mixedOnsiteSessions || 0)))
      : 0;
  const mixedFlat = onsiteSessions * PRICING.mixedPerOnsiteSessionFlat * cohorts;

  // Extras
  const extras =
    (addCert ? PRICING.certificatePerPerson * headcount : 0) +
    (addMaterials ? PRICING.materialsPerPerson * headcount : 0) +
    (addExecReport ? PRICING.executiveReportFlat : 0) +
    mixedFlat;

  const total = tuition + extras;

  // Costos profesor
  const basePph = modality === "onsite" ? line.instructorBasePphOnsite : line.instructorBasePphOnline;
  const varPph = modality === "onsite" ? line.instructorVarPerStudentPphOnsite : line.instructorVarPerStudentPphOnline;

  const instructorBaseCost = basePph * hoursTotal * cohorts;
  const instructorVarCost = varPph * hoursTotal * headcount;
  const instructorCost = Math.round(instructorBaseCost + instructorVarCost);

  const margin = total > 0 ? (1 - instructorCost / total) : 0;

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
    mixedFlat,
    extrasBreakdown: {
      certificates: addCert ? PRICING.certificatePerPerson * headcount : 0,
      materials: addMaterials ? PRICING.materialsPerPerson * headcount : 0,
      executiveReport: addExecReport ? PRICING.executiveReportFlat : 0,
      mixedOnsiteFlat: mixedFlat,
    },
    total,
    _internal: {
      instructorCost,
      instructorBaseCost,
      instructorVarCost,
      margin, // 0..1
    },
  };
}