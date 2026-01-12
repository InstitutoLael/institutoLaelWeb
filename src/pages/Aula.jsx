import React, { useState } from "react";
import { Link } from "react-router-dom";

/* --- ICONOS SVG (Ligeros y sin dependencias) --- */
const Icons = {
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Lock: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Eye: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  ArrowRight: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Help: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>,
  Zoom: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2d8cff" strokeWidth="2"><path d="M21 12c0-1.1.9-2 2-2V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2z"/><circle cx="12" cy="12" r="5"/><line x1="12" x2="12" y1="12" y2="12"/></svg>
};

export default function Aula() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Simulación de Login (Para conectar con tu backend después)
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Esta funcionalidad se conectará a tu base de datos de alumnos.");
    }, 1500);
  };

  return (
    <div className="aula-page">
      <style>{css}</style>
      
      {/* FONDO ANIMADO (Sutil) */}
      <div className="bg-gradient"></div>

      <div className="container aula-layout">
        
        {/* COLUMNA IZQUIERDA: LOGIN */}
        <div className="login-column">
          <div className="login-card">
            <div className="brand-header">
              <span className="logo-icon">⚡</span>
              <h2>Campus Virtual</h2>
              <p>Gestiona tus clases, material y grabaciones.</p>
            </div>

            <form onSubmit={handleLogin} className="login-form">
              <div className="input-group">
                <label>Correo Electrónico</label>
                <div className="input-wrapper">
                  <span className="input-icon"><Icons.User /></span>
                  <input 
                    type="email" 
                    placeholder="alumno@ejemplo.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Contraseña</label>
                <div className="input-wrapper">
                  <span className="input-icon"><Icons.Lock /></span>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="button" className="show-pass"><Icons.Eye /></button>
                </div>
              </div>

              <div className="form-footer">
                <label className="remember-me">
                  <input type="checkbox" /> Recordarme
                </label>
                <a href="#" className="forgot-pass">¿Olvidaste tu clave?</a>
              </div>

              <button type="submit" className={`login-btn ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                {isLoading ? 'Ingresando...' : 'Acceder al Aula'}
                {!isLoading && <Icons.ArrowRight />}
              </button>
            </form>

            <div className="support-line">
              <Icons.Help />
              <span>¿Eres nuevo? <a href="#">Ver tutorial de acceso</a></span>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: INFO Y ESTADO */}
        <div className="info-column">
          
          {/* TARJETA DE ESTADO DEL SISTEMA */}
          <div className="status-card">
            <div className="status-header">
              <span className="status-dot online"></span>
              <h4>Estado de Servicios</h4>
            </div>
            <ul className="services-list">
              <li>
                <span>Zoom (Clases en vivo)</span>
                <span className="srv-tag ok">Operativo</span>
              </li>
              <li>
                <span>Classroom (Material)</span>
                <span className="srv-tag ok">Operativo</span>
              </li>
              <li>
                <span>Intranet Pagos</span>
                <span className="srv-tag maint">Mantenimiento</span>
              </li>
            </ul>
          </div>

          {/* ACCESOS RÁPIDOS (Si el alumno no recuerda su clave) */}
          <div className="quick-access">
            <h4>Accesos Públicos</h4>
            <div className="access-grid">
              <a href="#" className="ac-btn">
                <span className="emoji">📅</span> Horarios 2026
              </a>
              <a href="#" className="ac-btn">
                <span className="emoji">📥</span> Guías Gratuitas
              </a>
              <a href="https://wa.me/569XXXXXXXX" target="_blank" rel="noreferrer" className="ac-btn">
                <span className="emoji">💬</span> Soporte WhatsApp
              </a>
            </div>
          </div>

          <div className="message-box">
            <h5>📢 Aviso Importante</h5>
            <p>Recuerda que los links de Zoom se actualizan cada lunes a las 09:00 AM. Revisa tu correo.</p>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ─── ESTILOS CSS SCOPED ─── */
const css = `
.aula-page {
  min-height: 100vh;
  background-color: #050505;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 120px 20px 60px 20px; /* Padding top para navbar */
}

/* FONDO AMBIENTAL */
.bg-gradient {
  position: absolute; width: 100%; height: 100%; top: 0; left: 0;
  background: radial-gradient(circle at 10% 20%, rgba(88, 80, 236, 0.15) 0%, transparent 40%),
              radial-gradient(circle at 90% 80%, rgba(45, 212, 191, 0.1) 0%, transparent 40%);
  z-index: 0;
}

.aula-layout {
  position: relative; z-index: 1;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 60px; max-width: 1000px; width: 100%;
  align-items: center;
}

@media (max-width: 900px) {
  .aula-layout { grid-template-columns: 1fr; gap: 40px; }
  .info-column { order: 2; }
  .login-column { order: 1; }
}

/* LOGIN CARD */
.login-card {
  background: rgba(20, 20, 30, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 40px; border-radius: 24px;
  box-shadow: 0 20px 50px -10px rgba(0,0,0,0.5);
}

.brand-header { margin-bottom: 30px; text-align: center; }
.logo-icon { font-size: 2rem; display: block; margin-bottom: 10px; }
.brand-header h2 { font-size: 1.8rem; margin: 0; font-weight: 800; }
.brand-header p { color: #94a3b8; font-size: 0.95rem; margin-top: 5px; }

/* INPUTS */
.input-group { margin-bottom: 20px; }
.input-group label { display: block; font-size: 0.85rem; color: #cbd5e1; margin-bottom: 8px; font-weight: 500; }
.input-wrapper {
  position: relative; display: flex; align-items: center;
  background: rgba(0,0,0,0.3); border: 1px solid #334155; border-radius: 12px;
  transition: 0.2s;
}
.input-wrapper:focus-within { border-color: #5850EC; box-shadow: 0 0 0 3px rgba(88, 80, 236, 0.2); }
.input-icon { padding: 0 15px; color: #64748b; display: flex; align-items: center; }
.input-wrapper input {
  flex: 1; background: transparent; border: none; color: #fff; padding: 14px 0; outline: none; font-size: 1rem;
}
.show-pass { background: none; border: none; color: #64748b; padding: 0 15px; cursor: pointer; }

/* FOOTER FORM */
.form-footer { display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 25px; }
.remember-me { color: #94a3b8; cursor: pointer; display: flex; align-items: center; gap: 5px; }
.forgot-pass { color: #5850EC; text-decoration: none; font-weight: 600; }
.forgot-pass:hover { text-decoration: underline; }

.login-btn {
  width: 100%; background: #5850EC; color: #fff; border: none; padding: 14px;
  border-radius: 12px; font-size: 1rem; font-weight: 700; cursor: pointer;
  display: flex; justify-content: center; align-items: center; gap: 10px;
  transition: 0.3s;
}
.login-btn:hover { background: #4338ca; transform: translateY(-2px); }
.login-btn.loading { opacity: 0.7; cursor: wait; }

.support-line { margin-top: 25px; text-align: center; color: #64748b; font-size: 0.9rem; display: flex; justify-content: center; gap: 8px; align-items: center; }
.support-line a { color: #fff; font-weight: 600; }

/* INFO COLUMN */
.status-card {
  background: #1e293b; border-radius: 16px; padding: 20px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 20px;
}
.status-header { display: flex; align-items: center; gap: 10px; margin-bottom: 15px; }
.status-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 10px #22c55e; }
.status-header h4 { margin: 0; font-size: 1rem; color: #e2e8f0; }

.services-list { list-style: none; padding: 0; margin: 0; }
.services-list li { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.9rem; color: #cbd5e1; }
.services-list li:last-child { border-bottom: none; }
.srv-tag { font-size: 0.75rem; padding: 2px 8px; border-radius: 6px; font-weight: 700; }
.srv-tag.ok { background: rgba(34, 197, 94, 0.15); color: #4ade80; }
.srv-tag.maint { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }

.quick-access h4 { font-size: 1rem; margin-bottom: 15px; color: #94a3b8; }
.access-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.ac-btn {
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px; padding: 15px 10px; text-align: center;
  color: #fff; text-decoration: none; font-size: 0.8rem;
  transition: 0.2s; display: flex; flex-direction: column; align-items: center; gap: 5px;
}
.ac-btn:hover { background: rgba(255,255,255,0.08); transform: translateY(-3px); }
.emoji { font-size: 1.2rem; }

.message-box { 
  margin-top: 25px; background: rgba(88, 80, 236, 0.1); 
  border-left: 3px solid #5850EC; padding: 15px; border-radius: 0 8px 8px 0; 
}
.message-box h5 { margin: 0 0 5px 0; color: #818cf8; font-size: 0.9rem; }
.message-box p { margin: 0; font-size: 0.85rem; color: #c7d2fe; line-height: 1.4; }
`;