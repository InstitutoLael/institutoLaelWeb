import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaWhatsapp, FaCreditCard, FaUser, FaEnvelope, FaPhone, FaCheckCircle, FaSpinner } from "react-icons/fa";
import { supabase } from "../../lib/supabaseClient";
import toast from "react-hot-toast";

import { formatRUT, formatPhone } from "../../utils/formatters";

export default function EnrollmentModal({ isOpen, onClose, plan }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    rut: "",
    interest_pay: false
  });
  const [success, setSuccess] = useState(false);

  if (!plan) return null;

  const handleRUTChange = (e) => {
    setFormData({ ...formData, rut: formatRUT(e.target.value) });
  };

  const handlePhoneChange = (e) => {
    setFormData({ ...formData, phone: formatPhone(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const leadData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      rut: formData.rut,
      plan_id: plan.id,
      plan_name: plan.name,
      interest_pay: formData.interest_pay,
      type: 'enrollment',
      created_at: new Date().toISOString()
    };

    // Timeout protection: 15 seconds
    const timeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("La base de datos no respondió a tiempo. Revisa tu conexión.")), 15000)
    );

    try {
      console.log("Submitting leadData:", leadData);
      
      const submitPromise = supabase.from("leads").insert([leadData]);
      const { error } = await Promise.race([submitPromise, timeout]);

      if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message || "Error al guardar los datos en Supabase.");
      }

      setSuccess(true);
      toast.success("¡Inscripción recibida con éxito!");
      
      if (formData.interest_pay) {
        if (plan.paymentUrl) {
          toast.loading("Redirigiendo al pago...");
          setTimeout(() => {
            window.location.href = plan.paymentUrl;
          }, 2000);
        } else {
          toast("El link de pago se enviará por WhatsApp", { icon: '📱' });
        }
      }
      
      // Auto close after success if not redirecting
      if (!formData.interest_pay || !plan.paymentUrl) {
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setFormData({ name: "", email: "", phone: "", rut: "", interest_pay: false });
        }, 3000);
      }
    } catch (error) {
      console.error("Error saving lead:", error);
      toast.error(error.message || "Error al procesar tu solicitud. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-slate-900 border border-white/10 w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 pb-4 flex justify-between items-start">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-2 block">
                  Proceso de Matrícula
                </span>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                  {plan.name}
                </h2>
                <p className="text-slate-400 text-sm mt-1">Completa tus datos para asegurar tu cupo.</p>
              </div>
              <button
                onClick={onClose}
                className="p-3 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Content Switcher: Form or Success */}
            <AnimatePresence mode="wait">
              {!success ? (
                <motion.form
                  key="enroll-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="p-8 pt-4 space-y-6"
                >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Nombre Completo</label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      required
                      type="text"
                      placeholder="Ej: Juan Pérez"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-indigo-500 transition-all outline-none"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">RUT (Opcional)</label>
                  <input
                    type="text"
                    placeholder="12.345.678-9"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-indigo-500 transition-all outline-none"
                    value={formData.rut}
                    onChange={handleRUTChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      required
                      type="email"
                      placeholder="tu@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-indigo-500 transition-all outline-none"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Teléfono</label>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      required
                      type="tel"
                      placeholder="+56 9"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-indigo-500 transition-all outline-none"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Intent Toggle */}
              <div 
                onClick={() => setFormData({...formData, interest_pay: !formData.interest_pay})}
                className={`p-6 rounded-3xl border cursor-pointer transition-all flex items-center gap-4 ${
                  formData.interest_pay ? "bg-indigo-600/20 border-indigo-500" : "bg-white/5 border-white/10 hover:border-white/20"
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  formData.interest_pay ? "bg-indigo-500 border-indigo-500" : "border-slate-600"
                }`}>
                  {formData.interest_pay && <FaCheckCircle className="text-white" size={14} />}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white uppercase tracking-widest">¿Deseas pagar la matrícula ahora?</h4>
                  <p className="text-xs text-slate-400 mt-1">Habilita la redirección inmediata a Webpay/MercadoPago.</p>
                </div>
                <FaCreditCard className={formData.interest_pay ? "text-indigo-400" : "text-slate-600"} size={24} />
              </div>

              {/* Submit Button */}
              <button
                disabled={loading}
                type="submit"
                className="w-full py-6 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-[0.3em] rounded-[2rem] shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
              >
                {loading ? <FaSpinner className="animate-spin" /> : "Finalizar Inscripción"}
              </button>

              <p className="text-[9px] text-center text-slate-500 uppercase font-black tracking-widest">
                Tus datos están protegidos bajo nuestras políticas de privacidad.
              </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success-view"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-12 text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20">
                    <FaCheckCircle className="text-emerald-500 text-4xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">¡Todo listo!</h3>
                    <p className="text-slate-400 text-sm">
                      {formData.interest_pay && plan.paymentUrl 
                        ? "Te estamos redirigiendo a la pasarela de pago segura..." 
                        : "Hemos recibido tu información. Un coordinador te contactará a la brevedad."}
                    </p>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={onClose}
                      className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all"
                    >
                      Cerrar Ventana
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
