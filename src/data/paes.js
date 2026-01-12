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
 */
export function computePaesPrice(selectedIds = []) {
  const count = selectedIds.length;
  
  // Lista de precios escalonada
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
   3. ADAPTADORES (NECESARIOS PARA QUE LA PÁGINA COMPILE)
   --------------------------------------------------------------------------
   Estas funciones conectan tu nueva lógica con lo que espera el archivo PAES.jsx
   ────────────────────────────────────────────────────────────────────────── */

// La página espera esta función para calcular el precio según IDs
export const priceForSubjects = (ids) => {
  const result = computePaesPrice(ids);
  return result.totalMonthly;
};

// La página espera esta función para mostrar precios en las tarjetas "desde X"
export const priceForCount = (count) => {
  // Creamos un array falso de longitud 'count' para usar tu calculadora central
  const dummyIds = Array(count).fill('dummy'); 
  return computePaesPrice(dummyIds).totalMonthly;
};

// Funciones auxiliares antiguas (por seguridad, para evitar errores si algo las llama)
export const essaysForCount = (count) => count * 2; 
export const priceAnnual = (ids) => priceForSubjects(ids) * ACADEMIC_MONTHS;


/* ──────────────────────────────────────────────────────────────────────────
   4. CATÁLOGO DE ASIGNATURAS
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
   5. COMBOS PRE-ARMADOS
   ────────────────────────────────────────────────────────────────────────── */
export const PAES_COMBOS = [
  {
    id: "humanista",
    title: "Pack Humanista",
    subtitle: "Para Derecho, Psicología, Periodismo...",
    subjects: ["len", "his", "m1"], 
    price: 27990,
    features: ["Lenguaje + Historia + M1", "3 Ensayos Mensuales", "Tutoría Vocacional"],
    color: "amber"
  },
  {
    id: "salud",
    title: "Pack Salud",
    subtitle: "Para Medicina, Enfermería, Kine...",
    subjects: ["len", "m1", "m2", "bio", "qui"], 
    price: 34990, 
    features: ["Plan Full (5 Ramos)", "M1 + M2 + Lenguaje", "Biología + Química"],
    tag: "Más Vendido",
    color: "teal"
  },
  {
    id: "ingenieria",
    title: "Pack Ingeniería",
    subtitle: "Para Civil, Informática, Arquitectura...",
    subjects: ["len", "m1", "m2", "fis"], 
    price: 34990, 
    features: ["Física + M1 + M2", "Lenguaje Intensivo", "Refuerzo Cálculo"],
    color: "indigo"
  }
];