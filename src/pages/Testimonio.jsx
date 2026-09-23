import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Loader2, ArrowRight } from 'lucide-react';
import { Corazon } from '../components/icons/LaelIcons';
import { sendForm, backendReady, whatsappUrl } from '../lib/backend';

const BLUE = '#071D49';
const YELLOW = '#D7E400';
const INPUT = 'w-full rounded-xl border border-[#071D49]/20 bg-white px-4 min-h-[52px] text-base text-[#071D49] placeholder:text-[#071D49]/60 focus:outline-none focus:border-[#071D49] focus:ring-4 focus:ring-[#071D49]/10';
const LABEL = 'block text-sm font-bold mb-1.5';
const PROGRAMAS = ['PAES', 'Inglés', 'Lengua de Señas Chilena', 'Escuela de Sueños', 'Otro'];
const PUBLICAR = ['Con mi nombre completo', 'Solo con mis iniciales', 'Prefiero que no lo publiquen'];

export default function Testimonio() {
  const started = useRef(Date.now());
  const [f, setF] = useState({ nombre: '', programa: '', anio: '', testimonio: '', recuerdo: '', como_publicar: PUBLICAR[0], correo: '', acepta_privacidad: false, sitio_web: '' });
  const [estado, setEstado] = useState('idle');
  const [error, setError] = useState('');
  const [errorCampo, setErrorCampo] = useState('');
  const inv = (id) => (errorCampo === id ? { 'aria-invalid': true, 'aria-describedby': 't-error' } : {});
  const fallo = (msg, campo) => { setError(msg); setErrorCampo(campo); const el = document.getElementById(campo); if (el) el.focus(); };
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (f.nombre.trim().length < 2 || f.testimonio.trim().length < 10) { fallo('Cuéntanos tu nombre y tu experiencia (al menos una frase).', f.nombre.trim().length < 2 ? 't-nombre' : 't-texto'); return; }
    if (!f.acepta_privacidad) { fallo('Debes aceptar la política de privacidad.', 't-priv'); return; }
    setError(''); setErrorCampo('');
    setEstado('enviando');
    if (backendReady()) {
      try {
        await sendForm({ ...f, tipo: 'testimonio', _t: Date.now() - started.current });
        setEstado('ok');
        return;
      } catch (_) { /* respaldo por WhatsApp */ }
    }
    window.open(whatsappUrl(`Hola! Quiero dejar mi testimonio.\nNombre: ${f.nombre}\nPrograma: ${f.programa} ${f.anio}\nTestimonio: ${f.testimonio}\nLo que más recuerdo: ${f.recuerdo}\nPublicar: ${f.como_publicar}`), '_blank', 'noopener');
    setEstado('ok');
  };

  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Deja tu testimonio | Instituto Lael</title>
        <meta name="description" content="¿Estudiaste en Instituto Lael? Cuéntanos cómo te fue. Tu historia puede ayudar a alguien que todavía no se atreve a empezar." />
      </Helmet>
      <section className="relative -mt-20 pt-36 pb-14 px-5 sm:px-6 text-white text-center" style={{ backgroundColor: BLUE }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: YELLOW }}>Ex alumnos</p>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight leading-[1.05] mb-4 text-white">Cuéntanos cómo te fue</h1>
        <p className="text-white/75 text-lg max-w-xl mx-auto">Tu historia puede ayudar a alguien que todavía no se atreve a empezar.</p>
      </section>

      <section className="px-4 sm:px-6 py-10 sm:py-14">
        {estado === 'ok' ? (
          <div className="max-w-2xl mx-auto bg-white rounded-[28px] p-8 text-center border border-[#071D49]/5 shadow-card">
            <Corazon size={40} className="mx-auto mb-4" style={{ color: BLUE }} />
            <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight mb-3">¡Gracias de corazón!</h2>
            <p className="text-[#071D49]/75 mb-6">Lo vamos a leer con calma. Si nos diste permiso, pronto lo verás en el sitio.</p>
            <Link to="/casos-reales" className="inline-flex items-center gap-2 font-bold underline">Ver otras historias <ArrowRight size={16} /></Link>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="max-w-2xl mx-auto bg-white rounded-[28px] p-5 sm:p-8 border border-[#071D49]/5 shadow-card space-y-4">
            <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
              <input aria-label="No llenar" tabIndex={-1} autoComplete="off" value={f.sitio_web} onChange={set('sitio_web')} />
            </div>
            <div><label htmlFor="t-nombre" className={LABEL}>Tu nombre</label><input id="t-nombre" {...inv('t-nombre')} className={INPUT} value={f.nombre} onChange={set('nombre')} autoComplete="name" /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label htmlFor="t-prog" className={LABEL}>¿En qué programa estuviste?</label>
                <select id="t-prog" className={INPUT} value={f.programa} onChange={set('programa')}><option value="">Elige</option>{PROGRAMAS.map((p) => <option key={p}>{p}</option>)}</select></div>
              <div><label htmlFor="t-anio" className={LABEL}>¿En qué año?</label><input id="t-anio" inputMode="numeric" placeholder="Ej: 2024" className={INPUT} value={f.anio} onChange={(e) => setF((s) => ({ ...s, anio: e.target.value.replace(/\D/g, '').slice(0, 4) }))} /></div>
            </div>
            <div><label htmlFor="t-texto" className={LABEL}>¿Qué cambió en ti estudiar en Lael?</label><textarea id="t-texto" {...inv('t-texto')} rows={4} className={`${INPUT} py-3`} value={f.testimonio} onChange={set('testimonio')} /></div>
            <div><label htmlFor="t-rec" className={LABEL}>¿Qué es lo que más recuerdas? <span className="font-normal text-[#071D49]/70">(opcional)</span></label><textarea id="t-rec" rows={3} className={`${INPUT} py-3`} value={f.recuerdo} onChange={set('recuerdo')} /></div>
            <fieldset>
              <legend className={LABEL}>¿Podemos publicarlo?</legend>
              <div className="space-y-2">
                {PUBLICAR.map((p) => (
                  <label key={p} className="flex items-center gap-3 min-h-[44px] cursor-pointer">
                    <input type="radio" name="publicar" className="w-5 h-5 text-[#071D49] focus:ring-[#071D49]" checked={f.como_publicar === p} onChange={() => setF((s) => ({ ...s, como_publicar: p }))} />
                    <span className="text-sm">{p}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div><label htmlFor="t-correo" className={LABEL}>Tu correo <span className="font-normal text-[#071D49]/70">(opcional, no se publica)</span></label><input id="t-correo" type="email" className={INPUT} value={f.correo} onChange={set('correo')} /></div>
            <label className="flex items-start gap-3 min-h-[44px] cursor-pointer">
              <input id="t-priv" {...inv('t-priv')} type="checkbox" className="mt-1 w-5 h-5 rounded text-[#071D49] focus:ring-[#071D49]" checked={f.acepta_privacidad} onChange={set('acepta_privacidad')} />
              <span className="text-sm">Acepto la <Link to="/privacidad" target="_blank" className="underline font-semibold">política de privacidad</Link>.</span>
            </label>
            {error && <p id="t-error" role="alert" className="text-sm font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">{error}</p>}
            <button type="submit" disabled={estado === 'enviando'} className="w-full min-h-[56px] rounded-2xl bg-[#D7E400] text-[#071D49] font-display font-extrabold text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2">
              {estado === 'enviando' ? <><Loader2 size={18} className="animate-spin" /> Enviando…</> : 'Enviar mi testimonio'}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
