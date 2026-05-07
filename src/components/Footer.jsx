import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, Linkedin, Youtube } from 'lucide-react';
import logoNegro from '../assets/img/Logos/lael-inst-negro.png';
import logoBlanco from '../assets/img/Logos/lael-inst-blanco.png';
import { NAVIGATION } from '../data/navigation';

const SOCIAL = [
  { name: 'Instagram', href: 'https://instagram.com/institutolael', Icon: Instagram },
  { name: 'YouTube', href: 'https://www.youtube.com/channel/UCl0JuF0HlFpQEWPV_tIxV2g', Icon: Youtube },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/instituto-lael', Icon: Linkedin },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const location = useLocation();
  const isLightPage = ['/nosotros', '/contacto', '/transparencia', '/preguntas', '/diagnostico'].includes(location.pathname);

  return (
    <footer className="bg-lael-primary border-t border-lael-bd pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          {/* Marca */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <Link to="/">
              <img src={logoBlanco} alt="Instituto Lael" loading="lazy" className="h-7 w-auto opacity-90 hover:opacity-100 transition-opacity" />
            </Link>
            <p className="text-lael-muted text-sm leading-relaxed max-w-xs">
              No vendemos cursos. Activamos propósitos a través de ingeniería de rendimiento académico y estrategia táctica de alto nivel.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {SOCIAL.map(({ name, href, Icon }) => (
                <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={name}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-lael-bd text-lael-muted hover:text-lael-accent hover:border-lael-accent/30 transition-all duration-300">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Programas */}
          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-lael-muted mb-6 font-bold">Entrenamiento</h4>
            <nav className="flex flex-col gap-4">
              <Link to="/paes" className="text-sm text-lael-muted hover:text-lael-accent transition-colors">PAES Gratuita</Link>
              <Link to="/idiomas" className="text-sm text-lael-muted hover:text-lael-accent transition-colors">Idiomas</Link>
              <Link to="/lsch" className="text-sm text-lael-muted hover:text-lael-accent transition-colors">LSCh (Señas)</Link>
            </nav>
          </div>

          {/* Instituto */}
          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-lael-muted mb-6 font-bold">Instituto</h4>
            <nav className="flex flex-col gap-4">
              <Link to="/nosotros" className="text-sm text-lael-muted hover:text-lael-accent transition-colors">Sobre Nosotros</Link>
              <Link to="/contacto" className="text-sm text-lael-muted hover:text-lael-accent transition-colors">Contacto</Link>
              <Link to="/preguntas" className="text-sm text-lael-muted hover:text-lael-accent transition-colors">Preguntas Frecuentes</Link>
            </nav>
          </div>

          {/* Contacto Directo */}
          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-lael-muted mb-6 font-bold">Legal</h4>
            <nav className="flex flex-col gap-4">
              <Link to="/transparencia" className="text-sm text-lael-muted hover:text-lael-accent transition-colors">Transparencia</Link>
              <a href="mailto:contacto@institutolael.cl" className="text-sm text-lael-muted hover:text-lael-accent transition-colors">contacto@institutolael.cl</a>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-lael-bd pt-12 flex flex-col items-center gap-8 text-center">
          <p className="text-lael-muted text-sm italic max-w-2xl leading-relaxed">
             “Nacimos para los que el sistema decidió ignorar. Volvemos con más claridad y el mismo propósito.”
          </p>
          <div className="flex flex-col items-center gap-2">
            <p className="text-[11px] text-lael-muted/60 italic tracking-[0.2em] uppercase font-bold">
               Lucas 4:18
            </p>
            <p className="text-[10px] text-lael-muted/40 tracking-widest">
              © {year} Instituto Lael SpA · Santiago, Chile
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}