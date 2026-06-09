import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FileText, MessageCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const BLUE = '#071D49';
const YELLOW = '#D7E400';
const GRAY = '#F4F4F4';
const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd_pn8y3Q2gFzf0l4jpLG_EVFZtvxgE2MRbmVRfLoKEW1_-Uw/viewform?embedded=true';
const WHATSAPP_URL = 'https://wa.me/56964626568?text=Hola!%20Quiero%20inscribirme%20en%20Instituto%20Lael.';
const FORM_DIRECT = 'https://forms.gle/H86nFAQ2DJ8CCQ7y6';

const ease = [0.16, 1, 0.3, 1];

export default function Inscripcion() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: GRAY }}>
      <Helmet>
        <title>Inscripción — Instituto Lael | Formulario de Matrícula</title>
        <meta name="description" content="Inscríbete en Instituto Lael. PAES Gratuita, Inglés, Lengua de Señas Chilena. Completa el formulario y comienza tu futuro hoy." />
      </Helmet>

      {/* ── HEADER SECTION ──────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: BLUE }}
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full mb-6">
              <FileText size={14} className="text-[#D7E400]" />
              <span className="text-white/80 text-xs font-bold uppercase tracking-[0.2em]">
                Formulario de inscripción
              </span>
            </div>

            <h1 className="font-['Montserrat'] font-black text-3xl md:text-5xl text-white leading-tight mb-4">
              Inscríbete en{' '}
              <span style={{ color: YELLOW }}>Instituto Lael</span>
            </h1>
            <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Completa el formulario a continuación para inscribirte en nuestros programas.
              Si tienes dudas, escríbenos directamente por WhatsApp.
            </p>
          </motion.div>
        </div>

        {/* Wave divider */}
        <svg
          viewBox="0 0 1440 60"
          className="w-full block"
          preserveAspectRatio="none"
          style={{ marginBottom: '-1px' }}
        >
          <path
            d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
            fill={GRAY}
          />
        </svg>
      </section>

      {/* ── FORM SECTION ────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 -mt-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-black/[0.04]"
        >
          {/* Form container */}
          <div className="p-2 md:p-4">
            <iframe
              src={FORM_URL}
              width="100%"
              height="900"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              title="Formulario de Inscripción Instituto Lael"
              className="rounded-2xl w-full"
              style={{ minHeight: '800px', maxHeight: '1200px' }}
              loading="lazy"
            >
              Cargando formulario…
            </iframe>
          </div>

          {/* Fallback bar */}
          <div
            className="px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-black/[0.05]"
            style={{ backgroundColor: '#FAFAFA' }}
          >
            <p className="text-sm text-gray-500 text-center sm:text-left">
              ¿Problemas con el formulario?{' '}
              <a
                href={FORM_DIRECT}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-lael-primary font-semibold hover:text-lael-accent transition-colors"
              >
                Ábrelo en otra pestaña
              </a>
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ backgroundColor: '#25D366', color: 'white' }}
            >
              <MessageCircle size={16} />
              Escríbenos por WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-lael-primary transition-colors font-medium"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
