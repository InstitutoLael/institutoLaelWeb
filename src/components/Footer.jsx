import { Link } from "react-router-dom";
import {
    Instagram, Linkedin, Youtube, Mail, MapPin, Phone
} from "lucide-react";

import logo from "../assets/img/Logos/lael-inst-blanco.png";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative z-10 bg-[#020202] text-slate-400 border-t border-white/5 font-sans pt-16">

            {/* 
        GRID LAYOUT RESPONSIVE:
        - Mobile: grid-cols-1 (Todo vertical y centrado)
        - Tablet: grid-cols-2
        - Desktop: grid-cols-4 
      */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 text-center lg:text-left">

                {/* COLUMNA 1: MARCA */}
                <div className="flex flex-col items-center lg:items-start gap-5">
                    <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
                        <img src={logo} alt="Instituto Lael" className="h-10 w-auto" />
                    </Link>
                    <p className="text-sm leading-relaxed max-w-xs mx-auto lg:mx-0 opacity-80">
                        Transformamos el futuro a través de educación accesible, tecnológica y con valores.
                    </p>
                    <div className="flex gap-4 mt-2">
                        <SocialLink href="https://instagram.com/institutolael" icon={<Instagram size={20} />} label="Instagram" />
                        <SocialLink href="https://youtube.com/@institutolael" icon={<Youtube size={20} />} label="YouTube" />
                        <SocialLink href="https://linkedin.com/company/instituto-lael" icon={<Linkedin size={20} />} label="LinkedIn" />
                    </div>
                </div>

                {/* COLUMNA 2: PROGRAMAS */}
                <div className="flex flex-col gap-5">
                    <h4 className="text-white text-xs font-bold uppercase tracking-[0.15em]">Programas</h4>
                    <nav className="flex flex-col gap-3 text-sm">
                        <FooterLink to="/paes">Preuniversitario PAES</FooterLink>
                        <FooterLink to="/escuela-adultos">Escuela de Adultos (2x1)</FooterLink>
                        <FooterLink to="/idiomas">Cursos de Idiomas</FooterLink>
                        <FooterLink to="/lsch">Lengua de Señas Chilena</FooterLink>
                        <FooterLink to="/homeschool">Lael Academy (Homeschool)</FooterLink>
                    </nav>
                </div>

                {/* COLUMNA 3: INSTITUCIONAL */}
                <div className="flex flex-col gap-5">
                    <h4 className="text-white text-xs font-bold uppercase tracking-[0.15em]">Institución</h4>
                    <nav className="flex flex-col gap-3 text-sm">
                        <FooterLink to="/nosotros">Nuestra Historia</FooterLink>
                        <FooterLink to="/empresas">Servicios Empresas</FooterLink>
                        <FooterLink to="/convenios">Alianzas y Convenios</FooterLink>
                        <FooterLink to="/trabaja">Bolsa de Trabajo</FooterLink>
                        <FooterLink to="/contacto">Soporte y Ayuda</FooterLink>
                    </nav>
                </div>

                {/* COLUMNA 4: CONTACTO */}
                <div className="flex flex-col items-center lg:items-start gap-5">
                    <h4 className="text-white text-xs font-bold uppercase tracking-[0.15em]">Contacto</h4>

                    <a
                        href="https://wa.me/56964626568"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-5 py-3 rounded-xl font-bold border border-emerald-500/20 hover:bg-emerald-500 hover:text-black hover:scale-105 transition-all w-fit"
                    >
                        <Phone size={18} /> Chat WhatsApp
                    </a>

                    <div className="flex flex-col gap-2 text-sm">
                        <a href="mailto:contacto@institutolael.cl" className="hover:text-white transition-colors">
                            contacto@institutolael.cl
                        </a>
                        <span>San Joaquín, Región Metropolitana</span>
                    </div>
                </div>
            </div>

            {/* BARRA INFERIOR */}
            <div className="border-t border-white/5 py-8 bg-[#050505]">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
                    <p>© {currentYear} Instituto Lael SpA. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <Link to="/terminos" className="hover:text-zinc-400 transition-colors">Términos</Link>
                        <Link to="/privacidad" className="hover:text-zinc-400 transition-colors">Privacidad</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

/* --- COMPONENTES AUXILIARES --- */
function SocialLink({ href, icon, label }) {
    return (
        <a
            href={href} target="_blank" rel="noreferrer" aria-label={label}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:bg-white hover:text-black hover:-translate-y-1 transition-all"
        >
            {icon}
        </a>
    );
}

function FooterLink({ to, children }) {
    return (
        <Link to={to} className="hover:text-indigo-400 transition-colors">
            {children}
        </Link>
    );
}