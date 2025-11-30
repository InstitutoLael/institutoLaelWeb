// src/data/idiomas.js

// 🧾 Matrícula única
// Subimos a 10.990. Esto filtra a los curiosos de los comprometidos
// y te da flujo de caja inmediato para pagar publicidad.
export const ENROLLMENT_FEE = 10990;

/**
 * 🧠 LÓGICA DE PRECIOS 2025
 * Objetivo: Pagar al docente ~7.000 - 8.000 por alumno.
 * * 1 Curso: $17.990
 * -> Si tienes 10 alumnos: Ingresas $179.900.
 * -> Pagas al profe: $75.000 ($7.500 x 10).
 * -> Te quedan: $104.900 (Margen > 50%).
 * * Es un precio psicológico bajo (menos de 20 mil) pero rentable.
 */

export function computeLangBundle(n) {
  if (n <= 0) return 0;
  // Estrategia: Incentivar que tomen 2 idiomas o inviten a un amigo
  if (n === 1) return 17990;   // Precio base (rentable)
  if (n === 2) return 32990;   // Ahorran $3.000 aprox
  if (n >= 3) return 45990;    // "Oferta Loca": ~$15.300 c/u
  return 0;
}

// CLP helper
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

// Catálogo de idiomas mejorado en copy para justificar el nuevo valor
export const LANGUAGES = [
  {
    id: "ingles",
    code: "EN",
    name: "Inglés Comunicativo",
    emoji: "🇺🇸", // Bandera USA suele vender más en Latam por trabajo/viajes
    color: "#2563eb",
    summary:
      "Deja de traducir en tu mente. Enfoque 100% en perder el miedo a hablar, pronunciación y vocabulario laboral.",
    includes: [
      "Clases en vivo con feedback real",
      "Simulacros de entrevista y viajes",
      "Material digital incluido",
      "Club de conversación semanal",
    ],
    levels: ["Básico A1-A2", "Pre-Intermedio B1", "Intermedio B2"],
    outcomes: [
      "Viajar sin depender del traductor",
      "Mejorar oportunidades laborales",
      "Entender series y música",
    ],
  },
  {
    id: "coreano",
    code: "KR",
    name: "Coreano + Cultura K",
    emoji: "🇰🇷",
    color: "#ef4444",
    summary:
      "Mucho más que el alfabeto. Aprende el idioma a través de la cultura, K-Dramas y preparación para certificación.",
    includes: [
      "Hangul (alfabeto) desde cero",
      "Gramática para el examen TOPIK I",
      "Análisis de K-Pop y Dramas",
      "Etiqueta y cultura coreana",
    ],
    levels: ["Nivel 1 (Hangul)", "Nivel 2 (Frases)", "Nivel 3 (TOPIK)"],
    outcomes: [
      "Leer y escribir Hangul fluido",
      "Entender a tus idols sin subtítulos",
      "Certificación internacional TOPIK I",
    ],
  },
  {
    id: "espanol",
    code: "ES",
    name: "Español para Extranjeros",
    emoji: "🇨🇱",
    color: "#f59e0b",
    summary:
      "Domina el español de Chile. Clases prácticas para trámites, trabajo y vida social en el país.",
    includes: [
      "Chilenismos y cultura local",
      "Español para trámites y visas",
      "Redacción de correos formales",
      "Práctica de fluidez diaria",
    ],
    levels: ["Sobrevivencia (A1-A2)", "Laboral (B1)"],
    outcomes: [
      "Integración rápida en Chile",
      "Mejor desempeño en entrevistas",
      "Confianza al hablar con nativos",
    ],
  },
  {
    id: "portugues",
    code: "PT",
    name: "Portugués (2026)",
    emoji: "🇧🇷",
    color: "#16a34a",
    summary:
      "El idioma de los negocios y el turismo en Sudamérica. Programa intensivo de conversación.",
    includes: [
      "Fonética y pronunciación",
      "Portugués de negocios",
      "Cultura brasileña",
    ],
    levels: ["Inicial → Intermedio"],
    outcomes: ["Turismo", "Negocios Mercosur"],
    comingSoon: true, // Esto desactiva el botón de compra en la UI
  },
];