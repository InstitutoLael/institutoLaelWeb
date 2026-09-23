import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// Desplegable "Programas" del menú de computador. Se abre al pasar el mouse
// o con clic/teclado, y se cierra con Escape o al hacer clic afuera.
export const PROGRAMAS_MENU = [
  { name: 'Preu PAES', path: '/paes', tag: 'Desde $10.000/mes' },
  { name: 'Escuela de Sueños', path: '/adultos', tag: 'Gratis · mayores de 18' },
  { name: 'Inglés', path: '/idiomas', tag: 'Hablar sin miedo' },
  { name: 'Reforzamiento escolar', path: '/reforzamiento', tag: '7° básico a 2° medio' },
  { name: 'Verano Lael', path: '/verano', tag: 'Cursos de enero' },
  { name: 'Talleres de IA', path: '/talleres-ia', tag: 'Para estudiantes' },
  { name: 'Orientación vocacional', path: '/orientacion', tag: 'Sesión individual' },
  { name: 'Español para extranjeros', path: '/espanol', tag: 'Chile también es tu casa' },
  { name: 'Empresas', path: '/empresas', tag: 'Capacitación a medida' },
  { name: 'Lengua de Señas', path: '/lsch', tag: 'Próximamente' },
];

export default function ProgramasDropdown({ solid }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();
  const activo = PROGRAMAS_MENU.some((p) => location.pathname.startsWith(p.path));

  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick); };
  }, [open]);

  const color = solid
    ? activo ? 'text-lael-primary' : 'text-lael-primary/60 hover:text-lael-primary'
    : activo ? 'text-lael-accent' : 'text-white/80 hover:text-white';

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 text-[13px] tracking-[0.06em] uppercase font-bold py-2 transition-colors ${color}`}
      >
        Programas <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[560px]"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-[#071D49]/10 p-3 grid grid-cols-2 gap-1">
              {PROGRAMAS_MENU.map((p) => (
                <Link key={p.path} to={p.path} className="rounded-xl px-4 py-3 hover:bg-[#F4F4F4] focus-visible:bg-[#F4F4F4] focus:outline-none">
                  <span className="block text-sm font-bold text-[#071D49]">{p.name}</span>
                  <span className="block text-xs text-[#071D49]/60 mt-0.5">{p.tag}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
