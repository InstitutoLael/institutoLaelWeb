import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Youtube } from 'lucide-react';
import logo from '../assets/img/Logos/lael-inst-negro.png';
import { NAVIGATION } from '../data/navigation';

const SOCIAL = [
  { name: 'Instagram', href: 'https://instagram.com/institutolael', Icon: Instagram },
  { name: 'YouTube', href: 'https://www.youtube.com/channel/UCl0JuF0HlFpQEWPV_tIxV2g', Icon: Youtube },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/instituto-lael', Icon: Linkedin },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-lael-primary border-t border-lael-bd pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Marca */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <Link to="/">
              <img src={logo} alt="Instituto Lael" loading="lazy" className="h-7 w-auto opacity-90 hover:opacity-100 transition-opacity" />
            </Link>
            <p className="text-lael-muted text-sm leading-relaxed max-w-xs">
              Sistema de rendimiento académico. PAES, Idiomas, LSCh y Nivelación para Adultos.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {SOCIAL.map(({ name, href, Icon }) => (
                <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={name}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-black/[0.03] border border-black/[0.06] text-lael-muted hover:text-lael-accent hover:border-lael-accent/30 transition-all duration-300">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Programas */}
          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-lael-muted mb-6">Programas</h4>
            <nav className="flex flex-col gap-4">
              {NAVIGATION.footer.programs.map(l => (
                <Link key={l.path} to={l.path} className="text-sm text-lael-muted hover:text-lael-accent transition-colors duration-300">
                  {l.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Instituto */}
          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-lael-muted mb-6">Instituto</h4>
            <nav className="flex flex-col gap-4 mb-8">
              {NAVIGATION.footer.company.map(l => (
                <Link key={l.path} to={l.path} className="text-sm text-lael-muted hover:text-lael-accent transition-colors duration-300">
                  {l.name}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2">
              <a href="mailto:contacto@institutolael.cl" className="text-sm text-lael-muted hover:text-lael-accent transition-colors">
                contacto@institutolael.cl
              </a>
              <a href="https://instagram.com/institutolael" target="_blank" rel="noreferrer" className="text-sm text-lael-muted hover:text-lael-accent transition-colors">
                @institutolael
              </a>
              <p className="text-sm text-lael-muted">Santiago, Chile</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-lael-bd pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-lael-muted/80 tracking-wider">
            © {year} Instituto Lael SpA · Santiago, Chile
          </p>
          <p className="text-[11px] text-lael-muted/60 italic tracking-wider">
            "El Espíritu del Señor está sobre mí..." — Lucas 4:18
          </p>
        </div>
      </div>
    </footer>
  );
}