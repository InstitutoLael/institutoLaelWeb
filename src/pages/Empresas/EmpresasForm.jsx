import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];
const INITIAL = { nombre: '', empresa: '', tamano: '', email: '', programa: '', mensaje: '' };
const TAMAÑOS = ['1 - 10 empleados', '11 - 50 empleados', '51 - 200 empleados', 'Más de 200 empleados'];
const PROGRAMAS = ['PAES Institucional', 'Idiomas Corporativos', 'LSCh — Ley 21.015', 'Otro'];

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

    try {
      const key = `lael_empresa_${Date.now()}`;
      localStorage.setItem(key, JSON.stringify({ ...form, ts: new Date().toISOString() }));
    } catch (_) {}

    const subject = encodeURIComponent(`Cotización Empresa: ${form.empresa} — ${form.programa}`);
    const body = encodeURIComponent(
`Nombre: ${form.nombre}
Empresa: ${form.empresa}
Tamaño: ${form.tamano || 'No especificado'}
Email corporativo: ${form.email}
Programa de interés: ${form.programa}

Mensaje / Requerimientos:
${form.mensaje || '(Sin mensaje adicional)'}`
    );
    window.location.href = `mailto:contacto@institutolael.cl?subject=${subject}&body=${body}`;

    setSent(true);
    setForm(INITIAL);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 1.0, ease }}
      className="w-full max-w-4xl bg-lael-secondary border border-lael-bd rounded-3xl p-8 lg:p-16 cinematic-shadow relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_rgba(198,166,107,0.05)_0%,_transparent_70%)] pointer-events-none" />
      
      <div className="relative z-10">
        <div className="text-center mb-12">
          <p className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-4">Cotización corporativa</p>
          <h2 className="font-display text-3xl lg:text-5xl text-lael-light font-bold mb-4">Inicia tu programa corporativo.</h2>
          <p className="text-lael-muted text-sm max-w-lg mx-auto">Te enviaremos una propuesta detallada en menos de 24 horas hábiles. Sin compromiso.</p>
        </div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-12"
            >
              <div className="w-20 h-20 rounded-full bg-lael-accent/10 border border-lael-accent/30 flex items-center justify-center mb-8 text-lael-accent text-3xl">✓</div>
              <h3 className="font-display text-2xl text-lael-light font-bold mb-4">Solicitud enviada</h3>
              <p className="text-lael-muted mb-8 max-w-md mx-auto">Tu cliente de correo se abrió con los datos precompletados. Pronto un asesor B2B se pondrá en contacto contigo.</p>
              <button onClick={() => setSent(false)} className="text-[11px] tracking-[0.15em] text-lael-accent/60 uppercase hover:text-lael-accent transition-colors">Enviar otra solicitud</button>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              
              <div>
                <label className="text-[10px] tracking-[0.2em] text-lael-muted/70 uppercase mb-2 block">Nombre del encargado *</label>
                <input type="text" name="nombre" required value={form.nombre} onChange={handleChange} placeholder="Ej. Camila Rojas"
                  className="w-full bg-transparent border-b border-lael-bd px-0 py-3 text-lael-light focus:outline-none focus:border-lael-accent transition-colors duration-300 placeholder:text-lael-muted/40 text-sm" />
              </div>
              
              <div>
                <label className="text-[10px] tracking-[0.2em] text-lael-muted/70 uppercase mb-2 block">Nombre de la Empresa *</label>
                <input type="text" name="empresa" required value={form.empresa} onChange={handleChange} placeholder="Ej. ACME Corp"
                  className="w-full bg-transparent border-b border-lael-bd px-0 py-3 text-lael-light focus:outline-none focus:border-lael-accent transition-colors duration-300 placeholder:text-lael-muted/40 text-sm" />
              </div>
              
              <div>
                <label className="text-[10px] tracking-[0.2em] text-lael-muted/70 uppercase mb-2 block">Email Corporativo *</label>
                <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="nombre@empresa.com"
                  className="w-full bg-transparent border-b border-lael-bd px-0 py-3 text-lael-light focus:outline-none focus:border-lael-accent transition-colors duration-300 placeholder:text-lael-muted/40 text-sm" />
              </div>
              
              <div>
                <label className="text-[10px] tracking-[0.2em] text-lael-muted/70 uppercase mb-2 block">Tamaño del equipo</label>
                <select name="tamano" value={form.tamano} onChange={handleChange}
                  className="w-full bg-lael-secondary border-b border-lael-bd px-0 py-3 text-lael-light focus:outline-none focus:border-lael-accent transition-colors duration-300 text-sm appearance-none cursor-pointer">
                  <option value="" disabled>Selecciona una opción...</option>
                  {TAMAÑOS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-[10px] tracking-[0.2em] text-lael-muted/70 uppercase mb-2 block">Programa de interés *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {PROGRAMAS.map(prog => (
                    <div 
                      key={prog}
                      onClick={() => setForm({...form, programa: prog})}
                      className={`cursor-pointer border rounded-xl p-4 text-center transition-all duration-300 ${form.programa === prog ? 'border-lael-accent bg-lael-accent/10 text-lael-accent shadow-[0_0_15px_rgba(196,151,62,0.1)]' : 'border-lael-bd bg-transparent text-lael-muted hover:border-lael-accent/50'}`}
                    >
                      <p className="text-[11px] font-bold">{prog}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 mt-4">
                <label className="text-[10px] tracking-[0.2em] text-lael-muted/70 uppercase mb-2 block">Detalles o requerimientos adicionales</label>
                <textarea name="mensaje" rows={3} value={form.mensaje} onChange={handleChange} placeholder="Cuéntanos un poco más sobre lo que buscan..."
                  className="w-full bg-transparent border-b border-lael-bd px-0 py-3 text-lael-light focus:outline-none focus:border-lael-accent transition-colors duration-300 placeholder:text-lael-muted/40 text-sm resize-none" />
              </div>

              <div className="md:col-span-2 mt-6">
                <AnimatePresence>
                  {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-lael-rust text-[11px] tracking-wider mb-4 text-center">{error}</motion.p>}
                </AnimatePresence>
                <button type="submit" className="w-full bg-lael-accent text-white py-6 rounded-xl text-xs tracking-[0.2em] uppercase font-bold hover:bg-lael-rust hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgba(196,151,62,0.3)]">
                  Solicitar Cotización →
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
