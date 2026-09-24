/**
 * ============================================================================
 *  INSTITUTO LAEL · Sistema de inscripciones (Google Apps Script)
 * ============================================================================
 *
 *  Qué hace:
 *  - Recibe las inscripciones, clases de prueba, testimonios y mensajes que
 *    llegan desde institutolael.cl y los guarda en esta planilla.
 *  - Te avisa por correo cada vez que llega algo nuevo y le manda a la
 *    persona un correo de confirmación desde tu correo institucional.
 *  - Le entrega al sitio SOLO datos públicos: cuántos cupos quedan por curso
 *    y los testimonios que tú marcaste como "SI" en la columna Publicar.
 *
 *  Seguridad:
 *  - El sitio puede AGREGAR filas, pero nunca LEER datos personales.
 *  - Todo se valida (largo, formato de correo y teléfono) y se limpia para
 *    que nadie pueda meter fórmulas en la planilla.
 *  - Campo trampa (honeypot) y límite de envíos para frenar robots.
 *  - Solo tú (y quien tú invites) puede abrir la planilla.
 *
 *  Cómo instalarlo: mira INSTRUCCIONES.md en esta misma carpeta.
 * ============================================================================
 */

// ── Configuración ─────────────────────────────────────────────────────────
const CONFIG = {
  // A quién le llegan los avisos de nuevas inscripciones
  AVISOS_A: 'contacto@institutolael.cl',
  // Nombre con el que salen los correos de confirmación
  NOMBRE_REMITENTE: 'Instituto Lael',
  WHATSAPP: '+56 9 6462 6568',
  // Máximo de envíos por correo electrónico cada 10 minutos
  MAX_POR_CORREO: 3,
  // Máximo total de envíos por minuto (freno contra ataques masivos)
  MAX_POR_MINUTO: 30,
};

const HOJAS = {
  INSCRIPCIONES: 'Inscripciones',
  TESTIMONIOS: 'Testimonios',
  CURSOS: 'Cursos',
  REGISTRO: 'Registro técnico',
};

const COLUMNAS_INSCRIPCION = [
  'Fecha', 'Tipo', 'Programa', 'Detalle (ramos / curso)', 'Nombre', 'Correo', 'Teléfono',
  'Edad', 'Curso o nivel actual', 'Comuna / Región',
  'Apoderado: nombre', 'Apoderado: correo', 'Apoderado: teléfono',
  'Quiere beca', 'Viene de parte de (Trae un amigo)', 'Cómo nos conoció', 'Comentario',
  'Acepta avisos', 'Página de origen', 'Estado', 'Notas internas',
];

const COLUMNAS_TESTIMONIO = [
  'Fecha', 'Nombre', 'Programa', 'Año', 'Testimonio', 'Lo que más recuerda',
  'Cómo publicarlo', 'Correo', 'Publicar (SI/NO)',
];

// ── Instalación: ejecuta esta función UNA vez desde el editor ─────────────
function instalar() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  crearHoja_(ss, HOJAS.INSCRIPCIONES, COLUMNAS_INSCRIPCION);
  crearHoja_(ss, HOJAS.TESTIMONIOS, COLUMNAS_TESTIMONIO);
  const cursos = crearHoja_(ss, HOJAS.CURSOS, ['Código del curso', 'Nombre', 'Cupo máximo', 'Inscritos (automático)', 'Mostrar en el sitio (SI/NO)']);
  if (cursos.getLastRow() === 1) {
    const ejemplos = [
      ['paes-m1', 'PAES · Matemática M1', 20],
      ['paes-cl', 'PAES · Competencia Lectora', 20],
      ['paes-m2', 'PAES · Matemática M2', 20],
      ['paes-bio', 'PAES · Biología', 20],
      ['paes-qui', 'PAES · Química', 20],
      ['paes-fis', 'PAES · Física', 20],
      ['paes-his', 'PAES · Historia', 20],
      ['ingles', 'Inglés', 20],
      ['adultos', 'Escuela de Sueños', 30],
    ];
    ejemplos.forEach((e, i) => {
      const fila = i + 2;
      cursos.getRange(fila, 1, 1, 3).setValues([e]);
      // Cuenta sola las inscripciones de este curso (menos las marcadas "No siguió")
      cursos.getRange(fila, 4).setFormula(
        `=COUNTIFS(${HOJAS.INSCRIPCIONES}!B:B,"inscripcion",${HOJAS.INSCRIPCIONES}!T:T,"<>No siguió",${HOJAS.INSCRIPCIONES}!D:D,"*"&A${fila}&"*")`
      );
      cursos.getRange(fila, 5).setValue('SI');
    });
  }
  crearHoja_(ss, HOJAS.REGISTRO, ['Fecha', 'Evento', 'Detalle']).hideSheet();

  // Lista desplegable de estados en la hoja de inscripciones
  const hoja = ss.getSheetByName(HOJAS.INSCRIPCIONES);
  const regla = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Nuevo', 'Contactado', 'Confirmado', 'Pagó', 'No siguió'], true).build();
  hoja.getRange(2, COLUMNAS_INSCRIPCION.indexOf('Estado') + 1, 1000, 1).setDataValidation(regla);
  Logger.log('Listo. Ahora implementa como aplicación web (ver INSTRUCCIONES.md).');
}

function crearHoja_(ss, nombre, columnas) {
  let hoja = ss.getSheetByName(nombre);
  if (!hoja) hoja = ss.insertSheet(nombre);
  if (hoja.getLastRow() === 0) {
    hoja.getRange(1, 1, 1, columnas.length).setValues([columnas])
      .setFontWeight('bold').setBackground('#071D49').setFontColor('#FFFFFF');
    hoja.setFrozenRows(1);
  }
  return hoja;
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

// ── El sitio envía una inscripción, clase de prueba o testimonio ──────────
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
    return guardarInscripcion_(data);
  } catch (err) {
    registrar_('error_post', String(err));
    return json_({ ok: false, error: 'error_interno' });
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

function guardarInscripcion_(d) {
  const tipo = limpiar_(d.tipo, 30) || 'inscripcion';
  const nombre = limpiar_(d.nombre, 80);
  const correo = limpiar_(d.correo, 120).toLowerCase();
  // El teléfono se valida tal como lo escribió la persona (ej. "+56 9 1234 5678")
  // y recién después se protege para la planilla, que antepone ' a lo que
  // empieza con "+" para que no se lea como fórmula.
  const telefonoOriginal = String(d.telefono == null ? '' : d.telefono).trim().slice(0, 20);
  const telefono = limpiar_(telefonoOriginal, 21);
  if (!nombre || !correoValido_(correo) || !telefonoValido_(telefonoOriginal)) return json_({ ok: false, error: 'datos_invalidos' });
  if (d.acepta_privacidad !== true) return json_({ ok: false, error: 'falta_consentimiento' });

  const fila = [
    new Date(), tipo, limpiar_(d.programa, 60), limpiar_(d.detalle, 300), nombre, correo, telefono,
    limpiar_(d.edad, 3), limpiar_(d.curso_actual, 60), limpiar_(d.comuna, 80),
    limpiar_(d.apoderado_nombre, 80), limpiar_(d.apoderado_correo, 120), limpiar_(d.apoderado_telefono, 20),
    d.quiere_beca ? 'Sí' : 'No', limpiar_(d.referido, 80), limpiar_(d.como_conocio, 80), limpiar_(d.comentario, 1000),
    d.acepta_avisos ? 'Sí' : 'No', limpiar_(d.origen, 120), 'Nuevo', '',
  ];
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJAS.INSCRIPCIONES).appendRow(fila);

  const esPrueba = tipo === 'clase-prueba';
  avisarAlInstituto_(
    `${esPrueba ? 'Clase de prueba' : 'Nueva inscripción'}: ${nombre} · ${limpiar_(d.programa, 60)}`,
    `Nombre: ${nombre}\nCorreo: ${correo}\nTeléfono: ${telefono}\nPrograma: ${d.programa}\nDetalle: ${d.detalle || '-'}\n` +
    `Quiere beca: ${d.quiere_beca ? 'Sí' : 'No'}\nViene de parte de: ${d.referido || '-'}\nComentario: ${d.comentario || '-'}\n\n` +
    `Revísalo en la planilla: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}`
  );

  const saludo = nombre.split(' ')[0];
  const cuerpo = esPrueba
    ? `¡Hola ${saludo}!\n\nRecibimos tu solicitud de clase de prueba para ${d.programa}. Te vamos a escribir por WhatsApp o correo para coordinar el día y la hora.\n\n` +
      `Si tienes dudas, escríbenos al WhatsApp ${CONFIG.WHATSAPP}.\n\nUn abrazo,\nEquipo Lael`
    : `¡Hola ${saludo}!\n\nRecibimos tu inscripción en ${d.programa}. Tu cupo queda reservado mientras te contactamos para confirmar horarios y el primer pago.\n\n` +
      `Recuerda: la matrícula es gratis${d.quiere_beca ? ' y vamos a revisar tu postulación a beca' : ''}.\n\n` +
      `Si tienes dudas, escríbenos al WhatsApp ${CONFIG.WHATSAPP}.\n\nNos vemos pronto,\nEquipo Lael`;
  enviarCorreo_(correo, esPrueba ? 'Recibimos tu solicitud de clase de prueba' : 'Recibimos tu inscripción en Instituto Lael', cuerpo);

  // Si hay apoderado, le avisamos también
  const correoApoderado = limpiar_(d.apoderado_correo, 120).toLowerCase();
  if (correoValido_(correoApoderado) && correoApoderado !== correo) {
    enviarCorreo_(correoApoderado, `Inscripción de ${saludo} en Instituto Lael`,
      `Hola,\n\n${nombre} se inscribió en ${d.programa} en Instituto Lael y te dejó como apoderado. Te escribiremos para coordinar.\n\n` +
      `Cualquier duda, al WhatsApp ${CONFIG.WHATSAPP}.\n\nEquipo Lael`);
  }
  return json_({ ok: true });
}

function guardarTestimonio_(d) {
  const nombre = limpiar_(d.nombre, 80);
  const texto = limpiar_(d.testimonio, 1200);
  if (!nombre || texto.length < 10) return json_({ ok: false, error: 'datos_invalidos' });
  if (d.acepta_privacidad !== true) return json_({ ok: false, error: 'falta_consentimiento' });
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJAS.TESTIMONIOS).appendRow([
    new Date(), nombre, limpiar_(d.programa, 60), limpiar_(d.anio, 4), texto, limpiar_(d.recuerdo, 1200),
    limpiar_(d.como_publicar, 60), limpiar_(d.correo, 120), 'NO',
  ]);
  avisarAlInstituto_(`Nuevo testimonio de ${nombre}`,
    `${nombre} (${d.programa || '-'}) dejó un testimonio:\n\n"${texto}"\n\nPara publicarlo, cambia la columna "Publicar" a SI: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}`);
  return json_({ ok: true });
}

// ── Utilidades ────────────────────────────────────────────────────────────
function limpiar_(valor, max) {
  let s = String(valor == null ? '' : valor).replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, max);
  // Evita que alguien meta fórmulas en la planilla (=, +, -, @)
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
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

function enviarCorreo_(para, asunto, cuerpo) {
  try { MailApp.sendEmail({ to: para, subject: asunto, body: cuerpo, name: CONFIG.NOMBRE_REMITENTE, replyTo: CONFIG.AVISOS_A }); }
  catch (err) { registrar_('error_correo', para + ' ' + err); }
}
function avisarAlInstituto_(asunto, cuerpo) { enviarCorreo_(CONFIG.AVISOS_A, asunto, cuerpo); }

function registrar_(evento, detalle) {
  try {
    const h = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJAS.REGISTRO);
    if (h) h.appendRow([new Date(), evento, String(detalle).slice(0, 500)]);
  } catch (_) {}
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
