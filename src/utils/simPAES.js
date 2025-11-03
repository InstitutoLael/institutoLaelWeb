// src/utils/simPAES.js

// Regla base admisibilidad centralizada (CL + M1)/2 >= 458
export const MIN_PROM_OBLIGATORIAS = 458;

export function esAdmisible({ CL, M1 }) {
  if (!isNum(CL) || !isNum(M1)) return false;
  const promedio = (CL + M1) / 2;
  return promedio >= MIN_PROM_OBLIGATORIAS;
}

// Usa la MEJOR entre Ciencias (CIEN) e Historia (HIS) si la ponderación > 0
function mejorElectiva({ CIEN = 0, HIS = 0 }) {
  const vC = isNum(CIEN) ? CIEN : 0;
  const vH = isNum(HIS) ? HIS : 0;
  return Math.max(vC, vH);
}

// Calcula PPP en base a ponderaciones por carrera
export function calcularPPP(pond, puntajes) {
  const {
    CL = 0, M1 = 0, M2 = 0, CIEN = 0, HIS = 0, NEM = 0, RANK = 0,
  } = puntajes;

  const bestElectiva = mejorElectiva(puntajes);

  const pieces = [
    (pond.CL || 0) * CL,
    (pond.M1 || 0) * M1,
    (pond.M2 || 0) * (isNum(M2) ? M2 : 0),
    // si la carrera pondera electiva, usa la mejor
    ((pond.CIEN || 0) > 0 || (pond.HIS || 0) > 0) ? (Math.max(pond.CIEN || 0, pond.HIS || 0) * bestElectiva) : 0,
    (pond.NEM || 0) * (isNum(NEM) ? NEM : 0),
    (pond.RANK || 0) * (isNum(RANK) ? RANK : 0),
  ];

  return round1(pieces.reduce((a, b) => a + b, 0));
}

// Requisito M2 específico
export function cumpleM2Requerido(requiereM2, puntajes) {
  if (!requiereM2) return true;
  return isNum(puntajes.M2) && puntajes.M2 > 0;
}

// Etiqueta de “chance” vs. corte de referencia
export function etiquetaChance(ppp, corteRef) {
  if (!isNum(ppp) || !isNum(corteRef)) return "—";
  const diff = ppp - corteRef;
  if (diff >= 20) return "SEGURO";
  if (diff >= 0)  return "COMPETITIVO";
  if (diff >= -20) return "AJUSTADO";
  return "LEJANO";
}

const isNum = (n) => typeof n === "number" && Number.isFinite(n);
const round1 = (n) => Math.round(n * 100) / 100;