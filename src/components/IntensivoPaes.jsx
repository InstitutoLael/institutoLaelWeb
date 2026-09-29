import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { INTENSIVO, intensivoAbierto, clp } from '../data/paes';
import PaesCountdown from './PaesCountdown';

// Intensivo de las últimas semanas antes de la PAES. Se oculta solo cuando
// cierra la inscripción (INTENSIVO.cierreInscripcion en data/paes.js).
export default function IntensivoPaes() {
  if (!intensivoAbierto()) return null;
  const i = INTENSIVO;
  return (
    <section id="intensivo" className="scroll-mt-24 px-5 sm:px-6 py-14 sm:py-16 bg-[#071D49] text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D7E400] mb-3">¿Das la PAES este año?</p>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] mb-4">
            {i.nombre}: <span className="accent-serif text-[#D7E400]">{i.semanas} semanas</span> para llegar mejor.
          </h2>
          <p className="text-white/75 leading-relaxed mb-6 max-w-xl">
            {i.fechas}, por Google Meet. Repasamos lo que más se repite en la prueba y practicas con ensayos completos, con el reloj corriendo.
          </p>
          <ul className="space-y-2.5 mb-7">
            {i.incluye.map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm sm:text-base">
                <CheckCircle2 size={18} className="text-[#D7E400] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-white/85">{t}</span>
              </li>
            ))}
          </ul>
          <PaesCountdown compact />
        </div>

        <div className="rounded-[28px] bg-white text-[#071D49] p-6 sm:p-8 shadow-lael">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#071D49]/60 mb-4">Precio por todo el intensivo</p>
          <div className="flex items-baseline justify-between gap-4 pb-4 border-b border-[#071D49]/10">
            <span className="font-semibold">Una prueba</span>
            <span className="font-display text-3xl font-extrabold">{clp(i.precioRamo)}</span>
          </div>
          <div className="flex items-baseline justify-between gap-4 py-4 border-b border-[#071D49]/10">
            <span className="font-semibold">{i.packDesde} pruebas o más</span>
            <span className="font-display text-3xl font-extrabold">{clp(i.precioPack)}</span>
          </div>
          <p className="text-sm text-[#071D49]/70 leading-relaxed mt-4 mb-6">
            Con {i.packDesde} pruebas ya ahorras {clp(i.precioRamo * i.packDesde - i.precioPack)}, y si tomas más, el precio no sube. Inscripción abierta hasta el 2 de noviembre.
          </p>
          <Link to="/inscripcion?programa=intensivo" className="min-h-[52px] w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D7E400] text-[#071D49] hover:bg-[#071D49] hover:text-white transition-colors font-display font-extrabold text-sm uppercase tracking-wider">
            Inscribirme al intensivo <ArrowRight size={16} />
          </Link>
          <p className="text-xs text-[#071D49]/60 mt-3 text-center">¿Prefieres partir con todo en marzo? Mira los planes del preu más abajo.</p>
        </div>
      </div>
    </section>
  );
}
