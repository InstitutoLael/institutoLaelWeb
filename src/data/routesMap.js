export const routesMap = [
    // --- ESCOLAR ---
    {
        title: "Preuniversitario PAES",
        path: "/paes",
        category: "Escolar",
        img: "ref_paes",
        desc: "Maximiza tu puntaje con IA y tutores expertos."
    },
    {
        title: "Nivelación Académica",
        path: "/escuela-adultos",
        category: "Escolar",
        img: "ref_aula",
        desc: "Refuerzo escolar personalizado para 1° a 4° medio."
    },
    {
        title: "Homeschool",
        path: "/homeschool",
        category: "Escolar",
        img: "ref_homeschool",
        desc: "Educación alternativa y preparación de exámenes libres."
    },

    // --- IDIOMAS ---
    {
        title: "Academia de Idiomas",
        path: "/idiomas",
        category: "Idiomas",
        img: "ref_english",
        desc: "Domina el inglés con certificación internacional."
    },
    {
        title: "Lengua de Señas (LSCh)",
        path: "/lsch",
        category: "Idiomas",
        img: "ref_lsch",
        desc: "Conecta con la cultura sorda e inclusión real."
    },

    // --- ADULTOS / EMPRESAS ---
    {
        title: "Escuela de Adultos (2x1)",
        path: "/escuela-adultos",
        category: "Adultos",
        img: "ref_adultos",
        desc: "Termina tu 4to medio con horarios flexibles."
    },
    {
        title: "Capacitación Empresas",
        path: "/empresas",
        category: "Empresas",
        img: "ref_empresas",
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
