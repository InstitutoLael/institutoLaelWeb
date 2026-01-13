// src/data/homeschool.js
// === Nivelación Académica y Preparación PAES ===

/* ──────────────────────────────────────────────────────────────────────────
   1. CONFIGURACIÓN BASE (Aquí faltaba la variable)
   ────────────────────────────────────────────────────────────────────────── */
export const ENROLLMENT_FEE = 35000; // <--- ESTO FALTABA
export const MATRICULA_LABEL = "Matrícula Anual 2026";

export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

/* ──────────────────────────────────────────────────────────────────────────
   2. NIVELES EDUCATIVOS
   ────────────────────────────────────────────────────────────────────────── */
export const LEVELS = [
  { 
    id: "basica", 
    name: "Educación Básica", 
    desc: "1° a 8° Básico", 
    basePrice: 25000, // Precio base por asignatura
    icon: "🎒" 
  },
  { 
    id: "media", 
    name: "Educación Media", 
    desc: "I° a IV° Medio", 
    basePrice: 28000, 
    icon: "📓" 
  },
  { 
    id: "paes", 
    name: "Preparación PAES", 
    desc: "Egresados y 4° Medio", 
    basePrice: 35000, 
    icon: "🚀" 
  },
  { 
    id: "adultos", 
    name: "Exámenes Libres (Adultos)", 
    desc: "2x1 Laboral", 
    basePrice: 30000, 
    icon: "🎓" 
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   3. ASIGNATURAS DISPONIBLES
   ────────────────────────────────────────────────────────────────────────── */
export const SUBJECTS = [
  { id: "mat", name: "Matemáticas", icon: "📐" },
  { id: "len", name: "Lenguaje y Comunicación", icon: "📖" },
  { id: "ing", name: "Inglés", icon: "🇬🇧" },
  { id: "hist", name: "Historia y Geografía", icon: "🌍" },
  { id: "cie", name: "Ciencias (Biología/Física/Química)", icon: "🧬" },
];

/* ──────────────────────────────────────────────────────────────────────────
   4. PACKS DE DESCUENTO
   ────────────────────────────────────────────────────────────────────────── */
// Si tomas 3 o más asignaturas, aplicamos descuento
const PACK_DISCOUNT_THRESHOLD = 3; 
const PACK_DISCOUNT_PERCENTAGE = 0.15; // 15% de descuento

/* ──────────────────────────────────────────────────────────────────────────
   5. LÓGICA DE CÁLCULO DE PRECIO
   ────────────────────────────────────────────────────────────────────────── */
export function calculateHomeschoolPrice(levelId, selectedSubjects = []) {
  // 1. Buscar nivel
  const level = LEVELS.find(l => l.id === levelId);
  if (!level) return { monthly: 0, enrollment: 0, discount: 0, label: "Seleccione Nivel" };

  const subjectCount = selectedSubjects.length;
  
  // 2. Calcular precio base (Cantidad * Precio del nivel)
  let rawMonthly = subjectCount * level.basePrice;

  // 3. Calcular descuento por Pack
  let discountAmount = 0;
  let isPack = false;

  if (subjectCount >= PACK_DISCOUNT_THRESHOLD) {
    discountAmount = rawMonthly * PACK_DISCOUNT_PERCENTAGE;
    isPack = true;
  }

  // 4. Precio Final
  const finalMonthly = rawMonthly - discountAmount;

  return {
    monthly: finalMonthly,
    enrollment: ENROLLMENT_FEE,
    basePrice: level.basePrice,
    subjectCount,
    discount: discountAmount,
    isPack,
    levelName: level.name
  };
}