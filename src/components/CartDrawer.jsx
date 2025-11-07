// src/components/CartDrawer.jsx
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useCart, clp } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";

export default function CartDrawer() {
  const { open, setOpen, items, updateQty, removeItem, clear, totals } = useCart();

  const panelRef = useRef(null);
  const lastActiveRef = useRef(null);
  const [liveMsg, setLiveMsg] = useState("");
  const titleId = "cart-title";
  const descId = "cart-desc";

  // Guardar y devolver el foco al cerrar
  useLayoutEffect(() => {
    if (open) {
      lastActiveRef.current = document.activeElement;
    }
  }, [open]);

  // Focus inicial + focus trap
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    // Enfocar el botón cerrar al abrir
    const closeBtn = panel?.querySelector?.(".cart-close");
    closeBtn?.focus({ preventScroll: true });

    const trap = (e) => {
      if (e.key !== "Tab") return;
      const focusables = panel.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const list = Array.from(focusables).filter(el => !el.hasAttribute("disabled"));
      if (list.length === 0) return;

      const first = list[0];
      const last = list[list.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };

    panel.addEventListener("keydown", trap);
    return () => panel.removeEventListener("keydown", trap);
  }, [open]);

  // Cerrar con ESC (en toda la ventana)
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [setOpen]);

  // Bloquear scroll del body al abrir
  useEffect(() => {
    if (open) {
      const prev = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = prev || "";
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  // Live region: avisos cuando cambia el carrito
  const [prevCount, setPrevCount] = useState(items.length);
  useEffect(() => {
    if (!open) return;
    if (items.length > prevCount) setLiveMsg("Se agregó un ítem al carrito.");
    else if (items.length < prevCount) setLiveMsg("Se quitó un ítem del carrito.");
    setPrevCount(items.length);
    const t = setTimeout(() => setLiveMsg(""), 1200);
    return () => clearTimeout(t);
  }, [items.length, open, prevCount]);

  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) setOpen(false);
  };

  // Devolver foco al último elemento activo al cerrar
  useEffect(() => {
    if (!open && lastActiveRef.current && lastActiveRef.current.focus) {
      lastActiveRef.current.focus();
    }
  }, [open]);

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
      outline: 0;
    }
    .cart-head{
      display:flex; align-items:center; justify-content:space-between;
      padding:14px; border-bottom:1px solid #1f2a44;
    }
    .cart-title{ font-weight:800; font-size:1.05rem }
    .cart-close{ background:transparent; border:1px solid #2f3341; color:#cbd5e1; border-radius:10px; padding:.45rem .65rem; }
    .cart-close:focus-visible{ outline:2px solid #22d3ee; outline-offset:2px; }
    .cart-body{ padding:12px 14px; overflow:auto; flex:1; }
    .empty{
      text-align:center; border:1px dashed #1f2a44; border-radius:12px; padding:16px;
      background:#0f172a; color:#9fb3c8;
    }
    .item{
      display:grid; grid-template-columns: 1fr auto; gap:8px; align-items:center;
      border:1px solid #1f2a44; background:#0f172a; border-radius:12px; padding:12px; margin-bottom:10px;
    }
    .item-title{ font-weight:700 }
    .item-meta{ color:#9fb3c8; font-size:.9rem }
    .qty{
      display:flex; align-items:center; gap:6px;
      border:1px solid #1f2a44; border-radius:10px; padding:4px 6px;
    }
    .qty input{
      width:48px; height:28px; background:transparent; border:0; color:#e5e7eb; text-align:center;
      font-variant-numeric: tabular-nums;
    }
    .qty button{
      background:#0b1220; border:1px solid #2f3341; color:#e5e7eb; border-radius:8px; width:28px; height:28px;
    }
    .qty button:focus-visible{ outline:2px solid #22d3ee; outline-offset:2px; }
    .remove{ background:transparent; border:0; color:#ef4444; font-weight:700 }
    .remove:focus-visible{ outline:2px solid #ef4444; outline-offset:2px; }

    .cart-foot{
      border-top:1px solid #1f2a44; padding:12px 14px; display:grid; gap:8px;
      background:#0b1220;
    }
    .row{ display:flex; justify-content:space-between; align-items:center; }
    .total{ font-size:1.3rem; font-weight:800; color:#22c55e; }
    .btn{ display:inline-flex; justify-content:center; align-items:center; gap:8px; padding:.7rem .95rem; border-radius:10px; border:1px solid #2f3341; text-decoration:none; }
    .btn-primary{ background:#5850EC; border-color:#5850EC; color:#fff; }
    .btn-ghost{ background:transparent; color:#cbd5e1; }
  `;

  return (
    <>
      <style>{css}</style>

      {/* Backdrop */}
      <div className="cart-overlay" onClick={onBackdrop} />

      {/* Live region para lectores de pantalla */}
      <div className="sr-only" role="status" aria-live="polite">{liveMsg}</div>

      {/* Drawer */}
      <aside
        ref={panelRef}
        className="cart-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        <header className="cart-head">
          <div id={titleId} className="cart-title">Tu carrito</div>
          <button className="cart-close" onClick={() => setOpen(false)} aria-label="Cerrar carrito">✕</button>
        </header>

        <div className="cart-body">
          <p id={descId} className="sr-only">
            Revisa los ítems seleccionados, ajusta cantidades o elimina productos antes de continuar al pago.
          </p>

          {items.length === 0 ? (
            <div className="empty">
              <div className="item-title" style={{color:"#e5e7eb"}}>Tu carrito está vacío</div>
              <div className="item-meta">Agrega planes o ramos para continuar.</div>
              <div style={{marginTop:10}}>
                <Link className="btn btn-ghost" to="/paes" onClick={()=>setOpen(false)}>Explorar programas</Link>
              </div>
            </div>
          ) : (
            items.map((it) => {
              const key = it.mergeKey || it.id;
              const qtyVal = it.qty || 1;
              return (
                <div className="item" key={key}>
                  <div>
                    <div className="item-title">{it.name}</div>
                    <div className="item-meta">
                      {clp(it.price)} · {it.meta?.type || "ítem"}
                    </div>
                  </div>

                  <div style={{display:"grid", gap:6, justifyItems:"end"}}>
                    <div className="qty" role="group" aria-label={`Cantidad de ${it.name}`}>
                      <button
                        aria-label={`Disminuir cantidad de ${it.name}`}
                        onClick={() => updateQty(key, Math.max(1, qtyVal - 1))}
                      >
                        −
                      </button>
                      <input
                        inputMode="numeric"
                        pattern="[0-9]*"
                        aria-label={`Cantidad para ${it.name}`}
                        value={qtyVal}
                        onChange={(e) => {
                          const v = parseInt(e.target.value || "1", 10);
                          updateQty(key, isNaN(v) ? 1 : Math.max(1, v));
                        }}
                      />
                      <button
                        aria-label={`Aumentar cantidad de ${it.name}`}
                        onClick={() => updateQty(key, qtyVal + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button className="remove" onClick={() => removeItem(key)} aria-label={`Eliminar ${it.name}`}>
                      Eliminar
                    </button>
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

      {/* utilidades de accesibilidad */}
      <style>{`
        .sr-only{
          position:absolute; width:1px; height:1px; padding:0; margin:-1px;
          overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0;
        }
      `}</style>
    </>
  );
}