import { FaBible, FaHeart, FaLightbulb, FaChalkboardTeacher, FaGraduationCap } from "react-icons/fa";
import { BsStars } from "react-icons/bs";

// === IMAGES ===
// (Ideally these should be in assets, using placeholders for now if not available)
// import diegoImg from "../assets/img/Equipo/diego.jpg";

export const ABOUT_DATA = {
    hero: {
        title: "Nacimos para los que el sistema ignoró",
        subtitle: "En 2021 comenzamos con un computador y convicción. Hoy somos el ecosistema educativo online que Chile necesitaba.",
        badge: "Since 2021"
    },
    origin: {
        title: "¿Por qué LAEL?",
        term: "Lael (לָאֵל)",
        definition: "Perteneciente a Dios",
        description: "Elegimos este nombre (Jeremías 33:3, Lucas 4:18) como declaración de propiedad: esta institución, talentos y alumnos tienen un propósito divino.",
        cards: [
            { icon: "FaChalkboardTeacher", title: "Pedagogía", desc: "Explicamos fácil lo difícil" },
            { icon: "FaLightbulb", title: "Mente", desc: "Pensamiento Crítico" },
            { icon: "FaGraduationCap", title: "Academia", desc: "Rigor Intelectual" }
        ]
    },
    founder: {
        name: "Diego Chaparro",
        role: "Fundador & Director",
        bio: "Comenzó enseñando matemáticas con una pizarra en una habitación y hoy potencia la visión educativa de toda la comunidad. Aunque estoy solo en la ejecución hoy, el diseño y la visión vienen directamente de Dios. Los números no son difíciles, solo están mal explicados.",
        quote: "Aquí nadie es un número, todos tienen un propósito.",
        tags: ["Santiago, Chile", "Matemáticas", "Fundador"]
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
        { year: "2021", title: "El Inicio", desc: "Nace como preuniversitario PAES 100% gratuito. Diego lo construye desde cero." },
        { year: "2022", title: "Peak", desc: "600 alumnos simultáneos. Expansión a idiomas: LSCh, Inglés, Coreano." },
        { year: "2023-25", title: "Inclusión", desc: "Fernanda Gaete se suma como profesora de LSCh y cultura sorda." },
        { year: "2026", title: "Relanzamiento", desc: "Estructura más sólida y enfoque en resultados estratégicos." }
    ]
};
