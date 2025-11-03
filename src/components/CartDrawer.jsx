// src/components/CartDrawer.jsx
import { useEffect } from "react";
import { useCart, clp } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";

export default function CartDrawer() {
  const { open, setOpen, items, updateQty, removeItem, clear, totals } = useCart();

  // Cerrar con ESC
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [setOpen]);

  const css = `
  .cart-overlay{
    position:fixed; inset:0; background:rgba(2,6,23,.55);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    z-index: 3000;
    display:${open ? "block" : "none"};
  }
  .cart-panel{
    position:fixed; inset:0 0 0 auto; width:min(420px,100%);
    background: linear-gradient(180deg,#0b1220,#0e1424);
    color:#e5e7eb; border-left:1px solid #1f2a44;
    transform: translateX(${open ? "0" : "100%"});
    transition: transform .22s ease;
    z-index: 3001; display:flex; flex-direction:column;
  }
  .cart-head{
    display:flex; align-items:center; justify-content:space-between;
    padding:14px; border-bottom:1px solid #1f2a44;
  }
  .cart-title{ font-weight:800 }
  .cart-close{ background:transparent; border:1px solid #2f3341; color:#cbd5e1; border-radius:10px; padding:.4rem .6rem; }
  .cart-body{ padding:12px 14px; overflow:auto; flex:1; }
  .item{
    display:grid; grid-template-columns: 1fr auto; gap:6px; align-items:center;
    border:1px solid #1f2a44; background:#0f172a; border-radius:12px; padding:10px; margin-bottom:10px;
  }
  .item-title{ font-weight:700 }
  .item-meta{ color:#9fb3c8; font-size:.9rem }
  .qty{
    display:flex; align-items:center; gap:6px;
    border:1px solid #1f2a44; border-radius:10px; padding:4px 6px;
  }
  .qty input{ width:44px; background:transparent; border:0; color:#e5e7eb; text-align:center; }
  .qty button{ background:#0b1220; border:1px solid #2f3341; color:#e5e7eb; border-radius:8px; width:28px; height:28px; }
  .remove{ background:transparent; border:0; color:#ef4444; font-weight:700 }
  .cart-foot{
    border-top:1px solid #1f2a44; padding:12px 14px; display:grid; gap:8px;
    background:#0b1220;
  }
  .row{ display:flex; justify-content:space-between; align-items:center; }
  .total{ font-size:1.3rem; font-weight:800; color:#22c55e; }
  .btn{ display:inline-flex; justify-content:center; align-items:center; gap:8px; padding:.65rem .9rem; border-radius:10px; border:1px solid #2f3341; text-decoration:none; }
  .btn-primary{ background:#5850EC; border-color:#5850EC; color:#fff; }
  .btn-ghost{ background:transparent; color:#cbd5e1; }
  `;

  const onBackdrop = (e) => e.target === e.currentTarget && setOpen(false);

  return (
    <>
      <style>{css}</style>
      <div className="cart-overlay" onClick={onBackdrop} />
      <aside className="cart-panel" role="dialog" aria-modal="true" aria-label="Carrito">
        <header className="cart-head">
          <div className="cart-title">Tu carrito</div>
          <button className="cart-close" onClick={() => setOpen(false)}>✕</button>
        </header>

        <div className="cart-body">
          {items.length === 0 ? (
            <div className="item" style={{display:"block", textAlign:"center"}}>
              <div className="item-title">Tu carrito está vacío</div>
              <div className="item-meta">Agrega planes o ramos para continuar.</div>
            </div>
          ) : (
            items.map((it) => {
              const key = it.mergeKey || it.id;
              return (
                <div className="item" key={key}>
                  <div>
                    <div className="item-title">{it.name}</div>
                    <div className="item-meta">{clp(it.price)} · {it.meta?.type || "item"}</div>
                  </div>

                  <div style={{display:"grid", gap:6, justifyItems:"end"}}>
                    <div className="qty">
                      <button onClick={() => updateQty(key, Math.max(1, (it.qty || 1) - 1))}>−</button>
                      <input
                        value={it.qty || 1}
                        onChange={(e) => {
                          const v = parseInt(e.target.value || "1", 10);
                          updateQty(key, isNaN(v) ? 1 : Math.max(1, v));
                        }}
                      />
                      <button onClick={() => updateQty(key, (it.qty || 1) + 1)}>+</button>
                    </div>
                    <button className="remove" onClick={() => removeItem(key)}>Eliminar</button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <footer className="cart-foot">
          <div className="row"><span>Subtotal</span><strong>{clp(totals.subtotal)}</strong></div>
          <div className="row"><span>Matrícula</span><strong>{clp(totals.enrollment)}</strong></div>
          <div className="row"><span>Total</span><span className="total">{clp(totals.total)}</span></div>
          <Link className="btn btn-primary" to="/pagos" onClick={()=>setOpen(false)}>Ir a Pagos</Link>
          <button className="btn btn-ghost" onClick={clear}>Vaciar carrito</button>
        </footer>
      </aside>
    </>
  );
}