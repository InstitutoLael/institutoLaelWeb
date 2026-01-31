import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaWhatsapp } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Nosotros", path: "/nosotros" },
    { name: "Preu PAES", path: "/paes" },
    { name: "Idiomas", path: "/idiomas" },
    { name: "Inclusión", path: "/lsch" },
    { name: "Nivelación", path: "/nivelacion" },
    { name: "Empresas", path: "/empresas" },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="text-2xl font-black tracking-tighter text-white">
          INSTITUTO <span className="text-indigo-500">LAEL</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-xs font-black uppercase tracking-widest transition-colors ${
                  isActive ? "text-indigo-400" : "text-slate-300 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Link
            to="/contacto"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-widest rounded-full transition-all shadow-lg shadow-indigo-600/20"
          >
            Contacto
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button 
          className="lg:hidden text-white p-2"
          onClick={() => setIsOpen(true)}
        >
          <FaBars size={24} />
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-slate-950 z-[100] flex flex-col p-10 lg:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-black text-white">LAEL</span>
              <button onClick={() => setIsOpen(false)} className="text-white p-2">
                <FaTimes size={30} />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-3xl font-black uppercase tracking-tighter transition-colors ${
                      isActive ? "text-indigo-500" : "text-white"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <Link
                to="/contacto"
                className="mt-4 p-6 bg-indigo-600 text-white text-center font-black uppercase tracking-widest rounded-2xl shadow-xl"
              >
                Contacto
              </Link>
            </div>

            <div className="mt-auto pt-10 border-t border-white/10 flex justify-center gap-6">
               <a href="https://wa.me/56964626568" className="text-emerald-500 flex items-center gap-2 font-black uppercase tracking-widest text-[10px]">
                  <FaWhatsapp size={18} /> WhatsApp Directo
               </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
