/* 
  RECURSOS Y TIENDA DIGITAL
  Aquí se definen los productos para venta directa (on_demand) y afiliados (affiliates).
*/

export const RESOURCES = {
    // Categoría 1: Clases On-Demand (Productos propios)
    on_demand: [
        {
            id: "pack-mate-m1",
            title: "Pack Intensivo PAES M1",
            price: "$19.990",
            description: "5 Clases grabadas enfocadas en Ejes de Números y Álgebra con material PDF incluido.",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
            buyLink: "#", // Link a pasarela de pago (Stripe/Revue/etc)
            features: ["5 Horas de Video", "PDF de Ejercicios", "Acceso de por vida"]
        },
        {
            id: "pack-lenguaje",
            title: "Masterclass Comprensión Lectora",
            price: "$14.990",
            description: "Aprende a identificar la idea principal y el tono del autor en textos complejos.",
            image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800",
            buyLink: "#",
            features: ["Técnicas de Lectura", "Guía Práctica", "Video 4K"]
        }
    ],

    // Categoría 2: Kit del Estudiante (Afiliados / Recomendados)
    affiliates: [
        {
            id: "kit-ipad",
            title: "iPad 10.9 (Recomendado)",
            description: "La mejor tablet para estudiantes. Ideal para tomar apuntes digitales y ver clases.",
            price: "Ver Oferta",
            image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800",
            affiliateLink: "https://amazon.com", // Link de afiliado
            store: "Amazon"
        },
        {
            id: "kit-audifonos",
            title: "Sony WH-1000XM5",
            description: "Cancelación de ruido líder en la industria para estudiar sin distracciones.",
            price: "Ver Oferta",
            image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800",
            affiliateLink: "https://amazon.com",
            store: "Amazon"
        },
        {
            id: "kit-planner",
            title: "Planner Académico 2025",
            description: "Organiza tu estudio semanal con este planner físico de alta calidad.",
            price: "Ver Oferta",
            image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&q=80&w=800",
            affiliateLink: "https://amazon.com",
            store: "Tienda Partner"
        }
    ]
};
