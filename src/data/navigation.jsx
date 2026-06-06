// src/data/navigation.jsx
import {
    GraduationCap, Globe, HandHeart, BookOpen, Rocket,
    Instagram, Youtube, Linkedin, Shield, Briefcase, Users, Info,
    Phone, MessageCircle
} from "lucide-react";

// TikTok no está en Lucide — SVG inline
const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.89a8.27 8.27 0 0 0 4.83 1.55V7.01a4.85 4.85 0 0 1-1.06-.32z"/>
  </svg>
);

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
        { name: "TikTok", url: "https://tiktok.com/@institutolael", icon: <TikTokIcon /> },
    ],

    action: {
        whatsapp: {
            url: "https://wa.me/56964626568?text=Hola,%20quiero%20saber%20más%20sobre%20Instituto%20Lael",
            label: "Consultar ahora"
        }
    }
};
