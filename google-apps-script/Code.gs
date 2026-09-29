/**
 * ============================================================================
 *  INSTITUTO LAEL · Sistema de inscripciones (Google Apps Script)
 * ============================================================================
 *
 *  Qué hace:
 *  - Recibe inscripciones, clases de prueba, listas de espera, becas,
 *    testimonios y encuestas desde institutolael.cl y los guarda aquí.
 *  - Te avisa por correo cada vez que llega algo nuevo y le manda a la
 *    persona un correo de confirmación con el diseño de Lael.
 *  - Una vez al día (tareasDiarias): recuerda las clases de prueba del día
 *    siguiente, manda la encuesta de mitad de semestre en las fechas que
 *    elijas y te avisa si se liberó un cupo con gente en lista de espera.
 *  - Mantiene la hoja "Resumen" con números y gráficos.
 *  - Le entrega al sitio SOLO datos públicos: cupos por curso y testimonios
 *    marcados con "SI".
 *
 *  Seguridad:
 *  - El sitio puede AGREGAR filas, pero nunca LEER datos personales.
 *  - Todo se valida (largo, correo, teléfono) y se limpia para que nadie
 *    pueda meter fórmulas en la planilla.
 *  - Campo trampa (honeypot) y límite de envíos para frenar robots.
 *  - Los datos de pago NO están en este código (el código es público en
 *    GitHub): se escriben en la hoja "Configuración", que solo ves tú.
 *
 *  Cómo instalarlo o actualizarlo: mira INSTRUCCIONES.md en esta carpeta.
 * ============================================================================
 */

// ── Configuración ─────────────────────────────────────────────────────────
const CONFIG = {
  AVISOS_A: 'contacto@institutolael.cl',   // a quién le llegan los avisos
  NOMBRE_REMITENTE: 'Instituto Lael',
  WHATSAPP: '+56 9 6462 6568',
  WHATSAPP_LINK: 'https://wa.me/56964626568',
  SITIO: 'https://www.institutolael.cl',
  MAX_POR_CORREO: 3,    // envíos por correo cada 10 minutos
  MAX_POR_MINUTO: 30,   // envíos totales por minuto
};

const HOJAS = {
  INSCRIPCIONES: 'Inscripciones',
  TESTIMONIOS: 'Testimonios',
  CURSOS: 'Cursos',
  ENCUESTAS: 'Encuestas',
  RESUMEN: 'Resumen',
  CONFIGURACION: 'Configuración',
  REGISTRO: 'Registro técnico',
};

const COLUMNAS_INSCRIPCION = [
  'Fecha', 'Tipo', 'Programa', 'Detalle (ramos / curso)', 'Nombre', 'Correo', 'Teléfono',
  'Edad', 'Curso o nivel actual', 'Comuna / Región',
  'Apoderado: nombre', 'Apoderado: correo', 'Apoderado: teléfono',
  'Quiere beca', 'Viene de parte de (Trae un amigo)', 'Cómo nos conoció', 'Comentario',
  'Acepta avisos', 'Página de origen', 'Estado', 'Notas internas',
  'Fecha clase de prueba', 'Recordatorio enviado',
];
// Posición (desde 1) de cada columna que el código usa
const COL = {
  TIPO: 2, PROGRAMA: 3, DETALLE: 4, NOMBRE: 5, CORREO: 6, ESTADO: 20,
  FECHA_PRUEBA: 22, RECORDATORIO: 23,
};

const COLUMNAS_TESTIMONIO = [
  'Fecha', 'Nombre', 'Programa', 'Año', 'Testimonio', 'Lo que más recuerda',
  'Cómo publicarlo', 'Correo', 'Publicar (SI/NO)',
];

const COLUMNAS_ENCUESTA = ['Fecha', 'Programa', 'Nota (1 a 7)', '¿Recomendaría Lael?', 'Lo que más le sirve', 'Qué mejoraría', 'Nombre (opcional)'];

const ESTADOS = ['Nuevo', 'Contactado', 'Confirmado', 'Pagó', 'No siguió'];

const CONF_PAGO = 'Datos de pago (van en el correo de inscripción)';
const CONF_ENCUESTA = 'Fechas de la encuesta de mitad de semestre (MM-DD, separadas por coma)';
const CONF_RECORDAR = 'Recordar la clase de prueba el día anterior (SI/NO)';
const CONFIG_DEFECTO = [
  [CONF_PAGO, 'Instituto Lael SpA · RUT 78.084.019-6 · Cuenta Vista Mercado Pago N° ESCRIBE AQUÍ EL NÚMERO · Comprobante a pagos@institutolael.cl'],
  [CONF_ENCUESTA, '05-15, 10-01'],
  [CONF_RECORDAR, 'SI'],
];

// ── Instalación y actualización ───────────────────────────────────────────
// Ejecuta instalar() una vez después de pegar una versión nueva de este
// código. No borra nada: solo agrega lo que falte.
function instalar() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = asegurarHoja_(ss, HOJAS.INSCRIPCIONES, COLUMNAS_INSCRIPCION);
  asegurarHoja_(ss, HOJAS.TESTIMONIOS, COLUMNAS_TESTIMONIO);
  asegurarHoja_(ss, HOJAS.ENCUESTAS, COLUMNAS_ENCUESTA);

  const cursos = asegurarHoja_(ss, HOJAS.CURSOS, ['Código del curso', 'Nombre', 'Cupo máximo', 'Inscritos (automático)', 'Mostrar en el sitio (SI/NO)']);
  // Agrega los cursos que falten (no toca los que ya están ni sus cupos)
  const yaEstan = cursos.getLastRow() > 1 ? cursos.getRange(2, 1, cursos.getLastRow() - 1, 1).getValues().map((r) => String(r[0]).trim()) : [];
  [
    ['paes-m1', 'PAES · Matemática M1', 20],
    ['paes-cl', 'PAES · Competencia Lectora', 20],
    ['paes-m2', 'PAES · Matemática M2', 20],
    ['paes-bio', 'PAES · Biología', 20],
    ['paes-qui', 'PAES · Química', 20],
    ['paes-fis', 'PAES · Física', 20],
    ['paes-his', 'PAES · Historia', 20],
    ['ingles', 'Inglés', 20],
    ['adultos', 'Escuela de Sueños', 30],
    ['int-m1', 'Intensivo · Matemática M1', 20],
    ['int-cl', 'Intensivo · Competencia Lectora', 20],
    ['int-m2', 'Intensivo · Matemática M2', 20],
    ['int-bio', 'Intensivo · Biología', 20],
    ['int-qui', 'Intensivo · Química', 20],
    ['int-fis', 'Intensivo · Física', 20],
    ['int-his', 'Intensivo · Historia', 20],
  ].filter((e) => yaEstan.indexOf(e[0]) < 0).forEach((e) => {
    const fila = cursos.getLastRow() + 1;
    cursos.getRange(fila, 1, 1, 3).setValues([e]);
    cursos.getRange(fila, 4).setFormula(formulaInscritos_(fila));
    cursos.getRange(fila, 5).setValue('SI');
  });

  const conf = asegurarHoja_(ss, HOJAS.CONFIGURACION, ['Qué es', 'Valor (puedes editarlo)']);
  const claves = conf.getLastRow() > 1 ? conf.getRange(2, 1, conf.getLastRow() - 1, 1).getValues().map((r) => r[0]) : [];
  CONFIG_DEFECTO.forEach((fila) => { if (claves.indexOf(fila[0]) < 0) conf.appendRow(fila); });
  conf.setColumnWidth(1, 380).setColumnWidth(2, 560);

  asegurarHoja_(ss, HOJAS.REGISTRO, ['Fecha', 'Evento', 'Detalle']).hideSheet();

  // Listas y formatos en Inscripciones
  hoja.getRange(2, COL.ESTADO, 2000, 1).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(ESTADOS, true).build());
  hoja.getRange(2, COL.FECHA_PRUEBA, 2000, 1)
    .setDataValidation(SpreadsheetApp.newDataValidation().requireDate().setAllowInvalid(false).build())
    .setNumberFormat('dd-mm-yyyy');
  colorearEstados_(hoja);

  crearResumen_(ss);
  instalarTareaDiaria_();
  Logger.log('Listo. Si es la primera vez, implementa como aplicación web (ver INSTRUCCIONES.md).');
}

function formulaInscritos_(fila) {
  // Cuenta sola las inscripciones de este curso (menos las marcadas "No siguió")
  return `=COUNTIFS(${HOJAS.INSCRIPCIONES}!B:B,"inscripcion",${HOJAS.INSCRIPCIONES}!T:T,"<>No siguió",${HOJAS.INSCRIPCIONES}!D:D,"*"&A${fila}&"*")`;
}

// Crea la hoja si no existe y agrega al final las columnas que falten.
function asegurarHoja_(ss, nombre, columnas) {
  let hoja = ss.getSheetByName(nombre);
  if (!hoja) hoja = ss.insertSheet(nombre);
  if (hoja.getLastRow() === 0) {
    hoja.getRange(1, 1, 1, columnas.length).setValues([columnas]);
  } else {
    const actuales = hoja.getRange(1, 1, 1, Math.max(columnas.length, hoja.getLastColumn())).getValues()[0];
    columnas.forEach((c, i) => { if (!actuales[i]) hoja.getRange(1, i + 1).setValue(c); });
  }
  hoja.getRange(1, 1, 1, columnas.length).setFontWeight('bold').setBackground('#071D49').setFontColor('#FFFFFF');
  hoja.setFrozenRows(1);
  return hoja;
}

// Si alguien envía antes de que se ejecute instalar(), la hoja se crea sola
function hoja_(nombre, columnas) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(nombre) || asegurarHoja_(ss, nombre, columnas);
}

// Colores por estado, para ver de un vistazo en qué va cada persona
function colorearEstados_(hoja) {
  const rango = hoja.getRange(2, COL.ESTADO, 2000, 1);
  const colores = { 'Nuevo': '#FFF4C2', 'Contactado': '#DDEBFF', 'Confirmado': '#E3D9FF', 'Pagó': '#D6F5E3', 'No siguió': '#EEEEEE' };
  const reglas = hoja.getConditionalFormatRules().filter((r) => {
    const rs = r.getRanges();
    return !(rs.length && rs[0].getColumn() === COL.ESTADO);
  });
  Object.keys(colores).forEach((estado) => {
    reglas.push(SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo(estado).setBackground(colores[estado]).setRanges([rango]).build());
  });
  hoja.setConditionalFormatRules(reglas);
}

function instalarTareaDiaria_() {
  const existe = ScriptApp.getProjectTriggers().some((t) => t.getHandlerFunction() === 'tareasDiarias');
  if (!existe) ScriptApp.newTrigger('tareasDiarias').timeBased().everyDays(1).atHour(9).create();
}

// ── Hoja "Resumen": números y gráficos que se actualizan solos ────────────
function crearResumen_(ss) {
  let r = ss.getSheetByName(HOJAS.RESUMEN);
  if (r) { r.getCharts().forEach((c) => r.removeChart(c)); r.clear(); }
  else r = ss.insertSheet(HOJAS.RESUMEN, 0);

  const I = HOJAS.INSCRIPCIONES;
  r.setHiddenGridlines(true);
  r.getRange('A1').setValue('Resumen de Instituto Lael').setFontSize(20).setFontWeight('bold').setFontColor('#071D49');
  r.getRange('A2').setValue('Se actualiza solo. No escribas en esta hoja: si la borras, ejecuta instalar() y vuelve a aparecer.').setFontColor('#6B7A99');

  const kpis = [
    ['Inscripciones', `=COUNTIF(${I}!B:B,"inscripcion")`],
    ['Nuevas en los últimos 7 días', `=COUNTIFS(${I}!B:B,"inscripcion",${I}!A:A,">="&(TODAY()-7))`],
    ['Por contactar (estado Nuevo)', `=COUNTIF(${I}!T:T,"Nuevo")`],
    ['Pagaron', `=COUNTIF(${I}!T:T,"Pagó")`],
    ['Clases de prueba', `=COUNTIF(${I}!B:B,"clase-prueba")`],
    ['En lista de espera', `=COUNTIF(${I}!B:B,"lista-espera")`],
    ['Postulaciones a beca', `=COUNTIF(${I}!B:B,"beca")`],
    ['Avísame (programas por abrir)', `=COUNTIF(${I}!B:B,"aviso")`],
    ['Nota promedio en encuestas', `=IFERROR(ROUND(AVERAGE(${HOJAS.ENCUESTAS}!C2:C),1),"-")`],
  ];
  kpis.forEach((k, i) => {
    const fila = 4 + i;
    r.getRange(fila, 1).setValue(k[0]).setFontColor('#071D49');
    r.getRange(fila, 2).setFormula(k[1]).setFontWeight('bold').setFontSize(14).setHorizontalAlignment('right');
  });
  r.getRange(4, 1, kpis.length, 2).setBorder(null, null, true, null, null, true, '#E3E7EF', SpreadsheetApp.BorderStyle.SOLID);

  r.getRange('D3').setValue('Inscritos por programa').setFontWeight('bold').setFontColor('#071D49');
  r.getRange('D4').setFormula(`=IFERROR(QUERY(${I}!A:T,"select C, count(A) where B = 'inscripcion' group by C order by count(A) desc label C 'Programa', count(A) 'Inscritos'",1),"Todavía no hay inscripciones")`);
  r.getRange('G3').setValue('En qué va cada persona').setFontWeight('bold').setFontColor('#071D49');
  r.getRange('G4').setFormula(`=IFERROR(QUERY(${I}!A:T,"select T, count(A) where B = 'inscripcion' and T <> '' group by T label T 'Estado', count(A) 'Personas'",1),"-")`);
  r.getRange('J3').setValue('Cómo nos conocieron').setFontWeight('bold').setFontColor('#071D49');
  r.getRange('J4').setFormula(`=IFERROR(QUERY(${I}!A:T,"select P, count(A) where P <> '' group by P order by count(A) desc label P 'Canal', count(A) 'Personas'",1),"-")`);
  r.getRange('A15').setValue('Cupos por curso').setFontWeight('bold').setFontColor('#071D49');
  r.getRange('A16').setFormula(`=IFERROR(QUERY(${HOJAS.CURSOS}!A:D,"select B, C, D where A <> '' label B 'Curso', C 'Cupo', D 'Inscritos'",1),"-")`);

  r.setColumnWidth(1, 260).setColumnWidth(2, 90).setColumnWidth(3, 30).setColumnWidth(6, 30).setColumnWidth(9, 30);
  [4, 7, 10].forEach((c) => r.setColumnWidth(c, 200));

  r.insertChart(r.newChart().setChartType(Charts.ChartType.BAR).addRange(r.getRange('D4:E20'))
    .setOption('title', 'Inscritos por programa').setOption('legend', { position: 'none' })
    .setOption('colors', ['#071D49']).setPosition(15, 4, 0, 0).setOption('width', 460).setOption('height', 280).build());
  r.insertChart(r.newChart().setChartType(Charts.ChartType.PIE).addRange(r.getRange('G4:H12'))
    .setOption('title', 'Estado de las inscripciones').setOption('pieHole', 0.45)
    .setOption('colors', ['#D7E400', '#7CC6FF', '#C3A6FF', '#6EDDB0', '#BBBBBB'])
    .setPosition(15, 9, 0, 0).setOption('width', 420).setOption('height', 280).build());
}

// ── El sitio pide datos públicos (cupos y testimonios aprobados) ──────────
function doGet(e) {
  const accion = (e && e.parameter && e.parameter.accion) || '';
  try {
    if (accion === 'cupos') return json_({ ok: true, cupos: leerCupos_() });
    if (accion === 'testimonios') return json_({ ok: true, testimonios: leerTestimonios_() });
    return json_({ ok: false, error: 'accion_desconocida' });
  } catch (err) {
    registrar_('error_get', String(err));
    return json_({ ok: false, error: 'error_interno' });
  }
}

function leerCupos_() {
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJAS.CURSOS);
  if (!hoja || hoja.getLastRow() < 2) return {};
  const filas = hoja.getRange(2, 1, hoja.getLastRow() - 1, 5).getValues();
  const out = {};
  filas.forEach(([codigo, nombre, max, inscritos, mostrar]) => {
    if (!codigo || String(mostrar).toUpperCase() !== 'SI') return;
    const maximo = Number(max) || 0;
    const usados = Number(inscritos) || 0;
    out[String(codigo)] = { nombre: String(nombre), maximo, quedan: Math.max(0, maximo - usados) };
  });
  return out;
}

function leerTestimonios_() {
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJAS.TESTIMONIOS);
  if (!hoja || hoja.getLastRow() < 2) return [];
  const filas = hoja.getRange(2, 1, hoja.getLastRow() - 1, COLUMNAS_TESTIMONIO.length).getValues();
  return filas
    .filter((f) => String(f[8]).toUpperCase() === 'SI')
    .map((f) => {
      const soloIniciales = String(f[6]).toLowerCase().indexOf('inicial') >= 0;
      const nombre = soloIniciales ? iniciales_(String(f[1])) : String(f[1]);
      return { nombre, programa: String(f[2]), anio: String(f[3]), texto: String(f[4]), recuerdo: String(f[5]) };
    });
}

function iniciales_(nombre) {
  return nombre.trim().split(/\s+/).map((p) => p.charAt(0).toUpperCase() + '.').join(' ');
}

// ── El sitio envía un formulario ──────────────────────────────────────────
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    let data;
    try { data = JSON.parse(e.postData.contents); } catch (_) { return json_({ ok: false, error: 'formato' }); }

    // Campo trampa: las personas nunca lo ven ni lo llenan; los robots sí.
    if (data.sitio_web) return json_({ ok: true });
    // Formularios enviados en menos de 3 segundos son robots
    if (Number(data._t) > 0 && Number(data._t) < 3000) return json_({ ok: true });

    if (!permitirEnvio_(String(data.correo || ''))) return json_({ ok: false, error: 'demasiados_envios' });

    if (data.tipo === 'testimonio') return guardarTestimonio_(data);
    if (data.tipo === 'encuesta') return guardarEncuesta_(data);
    return guardarInscripcion_(data);
  } catch (err) {
    registrar_('error_post', String(err));
    return json_({ ok: false, error: 'error_interno' });
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

const TIPOS_VALIDOS = ['inscripcion', 'clase-prueba', 'aviso', 'registro', 'beca', 'lista-espera'];

function guardarInscripcion_(d) {
  let tipo = limpiar_(d.tipo, 30) || 'inscripcion';
  if (TIPOS_VALIDOS.indexOf(tipo) < 0) tipo = 'inscripcion';
  const nombre = limpiar_(d.nombre, 80);
  const correo = limpiar_(d.correo, 120).toLowerCase();
  // El teléfono se valida tal como lo escribió la persona (ej. "+56 9 1234 5678")
  // y recién después se protege para la planilla, que antepone ' a lo que
  // empieza con "+" para que no se lea como fórmula.
  const telefonoOriginal = String(d.telefono == null ? '' : d.telefono).trim().slice(0, 20);
  const telefono = limpiar_(telefonoOriginal, 21);
  if (!nombre || !correoValido_(correo) || !telefonoValido_(telefonoOriginal)) return json_({ ok: false, error: 'datos_invalidos' });
  if (d.acepta_privacidad !== true) return json_({ ok: false, error: 'falta_consentimiento' });

  // Cupos: si todos los cursos elegidos están llenos, queda en lista de espera
  const cupos = leerCupos_();
  const cursos = listaCodigos_(d.cursos);
  const llenos = cursos.filter((c) => cupos[c] && cupos[c].quedan <= 0);
  if (tipo === 'inscripcion' && cursos.length && llenos.length === cursos.length) tipo = 'lista-espera';
  const espera = listaCodigos_(d.lista_espera).concat(tipo === 'inscripcion' ? llenos : []);

  const programa = limpiar_(d.programa, 60);
  let detalle = limpiar_(d.detalle, 300);
  // Si algunos ramos quedaron en espera y la inscripción sigue, se sacan del
  // detalle para que no cuenten como cupo usado.
  if (tipo === 'inscripcion' && llenos.length) llenos.forEach((c) => { detalle = detalle.split(c).join('(espera)'); });

  const hoja = hoja_(HOJAS.INSCRIPCIONES, COLUMNAS_INSCRIPCION);
  const fila = (t, det) => [
    new Date(), t, programa, det, nombre, correo, telefono,
    limpiar_(d.edad, 3), limpiar_(d.curso_actual, 60), limpiar_(d.comuna, 80),
    limpiar_(d.apoderado_nombre, 80), limpiar_(d.apoderado_correo, 120), limpiar_(d.apoderado_telefono, 20),
    d.quiere_beca ? 'Sí' : 'No', limpiar_(d.referido, 80), limpiar_(d.como_conocio, 80), limpiar_(d.comentario, 1000),
    d.acepta_avisos ? 'Sí' : 'No', limpiar_(d.origen, 120), 'Nuevo', '', '', '',
  ];
  hoja.appendRow(fila(tipo, detalle));
  if (tipo === 'inscripcion' && espera.length) hoja.appendRow(fila('lista-espera', espera.join(', ') + ' (lista de espera)'));

  avisarNuevo_(tipo, { nombre, correo, telefonoOriginal, programa, detalle, espera, d });
  correoConfirmacion_(tipo, { nombre, correo, programa, espera, d });

  // Si hay apoderado, le avisamos también
  const correoApoderado = limpiar_(d.apoderado_correo, 120).toLowerCase();
  if (correoValido_(correoApoderado) && correoApoderado !== correo && (tipo === 'inscripcion' || tipo === 'clase-prueba')) {
    const saludo = nombre.split(' ')[0];
    enviarCorreo_(correoApoderado, `Inscripción de ${saludo} en Instituto Lael`, plantilla_({
      titulo: `${esc_(saludo)} se inscribió en Lael`,
      parrafos: [
        `Hola. ${esc_(nombre)} se inscribió en <b>${esc_(programa)}</b> y te dejó como apoderado. Te vamos a escribir para coordinar horarios.`,
        'Si tienes cualquier duda, respóndenos este correo o escríbenos por WhatsApp.',
      ],
      boton: { texto: 'Escribir por WhatsApp', url: CONFIG.WHATSAPP_LINK },
      secundario: { texto: 'Condiciones y cómo pagar', url: CONFIG.SITIO + '/condiciones' },
    }));
  }
  return json_({ ok: true });
}

function listaCodigos_(v) {
  if (!Array.isArray(v)) return [];
  return v.map((c) => String(c).replace(/[^a-z0-9-]/gi, '').slice(0, 40)).filter(Boolean).slice(0, 10);
}

// Aviso a Lael: quién es, qué quiere y un botón para escribirle al tiro
function avisarNuevo_(tipo, x) {
  const TITULOS = {
    'inscripcion': 'Nueva inscripción', 'clase-prueba': 'Clase de prueba', 'lista-espera': 'Lista de espera',
    'beca': 'Postulación a beca', 'aviso': 'Avísame cuando abra', 'registro': 'Registro a evento',
  };
  const numero = x.telefonoOriginal.replace(/\D/g, '').replace(/^9(\d{8})$/, '569$1');
  const d = x.d;
  const datos = [
    ['Nombre', x.nombre], ['Correo', x.correo], ['Teléfono', x.telefonoOriginal], ['Programa', x.programa],
    ['Detalle', x.detalle || '-'], ['Edad', d.edad || '-'],
    ['Apoderado', d.apoderado_nombre ? `${d.apoderado_nombre} (${d.apoderado_telefono || '-'})` : '-'],
    ['Lista de espera en', x.espera.length ? x.espera.join(', ') : '-'],
    ['Quiere beca', d.quiere_beca ? 'Sí' : 'No'], ['Viene de parte de', d.referido || '-'],
    ['Cómo nos conoció', d.como_conocio || '-'], ['Comentario', d.comentario || '-'],
  ];
  const url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  const asunto = `${TITULOS[tipo] || 'Nuevo formulario'}: ${x.nombre} · ${x.programa}`;
  const texto = datos.map((f) => `${f[0]}: ${f[1]}`).join('\n') + `\n\nWhatsApp: https://wa.me/${numero}\nPlanilla: ${url}`;
  enviarCorreo_(CONFIG.AVISOS_A, asunto, plantilla_({
    etiqueta: TITULOS[tipo] || 'Nuevo formulario',
    titulo: esc_(x.nombre),
    tabla: datos,
    boton: { texto: 'Escribirle por WhatsApp', url: `https://wa.me/${numero}` },
    secundario: { texto: 'Abrir la planilla', url },
    pie: 'Cuando la contactes, cambia su estado en la columna "Estado".',
  }), texto);
}

// Confirmación para la persona, según lo que pidió
function correoConfirmacion_(tipo, x) {
  const saludo = esc_(x.nombre.split(' ')[0]);
  const prog = esc_(x.programa);
  let asunto; let o;

  if (tipo === 'inscripcion') {
    const pago = leerConfig_()[CONF_PAGO];
    asunto = 'Recibimos tu inscripción en Instituto Lael';
    o = {
      titulo: `¡Hola, ${saludo}!`,
      parrafos: [
        `Recibimos tu inscripción en <b>${prog}</b>. Tu cupo queda reservado mientras te escribimos para confirmar tu horario.`,
        'La matrícula es gratis' + (x.d.quiere_beca ? ' y vamos a revisar tu postulación a beca.' : '.'),
      ],
      pasos: ['Te escribimos por WhatsApp para confirmar tu horario.', 'Te mandamos el link de las clases y el acceso a Classroom.', 'Pagas tu primera mensualidad y mandas el comprobante.'],
      caja: pago && pago.indexOf('ESCRIBE AQUÍ') < 0
        ? { titulo: 'Datos para pagar', texto: esc_(pago) + '<br><span style="color:#6B7A99">Paga recién cuando confirmemos tu horario. Nunca te vamos a pedir transferir a otra cuenta.</span>' }
        : null,
      boton: { texto: 'Escribir por WhatsApp', url: CONFIG.WHATSAPP_LINK },
      secundario: { texto: 'Condiciones y reglamento', url: CONFIG.SITIO + '/condiciones' },
    };
    if (x.espera.length) o.parrafos.push('Algunos de tus ramos están llenos por ahora: quedaste en la <b>lista de espera</b> para esos ramos y te avisamos apenas se libere un cupo.');
  } else if (tipo === 'clase-prueba') {
    asunto = 'Recibimos tu solicitud de clase de prueba';
    o = {
      titulo: `¡Hola, ${saludo}!`,
      parrafos: [`Recibimos tu solicitud de clase de prueba de <b>${prog}</b>. Te escribimos por WhatsApp o correo para elegir el día y la hora.`, 'Es una clase en vivo, sin compromiso. Después decides con calma.'],
      boton: { texto: 'Escribir por WhatsApp', url: CONFIG.WHATSAPP_LINK },
      secundario: { texto: 'Así es una clase en Lael', url: CONFIG.SITIO + '/metodo' },
    };
  } else if (tipo === 'lista-espera') {
    asunto = 'Quedaste en la lista de espera de Lael';
    o = {
      titulo: `¡Hola, ${saludo}!`,
      parrafos: [`El curso que elegiste de <b>${prog}</b> está lleno por ahora, así que quedaste en la <b>lista de espera</b>.`, 'Apenas se libere un cupo te avisamos, en orden de llegada. No se cobra nada mientras esperas.'],
      boton: { texto: 'Escribir por WhatsApp', url: CONFIG.WHATSAPP_LINK },
    };
  } else if (tipo === 'beca') {
    asunto = 'Recibimos tu postulación a beca';
    o = {
      titulo: `¡Hola, ${saludo}!`,
      parrafos: ['Recibimos tu postulación a beca. La vamos a leer con calma y te respondemos por correo o WhatsApp.', 'Mientras tanto, puedes asegurar tu cupo: si te damos la beca, se descuenta de tu mensualidad.'],
      boton: { texto: 'Asegurar mi cupo', url: CONFIG.SITIO + '/inscripcion' },
    };
  } else if (tipo === 'aviso') {
    asunto = `Te avisaremos cuando abra ${x.programa}`;
    o = {
      titulo: `¡Hola, ${saludo}!`,
      parrafos: [`Quedaste en la lista de <b>${prog}</b>. Apenas abramos cupos, eres de los primeros en saberlo.`],
      boton: { texto: 'Ver otros programas', url: CONFIG.SITIO },
    };
  } else {
    asunto = 'Quedaste registrado en Lael';
    o = {
      titulo: `¡Hola, ${saludo}!`,
      parrafos: [`Quedaste registrado en <b>${prog}</b>. Unos días antes te mandamos el link y la hora exacta.`],
      boton: { texto: 'Escribir por WhatsApp', url: CONFIG.WHATSAPP_LINK },
    };
  }
  enviarCorreo_(x.correo, asunto, plantilla_(o));
}

function guardarTestimonio_(d) {
  const nombre = limpiar_(d.nombre, 80);
  const texto = limpiar_(d.testimonio, 1200);
  if (!nombre || texto.length < 10) return json_({ ok: false, error: 'datos_invalidos' });
  if (d.acepta_privacidad !== true) return json_({ ok: false, error: 'falta_consentimiento' });
  hoja_(HOJAS.TESTIMONIOS, COLUMNAS_TESTIMONIO).appendRow([
    new Date(), nombre, limpiar_(d.programa, 60), limpiar_(d.anio, 4), texto, limpiar_(d.recuerdo, 1200),
    limpiar_(d.como_publicar, 60), limpiar_(d.correo, 120), 'NO',
  ]);
  enviarCorreo_(CONFIG.AVISOS_A, `Nuevo testimonio de ${nombre}`, plantilla_({
    etiqueta: 'Nuevo testimonio',
    titulo: esc_(nombre),
    cita: esc_(texto),
    tabla: [['Programa', d.programa || '-'], ['Año', d.anio || '-'], ['Cómo publicarlo', d.como_publicar || '-']],
    boton: { texto: 'Abrir la planilla', url: SpreadsheetApp.getActiveSpreadsheet().getUrl() },
    pie: 'Para publicarlo en el sitio, cambia la columna "Publicar" a SI en la hoja Testimonios.',
  }));
  return json_({ ok: true });
}

function guardarEncuesta_(d) {
  const nota = Math.round(Number(d.nota));
  if (!(nota >= 1 && nota <= 7)) return json_({ ok: false, error: 'datos_invalidos' });
  hoja_(HOJAS.ENCUESTAS, COLUMNAS_ENCUESTA).appendRow([
    new Date(), limpiar_(d.programa, 60), nota, limpiar_(d.recomienda, 40), limpiar_(d.sirve, 1000), limpiar_(d.mejorar, 1000), limpiar_(d.nombre, 80),
  ]);
  // Solo te avisa si la nota es baja, para que puedas actuar rápido
  if (nota <= 4) {
    enviarCorreo_(CONFIG.AVISOS_A, `Encuesta con nota ${nota} (${limpiar_(d.programa, 60) || 'sin programa'})`, plantilla_({
      etiqueta: 'Encuesta',
      titulo: `Alguien puso nota ${nota}`,
      tabla: [['Programa', d.programa || '-'], ['Qué mejoraría', d.mejorar || '-'], ['Nombre', d.nombre || 'Anónimo']],
      pie: 'Te avisamos solo cuando la nota es 4 o menos. Todas las respuestas están en la hoja Encuestas.',
    }));
  }
  return json_({ ok: true });
}

// ── Tareas diarias (se ejecutan solas a las 9 de la mañana) ───────────────
function tareasDiarias() {
  const conf = leerConfig_();
  try { if (String(conf[CONF_RECORDAR] || 'SI').toUpperCase() === 'SI') recordarClasesDePrueba_(); } catch (err) { registrar_('error_recordatorio', String(err)); }
  try { encuestaMitadDeSemestre_(conf); } catch (err) { registrar_('error_encuesta', String(err)); }
  try { avisarCuposLiberados_(); } catch (err) { registrar_('error_cupos', String(err)); }
}

// Un día antes de la clase de prueba (columna "Fecha clase de prueba")
function recordarClasesDePrueba_() {
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJAS.INSCRIPCIONES);
  if (!hoja || hoja.getLastRow() < 2) return;
  const tz = Session.getScriptTimeZone();
  const filas = hoja.getRange(2, 1, hoja.getLastRow() - 1, COLUMNAS_INSCRIPCION.length).getValues();
  const manana = new Date(); manana.setDate(manana.getDate() + 1);
  const clave = Utilities.formatDate(manana, tz, 'yyyy-MM-dd');
  filas.forEach((f, i) => {
    const fecha = f[COL.FECHA_PRUEBA - 1];
    if (f[COL.TIPO - 1] !== 'clase-prueba' || !(fecha instanceof Date) || f[COL.RECORDATORIO - 1]) return;
    if (Utilities.formatDate(fecha, tz, 'yyyy-MM-dd') !== clave) return;
    const correo = String(f[COL.CORREO - 1]);
    if (!correoValido_(correo)) return;
    enviarCorreo_(correo, 'Mañana es tu clase de prueba en Lael', plantilla_({
      titulo: `¡Mañana nos vemos, ${esc_(String(f[COL.NOMBRE - 1]).split(' ')[0])}!`,
      parrafos: [
        `Te recordamos tu clase de prueba de <b>${esc_(f[COL.PROGRAMA - 1])}</b>. Es en vivo por Google Meet: entra con tu cuenta de Google unos minutos antes.`,
        'Si no te llegó el link o no puedes ir, avísanos por WhatsApp y la movemos.',
      ],
      boton: { texto: 'Escribir por WhatsApp', url: CONFIG.WHATSAPP_LINK },
    }));
    hoja.getRange(i + 2, COL.RECORDATORIO).setValue('Sí, ' + Utilities.formatDate(new Date(), tz, 'dd-MM'));
  });
}

// Encuesta a los alumnos confirmados o que pagaron, en las fechas elegidas
function encuestaMitadDeSemestre_(conf) {
  const tz = Session.getScriptTimeZone();
  const hoy = Utilities.formatDate(new Date(), tz, 'MM-dd');
  const fechas = String(conf[CONF_ENCUESTA] || '').split(',').map((s) => s.trim());
  if (fechas.indexOf(hoy) < 0) return;
  const props = PropertiesService.getScriptProperties();
  const marca = 'encuesta_' + Utilities.formatDate(new Date(), tz, 'yyyy') + '_' + hoy;
  if (props.getProperty(marca)) return;

  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJAS.INSCRIPCIONES);
  if (!hoja || hoja.getLastRow() < 2) return;
  const filas = hoja.getRange(2, 1, hoja.getLastRow() - 1, COL.ESTADO).getValues();
  const enviados = {};
  filas.forEach((f) => {
    const correo = String(f[COL.CORREO - 1]).toLowerCase();
    const estado = f[COL.ESTADO - 1];
    if (f[COL.TIPO - 1] !== 'inscripcion' || (estado !== 'Confirmado' && estado !== 'Pagó') || !correoValido_(correo) || enviados[correo]) return;
    enviados[correo] = true;
    const programa = String(f[COL.PROGRAMA - 1]);
    enviarCorreo_(correo, '¿Cómo vamos? Dos minutos para contarnos', plantilla_({
      titulo: `¡Hola, ${esc_(String(f[COL.NOMBRE - 1]).split(' ')[0])}!`,
      parrafos: [
        'Vamos en la mitad del semestre y queremos saber cómo te sientes con las clases.',
        'Son dos minutos y puedes responder sin poner tu nombre. Lo que nos digas sirve para mejorar lo que viene.',
      ],
      boton: { texto: 'Responder la encuesta', url: `${CONFIG.SITIO}/encuesta?programa=${encodeURIComponent(programa)}` },
    }));
  });
  props.setProperty(marca, String(Object.keys(enviados).length));
  registrar_('encuesta_enviada', Object.keys(enviados).length + ' correos');
}

// Si un curso tiene cupos libres y hay gente esperando, te avisa
function avisarCuposLiberados_() {
  const cupos = leerCupos_();
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJAS.INSCRIPCIONES);
  if (!hoja || hoja.getLastRow() < 2) return;
  const filas = hoja.getRange(2, 1, hoja.getLastRow() - 1, COL.ESTADO).getValues();
  const avisos = [];
  Object.keys(cupos).forEach((codigo) => {
    if (cupos[codigo].quedan <= 0) return;
    const esperando = filas.filter((f) => f[COL.TIPO - 1] === 'lista-espera' && String(f[COL.DETALLE - 1]).indexOf(codigo) >= 0 && (f[COL.ESTADO - 1] === 'Nuevo' || !f[COL.ESTADO - 1]));
    if (esperando.length) avisos.push([cupos[codigo].nombre, `${cupos[codigo].quedan} cupo(s) libre(s) · ${esperando.length} en espera: ${esperando.map((f) => f[COL.NOMBRE - 1]).join(', ')}`]);
  });
  if (!avisos.length) return;
  enviarCorreo_(CONFIG.AVISOS_A, 'Se liberaron cupos y hay gente en lista de espera', plantilla_({
    etiqueta: 'Lista de espera',
    titulo: 'Hay cupos para ofrecer',
    tabla: avisos,
    boton: { texto: 'Abrir la planilla', url: SpreadsheetApp.getActiveSpreadsheet().getUrl() },
    pie: 'Escríbeles en orden de llegada. Cuando los contactes, cambia su estado a "Contactado" y este aviso deja de llegar.',
  }));
}

// ── Correos con el diseño de Lael ─────────────────────────────────────────
// Tablas y estilos en línea: así se ve bien en Gmail, Outlook y el celular.
function plantilla_(o) {
  const azul = '#071D49'; const amarillo = '#D7E400'; const gris = '#F4F4F4';
  const p = (t) => `<p style="margin:0 0 14px;font-size:16px;line-height:1.55;color:${azul}">${t}</p>`;
  let cuerpo = '';
  if (o.etiqueta) cuerpo += `<p style="margin:0 0 6px;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#6B7A99">${esc_(o.etiqueta)}</p>`;
  if (o.titulo) cuerpo += `<h1 style="margin:0 0 18px;font-size:28px;line-height:1.2;color:${azul};font-family:Georgia,'Times New Roman',serif;font-style:italic;font-weight:normal">${o.titulo}</h1>`;
  (o.parrafos || []).forEach((t) => { cuerpo += p(t); });
  if (o.cita) cuerpo += `<blockquote style="margin:0 0 18px;padding:14px 18px;background:${gris};border-left:4px solid ${amarillo};border-radius:8px;font-size:16px;line-height:1.5;color:${azul}">“${o.cita}”</blockquote>`;
  if (o.pasos && o.pasos.length) {
    cuerpo += `<p style="margin:8px 0 10px;font-size:12px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:${azul}">Qué pasa ahora</p><table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 18px">`;
    o.pasos.forEach((t, i) => { cuerpo += `<tr><td style="vertical-align:top;padding:0 12px 10px 0"><div style="width:26px;height:26px;line-height:26px;border-radius:13px;background:${azul};color:${amarillo};text-align:center;font-weight:bold;font-size:13px">${i + 1}</div></td><td style="padding:3px 0 10px;font-size:15px;line-height:1.5;color:${azul}">${esc_(t)}</td></tr>`; });
    cuerpo += '</table>';
  }
  if (o.tabla && o.tabla.length) {
    cuerpo += `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 18px;border-collapse:collapse">`;
    o.tabla.forEach((f) => { cuerpo += `<tr><td style="padding:8px 10px 8px 0;border-bottom:1px solid #E3E7EF;font-size:13px;color:#6B7A99;vertical-align:top">${esc_(f[0])}</td><td style="padding:8px 0;border-bottom:1px solid #E3E7EF;font-size:15px;color:${azul};font-weight:bold">${esc_(f[1])}</td></tr>`; });
    cuerpo += '</table>';
  }
  if (o.caja) cuerpo += `<div style="margin:0 0 18px;padding:16px 18px;background:${gris};border-radius:12px"><p style="margin:0 0 6px;font-size:12px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:${azul}">${esc_(o.caja.titulo)}</p><p style="margin:0;font-size:15px;line-height:1.55;color:${azul}">${o.caja.texto}</p></div>`;
  if (o.boton) cuerpo += `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:6px 0 10px"><tr><td style="border-radius:14px;background:${amarillo}"><a href="${o.boton.url}" style="display:inline-block;padding:15px 26px;font-size:15px;font-weight:bold;color:${azul};text-decoration:none;border-radius:14px">${esc_(o.boton.texto)} &rarr;</a></td></tr></table>`;
  if (o.secundario) cuerpo += `<p style="margin:6px 0 0;font-size:14px"><a href="${o.secundario.url}" style="color:${azul};font-weight:bold">${esc_(o.secundario.texto)}</a></p>`;
  if (o.pie) cuerpo += `<p style="margin:18px 0 0;font-size:13px;line-height:1.5;color:#6B7A99">${esc_(o.pie)}</p>`;

  return `<!doctype html><html lang="es"><body style="margin:0;padding:0;background:${gris}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${gris}"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;font-family:Arial,Helvetica,sans-serif">
<tr><td style="background:${azul};border-radius:20px 20px 0 0;padding:22px 28px">
<span style="font-family:Georgia,serif;font-size:26px;letter-spacing:6px;color:#FFFFFF;font-weight:bold">LAEL</span>
<span style="display:inline-block;width:28px;height:4px;background:${amarillo};border-radius:2px;margin-left:10px;vertical-align:middle"></span>
<div style="font-size:11px;letter-spacing:3px;color:#B5BFD6;margin-top:2px">INSTITUTO</div>
</td></tr>
<tr><td style="background:#FFFFFF;padding:28px;border-radius:0 0 20px 20px">${cuerpo}</td></tr>
<tr><td style="padding:18px 8px;text-align:center;font-size:12px;line-height:1.6;color:#6B7A99">
Instituto Lael SpA · Santiago, Chile<br>
<a href="${CONFIG.SITIO}" style="color:#6B7A99">institutolael.cl</a> · WhatsApp ${CONFIG.WHATSAPP} · <a href="${CONFIG.SITIO}/privacidad" style="color:#6B7A99">Privacidad</a>
</td></tr></table></td></tr></table></body></html>`;
}

// Versión en texto simple del correo (para programas que no muestran HTML)
function aTexto_(html) {
  const cuerpo = String(html).split('<tr><td style="background:#FFFFFF')[1] || String(html);
  return cuerpo.replace(/<br\s*\/?>/gi, '\n').replace(/<\/(p|h1|tr|div|blockquote)>/gi, '\n').replace(/<[^>]+>/g, '')
    .replace(/^[^>]*>/, '').replace(/&rarr;/g, '→').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

// ── Utilidades ────────────────────────────────────────────────────────────
function leerConfig_() {
  const h = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJAS.CONFIGURACION);
  const out = {};
  if (!h || h.getLastRow() < 2) return out;
  h.getRange(2, 1, h.getLastRow() - 1, 2).getValues().forEach((f) => { if (f[0]) out[String(f[0])] = String(f[1]); });
  return out;
}

function limpiar_(valor, max) {
  let s = String(valor == null ? '' : valor).replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, max);
  // Evita que alguien meta fórmulas en la planilla (=, +, -, @)
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}
// Para mostrar texto dentro de un correo HTML sin riesgo
function esc_(s) {
  return String(s == null ? '' : s).replace(/^'/, '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function correoValido_(c) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c); }
function telefonoValido_(t) { return /^[+\d][\d\s-]{7,18}$/.test(t); }

function permitirEnvio_(correo) {
  const cache = CacheService.getScriptCache();
  const minuto = 'min_' + Math.floor(Date.now() / 60000);
  const total = Number(cache.get(minuto) || 0);
  if (total >= CONFIG.MAX_POR_MINUTO) { registrar_('limite_global', minuto); return false; }
  cache.put(minuto, String(total + 1), 120);
  if (correo) {
    const clave = 'c_' + Utilities.base64EncodeWebSafe(correo.toLowerCase()).slice(0, 200);
    const n = Number(cache.get(clave) || 0);
    if (n >= CONFIG.MAX_POR_CORREO) { registrar_('limite_correo', correo); return false; }
    cache.put(clave, String(n + 1), 600);
  }
  return true;
}

function enviarCorreo_(para, asunto, html, texto) {
  try {
    MailApp.sendEmail({ to: para, subject: asunto, htmlBody: html, body: texto || aTexto_(html), name: CONFIG.NOMBRE_REMITENTE, replyTo: CONFIG.AVISOS_A });
  } catch (err) { registrar_('error_correo', para + ' ' + err); }
}

function registrar_(evento, detalle) {
  try {
    const h = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJAS.REGISTRO);
    if (h) h.appendRow([new Date(), evento, String(detalle).slice(0, 500)]);
  } catch (_) {}
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Para ver el diseño de los correos sin llenar el formulario: ejecútala
// desde el editor y te llegan dos ejemplos a contacto@institutolael.cl.
function probarCorreo() {
  const d = { quiere_beca: true, edad: '17', apoderado_nombre: 'Apoderado de prueba', apoderado_telefono: '+56 9 1111 1111', como_conocio: 'Instagram' };
  correoConfirmacion_('inscripcion', { nombre: 'Diego Prueba', correo: CONFIG.AVISOS_A, programa: 'Preu PAES 2027', espera: [], d });
  avisarNuevo_('inscripcion', { nombre: 'Diego Prueba', correo: CONFIG.AVISOS_A, telefonoOriginal: '+56 9 6462 6568', programa: 'Preu PAES 2027', detalle: 'paes-m1, paes-cl · $24.000/mes', espera: [], d });
}
