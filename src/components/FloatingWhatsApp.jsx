import React, { useState, useMemo } from 'react';
import { MessageCircle, X, ChevronRight, Zap, Target, HelpCircle, HandHeart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';
import { trackFunnelEvent } from '../utils/funnel';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isContactPage = location.pathname === '/contacto';

  const dynamicOptions = useMemo(() => {
    const path = location.pathname;
    
    const baseOptions = [
      { 
        id: 'ayuda', 
        label: 'No sé qué elegir', 
        icon: <HelpCircle size={18} />, 
        msg: 'Hola, estoy viendo la web y no sé por dónde empezar. ¿Me pueden orientar?' 
      }
    ];

    if (path === '/paes') {
      return [
        { 
          id: 'paes_gratis',
          label: 'Inscribirme a PAES',
          icon: <Target size={18} />,
          msg: 'Hola, quiero inscribirme a la PAES de Lael.'
        },
        ...baseOptions
      ];
    }

    if (path === '/idiomas') {
      return [
        { 
          id: 'idiomas', 
          label: 'Consulta de Idiomas', 
          icon: <Zap size={18} />, 
          msg: 'Hola, me interesa un curso de idiomas en Lael.' 
        },
        ...baseOptions
      ];
    }

    if (path === '/lsch') {
      return [
        { 
          id: 'lsch', 
          label: 'Curso LSCh', 
          icon: <HandHeart size={18} />, 
          msg: 'Hola, me interesa el curso de LSCh.' 
        },
        ...baseOptions
      ];
    }

    // Default / Home / Others
    return [
      { 
        id: 'paes_gratis',
        label: 'Quiero inscribirme a PAES',
        icon: <Target size={18} />,
        msg: 'Hola, quiero unirme a las clases de PAES.'
      },
      { 
        id: 'idiomas', 
        label: 'Ver Idiomas', 
        icon: <Zap size={18} />, 
        msg: 'Hola, quiero saber más sobre los cursos de idiomas.' 
      },
      ...baseOptions
    ];
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

