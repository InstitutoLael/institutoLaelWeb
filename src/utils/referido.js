// Programa Embajadores Lael: guarda el código de quien te invitó.
// Cualquier link del sitio con ?ref=CODIGO (o ?amigo=) lo deja anotado 30 días
// en este navegador, y el formulario de inscripción lo trae escrito.
const KEY = 'lael_ref';
const DIAS = 30;

const limpiar = (v) => String(v || '').trim().slice(0, 60);

export function guardarReferido(search) {
  try {
    const p = new URLSearchParams(search || '');
    const codigo = limpiar(p.get('ref') || p.get('amigo'));
    if (!codigo) return;
    window.localStorage.setItem(KEY, JSON.stringify({ codigo, t: Date.now() }));
  } catch { /* sin almacenamiento: no pasa nada */ }
}

export function leerReferido() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return '';
    const { codigo, t } = JSON.parse(raw);
    if (!codigo || Date.now() - t > DIAS * 864e5) return '';
    return limpiar(codigo);
  } catch { return ''; }
}
