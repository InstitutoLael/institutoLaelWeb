import {
    FaGraduationCap, FaGlobeAmericas, FaHandsHelping, FaBookReader, FaRocket,
    FaInstagram, FaYoutube, FaLinkedin, FaShieldAlt, FaBriefcase, FaUsers, FaInfoCircle
} from "react-icons/fa";

export const NAVIGATION = {
    main: [
        { name: "Inicio", path: "/" },
        { name: "PAES", path: "/paes" },
        { name: "Idiomas", path: "/idiomas" },
        { name: "Inclusión", path: "/lsch" },
        { name: "Nivelación", path: "/nivelacion" },
        { name: "Empresas", path: "/empresas" },
    ],
    
    // Categorized for Mobile Menu or MegaMenu
    categories: {
        academic: [
            { name: "Preu PAES", path: "/paes", icon: FaGraduationCap },
            { name: "Idiomas", path: "/idiomas", icon: FaGlobeAmericas },
            { name: "Signos (LSCh)", path: "/lsch", icon: FaHandsHelping },
            { name: "Nivelación Adultos", path: "/nivelacion", icon: FaBookReader },
            { name: "Homeschool", path: "/homeschool", icon: FaRocket },
            { name: "Catálogo", path: "/programas", icon: FaBookReader },
        ],
        institutional: [
            { name: "Sobre Nosotros", path: "/nosotros", icon: FaInfoCircle },
            { name: "Convenios", path: "/convenios", icon: FaShieldAlt },
            { name: "Trabaja con Nosotros", path: "/trabaja", icon: FaBriefcase },
            { name: "Cuerpo Docente", path: "/docentes", icon: FaUsers },
            { name: "Recursos", path: "/recursos", icon: FaBookReader },
        ],
        support: [
            { name: "Contacto", path: "/contacto" },
            { name: "Aula Virtual", path: "/aula" },
            { name: "Términos y Condiciones", path: "/terminos" },
            { name: "Privacidad", path: "/privacidad" }
        ]
    },

    footer: {
        programs: [
            { name: "Preu PAES", path: "/paes" },
            { name: "Idiomas", path: "/idiomas" },
            { name: "LSCh Inclusión", path: "/lsch" },
            { name: "Nivelación Estudios", path: "/nivelacion" },
            { name: "Project Homeschool", path: "/homeschool" },
        ],
        company: [
            { name: "Nosotros", path: "/nosotros" },
            { name: "Empresas", path: "/empresas" },
            { name: "Convenios", path: "/convenios" },
            { name: "Docentes", path: "/docentes" },
            { name: "Trabaja con nosotros", path: "/trabaja" },
        ],
        legal: [
            { name: "Términos y Condiciones", path: "/terminos" },
            { name: "Políticas de Privacidad", path: "/privacidad" },
            { name: "Soporte", path: "/contacto" },
        ]
    },

    social: [
        { name: "Instagram", url: "https://instagram.com/institutolael", icon: FaInstagram },
        { name: "YouTube", url: "https://www.youtube.com/channel/UCl0JuF0HlFpQEWPV_tIxV2g", icon: FaYoutube },
        { name: "LinkedIn", url: "https://linkedin.com/company/instituto-lael", icon: FaLinkedin },
    ],

    action: {
        aula: { name: "Aula Virtual", path: "/aula" },
        whatsapp: { url: "https://wa.me/56964626568", label: "WhatsApp Directo" }
    }
};
