import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { COLORES } from '../../data/catalogo';
import { ELECTIVA_PRICE, PACK_PRICE, PACK_MIN_SUBJECTS, clp } from '../../data/paes';
import { PRICE_MONTHLY, PRICE_QUARTERLY } from '../../data/idiomas';
import { REFORZAMIENTO_PRICE, REFORZAMIENTO_PACK } from '../../data/reforzamiento';
import { TALLERES_IA_PRICE } from '../../data/talleres-ia';
import { ORIENTACION_PRICE } from '../../data/orientacion';

// Precios de todos los programas en una lista tipo "carta": nombre, detalle y
// valor. Los montos salen de los archivos de datos de cada programa, así que
// si cambia un precio, cambia aquí solo.
const ease = [0.16, 1, 0.3, 1];

const FILAS = [
  { n: 'Preu PAES', d: `Pagas por ramo. Desde ${PACK_MIN_SUBJECTS} ramos, ${clp(PACK_PRICE)} en total`, desde: true, v: clp(ELECTIVA_PRICE), u: '/mes', to: '/paes', color: COLORES.paes },
  { n: 'Inglés', d: `Del A1 al B2. ${clp(PRICE_QUARTERLY)} al mes pagando el trimestre`, v: clp(PRICE_MONTHLY), u: '/mes', to: '/idiomas', color: COLORES.ingles },
  { n: 'Escuela de Sueños', d: 'Terminar el colegio con exámenes libres, mayores de 18', v: 'Gratis', to: '/adultos', color: COLORES.adultos },
  { n: 'Español para extranjeros', d: `${clp(PRICE_QUARTERLY)} al mes pagando el trimestre`, v: clp(PRICE_MONTHLY), u: '/mes', to: '/espanol', color: COLORES.espanol },
  { n: 'Clases particulares', d: `1 a 1, de 7° básico a 4° medio. 4 clases por ${REFORZAMIENTO_PACK}`, v: REFORZAMIENTO_PRICE, u: '/clase', to: '/reforzamiento', color: COLORES.reforzamiento },
  { n: 'Talleres de IA', d: 'Taller de 4 clases para estudiar mejor', v: TALLERES_IA_PRICE, to: '/talleres-ia', color: COLORES['talleres-ia'] },
  { n: 'Orientación vocacional', d: 'Sesión individual de 60 minutos', v: ORIENTACION_PRICE, to: '/orientacion', color: COLORES.orientacion },
  { n: 'Empresas', d: 'Capacitación a medida para equipos', v: 'Cotiza', to: '/empresas', color: COLORES.empresas },
];

export default function PreciosInstituto() {
  return (
    <ul className="border-t border-[#071D49]/15">
      {FILAS.map((f, i) => (
        <motion.li
          key={f.n}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: i * 0.04, ease }}
          className="border-b border-[#071D49]/15"
        >
          <Link to={f.to} className="group relative grid grid-cols-[1fr_auto] sm:grid-cols-[2.2rem_1fr_auto_2.5rem] items-center gap-x-4 gap-y-1 py-5 sm:py-6 overflow-hidden">
            {/* Barra del color del programa que se despliega al pasar el mouse */}
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] opacity-25" style={{ backgroundColor: f.color }} />
            <span aria-hidden="true" className="hidden sm:block relative w-3 h-3 rounded-full" style={{ backgroundColor: f.color }} />
            <span className="relative min-w-0">
              <span className="block font-display font-extrabold text-xl sm:text-2xl tracking-tight text-[#071D49]">{f.n}</span>
              <span className="block text-sm text-[#071D49]/70 mt-0.5">{f.d}</span>
            </span>
            <span className="relative text-right whitespace-nowrap">
              {f.desde && <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#071D49]/70">Desde</span>}
              <span className="font-display font-extrabold text-2xl sm:text-4xl tracking-tight text-[#071D49]">{f.v}</span>
              {f.u && <span className="text-sm font-semibold text-[#071D49]/70 ml-1">{f.u}</span>}
            </span>
            <ArrowUpRight size={20} aria-hidden="true" className="hidden sm:block relative justify-self-end text-[#071D49] transition-transform duration-500 group-hover:rotate-45" />
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
