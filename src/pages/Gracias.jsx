import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle, FaWhatsapp, FaUniversity, FaArrowRight, FaBookOpen } from "react-icons/fa";

const clp = (n) => Number(n || 0).toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

export default function Gracias() {
  const location = useLocation();
  const { order, total, paymentMethod } = location.state || {};

  // Si no hay datos, mostrar algo genérico o redirigir
  const orderId = order?.id?.slice(0, 8) || "N/A";
  const amount = total || 0;

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto relative z-10"
      >
        <div className="bg-white/[0.02] border border-white/10 rounded-[3.5rem] p-12 text-center backdrop-blur-3xl shadow-2xl">
          <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/20">
            <FaCheckCircle className="text-emerald-500 text-5xl" />
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">¡Bienvenido a <br /><span className="text-indigo-500">La Revolución!</span></h1>
          <p className="text-slate-400 text-lg mb-10 font-medium">Hemos recibido tu solicitud de inscripción de forma correcta.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/5 p-6 rounded-3xl border border-white/5 text-left">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">ID de Orden</span>
              <span className="text-xl font-mono text-white">#{orderId}</span>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/5 text-left">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Total Confirmado</span>
              <span className="text-xl font-black text-emerald-400">{clp(amount)}</span>
            </div>
          </div>

          {paymentMethod === 'transfer' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-indigo-600/10 rounded-[2.5rem] p-8 mb-12 text-left border border-indigo-500/20"
            >
              <h3 className="font-black text-white mb-6 uppercase tracking-widest text-xs flex items-center gap-3">
                <FaUniversity className="text-indigo-400 text-lg" /> Próximo Paso: Transferencia
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Banco</span>
                  <span className="text-white font-bold">Banco Estado</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Tipo Cuenta</span>
                  <span className="text-white font-bold">Chequera Electrónica</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Número</span>
                  <span className="text-white font-bold">123456789</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">RUT</span>
                  <span className="text-white font-bold">76.543.210-K</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Nombre</span>
                  <span className="text-white font-bold">Instituto Lael SpA</span>
                </div>
              </div>
            </motion.div>
          )}

          <div className="space-y-4">
            <a
              href={`https://wa.me/56964626568?text=Hola! He realizado la orden #${orderId} por ${clp(amount)}. Adjunto el comprobante de pago.`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-6 bg-emerald-600 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-emerald-500 transition-all uppercase tracking-widest text-xs shadow-xl shadow-emerald-600/20"
            >
              <FaWhatsapp className="text-xl" /> Enviar Comprobante por WhatsApp
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/aula" className="py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                <FaBookOpen /> Ir a mi Aula
              </Link>
              <Link to="/" className="py-5 bg-white text-slate-950 font-black rounded-2xl hover:bg-slate-100 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                Volver al Inicio <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}