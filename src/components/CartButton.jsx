// src/components/CartButton.jsx
import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import CartDrawer from "./CartDrawer.jsx";

export default function CartButton() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="btn btn-light" onClick={() => setOpen(true)} title="Ver carrito">
        🛒 <span style={{ marginLeft: 6 }}>{count}</span>
      </button>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}