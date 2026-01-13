import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // 1. Cargar datos guardados (si existen) o iniciar vacío
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("lael_cart_v1");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      return [];
    }
  });

  // 2. Guardar automáticamente cada cambio en la memoria del navegador
  useEffect(() => {
    localStorage.setItem("lael_cart_v1", JSON.stringify(cart));
  }, [cart]);

  // --- FUNCIONES (La Lógica del Negocio) ---

  // Agregar un curso (evita duplicados)
  const addToCart = (product) => {
    setCart((prevCart) => {
      // ¿Ya existe este curso en el carrito?
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) return prevCart; // Si ya está, no hace nada (no vendemos 2 veces el mismo curso al mismo alumno)
      
      return [...prevCart, product];
    });
  };

  // Eliminar un curso
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Vaciar carrito (usar después de pagar)
  const clearCart = () => {
    setCart([]);
  };

  // Calcular total automáticamente
  const cartTotal = cart.reduce((total, item) => {
    // Limpiamos el precio (quitamos signos $ y puntos para sumar matemáticamente)
    const priceNumber = parseInt(item.price.replace(/\D/g, ""), 10) || 0;
    return total + priceNumber;
  }, 0);

  // Formateador de moneda (Para mostrar $150.000 bonito)
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

// Hook personalizado para usar el carrito en cualquier lado fácil
export const useCart = () => useContext(CartContext);