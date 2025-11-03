// === Simulador PAES — dataset referencial y helpers ===
// OJO: Estos datos son DEMO. Luego me pasas los reales (por carrera/campus) y los cambiamos aquí.

export const TEST_KEYS = ["LENG", "M1", "M2", "HIST", "CIEN", "NEM", "RANK"];

// Ponderaciones por carrera (valores en % que suman 100)
export const UNIVERSITIES = [
  {
    id: "u-lael",
    name: "Instituto/Uni Lael (demo)",
    careers: [
      {
        id: "ing-sistemas",
        name: "Ingeniería en Sistemas",
        campus: "Santiago",
        cutoff: 650, // corte referencial (100–1000)
        weights: { LENG: 15, M1: 35, M2: 15, CIEN: 10, HIST: 0, NEM: 10, RANK: 15 },
        req: ["LENG", "M1"],
        note: "Se recomienda M2 o Ciencias."
      },
      {
        id: "enfermeria",
        name: "Enfermería",
        campus: "Santiago",
        cutoff: 640,
        weights: { LENG: 25, M1: 20, M2: 0, CIEN: 25, HIST: 0, NEM: 10, RANK: 20 },
        req: ["LENG", "M1", "CIEN"],
        note: "Requiere Ciencias obligatoria."
      },
      {
        id: "derecho",
        name: "Derecho",
        campus: "Viña del Mar",
        cutoff: 630,
        weights: { LENG: 35, M1: 15, M2: 0, CIEN: 0, HIST: 20, NEM: 10, RANK: 20 },
        req: ["LENG", "HIST"],
        note: "Historia obligatoria."
      },
      {
        id: "diseno",
        name: "Diseño",
        campus: "Concepción",
        cutoff: 610,
        weights: { LENG: 30, M1: 15, M2: 0, CIEN: 0, HIST: 10, NEM: 20, RANK: 25 },
        req: ["LENG"],
        note: "Portafolio puede ponderar adicionalmente (no incluido)."
      },
    ]
  },
  {
    id: "u-demo-centro",
    name: "Universidad Centro (demo)",
    careers: [
      {
        id: "psicologia",
        name: "Psicología",
        campus: "Providencia",
        cutoff: 620,
        weights: { LENG: 35, M1: 15, M2: 0, CIEN: 10, HIST: 10, NEM: 10, RANK: 20 },
        req: ["LENG"],
        note: "Se sugiere Historia o Ciencias."
      },
      {
        id: "civil-industrial",
        name: "Ing. Civil Industrial",
        campus: "Santiago",
        cutoff: 670,
        weights: { LENG: 15, M1: 40, M2: 15, CIEN: 10, HIST: 0, NEM: 10, RANK: 10 },
        req: ["M1"],
        note: "M2 recomendado para mayor competencia."
      },
    ]
  },
  {
    id: "u-boreal",
    name: "Universidad Boreal (demo)",
    careers: [
      {
        id: "ped-basica",
        name: "Pedagogía Básica",
        campus: "Talca",
        cutoff: 600,
        weights: { LENG: 30, M1: 20, M2: 0, CIEN: 10, HIST: 10, NEM: 15, RANK: 15 },
        req: ["LENG", "M1"],
        note: "Prueba de diagnóstico interna posterior."
      }
    ]
  }
];

// Validación de ponderaciones (deben sumar 100)
export function validateWeights(weights) {
  const sum = Object.values(weights).reduce((a, b) => a + (Number(b) || 0), 0);
  return Math.round(sum) === 100;
}

// Cálculo ponderado: escala 100–1000
export function weightedScore(scores, weights) {
  // Si falta un puntaje necesario, lo tomamos como 0
  let total = 0;
  for (const k of TEST_KEYS) {
    const w = Number(weights[k] || 0) / 100;
    const s = Number(scores[k] || 0);
    total += w * s;
  }
  return Math.round(total);
}

// Chequea requisitos de pruebas obligatorias (ej. LENG/M1/CIEN)
export function hasRequired(scores, req = []) {
  return req.every(k => Number(scores[k] || 0) > 0);
}