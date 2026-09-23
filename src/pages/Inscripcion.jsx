import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Check, ArrowRight, Loader2, ShieldCheck, MessageCircle } from 'lucide-react';
import {
  PROGRAMAS, PAES_RAMOS, NIVELES_ADULTOS, ASIGNATURAS_REFORZAMIENTO, PRUEBA_OPCIONES, VERANO_OPCIONES,
  COMO_CONOCIO, programaPorId, precioPaes, clp,
} from '../data/inscripcion';
import { sendForm, backendReady, whatsappUrl } from '../lib/backend';
import useCupos from '../lib/useCupos';
import { trackEvent } from '../utils/analytics';

const BLUE = '#071D49';
const YELLOW = '#D7E400';

const INPUT = 'w-full rounded-xl border border-[#071D49]/20 bg-white px-4 min-h-[52px] text-base text-[#071D49] placeholder:text-[#071D49]/60 focus:outline-none focus:border-[#071D49] focus:ring-4 focus:ring-[#071D49]/10';
const LABEL = 'block text-sm font-bold mb-1.5';

function Field({ label, htmlFor, children, hint, optional }) {
  return (
    <div>
      <label htmlFor={htmlFor} className={LABEL}>
        {label} {optional && <span className="font-normal text-[#071D49]/70">(opcional)</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-[#071D49]/70 mt-1.5">{hint}</p>}
    </div>
  );
}

function Chip({ active, onClick, children, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={`min-h-[48px] px-4 py-2 rounded-xl border-2 text-sm font-semibold text-left flex items-center gap-2 transition-colors ${
        active ? 'bg-[#071D49] border-[#071D49] text-white' : 'bg-white border-[#071D49]/15 text-[#071D49] hover:border-[#071D49]/40'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${active ? 'bg-[#D7E400] text-[#071D49]' : 'border border-[#071D49]/30'}`}>
        {active && <Check size={14} strokeWidth={3} />}
      </span>
      {children}
    </button>
  );
}

const EMPTY = {
  nombre: '', correo: '', telefono: '', edad: '', curso_actual: '', comuna: '',
  apoderado_nombre: '', apoderado_correo: '', apoderado_telefono: '',
  quiere_beca: false, referido: '', como_conocio: '', comentario: '',
  acepta_privacidad: false, acepta_avisos: true, sitio_web: '',
};

export default function Inscripcion() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const cupos = useCupos();
  const started = useRef(Date.now());

  const [programaId, setProgramaId] = useState(() => (PROGRAMAS.some((p) => p.id === params.get('programa')) ? params.get('programa') : 'paes'));
  const [ramos, setRamos] = useState(() => (params.get('ramos') || '').split(',').filter(Boolean).map((r) => (r.startsWith('paes-') ? r : `paes-${r}`)));
  const [opcion, setOpcion] = useState('');
  const [form, setForm] = useState(() => ({ ...EMPTY, referido: params.get('amigo') || '' }));
  const [estado, setEstado] = useState('idle'); // idle | enviando | error
  const [error, setError] = useState('');
  const [errorCampo, setErrorCampo] = useState('');
  // Marca el campo con error para lectores de pantalla (aria-invalid) y lo
  // enlaza al mensaje (aria-describedby).
  const inv = (id) => (errorCampo === id ? { 'aria-invalid': true, 'aria-describedby': 'form-error' } : {});

  const programa = programaPorId(programaId);
  const precio = useMemo(() => precioPaes(ramos), [ramos]);
  const esMenor = Number(form.edad) > 0 && Number(form.edad) < 18;
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  useEffect(() => { setOpcion(''); }, [programaId]);

  const quedan = (codigo) => (cupos && cupos[codigo] ? cupos[codigo].quedan : null);

  const detalle = () => {
    if (programa.eleccion === 'ramos') {
      const nombres = PAES_RAMOS.filter((r) => ramos.includes(r.cupo)).map((r) => r.nombre).join(', ');
      return `${ramos.join(', ')} (${nombres}) · ${clp(precio.total)}/mes${precio.completo ? ' Plan Completo' : ''}`;
    }
    if (programa.eleccion === 'verano') {
      const v = VERANO_OPCIONES.find((o) => o.cupo === opcion);
      return v ? `${v.cupo} (${v.nombre})` : '';
    }
    if (programa.cupo) return `${programa.cupo}${opcion ? ` (${opcion})` : ''}`;
    return opcion;
  };

  const validar = () => {
    if (programa.eleccion === 'ramos' && ramos.length === 0) return ['Elige al menos un ramo.', ''];
    if (['verano', 'prueba', 'nivel', 'asignatura'].includes(programa.eleccion) && !opcion) return ['Elige una opción en el paso 1.', ''];
    if (form.nombre.trim().length < 3) return ['Escribe tu nombre completo.', 'nombre'];
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.correo.trim())) return ['Revisa tu correo.', 'correo'];
    if (!/^[+\d][\d\s-]{7,18}$/.test(form.telefono.trim())) return ['Revisa tu teléfono (ej: +56 9 1234 5678).', 'telefono'];
    if (esMenor && (!form.apoderado_nombre.trim() || !/^[+\d][\d\s-]{7,18}$/.test(form.apoderado_telefono.trim()))) return ['Como eres menor de edad, necesitamos el nombre y teléfono de tu apoderado.', (form.apoderado_nombre.trim() ? 'apoderado_telefono' : 'apoderado_nombre')];
    if (!form.acepta_privacidad) return ['Debes aceptar la política de privacidad para enviar.', 'acepta_privacidad'];
    return ['', ''];
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const [msg, campo] = validar();
    setErrorCampo(campo);
    if (msg) {
      setError(msg);
      const el = campo && document.getElementById(campo);
      if (el) el.focus();
      return;
    }
    setError('');
    setEstado('enviando');
    const payload = {
      ...form,
      tipo: programa.tipo,
      programa: programa.nombre,
      detalle: detalle(),
      origen: typeof document !== 'undefined' ? document.referrer || 'directo' : '',
      _t: Date.now() - started.current,
    };
    trackEvent('inscripcion_enviada', { programa: programa.id });

    if (backendReady()) {
      try {
        await sendForm(payload);
        navigate(`/gracias?programa=${programa.id}`, { state: { nombre: form.nombre.split(' ')[0], programa: programa.nombre, tipo: programa.tipo } });
        return;
      } catch (err) {
        if (err.message === 'demasiados_envios') {
          setEstado('error');
          setError('Recibimos varios envíos seguidos con este correo. Espera unos minutos o escríbenos por WhatsApp.');
          return;
        }
        // Si la planilla no responde, seguimos por WhatsApp para no perder la inscripción
      }
    }
    const texto =
      `Hola! Quiero inscribirme en ${programa.nombre}.\n` +
      `${payload.detalle ? `Detalle: ${payload.detalle}\n` : ''}` +
      `Nombre: ${form.nombre}\nCorreo: ${form.correo}\nTeléfono: ${form.telefono}\n` +
      `${form.edad ? `Edad: ${form.edad}\n` : ''}${form.curso_actual ? `Curso/nivel: ${form.curso_actual}\n` : ''}` +
      `${esMenor ? `Apoderado: ${form.apoderado_nombre} (${form.apoderado_telefono})\n` : ''}` +
      `${form.quiere_beca ? 'Me interesa postular a beca.\n' : ''}${form.referido ? `Vengo de parte de: ${form.referido}\n` : ''}` +
      `${form.comentario ? `Comentario: ${form.comentario}` : ''}`;
    window.open(whatsappUrl(texto), '_blank', 'noopener');
    navigate(`/gracias?programa=${programa.id}`, { state: { nombre: form.nombre.split(' ')[0], programa: programa.nombre, tipo: programa.tipo, viaWhatsapp: true } });
  };

  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Inscripción | Instituto Lael</title>
        <meta name="description" content="Inscríbete en Instituto Lael: preu PAES, inglés, Escuela de Sueños, verano y más. Matrícula gratis. Asegura tu cupo en 2 minutos." />
      </Helmet>

      <section className="relative -mt-20 pt-36 pb-14 px-5 sm:px-6 text-white" style={{ backgroundColor: BLUE }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: YELLOW }}>
            Matrícula gratis
          </motion.p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight leading-[1.05] mb-4 text-white">
            Asegura tu cupo
          </h1>
          <p className="text-white/75 text-base sm:text-lg max-w-xl mx-auto">
            Te toma 2 minutos. Después te escribimos para confirmar horarios. Inscribirte no te compromete a pagar nada todavía.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-10 sm:py-14">
        <form onSubmit={onSubmit} noValidate className="max-w-3xl mx-auto space-y-6">
          {/* Campo trampa para robots: invisible para personas */}
          <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
            <label htmlFor="sitio_web">No llenar</label>
            <input id="sitio_web" name="sitio_web" tabIndex={-1} autoComplete="off" value={form.sitio_web} onChange={set('sitio_web')} />
          </div>

          {/* PASO 1 */}
          <fieldset className="bg-white rounded-[28px] p-5 sm:p-8 border border-[#071D49]/5 shadow-card">
            <legend className="sr-only">Qué quieres</legend>
            <h2 className="font-display text-lg sm:text-xl font-extrabold uppercase tracking-tight mb-5">1. ¿Qué quieres?</h2>
            <Field label="Programa" htmlFor="programa">
              <select id="programa" value={programaId} onChange={(e) => setProgramaId(e.target.value)} className={INPUT}>
                {PROGRAMAS.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
              </select>
            </Field>
            {programa.nota && <p className="text-sm text-[#071D49]/70 mt-3">{programa.nota}</p>}

            {programa.eleccion === 'ramos' && (
              <div className="mt-6">
                <p className={LABEL}>Elige tus ramos</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PAES_RAMOS.map((r) => {
                    const q = quedan(r.cupo);
                    const lleno = q === 0;
                    const activo = ramos.includes(r.cupo);
                    return (
                      <Chip key={r.cupo} active={activo} disabled={lleno && !activo} onClick={() => setRamos((rs) => (rs.includes(r.cupo) ? rs.filter((x) => x !== r.cupo) : [...rs, r.cupo]))}>
                        <span className="flex-1">
                          {r.nombre}
                          <span className={`block text-xs font-normal ${activo ? 'text-white/70' : 'text-[#071D49]/70'}`}>
                            {r.obligatoria ? 'Obligatoria' : 'Electiva'}
                            {q != null && (lleno ? ' · Sin cupos' : ` · Quedan ${q} cupos`)}
                          </span>
                        </span>
                      </Chip>
                    );
                  })}
                </div>
                {ramos.length > 0 && (
                  <div className="mt-4 rounded-2xl p-4 flex items-center justify-between gap-4" style={{ backgroundColor: BLUE }}>
                    <div className="text-white">
                      <p className="text-xs uppercase tracking-wider text-white/70 font-bold">{precio.completo ? 'Plan Completo' : `${precio.cantidad} ramo${precio.cantidad > 1 ? 's' : ''}`}</p>
                      {precio.completo && <p className="text-xs text-white/70">Ahorras {clp(precio.suma - precio.total)} al mes</p>}
                    </div>
                    <p className="font-display text-2xl sm:text-3xl font-black" style={{ color: YELLOW }}>{clp(precio.total)}<span className="text-sm text-white/70 font-semibold">/mes</span></p>
                  </div>
                )}
              </div>
            )}

            {programa.eleccion === 'verano' && (
              <div className="mt-6">
                <p className={LABEL}>Elige tu curso de verano</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {VERANO_OPCIONES.map((o) => (
                    <Chip key={o.cupo} active={opcion === o.cupo} onClick={() => setOpcion(o.cupo)}>
                      <span className="flex-1">{o.nombre}<span className={`block text-xs font-normal ${opcion === o.cupo ? 'text-white/70' : 'text-[#071D49]/70'}`}>{o.precio}</span></span>
                    </Chip>
                  ))}
                </div>
              </div>
            )}

            {['prueba', 'nivel', 'asignatura'].includes(programa.eleccion) && (
              <div className="mt-6">
                <p className={LABEL}>{programa.eleccion === 'prueba' ? '¿De qué quieres la clase de prueba?' : programa.eleccion === 'nivel' ? '¿Qué nivel quieres terminar?' : '¿Qué asignatura?'}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(programa.eleccion === 'prueba' ? PRUEBA_OPCIONES : programa.eleccion === 'nivel' ? NIVELES_ADULTOS : ASIGNATURAS_REFORZAMIENTO).map((o) => (
                    <Chip key={o} active={opcion === o} onClick={() => setOpcion(o)}>{o}</Chip>
                  ))}
                </div>
              </div>
            )}
          </fieldset>

          {/* PASO 2 */}
          <fieldset className="bg-white rounded-[28px] p-5 sm:p-8 border border-[#071D49]/5 shadow-card">
            <legend className="sr-only">Tus datos</legend>
            <h2 className="font-display text-lg sm:text-xl font-extrabold uppercase tracking-tight mb-5">2. Tus datos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><Field label="Nombre completo" htmlFor="nombre"><input id="nombre" {...inv('nombre')} autoComplete="name" className={INPUT} value={form.nombre} onChange={set('nombre')} /></Field></div>
              <Field label="Correo" htmlFor="correo"><input id="correo" {...inv('correo')} type="email" autoComplete="email" inputMode="email" className={INPUT} value={form.correo} onChange={set('correo')} /></Field>
              <Field label="WhatsApp" htmlFor="telefono" hint="Te escribimos por aquí."><input id="telefono" {...inv('telefono')} type="tel" autoComplete="tel" inputMode="tel" placeholder="+56 9 1234 5678" className={INPUT} value={form.telefono} onChange={set('telefono')} /></Field>
              <Field label="Edad" htmlFor="edad"><input id="edad" inputMode="numeric" className={INPUT} value={form.edad} onChange={(e) => setForm((f) => ({ ...f, edad: e.target.value.replace(/\D/g, '').slice(0, 2) }))} /></Field>
              <Field label="Curso o nivel actual" htmlFor="curso_actual" optional><input id="curso_actual" placeholder="Ej: 4° medio, egresado" className={INPUT} value={form.curso_actual} onChange={set('curso_actual')} /></Field>
              <div className="sm:col-span-2"><Field label="Comuna y región" htmlFor="comuna" optional><input id="comuna" autoComplete="address-level2" className={INPUT} value={form.comuna} onChange={set('comuna')} /></Field></div>
            </div>

            {esMenor && (
              <div className="mt-6 rounded-2xl bg-[#F4F4F4] p-4 sm:p-5">
                <p className="font-bold mb-1">Datos de tu apoderado</p>
                <p className="text-sm text-[#071D49]/70 mb-4">Como eres menor de edad, necesitamos avisarle a tu mamá, papá o apoderado.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2"><Field label="Nombre del apoderado" htmlFor="apoderado_nombre"><input id="apoderado_nombre" {...inv('apoderado_nombre')} className={INPUT} value={form.apoderado_nombre} onChange={set('apoderado_nombre')} /></Field></div>
                  <Field label="Teléfono del apoderado" htmlFor="apoderado_telefono"><input id="apoderado_telefono" {...inv('apoderado_telefono')} type="tel" inputMode="tel" className={INPUT} value={form.apoderado_telefono} onChange={set('apoderado_telefono')} /></Field>
                  <Field label="Correo del apoderado" htmlFor="apoderado_correo" optional><input id="apoderado_correo" type="email" inputMode="email" className={INPUT} value={form.apoderado_correo} onChange={set('apoderado_correo')} /></Field>
                </div>
              </div>
            )}
          </fieldset>

          {/* PASO 3 */}
          <fieldset className="bg-white rounded-[28px] p-5 sm:p-8 border border-[#071D49]/5 shadow-card">
            <legend className="sr-only">Algo más</legend>
            <h2 className="font-display text-lg sm:text-xl font-extrabold uppercase tracking-tight mb-5">3. Algo más <span className="text-sm font-normal normal-case tracking-normal text-[#071D49]/70">(opcional)</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="¿Vienes de parte de alguien?" htmlFor="referido" hint="Si un amigo te invitó, a él le hacemos descuento."><input id="referido" className={INPUT} value={form.referido} onChange={set('referido')} /></Field>
              <Field label="¿Cómo nos conociste?" htmlFor="como_conocio">
                <select id="como_conocio" className={INPUT} value={form.como_conocio} onChange={set('como_conocio')}>
                  <option value="">Elige una opción</option>
                  {COMO_CONOCIO.map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <div className="sm:col-span-2"><Field label="¿Algo que debamos saber?" htmlFor="comentario"><textarea id="comentario" rows={3} className={`${INPUT} py-3`} value={form.comentario} onChange={set('comentario')} /></Field></div>
            </div>
            <label className="mt-5 flex items-start gap-3 cursor-pointer min-h-[44px]">
              <input type="checkbox" className="mt-1 w-5 h-5 rounded border-[#071D49]/30 text-[#071D49] focus:ring-[#071D49]" checked={form.quiere_beca} onChange={set('quiere_beca')} />
              <span className="text-sm">Me interesa postular a una <strong>beca parcial</strong>.</span>
            </label>
          </fieldset>

          {/* ENVIAR */}
          <div className="bg-white rounded-[28px] p-5 sm:p-8 border border-[#071D49]/5 shadow-card space-y-3">
            <label className="flex items-start gap-3 cursor-pointer min-h-[44px]">
              <input id="acepta_privacidad" {...inv('acepta_privacidad')} type="checkbox" className="mt-1 w-5 h-5 rounded border-[#071D49]/30 text-[#071D49] focus:ring-[#071D49]" checked={form.acepta_privacidad} onChange={set('acepta_privacidad')} />
              <span className="text-sm">Acepto la <Link to="/privacidad" className="underline font-semibold" target="_blank">política de privacidad</Link> de Instituto Lael.</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer min-h-[44px]">
              <input type="checkbox" className="mt-1 w-5 h-5 rounded border-[#071D49]/30 text-[#071D49] focus:ring-[#071D49]" checked={form.acepta_avisos} onChange={set('acepta_avisos')} />
              <span className="text-sm">Quiero recibir avisos de cursos, becas y fechas importantes.</span>
            </label>

            {error && <p id="form-error" role="alert" className="text-sm font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">{error}</p>}

            <button type="submit" disabled={estado === 'enviando'} className="w-full min-h-[56px] rounded-2xl bg-[#D7E400] text-[#071D49] font-display font-extrabold text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2 disabled:opacity-70">
              {estado === 'enviando' ? <><Loader2 size={18} className="animate-spin" /> Enviando…</> : <>{programa.tipo === 'clase-prueba' ? 'Pedir mi clase de prueba' : programa.tipo === 'aviso' ? 'Avísenme cuando abra' : 'Asegurar mi cupo'} <ArrowRight size={18} /></>}
            </button>
            <p className="text-xs text-[#071D49]/70 flex items-center gap-1.5 justify-center"><ShieldCheck size={14} /> Tus datos solo los ve el equipo de Lael.</p>
          </div>

          <p className="text-center text-sm text-[#071D49]/70">
            ¿Prefieres hablar con alguien?{' '}
            <a href={whatsappUrl(`Hola! Tengo dudas sobre ${programa.nombre}`)} target="_blank" rel="noopener noreferrer" className="font-bold underline inline-flex items-center gap-1"><MessageCircle size={14} /> Escríbenos por WhatsApp</a>
          </p>
        </form>
      </section>
    </div>
  );
}
