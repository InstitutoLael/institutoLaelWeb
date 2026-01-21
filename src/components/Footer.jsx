import { Link } from "react-router-dom";
import {
    Instagram, Linkedin, Youtube, Mail, MapPin, Phone
} from "lucide-react";

// Tu logo blanco
import logo from "../assets/img/Logos/lael-inst-blanco.png";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#050505] text-slate-400 font-sans border-t border-white/10 pt-20 text-sm relative z-10">

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-10 pb-16">

                {/* COLUMNA 1: MARCA Y MISIÓN */}
                <div className="flex flex-col gap-5 order-4 lg:order-1 border-t border-white/10 pt-8 lg:border-t-0 lg:pt-0">
                    <Link to="/" className="inline-block">
                        <img src={logo} alt="Instituto Lael" className="h-9 w-auto opacity-90" />
                    </Link>
                    <p className="leading-relaxed max-w-xs text-sm opacity-80">
                        Educación con propósito. Rompemos barreras académicas y geográficas
                        para que cumplas tus metas con tecnología y valores cristianos.
                    </p>
                    <div className="flex gap-2.5 mt-1.5">
                        <SocialLink href="https://instagram.com/institutolael" icon={<Instagram size={20} />} label="Instagram" />
                        <SocialLink href="https://youtube.com/@institutolael" icon={<Youtube size={20} />} label="YouTube" />
                        <SocialLink href="https://linkedin.com/company/instituto-lael" icon={<Linkedin size={20} />} label="LinkedIn" />
                    </div>
                </div>

                {/* COLUMNA 2: PROGRAMAS */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-slate-50 text-xs font-bold uppercase tracking-widest mb-2">Programas</h4>
                    <nav className="flex flex-col gap-3.5">
                        <Link to="/paes" className="hover:text-indigo-500 hover:pl-1 transition-all">Preu PAES 2026</Link>
                        <Link to="/escuela-adultos" className="hover:text-indigo-500 hover:pl-1 transition-all">Escuela 2x1</Link>
                        <Link to="/idiomas" className="hover:text-indigo-500 hover:pl-1 transition-all">Idiomas</Link>
                        <Link to="/lsch" className="hover:text-indigo-500 hover:pl-1 transition-all">Lengua de Señas</Link>
                        <Link to="/homeschool" className="hover:text-indigo-500 hover:pl-1 transition-all">Lael Academy</Link>
                    </nav>
                </div>

                {/* COLUMNA 3: INSTITUCIONAL */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-slate-50 text-xs font-bold uppercase tracking-widest mb-2">Institucional</h4>
                    <nav className="flex flex-col gap-3.5">
                        <Link to="/nosotros" className="hover:text-indigo-500 hover:pl-1 transition-all">Nuestra Historia</Link>
                        <Link to="/empresas" className="hover:text-indigo-500 hover:pl-1 transition-all">Capacitación Empresas</Link>
                        <Link to="/convenios" className="hover:text-indigo-500 hover:pl-1 transition-all">Alianzas</Link>
                        <Link to="/trabaja" className="hover:text-indigo-500 hover:pl-1 transition-all">Trabaja con Nosotros</Link>
                        <Link to="/contacto" className="hover:text-indigo-500 hover:pl-1 transition-all">Centro de Ayuda</Link>
                    </nav>
                </div>

                {/* COLUMNA 4: CONTACTO */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-slate-50 text-xs font-bold uppercase tracking-widest mb-0">Contacto</h4>
                    <p className="text-sm opacity-70 m-0">Atención L-V de 9:00 a 19:00 hrs.</p>

                    <a
                        href="https://wa.me/56964626568"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2.5 justify-center bg-emerald-500/10 text-emerald-400 px-5 py-3 rounded-lg font-semibold border border-emerald-500/20 transition hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:-translate-y-0.5"
                    >
                        <Phone size={18} /> Hablar por WhatsApp
                    </a>

                    <div className="flex flex-col gap-3 text-sm mt-1.5">
                        <a href="mailto:contacto@institutolael.cl" className="flex items-center gap-2.5 hover:text-white transition-colors">
                            <Mail size={16} className="text-indigo-500 opacity-80" /> contacto@institutolael.cl
                        </a>
                        <span className="flex items-center gap-2.5">
                            <MapPin size={16} className="text-indigo-500 opacity-80" /> San Joaquín, RM (Oficina)
                        </span>
                    </div>

                    <div className="text-xs text-zinc-600 border border-zinc-800 px-2 py-1 rounded w-fit mt-2">
                        RUT: 78.084.019-6
                    </div>
                </div>

            </div>

            {/* BARRA INFERIOR (LEGAL) */}
            <div className="border-t border-white/10 py-6 bg-[#020202]">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center flex-wrap gap-4 text-center sm:text-left">
                    <p className="m-0 text-xs text-zinc-500">© {currentYear} Instituto Lael SpA.</p>
                    <div className="flex gap-4 items-center text-xs text-zinc-500">
                        <Link to="/terminos" className="hover:text-slate-300 transition-colors">Términos</Link>
                        <span className="text-zinc-800">•</span>
                        <Link to="/privacidad" className="hover:text-slate-300 transition-colors">Privacidad</Link>
                    </div>
                </div>
            </div>

        </footer>
    );
}

/* --- SUBCOMPONENTE SOCIAL --- */
function SocialLink({ href, icon, label }) {
    return (
        <a href={href} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition-all hover:bg-indigo-600 hover:border-indigo-600 hover:text-white hover:-translate-y-1" aria-label={label}>
            {icon}
        </a>
    );
}