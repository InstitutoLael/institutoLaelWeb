// src/data/idiomas.js

// Matrícula única (no mensual)
export const ENROLLMENT_FEE = 7990;

// Catálogo de idiomas (puedes sumar más)
export const LANGUAGES = [
  {
    id: "espanol",
    code: "ES",
    name: "Español para Extranjeros (ELE)",
    emoji: "🇨🇱",
    color: "#f59e0b",
    summary:
      "Comunicación práctica para vivir, estudiar o trabajar en Chile. Enfoque en comprensión y situaciones reales.",
    includes: [
      "Clases en vivo (Zoom/Meet)",
      "Cápsulas grabadas y quizzes",
      "Vocabulario de trámites y vida diaria",
      "Práctica de conversación guiada",
    ],
    levels: ["Inicial A1–A2", "Funcional B1"],
    outcomes: [
      "Integración y vida cotidiana en Chile",
      "Trabajo y estudios con mejor comunicación",
      "Bases para certificaciones internacionales",
    ],
  },
  {
    id: "ingles",
    code: "EN",
    name: "Inglés",
    emoji: "🇬🇧",
    color: "#2563eb",
    summary:
      "Para viajes, trabajo y estudios: conversación real, listening y pronunciación con foco en fluidez.",
    includes: [
      "Clases en vivo (Zoom/Meet)",
      "Cápsulas grabadas",
      "Material descargable y quizzes",
      "Simulaciones de entrevista",
    ],
    levels: ["Inicial A1–A2", "Funcional B1", "Avanzado B2+"],
    outcomes: [
      "Viajes con confianza",
      "Atención a clientes internacionales",
      "Postulación a becas/intercambio",
    ],
  },
  {
    id: "coreano",
    code: "KR",
    name: "Coreano (TOPIK I)",
    emoji: "🇰🇷",
    color: "#ef4444",
    summary:
      "Base sólida para TOPIK I: lectura, vocabulario esencial y cultura K como motivación.",
    includes: [
      "Hangul desde cero",
      "Vocabulario + gramática TOPIK I",
      "Ejercicios tipo prueba",
      "Cultura / K-life para conversación",
    ],
    levels: ["TOPIK I · Preparación"],
    outcomes: ["Certificación TOPIK I", "Bases para TOPIK II", "Viajes/Estudios"],
  },
  {
    id: "portugues",
    code: "PT",
    name: "Portugués (2026)",
    emoji: "🇧🇷",
    color: "#16a34a",
    summary:
      "Programa en preparación con foco en empleabilidad regional, turismo y negocios MERCOSUR.",
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