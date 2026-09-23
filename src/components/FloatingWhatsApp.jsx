import React, { useState, useMemo } from 'react';
import { MessageCircle, X, ChevronRight, Zap, Target, HelpCircle, HandHeart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';
import { trackFunnelEvent } from '../utils/funnel';

const ICONOS = {
  paes: <Target size={18} />,
  idiomas: <Zap size={18} />,
  lsch: <HandHeart size={18} />,
  ayuda: <HelpCircle size={18} />,
};

const AYUDA = { id: 'ayuda', label: 'No sé qué elegir', icon: <HelpCircle size={18} />, msg: 'Hola, estoy viendo la web de Lael y no sé por dónde empezar. ¿Me pueden orientar?' };

const CONTEXTOS = [
  { match: ['/paes', '/preuniversitario'], opciones: [
    { id: 'paes_inscribir', label: 'Inscribirme al preu PAES', icon: 'paes', msg: 'Hola! Vi el preu PAES en la web y quiero inscribirme.' },
    { id: 'paes_prueba', label: 'Pedir una clase de prueba', icon: 'paes', msg: 'Hola! Me gustaría una clase de prueba gratis del preu PAES.' },
    { id: 'paes_beca', label: 'Preguntar por becas', icon: 'paes', msg: 'Hola! Quiero saber cómo postular a una beca del preu PAES.' },
  ] },
  { match: ['/calculadora'], opciones: [
    { id: 'calc_puntaje', label: 'Me faltan puntos, ¿me ayudan?', icon: 'paes', msg: 'Hola! Usé la calculadora de puntaje y me faltan puntos para la carrera que quiero. ¿Cómo me pueden ayudar?' },
  ] },
  { match: ['/adultos'], opciones: [
    { id: 'adultos', label: 'Quiero terminar el colegio', icon: 'ayuda', msg: 'Hola! Quiero terminar mis estudios con la Escuela de Sueños.' },
  ] },
  { match: ['/idiomas'], opciones: [
    { id: 'ingles', label: 'Clases de inglés', icon: 'idiomas', msg: 'Hola! Me interesan las clases de inglés de Lael.' },
    { id: 'ingles_prueba', label: 'Clase de prueba de inglés', icon: 'idiomas', msg: 'Hola! Me gustaría una clase de prueba gratis de inglés.' },
  ] },
  { match: ['/espanol', '/espanol-para-extranjeros'], opciones: [
    { id: 'espanol', label: 'Clases de español', icon: 'idiomas', msg: 'Hola! Me interesan las clases de español para extranjeros.' },
  ] },
  { match: ['/lsch'], opciones: [
    { id: 'lsch', label: 'Avísenme cuando abra LSCh', icon: 'lsch', msg: 'Hola! Quiero que me avisen cuando abra el curso de Lengua de Señas Chilena.' },
  ] },
  { match: ['/empresas'], opciones: [
    { id: 'empresas', label: 'Cotizar para mi empresa', icon: 'ayuda', msg: 'Hola! Quiero cotizar una capacitación para mi empresa.' },
  ] },
  { match: ['/verano'], opciones: [
    { id: 'verano', label: 'Cursos de verano', icon: 'paes', msg: 'Hola! Quiero información de los cursos de Verano Lael.' },
  ] },
  { match: ['/reforzamiento'], opciones: [
    { id: 'reforzamiento', label: 'Reforzamiento escolar', icon: 'paes', msg: 'Hola! Me interesa el reforzamiento escolar.' },
  ] },
  { match: ['/orientacion'], opciones: [
    { id: 'orientacion', label: 'Orientación vocacional', icon: 'ayuda', msg: 'Hola! Quiero agendar una orientación vocacional.' },
  ] },
  { match: ['/apoderados'], opciones: [
    { id: 'apoderados', label: 'Charla para apoderados', icon: 'ayuda', msg: 'Hola! Soy apoderado y quiero información de la charla sobre la PAES.' },
  ] },
  { match: ['/ensayo-gratis'], opciones: [
    { id: 'ensayo', label: 'Ensayo PAES gratis', icon: 'paes', msg: 'Hola! Quiero inscribirme al próximo ensayo PAES gratis.' },
  ] },
  { match: ['/talleres-ia'], opciones: [
    { id: 'talleres_ia', label: 'Talleres de IA', icon: 'idiomas', msg: 'Hola! Me interesan los talleres de IA para estudiantes.' },
  ] },
  { match: ['/alianzas'], opciones: [
    { id: 'alianzas', label: 'Hacer una alianza', icon: 'ayuda', msg: 'Hola! Represento a una institución y quiero conversar sobre una alianza con Lael.' },
  ] },
  { match: ['/alumnos'], opciones: [
    { id: 'alumnos', label: 'Soy alumno y tengo una duda', icon: 'ayuda', msg: 'Hola! Soy alumno de Lael y tengo una duda.' },
  ] },
];

const CONTEXTO_GENERAL = { opciones: [
  { id: 'paes_general', label: 'Quiero inscribirme al preu PAES', icon: 'paes', msg: 'Hola! Quiero información del preu PAES de Lael.' },
  { id: 'ingles_general', label: 'Clases de inglés', icon: 'idiomas', msg: 'Hola! Quiero saber más sobre las clases de inglés.' },
] };

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isContactPage = location.pathname === '/contacto';

  // Opciones de WhatsApp según la página: así sabes al tiro qué le interesa
  // a quien te escribe. Para agregar una página, suma una entrada a CONTEXTOS.
  const dynamicOptions = useMemo(() => {
    const path = location.pathname;
    const ctx = CONTEXTOS.find((c) => c.match.some((m) => path === m || path.startsWith(m + '/'))) || CONTEXTO_GENERAL;
    return [...ctx.opciones.map((o) => ({ ...o, icon: ICONOS[o.icon] || <MessageCircle size={18} /> })), AYUDA];
  }, [location.pathname]);

  if (isContactPage) return null;

  const handleOpen = () => {
    setIsOpen(!isOpen);
    trackEvent('whatsapp_menu_toggle', { state: !isOpen });
  };

  const handleOption = (option) => {
    trackEvent('whatsapp_option_click', { option: option.id });
    trackFunnelEvent('whatsapp');
    const url = `https://wa.me/56964626568?text=${encodeURIComponent(option.msg)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-72 bg-[#F4F4F4] rounded-3xl shadow-2xl border border-[#071D49]/10 overflow-hidden"
          >
            <div className="bg-[#25D366] p-6 text-white">
              <p className="font-display text-xl font-bold">Equipo Lael</p>
              <p className="text-white/80 text-xs">Escríbenos y te respondemos por acá</p>
            </div>
            <div className="p-4 space-y-2">
              {dynamicOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleOption(opt)}
                  className="w-full p-4 min-h-[52px] bg-white hover:bg-white border border-transparent hover:border-[#071D49]/20 rounded-2xl text-left flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[#071D49]">{opt.icon}</span>
                    <span className="text-[#071D49] text-sm font-semibold">{opt.label}</span>
                  </div>
                  <ChevronRight size={14} className="text-[#071D49]/40 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleOpen}
        animate={!isOpen ? { 
          scale: [1, 1.08, 1],
        } : {}}
        transition={!isOpen ? {
          duration: 0.6,
          repeat: Infinity,
          repeatDelay: 4,
          ease: "easeInOut"
        } : {}}
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
          isOpen ? 'bg-lael-primary text-lael-light rotate-90' : 'bg-[#25D366] text-white'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={32} />}
        
        {!isOpen && (
          <span className="absolute inset-0 rounded-full border-4 border-[#25D366] animate-ping opacity-25"></span>
        )}
      </motion.button>
    </div>
  );
}

