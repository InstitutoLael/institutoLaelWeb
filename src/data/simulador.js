// src/data/simulador.js
// Datos procesados de Oferta Académica 2025 SIES

export const DB_CARRERAS = [
  // UNIVERSIDAD DE CHILE
  { id: 1001, u: "UNIVERSIDAD DE CHILE", carrera: "ARQUITECTURA", sede: "SANTIAGO", corte: 0, vacantes: 145, p: { nem: 10, rank: 25, cl: 10, m1: 25, m2: 5, hist: 10, cien: 10 } },
  { id: 1002, u: "UNIVERSIDAD DE CHILE", carrera: "DISEÑO", sede: "SANTIAGO", corte: 0, vacantes: 105, p: { nem: 10, rank: 25, cl: 10, m1: 25, m2: 5, hist: 10, cien: 10 } },
  { id: 1003, u: "UNIVERSIDAD DE CHILE", carrera: "ACTUACIÓN TEATRAL", sede: "SANTIAGO", corte: 0, vacantes: 20, p: { nem: 10, rank: 20, cl: 20, m1: 10, m2: 0, hist: 10, cien: 0 } },
  { id: 1004, u: "UNIVERSIDAD DE CHILE", carrera: "ARTES VISUALES", sede: "SANTIAGO", corte: 0, vacantes: 55, p: { nem: 10, rank: 20, cl: 20, m1: 10, m2: 0, hist: 10, cien: 0 } },
  { id: 1005, u: "UNIVERSIDAD DE CHILE", carrera: "DANZA", sede: "SANTIAGO", corte: 0, vacantes: 25, p: { nem: 10, rank: 20, cl: 20, m1: 10, m2: 0, hist: 10, cien: 0 } },
  { id: 1006, u: "UNIVERSIDAD DE CHILE", carrera: "TEORÍA E HISTORIA DEL ARTE", sede: "SANTIAGO", corte: 0, vacantes: 35, p: { nem: 10, rank: 20, cl: 25, m1: 10, m2: 0, hist: 20, cien: 0 } },
  { id: 1007, u: "UNIVERSIDAD DE CHILE", carrera: "SONIDO", sede: "SANTIAGO", corte: 0, vacantes: 25, p: { nem: 10, rank: 20, cl: 15, m1: 25, m2: 5, hist: 0, cien: 10 } },
  { id: 1008, u: "UNIVERSIDAD DE CHILE", carrera: "BIOLOGÍA CON MENCIÓN EN MEDIO AMBIENTE", sede: "SANTIAGO", corte: 0, vacantes: 35, p: { nem: 10, rank: 30, cl: 10, m1: 30, m2: 0, hist: 0, cien: 20 } },
  { id: 1009, u: "UNIVERSIDAD DE CHILE", carrera: "INGENIERÍA EN BIOTECNOLOGÍA MOLECULAR", sede: "SANTIAGO", corte: 0, vacantes: 45, p: { nem: 10, rank: 30, cl: 10, m1: 30, m2: 0, hist: 0, cien: 20 } },
  { id: 1010, u: "UNIVERSIDAD DE CHILE", carrera: "QUÍMICA", sede: "SANTIAGO", corte: 0, vacantes: 35, p: { nem: 10, rank: 30, cl: 10, m1: 30, m2: 0, hist: 0, cien: 20 } },
  { id: 1011, u: "UNIVERSIDAD DE CHILE", carrera: "QUÍMICA Y FARMACIA", sede: "SANTIAGO", corte: 0, vacantes: 110, p: { nem: 10, rank: 30, cl: 10, m1: 30, m2: 0, hist: 0, cien: 20 } },
  { id: 1012, u: "UNIVERSIDAD DE CHILE", carrera: "BIOQUÍMICA", sede: "SANTIAGO", corte: 0, vacantes: 60, p: { nem: 10, rank: 30, cl: 10, m1: 30, m2: 0, hist: 0, cien: 20 } },
  { id: 1013, u: "UNIVERSIDAD DE CHILE", carrera: "INGENIERÍA EN ALIMENTOS", sede: "SANTIAGO", corte: 0, vacantes: 45, p: { nem: 10, rank: 30, cl: 10, m1: 30, m2: 0, hist: 0, cien: 20 } },
  { id: 1014, u: "UNIVERSIDAD DE CHILE", carrera: "INGENIERÍA PLAN COMÚN", sede: "SANTIAGO", corte: 0, vacantes: 820, p: { nem: 10, rank: 25, cl: 10, m1: 30, m2: 15, hist: 0, cien: 10 } },
  { id: 1015, u: "UNIVERSIDAD DE CHILE", carrera: "DERECHO", sede: "SANTIAGO", corte: 0, vacantes: 430, p: { nem: 10, rank: 20, cl: 30, m1: 10, m2: 0, hist: 20, cien: 0 } },
  { id: 1016, u: "UNIVERSIDAD DE CHILE", carrera: "INGENIERÍA COMERCIAL", sede: "SANTIAGO", corte: 0, vacantes: 420, p: { nem: 10, rank: 30, cl: 10, m1: 30, m2: 10, hist: 10, cien: 0 } },
  { id: 1017, u: "UNIVERSIDAD DE CHILE", carrera: "MEDICINA", sede: "SANTIAGO", corte: 0, vacantes: 172, p: { nem: 10, rank: 30, cl: 10, m1: 25, m2: 5, hist: 0, cien: 20 } },
  { id: 1018, u: "UNIVERSIDAD DE CHILE", carrera: "OBSTETRICIA Y PUERICULTURA", sede: "SANTIAGO", corte: 0, vacantes: 95, p: { nem: 10, rank: 30, cl: 10, m1: 25, m2: 0, hist: 0, cien: 25 } },
  { id: 1019, u: "UNIVERSIDAD DE CHILE", carrera: "ENFERMERÍA", sede: "SANTIAGO", corte: 0, vacantes: 100, p: { nem: 10, rank: 30, cl: 15, m1: 20, m2: 0, hist: 0, cien: 25 } },
  { id: 1020, u: "UNIVERSIDAD DE CHILE", carrera: "KINESIOLOGÍA", sede: "SANTIAGO", corte: 0, vacantes: 65, p: { nem: 10, rank: 30, cl: 15, m1: 20, m2: 0, hist: 0, cien: 25 } },
  { id: 1021, u: "UNIVERSIDAD DE CHILE", carrera: "ODONTOLOGÍA", sede: "SANTIAGO", corte: 0, vacantes: 100, p: { nem: 10, rank: 30, cl: 15, m1: 20, m2: 0, hist: 0, cien: 25 } },
  
  // PONTIFICIA UNIVERSIDAD CATÓLICA DE CHILE
  { id: 2001, u: "PONTIFICIA UNIVERSIDAD CATÓLICA DE CHILE", carrera: "MEDICINA", sede: "SANTIAGO", corte: 0, vacantes: 85, p: { nem: 20, rank: 20, cl: 15, m1: 20, m2: 10, hist: 0, cien: 15 } },
  { id: 2002, u: "PONTIFICIA UNIVERSIDAD CATÓLICA DE CHILE", carrera: "DERECHO", sede: "SANTIAGO", corte: 0, vacantes: 320, p: { nem: 20, rank: 20, cl: 20, m1: 10, m2: 0, hist: 20, cien: 0 } },
  { id: 2003, u: "PONTIFICIA UNIVERSIDAD CATÓLICA DE CHILE", carrera: "INGENIERÍA", sede: "SANTIAGO", corte: 0, vacantes: 770, p: { nem: 20, rank: 20, cl: 10, m1: 25, m2: 15, hist: 0, cien: 10 } },
  { id: 2004, u: "PONTIFICIA UNIVERSIDAD CATÓLICA DE CHILE", carrera: "INGENIERÍA COMERCIAL", sede: "SANTIAGO", corte: 0, vacantes: 400, p: { nem: 20, rank: 20, cl: 15, m1: 30, m2: 5, hist: 10, cien: 0 } },
  { id: 2005, u: "PONTIFICIA UNIVERSIDAD CATÓLICA DE CHILE", carrera: "ARQUITECTURA", sede: "SANTIAGO", corte: 0, vacantes: 110, p: { nem: 20, rank: 20, cl: 15, m1: 15, m2: 5, hist: 10, cien: 10 } },
  { id: 2006, u: "PONTIFICIA UNIVERSIDAD CATÓLICA DE CHILE", carrera: "PSICOLOGÍA", sede: "SANTIAGO", corte: 0, vacantes: 115, p: { nem: 20, rank: 20, cl: 25, m1: 15, m2: 0, hist: 10, cien: 10 } },
  { id: 2007, u: "PONTIFICIA UNIVERSIDAD CATÓLICA DE CHILE", carrera: "PERIODISMO", sede: "SANTIAGO", corte: 0, vacantes: 115, p: { nem: 20, rank: 20, cl: 30, m1: 10, m2: 0, hist: 20, cien: 0 } },
  
  // UNIVERSIDAD DE SANTIAGO (USACH)
  { id: 3001, u: "UNIVERSIDAD DE SANTIAGO DE CHILE", carrera: "INGENIERÍA CIVIL INDUSTRIAL", sede: "SANTIAGO", corte: 0, vacantes: 180, p: { nem: 15, rank: 25, cl: 10, m1: 35, m2: 5, hist: 0, cien: 10 } },
  { id: 3002, u: "UNIVERSIDAD DE SANTIAGO DE CHILE", carrera: "INGENIERÍA CIVIL EN INFORMÁTICA", sede: "SANTIAGO", corte: 0, vacantes: 150, p: { nem: 15, rank: 25, cl: 10, m1: 35, m2: 5, hist: 0, cien: 10 } },
  { id: 3003, u: "UNIVERSIDAD DE SANTIAGO DE CHILE", carrera: "ARQUITECTURA", sede: "SANTIAGO", corte: 0, vacantes: 80, p: { nem: 15, rank: 25, cl: 10, m1: 25, m2: 5, hist: 10, cien: 10 } },
  { id: 3004, u: "UNIVERSIDAD DE SANTIAGO DE CHILE", carrera: "OBSTETRICIA Y PUERICULTURA", sede: "SANTIAGO", corte: 0, vacantes: 70, p: { nem: 15, rank: 25, cl: 15, m1: 20, m2: 0, hist: 0, cien: 25 } },
  { id: 3005, u: "UNIVERSIDAD DE SANTIAGO DE CHILE", carrera: "PSICOLOGÍA", sede: "SANTIAGO", corte: 0, vacantes: 75, p: { nem: 15, rank: 25, cl: 30, m1: 10, m2: 0, hist: 10, cien: 10 } },

  // UNIVERSIDAD DE CONCEPCIÓN
  { id: 4001, u: "UNIVERSIDAD DE CONCEPCIÓN", carrera: "MEDICINA", sede: "CONCEPCIÓN", corte: 0, vacantes: 110, p: { nem: 20, rank: 20, cl: 15, m1: 25, m2: 0, hist: 0, cien: 20 } },
  { id: 4002, u: "UNIVERSIDAD DE CONCEPCIÓN", carrera: "DERECHO", sede: "CONCEPCIÓN", corte: 0, vacantes: 140, p: { nem: 20, rank: 20, cl: 25, m1: 15, m2: 0, hist: 20, cien: 0 } },
  { id: 4003, u: "UNIVERSIDAD DE CONCEPCIÓN", carrera: "INGENIERÍA CIVIL", sede: "CONCEPCIÓN", corte: 0, vacantes: 300, p: { nem: 15, rank: 25, cl: 10, m1: 35, m2: 5, hist: 0, cien: 10 } },

  // UNIVERSIDAD ADOLFO IBÁÑEZ
  { id: 5001, u: "UNIVERSIDAD ADOLFO IBÁÑEZ", carrera: "INGENIERÍA COMERCIAL", sede: "SANTIAGO", corte: 0, vacantes: 450, p: { nem: 10, rank: 20, cl: 20, m1: 40, m2: 0, hist: 10, cien: 0 } },
  { id: 5002, u: "UNIVERSIDAD ADOLFO IBÁÑEZ", carrera: "DERECHO", sede: "SANTIAGO", corte: 0, vacantes: 180, p: { nem: 10, rank: 20, cl: 35, m1: 15, m2: 0, hist: 20, cien: 0 } },
  { id: 5003, u: "UNIVERSIDAD ADOLFO IBÁÑEZ", carrera: "INGENIERÍA CIVIL", sede: "SANTIAGO", corte: 0, vacantes: 400, p: { nem: 10, rank: 20, cl: 10, m1: 45, m2: 5, hist: 0, cien: 10 } },

  // UNIVERSIDAD DE LOS ANDES
  { id: 6001, u: "UNIVERSIDAD DE LOS ANDES", carrera: "MEDICINA", sede: "SANTIAGO", corte: 0, vacantes: 100, p: { nem: 20, rank: 20, cl: 15, m1: 25, m2: 5, hist: 0, cien: 15 } },
  { id: 6002, u: "UNIVERSIDAD DE LOS ANDES", carrera: "DERECHO", sede: "SANTIAGO", corte: 0, vacantes: 150, p: { nem: 20, rank: 20, cl: 30, m1: 10, m2: 0, hist: 20, cien: 0 } },

  // UNIVERSIDAD DIEGO PORTALES
  { id: 7001, u: "UNIVERSIDAD DIEGO PORTALES", carrera: "DERECHO", sede: "SANTIAGO", corte: 0, vacantes: 200, p: { nem: 20, rank: 20, cl: 30, m1: 10, m2: 0, hist: 20, cien: 0 } },
  { id: 7002, u: "UNIVERSIDAD DIEGO PORTALES", carrera: "PSICOLOGÍA", sede: "SANTIAGO", corte: 0, vacantes: 120, p: { nem: 20, rank: 20, cl: 30, m1: 15, m2: 0, hist: 10, cien: 5 } },
  { id: 7003, u: "UNIVERSIDAD DIEGO PORTALES", carrera: "MEDICINA", sede: "SANTIAGO", corte: 0, vacantes: 65, p: { nem: 20, rank: 20, cl: 15, m1: 25, m2: 5, hist: 0, cien: 15 } },

  // UNIVERSIDAD AUSTRAL DE CHILE
  { id: 8001, u: "UNIVERSIDAD AUSTRAL DE CHILE", carrera: "MEDICINA VETERINARIA", sede: "VALDIVIA", corte: 0, vacantes: 95, p: { nem: 20, rank: 20, cl: 15, m1: 25, m2: 0, hist: 0, cien: 20 } },
  { id: 8002, u: "UNIVERSIDAD AUSTRAL DE CHILE", carrera: "INGENIERÍA NAVAL", sede: "VALDIVIA", corte: 0, vacantes: 45, p: { nem: 20, rank: 20, cl: 10, m1: 35, m2: 5, hist: 0, cien: 10 } }
];