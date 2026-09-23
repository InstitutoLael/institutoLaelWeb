import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Instagram, Youtube, ArrowRight } from 'lucide-react';
import { Calculadora, Regalo } from '../components/icons/LaelIcons';
import { whatsappUrl } from '../lib/backend';
import { REFERRAL } from '../data/paes';

const BLUE = '#071D49';
const YELLOW = '#D7E400';

const PASOS = {
  inscripcion: [
    'Te llega un correo confirmando que recibimos tu inscripción.',
    'Te escribimos por WhatsApp para confirmar horarios y resolver dudas.',
    'Antes de empezar te mandamos el link de las clases y los datos de pago.',
  ],
  'clase-prueba': [
    'Te escribimos por WhatsApp para elegir el día y la hora de tu clase de prueba.',
    'Entras a la clase en vivo por Google Meet, sin compromiso.',
    'Después decides con calma si te quedas.',
  ],
  registro: [
    'Te llega la confirmación de tu registro.',
    'Unos días antes te mandamos el link y la hora exacta por WhatsApp o correo.',
  ],
  aviso: [
    'Quedaste en la lista.',
    'Apenas abramos cupos, eres de los primeros en saberlo.',
  ],
};

export default function Gracias() {
  const { state } = useLocation();
  const nombre = state?.nombre;
  const tipo = state?.tipo || 'inscripcion';
  const pasos = PASOS[tipo] || PASOS.inscripcion;
  const invitacion = `¡Hola! Me inscribí en Instituto Lael${state?.programa ? ` (${state.programa})` : ''}. Tiene matrícula gratis y clases en vivo. Inscríbete en institutolael.cl/inscripcion y di que vas de parte mía 🙌`;

  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>¡Listo! | Instituto Lael</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="relative -mt-20 pt-40 pb-16 px-5 sm:px-6 text-white text-center" style={{ backgroundColor: BLUE }}>
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: YELLOW }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.5 }} />
          </svg>
        </motion.div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight leading-[1.05] mb-4 text-white">
          {nombre ? `¡Listo, ${nombre}!` : '¡Listo!'}
        </h1>
        <p className="text-white/75 text-lg max-w-xl mx-auto">
          {tipo === 'clase-prueba' ? 'Recibimos tu solicitud de clase de prueba.' : tipo === 'aviso' ? 'Te avisaremos apenas abramos.' : tipo === 'registro' ? 'Quedaste registrado.' : 'Tu cupo quedó reservado.'}
        </p>
        {state?.viaWhatsapp && (
          <a href={whatsappUrl(`Hola! Acabo de inscribirme en ${state?.programa || 'Instituto Lael'}.`)} target="_blank" rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 bg-[#D7E400] text-[#071D49] font-display font-extrabold text-sm uppercase tracking-wider min-h-[52px] px-6 rounded-2xl">
            <MessageCircle size={18} /> Si no se abrió WhatsApp, toca aquí
          </a>
        )}
      </section>

      <section className="px-5 sm:px-6 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-[#071D49]/5 shadow-card">
            <h2 className="font-display text-xl font-extrabold uppercase tracking-tight mb-5">Qué pasa ahora</h2>
            <ol className="space-y-4">
              {pasos.map((p, i) => (
                <li key={p} className="flex gap-4 items-start">
                  <span className="w-9 h-9 rounded-full flex items-center justify-center font-display font-black flex-shrink-0" style={{ backgroundColor: BLUE, color: YELLOW }}>{i + 1}</span>
                  <span className="pt-1.5 text-[#071D49]/85 leading-relaxed">{p}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-[28px] p-6 sm:p-8 text-white" style={{ backgroundColor: BLUE }}>
            <div className="flex items-center gap-3 mb-3">
              <Regalo size={24} className="text-white flex-shrink-0" />
              <h2 className="font-display text-xl font-extrabold uppercase tracking-tight">{REFERRAL.title}</h2>
            </div>
            <p className="text-white/80 leading-relaxed mb-5">{REFERRAL.desc}</p>
            <a href={`https://wa.me/?text=${encodeURIComponent(invitacion)}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#D7E400] text-[#071D49] font-display font-extrabold text-sm uppercase tracking-wider min-h-[52px] px-6 rounded-2xl">
              <MessageCircle size={18} /> Invitar a un amigo
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/calculadora" className="bg-white rounded-[24px] p-5 border border-[#071D49]/5 shadow-card flex items-center gap-3 min-h-[72px] font-semibold">
              <Calculadora size={22} /> Calcula tu puntaje <ArrowRight size={16} className="ml-auto" />
            </Link>
            <a href="https://instagram.com/institutolael" target="_blank" rel="noopener noreferrer" className="bg-white rounded-[24px] p-5 border border-[#071D49]/5 shadow-card flex items-center gap-3 min-h-[72px] font-semibold">
              <Instagram size={22} /> Síguenos <ArrowRight size={16} className="ml-auto" />
            </a>
            <a href="https://www.youtube.com/@Laelinstituto" target="_blank" rel="noopener noreferrer" className="bg-white rounded-[24px] p-5 border border-[#071D49]/5 shadow-card flex items-center gap-3 min-h-[72px] font-semibold">
              <Youtube size={22} /> Clases gratis <ArrowRight size={16} className="ml-auto" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
