import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { EMPRESAS_FORM_OPTIONS } from '../../data/empresas';

const ease = [0.16, 1, 0.3, 1];
const INITIAL = { nombre: '', empresa: '', tamano: '', email: '', programa: '', mensaje: '' };
const TAMAÑOS = ['1 - 10 empleados', '11 - 50 empleados', '51 - 200 empleados', 'Más de 200 empleados'];
const PROGRAMAS = EMPRESAS_FORM_OPTIONS;
const LABEL = 'block text-sm font-bold text-[#071D49] mb-2';
const INPUT = 'w-full min-h-[48px] bg-white border border-[#071D49]/25 rounded-2xl px-4 text-base text-[#071D49] placeholder:text-[#071D49]/45 hover:border-[#071D49]/50 focus:outline-none focus:border-[#071D49] focus:ring-2 focus:ring-[#071D49]/30 transition-colors';

export default function EmpresasForm() {
  const [form, setForm] = useState(INITIAL);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.empresa || !form.email || !form.programa) {
      setError('Por favor, completa los campos requeridos.');
      return;
    }

    const subject = encodeURIComponent(`Cotización Empresa: ${form.empresa} - ${form.programa}`);
    const body = encodeURIComponent(
`Nombre: ${form.nombre}
Empresa: ${form.empresa}
Tamaño: ${form.tamano || 'No especificado'}
Email corporativo: ${form.email}
Programa de interés: ${form.programa}

Mensaje / Requerimientos:
${form.mensaje || '(Sin mensaje adicional)'}`
    );
    window.location.href = `mailto:coordinacion@institutolael.cl?subject=${subject}&body=${body}`;

    setSent(true);
    setForm(INITIAL);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease }}
      className="w-full max-w-4xl bg-white border border-[#071D49]/5 rounded-[28px] p-6 sm:p-10 lg:p-14 shadow-card text-[#071D49]"
    >
      <div className="text-center mb-8 sm:mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4">Cotiza sin compromiso</p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight leading-[1.05] mb-4">Pide una propuesta para tu equipo.</h2>
        <p className="text-[#071D49]/70 text-base leading-relaxed max-w-lg mx-auto">Cuéntanos qué necesita tu equipo y te respondemos por correo con una propuesta.</p>
      </div>

      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-10"
          >
            <div className="w-16 h-16 rounded-full bg-[#D7E400] flex items-center justify-center mb-6 text-[#071D49]">
              <Check size={28} strokeWidth={3} aria-hidden="true" />
            </div>
            <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight mb-3">Solicitud enviada</h3>
            <p className="text-[#071D49]/70 leading-relaxed mb-8 max-w-md mx-auto">Se abrió tu correo con los datos listos. Envíalo y te responderemos con una propuesta.</p>
            <button onClick={() => setSent(false)} className="min-h-[48px] px-6 rounded-2xl border border-[#071D49]/20 hover:border-[#071D49] font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-colors">Enviar otra solicitud</button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

            <div>
              <label htmlFor="emp-nombre" className={LABEL}>Nombre del encargado *</label>
              <input id="emp-nombre" type="text" name="nombre" required autoComplete="name" value={form.nombre} onChange={handleChange} placeholder="Ej. Camila Rojas" className={INPUT} />
            </div>

            <div>
              <label htmlFor="emp-empresa" className={LABEL}>Empresa *</label>
              <input id="emp-empresa" type="text" name="empresa" required autoComplete="organization" value={form.empresa} onChange={handleChange} placeholder="Ej. ACME Corp" className={INPUT} />
            </div>

            <div>
              <label htmlFor="emp-email" className={LABEL}>Correo de trabajo *</label>
              <input id="emp-email" type="email" name="email" required autoComplete="email" value={form.email} onChange={handleChange} placeholder="nombre@empresa.com" className={INPUT} />
            </div>

            <div>
              <label htmlFor="emp-tamano" className={LABEL}>Tamaño del equipo</label>
              <div className="relative">
                <select id="emp-tamano" name="tamano" value={form.tamano} onChange={handleChange} className={`${INPUT} appearance-none cursor-pointer pr-11 ${form.tamano ? '' : 'text-[#071D49]/50'}`}>
                  <option value="" disabled>Selecciona una opción...</option>
                  {TAMAÑOS.map(t => <option key={t} value={t} className="text-[#071D49]">{t}</option>)}
                </select>
                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#071D49]/60" aria-hidden="true" />
              </div>
            </div>

            <fieldset className="md:col-span-2">
              <legend className={LABEL}>Programa de interés *</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {PROGRAMAS.map(prog => {
                  const active = form.programa === prog;
                  return (
                    <button
                      type="button"
                      key={prog}
                      aria-pressed={active}
                      onClick={() => { setForm({ ...form, programa: prog }); setError(''); }}
                      className={`min-h-[52px] flex items-center gap-3 text-left rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#071D49] focus-visible:ring-offset-2 ${active ? 'border-[#071D49] bg-[#071D49] text-white' : 'border-[#071D49]/20 bg-white text-[#071D49] hover:border-[#071D49]/60'}`}
                    >
                      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${active ? 'border-[#D7E400] bg-[#D7E400]' : 'border-[#071D49]/30'}`}>
                        {active && <Check size={12} strokeWidth={3} className="text-[#071D49]" aria-hidden="true" />}
                      </span>
                      {prog}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="md:col-span-2">
              <label htmlFor="emp-mensaje" className={LABEL}>Algo más que debamos saber</label>
              <textarea id="emp-mensaje" name="mensaje" rows={4} value={form.mensaje} onChange={handleChange} placeholder="Cuántas personas, qué necesitan aprender, horarios..." className={`${INPUT} resize-none py-3`} />
            </div>

            <div className="md:col-span-2 mt-2">
              <AnimatePresence>
                {error && <motion.p role="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[#B42318] text-sm font-semibold mb-4 text-center">{error}</motion.p>}
              </AnimatePresence>
              <button type="submit" className="w-full min-h-[56px] inline-flex items-center justify-center gap-2 bg-[#D7E400] text-[#071D49] hover:bg-[#071D49] hover:text-white rounded-2xl font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-colors active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#071D49] focus-visible:ring-offset-2">
                Pedir propuesta →
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
