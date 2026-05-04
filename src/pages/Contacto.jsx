import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.0, delay, ease },
});

const PROGRAMS = ['PAES', 'Inglés', 'Coreano', 'Español para Expats', 'LSCh — Lengua de Señas', 'Empresas / Convenios', 'Otro'];

const INITIAL = { nombre: '', email: '', telefono: '', programa: '', mensaje: '' };

export default function Contacto() {
  const [form, setForm] = useState(INITIAL);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.email || !form.programa) {
      setError('Completa al menos nombre, email y programa de interés.');
      return;
    }

    // Save to localStorage
    try {
      const key = `lael_contacto_${Date.now()}`;
      localStorage.setItem(key, JSON.stringify({ ...form, ts: new Date().toISOString() }));
    } catch (_) {}

    // Open mailto
    const subject = encodeURIComponent(`Contacto web — ${form.programa} — ${form.nombre}`);
    const body = encodeURIComponent(
`Nombre: ${form.nombre}
Email: ${form.email}
Teléfono: ${form.telefono || 'No indicado'}
Programa de interés: ${form.programa}

Mensaje:
${form.mensaje || '(Sin mensaje adicional)'}`
    );
    window.location.href = `mailto:contacto@institutolael.cl?subject=${subject}&body=${body}`;

    setSent(true);
    setForm(INITIAL);
  };

  return (
    <>
      <Helmet>
        <title>Contacto | Instituto Lael SpA — Santiago, Chile</title>
        <meta name="description" content="Contacto | Instituto Lael SpA — Santiago, Chile" />
      </Helmet>

      <main className="bg-[#0B0B0B] min-h-screen">

        {/* HERO */}
        <section className="relative w-full pt-32 pb-20 flex flex-col items-center text-center px-6 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lael-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />
          <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.35em] uppercase mb-8">Instituto Lael · Contacto</motion.p>
          <h1 className="font-display text-5xl lg:text-6xl text-lael-light font-bold leading-tight max-w-2xl clip-reveal">
            Hablemos <span className="accent-italic">ahora.</span>
          </h1>
          <motion.p {...fadeUp(0.3)} className="mt-8 text-lael-muted text-base max-w-md mx-auto leading-relaxed">
            Un mentor estratégico revisará tu mensaje y te responderá en menos de 24 horas hábiles.
          </motion.p>
        </section>

        {/* FORM + INFO */}
        <section className="w-full px-6 pb-32 lg:pb-48 flex flex-col items-center">
          <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Info col */}
            <div className="lg:col-span-2 space-y-10 pt-4">
              {[
                { label: 'Email', value: 'contacto@institutolael.cl', href: 'mailto:contacto@institutolael.cl' },
                { label: 'WhatsApp', value: '+56 9 6462 6568', href: 'https://wa.me/56964626568' },
                { label: 'Instagram', value: '@institutolael', href: 'https://instagram.com/institutolael' },
                { label: 'Ubicación', value: 'Santiago, Chile', href: null },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-[10px] tracking-[0.2em] text-lael-muted/40 uppercase mb-2">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer" className="text-lael-light hover:text-lael-accent transition-colors duration-300 text-sm">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-lael-light text-sm">{item.value}</p>
                  )}
                </div>
              ))}

              <div className="pt-6 border-t border-white/5">
                <p className="text-[10px] tracking-[0.15em] text-lael-muted/30 uppercase mb-2">Horario de atención</p>
                <p className="text-lael-muted/50 text-sm">Lunes a Viernes · 09:00 – 19:00 hrs</p>
              </div>
            </div>

            {/* Form col */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.2, ease }}
              className="lg:col-span-3 bg-[#080808] border border-white/5 rounded-2xl p-8 lg:p-12"
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center text-center h-full py-16"
                  >
                    <div className="w-16 h-16 rounded-full border border-lael-accent/40 flex items-center justify-center mb-8">
                      <span className="text-lael-accent text-2xl">✓</span>
                    </div>
                    <h2 className="font-display text-2xl text-lael-light font-bold mb-4">Mensaje enviado</h2>
                    <p className="text-lael-muted/60 text-sm leading-relaxed max-w-xs">
                      Tu cliente de correo se abrió con los datos. Un mentor te responderá pronto.
                    </p>
                    <button onClick={() => setSent(false)} className="mt-8 text-[11px] tracking-[0.15em] text-lael-accent/60 uppercase hover:text-lael-accent transition-colors">
                      Enviar otro mensaje
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="font-display text-2xl text-lael-light font-bold mb-8">Solicitud de información</h2>

                    {/* Nombre */}
                    <div>
                      <label className="text-[10px] tracking-[0.2em] text-lael-muted/50 uppercase mb-2 block">Nombre completo *</label>
                      <input
                        type="text" name="nombre" required value={form.nombre} onChange={handleChange}
                        placeholder="Ej. María González"
                        className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-lael-light focus:outline-none focus:border-lael-accent transition-colors duration-300 placeholder:text-white/15 text-sm"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-[10px] tracking-[0.2em] text-lael-muted/50 uppercase mb-2 block">Email *</label>
                      <input
                        type="email" name="email" required value={form.email} onChange={handleChange}
                        placeholder="tu@email.com"
                        className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-lael-light focus:outline-none focus:border-lael-accent transition-colors duration-300 placeholder:text-white/15 text-sm"
                      />
                    </div>

                    {/* Teléfono */}
                    <div>
                      <label className="text-[10px] tracking-[0.2em] text-lael-muted/50 uppercase mb-2 block">Teléfono</label>
                      <input
                        type="tel" name="telefono" value={form.telefono} onChange={handleChange}
                        placeholder="+56 9..."
                        className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-lael-light focus:outline-none focus:border-lael-accent transition-colors duration-300 placeholder:text-white/15 text-sm"
                      />
                    </div>

                    {/* Programa */}
                    <div>
                      <label className="text-[10px] tracking-[0.2em] text-lael-muted/50 uppercase mb-2 block">Programa de interés *</label>
                      <select
                        name="programa" required value={form.programa} onChange={handleChange}
                        className="w-full bg-[#080808] border-b border-white/10 px-0 py-3 text-lael-light focus:outline-none focus:border-lael-accent transition-colors duration-300 text-sm appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Selecciona un programa...</option>
                        {PROGRAMS.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>

                    {/* Mensaje */}
                    <div>
                      <label className="text-[10px] tracking-[0.2em] text-lael-muted/50 uppercase mb-2 block">Mensaje (opcional)</label>
                      <textarea
                        name="mensaje" rows={3} value={form.mensaje} onChange={handleChange}
                        placeholder="Cuéntanos tu situación o consulta..."
                        className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-lael-light focus:outline-none focus:border-lael-accent transition-colors duration-300 placeholder:text-white/15 text-sm resize-none"
                      />
                    </div>

                    {/* Error */}
                    <AnimatePresence>
                      {error && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-400/70 text-[11px] tracking-wider">
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <button
                      type="submit"
                      className="w-full bg-lael-accent text-lael-primary py-5 rounded-xl text-[11px] tracking-[0.2em] uppercase font-bold hover:scale-[1.01] active:scale-95 transition-all duration-500 shadow-[0_0_30px_rgba(198,166,107,0.2)] hover:shadow-[0_0_50px_rgba(198,166,107,0.4)] mt-4"
                    >
                      Enviar solicitud →
                    </button>
                    <p className="text-[10px] text-lael-muted/30 tracking-wider text-center">
                      Abrirá tu cliente de correo con los datos pre-completados.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
