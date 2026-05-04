// src/data/navigation.js
import {
    GraduationCap, Globe, HandHeart, BookOpen, Rocket,
    Instagram, Youtube, Linkedin, Shield, Briefcase, Users, Info,
    Phone, MessageCircle
} from "lucide-react";

export const NAVIGATION = {
    main: [
        { name: "PAES", path: "/paes" },
        { name: "Idiomas", path: "/idiomas" },
        { name: "Diagnóstico", path: "/diagnostico" },
        { name: "El Sistema", path: "/sistema" },
        { name: "Adultos", path: "/adultos" },
    ],
    
    // Categorized for Mobile Menu or MegaMenu
    categories: {
        academic: [
            { name: "Preu PAES", path: "/paes", icon: <GraduationCap size={20} /> },
            { name: "Idiomas", path: "/idiomas", icon: <Globe size={20} /> },
            { name: "Signos (LSCh)", path: "/lsch", icon: <HandHeart size={20} /> },
            { name: "Nivelación Adultos", path: "/adultos", icon: <Users size={20} /> },
            // { name: "Homeschool", path: "/homeschool", icon: <Rocket size={20} /> },
        ],
        institutional: [
            { name: "El Sistema Lael", path: "/sistema", icon: <Rocket size={20} /> },
            { name: "Sobre Nosotros", path: "/nosotros", icon: <Info size={20} /> },
            { name: "Cuerpo Docente", path: "/docentes", icon: <Users size={20} /> },
            { name: "Empresas", path: "/empresas", icon: <Briefcase size={20} /> },
        ],
        support: [
            { name: "Contacto", path: "/contacto", icon: <MessageCircle size={20} /> },
            { name: "Aula Virtual", path: "/aula", icon: <Users size={20} /> },
            { name: "Términos y Condiciones", path: "/terminos", icon: <Shield size={20} /> },
            { name: "Privacidad", path: "/privacidad", icon: <Shield size={20} /> }
        ]
    },

    footer: {
        programs: [
            { name: "Preu PAES", path: "/paes" },
            { name: "Idiomas", path: "/idiomas" },
            { name: "LSCh Inclusión", path: "/lsch" },
            { name: "Nivelación Adultos", path: "/adultos" },
        ],
        company: [
            { name: "El Sistema Lael", path: "/sistema" },
            { name: "Nosotros", path: "/nosotros" },
            { name: "Empresas", path: "/empresas" },
            { name: "Docentes", path: "/docentes" },
        ],
        legal: [
            { name: "Términos y Condiciones", path: "/terminos" },
            { name: "Políticas de Privacidad", path: "/privacidad" },
            { name: "Soporte", path: "/contacto" },
        ]
    },

    social: [
        { name: "Instagram", url: "https://instagram.com/institutolael", icon: <Instagram size={20} /> },
        { name: "YouTube", url: "https://www.youtube.com/channel/UCl0JuF0HlFpQEWPV_tIxV2g", icon: <Youtube size={20} /> },
        { name: "LinkedIn", url: "https://linkedin.com/company/instituto-lael", icon: <Linkedin size={20} /> },
    ],

    action: {
        aula: { name: "Aula Virtual", path: "/aula" },
        whatsapp: {
            url: "https://wa.me/56964626568?text=Hola%2C%20quiero%20realizar%20mi%20diagn%C3%B3stico%20inicial%20Lael.",
            label: "Diagnóstico Táctico"
        }
    }
};
