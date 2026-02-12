import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const routeNameMap = {
  "paes": "Preuniversitario PAES",
  "idiomas": "Idiomas",
  "lsch": "Inclusión LSCh",
  "homeschool": "Lael Academy",
  "nivelacion": "Escuela para Adultos",
  "empresas": "Capacitación Empresas",
  "nosotros": "Sobre Nosotros",
  "convenios": "Convenios",
  "trabaja": "Trabaja con Nosotros",
  "contacto": "Contacto & Soporte",
  "docentes": "Cuerpo Docente",
  "aula": "Aula Virtual",
  "login": "Acceso",
  "terminos": "Términos y Condiciones",
  "privacidad": "Política de Privacidad",
  "programas": "Catálogo Completo",
  "recursos": "Recursos Educativos",
  "checkout": "Pago de Matrícula"
};

export default function Breadcrumbs({ className }) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show on home page
  if (pathnames.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs md:text-sm font-medium text-slate-500 mb-6 ${className}`}>
      <ol className="flex items-center gap-2">
        <li>
          <Link to="/" className="flex items-center gap-1 hover:text-indigo-400 transition-colors">
            <Home size={14} />
            <span className="sr-only">Inicio</span>
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const name = routeNameMap[value.toLowerCase()] || value.charAt(0).toUpperCase() + value.slice(1);

          return (
            <li key={to} className="flex items-center gap-2">
              <ChevronRight size={12} className="text-slate-600" />
              {isLast ? (
                <span className="text-white font-bold" aria-current="page">
                  {name}
                </span>
              ) : (
                <Link to={to} className="hover:text-indigo-400 transition-colors">
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
