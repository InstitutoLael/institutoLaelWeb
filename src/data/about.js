import { FaBible, FaHeart, FaLightbulb, FaChalkboardTeacher, FaGraduationCap } from "react-icons/fa";
import { BsStars } from "react-icons/bs";

// === IMAGES ===
// (Ideally these should be in assets, using placeholders for now if not available)
// import diegoImg from "../assets/img/Equipo/diego.jpg";

export const ABOUT_DATA = {
    hero: {
        title: "Educar es Trascender",
        subtitle: "Nacimos en 2020 con un propósito claro: desafiar el estándar educativo uniendo excelencia académica y principios eternos.",
        badge: "Since 2020"
    },
    origin: {
        title: "¿Por qué LAEL?",
        term: "Lael (לָאֵל)",
        definition: "Perteneciente a Dios",
        description: "Elegimos este nombre (Números 3:24) como declaración de propiedad: esta institución, talentos y alumnos tienen un propósito divino.",
        cards: [
            { icon: "FaChalkboardTeacher", title: "Pedagogía", desc: "Explicamos fácil lo difícil" },
            { icon: "FaLightbulb", title: "Mente", desc: "Pensamiento Crítico" },
            { icon: "FaGraduationCap", title: "Academia", desc: "Rigor Intelectual" }
        ]
    },
    founder: {
        name: "Diego Chaparro",
        role: "Fundador & Director",
        bio: "Comenzó enseñando matemáticas con una pizarra en una habitación y hoy potencia la visión educativa de toda la comunidad. Cree firmemente que los números no son difíciles, solo están mal explicados.",
        quote: "Aquí nadie es un número, todos tienen un propósito.",
        tags: ["Educación", "Matemáticas", "Visión 2026"]
    },
    values: [
        {
            id: "biblical",
            title: "Cosmovisión Bíblica",
            desc: "No separamos la fe del intelecto. Creemos que toda verdad es verdad de Dios.",
            iconName: "FaBible"
        },
        {
            id: "excellence",
            title: "Excelencia",
            desc: "Hacemos todo como para el Señor. La mediocridad no tiene lugar en nuestra aula.",
            iconName: "BsStars"
        },
        {
            id: "mentoring",
            title: "Mentoring",
            desc: "Más que profesores, somos mentores. Nos importa el carácter tanto como la nota.",
            iconName: "FaHeart"
        }
    ],
    timeline: [
        { year: "2020", title: "El Inicio", desc: "Clases particulares en una habitación pequeña." },
        { year: "2022", title: "Expansión", desc: "Nace la plataforma online y primeros cursos grupales." },
        { year: "2024", title: "Consolidación", desc: "+500 alumnos y apertura de Escuela de Idiomas." },
        { year: "2026", title: "Futuro", desc: "Nueva sede digital y alianzas internacionales." }
    ]
};
