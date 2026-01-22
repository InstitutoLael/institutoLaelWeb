export const routesMap = [
    // --- ESCOLAR ---
    {
        title: "Preuniversitario PAES",
        path: "/paes",
        category: "Escolar",
        img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
        desc: "Maximiza tu puntaje con IA y tutores expertos."
    },
    {
        title: "Homeschool",
        path: "/homeschool",
        category: "Escolar",
        img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
        desc: "Educación alternativa y preparación de exámenes libres."
    },

    // --- IDIOMAS ---
    {
        title: "Academia de Idiomas",
        path: "/idiomas",
        category: "Idiomas",
        img: "https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?auto=format&fit=crop&q=80&w=800",
        desc: "Domina el inglés con certificación internacional."
    },
    {
        title: "Lengua de Señas (LSCh)",
        path: "/lsch",
        category: "Idiomas",
        img: "https://images.unsplash.com/photo-1520174691701-bc555a30047a?auto=format&fit=crop&q=80&w=800",
        desc: "Conecta con la cultura sorda e inclusión real."
    },

    // --- ADULTOS / EMPRESAS ---
    {
        title: "Escuela de Adultos (2x1)",
        path: "/escuela-adultos",
        category: "Adultos",
        img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800",
        desc: "Termina tu 4to medio con horarios flexibles."
    },
    {
        title: "Capacitación Empresas",
        path: "/empresas",
        category: "Empresas",
        img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
        desc: "Capacitación corporativa y habilidades blandas."
    }
];

export const getRoutesByCategory = () => {
    const categories = {};
    routesMap.forEach(route => {
        if (!categories[route.category]) {
            categories[route.category] = [];
        }
        categories[route.category].push(route);
    });
    return categories;
};
