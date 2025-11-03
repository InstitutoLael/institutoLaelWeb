// src/context/CartContext.jsx
import { createContext, useContext, useMemo, useState, useEffect } from "react";

const CartCtx = createContext(null);

// Utilidad CLP
export const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

// Por si quieres sumar la matrícula automáticamente (una sola vez, si hay items)
const ENROLLMENT_FEE = 7990;

export function CartProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("lael:cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Persistencia
  useEffect(() => {
    try { localStorage.setItem("lael:cart", JSON.stringify(items)); } catch {}
  }, [items]);

  // Scroll lock cuando el drawer está abierto
  useEffect(() => {
    const b = document.body;
    if (open) {
      const prev = b.style.overflow;
      b.style.overflow = "hidden";
      return () => { b.style.overflow = prev; };
    }
  }, [open]);

  const addItem = (item) => {
    // item: { id, name, price, qty=1, mergeKey?, meta? }
    setItems((prev) => {
      const mk = item.mergeKey || item.id;
      const ix = prev.findIndex((x) => (x.mergeKey || x.id) === mk);
      if (ix >= 0) {
        const copy = [...prev];
        copy[ix] = { ...copy[ix], qty: (copy[ix].qty || 1) + (item.qty || 1) };
        return copy;
      }
      return [...prev, { ...item, qty: item.qty || 1 }];
    });
    setOpen(true);
  };

  const updateQty = (mergeKeyOrId, qty) => {
    setItems((prev) =>
      prev
        .map((x) =>
          (x.mergeKey || x.id) === mergeKeyOrId ? { ...x, qty: Math.max(1, qty) } : x
        )
        .filter(Boolean)
    );
  };

  const removeItem = (mergeKeyOrId) => {
    setItems((prev) => prev.filter((x) => (x.mergeKey || x.id) !== mergeKeyOrId));
  };

  const clear = () => setItems([]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((a, it) => a + (it.price || 0) * (it.qty || 1), 0);
    // Matrícula: si hay al menos 1 item, se cobra una sola vez
    const enrollment = items.length > 0 ? ENROLLMENT_FEE : 0;
    const total = subtotal + enrollment;
    const count = items.reduce((a, it) => a + (it.qty || 1), 0);
    return { count, subtotal, enrollment, total };
  }, [items]);

  const value = useMemo(
    () => ({
      open,
      setOpen,
      items,
      addItem,
      updateQty,
      removeItem,
      clear,
      totals,
    }),
    [open, items, totals]
  );

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}