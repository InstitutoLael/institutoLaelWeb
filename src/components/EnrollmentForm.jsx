import React, { useState } from 'react';
import { 
  X, User, Mail, Phone, 
  CheckCircle, Loader2, ArrowRight, ShieldCheck, FileText 
} from 'lucide-react';

// TU URL DE GOOGLE SCRIPT
const API_URL = "https://script.google.com/macros/s/AKfycbxtpSpOLYlNvkhSa86EohNUWYLtJ0fY6-FqkwGe1lwjH9Q372DTRmdgD45YtX0juQiw8g/exec";

export default function EnrollmentForm({ planTitle, price, selectedDetails, onClose }) {
  const [status, setStatus] = useState("idle"); 
  const [formData, setFormData] = useState({
    fullName: "",
    rut: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const payload = {
      fullName: formData.fullName,
      rut: formData.rut,
      email: formData.email,
      phone: formData.phone,
      program: planTitle,
      total: price,
      comments: selectedDetails
    };

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      setStatus("success");
    } catch (error) {
      console.error("Error al enviar:", error);
      setStatus("error");
    }
  };

  // --- VISTA DE ÉXITO ---
  if (status === "success") {
    return (
      <div className="modal-overlay">
        <style>{modalCss}</style>
        <div className="modal-card success-card animate-zoom">
          <div className="success-header">
            <div className="success-icon">
              <CheckCircle size={40} strokeWidth={2.5} />
            </div>
            <h2>¡Inscripción Enviada!</h2>
            <p>Tus datos ya están en nuestro sistema.</p>
          </div>
          <div className="modal-body">
             <button onClick={onClose} className="btn-primary full-width">
               Cerrar y Volver
             </button>
          </div>
        </div>
      </div>
    );
  }

  // --- VISTA DE ERROR ---
  if (status === "error") {
    return (
       <div className="modal-overlay">
        <style>{modalCss}</style>
        <div className="modal-card animate-zoom">
            <div className="error-content">
                <div className="error-icon">⚠️</div>
                <h3>Algo salió mal</h3>
                <p>No pudimos conectar con el servidor.</p>
                <div className="btn-row">
                  <button onClick={onClose} className="btn-secondary">Cancelar</button>
                  <button onClick={() => setStatus('idle')} className="btn-primary">Reintentar</button>
                </div>
            </div>
        </div>
       </div>
    )
  }

  // --- VISTA DE FORMULARIO ---
  return (
    <div className="modal-overlay">
      <style>{modalCss}</style>
      
      <div className="modal-card animate-slide">
        {/* Botón Cerrar */}
        <button onClick={onClose} className="close-btn">
          <X size={20} />
        </button>

        {/* Header */}
        <div className="modal-header">
          <div className="badge-secure">
            <ShieldCheck size={14} />
            Matrícula Segura 2026
          </div>
          <h2>
            Inscripción a <span className="highlight-text">{planTitle}</span>
          </h2>
        </div>

        {/* Body Scrollable */}
        <div className="modal-body custom-scrollbar">
          <form onSubmit={handleSubmit}>
            
            {/* Campo: Nombre */}
            <div className="form-group">
              <label>Nombre Completo</label>
              <div className="input-wrapper">
                <User className="input-icon" size={18} />
                <input 
                  required 
                  name="fullName" 
                  onChange={handleChange} 
                  placeholder="Ej: Sofía Valdés" 
                />
              </div>
            </div>

            <div className="form-row">
              {/* Campo: RUT */}
              <div className="form-group">
                <label>RUT</label>
                <div className="input-wrapper">
                  <FileText className="input-icon" size={18} />
                  <input 
                    required 
                    name="rut" 
                    onChange={handleChange} 
                    placeholder="12.345.678-9" 
                  />
                </div>
              </div>
              {/* Campo: Teléfono */}
              <div className="form-group">
                <label>Teléfono</label>
                <div className="input-wrapper">
                  <Phone className="input-icon" size={18} />
                  <input 
                    required 
                    name="phone" 
                    type="tel" 
                    onChange={handleChange} 
                    placeholder="+569..." 
                  />
                </div>
              </div>
            </div>

            {/* Campo: Email */}
            <div className="form-group">
              <label>Correo Electrónico</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={18} />
                <input 
                  required 
                  name="email" 
                  type="email" 
                  onChange={handleChange} 
                  placeholder="hola@ejemplo.com" 
                />
              </div>
            </div>

            {/* Resumen Precio */}
            <div className="price-summary">
              <div className="ps-left">
                <p className="ps-label">Total a Pagar</p>
                <p className="ps-desc">{selectedDetails}</p>
              </div>
              <div className="ps-amount">{price}</div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={status === "loading"} className="btn-primary full-width">
              {status === "loading" ? <Loader2 className="spin" /> : <>Confirmar Inscripción <ArrowRight size={20} /></>}
            </button>
            
            <p className="footer-note">Al hacer clic, tus datos se enviarán de forma segura.</p>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   ESTILOS DARK MODE / GLASS (Hipermega Lindos)
   ────────────────────────────────────────────────────────────────────────── */
const modalCss = `
/* Overlay de fondo */
.modal-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  padding: 16px;
  animation: fadeIn 0.3s ease-out;
}

/* Tarjeta Principal */
.modal-card {
  background: #111;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  width: 100%; max-width: 500px;
  border-radius: 24px;
  position: relative;
  overflow: hidden;
  display: flex; flex-direction: column;
  max-height: 90vh;
  color: white;
}

/* Header */
.modal-header {
  background: linear-gradient(to right, #1a1a1a, #0a0a0a);
  padding: 24px 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.badge-secure {
  display: inline-flex; align-items: center; gap: 6px;
  color: #fb7185; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;
  margin-bottom: 8px;
}
.modal-header h2 {
  margin: 0; font-size: 1.5rem; font-weight: 700; line-height: 1.2;
}
.highlight-text { color: #fb7185; }

/* Cuerpo */
.modal-body { padding: 32px; overflow-y: auto; }
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }

/* Close Button */
.close-btn {
  position: absolute; top: 16px; right: 16px;
  background: rgba(255,255,255,0.05); border: none; color: #888;
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: 0.2s; z-index: 10;
}
.close-btn:hover { background: rgba(255,255,255,0.15); color: white; }

/* Formularios */
.form-group { margin-bottom: 20px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-group label {
  display: block; font-size: 0.75rem; font-weight: 700; color: #888; 
  text-transform: uppercase; margin-bottom: 6px; margin-left: 4px;
}
.input-wrapper { position: relative; }
.input-icon {
  position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
  color: #666; pointer-events: none;
}
input {
  width: 100%; padding: 14px 16px 14px 44px;
  background: #1a1a1a; border: 1px solid #333; border-radius: 12px;
  color: white; font-family: inherit; font-size: 0.95rem;
  outline: none; transition: 0.2s;
}
input:focus { border-color: #fb7185; box-shadow: 0 0 0 2px rgba(251, 113, 133, 0.2); }

/* Resumen Precio */
.price-summary {
  background: rgba(251, 113, 133, 0.08); border: 1px solid rgba(251, 113, 133, 0.2);
  border-radius: 12px; padding: 16px; margin-top: 10px; margin-bottom: 24px;
  display: flex; justify-content: space-between; align-items: center;
}
.ps-label { font-size: 0.75rem; color: #fb7185; font-weight: 800; text-transform: uppercase; margin: 0 0 2px 0; }
.ps-desc { font-size: 0.8rem; color: #fecdd3; margin: 0; opacity: 0.9; }
.ps-amount { font-size: 1.5rem; font-weight: 800; color: #fb7185; }

/* Botones */
.btn-primary {
  background: white; color: black; border: none;
  font-weight: 800; font-size: 1rem; padding: 14px; border-radius: 12px;
  cursor: pointer; transition: 0.2s;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.btn-primary:hover { background: #e5e5e5; transform: translateY(-1px); }
.btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
.full-width { width: 100%; }

.btn-secondary {
  background: transparent; color: #888; border: 1px solid #333;
  font-weight: 600; padding: 12px; border-radius: 12px; cursor: pointer;
}
.btn-secondary:hover { color: white; border-color: #666; }

.btn-row { display: flex; gap: 10px; margin-top: 20px; }
.btn-row button { flex: 1; }

.footer-note { text-align: center; font-size: 0.75rem; color: #555; margin-top: 12px; }

/* Success / Error Views */
.success-header { padding: 40px; text-align: center; background: rgba(34, 197, 94, 0.05); border-bottom: 1px solid rgba(34, 197, 94, 0.1); }
.success-icon { 
  width: 80px; height: 80px; background: rgba(34, 197, 94, 0.1); color: #4ade80; 
  border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;
}
.success-header h2 { margin: 0; color: white; }
.success-header p { margin: 8px 0 0; color: #4ade80; }

.error-content { padding: 40px; text-align: center; }
.error-icon { font-size: 3rem; margin-bottom: 10px; }
.error-content h3 { color: white; margin: 0 0 5px; }
.error-content p { color: #888; margin: 0; }

/* Animations */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.animate-zoom { animation: zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.animate-slide { animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1); }

@keyframes zoomIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

.spin { animation: spin 1s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

/* Mobile responsive fixes */
@media (max-width: 600px) {
  .modal-card { height: 100vh; max-height: 100vh; border-radius: 0; }
  .form-row { grid-template-columns: 1fr; }
}
`;