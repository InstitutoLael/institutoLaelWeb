// src/data/trae-un-amigo.js
// === Trae un amigo (referidos) · página /trae-un-amigo ===
// Regla: 20% de descuento en tu próxima mensualidad por cada amigo que se
// inscribe y paga su primer mes. 5 amigos = un mes gratis. El descuento lo
// asume el instituto (los profes reciben su pago completo).

export const REFERIDO_DESCUENTO = '20%';
export const REFERIDO_MES_GRATIS = 5;

// Mensaje listo para compartir por WhatsApp (sin número: el alumno elige a quién).
export const REFERIDO_MENSAJE = '¡Hola! Estoy en Instituto Lael, un preu online con clases en vivo por Google Meet. La matrícula es gratis y hay becas. Si te interesa, inscríbete en institutolael.cl/inscripcion y di que vas de parte mía.';
export const REFERIDO_SHARE_URL = `https://wa.me/?text=${encodeURIComponent(REFERIDO_MENSAJE)}`;

export const REFERIDO_HERO = {
  eyebrow: 'Trae un amigo',
  title: 'Estudiar acompañado',
  accent: 'sale más barato.',
  desc: `Por cada amigo que se inscribe en Lael y paga su primer mes, tienes ${REFERIDO_DESCUENTO} de descuento en tu siguiente mensualidad. Con ${REFERIDO_MES_GRATIS} amigos, tu mes sale gratis.`,
  stats: [[REFERIDO_DESCUENTO, 'Por cada amigo'], [`${REFERIDO_MES_GRATIS} amigos`, 'Mes gratis'], ['Lael', 'Pone el descuento']],
};

export const REFERIDO_STEPS = [
  { title: 'Comparte el mensaje', desc: 'Aprieta el botón y mándale el mensaje por WhatsApp a quien quieras.' },
  { title: 'Tu amigo se inscribe', desc: 'Llena el formulario en institutolael.cl/inscripcion y dice que va de parte tuya.' },
  { title: 'Paga su primer mes', desc: 'Cuando tu amigo paga su primera mensualidad, el descuento queda para ti.' },
  { title: 'Pagas menos', desc: `Tu siguiente mensualidad baja ${REFERIDO_DESCUENTO} por cada amigo. Con ${REFERIDO_MES_GRATIS}, no pagas ese mes.` },
];

export const REFERIDO_FAQS = [
  { q: '¿Quién puede invitar?', a: 'Cualquier alumno de Lael con un programa pagado.' },
  { q: '¿Cuándo se aplica el descuento?', a: 'En tu mensualidad siguiente, una vez que tu amigo haya pagado su primer mes.' },
  { q: '¿Se suman los descuentos?', a: `Sí. Cada amigo te da ${REFERIDO_DESCUENTO}. Con ${REFERIDO_MES_GRATIS} amigos, tu mensualidad siguiente es gratis.` },
  { q: '¿Mi amigo paga más por esto?', a: 'No. Tu amigo paga lo mismo que cualquier alumno, y el descuento lo pone Lael. Los profes reciben su pago completo.' },
  { q: '¿Cómo sabemos que viene de parte mía?', a: 'Tu amigo escribe tu nombre al inscribirse o nos lo dice por WhatsApp. Si tienes dudas, escríbenos y lo revisamos.' },
];
