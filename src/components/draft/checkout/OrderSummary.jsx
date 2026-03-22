
import React from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaArrowRight } from 'react-icons/fa';
import Button from '../ui/Button';

const clp = (n) => Number(n || 0).toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

export default function OrderSummary({ cart, total, onRemove, onNext, onEditData }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 backdrop-blur-3xl">
        <div className="mb-8">
          <h2 className="text-2xl font-black uppercase tracking-tight">Paso 2: Revisión de Mochila</h2>
          <p className="text-slate-500 text-sm italic">Verifica tus cursos antes de proceder al pago.</p>
        </div>

        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {cart.map((item, i) => (
            <div key={i} className="flex justify-between items-center bg-white/5 p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex-1 mr-4">
                <h4 className="font-bold text-lg text-white mb-1">{item.title}</h4>
                <p className="text-slate-500 text-xs line-clamp-1">{item.detail}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-black text-xl text-white whitespace-nowrap">{clp(item.price)}</span>
                <button
                  onClick={() => onRemove(item.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  aria-label="Eliminar curso"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col md:flex-row gap-4">
          <Button 
            variant="outline" 
            onClick={onEditData}
            className="flex-1"
          >
            Editar Datos
          </Button>
          
          <Button 
            variant="primary"
            onClick={onNext}
            className="flex-[2]"
          >
            Paso Final: Pago <FaArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
