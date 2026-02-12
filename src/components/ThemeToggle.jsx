import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors overflow-hidden"
      aria-label="Alternar tema"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180, scale: theme === 'dark' ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon size={20} />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'light' ? 0 : -180, scale: theme === 'light' ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center"
      >
        <Sun size={20} />
      </motion.div>
      
      {/* Invisible spacer to maintain size */}
      <div className="w-5 h-5 opacity-0"><Sun size={20} /></div>
    </button>
  );
}
