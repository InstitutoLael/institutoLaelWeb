// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // 1. Estado del Carrito (Productos)
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("lael_cart_storage");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) { return []; }
  });

  // 2. Estado de Visibilidad (Abrir/Cerrar la ventanita lateral)
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // Guardar en localStorage cada vez que cambia el carrito
  useEffect(() => {
    localStorage.setItem("lael_cart_storage", JSON.stringify(cart));
  }, [cart]);

  // LÓGICA DE AGREGADO
  const addToCart = (product) => {
    setCart((prev) => {
      // Si el producto ya existe (por ID), lo actualizamos en vez de duplicarlo
      const existingIndex = prev.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex] = product;
        return newCart;
      }
      return [...prev, product];
    });
    // ¡Truco UX! Abrimos el carrito automáticamente al agregar algo
    openCart();
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // Cálculo de Total (Asumiendo que price siempre es Number)
  const cartTotal = cart.reduce((acc, item) => acc + (item.price || 0), 0);

  // Formateador de moneda (CLP)
  const formatPrice = (amount) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency", currency: "CLP", maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      cartTotal, 
      formatPrice,
      // Nuevos exportados para controlar la ventana
      isCartOpen,
      openCart,
      closeCart,
      toggleCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);