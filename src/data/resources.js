/* 
  RECURSOS Y TIENDA DIGITAL
  Aquí se definen los productos para venta directa (on_demand - Grabaciones) y afiliados (recomended).
*/

export const RESOURCES = {
    // Categoría 1: Clases On-Demand (Productos propios - GRABACIONES)
    on_demand: [
        {
            id: "pack-quimica-2025",
            title: "Pack Química M1 + M2",
            price: "$19.990",
            description: "Acceso inmediato a más de 50 clases intensivas. Domina Eje y Electivo a tu ritmo. Incluye repasos y ejercicios.",
            image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
            buyLink: "https://wa.me/56964626568?text=Hola, me interesa el Pack de Grabaciones de Química.",
            features: ["50+ Clases Grabadas", "Eje y Electivo", "Material PDF", "Soporte Dudas"],
            tag: "Más Vendido"
        },
        {
            id: "pack-matematicas-2025",
            title: "Masterclass Matemáticas M1",
            price: "$14.990",
            description: "Todo el temario de M1 resumido en 10 masterclasses de alto impacto. Estrategias reales para la PAES.",
            image: "https://images.unsplash.com/photo-1509228468518-180dd482180c?auto=format&fit=crop&q=80&w=800",
            buyLink: "https://wa.me/56964626568?text=Hola, me interesa el Pack de Matemáticas M1.",
            features: ["10 Masterclasses", "Estrategias PAES", "Ensayos Incluidos"],
            tag: "Flash Sale"
        },
        {
            id: "pack-biologia-2025",
            title: "Pack Biología Intensivo",
            price: "$19.990",
            description: "Desde células hasta ecosistemas. Clases grabadas con pizarras digitales de alta resolución.",
            image: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=800",
            buyLink: "https://wa.me/56964626568?text=Hola, me interesa el Pack de Biología.",
            features: ["45+ Clases", "Guías de Estudio", "Simulacros"],
            tag: "Nuevo"
        }
    ],

    // Categoría 2: Kit del Estudiante (Recomendados)
    recomended: [
        {
            id: "calc-casio",
            title: "Casio fx-570",
            description: "La fiel compañera para Cálculo y Física.",
            image: "https://images.unsplash.com/photo-1583529362239-514c072e036e?auto=format&fit=crop&q=80&w=800",
            link: "https://www.amazon.com/s?k=Casio+fx-570",
            store: "Amazon"
        },
        {
            id: "tablet",
            title: "Tablet para Apuntes",
            description: "Indispensable para digitalizar tu estudio.",
            image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800",
            link: "https://www.amazon.com/s?k=iPad+Samsung+Tablet",
            store: "Amazon"
        }
    ]
};
