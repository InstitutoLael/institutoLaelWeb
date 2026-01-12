// src/data/idiomas.js

/* ──────────────────────────────────────────────────────────────────────────
   1. CONFIGURACIÓN DE PRECIOS Y MATRÍCULA
   ────────────────────────────────────────────────────────────────────────── */

// 🧾 Matrícula Anual (Pago único al inscribirse)
export const ENROLLMENT_FEE = 10990;

// 🔢 Helper para formatear dinero a Peso Chileno (CLP)
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

/**
 * 🧠 CALCULADORA DE PACKS (Lógica de Descuentos)
 * Esta función es la que llama la página web para saber cuánto cobrar.
 * Devuelve un OBJETO con el total mensual.
 */
export function computeLangBundle(n) {
  const count = Math.max(0, Number(n || 0));

  // Precios Base
  const PRICE_1 = 17990; // 1 Curso
  const PRICE_2 = 32990; // 2 Cursos (Ahorras ~$3.000)
  const PRICE_3 = 45990; // 3+ Cursos (Plan Políglota - Ahorro masivo)

  let total = 0;
  let label = "";

  if (count === 0) {
    total = 0;
    label = "Sin selección";
  } else if (count === 1) {
    total = PRICE_1;
    label = "Plan Mensual (1 Idioma)";
  } else if (count === 2) {
    total = PRICE_2;
    label = "Plan Dúo (Descuento aplicado)";
  } else {
    // Para 3 o más
    total = PRICE_3;
    label = "Plan Políglota (Tarifa Plana)";
  }

  // IMPORTANTE: Devolvemos un objeto con la propiedad totalMonthly
  // para que Idiomas.jsx lo pueda leer correctamente.
  return {
    totalMonthly: total, 
    label: label,
    count: count
  };
}

/* ──────────────────────────────────────────────────────────────────────────
   2. CATÁLOGO DE CURSOS (DATA)
   ────────────────────────────────────────────────────────────────────────── */
export const LANGUAGES = [
  // 1. INGLÉS
  {
    id: "ingles",
    code: "EN",
    name: "English Booster",
    emoji: "🇺🇸", 
    color: "#3b82f6",
    badge: "Alta Empleabilidad",
    summary: "No enseñamos solo gramática; te entrenamos para el mundo real. Preparación IELTS/TOEFL y Business English.",
    includes: [
      "Simulación de entrevistas laborales",
      "Club de conversación semanal",
      "Inglés para Tech y Negocios",
    ],
    levels: ["A1 (Básico)", "A2 (Elemental)", "B1 (Intermedio)", "B2 (Avanzado)"],
    comingSoon: false,
  },

  // 2. COREANO
  {
    id: "coreano",
    code: "KR",
    name: "Coreano + Cultura",
    emoji: "🇰🇷",
    color: "#ec4899",
    badge: "Tendencia",
    summary: "Desde el Hangul hasta la fluidez. Mezclamos estructura académica TOPIK con análisis de K-Dramas y cultura.",
    includes: [
      "Alfabeto Hangul en 4 clases",
      "Preparación examen TOPIK I",
      "Etiqueta y jerarquías",
    ],
    levels: ["Nivel 1 (Inicial)", "Nivel 2 (Básico)", "Nivel 3 (Pre-Intermedio)"],
    comingSoon: false,
  },

  // 3. JAPONÉS (PRONTO)
  {
    id: "japones",
    code: "JP",
    name: "Japonés Nihongo",
    emoji: "🇯🇵",
    color: "#dc2626",
    summary: "Domina Hiragana, Katakana y Kanji básico. Sumérgete en una cultura milenaria y moderna a la vez.",
    levels: ["N5 (Inicial)", "N4 (Básico)"],
    comingSoon: true, // Esto activa el botón gris en la web
  },

  // 4. CHINO MANDARÍN (PRONTO)
  {
    id: "chino",
    code: "CN",
    name: "Mandarín Negocios",
    emoji: "🇨🇳",
    color: "#ef4444",
    summary: "El idioma del futuro comercial. Tonos, Pinyin y caracteres simplificados para negocios.",
    levels: ["HSK 1", "HSK 2"],
    comingSoon: true,
  },

  // 5. ESPAÑOL PARA EXTRANJEROS
  {
    id: "espanol",
    code: "ES",
    name: "Spanish for Expats",
    emoji: "🇨🇱",
    color: "#f59e0b",
    summary: "Español chileno práctico. Enfocado en trámites migratorios, inserción laboral y cultura local.",
    levels: ["A1 (Survival)", "A2 (Basic)", "B1 (Work)"],
    comingSoon: false,
  },

  // 6. ITALIANO (PRONTO)
  {
    id: "italiano",
    code: "IT",
    name: "Italiano Dolce Vita",
    emoji: "🇮🇹",
    color: "#16a34a",
    summary: "El idioma del arte y la gastronomía. Ideal para turismo o ciudadanía por descendencia.",
    levels: ["A1", "A2"],
    comingSoon: true,
  },
];