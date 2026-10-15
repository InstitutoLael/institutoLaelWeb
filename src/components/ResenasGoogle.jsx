import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { getResenas } from '../lib/backend';
import { CONTACT_INFO } from '../data/contact';

// Reseñas del perfil de Google de Lael. Las baja la planilla una vez al día
// (google-apps-script/Code.gs → sincronizarResenas). Mientras no haya
// reseñas, no se muestra nada.
const MESES = ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sept.', 'oct.', 'nov.', 'dic.'];
const fechaCorta = (iso) => {
  const [a, m] = String(iso).split('-');
  return a && m ? `${MESES[Number(m) - 1]} ${a}` : '';
};
const Estrellas = ({ n, className = '' }) => (
  <span className={`tracking-[0.2em] ${className}`} role="img" aria-label={`${n} de 5 estrellas`}>
    {'★'.repeat(n)}<span className="opacity-25">{'★'.repeat(5 - n)}</span>
  </span>
);

export default function ResenasGoogle({ dark = false, max = 6, className = '' }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    let vivo = true;
    getResenas().then((r) => { if (vivo) setData(r); });
    return () => { vivo = false; };
  }, []);
  if (!data) return null;

  const tarjeta = dark ? 'bg-white/[0.06] border-white/10' : 'bg-white border-[#071D49]/5 shadow-card';
  const suave = dark ? 'text-white/65' : 'text-[#071D49]/65';
  const estrella = dark ? 'text-[#D7E400]' : 'text-[#071D49]';
  return (
    <div className={`${dark ? 'text-white' : 'text-[#071D49]'} ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <p className={`text-xs font-bold uppercase tracking-[0.2em] mb-2 ${suave}`}>Reseñas en Google</p>
          {data.promedio ? (
            <p className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
              {data.promedio.toFixed(1).replace('.', ',')} <Estrellas n={Math.round(data.promedio)} className={`text-2xl ${estrella}`} />
              <span className={`block sm:inline sm:ml-3 text-sm font-semibold ${suave}`}>{data.total} {data.total === 1 ? 'reseña' : 'reseñas'}</span>
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
          <a href={CONTACT_INFO.googleReview.perfil} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 min-h-[44px] underline underline-offset-4">Ver todas en Google <ArrowUpRight size={14} aria-hidden="true" /></a>
          <a href={CONTACT_INFO.googleReview.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 min-h-[44px] underline underline-offset-4">Dejar mi opinión <ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.lista.slice(0, max).map((r, i) => (
          <motion.figure
            key={`${r.nombre}-${r.fecha}-${i}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={`rounded-[24px] border p-6 flex flex-col ${tarjeta}`}
          >
            <Estrellas n={r.estrellas} className={`text-lg ${estrella}`} />
            <blockquote className="mt-3 text-sm sm:text-base leading-relaxed line-clamp-[8]">{r.texto}</blockquote>
            {r.respuesta && (
              <p className={`mt-4 text-xs leading-relaxed border-l-2 border-[#D7E400] pl-3 line-clamp-3 ${suave}`}>
                <span className="font-bold">Respuesta de Lael:</span> {r.respuesta}
              </p>
            )}
            <figcaption className={`mt-auto pt-5 text-xs ${suave}`}>
              <span className={`font-bold ${dark ? 'text-white' : 'text-[#071D49]'}`}>{r.nombre}</span> · {fechaCorta(r.fecha)} · Google
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
}
