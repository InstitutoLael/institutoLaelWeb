/* 
  RECURSOS Y TIENDA DIGITAL
  Aquí se definen los productos para venta directa (on_demand) y afiliados (affiliates).
*/

export const RESOURCES = {
    // Categoría 1: Clases On-Demand (Productos propios)
    on_demand: [
        {
            id: "pack-quimica-2025",
            title: "Pack Química M1 + M2 (2025)",
            price: "$19.990",
            description: "Acceso inmediato a más de 50 clases intensivas. Domina Eje y Electivo a tu ritmo. Incluye repasos y ejercicios.",
            image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800", // ref_quimica
            buyLink: "#",
            features: ["50+ Clases Grabadas", "Eje y Electivo", "Material PDF", "Soporte Dudas"],
            tag: "Más Vendido"
        }
    ],

    // Categoría 2: Kit del Estudiante (Afiliados / Recomendados)
    affiliates: [
        {
            id: "calc-casio",
            title: "Casio fx-570",
            description: "La fiel compañera para Cálculo y Física. No entres a ingeniería sin ella.",
            price: "Ver Oferta",
            image: "https://images.unsplash.com/photo-1587145820266-a5951eebebb1?auto=format&fit=crop&q=80&w=800",
            affiliateLink: "https://www.amazon.com/s?k=Casio+fx-570",
            store: "Amazon"
        },
        {
            id: "tablet-samsung-ipad",
            title: "iPad / Tablet Samsung",
            description: "Para tomar apuntes digitales y no perder hojas nunca más.",
            price: "Ver Oferta",
            image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800",
            affiliateLink: "https://www.amazon.com/s?k=iPad+Samsung+Tablet",
            store: "Amazon"
        },
        {
            id: "audifonos-nc",
            title: "Audífonos NC",
            description: "Indispensables para estudiar en la biblioteca o en el metro.",
            price: "Ver Oferta",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
            affiliateLink: "https://www.amazon.com/s?k=Noise+Cancelling+Headphones",
            store: "Amazon"
        },
        {
            id: "planner",
            title: "Planner Semanal",
            description: "La organización es el 50% del éxito académico.",
            price: "Ver Oferta",
            image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&q=80&w=800",
            affiliateLink: "https://www.amazon.com/s?k=Academic+Planner",
            store: "Amazon"
        }
    ]
};
