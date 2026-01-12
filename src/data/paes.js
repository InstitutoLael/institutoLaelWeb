// src/data/paes.js
// === Preuniversitario 2026: Estrategia de Volumen y Margen ===

/* ──────────────────────────────────────────────────────────────────────────
   1. CONFIGURACIÓN FINANCIERA
   ────────────────────────────────────────────────────────────────────────── */

// 🔢 Formateador de Moneda
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

// 🧾 Matrícula Anual (Pago Único)
export const ENROLLMENT_FEE = 10990; 

// 📅 Duración del servicio (para cálculos anuales visuales)
export const ACADEMIC_MONTHS = 8; 

/* ──────────────────────────────────────────────────────────────────────────
   2. CALCULADORA DE PRECIOS (El cerebro del negocio)
   ────────────────────────────────────────────────────────────────────────── */

/**
 * Calcula el total mensual basado en la cantidad de ramos seleccionados.
 * Estrategia: "Tarifa Plana" a partir del 4to ramo.
 * * Costo Docente estimado: $3.000 por alumno/ramo.
 * Margen Mínimo: Asegurado en todos los tramos.
 */
export function computePaesPrice(selectedIds = []) {
  const count = selectedIds.length;
  
  // Lista de precios escalonada
  // 1 Ramo:  $9.990 (Gancho)
  // 2 Ramos: $18.990
  // 3 Ramos: $27.990 (Pack Clásico)
  // 4+ Ramos: $34.990 (TARIFA PLANA - "All you can eat")
  
  let total = 0;
  let label = "Selecciona tus ramos";
  let savings = null;

  if (count === 0) {
    total = 0;
  } else if (count === 1) {
    total = 9990;
    label = "Plan Monoramo";
  } else if (count === 2) {
    total = 18990;
    label = "Plan Dúo";
  } else if (count === 3) {
    total = 27990;
    label = "Plan Trío Fundamental";
  } else {
    // 4 o más ramos (Tarifa Plana)
    total = 34990; 
    label = "🏆 Plan Full Intensivo (Tarifa Plana)";
    savings = "Estás ahorrando al máximo";
  }

  return {
    totalMonthly: total,
    count: count,
    label: label,
    savings: savings,
    enrollment: ENROLLMENT_FEE
  };
}

/* ──────────────────────────────────────────────────────────────────────────
   3. CATÁLOGO DE ASIGNATURAS
   ────────────────────────────────────────────────────────────────────────── */
export const PAES_SUBJECTS = [
  { 
    id: "m1",  
    name: "Matemática M1", 
    category: "Obligatorio",
    icon: "📐", 
    desc: "Eje Números, Álgebra y Funciones, Geometría, Probabilidades." 
  },
  { 
    id: "len", 
    name: "Comprensión Lectora", 
    category: "Obligatorio",
    icon: "📚",
    desc: "Estrategias de lectura, rastreo de información y evaluación."
  },
  { 
    id: "m2",  
    name: "Matemática M2", 
    category: "Electivo",
    icon: "🚀",
    desc: "Profundización para carreras STEM (Ingenierías, Ciencias)."
  },
  { 
    id: "his", 
    name: "Historia y Cs. Sociales", 
    category: "Electivo",
    icon: "🏛️",
    desc: "Historia de Chile, Formación Ciudadana y Economía."
  },
  { 
    id: "bio", 
    name: "Ciencias - Biología", 
    category: "Ciencias",
    icon: "🧬",
    desc: "Organización, estructura y actividad celular. Procesos y funciones."
  },
  { 
    id: "fis", 
    name: "Ciencias - Física", 
    category: "Ciencias",
    icon: "⚡",
    desc: "Mecánica, Energía, Electricidad y Ondas."
  },
  { 
    id: "qui", 
    name: "Ciencias - Química", 
    category: "Ciencias",
    icon: "🧪",
    desc: "Reacciones, Estequiometría, Química Orgánica."
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   4. COMBOS PRE-ARMADOS (Marketing Visual)
   ────────────────────────────────────────────────────────────────────────── */
export const PAES_COMBOS = [
  {
    id: "humanista",
    title: "Pack Humanista",
    subtitle: "Para Derecho, Psicología, Periodismo...",
    subjects: ["len", "his", "m1"], // IDs de los ramos
    price: 27990,
    features: ["Lenguaje + Historia + M1", "3 Ensayos Mensuales", "Tutoría Vocacional"],
    color: "amber"
  },
  {
    id: "salud",
    title: "Pack Salud",
    subtitle: "Para Medicina, Enfermería, Kine...",
    subjects: ["len", "m1", "m2", "bio", "qui"], 
    price: 34990, // Aplica Tarifa Plana
    features: ["Plan Full (5 Ramos)", "M1 + M2 + Lenguaje", "Biología + Química"],
    tag: "Más Vendido",
    color: "teal"
  },
  {
    id: "ingenieria",
    title: "Pack Ingeniería",
    subtitle: "Para Civil, Informática, Arquitectura...",
    subjects: ["len", "m1", "m2", "fis"], 
    price: 34990, // Aplica Tarifa Plana
    features: ["Física + M1 + M2", "Lenguaje Intensivo", "Refuerzo Cálculo"],
    color: "indigo"
  }
];