import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { LOGO_PATHS, Paloma } from '../ui/LaelLogo';
import { PROGRAMAS_CATALOGO } from '../../data/catalogo';

// Cortina entre páginas: al cambiar de ruta, un paño azul con la onda de Lael
// cubre la pantalla y sube con el borde curvo, dejando ver la página nueva.
// Mientras tanto la página se carga debajo. No aparece la primera vez (para
// eso está la intro) ni si la persona pidió menos movimiento.
const ease = [0.76, 0, 0.24, 1];

const NOMBRES = {
  '/': 'Inicio',
  '/nosotros': 'Nosotros',
  '/contacto': 'Contacto',
  '/calculadora': 'Calculadora',
  '/noticias': 'Noticias',
  '/inscripcion': 'Inscripción',
  '/metodo': 'Así se estudia',
  '/preguntas': 'Preguntas',
  '/alumnos': 'Alumnos',
  '/becas': 'Becas',
  '/marca': 'Marca',
};

function nombreDe(pathname) {
  const p = PROGRAMAS_CATALOGO.find((x) => x.path === pathname);
  return (p && p.name) || NOMBRES[pathname] || '';
}

export default function RouteCurtain() {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const primera = useRef(true);
  const [vuelta, setVuelta] = useState(0);

  useEffect(() => {
    if (primera.current) { primera.current = false; return; }
    if (!reduce) setVuelta((v) => v + 1);
  }, [pathname, reduce]);

  if (!vuelta) return null;
  const nombre = nombreDe(pathname);

  return (
    <motion.div
      key={vuelta}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 h-[120vh] z-[1050] pointer-events-none"
      initial={{ y: '0%' }}
      animate={{ y: '-120%' }}
      transition={{ duration: 0.9, delay: 0.28, ease }}
    >
      <div className="grain absolute inset-x-0 top-0 h-[100vh] bg-[#071D49] flex flex-col items-center justify-center gap-5">
        <motion.svg viewBox="0 0 290 132" className="w-[min(40vw,180px)]" initial={{ opacity: 1 }} animate={{ opacity: 0, y: -30 }} transition={{ duration: 0.4, delay: 0.3 }}>
          <path d={LOGO_PATHS.onda} pathLength="1" className="lael-draw" style={{ animationDuration: '0.5s' }} fill="none" stroke="#fff" strokeWidth="9.5" strokeLinecap="round" />
          <Paloma fill="var(--programa)" />
        </motion.svg>
        {nombre && (
          <motion.p initial={{ opacity: 1 }} animate={{ opacity: 0, y: -20 }} transition={{ duration: 0.35, delay: 0.32 }} className="accent-serif text-white text-3xl sm:text-4xl">
            {nombre}
          </motion.p>
        )}
      </div>
      {/* Borde inferior curvo */}
      <svg className="absolute inset-x-0 top-[100vh] w-full h-[20vh]" viewBox="0 0 100 20" preserveAspectRatio="none">
        <path d="M0 0 H100 V0 Q50 20 0 0 Z" fill="#071D49" />
      </svg>
    </motion.div>
  );
}
