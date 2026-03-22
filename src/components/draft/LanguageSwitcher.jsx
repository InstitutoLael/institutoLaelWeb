import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'pt', label: 'PT', name: 'Português' },
  { code: 'kr', label: 'KR', name: '한국어' },
  { code: 'cn', label: 'CN', name: '中文' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        aria-label="Cambiar idioma"
      >
        <Globe size={18} />
        <span className="text-[10px] font-bold uppercase">{i18n.language ? i18n.language.substring(0,2).toUpperCase() : 'ES'}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 mt-2 w-32 bg-[#09090b] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 py-1"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-white/10 transition-colors flex items-center justify-between ${i18n.language === lang.code ? 'text-indigo-400 bg-white/5' : 'text-slate-400'}`}
                >
                  {lang.name}
                  {i18n.language === lang.code && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
