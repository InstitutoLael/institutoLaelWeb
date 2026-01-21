/* 
  CENTRAL DE NAVEGACIÓN
  Aquí se definen los enlaces del Navbar y Footer.
*/
import {
    FaGraduationCap, FaGlobeAmericas, FaHandsHelping, FaBookReader, FaRocket,
    FaInstagram, FaYoutube, FaLinkedin, FaWhatsapp
} from "react-icons/fa";

export const NAVIGATION = {
    // Enlaces principales del Navbar
    main: [
        { name: "Inicio", path: "/" },
        // "Programas" es un dropdown, se define abajo en 'megaMenu'
        { name: "Empresas", path: "/empresas" },
        { name: "Nosotros", path: "/nosotros" },
    ],

    // Dropdown "Programas"
    megaMenu: [
        {
            title: "Preu PAES",
            path: "/paes",
            icon: "FaGraduationCap", // String identifier for icon mapping if needed, or simple ID
            color: "text-cyan-400"
        },
        {
            title: "Idiomas",
            path: "/idiomas",
            icon: "FaGlobeAmericas",
            color: "text-emerald-400"
        },
        {
            title: "Lengua de Señas",
            path: "/lsch",
            icon: "FaHandsHelping",
            color: "text-purple-400"
        },
        {
            title: "Escuela Adultos",
            path: "/escuela-adultos",
            icon: "FaBookReader",
            color: "text-amber-400"
        },
        {
            title: "Lael Academy",
            path: "/homeschool",
            icon: "FaRocket",
            color: "text-rose-400"
        },
    ],

    // Footer Columnas
    footer: {
        programs: [
            { name: "Preuniversitario PAES", path: "/paes" },
            { name: "Escuela de Adultos (2x1)", path: "/escuela-adultos" },
            { name: "Cursos de Idiomas", path: "/idiomas" },
            { name: "Lengua de Señas Chilena", path: "/lsch" },
            { name: "Lael Academy (Homeschool)", path: "/homeschool" },
        ],
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

    // Redes Sociales
    social: [
        { name: "Instagram", url: "https://instagram.com/institutolael", icon: FaInstagram },
        { name: "YouTube", url: "https://youtube.com/@institutolael", icon: FaYoutube },
        { name: "LinkedIn", url: "https://linkedin.com/company/instituto-lael", icon: FaLinkedin },
    ],

    action: {
        enroll: { name: "Inscripción", path: "/inscripcion" },
        aula: { name: "Aula Virtual", path: "/aula" },
        whatsapp: { url: "https://wa.me/56964626568", label: "Chat WhatsApp" }
    }
};
