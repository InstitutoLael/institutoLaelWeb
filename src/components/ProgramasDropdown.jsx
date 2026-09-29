import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { AUDIENCIAS, HERRAMIENTAS } from '../data/catalogo';

// Menú "Programas" del computador, ordenado por para quién es cada cosa.
// Se abre al pasar el mouse o con clic/teclado; se cierra con Escape o al
// hacer clic afuera. El panel se ubica respecto a la barra completa (el
// contenedor del Navbar es "relative"), por eso este div no es relative.
const RUTAS = AUDIENCIAS.flatMap((a) => a.items.map((i) => i.path));

export default function ProgramasDropdown({ solid }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const btnRef = useRef(null);
  const location = useLocation();
  const activo = RUTAS.some((p) => location.pathname === p || location.pathname.startsWith(p + '/'));

  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        if (ref.current && ref.current.contains(document.activeElement)) btnRef.current && btnRef.current.focus();
      }
    };
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick); };
  }, [open]);

  const color = solid
    ? activo ? 'text-lael-primary' : 'text-lael-primary/75 hover:text-lael-primary'
    : activo ? 'text-lael-accent' : 'text-white/80 hover:text-white';

  return (
    <div
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => { if (ref.current && !ref.current.contains(e.relatedTarget)) setOpen(false); }}
    >
      <button
        type="button"
        ref={btnRef}
        aria-expanded={open}
        aria-controls="menu-programas"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 text-[13px] tracking-[0.06em] uppercase font-bold py-2 transition-colors ${color}`}
      >
        Programas <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.16 }}
            id="menu-programas"
            className="absolute inset-x-0 mx-auto top-[calc(100%-1.25rem)] pt-7 w-[min(960px,calc(100vw-4rem))]"
          >
            <div className="bg-white rounded-[24px] shadow-2xl border border-[#071D49]/10 overflow-hidden">
              <div className="grid grid-cols-4 gap-2 p-4">
                {AUDIENCIAS.map((a) => (
                  <div key={a.id} className="p-2">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#071D49]/50 px-3 mb-1">Para {a.title.toLowerCase()}</p>
                    <ul>
                      {a.items.map((p) => (
                        <li key={p.path}>
                          <Link to={p.path} className="group flex gap-3 rounded-xl px-3 py-2.5 hover:bg-[#F4F4F4] focus-visible:bg-[#F4F4F4]">
                            <span aria-hidden="true" className="mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 ring-2 ring-[#071D49]/10" style={{ backgroundColor: p.color }} />
                            <span>
                              <span className="block text-sm font-bold text-[#071D49] leading-tight">{p.name}</span>
                              <span className="block text-xs text-[#071D49]/65 mt-0.5">{p.tag}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="bg-[#F4F4F4] px-6 py-3.5 flex items-center gap-x-6 gap-y-2 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#071D49]/50">Gratis</span>
                {HERRAMIENTAS.map((h) => (
                  <Link key={h.path} to={h.path} className="text-sm font-semibold text-[#071D49] hover:underline underline-offset-4">{h.name}</Link>
                ))}
                <Link to="/inscripcion" className="ml-auto inline-flex items-center gap-1.5 text-sm font-bold text-[#071D49]">Inscribirme <ArrowRight size={14} /></Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
