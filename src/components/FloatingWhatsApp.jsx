import React, { useState } from 'react';
import { MessageCircle, X, ChevronRight, Zap, Target, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '../utils/analytics';

const OPTIONS = [
  { 
    id: 'paes_gratis', 
    label: 'Quiero PAES Gratis', 
    icon: <Target size={18} />, 
    msg: 'Hola, quiero unirme a las clases gratuitas de PAES en vivo por Google Meet.' 
  },
  { 
    id: 'mejorar', 
    label: 'Tengo dudas sobre idiomas', 
    icon: <Zap size={18} />, 
    msg: 'Hola, me interesa saber más sobre el programa de Idiomas y cómo funcionan las simulaciones reales.' 
  },
  { 
    id: 'ayuda', 
    label: 'No sé qué elegir', 
    icon: <HelpCircle size={18} />, 
    msg: 'Hola, estoy viendo la web y no sé por dónde empezar. ¿Me pueden orientar?' 
  }
];

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    trackEvent('whatsapp_menu_toggle', { state: !isOpen });
  };

  const handleOption = (option) => {
    trackEvent('whatsapp_option_click', { option: option.id });
    const url = `https://wa.me/56964626568?text=${encodeURIComponent(option.msg)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-72 bg-[#F8F5F0] rounded-3xl shadow-2xl border border-lael-bd overflow-hidden"
          >
            <div className="bg-[#25D366] p-6 text-white">
              <p className="font-display text-xl font-bold">Estrategas Lael</p>
              <p className="text-white/80 text-xs">En línea ahora · Respuesta inmediata</p>
            </div>
            <div className="p-4 space-y-2">
              {OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleOption(opt)}
                  className="w-full p-4 bg-white hover:bg-lael-accent/5 border border-transparent hover:border-lael-accent/20 rounded-2xl text-left flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lael-accent">{opt.icon}</span>
                    <span className="text-lael-muted text-xs font-bold uppercase tracking-wider">{opt.label}</span>
                  </div>
                  <ChevronRight size={14} className="text-lael-accent/40 group-hover:translate-x-1 transition-transform" />
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
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
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

