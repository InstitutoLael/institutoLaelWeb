import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { motion } from "framer-motion";
import { FaArrowRight, FaLock, FaShieldAlt } from "react-icons/fa";

// --- CONFIGURACIÓN ---
import { GOOGLE_SCRIPT_URL } from "../config";
const WAPP_INTL = "56964626568";

/* ──────────────────────────────────────────────────────────────────────────
   1. UTILS & ICONS
   ────────────────────────────────────────────────────────────────────────── */
const clp = (amount) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount || 0);
};

const Icons = {
  Copy: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>,
  Check: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>,
  Whatsapp: () => <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>,
  Lock: () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
  User: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  Cart: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>,
  Alert: () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
};

/**
 * Validates Chilean RUT (Format: 12345678-5)
 */
const validateRut = (rut) => {
  if (!rut || typeof rut !== 'string') return false;
  const cleanRut = rut.replace(/[.-]/g, '');
  if (cleanRut.length < 8) return false;

  const dv = cleanRut.slice(-1).toUpperCase();
  const rutBody = cleanRut.slice(0, -1);
  if (!/^\d+$/.test(rutBody)) return false;

  let sum = 0;
  let multiplier = 2;
  for (let i = rutBody.length - 1; i >= 0; i--) {
    sum += parseInt(rutBody[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const expectedDv = 11 - (sum % 11);
  const dvCalculated = expectedDv === 11 ? '0' : (expectedDv === 10 ? 'K' : expectedDv.toString());

  return dv === dvCalculated;
};

/**
 * Validates Email Format
 */
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Validates Phone Format (Chilean mobile/landline)
 */
const validatePhone = (phone) => {
  const cleanPhone = phone.replace(/[+\s-]/g, '');
  return /^\d{9,12}$/.test(cleanPhone);
};

/* ──────────────────────────────────────────────────────────────────────────
   2. SUB-COMPONENTES
   ────────────────────────────────────────────────────────────────────────── */
function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div className="toast-notification">
      <Icons.Check /> {msg}
    </div>
  );
}

function BankCard({ onCopy }) {
  const handleCopy = (val) => onCopy(val);
  return (
    <div className="bank-card-container">
      <div className="bank-card">
        <div className="card-top">
          <span className="card-chip"></span>
          <span className="card-bank-name">Mercado Pago</span>
        </div>
        <div className="card-number">
          <span onClick={() => handleCopy("1088183168")}>1088 183 168</span>
          <Icons.Copy />
        </div>
        <div className="card-details">
          <div className="cd-group">
            <label>Nombre</label>
            <span>Instituto Lael SpA</span>
          </div>
          <div className="cd-group">
            <label>RUT</label>
            <span onClick={() => handleCopy("78.084.019-6")}>78.084.019-6</span>
          </div>
        </div>
      </div>
      <div className="bank-info-footer">
        <small>Cuenta Vista / Chequera Electrónica</small>
        <small>pagos@institutolael.cl</small>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   3. COMPONENTE PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
export default function Inscripciones() {
  const context = useCart();
  const cartItems = context?.cartItems || context?.cart || [];
  const total = context?.cartTotal || 0;
  const clearCart = context?.clearCart || (() => { });

  const [toastMsg, setToastMsg] = useState("");
  const [status, setStatus] = useState("idle");
  const [currentStep, setCurrentStep] = useState(1);

  const [form, setForm] = useState({
    fullName: "",
    rut: "",
    email: "",
    phone: "",
    program: "",
    comments: ""
  });

  const [errors, setErrors] = useState({
    rut: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  useEffect(() => {
    if (cartItems.length > 0) {
      setForm(prev => ({
        ...prev,
        comments: prev.comments || `Compra Web.`
      }));
    }
  }, [cartItems]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setToastMsg("Copiado con éxito");
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Real-time validation
    if (name === "rut") {
      setErrors(prev => ({ ...prev, rut: validateRut(value) ? "" : "RUT Inválido" }));
    }
    if (name === "email") {
      setErrors(prev => ({ ...prev, email: validateEmail(value) ? "" : "Email Inválido" }));
    }
    if (name === "phone") {
      setErrors(prev => ({ ...prev, phone: validatePhone(value) ? "" : "Mínimo 9 dígitos" }));
    }
  };

  const isStep1Valid = () => {
    return (
      form.fullName &&
      validateRut(form.rut) &&
      validateEmail(form.email) &&
      validatePhone(form.phone)
    );
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!isStep1Valid()) {
        setToastMsg("Corrige los errores antes de continuar");
        setTimeout(() => setToastMsg(""), 3000);
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => setCurrentStep(prev => prev - 1);

  /**
   * PREPARACIÓN PARA WEBHOOK
   * Envía los datos a una base de datos externa o automatización.
   */
  const sendToDatabase = async (data) => {
    try {
      console.log("Preparing Webhook Payload:", data);
      // TODO: Insert Webhook URL here (Google Sheets / Zapier) to automate database entry
      /*
      await fetch("YOUR_WEBHOOK_URL", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      */
    } catch (err) {
      console.error("Webhook failed:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isStep1Valid()) return;

    const finalProgram = cartItems.length > 0
      ? cartItems.map(item => item.title).join(" + ")
      : form.program;

    const finalTotal = cartItems.length > 0 ? total : "Por cotizar";

    const payload = {
      fullName: form.fullName,
      phone: form.phone,
      program: finalProgram,
      comments: form.comments,
      nombre: form.fullName,
      telefono: form.phone,
      programa: finalProgram,
      comentario: form.comments,
      rut: form.rut,
      email: form.email,
      total: finalTotal,
      fecha: new Date().toLocaleString("es-CL")
    };

    try {
      await sendToDatabase(payload); // Trigger Webhook prep

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setStatus("success");
      if (cartItems.length > 0) clearCart();

    } catch (error) {
      console.error(error);
      setStatus("error");
      setToastMsg("Hubo un error. Intenta por WhatsApp.");
    }
  };

  if (status === "success") {
    const totalDisplay = total > 0 ? clp(total) : "lo acordado";
    const textWsp = `Hola Lael! Soy *${form.fullName}*.\nYa envié mi ficha.\nAdjunto comprobante por ${totalDisplay} para mi matrícula.\n(RUT: ${form.rut})`;
    const linkWsp = `https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(textWsp)}`;

    return (
      <div className="enroll-page success-view min-h-screen flex items-center justify-center bg-[#050505] py-24 px-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_#1e1b4b_0%,_#050505_80%)] opacity-50" />

        <div className="container max-w-2xl relative z-10 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-24 h-24 bg-emerald-500 rounded-3xl flex items-center justify-center text-slate-950 text-4xl mx-auto mb-10 shadow-2xl shadow-emerald-500/20"
          >
            <Icons.Check />
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">¡Ficha <span className="text-emerald-500">Enviada</span>!</h1>
          <p className="text-xl text-slate-400 mb-12 font-light">Tu inscripción está siendo procesada. Sigue los pasos finales para activar tu matrícula.</p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/[0.02] border border-white/10 p-12 rounded-[3.5rem] backdrop-blur-3xl text-left shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 text-emerald-500/5 pointer-events-none">
              <Icons.Check size={120} />
            </div>

            <h3 className="text-amber-500 font-black text-xs mb-6 uppercase tracking-[0.3em]">Paso Final: Verificación</h3>
            <p className="text-slate-300 mb-10 leading-relaxed text-lg">
              Transfiere <strong className="text-white text-2xl block mt-1 tracking-tighter font-black">{totalDisplay}</strong> a la cuenta del instituto y envía tu comprobante por WhatsApp para validación inmediata.
            </p>

            <div className="bg-black/40 p-8 rounded-[2rem] border border-white/5 mb-10 font-mono text-sm text-slate-400 space-y-2">
              <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                <span>RUT: 78.084.019-6</span>
                <button onClick={() => handleCopy("78.084.019-6")} className="text-amber-500 hover:text-white transition-colors"><Icons.Copy /></button>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                <span>Cuenta: 1088183168</span>
                <button onClick={() => handleCopy("1088183168")} className="text-amber-500 hover:text-white transition-colors"><Icons.Copy /></button>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                <span>Email: pagos@institutolael.cl</span>
                <button onClick={() => handleCopy("pagos@institutolael.cl")} className="text-amber-500 hover:text-white transition-colors"><Icons.Copy /></button>
              </div>
            </div>

            <a href={linkWsp} target="_blank" rel="noreferrer" className="w-full py-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all shadow-2xl shadow-emerald-600/20 uppercase tracking-widest text-[10px]">
              <Icons.Whatsapp /> Enviar Comprobante Ahora
            </a>

            <Link to="/" className="block text-center mt-10 text-slate-500 hover:text-white transition-colors uppercase text-[10px] font-black tracking-[.3em]">Regresar al Home</Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="enroll-page min-h-screen pt-40 pb-32 bg-[#050505] selection:bg-amber-500/30">
      <Toast msg={toastMsg} />

      <div className="container max-w-7xl mx-auto px-6">

        {/* PROGRESS HUD */}
        <div className="mb-20">
          <div className="flex justify-between mb-4">
            {[
              { step: 1, label: "Datos Personales" },
              { step: 2, label: "Detalle Académico" },
              { step: 3, label: "Finalizar & Pago" }
            ].map((s) => (
              <div key={s.step} className={`flex flex-col items-center gap-3 transition-all duration-500 ${currentStep >= s.step ? 'opacity-100' : 'opacity-30'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs ${currentStep === s.step ? 'bg-amber-500 text-slate-950 scale-125' : (currentStep > s.step ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white')}`}>
                  {currentStep > s.step ? <Icons.Check /> : s.step}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 hidden md:block">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "33.33%" }}
              animate={{ width: `${(currentStep / 3) * 100}%` }}
              className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
            />
          </div>
        </div>

        <div className="layout-grid grid lg:grid-cols-12 gap-12">

          {/* MAIN FORM AREA */}
          <main className="lg:col-span-8">
            <div className="bg-slate-900/50 border border-white/5 p-12 rounded-[3.5rem] backdrop-blur-3xl shadow-2xl overflow-hidden relative">
              <form onSubmit={handleSubmit}>

                {/* STEP 1: PERSONAL DATA */}
                {currentStep === 1 && (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-10 uppercase tracking-tighter">1. <span className="text-amber-500">Tus Datos</span></h2>

                    <div className="space-y-8">
                      <div className="input-group">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block mb-3 pl-1">Nombre Completo</label>
                        <div className="relative group">
                          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-amber-500 transition-colors"><Icons.User /></span>
                          <input type="text" name="fullName" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-white text-base focus:border-amber-500/50 focus:bg-white/5 transition-all outline-none" placeholder="Ingresa tu nombre" required value={form.fullName} onChange={handleChange} />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="input-group">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block mb-3 pl-1">RUT (Sin puntos)</label>
                          <input type="text" name="rut" className={`w-full bg-white/[0.03] border ${errors.rut ? 'border-red-500' : 'border-white/10'} rounded-2xl py-5 px-8 text-white text-base focus:border-amber-500/50 focus:bg-white/5 transition-all outline-none`} placeholder="12345678-9" required value={form.rut} onChange={handleChange} />
                          {errors.rut && <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-2 flex items-center gap-1 ml-2"><Icons.Alert /> {errors.rut}</span>}
                        </div>
                        <div className="input-group">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block mb-3 pl-1">WhatsApp</label>
                          <input type="tel" name="phone" className={`w-full bg-white/[0.03] border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-2xl py-5 px-8 text-white text-base focus:border-amber-500/50 focus:bg-white/5 transition-all outline-none`} placeholder="+56 9..." required value={form.phone} onChange={handleChange} />
                          {errors.phone && <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-2 flex items-center gap-1 ml-2"><Icons.Alert /> {errors.phone}</span>}
                        </div>
                      </div>

                      <div className="input-group">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block mb-3 pl-1">Correo Electrónico</label>
                        <input type="email" name="email" className={`w-full bg-white/[0.03] border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-2xl py-5 px-8 text-white text-base focus:border-amber-500/50 focus:bg-white/5 transition-all outline-none`} placeholder="tu@email.com" required value={form.email} onChange={handleChange} />
                        {errors.email && <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-2 flex items-center gap-1 ml-2"><Icons.Alert /> {errors.email}</span>}
                      </div>
                    </div>

                    <button type="button" onClick={nextStep} disabled={!isStep1Valid()} className={`w-full mt-12 py-6 ${isStep1Valid() ? 'bg-white text-slate-950' : 'bg-white/10 text-white/30 cursor-not-allowed'} font-black rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-white/5 uppercase tracking-widest text-xs`}>
                      Continuar <FaArrowRight />
                    </button>
                  </motion.div>
                )}

                {/* STEP 2: ACADEMIC DETAILS */}
                {currentStep === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-10 uppercase tracking-tighter">2. <span className="text-amber-500">Tu Camino</span></h2>

                    <div className="space-y-10">
                      <div className="input-group">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block mb-6 pl-1">Selección Académica</label>
                        {cartItems.length > 0 ? (
                          <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-3xl shadow-2xl">
                            <div className="flex items-center gap-3 text-amber-500 font-black text-[10px] uppercase tracking-[0.3em] mb-8 border-b border-white/5 pb-4">
                              <Icons.Cart /> Resumen de Selección
                            </div>
                            <ul className="space-y-4">
                              {cartItems.map((item, i) => (
                                <li key={i} className="flex justify-between items-center bg-white/[0.03] p-6 rounded-2xl border border-white/5 group hover:border-amber-500/30 transition-all">
                                  <span className="text-white font-black text-base uppercase tracking-tight">{item.title}</span>
                                  <span className="text-slate-400 font-black text-sm tracking-tighter">{clp(item.price)}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-10 pt-8 border-t border-white/10 flex justify-between items-center">
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[.2em]">Total Matrícula</span>
                              <span className="text-5xl font-black text-amber-500 tracking-tighter shadow-amber-500/10 drop-shadow-2xl">{clp(total)}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="relative group">
                            <select name="program" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-8 text-white text-base focus:border-amber-500/50 focus:bg-white/5 transition-all outline-none appearance-none cursor-pointer" required value={form.program} onChange={handleChange}>
                              <option value="" className="bg-[#050505]">-- Elige tu Programa --</option>
                              <option value="PAES Anual" className="bg-[#050505]">PAES Anual 2026</option>
                              <option value="PAES Intensivo" className="bg-[#050505]">PAES Intensivo Invierno</option>
                              <option value="Escuela Adultos" className="bg-[#050505]">Escuela Adultos 2x1</option>
                              <option value="Ingles Flexible" className="bg-[#050505]">Inglés Flexible B2</option>
                            </select>
                            <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 group-hover:text-amber-500 transition-colors"><FaArrowRight className="rotate-90" /></div>
                          </div>
                        )}
                      </div>

                      <div className="input-group">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block mb-3 pl-1">Mensaje o Dudas (Opcional)</label>
                        <textarea name="comments" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-6 px-8 text-white text-base focus:border-amber-500/50 focus:bg-white/5 transition-all outline-none resize-none h-40" placeholder="Cuéntanos si tienes alguna necesidad especial..." value={form.comments} onChange={handleChange}></textarea>
                      </div>
                    </div>

                    <div className="flex gap-6 mt-12">
                      <button type="button" onClick={prevStep} className="px-10 py-6 bg-white/5 border border-white/10 text-white font-black rounded-2xl uppercase text-[10px] tracking-[.3em] hover:bg-white/10 transition-all flex-1">Volver</button>
                      <button type="submit" className={`px-12 py-6 bg-amber-500 text-slate-950 font-black rounded-2xl flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-amber-500/20 flex-[2] uppercase tracking-widest text-xs ${status === 'loading' ? 'opacity-70 cursor-wait' : ''}`} disabled={status === 'loading'}>
                        {status === 'loading' ? <span className="animate-spin text-xl"><Icons.Check /></span> : (
                          <>Finalizar & Enviar <FaLock size={12} /></>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

              </form>
            </div>
          </main>

          {/* SIDEBAR: TRUST & BANK */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-32 space-y-8">

              {/* Bank Card Helper */}
              <div className="bg-slate-900 border border-white/10 p-8 rounded-[3rem] shadow-2xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
                <h3 className="text-xl font-black text-white mb-6 relative z-10 uppercase tracking-tight">Depósito Directo</h3>
                <div className="relative z-10">
                  <BankCard onCopy={handleCopy} />
                </div>
                <div className="mt-8 text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 relative z-10">
                  <FaShieldAlt className="text-emerald-500" /> Transacción Segura
                </div>
              </div>

              {/* Secure Trust */}
              <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center text-3xl text-amber-500">
                  <FaLock />
                </div>
                <div>
                  <h4 className="text-white font-black text-sm uppercase tracking-tight">Privacidad 256-bit</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-bold">Tus datos están protegidos bajo protocolos de seguridad bancaria.</p>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

// NO embedded CSS anymore, everything is Tailwind