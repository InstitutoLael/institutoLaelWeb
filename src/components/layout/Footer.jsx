import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { NAVIGATION } from "../../data/navigation";
import logoAmarillo from "../../assets/img/Logos/lael-inst-amarillo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 py-24 border-t border-white/5 relative overflow-hidden">
      {/* GLOW DECORATION */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* COL 1: MARCA & PROPOSITO */}
          <div className="space-y-8 text-center md:text-left">
            <Link to="/" className="inline-block transition-transform hover:scale-105">
              <img src={logoAmarillo} alt="Instituto Lael" className="h-12 w-auto mx-auto md:mx-0 object-contain" />
            </Link>
            <div className="space-y-4">
              <p className="text-sm leading-relaxed max-w-xs font-medium italic text-slate-500">
                "Perteneciente a un propósito mayor"
              </p>
              <p className="text-[11px] leading-relaxed max-w-xs text-slate-600 font-bold uppercase tracking-widest">
                Lael (לָאֵל) • Números 3:24
              </p>
            </div>
          </div>

          {/* COL 2: PROGRAMAS */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-8">Programas Académicos</h4>
            <ul className="space-y-4">
              {NAVIGATION.footer.programs.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm font-bold hover:text-indigo-400 transition-colors uppercase tracking-widest text-slate-500">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3: INSTITUCIÓN */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-8">Institucional</h4>
            <ul className="space-y-4">
              {NAVIGATION.footer.company.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm font-bold hover:text-indigo-400 transition-colors uppercase tracking-widest text-slate-500">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 4: CONTACTO & REDES */}
          <div className="text-center md:text-left space-y-8">
            <div>
              <h4 className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-6">Conexión Directa</h4>
              <div className="flex flex-col items-center md:items-start gap-4">
                <a href={NAVIGATION.action.whatsapp.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-emerald-500 font-black uppercase tracking-widest text-xs hover:text-emerald-400 transition-colors" aria-label="WhatsApp">
                  <MessageCircle size={20} /> {NAVIGATION.action.whatsapp.label}
                </a>
                <a href="mailto:contacto@institutolael.cl" className="flex items-center gap-3 text-slate-400 font-bold text-xs hover:text-white transition-colors" aria-label="Email">
                  <Mail size={18} /> contacto@institutolael.cl
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-6">Síguenos</h4>
              <div className="flex justify-center md:justify-start gap-4">
                {NAVIGATION.social.map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-500 hover:bg-white hover:text-black hover:-translate-y-1 transition-all duration-300" aria-label={s.name}>
                    {React.isValidElement(s.icon) ? React.cloneElement(s.icon, { size: 18 }) : <s.icon size={18} />}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700">
            © {currentYear} Instituto Lael. Todos los derechos reservados.
          </div>
          
          <div className="flex gap-8">
            {NAVIGATION.footer.legal.map((link) => (
              <Link key={link.path} to={link.path} className="text-[9px] font-black uppercase tracking-widest text-slate-600 hover:text-slate-400 transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
