// src/data/idiomas.js

/* ──────────────────────────────────────────────────────────────────────────
   LÓGICA DE NEGOCIO Y PRECIOS (2025-2026)
   ────────────────────────────────────────────────────────────────────────── */

// 🧾 Matrícula única (Filtro de compromiso + Flujo de caja inmediato)
export const ENROLLMENT_FEE = 10990;

/**
 * 🧠 CALCULADORA DE PRECIOS "BUNDLE"
 * Estrategia: Margen > 50% para el instituto.
 * * - 1 Idioma: $17.990 (Barrera de entrada baja, ganancia por volumen)
 * - 2 Idiomas: $32.990 (Ticket promedio ideal)
 * - 3+ Idiomas: $45.990 (La "Oferta Irresistible")
 */
export function computeLangBundle(n) {
  const count = Math.max(0, Number(n || 0));
  if (count === 0) return 0;
  if (count === 1) return 17990; 
  if (count === 2) return 32990; // Ahorro visible
  if (count >= 3) return 45990;  // Ganga absoluta
  return 0;
}

// 🔢 Formateador de moneda CLP
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

/* ──────────────────────────────────────────────────────────────────────────
   CATÁLOGO DE IDIOMAS (DATA VISUAL)
   ────────────────────────────────────────────────────────────────────────── */
export const LANGUAGES = [
  // 1. INGLÉS (El Producto Estrella)
  {
    id: "ingles",
    code: "EN",
    name: "Inglés Comunicativo",
    emoji: "🇺🇸", 
    color: "#3b82f6", // Azul Intenso
    badge: "Más Vendido",
    summary:
      "Deja de traducir en tu mente. Nuestro método se enfoca 100% en perder el miedo a hablar, mejorar tu pronunciación y prepararte para el mundo laboral real.",
    includes: [
      "Role-plays de situaciones reales",
      "Simulacros de entrevista laboral",
      "Club de conversación semanal",
      "Material PDF incluido",
    ],
    // Niveles cortos para los botones del UI
    levels: ["A1 (Básico)", "A2 (Elem.)", "B1 (Interm.)", "B2 (Avanz.)"],
    outcomes: [
      "Viajar sin depender del traductor",
      "Acceder a mejores sueldos",
      "Entender series en audio original",
    ],
  },

  // 2. COREANO (El Fenómeno Viral)
  {
    id: "coreano",
    code: "KR",
    name: "Coreano + Cultura K",
    emoji: "🇰🇷",
    color: "#ec4899", // Rosa K-Pop
    badge: "Tendencia",
    summary:
      "Mucho más que el alfabeto. Aprende el idioma a través de la cultura, K-Dramas y K-Pop. Prepárate para tu viaje soñado o certificación TOPIK.",
    includes: [
      "Hangul (alfabeto) desde cero",
      "Gramática enfocada en TOPIK I",
      "Análisis de letras de canciones",
      "Etiqueta y cultura coreana",
    ],
    levels: ["Nivel 1 (Hangul)", "Nivel 2 (Básico)", "Nivel 3 (TOPIK)"],
    outcomes: [
      "Leer y escribir Hangul fluido",
      "Entender a tus idols sin subtítulos",
      "Certificación internacional",
    ],
  },

  // 3. JAPONÉS (La Nueva Joya - PÉTICIÓN AGREGADA)
  {
    id: "japones",
    code: "JP",
    name: "Japonés Inicial",
    emoji: "🇯🇵",
    color: "#ef4444", // Rojo Japón
    summary:
      "El idioma del anime y la tecnología. Domina los silabarios Hiragana y Katakana y empieza a construir tus primeras oraciones para viajar a Tokio.",
    includes: [
      "Escritura (Hiragana/Katakana)",
      "Frases de supervivencia",
      "Cultura y etiqueta japonesa",
    ],
    levels: ["N5 (Inicial)", "N4 (Básico)"],
    outcomes: ["Leer manga básico", "Turismo en Japón"],
    comingSoon: true, // Activa el modo "Lista de Espera"
  },

  // 4. ESPAÑOL (Nicho Rentable)
  {
    id: "espanol",
    code: "ES",
    name: "Español para Extranjeros",
    emoji: "🇨🇱",
    color: "#f59e0b", // Amarillo/Ámbar
    summary:
      "Domina el español de Chile. Clases 100% prácticas diseñadas para ayudarte con trámites, conseguir trabajo y socializar con confianza.",
    includes: [
      "Chilenismos y cultura local",
      "Español para trámites y visas",
      "Simulación de entrevistas",
      "Práctica de fluidez diaria",
    ],
    levels: ["A1 (Sobrevivencia)", "A2 (Básico)", "B1 (Laboral)"],
    outcomes: [
      "Integración rápida en Chile",
      "Mejor desempeño laboral",
      "Hacer amigos locales",
    ],
  },

  // 5. PORTUGUÉS (Futuro)
  {
    id: "portugues",
    code: "PT",
    name: "Portugués Brasil",
    emoji: "🇧🇷",
    color: "#16a34a", // Verde Brasil
    summary:
      "El idioma de los negocios y el turismo en Sudamérica. Programa intensivo de conversación para viajeros y profesionales.",
    includes: [
      "Fonética y pronunciación",
      "Portugués de negocios",
      "Cultura brasileña",
    ],
    levels: ["Inicial", "Intermedio"],
    outcomes: ["Turismo", "Negocios Mercosur"],
    comingSoon: true, 
  },
];