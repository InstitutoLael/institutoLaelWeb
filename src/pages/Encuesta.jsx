import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import { INPUT, LABEL, Honeypot, CheckAnimado, ErrorMsg } from '../components/ui/FormBits';
import { sendForm, backendReady } from '../lib/backend';

// Encuesta de mitad de semestre. La planilla la manda sola por correo a los
// alumnos (ver tareasDiarias() en Code.gs). Se puede responder sin nombre.
const PROGRAMAS = ['Preu PAES', 'Inglés', 'Español para extranjeros', 'Escuela de Sueños', 'Reforzamiento escolar', 'Otro'];
const NOTAS = [1, 2, 3, 4, 5, 6, 7];

export default function Encuesta() {
  const [params] = useSearchParams();
  const started = useRef(Date.now());
  const [f, setF] = useState({ programa: params.get('programa') || '', nota: 0, recomienda: '', sirve: '', mejorar: '', nombre: '', sitio_web: '' });
  const [estado, setEstado] = useState('idle');
  const [error, setError] = useState('');
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!f.nota) return setError('Ponle una nota del 1 al 7.');
    setError(''); setEstado('enviando');
    try {
      if (backendReady()) await sendForm({ ...f, tipo: 'encuesta', _t: Date.now() - started.current });
      setEstado('ok');
    } catch (_) {
      setEstado('idle');
      setError('No pudimos enviar la encuesta. Inténtalo de nuevo en un rato.');
    }
  };

  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>¿Cómo vamos? | Instituto Lael</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <PageHero eyebrow="Encuesta de mitad de semestre" title="¿Cómo" accent="vamos?">
        Dos minutos. Lo que nos digas lo lee el equipo y sirve para mejorar las clases que vienen. Puedes responder sin poner tu nombre.
      </PageHero>

      <section className="px-5 sm:px-6 py-12 sm:py-16">
        <div className="max-w-xl mx-auto">
          {estado === 'ok' ? (
            <div className="bg-white rounded-[28px] p-8 text-center border border-[#071D49]/5 shadow-card" role="status">
              <CheckAnimado className="mx-auto mb-5" />
              <h2 className="font-display text-2xl font-extrabold mb-2">¡Gracias por contarnos!</h2>
              <p className="text-[#071D49]/75">Lo vamos a leer con calma. Si nos dejaste algo para mejorar, lo vas a notar en las próximas clases.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="relative bg-white rounded-[28px] p-5 sm:p-8 border border-[#071D49]/5 shadow-card space-y-5">
              <Honeypot value={f.sitio_web} onChange={set('sitio_web')} />
              <div><label htmlFor="e-prog" className={LABEL}>¿En qué programa estás?</label>
                <select id="e-prog" className={INPUT} value={f.programa} onChange={set('programa')}><option value="">Elige</option>{PROGRAMAS.map((p) => <option key={p}>{p}</option>)}</select></div>
              <fieldset>
                <legend className={LABEL}>¿Qué nota le pones a tus clases hasta ahora?</legend>
                <div className="grid grid-cols-7 gap-1.5">
                  {NOTAS.map((n) => (
                    <button key={n} type="button" aria-pressed={f.nota === n} onClick={() => setF((s) => ({ ...s, nota: n }))} className={`min-h-[52px] rounded-xl font-display font-extrabold text-lg border-2 transition-colors ${f.nota === n ? 'bg-[#071D49] text-[#D7E400] border-[#071D49]' : 'border-[#071D49]/15 hover:border-[#071D49]/40'}`}>{n}</button>
                  ))}
                </div>
              </fieldset>
              <div><label htmlFor="e-rec" className={LABEL}>¿Le recomendarías Lael a un amigo?</label>
                <select id="e-rec" className={INPUT} value={f.recomienda} onChange={set('recomienda')}><option value="">Elige</option><option>Sí, de todas maneras</option><option>Probablemente sí</option><option>No estoy seguro</option><option>Probablemente no</option></select></div>
              <div><label htmlFor="e-sirve" className={LABEL}>¿Qué es lo que más te ha servido?</label><textarea id="e-sirve" rows={3} className={`${INPUT} py-3`} value={f.sirve} onChange={set('sirve')} /></div>
              <div><label htmlFor="e-mejorar" className={LABEL}>¿Qué mejorarías?</label><textarea id="e-mejorar" rows={3} className={`${INPUT} py-3`} value={f.mejorar} onChange={set('mejorar')} /></div>
              <div><label htmlFor="e-nombre" className={LABEL}>Tu nombre <span className="font-normal text-[#071D49]/70">(opcional)</span></label><input id="e-nombre" className={INPUT} value={f.nombre} onChange={set('nombre')} /></div>
              <ErrorMsg>{error}</ErrorMsg>
              <button type="submit" disabled={estado === 'enviando'} className="w-full min-h-[56px] rounded-2xl bg-[#D7E400] text-[#071D49] font-display font-extrabold text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2 disabled:opacity-70">
                {estado === 'enviando' ? <><Loader2 size={18} className="animate-spin" /> Enviando…</> : 'Enviar'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
