// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("lael_cart_storage");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) { return []; }
  });

  useEffect(() => {
    localStorage.setItem("lael_cart_storage", JSON.stringify(cart));
  }, [cart]);

  // AGREGAR: Ahora esperamos que 'product' ya traiga el precio como NÚMERO
  const addToCart = (product) => {
    setCart((prev) => {
      // Si el producto ya está, lo reemplazamos (por si el usuario cambió de plan/ramos)
      const existingIndex = prev.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex] = product;
        return newCart;
      }
      return [...prev, product];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // TOTAL: Mucho más simple si el precio ya es un número
  const cartTotal = cart.reduce((acc, item) => acc + (item.price || 0), 0);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency", currency: "CLP", maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal, formatPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);