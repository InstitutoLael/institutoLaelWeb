// src/data/idiomas.js

// Matrícula única (no mensual)
export const ENROLLMENT_FEE = 7990;

// Catálogo de idiomas (puedes sumar más)
export const LANGUAGES = [
  {
    id: "ingles",
    code: "EN",
    name: "Inglés",
    emoji: "🇬🇧",
    color: "#2563eb",
    summary:
      "Para viajes, trabajo y estudios. Comunicación real, pronunciación y escucha.",
    includes: [
      "Clases en vivo (Zoom/Meet)",
      "Cápsulas grabadas",
      "Material descargable y quizzes",
      "Simulaciones de entrevista",
    ],
    levels: ["Inicial A1-A2", "Funcional B1", "Avanzado B2+"],
    outcomes: [
      "Viajes con confianza",
      "Trabajo con clientes internacionales",
      "Postulación a becas/Intercambio",
    ],
  },
  {
    id: "coreano",
    code: "KR",
    name: "Coreano (TOPIK 1)",
    emoji: "🇰🇷",
    color: "#ef4444",
    summary:
      "Base sólida para TOPIK 1: lectura, vocabulario esencial y cultura K.",
    includes: [
      "Hangul desde cero",
      "Vocabulario + gramática TOPIK 1",
      "Ejercicios tipo prueba",
      "Cultura/K-life para motivación",
    ],
    levels: ["TOPIK 1 · Preparación"],
    outcomes: ["Certificación TOPIK 1", "Bases para TOPIK 2", "Viajes/Estudios"],
  },
  {
    id: "portugues",
    code: "PT",
    name: "Portugués (2026)",
    emoji: "🇧🇷",
    color: "#16a34a",
    summary:
      "Programa en preparación: enfoque en empleabilidad regional y turismo.",
    includes: [
      "Conversación guiada",
      "Vocabulario laboral",
      "Cultura y fonética",
      "Quizzes y cápsulas",
    ],
    levels: ["Inicial → Funcional"],
    outcomes: ["Empleabilidad Mercosur", "Viajes", "Relaciones comerciales"],
    comingSoon: true,
  },
];

// Precios “bundle” (mejor margen y fomenta multi-curso)
export function computeLangBundle(n) {
  if (n <= 0) return 0;
  if (n === 1) return 11990;   // 1 curso
  if (n === 2) return 21900;   // 2 cursos
  if (n >= 3) return 29900;    // 3+
  return 0;
}

// CLP helper
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });
