import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // 1. INICIALIZACIÓN INTELIGENTE
  // Intentamos leer del localStorage para recuperar el carrito si el usuario vuelve
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("lael_cart_storage");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      return [];
    }
  });

  // 2. GUARDADO AUTOMÁTICO
  // Cada vez que el carrito cambie, lo guardamos en el navegador
  useEffect(() => {
    localStorage.setItem("lael_cart_storage", JSON.stringify(cart));
  }, [cart]);

  // --- FUNCIONES ---

  // Agregar curso (Evita duplicados)
  const addToCart = (product) => {
    setCart((prev) => {
      // Si ya existe el ID, no lo agregamos de nuevo
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  // Eliminar curso
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Limpiar todo (post-compra)
  const clearCart = () => setCart([]);

  // Calcular Total (Convierte "$150.000" a numero 150000)
  const cartTotal = cart.reduce((acc, item) => {
    const priceNum = parseInt(item.price.toString().replace(/\D/g, ""), 10) || 0;
    return acc + priceNum;
  }, 0);

  // Formateador de moneda (Helper visual)
  const formatPrice = (amount) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(amount);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      cartTotal, 
      formatPrice 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);