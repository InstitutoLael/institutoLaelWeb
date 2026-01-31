import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* MARCA */}
          <div className="space-y-6 text-center md:text-left">
            <Link to="/" className="text-2xl font-black tracking-tighter text-white">
              INSTITUTO <span className="text-indigo-500">LAEL</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs font-medium italic">
              "Perteneciente a un propósito mayor"
            </p>
          </div>

          {/* EXPLORA */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-6">Explora</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/paes" className="hover:text-indigo-400 transition-colors">Preu PAES</Link></li>
              <li><Link to="/idiomas" className="hover:text-indigo-400 transition-colors">Idiomas</Link></li>
              <li><Link to="/lsch" className="hover:text-indigo-400 transition-colors">Lesch (Inclusión)</Link></li>
              <li><Link to="/nivelacion" className="hover:text-indigo-400 transition-colors">Nivelación de Estudios</Link></li>
            </ul>
          </div>

          {/* INSTITUCIONAL */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-6">Institución</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/nosotros" className="hover:text-indigo-400 transition-colors">Nosotros</Link></li>
              <li><Link to="/empresas" className="hover:text-indigo-400 transition-colors">Empresas</Link></li>
              <li><Link to="/contacto" className="hover:text-indigo-400 transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start gap-6">
            <h4 className="text-white font-black uppercase tracking-widest text-[10px]">Síguenos</h4>
            <div className="flex gap-4">
               <a href="https://instagram.com/institutolael" target="_blank" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                  <FaInstagram size={18} />
               </a>
               <a href="https://wa.me/56964626568" target="_blank" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-emerald-500 hover:text-black transition-all">
                  <FaWhatsapp size={18} />
               </a>
               <a href="mailto:contacto@institutolael.cl" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-indigo-500 transition-all">
                  <FaEnvelope size={18} />
               </a>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="pt-10 border-t border-white/5 text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
          © {currentYear} Instituto Lael. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
