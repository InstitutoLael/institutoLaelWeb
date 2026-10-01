import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, Youtube, Mail, MessageCircle, ArrowRight } from 'lucide-react';
import LaelLogo from './ui/LaelLogo';
import ThemeToggle from './ThemeToggle';
import { AUDIENCIAS, HERRAMIENTAS } from '../data/catalogo';
import { whatsappUrl } from '../lib/backend';

const SOCIAL = [
  { name: 'Instagram', href: 'https://instagram.com/institutolael', Icon: Instagram },
  { name: 'YouTube', href: 'https://www.youtube.com/@Laelinstituto', Icon: Youtube },
];

const porId = (id) => AUDIENCIAS.find((a) => a.id === id);

// Cuatro columnas de enlaces, ordenadas por lo que la persona busca
const COLUMNAS = [
  { title: 'Programas', links: [...porId('estudiantes').items, ...porId('adultos').items, ...porId('empresas').items].map((p) => ({ name: p.name, path: p.path, color: p.color })) },
  { title: 'Apoderados y alumnos', links: [
    ...porId('apoderados').items.map((p) => ({ name: p.name, path: p.path })),
    { name: 'Alumnos Lael', path: '/alumnos' },
    { name: 'Trae un amigo', path: '/trae-un-amigo' },
    { name: 'Deja tu testimonio', path: '/testimonio' },
  ] },
  { title: 'Herramientas gratis', links: HERRAMIENTAS.map((h) => ({ name: h.name, path: h.path })) },
  { title: 'Instituto', links: [
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Así se estudia en Lael', path: '/metodo' },
    { name: 'Casos reales', path: '/casos-reales' },
    { name: 'Noticias y guías', path: '/noticias' },
    { name: 'Preguntas frecuentes', path: '/preguntas' },
    { name: 'Contacto', path: '/contacto' },
  ] },
];

const LEGAL = [
  { name: 'Condiciones y reglamento', path: '/condiciones' },
  { name: 'Política de privacidad', path: '/privacidad' },
  { name: 'Transparencia', path: '/transparencia' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  // El correo se escribe recién en el navegador: Cloudflare "esconde" los
  // correos que encuentra en el HTML, y eso descalza el inicio pre-dibujado.
  const [correo, setCorreo] = useState(null);
  useEffect(() => { setCorreo(['contacto', 'institutolael.cl'].join('@')); }, []);
  // La portada ya termina con su propio llamado a inscribirse
  const esInicio = useLocation().pathname === '/';

  return (
    <footer className="grain relative bg-[#071D49] text-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 pt-16 sm:pt-20 pb-10">

        {/* Llamado a la acción */}
        {!esInicio && <div className="mb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-[#D7E400] font-bold mb-3">Nueva temporada · Marzo 2027</p>
            <p className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight max-w-2xl">
              Tu sueño no tiene <span className="accent-serif text-[#D7E400]">fecha de vencimiento.</span>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a href="/inscripcion" className="inline-flex items-center justify-center gap-2 min-h-[52px] px-7 rounded-2xl bg-[#D7E400] text-[#071D49] font-display font-extrabold text-sm uppercase tracking-wider">
              Inscribirme <ArrowRight size={16} />
            </a>
            <a href={whatsappUrl('Hola! Tengo una consulta sobre Instituto Lael')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 min-h-[52px] px-7 rounded-2xl border border-white/25 hover:bg-white/10 font-bold text-sm">
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </div>}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10 mb-14">
          {/* Marca */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 flex flex-col gap-5 lg:pr-8">
            <Link to="/" aria-label="Instituto Lael, ir al inicio" className="w-fit">
              <LaelLogo variant="blanco" title="" className="h-10 w-auto" />
            </Link>
            <p className="text-white/65 text-sm leading-relaxed max-w-xs">
              Instituto online desde 2021. Preu PAES, idiomas, nivelación gratis para adultos y capacitación para empresas.
            </p>
            <a href={correo ? `mailto:${correo}` : '/contacto'} className="inline-flex items-center gap-2 text-white/75 text-sm hover:text-white w-fit min-h-[32px]">
              <Mail size={15} /> {correo || 'Escríbenos un correo'}
            </a>
            <div className="flex gap-2">
              {SOCIAL.map(({ name, href, Icon }) => (
                <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={`${name} (se abre en otra pestaña)`} className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/75 hover:text-white hover:bg-white/10 transition-colors">
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNAS.map((col, ci) => (
            <nav key={col.title} aria-labelledby={`footer-col-${ci}`}>
              <h2 id={`footer-col-${ci}`} className="text-[11px] tracking-[0.16em] uppercase text-white/55 mb-4 font-bold">{col.title}</h2>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.path}>
                    <Link to={l.path} className="group inline-flex items-center gap-2 text-sm text-white/75 hover:text-white transition-colors min-h-[28px]">
                      {l.color && <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-80 group-hover:opacity-100" style={{ backgroundColor: l.color }} />}
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Barra inferior */}
        <div className="pt-8 border-t border-white/10 flex flex-col lg:flex-row gap-5 lg:items-center justify-between text-xs text-white/60">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <p suppressHydrationWarning>© {year} Instituto Lael SpA · RUT 78.084.019-6 · Santiago, Chile</p>
            <p className="italic tracking-[0.1em] uppercase font-bold">Lucas 4:18</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {LEGAL.map((l) => <Link key={l.path} to={l.path} className="hover:text-white min-h-[32px] inline-flex items-center">{l.name}</Link>)}
            <Link to="/marca" className="hover:text-white min-h-[32px] inline-flex items-center">Marca</Link>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Firma: el logo a todo lo ancho, asomándose desde el borde de abajo */}
      <div aria-hidden="true" className="relative max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12 h-[clamp(130px,33vw,520px)] overflow-hidden">
        <LaelLogo variant="blanco" tagline={false} title="" className="w-full h-auto" />
      </div>
    </footer>
  );
}
