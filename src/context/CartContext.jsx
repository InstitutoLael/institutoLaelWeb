import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  // Intentamos leer si ya había algo guardado en el navegador (LocalStorage)
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("lael_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Guardamos en el navegador cada vez que cambia el carrito
  useEffect(() => {
    localStorage.setItem("lael_cart", JSON.stringify(cart));
  }, [cart]);

  // Función para agregar curso
  const addToCart = (item) => {
    // item debe tener: { id, nombre, precio, tipo }
    setCart((prev) => [...prev, item]);
    // Opcional: Podrías validar si ya existe para no duplicar
  };

  // Función para borrar curso
  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // Calcular total mensualidad
  const totalMensual = cart.reduce((acc, item) => acc + (item.precio || 0), 0);
  
  // Calcular matrícula (Ej: cobramos matrícula solo una vez si hay items)
  const valorMatricula = cart.length > 0 ? 40000 : 0; 
  
  const totalPagar = totalMensual + valorMatricula;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalMensual, valorMatricula, totalPagar }}>
      {children}
    </CartContext.Provider>
  );
}