// src/data/idiomas.js

/* ──────────────────────────────────────────────────────────────────────────
   LÓGICA DE NEGOCIO Y PRECIOS (Estrategia de Volumen)
   ────────────────────────────────────────────────────────────────────────── */

// 🧾 Matrícula: Baja barrera de entrada para captar datos y compromiso.
export const ENROLLMENT_FEE = 10990;

/**
 * 🧠 CALCULADORA DE PRECIOS "PACKS"
 * Objetivo: Que el usuario sienta que "pierde dinero" si solo se inscribe en uno.
 * - 1 Idioma: $17.990 (Precio gancho)
 * - 2 Idiomas: $32.990 (Ticket promedio buscado)
 * - 3+ Idiomas: $45.990 (La "Beca Lael" implícita)
 */
export function computeLangBundle(n) {
  const count = Math.max(0, Number(n || 0));
  if (count === 0) return 0;
  if (count === 1) return 17990; 
  if (count === 2) return 32990; // Ahorro visible
  if (count >= 3) return 45990;  // Oferta "No Brainer"
  return 0;
}

// 🔢 Helper moneda
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

/* ──────────────────────────────────────────────────────────────────────────
   CATÁLOGO GLOBAL (DATA VISUAL)
   ────────────────────────────────────────────────────────────────────────── */
export const LANGUAGES = [
  // 1. INGLÉS (La Base)
  {
    id: "ingles",
    code: "EN",
    name: "English Career Booster",
    emoji: "🇺🇸", 
    color: "#3b82f6", // Royal Blue
    badge: "Alta Empleabilidad",
    summary:
      "El idioma universal de los negocios. No te enseñamos solo gramática; te entrenamos para entrevistas, reuniones y viajes. Pasa de 'entenderlo' a 'hablarlo'.",
    includes: [
      "Preparación IELTS/TOEFL",
      "Simulación de entrevistas laborales",
      "Club de conversación semanal",
      "Inglés para Tech y Negocios",
    ],
    levels: ["A1 (Foundations)", "A2 (Elementary)", "B1 (Intermediate)", "B2 (Advanced)"],
    outcomes: [
      "Duplicar tus opciones laborales",
      "Working Holiday sin miedo",
      "Consumo de contenido en idioma original",
    ],
  },

  // 2. COREANO (El Hype)
  {
    id: "coreano",
    code: "KR",
    name: "Coreano + K-Culture",
    emoji: "🇰🇷",
    color: "#ec4899", // Pink Pop
    badge: "Tendencia Mundial",
    summary:
      "Súbete a la ola Hallyu. Un programa dinámico que mezcla la estructura académica del examen TOPIK con el análisis de K-Dramas y música actual.",
    includes: [
      "Hangul (Alfabeto) en 4 clases",
      "Preparación examen TOPIK I",
      "Cultura, etiqueta y jerarquías",
      "Análisis de letras y guiones",
    ],
    levels: ["Nivel 1 (Hangul)", "Nivel 2 (Básico)", "Nivel 3 (Pre-Intermedio)"],
    outcomes: [
      "Viajar a Seúl con confianza",
      "Entender a tus idols sin subtítulos",
      "Becas GKS (Gobierno Coreano)",
    ],
  },

  // 3. CHINO MANDARÍN (Visión de Futuro - Coming Soon)
  {
    id: "chino",
    code: "CN",
    name: "Mandarín de Negocios",
    emoji: "🇨🇳",
    color: "#ef4444", // Red China
    badge: "Futuro",
    summary:
      "El idioma del comercio global. Prepárate para el futuro dominando los tonos y caracteres del gigante asiático. Enfoque en HSK (Certificación oficial).",
    includes: [
      "Introducción al Pinyin (Tonos)",
      "Caracteres básicos (Hanzi)",
      "Cultura de negocios china",
    ],
    levels: ["HSK 1", "HSK 2"],
    outcomes: ["Importación/Exportación", "Diferenciación CV"],
    comingSoon: true, // Estrategia: Mostrar que el instituto crece
  },

  // 4. JAPONÉS (Nicho Fiel - Coming Soon)
  {
    id: "japones",
    code: "JP",
    name: "Japonés Nihongo",
    emoji: "🇯🇵",
    color: "#dc2626", // Red Japan
    summary:
      "Desde el Anime hasta la tecnología de punta. Domina los tres sistemas de escritura y sumérgete en una cultura milenaria.",
    includes: [
      "Hiragana y Katakana",
      "Kanji básico",
      "Japonés para viajeros",
    ],
    levels: ["N5 (Inicial)", "N4 (Básico)"],
    outcomes: ["Leer Manga", "Turismo en Japón"],
    comingSoon: true, 
  },

  // 5. ESPAÑOL (Nicho Local)
  {
    id: "espanol",
    code: "ES",
    name: "Spanish for Expats",
    emoji: "🇨🇱",
    color: "#f59e0b", // Amber
    summary:
      "Curso práctico de español chileno para extranjeros. Enfocado en trámites migratorios, inserción laboral y comprensión de la cultura local.",
    includes: [
      "Chilenismos y modismos",
      "Español para trámites legales",
      "Cultura y sociedad chilena",
    ],
    levels: ["A1 (Survival)", "A2 (Basic)", "B1 (Work)"],
    outcomes: [
      "Integración rápida",
      "Gestión de visas y contratos",
    ],
  },

  // 6. ITALIANO (Cultura y Arte - Coming Soon)
  {
    id: "italiano",
    code: "IT",
    name: "Italiano Dolce Vita",
    emoji: "🇮🇹",
    color: "#16a34a", // Green Italy
    summary:
      "El idioma del arte, la moda y la gastronomía. Conecta con tus raíces o prepárate para recorrer Europa con estilo.",
    includes: [
      "Pronunciación y gestualidad",
      "Italiano para turismo",
      "Ciudadanía por descendencia",
    ],
    levels: ["A1", "A2"],
    outcomes: ["Tramitación Pasaporte", "Turismo"],
    comingSoon: true,
  },
];