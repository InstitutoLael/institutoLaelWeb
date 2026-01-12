import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

// ─── CAMBIO DE SEGURIDAD AQUÍ ───
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    // Si no encuentra el contexto, devuelve un "carrito falso" vacío para no romper la web
    console.warn("⚠️ Advertencia: useCart se está usando fuera del CartProvider");
    return { cart: [], addToCart: () => {}, totalPagar: 0 };
  }
  return context;
}
// ────────────────────────────────

export function CartProvider({ children }) {
  // ... (MANTÉN TODO EL RESTO DE TU CÓDIGO IGUAL, ESTÁ PERFECTO) ...
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("lael_cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("lael_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const totalMensual = cart.reduce((acc, item) => acc + (item.precio || 0), 0);
  const valorMatricula = cart.length > 0 ? 40000 : 0; 
  const totalPagar = totalMensual + valorMatricula;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalMensual, valorMatricula, totalPagar }}>
      {children}
    </CartContext.Provider>
  );
}