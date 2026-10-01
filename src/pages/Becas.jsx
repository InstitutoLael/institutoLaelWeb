import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, ShieldCheck, Mail } from 'lucide-react';
import BrandArcs from '../components/ui/BrandArcs';
import PageHero, { SectionTitle, fadeUp, SECTION } from '../components/ui/PageHero';
import { INPUT, LABEL, TEL_RE, MAIL_RE, Honeypot, CheckAnimado, ErrorMsg } from '../components/ui/FormBits';
import { sendForm, backendReady, whatsappUrl } from '../lib/backend';
import { trackEvent } from '../utils/analytics';

const PROGRAMAS = ['Preu PAES', 'Intensivo PAES', 'Inglés', 'Clases particulares', 'Otro'];
const PAGO = ['Nada por ahora', 'Hasta $5.000 al mes', 'Entre $5.000 y $10.000 al mes', 'Entre $10.000 y $20.000 al mes', 'Más de $20.000 al mes'];

const COMO = [
  { t: 'Postulas aquí', d: 'Te toma tres minutos. Nos cuentas tu situación con tus palabras, sin papeleo.' },
  { t: 'La revisamos con calma', d: 'Cada postulación la lee el equipo de Lael. Ningún sistema decide por nosotros.' },
  { t: 'Te respondemos', d: 'Por correo o WhatsApp, con el porcentaje de beca que te podemos dar.' },
];

const FAQ = [
  { q: '¿Cuánto cubre una beca?', a: 'Son becas parciales: un porcentaje de la mensualidad que depende de cada caso. Lo que pagan los demás alumnos y las empresas es lo que nos permite darlas.' },
  { q: '¿Hay un límite de becas?', a: 'Sí. Cada año tenemos un número limitado, por eso conviene postular antes de que parta el curso.' },
  { q: '¿Tengo que mandar documentos?', a: 'No para postular. Si necesitamos saber algo más, te escribimos.' },
  { q: '¿La Escuela de Sueños tiene beca?', a: 'No la necesita: la nivelación para adultos es gratis para todos.' },
];

// Apadrinar: una persona o empresa aporta cada mes y con eso se cubre parte
// de una beca. Por ahora se coordina por WhatsApp o correo.
const APORTES = ['$10.000 al mes', '$20.000 al mes', 'Lo que puedas'];

const EMPTY = { nombre: '', correo: '', telefono: '', edad: '', programa: PROGRAMAS[0], puede_pagar: '', motivo: '', acepta_privacidad: false, sitio_web: '' };

export default function Becas() {
  const started = useRef(Date.now());
  const [f, setF] = useState(EMPTY);
  const [estado, setEstado] = useState('idle');
  const [error, setError] = useState('');
  const [campo, setCampo] = useState('');
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const inv = (id) => (campo === id ? { 'aria-invalid': true, 'aria-describedby': 'beca-error' } : {});
  const fallo = (msg, id) => { setError(msg); setCampo(id); const el = document.getElementById(id); if (el) el.focus(); };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (f.nombre.trim().length < 3) return fallo('Escribe tu nombre completo.', 'b-nombre');
    if (!MAIL_RE.test(f.correo.trim())) return fallo('Revisa tu correo.', 'b-correo');
    if (!TEL_RE.test(f.telefono.trim())) return fallo('Revisa tu teléfono (ej: +56 9 1234 5678).', 'b-telefono');
    if (f.motivo.trim().length < 20) return fallo('Cuéntanos un poco más de tu situación (al menos una o dos frases).', 'b-motivo');
    if (!f.acepta_privacidad) return fallo('Debes aceptar la política de privacidad.', 'b-priv');
    setError(''); setCampo(''); setEstado('enviando');
    trackEvent('beca_enviada', { programa: f.programa });
    const payload = {
      ...f,
      tipo: 'beca',
      programa: f.programa,
      detalle: `Beca · Podría pagar: ${f.puede_pagar || 'no indicó'}`,
      comentario: f.motivo,
      quiere_beca: true,
      acepta_avisos: true,
      origen: 'pagina-becas',
      _t: Date.now() - started.current,
    };
    if (backendReady()) {
      try { await sendForm(payload); setEstado('ok'); return; } catch (_) { /* respaldo por WhatsApp */ }
    }
    window.open(whatsappUrl(`Hola! Quiero postular a una beca.\nNombre: ${f.nombre}\nPrograma: ${f.programa}\nPodría pagar: ${f.puede_pagar}\nMi situación: ${f.motivo}`), '_blank', 'noopener');
    setEstado('ok');
  };

  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Becas | Instituto Lael</title>
        <meta name="description" content="Postula a una beca parcial en Instituto Lael para el preu PAES, inglés o clases particulares. También puedes apadrinar una beca. Sin papeleo: nos cuentas tu situación y te respondemos." />
      </Helmet>

      <PageHero eyebrow="Becas 2027" title="Que la plata no sea" accent="lo que te frene.">
        Tenemos becas parciales para quien las necesite. Postular es gratis, toma tres minutos y no te compromete a nada.
      </PageHero>

      <section className={`${SECTION} bg-white`}>
        <div className="max-w-5xl mx-auto">
          <SectionTitle eyebrow="Cómo funciona" title="Tres pasos," accent="sin papeleo." className="text-center mb-10" />
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COMO.map((c, i) => (
              <motion.li key={c.t} {...fadeUp(i * 0.05)} className="rounded-[24px] p-6 bg-[#F4F4F4] border border-[#071D49]/5">
                <p className="font-serif italic text-4xl text-[#071D49]/60 mb-2">{i + 1}</p>
                <h3 className="font-display font-extrabold text-lg mb-1.5">{c.t}</h3>
                <p className="text-[#071D49]/70 text-sm leading-relaxed">{c.d}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section id="postular" className={SECTION}>
        <div className="max-w-2xl mx-auto">
          <SectionTitle eyebrow="Postula" title="Cuéntanos" accent="tu situación." className="text-center mb-8" />
          {estado === 'ok' ? (
            <div className="bg-white rounded-[28px] p-8 text-center border border-[#071D49]/5 shadow-card" role="status">
              <CheckAnimado className="mx-auto mb-5" />
              <h3 className="font-display text-2xl font-extrabold mb-2">Recibimos tu postulación</h3>
              <p className="text-[#071D49]/75 mb-6">La vamos a leer con calma y te respondemos por correo o WhatsApp. Mientras, puedes asegurar tu cupo: si te damos la beca, se descuenta de tu mensualidad.</p>
              <a href="/inscripcion?programa=paes" className="inline-flex items-center gap-2 font-bold underline">Ir a la inscripción <ArrowRight size={16} /></a>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="relative bg-white rounded-[28px] p-5 sm:p-8 border border-[#071D49]/5 shadow-card space-y-4">
              <Honeypot value={f.sitio_web} onChange={set('sitio_web')} />
              <div><label htmlFor="b-nombre" className={LABEL}>Nombre completo</label><input id="b-nombre" {...inv('b-nombre')} autoComplete="name" className={INPUT} value={f.nombre} onChange={set('nombre')} /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label htmlFor="b-correo" className={LABEL}>Correo</label><input id="b-correo" {...inv('b-correo')} type="email" autoComplete="email" inputMode="email" className={INPUT} value={f.correo} onChange={set('correo')} /></div>
                <div><label htmlFor="b-telefono" className={LABEL}>WhatsApp</label><input id="b-telefono" {...inv('b-telefono')} type="tel" autoComplete="tel" inputMode="tel" placeholder="+56 9 1234 5678" className={INPUT} value={f.telefono} onChange={set('telefono')} /></div>
                <div><label htmlFor="b-edad" className={LABEL}>Edad</label><input id="b-edad" inputMode="numeric" className={INPUT} value={f.edad} onChange={(e) => setF((s) => ({ ...s, edad: e.target.value.replace(/\D/g, '').slice(0, 2) }))} /></div>
                <div><label htmlFor="b-prog" className={LABEL}>¿Para qué programa?</label>
                  <select id="b-prog" className={INPUT} value={f.programa} onChange={set('programa')}>{PROGRAMAS.map((p) => <option key={p}>{p}</option>)}</select></div>
              </div>
              <div><label htmlFor="b-pago" className={LABEL}>¿Cuánto podrías pagar al mes?</label>
                <select id="b-pago" className={INPUT} value={f.puede_pagar} onChange={set('puede_pagar')}><option value="">Elige una opción</option>{PAGO.map((p) => <option key={p}>{p}</option>)}</select></div>
              <div><label htmlFor="b-motivo" className={LABEL}>¿Por qué necesitas la beca?</label>
                <textarea id="b-motivo" {...inv('b-motivo')} rows={5} className={`${INPUT} py-3`} placeholder="Con tus palabras. Lo que nos cuentes queda entre nosotros." value={f.motivo} onChange={set('motivo')} /></div>
              <label className="flex items-start gap-3 min-h-[44px] cursor-pointer">
                <input id="b-priv" {...inv('b-priv')} type="checkbox" className="mt-1 w-5 h-5 rounded text-[#071D49] focus:ring-[#071D49]" checked={f.acepta_privacidad} onChange={set('acepta_privacidad')} />
                <span className="text-sm">Acepto la <Link to="/privacidad" target="_blank" className="underline font-semibold">política de privacidad</Link>.</span>
              </label>
              <ErrorMsg id="beca-error">{error}</ErrorMsg>
              <button type="submit" disabled={estado === 'enviando'} className="w-full min-h-[56px] rounded-2xl bg-[#D7E400] text-[#071D49] font-display font-extrabold text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2 disabled:opacity-70">
                {estado === 'enviando' ? <><Loader2 size={18} className="animate-spin" /> Enviando…</> : <>Enviar mi postulación <ArrowRight size={18} /></>}
              </button>
              <p className="text-xs text-[#071D49]/70 flex items-center gap-1.5 justify-center"><ShieldCheck size={14} /> Solo el equipo de Lael lee tu postulación.</p>
            </form>
          )}
        </div>
      </section>

      <section className={`${SECTION} bg-white`}>
        <div className="max-w-3xl mx-auto">
          <SectionTitle title="Preguntas" accent="sobre becas." className="text-center mb-8" />
          <div className="space-y-3">
            {FAQ.map((q) => (
              <details key={q.q} className="group rounded-2xl bg-[#F4F4F4] border border-[#071D49]/5 p-5 open:bg-white open:shadow-card">
                <summary className="font-display font-bold cursor-pointer list-none flex justify-between gap-4">{q.q}<span aria-hidden="true" className="transition-transform group-open:rotate-45 text-xl leading-none">+</span></summary>
                <p className="mt-3 text-[#071D49]/75 leading-relaxed">{q.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="apadrina" className={`${SECTION} relative overflow-hidden bg-[#071D49] text-white`}>
        <BrandArcs />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D7E400] mb-3">¿Quieres ayudar?</p>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] mb-5">
            Apadrina <span className="accent-serif text-[#D7E400]">una beca.</span>
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8">
            Con un aporte mensual cubres parte de la beca de un estudiante que no podría pagar el preu. Todo lo que aportas va a becas, y cada semestre te contamos a cuántos alumnos ayudó, sin dar sus nombres.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {APORTES.map((a) => <span key={a} className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold">{a}</span>)}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href={whatsappUrl('Hola! Me gustaría apadrinar una beca en Lael. ¿Cómo lo hago?')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('apadrinar_click', { via: 'whatsapp' })}
              className="min-h-[52px] inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D7E400] text-[#071D49] hover:bg-white px-7 font-display font-extrabold text-sm uppercase tracking-wider transition-colors"
            >
              Quiero apadrinar <ArrowRight size={16} />
            </a>
            <a href="mailto:director@institutolael.cl?subject=Apadrinar%20una%20beca" className="min-h-[44px] inline-flex items-center gap-2 font-semibold underline underline-offset-4 text-white/85 hover:text-white">
              <Mail size={16} /> director@institutolael.cl
            </a>
          </div>
          <p className="text-xs text-white/60 mt-6">Instituto Lael es una SpA, así que el aporte no descuenta impuestos. Si eres empresa, también puedes hacerlo como convenio: <Link to="/empresas" className="underline">mira aquí</Link>.</p>
        </div>
      </section>
    </div>
  );
}
