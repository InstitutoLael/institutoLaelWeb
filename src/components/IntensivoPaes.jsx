import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { INTENSIVO, INTENSIVO_RAMOS_DISPONIBLES, intensivoAbierto, clp } from '../data/paes';
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
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D7E400] mb-3">{i.nombre} · {i.lema}</p>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] mb-4">
            {i.semanas} semanas para dar <span className="accent-serif text-[#D7E400]">tu gran paso.</span>
          </h2>
          <p className="text-white/75 leading-relaxed mb-4 max-w-xl">
            {i.fechas}, online y en vivo por Google Meet. Repasamos lo que más se repite en la prueba y llegas con un ensayo corregido a la PAES del {i.fechaPaes}.
          </p>
          <p className="text-sm text-white/85 mb-5">
            <span className="font-bold text-[#D7E400]">Ramos:</span> {INTENSIVO_RAMOS_DISPONIBLES.map((r) => r.nombre).join(', ')}.
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
          {i.precios.map((p) => (
            <div key={p.ramos} className={`flex items-start justify-between gap-4 py-3.5 border-b border-[#071D49]/10 ${p.destacado ? '-mx-3 px-3 rounded-2xl bg-[#D7E400]/40 border-transparent' : ''}`}>
              <div>
                <span className="font-semibold">{p.label}</span>
                {p.badge && <span className="ml-2 inline-block rounded-full bg-[#071D49] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 align-middle">{p.badge}</span>}
                {p.ahorro && <span className="block text-xs font-semibold text-[#071D49]/70">Ahorras {clp(p.ahorro)}</span>}
              </div>
              <div className="text-right">
                <span className="font-display text-2xl sm:text-3xl font-extrabold">{clp(p.total)}</span>
                <span className="block text-xs text-[#071D49]/70">Sale a {clp(Math.round(p.total / p.ramos))} por ramo{p.ramos >= 4 ? ' o menos' : ''}</span>
              </div>
            </div>
          ))}
          <p className="text-sm font-semibold leading-relaxed mt-4">{i.notaPago}</p>
          <p className="text-xs text-[#071D49]/70 leading-relaxed mt-1 mb-6">Descuentos: {i.descuentos}</p>
          <Link to="/inscripcion?programa=intensivo" className="min-h-[52px] w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D7E400] text-[#071D49] hover:bg-[#071D49] hover:text-white transition-colors font-display font-extrabold text-sm uppercase tracking-wider">
            Inscribirme al intensivo <ArrowRight size={16} />
          </Link>
          <p className="text-xs text-[#071D49]/60 mt-3 text-center"><Link to="/intensivo-paes" className="underline underline-offset-2">Preguntas frecuentes del intensivo</Link> · ¿Prefieres partir en marzo? Mira el preu más abajo.</p>
        </div>
      </div>
    </section>
  );
}
