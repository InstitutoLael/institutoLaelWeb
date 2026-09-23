import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, MessageCircle } from 'lucide-react';
import { ALIANZAS_EMAIL, ALIANZAS_FORM_TIPOS, ALIANZAS_WHATSAPP_TEXT } from '../../data/alianzas';
import { waLink, inscripcionLink, fadeUp } from './shared';

// Por ahora abre un correo prellenado a coordinación (igual que EmpresasForm).
const INITIAL = { tipo: '', nombre: '', institucion: '', cargo: '', email: '', telefono: '', mensaje: '' };
const LABEL = 'block text-sm font-bold text-[#071D49] mb-2';
const INPUT = 'w-full min-h-[48px] bg-white border border-[#071D49]/25 rounded-2xl px-4 text-base text-[#071D49] placeholder:text-[#071D49]/45 hover:border-[#071D49]/50 focus:outline-none focus:border-[#071D49] focus:ring-2 focus:ring-[#071D49]/30 transition-colors';

export default function AlianzasForm() {
  const [form, setForm] = useState(INITIAL);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.tipo || !form.nombre || !form.institucion || !form.email) {
      setError('Por favor, completa los campos marcados con *.');
      return;
    }
    const subject = encodeURIComponent(`Alianza: ${form.institucion} (${form.tipo})`);
    const body = encodeURIComponent(
`Tipo de institución: ${form.tipo}
Nombre: ${form.nombre}
Institución: ${form.institucion}
Cargo: ${form.cargo || 'No especificado'}
Correo: ${form.email}
Teléfono: ${form.telefono || 'No especificado'}

Mensaje:
${form.mensaje || '(Sin mensaje adicional)'}`
    );
    window.location.href = `mailto:${ALIANZAS_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
    setForm(INITIAL);
  };

  return (
    <motion.div {...fadeUp(0)} className="w-full max-w-4xl bg-white border border-[#071D49]/5 rounded-[28px] p-6 sm:p-10 lg:p-14 shadow-card text-[#071D49]">
      <div className="text-center mb-8 sm:mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4">Conversemos</p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight leading-[1.05] mb-4">Cuéntanos de tu organización</h2>
        <p className="text-[#071D49]/70 text-base leading-relaxed max-w-lg mx-auto">Te respondemos desde coordinación para ver juntos cómo podemos trabajar.</p>
      </div>

      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-10">
            <div className="w-16 h-16 rounded-full bg-[#D7E400] flex items-center justify-center mb-6 text-[#071D49]">
              <Check size={28} strokeWidth={3} aria-hidden="true" />
            </div>
            <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight mb-3">Casi listo</h3>
            <p className="text-[#071D49]/70 leading-relaxed mb-8 max-w-md">Se abrió tu correo con los datos listos. Envíalo y te escribimos pronto.</p>
            <button onClick={() => setSent(false)} className="min-h-[48px] px-6 rounded-2xl border border-[#071D49]/20 hover:border-[#071D49] font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-colors">Enviar otro mensaje</button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <fieldset className="md:col-span-2">
              <legend className={LABEL}>Tipo de institución *</legend>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {ALIANZAS_FORM_TIPOS.map((t) => {
                  const active = form.tipo === t;
                  return (
                    <button
                      type="button"
                      key={t}
                      aria-pressed={active}
                      onClick={() => { setForm({ ...form, tipo: t }); setError(''); }}
                      className={`min-h-[48px] inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#071D49] focus-visible:ring-offset-2 ${active ? 'border-[#071D49] bg-[#071D49] text-white' : 'border-[#071D49]/20 bg-white text-[#071D49] hover:border-[#071D49]/60'}`}
                    >
                      {active && <Check size={14} strokeWidth={3} className="text-[#D7E400]" aria-hidden="true" />}
                      {t}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label htmlFor="al-nombre" className={LABEL}>Tu nombre *</label>
              <input id="al-nombre" name="nombre" type="text" autoComplete="name" value={form.nombre} onChange={handleChange} placeholder="Ej. Camila Rojas" className={INPUT} />
            </div>
            <div>
              <label htmlFor="al-institucion" className={LABEL}>Institución *</label>
              <input id="al-institucion" name="institucion" type="text" autoComplete="organization" value={form.institucion} onChange={handleChange} placeholder="Colegio, iglesia, empresa o cuenta" className={INPUT} />
            </div>
            <div>
              <label htmlFor="al-cargo" className={LABEL}>Cargo</label>
              <input id="al-cargo" name="cargo" type="text" autoComplete="organization-title" value={form.cargo} onChange={handleChange} placeholder="Ej. Orientadora, pastor, gerente" className={INPUT} />
            </div>
            <div>
              <label htmlFor="al-email" className={LABEL}>Correo *</label>
              <input id="al-email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} placeholder="nombre@institucion.cl" className={INPUT} />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="al-telefono" className={LABEL}>Teléfono</label>
              <input id="al-telefono" name="telefono" type="tel" autoComplete="tel" value={form.telefono} onChange={handleChange} placeholder="+56 9 1234 5678" className={INPUT} />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="al-mensaje" className={LABEL}>Mensaje</label>
              <textarea id="al-mensaje" name="mensaje" rows={4} value={form.mensaje} onChange={handleChange} placeholder="¿Qué te gustaría hacer con Lael? Cuántas personas, fechas, ideas..." className={`${INPUT} resize-none py-3`} />
            </div>

            <div className="md:col-span-2 mt-2">
              <AnimatePresence>
                {error && <motion.p role="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[#B42318] text-sm font-semibold mb-4 text-center">{error}</motion.p>}
              </AnimatePresence>
              <button type="submit" className="w-full min-h-[56px] inline-flex items-center justify-center gap-2 bg-[#D7E400] text-[#071D49] hover:bg-[#071D49] hover:text-white rounded-2xl font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-colors active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#071D49] focus-visible:ring-offset-2">
                Enviar mensaje
              </button>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-[#071D49]/70">
                <a href={waLink(ALIANZAS_WHATSAPP_TEXT)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 min-h-[44px] font-semibold underline underline-offset-4 hover:text-[#071D49]">
                  <MessageCircle size={16} aria-hidden="true" /> Prefiero WhatsApp
                </a>
                <Link to={inscripcionLink('alianza')} className="inline-flex items-center min-h-[44px] font-semibold underline underline-offset-4 hover:text-[#071D49]">
                  Usar el formulario de inscripción
                </Link>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
