// Conexión con la planilla de Google de Lael (Google Apps Script).
// Ver google-apps-script/INSTRUCCIONES.md. Mientras BACKEND_URL esté vacío,
// los formularios usan WhatsApp como respaldo y los cupos no se muestran.
export const BACKEND_URL = 'https://script.google.com/macros/s/AKfycbxqCjg89BZbFA46ohCMaYr9khZmip4ligyq8CIjyCV32uz9fXPM928CYo8qgSD0FCg1PA/exec';

export const WHATSAPP_NUMBER = '56964626568';
export const whatsappUrl = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const backendReady = () => Boolean(BACKEND_URL);

// Envía un formulario. Usa text/plain para que el navegador no haga una
// consulta previa (Apps Script no la soporta).
export async function sendForm(data) {
  if (!BACKEND_URL) throw new Error('sin_backend');
  const res = await fetch(BACKEND_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(data),
    redirect: 'follow',
  });
  const json = await res.json().catch(() => ({ ok: false, error: 'respuesta' }));
  if (!json.ok) throw new Error(json.error || 'error');
  return json;
}

// Datos públicos (cupos por curso, testimonios aprobados), con caché corto
// en memoria para no consultar la planilla en cada página.
const cache = new Map();
async function getPublic(accion) {
  if (!BACKEND_URL) return null;
  const hit = cache.get(accion);
  if (hit && Date.now() - hit.t < 5 * 60 * 1000) return hit.v;
  try {
    const res = await fetch(`${BACKEND_URL}?accion=${accion}`, { redirect: 'follow' });
    const json = await res.json();
    if (!json.ok) return null;
    cache.set(accion, { t: Date.now(), v: json });
    return json;
  } catch (_) {
    return null;
  }
}

export async function getCupos() {
  const json = await getPublic('cupos');
  return json ? json.cupos : null;
}

export async function getTestimonios() {
  const json = await getPublic('testimonios');
  return json ? json.testimonios : [];
}
