import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, BellRing } from 'lucide-react';
import { INPUT, LABEL, TEL_RE, MAIL_RE, Honeypot, CheckAnimado, ErrorMsg } from './ui/FormBits';
import { sendForm, backendReady, whatsappUrl } from '../lib/backend';
import { trackEvent } from '../utils/analytics';

// Lista de espera de un programa que todavía no abre ("Avísame cuando
// parta"). Queda en la planilla con tipo "aviso", así no se pierde a nadie.
export default function AvisameForm({ programa, id = 'avisame', titulo, texto, extra }) {
  const started = useRef(Date.now());
  const [f, setF] = useState({ nombre: '', correo: '', telefono: '', motivo: '', acepta_privacidad: false, sitio_web: '' });
  const [estado, setEstado] = useState('idle');
  const [error, setError] = useState('');
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (f.nombre.trim().length < 2) return setError('Escribe tu nombre.');
    if (!MAIL_RE.test(f.correo.trim())) return setError('Revisa tu correo.');
    if (!TEL_RE.test(f.telefono.trim())) return setError('Revisa tu WhatsApp (ej: +56 9 1234 5678).');
    if (!f.acepta_privacidad) return setError('Debes aceptar la política de privacidad.');
    setError(''); setEstado('enviando');
    trackEvent('avisame_enviado', { programa });
    const payload = { ...f, tipo: 'aviso', programa, detalle: f.motivo ? `Para: ${f.motivo}` : '', acepta_avisos: true, origen: `avisame-${id}`, _t: Date.now() - started.current };
    if (backendReady()) {
      try { await sendForm(payload); setEstado('ok'); return; } catch (_) { /* respaldo */ }
    }
    window.open(whatsappUrl(`Hola! Quiero que me avisen cuando abra ${programa}.\nNombre: ${f.nombre}\nCorreo: ${f.correo}`), '_blank', 'noopener');
    setEstado('ok');
  };

  return (
    <div id={id} className="scroll-mt-28 max-w-xl mx-auto bg-white text-[#071D49] rounded-[28px] p-6 sm:p-8 border border-[#071D49]/5 shadow-card">
      {estado === 'ok' ? (
        <div className="text-center py-4" role="status">
          <CheckAnimado className="mx-auto mb-4" />
          <p className="font-display text-2xl font-extrabold mb-2">¡Quedaste en la lista!</p>
          <p className="text-[#071D49]/75">Apenas abramos cupos, eres de los primeros en saberlo.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="relative space-y-4">
          <Honeypot value={f.sitio_web} onChange={set('sitio_web')} />
          <div className="flex items-center gap-3 mb-1">
            <span className="w-11 h-11 rounded-2xl bg-[#071D49] text-programa flex items-center justify-center flex-shrink-0"><BellRing size={20} /></span>
            <div>
              <p className="font-display text-xl font-extrabold leading-tight">{titulo || 'Avísame cuando parta'}</p>
              {texto && <p className="text-sm text-[#071D49]/70">{texto}</p>}
            </div>
          </div>
          <div><label htmlFor={`${id}-nombre`} className={LABEL}>Nombre</label><input id={`${id}-nombre`} autoComplete="name" className={INPUT} value={f.nombre} onChange={set('nombre')} /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label htmlFor={`${id}-correo`} className={LABEL}>Correo</label><input id={`${id}-correo`} type="email" inputMode="email" autoComplete="email" className={INPUT} value={f.correo} onChange={set('correo')} /></div>
            <div><label htmlFor={`${id}-tel`} className={LABEL}>WhatsApp</label><input id={`${id}-tel`} type="tel" inputMode="tel" autoComplete="tel" placeholder="+56 9 1234 5678" className={INPUT} value={f.telefono} onChange={set('telefono')} /></div>
          </div>
          {extra && (
            <div><label htmlFor={`${id}-motivo`} className={LABEL}>{extra.label} <span className="font-normal text-[#071D49]/70">(opcional)</span></label>
              <select id={`${id}-motivo`} className={INPUT} value={f.motivo} onChange={set('motivo')}><option value="">Elige una opción</option>{extra.options.map((o) => <option key={o}>{o}</option>)}</select></div>
          )}
          <label className="flex items-start gap-3 min-h-[44px] cursor-pointer">
            <input type="checkbox" className="mt-1 w-5 h-5 rounded text-[#071D49] focus:ring-[#071D49]" checked={f.acepta_privacidad} onChange={set('acepta_privacidad')} />
            <span className="text-sm">Acepto la <Link to="/privacidad" target="_blank" className="underline font-semibold">política de privacidad</Link>.</span>
          </label>
          <ErrorMsg>{error}</ErrorMsg>
          <button type="submit" disabled={estado === 'enviando'} className="w-full min-h-[56px] rounded-2xl bg-[#D7E400] text-[#071D49] font-display font-extrabold text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2 disabled:opacity-70">
            {estado === 'enviando' ? <><Loader2 size={18} className="animate-spin" /> Enviando…</> : 'Anotarme en la lista'}
          </button>
        </form>
      )}
    </div>
  );
}
