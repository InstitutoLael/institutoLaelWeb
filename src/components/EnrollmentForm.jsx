import React, { useState } from 'react';
import { 
  X, User, Mail, Phone, CreditCard, 
  CheckCircle, Loader2, ArrowRight, ShieldCheck, FileText 
} from 'lucide-react';

// 🔴 TU URL DE CLOUDFLARE (Reemplázala cuando hagas deploy)
const API_URL = "https://instituto-lael-web.contacto-c10.workers.dev"; 

export default function EnrollmentForm({ planTitle, price, selectedDetails, onClose }) {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
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
      comments: `Detalle: ${selectedDetails} | Monto: ${price}`
    };

    try {
      const response = await fetch(`${API_URL}/inscribir`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        throw new Error("Error en el servidor");
      }
    } catch (error) {
      console.error(error);
      setStatus("error"); // Podrías manejar un mensaje de error aquí
    }
  };

  // --- VISTA DE ÉXITO (POST-ENVÍO) ---
  if (status === "success") {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md transition-all duration-300">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300">
          
          {/* Header de Éxito */}
          <div className="bg-green-50 p-8 text-center border-b border-green-100">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <CheckCircle size={40} strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">¡Cupo Reservado!</h2>
            <p className="text-green-700 mt-2 font-medium">
              Ya estás a un paso de comenzar.
            </p>
          </div>

          {/* Cuerpo: Instrucciones de Pago */}
          <div className="p-8 space-y-6">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-3 text-sm">
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="text-gray-500">Plan Seleccionado</span>
                <span className="font-bold text-gray-800">{planTitle}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="text-gray-500">Total a Pagar</span>
                <span className="font-bold text-rose-600">{price}</span>
              </div>
            </div>

            <div className="space-y-3">
              <a 
                href="#" // AQUÍ PONES TU LINK DE WEBPAY / MERCADOPAGO
                target="_blank"
                rel="noreferrer"
                className="group w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <CreditCard size={20} className="text-gray-300 group-hover:text-white transition-colors"/>
                Pagar Ahora (Webpay/Tarjeta)
              </a>
              
              <button 
                onClick={onClose}
                className="w-full py-3 bg-white text-gray-600 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Pagaré más tarde (Cerrar)
              </button>
            </div>
            
            <p className="text-xs text-center text-gray-400">
              Te hemos enviado un correo con estos datos.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- VISTA DE FORMULARIO (ENTRADA) ---
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/70 backdrop-blur-sm transition-all duration-300">
      
      {/* Tarjeta Principal */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative overflow-hidden animate-in fade-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        
        {/* Botón Cerrar Flotante */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 bg-gray-100/50 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition z-10"
        >
          <X size={20} />
        </button>

        {/* Header Visual */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 sm:p-8 text-white">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-widest mb-2">
            <ShieldCheck size={14} />
            Matrícula Segura 2026
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
            Comienza tu camino en <span className="text-rose-400">{planTitle}</span>
          </h2>
        </div>

        {/* Contenido Scrollable si es muy bajo */}
        <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Input Group: Nombre */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Nombre Completo</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  required 
                  name="fullName" 
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all font-medium text-gray-800 placeholder-gray-400" 
                  placeholder="Ej: Sofía Valdés" 
                />
              </div>
            </div>

            {/* Grid RUT + Teléfono */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">RUT</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    required 
                    name="rut" 
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all font-medium text-gray-800 placeholder-gray-400" 
                    placeholder="12.345.678-9" 
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Teléfono</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    required 
                    name="phone" 
                    type="tel" 
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all font-medium text-gray-800 placeholder-gray-400" 
                    placeholder="+569..." 
                  />
                </div>
              </div>
            </div>

            {/* Input Group: Email */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  required 
                  name="email" 
                  type="email" 
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all font-medium text-gray-800 placeholder-gray-400" 
                  placeholder="hola@ejemplo.com" 
                />
              </div>
            </div>

            {/* Resumen de Precio */}
            <div className="mt-6 p-4 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-rose-600 font-bold uppercase mb-0.5">Total a Pagar</p>
                <p className="text-sm text-rose-800 opacity-80 leading-none">{selectedDetails.substring(0, 25)}...</p>
              </div>
              <div className="text-2xl font-extrabold text-rose-600 tracking-tight">
                {price}
              </div>
            </div>

            {/* Botón de Acción Principal */}
            <button 
              type="submit" 
              disabled={status === "loading"}
              className="w-full py-4 bg-gray-900 text-white font-bold text-lg rounded-xl shadow-lg shadow-gray-900/20 hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  Confirmar Inscripción
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            
            <p className="text-xs text-center text-gray-400 mt-4">
              Al confirmar, aceptas nuestros términos y condiciones.
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}