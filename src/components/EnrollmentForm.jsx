import React, { useState } from 'react';
import { 
  X, User, Mail, Phone, CreditCard, 
  CheckCircle, Loader2, ArrowRight, ShieldCheck, FileText 
} from 'lucide-react';

// ✅ HE PUESTO TU NUEVA URL AQUÍ (La que termina en ...juQiw8g/exec)
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
      // Usamos no-cors / text-plain para evitar bloqueos
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
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300">
          <div className="bg-green-50 p-8 text-center border-b border-green-100">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <CheckCircle size={40} strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">¡Inscripción Enviada!</h2>
            <p className="text-green-700 mt-2 font-medium">Tus datos ya están en nuestro sistema.</p>
          </div>
          <div className="p-8 space-y-4">
             <button onClick={onClose} className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors">Cerrar y Volver</button>
          </div>
        </div>
      </div>
    );
  }

  // --- VISTA DE ERROR ---
  if (status === "error") {
    return (
       <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-gray-900">Algo salió mal</h3>
            <p className="text-gray-500 mt-2 mb-6">No pudimos conectar con el servidor.</p>
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 py-3 border border-gray-200 rounded-xl font-semibold">Cancelar</button>
              <button onClick={() => setStatus('idle')} className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-bold">Reintentar</button>
            </div>
        </div>
       </div>
    )
  }

  // --- VISTA DE FORMULARIO ---
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/70 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative overflow-hidden animate-in fade-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100/50 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition z-10">
          <X size={20} />
        </button>

        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 sm:p-8 text-white">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-widest mb-2">
            <ShieldCheck size={14} />
            Matrícula Segura 2026
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
            Inscripción a <span className="text-rose-400">{planTitle}</span>
          </h2>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* CAMPOS DEL FORMULARIO */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Nombre Completo</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input required name="fullName" onChange={handleChange} className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all font-medium text-gray-800" placeholder="Ej: Sofía Valdés" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">RUT</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input required name="rut" onChange={handleChange} className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none" placeholder="12.345.678-9" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Teléfono</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input required name="phone" type="tel" onChange={handleChange} className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none" placeholder="+569..." />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input required name="email" type="email" onChange={handleChange} className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none" placeholder="hola@ejemplo.com" />
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-rose-600 font-bold uppercase mb-0.5">Total a Pagar</p>
                <p className="text-xs text-rose-800 opacity-80 leading-tight max-w-[200px]">{selectedDetails.split('.')[0]}</p>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-rose-600 tracking-tight">{price}</div>
            </div>

            <button type="submit" disabled={status === "loading"} className="w-full py-4 bg-gray-900 text-white font-bold text-lg rounded-xl shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2">
              {status === "loading" ? <Loader2 className="animate-spin" /> : <>Confirmar Inscripción <ArrowRight size={20} /></>}
            </button>
            <p className="text-xs text-center text-gray-400 mt-2">Al hacer clic, tus datos se enviarán de forma segura.</p>
          </form>
        </div>
      </div>
    </div>
  );
}