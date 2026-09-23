import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Send, CheckCircle } from 'lucide-react';
import { Mensaje, Correo, Reloj } from '../components/icons/LaelIcons';
import { Helmet } from 'react-helmet-async';
import { CONTACT_INFO } from '../data/contact';

const ease = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease }
});

const FIELD =
  'w-full min-h-[52px] bg-[#F4F4F4] border border-[#071D49]/15 rounded-2xl px-4 sm:px-5 py-3 text-base text-[#071D49] placeholder:text-[#071D49]/60 transition-colors hover:border-[#071D49]/30 focus:bg-white focus:border-[#071D49] focus:outline-none focus:ring-4 focus:ring-[#071D49]/10';
const LABEL = 'block text-sm font-bold text-[#071D49] mb-2';

const METHODS = [
  { icon: Mensaje, label: CONTACT_INFO.whatsapp.label, value: CONTACT_INFO.whatsapp.number, href: CONTACT_INFO.whatsapp.url, external: true },
  { icon: Correo, label: CONTACT_INFO.email.label, value: CONTACT_INFO.email.address, href: `mailto:${CONTACT_INFO.email.address}` },
  { icon: Instagram, label: 'Instagram', value: CONTACT_INFO.instagram.user, href: CONTACT_INFO.instagram.url, external: true },
  { icon: Youtube, label: 'YouTube', value: CONTACT_INFO.youtube.user, href: CONTACT_INFO.youtube.url, external: true },
  { icon: Reloj, label: CONTACT_INFO.schedule.label, value: CONTACT_INFO.schedule.week },
];

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    programa: 'PAES',
    mensaje: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Consulta Lael: ${formData.nombre} - ${formData.programa}`;
    const body = `Nombre: ${formData.nombre}\nEmail: ${formData.email}\nPrograma: ${formData.programa}\n\nMensaje:\n${formData.mensaje}`;
    window.location.href = `mailto:${CONTACT_INFO.email.address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Contacto | Instituto Lael</title>
        <meta name="description" content="Escríbenos directamente por WhatsApp +56 9 6462 6568 o a contacto@institutolael.cl. Santiago, Chile. Educación 100% online." />
      </Helmet>

      <section className="px-5 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20 lg:pb-28">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            {/* Left Col: Info */}
            <motion.div {...fadeUp(0)} className="lg:col-span-5 space-y-10 text-left">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-[2.6rem] xl:text-5xl font-display font-extrabold mb-6 uppercase tracking-[-0.03em] leading-[1.05]">
                  Estamos a un <br />
                  <span className="bg-[#071D49] text-[#D7E400] px-2 box-decoration-clone">mensaje de distancia.</span>
                </h1>
                <p className="text-[#071D49]/70 text-base sm:text-lg leading-relaxed max-w-md">
                  Da lo mismo si eres alumno, apoderado o quieres saber cómo inscribirte. Escríbenos por WhatsApp o correo y te respondemos.
                </p>
              </div>

              {/* Contact Methods */}
              <ul className="space-y-3">
                {METHODS.map((m) => {
                  const inner = (
                    <>
                      <span className="w-12 h-12 rounded-xl bg-[#071D49] flex items-center justify-center text-white flex-shrink-0">
                        <m.icon size={22} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-bold uppercase tracking-wider text-[#071D49]/70 mb-0.5">{m.label}</span>
                        <span className="block text-base font-bold text-[#071D49] break-words">{m.value}</span>
                      </span>
                    </>
                  );
                  const base = 'flex items-center gap-4 p-3 pr-4 rounded-2xl bg-white border border-[#071D49]/5';
                  return (
                    <li key={m.label}>
                      {m.href ? (
                        <a
                          href={m.href}
                          {...(m.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className={`${base} hover:border-[#071D49]/25 hover:shadow-card focus:outline-none focus-visible:ring-4 focus-visible:ring-[#071D49]/15 transition-all`}
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className={base}>{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>

            {/* Right Col: Form */}
            <motion.div {...fadeUp(0.1)} className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-[28px] border border-[#071D49]/5 shadow-card">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-2xl font-display font-extrabold text-[#071D49] mb-4">¡Ya casi!</h3>
                  <p className="text-[#071D49]/70 text-base leading-relaxed max-w-sm mx-auto">
                    Se abrió tu correo con la consulta lista. Solo falta que la envíes y te responderemos pronto.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contacto-nombre" className={LABEL}>Nombre Completo</label>
                      <input
                        id="contacto-nombre"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Tu nombre"
                        className={FIELD}
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      />
                    </div>
                    <div>
                      <label htmlFor="contacto-email" className={LABEL}>Tu correo</label>
                      <input
                        id="contacto-email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="ejemplo@email.com"
                        className={FIELD}
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contacto-programa" className={LABEL}>Programa de Interés</label>
                    <select
                      id="contacto-programa"
                      className={`${FIELD} pr-10 cursor-pointer`}
                      value={formData.programa}
                      onChange={(e) => setFormData({...formData, programa: e.target.value})}
                    >
                      <option value="PAES">PAES</option>
                      <option value="Idiomas">Inglés / Español</option>
                      <option value="LSCh">Lengua de Señas (LSCh)</option>
                      <option value="Otro">Otra consulta</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contacto-mensaje" className={LABEL}>Tu Mensaje</label>
                    <textarea
                      id="contacto-mensaje"
                      rows="5"
                      required
                      placeholder="Cuéntanos cómo podemos ayudarte..."
                      className={`${FIELD} resize-none`}
                      value={formData.mensaje}
                      onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[56px] bg-[#071D49] hover:bg-[#0B2A66] text-white rounded-2xl font-display font-extrabold uppercase tracking-wider text-sm flex items-center justify-center gap-3 transition-colors active:scale-[0.99] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#071D49]/25"
                  >
                    <span>Enviar consulta</span>
                    <Send size={16} className="text-[#D7E400]" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
