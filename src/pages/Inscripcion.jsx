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
    <main className="w-full min-h-screen overflow-x-clip font-sans text-[#071D49]" style={{ backgroundColor: GRAY }}>
      <Helmet>
        <title>Inscripción - Instituto Lael | Formulario de Matrícula</title>
        <meta name="description" content="Inscríbete en Instituto Lael: preu PAES, inglés, español o nivelación para adultos. Llenas el formulario y listo, la matrícula es gratis." />
      </Helmet>

      {/* ── HEADER SECTION ──────────────────────────────────────────── */}
      <section className="relative -mt-20 text-white" style={{ backgroundColor: BLUE }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-6 pt-36 sm:pt-40 pb-14 sm:pb-16 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full mb-6">
              <FileText size={14} className="text-[#D7E400]" />
              <span className="text-white/80 text-xs font-bold uppercase tracking-[0.2em]">
                Formulario de inscripción
              </span>
            </div>

            <h1 className="text-white font-display font-extrabold uppercase tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-5">
              Inscríbete en{' '}
              <span style={{ color: YELLOW }}>Instituto Lael</span>
            </h1>
            <p className="text-white/75 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Llena el formulario de abajo para inscribirte. La matrícula es gratis.
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
          aria-hidden="true"
        >
          <path
            d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
            fill={GRAY}
          />
        </svg>
      </section>

      {/* ── FORM SECTION ────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 -mt-4 pb-16 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="bg-white rounded-[28px] shadow-card overflow-hidden border border-[#071D49]/5"
        >
          {/* Form container */}
          <div className="p-2 sm:p-4">
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
            >
              Cargando formulario…
            </iframe>
          </div>

          {/* Fallback bar */}
          <div className="px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#071D49]/5 bg-[#F4F4F4]/60">
            <p className="text-sm sm:text-base text-[#071D49]/70 text-center sm:text-left">
              ¿Problemas con el formulario?{' '}
              <a
                href={FORM_DIRECT}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 text-[#071D49] font-bold hover:text-[#0B2A66] transition-colors"
              >
                Ábrelo en otra pestaña
              </a>
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 rounded-2xl bg-[#D7E400] text-[#071D49] hover:bg-[#071D49] hover:text-white font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-colors active:scale-95"
            >
              <MessageCircle size={18} />
              Escríbenos por WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Back link */}
        <div className="text-center mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 min-h-[44px] px-3 text-sm font-semibold text-[#071D49]/70 hover:text-[#071D49] transition-colors"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}
