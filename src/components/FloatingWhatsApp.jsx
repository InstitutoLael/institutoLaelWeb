// src/components/FloatingWhatsApp.jsx
export default function FloatingWhatsApp() {
  return (
    <>
      <a
        href="https://wa.me/56964626568?text=Hola%20%F0%9F%91%8B%20quisiera%20informaci%C3%B3n%20sobre%20los%20programas%20LAEL"
        className="lael-wa"
        target="_blank"
        rel="noreferrer"
        aria-label="Hablar por WhatsApp"
      >
        🟢
      </a>

      <style>{`
        .lael-wa{
          position: fixed; right: 18px; bottom: 18px; z-index: 1040;
          width: 56px; height: 56px; border-radius: 999px;
          display:grid; place-items:center; font-size: 28px; text-decoration:none;
          box-shadow: 0 8px 24px rgba(2,6,23,.25); background:#25D366; color:white;
        }
        .lael-wa:hover{ transform: translateY(-1px); }
      `}</style>
    </>
  );
}
