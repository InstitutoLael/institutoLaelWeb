
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaUniversity } from 'react-icons/fa';
import { Wallet } from '@mercadopago/sdk-react';
import Button from '../ui/Button';

export default function PaymentGateway({ 
  paymentMethod, 
  setPaymentMethod, 
  onFinalize, 
  loading, 
  preferenceId, 
  acceptedTerms, 
  setAcceptedTerms 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 backdrop-blur-3xl">
        <h2 className="text-2xl font-black uppercase tracking-tight mb-8">Paso 3: Método de Pago</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <button
            onClick={() => setPaymentMethod('mercadopago')}
            className={`flex items-center gap-4 p-6 rounded-3xl border-2 transition-all ${paymentMethod === 'mercadopago' ? 'bg-indigo-500/10 border-indigo-500 shadow-xl' : 'bg-white/5 border-transparent opacity-60'}`}
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <FaCreditCard size={20} />
            </div>
            <div className="text-left">
              <span className="block font-black uppercase tracking-widest text-[10px] text-white">Mercado Pago</span>
              <span className="text-slate-500 text-[10px]">Crédito / Débito</span>
            </div>
          </button>

          <button
            onClick={() => setPaymentMethod('transfer')}
            className={`flex items-center gap-4 p-6 rounded-3xl border-2 transition-all ${paymentMethod === 'transfer' ? 'bg-amber-500/10 border-amber-500 shadow-xl' : 'bg-white/5 border-transparent opacity-60'}`}
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500">
              <FaUniversity size={20} />
            </div>
            <div className="text-left">
              <span className="block font-black uppercase tracking-widest text-[10px] text-white">Pagar Después</span>
              <span className="text-slate-500 text-[10px]">Transferencia / Agencia</span>
            </div>
          </button>
        </div>

        {preferenceId ? (
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center">
            <p className="text-slate-400 text-sm mb-6">Paga de forma segura con el procesador oficial:</p>
            <div className="max-w-[280px] mx-auto">
              <Wallet initialization={{ preferenceId }} />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* LEGAL CHECKBOX */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="relative flex items-center mt-1">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                  />
                  <div className="w-6 h-6 border-2 border-white/10 rounded-lg group-hover:border-indigo-500 transition-colors peer-checked:bg-indigo-600 peer-checked:border-indigo-600 flex items-center justify-center">
                    <svg className={`w-4 h-4 text-white transition-opacity ${acceptedTerms ? 'opacity-100' : 'opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="text-[11px] leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">
                  He leído y acepto los <a href="/terminos" target="_blank" className="text-indigo-400 hover:underline">Términos y Condiciones</a> y la <a href="/privacidad" target="_blank" className="text-indigo-400 hover:underline">Política de Privacidad</a> del Instituto Lael.
                </span>
              </label>
            </div>

            <Button
              onClick={onFinalize}
              variant={acceptedTerms ? (paymentMethod === 'mercadopago' ? 'primary' : 'amber') : 'ghost'}
              className="w-full"
              disabled={loading || !acceptedTerms}
              loading={loading}
            >
              {paymentMethod === 'mercadopago' ? 'Generar Pago Mercado Pago' : 'Finalizar Reserva de Cupo'}
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
