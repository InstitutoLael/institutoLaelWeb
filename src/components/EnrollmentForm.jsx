import React, { useState } from 'react';
import { 
  X, User, Mail, Phone, 
  CheckCircle, Loader2, ArrowRight, ShieldCheck, FileText, Lock
} from 'lucide-react';

// TU URL DE GOOGLE SCRIPT (Asegúrate de que sea la correcta y esté desplegada como "Web App")
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

    // Fecha y Hora actual para el registro
    const timestamp = new Date().toLocaleString("es-CL");

    const payload = {
      ...formData,
      program: planTitle,
      total: price,
      comments: selectedDetails,
      date: timestamp
    };

    try {
      // Enviamos como text/plain para evitar errores de CORS en Google Apps Script
      await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      // Google Scripts no siempre devuelve 200 OK limpio por CORS, 
      // así que si no explota el fetch, asumimos éxito.
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
              <CheckCircle size={48} strokeWidth={2.5} />
            </div>
            <h2>¡Inscripción Exitosa!</h2>
            <p>Bienvenido/a al Instituto Lael.</p>
            <span className="sub-text">Te hemos enviado un correo con los detalles.</span>
          </div>
          <div className="modal-body">
             <button onClick={onClose} className="btn-primary full-width">
               Cerrar y Continuar
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
                <h3>Hubo un problema</h3>
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
        <button onClick={onClose} className="close-btn" aria-label="Cerrar">
          <X size={20} />
        </button>

        {/* Header */}
        <div className="modal-header">
          <div className="badge-secure">
            <ShieldCheck size={14} />
            Matrícula Segura 2026
          </div>
          <h2>
            Inscripción <span className="highlight-text">{planTitle}</span>
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
                  value={formData.fullName}
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
                    value={formData.rut}
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
                    value={formData.phone}
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
                  value={formData.email}
                  onChange={handleChange} 
                  placeholder="hola@ejemplo.com" 
                />
              </div>
            </div>

            {/* Resumen Precio */}
            <div className="price-summary">
              <div className="ps-left">
                <p className="ps-label">Inversión Total</p>
                <p className="ps-desc">{selectedDetails}</p>
              </div>
              <div className="ps-amount">{price}</div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={status === "loading"} className="btn-primary full-width">
              {status === "loading" ? (
                <Loader2 className="spin" /> 
              ) : (
                <>Confirmar Inscripción <ArrowRight size={20} /></>
              )}
            </button>
            
            <p className="footer-note">
              <Lock size={12} style={{marginRight:4}}/> 
              Tus datos están protegidos por SSL.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   ESTILOS (Ajustados a la Línea Gráfica Lael)
   ────────────────────────────────────────────────────────────────────────── */
const modalCss = `
/* Overlay de fondo */
.modal-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0, 0, 0, 0.85); /* Un poco más oscuro */
  backdrop-filter: blur(10px);
  display: flex; align-items: center; justify-content: center;
  padding: 16px;
  animation: fadeIn 0.3s ease-out;
}

/* Tarjeta Principal */
.modal-card {
  background: #0f0f0f; /* Casi negro */
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  width: 100%; max-width: 480px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  display: flex; flex-direction: column;
  max-height: 90vh;
  color: var(--text-main, #fff);
  font-family: 'Inter', sans-serif;
}

/* Header */
.modal-header {
  background: linear-gradient(to bottom, rgba(255,255,255,0.03), rgba(0,0,0,0));
  padding: 24px 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.badge-secure {
  display: inline-flex; align-items: center; gap: 6px;
  color: var(--accent, #F59E0B); /* Usamos la variable de acento */
  font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
  background: rgba(245, 158, 11, 0.1);
  padding: 4px 8px; border-radius: 6px;
  margin-bottom: 12px;
}
.modal-header h2 {
  margin: 0; font-size: 1.4rem; font-weight: 600; line-height: 1.2;
}
.highlight-text { 
  color: var(--primary, #6366F1); /* Variable primaria */
}

/* Cuerpo */
.modal-body { padding: 24px 32px 32px; overflow-y: auto; }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }

/* Close Button */
.close-btn {
  position: absolute; top: 20px; right: 20px;
  background: transparent; border: none; color: #666;
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: 0.2s; z-index: 10;
}
.close-btn:hover { background: rgba(255,255,255,0.1); color: white; }

/* Formularios */
.form-group { margin-bottom: 18px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.form-group label {
  display: block; font-size: 0.75rem; font-weight: 600; color: #94a3b8; 
  text-transform: uppercase; margin-bottom: 6px;
}
.input-wrapper { position: relative; }
.input-icon {
  position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
  color: #64748b; pointer-events: none;
}
input {
  width: 100%; padding: 12px 16px 12px 42px;
  background: #18181b; border: 1px solid #27272a; border-radius: 10px;
  color: white; font-family: inherit; font-size: 0.95rem;
  outline: none; transition: all 0.2s ease;
}
input:focus { 
  border-color: var(--primary, #6366F1); 
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15); 
  background: #000;
}
input::placeholder { color: #475569; }

/* Resumen Precio */
.price-summary {
  background: rgba(99, 102, 241, 0.05); /* Tinte primario muy suave */
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px; padding: 16px; margin-top: 10px; margin-bottom: 24px;
  display: flex; justify-content: space-between; align-items: center;
}
.ps-label { font-size: 0.7rem; color: var(--primary, #6366F1); font-weight: 700; text-transform: uppercase; margin: 0 0 2px 0; }
.ps-desc { font-size: 0.8rem; color: #cbd5e1; margin: 0; }
.ps-amount { font-size: 1.5rem; font-weight: 700; color: white; }

/* Botones */
.btn-primary {
  background: var(--primary, #6366F1); 
  color: white; border: none;
  font-weight: 600; font-size: 1rem; padding: 14px; border-radius: 10px;
  cursor: pointer; transition: 0.2s;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.btn-primary:hover { 
  background: #4f46e5; 
  transform: translateY(-1px); 
  box-shadow: 0 10px 25px -10px rgba(99, 102, 241, 0.5);
}
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
.full-width { width: 100%; }

.btn-secondary {
  background: transparent; color: #94a3b8; border: 1px solid #333;
  font-weight: 500; padding: 12px; border-radius: 10px; cursor: pointer; transition: 0.2s;
}
.btn-secondary:hover { color: white; border-color: #666; background: rgba(255,255,255,0.05); }

.btn-row { display: flex; gap: 10px; margin-top: 20px; }
.btn-row button { flex: 1; }

.footer-note { 
  display: flex; align-items: center; justify-content: center;
  text-align: center; font-size: 0.7rem; color: #52525b; margin-top: 16px; 
}

/* Success / Error Views */
.success-header { padding: 40px; text-align: center; }
.success-icon { 
  width: 70px; height: 70px; 
  background: rgba(16, 185, 129, 0.1); color: #10b981; 
  border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;
}
.success-header h2 { margin: 0 0 8px 0; color: white; font-size: 1.5rem; }
.success-header p { margin: 0; color: #94a3b8; }
.sub-text { display: block; font-size: 0.85rem; color: #64748b; margin-top: 4px; }

.error-content { padding: 40px; text-align: center; }
.error-icon { font-size: 3rem; margin-bottom: 10px; }
.error-content h3 { color: white; margin: 0 0 5px; }
.error-content p { color: #888; margin: 0; }

/* Animations */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.animate-zoom { animation: zoomIn 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
.animate-slide { animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1); }

@keyframes zoomIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

.spin { animation: spin 1s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

/* Mobile responsive fixes */
@media (max-width: 600px) {
  .modal-card { width: 100%; height: 100%; max-height: none; border-radius: 0; border: none; }
  .form-row { grid-template-columns: 1fr; }
  .close-btn { top: 16px; right: 16px; }
}
`;