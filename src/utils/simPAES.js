// src/utils/simPAES.js

/* =========================================
   CONSTANTES Y REGLAS OFICIALES (DEMRE)
   ========================================= */
const MIN_PUNTAJE = 100;
const MAX_PUNTAJE = 1000;
const MIN_PROM_OBLIGATORIAS = 458; // Regla: (CL + M1)/2 >= 458

/* =========================================
   HELPERS (Ayudantes pequeños)
   ========================================= */

// Verifica si es un número válido y está dentro del rango PAES (100-1000)
// Acepta 0 si es que el alumno no rindió la prueba (para no romper el cálculo)
const isValidScore = (n) => {
  if (typeof n !== "number" || isNaN(n)) return false;
  return (n >= MIN_PUNTAJE && n <= MAX_PUNTAJE) || n === 0;
};

// Redondea a 2 decimales (Estándar para simuladores visuales)
const round2 = (n) => Math.round(n * 100) / 100;

/* =========================================
   FUNCIONES PRINCIPALES
   ========================================= */

/**
 * 1. esAdmisible
 * Verifica si el estudiante cumple el requisito mínimo del DEMRE.
 * Regla: Promedio (Lectura + M1) >= 458  O  Estar en el 10% superior de su colegio.
 * Nota: Aquí simplificamos usando solo el promedio, pero está preparado para más.
 */
export function esAdmisible({ CL, M1 }) {
  if (!isValidScore(CL) || !isValidScore(M1)) return false;
  // Si tiene 0 en alguna obligatoria, técnicamente no es admisible para postular
  if (CL === 0 || M1 === 0) return false; 
  
  const promedio = (CL + M1) / 2;
  return promedio >= MIN_PROM_OBLIGATORIAS;
}

/**
 * 2. calcularPPP (Puntaje Ponderado Postulación)
 * Esta es la magia. Toma los puntajes del alumno y las ponderaciones de la carrera.
 * Automáticamente detecta cuál es la mejor electiva para el alumno.
 */
export function calcularPPP(pond, puntajes) {
  // Extraemos puntajes con defaults en 0 para evitar errores
  const {
    CL = 0, M1 = 0, M2 = 0, CIEN = 0, HIS = 0, NEM = 0, RANK = 0
  } = puntajes;

  // Extraemos ponderaciones (ej: 10, 20, 30...)
  // Asumimos que vienen en formato porcentaje (10, 20) o decimal (0.1, 0.2).
  // Esta función normaliza a decimal si es necesario.
  const p = (val) => {
    const v = Number(val || 0);
    return v > 1 ? v / 100 : v; // Si viene "20", lo transforma a "0.2"
  };

  // Lógica de MEJOR ELECTIVA:
  // Si la carrera pide Ciencias O Historia (pondera ambas o tiene un slot genérico),
  // usamos la nota más alta del alumno.
  let scoreElectiva = 0;
  
  // Caso 1: La carrera acepta ambas (común en humanistas/ciencias sociales)
  if (p(pond.CIEN) > 0 || p(pond.HIS) > 0) {
    // Si la carrera tiene el mismo peso para ambas o permite elegir, tomamos la mayor del alumno
    scoreElectiva = Math.max(isValidScore(CIEN) ? CIEN : 0, isValidScore(HIS) ? HIS : 0);
  }

  // CÁLCULO FINAL
  const puntajeFinal = 
    (p(pond.NEM) * NEM) +
    (p(pond.RANK) * RANK) +
    (p(pond.CL) * CL) +
    (p(pond.M1) * M1) +
    (p(pond.M2) * (isValidScore(M2) ? M2 : 0)) +
    // Aquí el truco: Usamos el peso de la electiva multiplicado por la MEJOR nota
    // Asumimos que si hay peso en electiva, usamos el max(pond.CIEN, pond.HIS) como el factor
    (Math.max(p(pond.CIEN), p(pond.HIS)) * scoreElectiva);

  return round2(puntajeFinal);
}

/**
 * 3. cumpleRequisitosExtra
 * Verifica M2 y otros requisitos específicos de la carrera.
 */
export function cumpleRequisitosExtra(carrera, puntajes) {
  // Validar M2 si la carrera la pide
  // (Asumimos que si la carrera pondera M2 > 0, es obligatoria, o si tiene un flag 'm2_req')
  const pideM2 = (carrera.pond_m2 && carrera.pond_m2 > 0) || carrera.m2_required;
  
  if (pideM2) {
    if (!puntajes.M2 || puntajes.M2 <= 0) return false; // No la rindió
  }
  return true;
}

/**
 * 4. etiquetaChance (El semáforo)
 * Nos dice qué tan probable es quedar, con un texto amigable y un color.
 * @param {number} ppp - Puntaje calculado del alumno
 * @param {number} corte - Puntaje de corte del año anterior
 */
export function etiquetaChance(ppp, corte) {
  if (!ppp || !corte) return { text: "—", color: "gray", icon: "⚪️" };

  const diff = ppp - corte;

  if (diff >= 40) return { text: "EXCELENTE OPCIÓN", color: "emerald", icon: "🚀" }; // Super seguro
  if (diff >= 15) return { text: "MUY PROBABLE", color: "green", icon: "✅" };       // Seguro
  if (diff >= 0)  return { text: "COMPETITIVO", color: "blue", icon: "🔹" };         // Justo arriba
  if (diff >= -15) return { text: "AJUSTADO", color: "yellow", icon: "⚠️" };         // Un poco abajo
  if (diff >= -40) return { text: "RIESGOSO", color: "orange", icon: "🔸" };         // Difícil
  return { text: "MUY DIFÍCIL", color: "red", icon: "🔻" };                          // Muy lejos
}