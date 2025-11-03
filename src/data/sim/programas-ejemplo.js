// src/data/sim/programas-ejemplo.js
// Fuente: Ponderaciones preliminares U. de Chile Admisión 2026 (según info que enviaste).
// Notas:
// - CL=Competencia Lectora, M1=Matemática 1, M2=Matemática 2, HIS=Historia y Cs. Sociales, CIEN=Ciencias,
//   NEM=Notas, RANK=Ranking.
// - requiereM2 = true si M2 > 0.
// - corteRef: lo dejé null (ajústalo cuando tengas cortes oficiales/referenciales).
// - Donde apliquen requisitos/observaciones de tu tabla (números entre paréntesis), van en `notas`.

export const PROGRAMAS = [
  // ───────────────────────────────────────────────────────────────────────────
  // MODALIDAD: PROGRAMA ACADÉMICO DE BACHILLERATO
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "uch-bachillerato",
    universidad: "Universidad de Chile",
    sede: "Casa Central",
    carrera: "Programa Académico de Bachillerato",
    requiereM2: true, // M2=25%
    ponderaciones: { NEM: 0.20, RANK: 0.20, CL: 0.25, M1: 0.25, M2: 0.00, HIS: 0.10, CIEN: 0.00 },
    // OJO: tu tabla muestra 10% electiva (HCS o CIEN). El simulador toma el mejor si pones ambos.
    // Para reflejar "electiva 10%", duplícalo en HIS y CIEN con 0.10 cada uno y documenta que se usa la mejor.
    // Si prefieres exacto-estricto, deja solo HIS:0.10 (como está en el PDF) o CIEN:0.10 según indique la malla.
    notas: "Electiva 10% (HCS o Ciencias): el simulador tomará la mejor. (1)(2)",
    corteRef: null,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // FACULTAD DE ARQUITECTURA Y URBANISMO
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "uch-arquitectura",
    universidad: "Universidad de Chile",
    sede: "FAU",
    carrera: "Arquitectura",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.20, M1: 0.30, M2: 0.10, HIS: 0.10, CIEN: 0.00 },
    notas: "(1)(3)",
    corteRef: null,
  },
  {
    id: "uch-diseno",
    universidad: "Universidad de Chile",
    sede: "FAU",
    carrera: "Diseño",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.30, CL: 0.25, M1: 0.25, M2: 0.00, HIS: 0.10, CIEN: 0.00 },
    notas: "(1)(4)",
    corteRef: null,
  },
  {
    id: "uch-geografia",
    universidad: "Universidad de Chile",
    sede: "FAU",
    carrera: "Geografía",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.25, CL: 0.20, M1: 0.25, M2: 0.00, HIS: 0.00, CIEN: 0.20 },
    notas: "(1)",
    corteRef: null,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // FACULTAD DE ARTES
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "uch-actuacion-teatral",
    universidad: "Universidad de Chile",
    sede: "Artes",
    carrera: "Actuación Teatral",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.10, CL: 0.10, M1: 0.10, M2: 0.00, HIS: 0.10, CIEN: 0.00 },
    notas: "(5)(6)",
    corteRef: null,
  },
  {
    id: "uch-artes-visuales",
    universidad: "Universidad de Chile",
    sede: "Artes",
    carrera: "Artes Visuales (Lic. en Artes con mención)",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.35, M1: 0.10, M2: 0.00, HIS: 0.25, CIEN: 0.00 },
    notas: "(5)",
    corteRef: null,
  },
  {
    id: "uch-danza",
    universidad: "Universidad de Chile",
    sede: "Artes",
    carrera: "Danza",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.10, CL: 0.10, M1: 0.10, M2: 0.00, HIS: 0.10, CIEN: 0.00 },
    notas: "(7)",
    corteRef: null,
  },
  {
    id: "uch-diseno-teatral",
    universidad: "Universidad de Chile",
    sede: "Artes",
    carrera: "Diseño Teatral",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.25, M1: 0.20, M2: 0.00, HIS: 0.25, CIEN: 0.00 },
    corteRef: null,
  },
  {
    id: "uch-ingenieria-en-sonido",
    universidad: "Universidad de Chile",
    sede: "Artes",
    carrera: "Ingeniería en Sonido",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.20, M1: 0.30, M2: 0.10, HIS: 0.00, CIEN: 0.10 },
    corteRef: null,
  },
  {
    id: "uch-teoria-musica",
    universidad: "Universidad de Chile",
    sede: "Artes",
    carrera: "Teoría de la Música",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.30, M1: 0.15, M2: 0.00, HIS: 0.25, CIEN: 0.00 },
    notas: "(8)",
    corteRef: null,
  },
  {
    id: "uch-teoria-historia-arte",
    universidad: "Universidad de Chile",
    sede: "Artes",
    carrera: "Teoría e Historia del Arte (Lic. en Artes con mención)",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.35, M1: 0.10, M2: 0.00, HIS: 0.25, CIEN: 0.00 },
    corteRef: null,
  },
  {
    id: "uch-composicion",
    universidad: "Universidad de Chile",
    sede: "Artes",
    carrera: "Composición (Lic. en Artes con mención)",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.10, CL: 0.10, M1: 0.10, M2: 0.00, HIS: 0.10, CIEN: 0.00 },
    notas: "(18)",
    corteRef: null,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // FACULTAD DE CIENCIAS
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "uch-biologia-lic-mencion",
    universidad: "Universidad de Chile",
    sede: "Ciencias",
    carrera: "Biología (Lic. en Ciencias con mención)",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.20, M1: 0.15, M2: 0.15, HIS: 0.00, CIEN: 0.20 },
    corteRef: null,
  },
  {
    id: "uch-biologia-medioambiente",
    universidad: "Universidad de Chile",
    sede: "Ciencias",
    carrera: "Biología con mención en Medio Ambiente",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.20, M1: 0.10, M2: 0.15, HIS: 0.00, CIEN: 0.25 },
    corteRef: null,
  },
  {
    id: "uch-fisica-lic",
    universidad: "Universidad de Chile",
    sede: "Ciencias",
    carrera: "Física (Lic. en Ciencias con mención)",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.20, M1: 0.20, M2: 0.20, HIS: 0.00, CIEN: 0.10 },
    corteRef: null,
  },
  {
    id: "uch-biotecnologia-molecular",
    universidad: "Universidad de Chile",
    sede: "Ciencias",
    carrera: "Ingeniería en Biotecnología Molecular",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.20, M1: 0.10, M2: 0.15, HIS: 0.00, CIEN: 0.25 },
    corteRef: null,
  },
  {
    id: "uch-matematicas-lic",
    universidad: "Universidad de Chile",
    sede: "Ciencias",
    carrera: "Matemáticas (Lic. en Ciencias con mención)",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.20, M1: 0.20, M2: 0.20, HIS: 0.00, CIEN: 0.10 },
    corteRef: null,
  },
  {
    id: "uch-ped-media-bioquimica",
    universidad: "Universidad de Chile",
    sede: "Ciencias",
    carrera: "Pedagogía en Educación Media en Biología y Química",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.20, M1: 0.15, M2: 0.10, HIS: 0.00, CIEN: 0.25 },
    notas: "(9)(10)",
    corteRef: null,
  },
  {
    id: "uch-ped-media-matematica-fisica",
    universidad: "Universidad de Chile",
    sede: "Ciencias",
    carrera: "Pedagogía en Educación Media en Matemática y Física",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.20, M1: 0.20, M2: 0.15, HIS: 0.00, CIEN: 0.15 },
    notas: "(9)(11)",
    corteRef: null,
  },
  {
    id: "uch-quimica-lic",
    universidad: "Universidad de Chile",
    sede: "Ciencias",
    carrera: "Química (Lic. en Ciencias con mención)",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.20, M1: 0.10, M2: 0.15, HIS: 0.00, CIEN: 0.25 },
    corteRef: null,
  },
  {
    id: "uch-quimica-ambiental",
    universidad: "Universidad de Chile",
    sede: "Ciencias",
    carrera: "Química Ambiental",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.20, M1: 0.10, M2: 0.15, HIS: 0.00, CIEN: 0.25 },
    corteRef: null,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // CIENCIAS AGRONÓMICAS
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "uch-agronomia",
    universidad: "Universidad de Chile",
    sede: "Ciencias Agronómicas",
    carrera: "Ingeniería Agronómica",
    requiereM2: true,
    ponderaciones: { NEM: 0.20, RANK: 0.40, CL: 0.10, M1: 0.20, M2: 0.00, HIS: 0.00, CIEN: 0.10 },
    notas: "(1)",
    corteRef: null,
  },
  {
    id: "uch-rnr-renovables",
    universidad: "Universidad de Chile",
    sede: "Ciencias Agronómicas",
    carrera: "Ingeniería en Recursos Naturales Renovables",
    requiereM2: true,
    ponderaciones: { NEM: 0.20, RANK: 0.40, CL: 0.10, M1: 0.15, M2: 0.05, HIS: 0.00, CIEN: 0.10 },
    notas: "(1)",
    corteRef: null,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // CIENCIAS FÍSICAS Y MATEMÁTICAS
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "uch-ingenieria-plan-comun",
    universidad: "Universidad de Chile",
    sede: "Beauchef",
    carrera: "Ingeniería y Ciencias - Plan Común",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.25, CL: 0.10, M1: 0.20, M2: 0.20, HIS: 0.00, CIEN: 0.15 },
    notas:
      "Conduce a Geología, Geofísica, Ingeniería Civil (menciones), Civil en Biotecnología, Computación, Eléctrica, Industrial, Matemática, Mecánica, Minas, Química; y Licenciaturas en Astronomía/Física.",
    corteRef: null,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // CIENCIAS FORESTALES
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "uch-forestal",
    universidad: "Universidad de Chile",
    sede: "Cs. Forestales",
    carrera: "Ingeniería Forestal",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.35, CL: 0.10, M1: 0.25, M2: 0.00, HIS: 0.00, CIEN: 0.20 },
    notas: "(1)",
    corteRef: null,
  },
  {
    id: "uch-recursos-hidricos",
    universidad: "Universidad de Chile",
    sede: "Cs. Forestales",
    carrera: "Ingeniería en Recursos Hídricos",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.30, CL: 0.10, M1: 0.25, M2: 0.05, HIS: 0.00, CIEN: 0.20 },
    notas: "(1)",
    corteRef: null,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // CIENCIAS QUÍMICAS Y FARMACÉUTICAS
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "uch-bioquimica",
    universidad: "Universidad de Chile",
    sede: "Cs. Químicas y Farmacéuticas",
    carrera: "Bioquímica",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.10, M1: 0.20, M2: 0.10, HIS: 0.00, CIEN: 0.30 },
    corteRef: null,
  },
  {
    id: "uch-ingenieria-alimentos",
    universidad: "Universidad de Chile",
    sede: "Cs. Químicas y Farmacéuticas",
    carrera: "Ingeniería en Alimentos",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.10, M1: 0.20, M2: 0.10, HIS: 0.00, CIEN: 0.30 },
    corteRef: null,
  },
  {
    id: "uch-quimica",
    universidad: "Universidad de Chile",
    sede: "Cs. Químicas y Farmacéuticas",
    carrera: "Química",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.10, M1: 0.20, M2: 0.10, HIS: 0.00, CIEN: 0.30 },
    corteRef: null,
  },
  {
    id: "uch-quimica-farmacia",
    universidad: "Universidad de Chile",
    sede: "Cs. Químicas y Farmacéuticas",
    carrera: "Química y Farmacia",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.10, M1: 0.20, M2: 0.10, HIS: 0.00, CIEN: 0.30 },
    notas: "(12)",
    corteRef: null,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // CIENCIAS SOCIALES
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "uch-antropologia-arqueologia",
    universidad: "Universidad de Chile",
    sede: "Cs. Sociales",
    carrera: "Antropología - Arqueología",
    requiereM2: true,
    ponderaciones: { NEM: 0.20, RANK: 0.20, CL: 0.20, M1: 0.15, M2: 0.00, HIS: 0.00, CIEN: 0.25 },
    corteRef: null,
  },
  {
    id: "uch-ped-parvularia",
    universidad: "Universidad de Chile",
    sede: "Cs. Sociales",
    carrera: "Pedagogía en Educación Parvularia",
    requiereM2: true,
    ponderaciones: { NEM: 0.30, RANK: 0.20, CL: 0.20, M1: 0.15, M2: 0.00, HIS: 0.00, CIEN: 0.15 },
    notas: "(1)(9)",
    corteRef: null,
  },
  {
    id: "uch-psicologia",
    universidad: "Universidad de Chile",
    sede: "Cs. Sociales",
    carrera: "Psicología",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.30, CL: 0.25, M1: 0.20, M2: 0.00, HIS: 0.00, CIEN: 0.15 },
    notas: "(1)",
    corteRef: null,
  },
  {
    id: "uch-sociologia",
    universidad: "Universidad de Chile",
    sede: "Cs. Sociales",
    carrera: "Sociología",
    requiereM2: true,
    ponderaciones: { NEM: 0.20, RANK: 0.20, CL: 0.25, M1: 0.20, M2: 0.00, HIS: 0.00, CIEN: 0.15 },
    corteRef: null,
  },
  {
    id: "uch-trabajo-social",
    universidad: "Universidad de Chile",
    sede: "Cs. Sociales",
    carrera: "Trabajo Social",
    requiereM2: true,
    ponderaciones: { NEM: 0.20, RANK: 0.20, CL: 0.25, M1: 0.20, M2: 0.00, HIS: 0.00, CIEN: 0.15 },
    notas: "(1)",
    corteRef: null,
  },
  {
    id: "uch-ped-educacion-fisica",
    universidad: "Universidad de Chile",
    sede: "Cs. Sociales",
    carrera: "Pedagogía en Educación Física",
    requiereM2: true,
    ponderaciones: { NEM: 0.20, RANK: 0.20, CL: 0.20, M1: 0.15, M2: 0.00, HIS: 0.00, CIEN: 0.25 },
    corteRef: null,
  },
  {
    id: "uch-ped-educacion-especial",
    universidad: "Universidad de Chile",
    sede: "Cs. Sociales",
    carrera: "Pedagogía en Educación Especial",
    requiereM2: true,
    ponderaciones: { NEM: 0.20, RANK: 0.20, CL: 0.20, M1: 0.20, M2: 0.00, HIS: 0.00, CIEN: 0.20 },
    corteRef: null,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // CIENCIAS VETERINARIAS Y PECUARIAS
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "uch-med-veterinaria",
    universidad: "Universidad de Chile",
    sede: "Cs. Veterinarias y Pecuarias",
    carrera: "Medicina Veterinaria",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.20, M1: 0.35, M2: 0.00, HIS: 0.00, CIEN: 0.15 },
    corteRef: null,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // COMUNICACIÓN E IMAGEN
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "uch-cine-tv",
    universidad: "Universidad de Chile",
    sede: "Comunicación e Imagen",
    carrera: "Cine y Televisión",
    requiereM2: true,
    ponderaciones: { NEM: 0.15, RANK: 0.25, CL: 0.25, M1: 0.20, M2: 0.00, HIS: 0.00, CIEN: 0.15 },
    notas: "(1)(13)",
    corteRef: null,
  },
  {
    id: "uch-periodismo",
    universidad: "Universidad de Chile",
    sede: "Comunicación e Imagen",
    carrera: "Periodismo",
    requiereM2: true,
    ponderaciones: { NEM: 0.15, RANK: 0.25, CL: 0.25, M1: 0.20, M2: 0.00, HIS: 0.00, CIEN: 0.15 },
    corteRef: null,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // DERECHO
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "uch-derecho",
    universidad: "Universidad de Chile",
    sede: "Derecho",
    carrera: "Derecho (Lic. en Cs. Jurídicas y Sociales)",
    requiereM2: true,
    ponderaciones: { NEM: 0.20, RANK: 0.20, CL: 0.25, M1: 0.10, M2: 0.00, HIS: 0.25, CIEN: 0.00 },
    notas: "(14)",
    corteRef: null,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // ECONOMÍA Y NEGOCIOS
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "uch-contador-auditor",
    universidad: "Universidad de Chile",
    sede: "FEN",
    carrera: "Contador Auditor",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.10, M1: 0.35, M2: 0.15, HIS: 0.00, CIEN: 0.10 },
    notas: "(1)",
    corteRef: null,
  },
  {
    id: "uch-ingenieria-comercial",
    universidad: "Universidad de Chile",
    sede: "FEN",
    carrera: "Ingeniería Comercial",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.10, M1: 0.35, M2: 0.15, HIS: 0.00, CIEN: 0.10 },
    notas: "(1)",
    corteRef: null,
  },
  {
    id: "uch-iicg",
    universidad: "Universidad de Chile",
    sede: "FEN",
    carrera: "Ingeniería en Información y Control de Gestión",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.10, M1: 0.35, M2: 0.15, HIS: 0.00, CIEN: 0.10 },
    notas: "(1)",
    corteRef: null,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // FILOSOFÍA Y HUMANIDADES
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "uch-estudios-internacionales",
    universidad: "Universidad de Chile",
    sede: "Filosofía y Humanidades",
    carrera: "Estudios Internacionales",
    requiereM2: true,
    ponderaciones: { NEM: 0.15, RANK: 0.20, CL: 0.25, M1: 0.20, M2: 0.00, HIS: 0.00, CIEN: 0.20 },
    notas: "(16)",
    corteRef: null,
  },
  {
    id: "uch-filosofia",
    universidad: "Universidad de Chile",
    sede: "Filosofía y Humanidades",
    carrera: "Filosofía (Licenciatura)",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.35, M1: 0.15, M2: 0.00, HIS: 0.00, CIEN: 0.20 },
    corteRef: null,
  },
  {
    id: "uch-historia",
    universidad: "Universidad de Chile",
    sede: "Filosofía y Humanidades",
    carrera: "Historia (Licenciatura)",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.20, M1: 0.15, M2: 0.00, HIS: 0.00, CIEN: 0.35 },
    corteRef: null,
  },
  {
    id: "uch-linguistica-literatura-mencion",
    universidad: "Universidad de Chile",
    sede: "Filosofía y Humanidades",
    carrera: "Lingüística y Literatura con mención (Lic.)",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.35, M1: 0.15, M2: 0.00, HIS: 0.00, CIEN: 0.20 },
    corteRef: null,
  },
  {
    id: "uch-linguistica-literatura-inglesas",
    universidad: "Universidad de Chile",
    sede: "Filosofía y Humanidades",
    carrera: "Lingüística y Literatura Inglesas (Lic.)",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.30, M1: 0.15, M2: 0.00, HIS: 0.00, CIEN: 0.25 },
    corteRef: null,
  },
  {
    id: "uch-ped-educacion-basica",
    universidad: "Universidad de Chile",
    sede: "Filosofía y Humanidades",
    carrera: "Pedagogía en Educación Básica",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.25, M1: 0.25, M2: 0.00, HIS: 0.00, CIEN: 0.20 },
    notas: "(1)(9)",
    corteRef: null,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // GOBIERNO
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "uch-administracion-publica",
    universidad: "Universidad de Chile",
    sede: "Gobierno",
    carrera: "Administración Pública",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.30, CL: 0.20, M1: 0.20, M2: 0.00, HIS: 0.00, CIEN: 0.20 },
    corteRef: null,
  },
  {
    id: "uch-ciencia-politica",
    universidad: "Universidad de Chile",
    sede: "Gobierno",
    carrera: "Ciencia Política",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.30, CL: 0.20, M1: 0.20, M2: 0.00, HIS: 0.00, CIEN: 0.20 },
    corteRef: null,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // MEDICINA
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "uch-enfermeria",
    universidad: "Universidad de Chile",
    sede: "Medicina",
    carrera: "Enfermería",
    requiereM2: false,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.15, M1: 0.20, M2: 0.00, HIS: 0.00, CIEN: 0.35 },
    corteRef: null,
  },
  {
    id: "uch-fonoaudiologia",
    universidad: "Universidad de Chile",
    sede: "Medicina",
    carrera: "Fonoaudiología",
    requiereM2: false,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.15, M1: 0.20, M2: 0.00, HIS: 0.00, CIEN: 0.35 },
    corteRef: null,
  },
  {
    id: "uch-kinesiologia",
    universidad: "Universidad de Chile",
    sede: "Medicina",
    carrera: "Kinesiología",
    requiereM2: false,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.15, M1: 0.20, M2: 0.00, HIS: 0.00, CIEN: 0.35 },
    corteRef: null,
  },
  {
    id: "uch-medicina",
    universidad: "Universidad de Chile",
    sede: "Medicina",
    carrera: "Medicina",
    requiereM2: false,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.15, M1: 0.20, M2: 0.00, HIS: 0.00, CIEN: 0.35 },
    corteRef: null,
  },
  {
    id: "uch-nutricion",
    universidad: "Universidad de Chile",
    sede: "Medicina",
    carrera: "Nutrición y Dietética",
    requiereM2: false,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.15, M1: 0.20, M2: 0.00, HIS: 0.00, CIEN: 0.35 },
    corteRef: null,
  },
  {
    id: "uch-obstetricia",
    universidad: "Universidad de Chile",
    sede: "Medicina",
    carrera: "Obstetricia y Puericultura",
    requiereM2: false,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.15, M1: 0.20, M2: 0.00, HIS: 0.00, CIEN: 0.35 },
    corteRef: null,
  },
  {
    id: "uch-tecnologia-medica",
    universidad: "Universidad de Chile",
    sede: "Medicina",
    carrera: "Tecnología Médica",
    requiereM2: false,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.15, M1: 0.20, M2: 0.00, HIS: 0.00, CIEN: 0.35 },
    notas: "(17)",
    corteRef: null,
  },
  {
    id: "uch-terapia-ocupacional",
    universidad: "Universidad de Chile",
    sede: "Medicina",
    carrera: "Terapia Ocupacional",
    requiereM2: true,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.20, M1: 0.20, M2: 0.00, HIS: 0.00, CIEN: 0.30 },
    corteRef: null,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // ODONTOLOGÍA
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "uch-odontologia",
    universidad: "Universidad de Chile",
    sede: "Odontología",
    carrera: "Odontología",
    requiereM2: false,
    ponderaciones: { NEM: 0.10, RANK: 0.20, CL: 0.15, M1: 0.20, M2: 0.00, HIS: 0.00, CIEN: 0.35 },
    corteRef: null,
  },
];