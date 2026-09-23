import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Info } from 'lucide-react';
import RichText from './RichText';

// Dibuja el contenido de una noticia a partir de bloques simples
// (ver el comentario al inicio de src/data/noticias.js).

function Table({ head = [], rows = [] }) {
  const stackOnMobile = head.length > 2;
  const table = (
    <div className={`${stackOnMobile ? 'hidden sm:block' : ''} overflow-x-auto rounded-2xl border border-[#071D49]/10`}>
      <table className="w-full text-left text-sm sm:text-base">
        <thead className="bg-[#071D49] text-white">
          <tr>
            {head.map((h, i) => (
              <th key={i} scope="col" className="px-4 py-3 font-display text-xs font-extrabold uppercase tracking-wider align-bottom">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className={r % 2 ? 'bg-[#F4F4F4]' : 'bg-white'}>
              {row.map((cell, c) => (
                <td key={c} className={`px-4 py-3 align-top leading-relaxed ${c === 0 ? 'font-semibold text-[#071D49]' : 'text-[#071D49]/80'}`}>
                  <RichText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (!stackOnMobile) return table;

  return (
    <>
      {table}
      {/* En celular, las tablas anchas se muestran como tarjetas */}
      <div className="sm:hidden space-y-3">
        {rows.map((row, r) => (
          <div key={r} className="rounded-2xl border border-[#071D49]/10 bg-[#F4F4F4] p-4">
            <p className="font-display font-extrabold text-[#071D49] mb-2">
              {head[0] ? <span className="text-xs uppercase tracking-wider text-[#071D49]/70 mr-2">{head[0]}</span> : null}
              <RichText text={row[0]} />
            </p>
            <dl className="space-y-1.5">
              {row.slice(1).map((cell, c) =>
                cell ? (
                  <div key={c} className="text-sm leading-relaxed">
                    <dt className="inline font-bold text-[#071D49]">{head[c + 1] || ''}{head[c + 1] ? ': ' : ''}</dt>
                    <dd className="inline text-[#071D49]/80"><RichText text={cell} /></dd>
                  </div>
                ) : null
              )}
            </dl>
          </div>
        ))}
      </div>
    </>
  );
}

export function CtaBox({ title, text, to, label, secondary }) {
  return (
    <div className="not-prose my-10 rounded-[28px] bg-[#071D49] text-white p-6 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D7E400] mb-3">Te ayudamos</p>
      <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight mb-3">{title}</h3>
      {text && <p className="text-white/75 leading-relaxed mb-6">{text}</p>}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to={to}
          className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D7E400] text-[#071D49] hover:bg-white font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-2xl transition-colors"
        >
          {label} <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
        {secondary && (
          <Link
            to={secondary.to}
            className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/40 text-white hover:bg-white hover:text-[#071D49] font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-2xl transition-colors"
          >
            {secondary.label}
          </Link>
        )}
      </div>
    </div>
  );
}

export default function NoticiaBody({ blocks = [] }) {
  return (
    <div className="text-[#071D49]/80 text-base sm:text-lg leading-relaxed">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h2':
            return (
              <h2 key={i} className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-[#071D49] mt-10 mb-4 leading-snug">
                {b.text}
              </h2>
            );
          case 'p':
            return (
              <p key={i} className="mb-5">
                <RichText text={b.text} />
              </p>
            );
          case 'list': {
            const Tag = b.ordered ? 'ol' : 'ul';
            return (
              <Tag key={i} className="mb-6 space-y-3">
                {b.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    {b.ordered ? (
                      <span className="flex-shrink-0 w-7 h-7 mt-0.5 rounded-full bg-[#D7E400] text-[#071D49] font-display font-extrabold text-sm flex items-center justify-center">
                        {j + 1}
                      </span>
                    ) : (
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#071D49] mt-3" aria-hidden="true" />
                    )}
                    <span className="min-w-0"><RichText text={item} /></span>
                  </li>
                ))}
              </Tag>
            );
          }
          case 'table':
            return (
              <div key={i} className="mb-6">
                <Table head={b.head} rows={b.rows} />
              </div>
            );
          case 'callout':
            return (
              <div key={i} className="my-8 rounded-2xl bg-[#D7E400]/25 border-l-4 border-[#D7E400] p-5 sm:p-6">
                {b.title && (
                  <p className="flex items-center gap-2 font-display font-extrabold text-[#071D49] mb-2">
                    <Info className="w-5 h-5 flex-shrink-0" aria-hidden="true" /> {b.title}
                  </p>
                )}
                <p className="text-[#071D49]/85 leading-relaxed"><RichText text={b.text} /></p>
              </div>
            );
          case 'cta':
            return <CtaBox key={i} {...b} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
