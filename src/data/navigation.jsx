// src/data/navigation.jsx
import {
    GraduationCap, Globe, HandHeart, BookOpen, Rocket,
    Instagram, Youtube, Linkedin, Shield, Briefcase, Users, Info,
    Phone, MessageCircle
} from "lucide-react";

export const NAVIGATION = {
    main: [
        { name: "Inicio", path: "/" },
        { name: "PAES", path: "/paes", badge: "GRATIS" },
        { name: "Idiomas", path: "/idiomas" },
        { name: "LSCh", path: "/lsch" },
        { name: "Nosotros", path: "/nosotros" },
        { name: "Contacto", path: "/contacto" },
    ],
    
    footer: {
        programs: [
            { name: "PAES Gratuita", path: "/paes" },
            { name: "Idiomas", path: "/idiomas" },
            { name: "LSCh Inclusión", path: "/lsch" },
        ],
        company: [
            { name: "Inicio", path: "/" },
            { name: "Sobre Nosotros", path: "/nosotros" },
            { name: "Contacto", path: "/contacto" },
        ],
        legal: [
            { name: "Transparencia", path: "/transparencia" },
            { name: "Preguntas", path: "/preguntas" },
        ]
    },

    social: [
        { name: "Instagram", url: "https://instagram.com/institutolael", icon: <Instagram size={18} /> },
    ],

    action: {
        whatsapp: {
            url: "https://wa.me/56964626568?text=Hola,%20quiero%20saber%20más%20sobre%20Instituto%20Lael",
            label: "Consultar ahora"
        }
    }
};
