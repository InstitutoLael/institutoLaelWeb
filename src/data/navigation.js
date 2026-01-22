import { routesMap } from "./routesMap";
import {
    FaGraduationCap, FaGlobeAmericas, FaHandsHelping, FaBookReader, FaRocket,
    FaInstagram, FaYoutube, FaLinkedin
} from "react-icons/fa";

// UI Metadata for styling the menu
const UI_META = {
    "/paes": { icon: "FaGraduationCap", color: "text-cyan-400" },
    "/aula": { icon: "FaBookReader", color: "text-blue-400" },
    "/homeschool": { icon: "FaRocket", color: "text-rose-400" },
    "/idiomas": { icon: "FaGlobeAmericas", color: "text-emerald-400" },
    "/lsch": { icon: "FaHandsHelping", color: "text-purple-400" },
    "/escuela-adultos": { icon: "FaBookReader", color: "text-amber-400" },
    "/empresas": { icon: "FaRocket", color: "text-slate-400" }
};

// Categorize routes for MegaMenu
const categorizedMenu = {};
routesMap.forEach(item => {
    // Skip if not in UI_META (safety) or explicit exclusions
    if (!categorizedMenu[item.category]) {
        categorizedMenu[item.category] = [];
    }
    categorizedMenu[item.category].push({
        ...item,
        ...UI_META[item.path]
    });
});

export const NAVIGATION = {
    main: [
        { name: "Inicio", path: "/" },
        { name: "Recursos", path: "/recursos" },
        { name: "Empresas", path: "/empresas" },
        { name: "Nosotros", path: "/nosotros" },
    ],
    // Hierarchical MegaMenu
    megaMenu: categorizedMenu,

    footer: {
        programs: routesMap.map(r => ({ name: r.title, path: r.path })), // All programs
        institution: [
            { name: "Nuestra Historia", path: "/nosotros" },
            { name: "Servicios Empresas", path: "/empresas" },
            { name: "Alianzas y Convenios", path: "/convenios" },
            { name: "Bolsa de Trabajo", path: "/trabaja" },
            { name: "Soporte y Ayuda", path: "/contacto" },
        ],
        legal: [
            { name: "Términos", path: "/terminos" },
            { name: "Privacidad", path: "/privacidad" },
        ]
    },

    social: [
        { name: "Instagram", url: "https://instagram.com/institutolael", icon: FaInstagram },
        { name: "YouTube", url: "https://youtube.com/@institutolael", icon: FaYoutube },
        { name: "LinkedIn", url: "https://linkedin.com/company/instituto-lael", icon: FaLinkedin },
    ],

    action: {
        aula: { name: "Aula Virtual", path: "/aula" },
        whatsapp: { url: "https://wa.me/56964626568", label: "Consultas" }
    }
};
