import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaTimes, FaTrashAlt, FaArrowRight, FaShoppingBag,
    FaLock, FaRocket, FaShieldAlt, FaUniversity, FaCreditCard, FaCopy
} from "react-icons/fa";
import { MdEmail, MdWhatsapp } from "react-icons/md";

export default function CartDrawer() {
    const { cart, removeFromCart, clearCart, cartTotal, formatPrice, isCartOpen, closeCart } = useCart();
    const navigate = useNavigate();
    const drawerRef = useRef(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [copiedField, setCopiedField] = useState(null);

    // Close on ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") closeCart();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [closeCart]);

    const handleCheckout = () => {
        setIsPaymentModalOpen(true);
    };

    const handleCopy = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const getWappLink = () => {
        const items = cart.map(i => i.title).join(", ");
        const text = `Hola! 👋 Realicé mi inscripción en Instituto Lael para: ${items}. Adjunto mi comprobante por el total de ${formatPrice(cartTotal)}.`;
        return `https://wa.me/56964626568?text=${encodeURIComponent(text)}`;
    };

    const getMailLink = () => {
        const items = cart.map(i => i.title).join(", ");
        const subject = encodeURIComponent("Comprobante de Pago - Instituto Lael");
        const body = encodeURIComponent(`Hola!\n\nAdjunto mi comprobante de transferencia por la inscripción de: ${items}.\n\nTotal: ${formatPrice(cartTotal)}`);
        return `mailto:pagos@institutolael.cl?subject=${subject}&body=${body}`;
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* BACKDROP */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
                    />

                    {/* PANEL */}
                    <motion.aside
                        ref={drawerRef}
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#09090b]/95 backdrop-blur-2xl border-l border-white/10 z-[110] flex flex-col shadow-2xl"
                    >
                        {/* HEADER */}
                        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-amber-500 rounded-2xl text-slate-950 shadow-lg shadow-amber-500/20">
                                    <FaShoppingBag size={20} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-white uppercase tracking-tighter">Tu Mochila</h2>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{cart.length} Cursos seleccionados</p>
                                </div>
                            </div>
                            <button
                                onClick={closeCart}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all transform hover:rotate-90"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>

                        {/* BODY */}
                        <div className="flex-1 overflow-y-auto px-8 py-10">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-5xl mb-6">🎒</div>
                                    <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">Mochila Vacía</h3>
                                    <p className="text-sm text-slate-400 max-w-[200px] leading-relaxed">Aún no has elegido tu camino. Explora nuestra oferta académica.</p>
                                    <button
                                        onClick={closeCart}
                                        className="mt-8 px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all"
                                    >
                                        Ver Programas
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {cart.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="group relative p-6 bg-white/[0.03] border border-white/5 rounded-3xl hover:bg-white/[0.06] hover:border-white/10 transition-all"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex-1">
                                                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest block mb-1">
                                                        {item.type || 'Programa Académico'}
                                                    </span>
                                                    <h4 className="text-lg font-black text-white leading-tight uppercase tracking-tight group-hover:text-amber-400 transition-colors">
                                                        {item.title}
                                                    </h4>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                                >
                                                    <FaTrashAlt size={14} />
                                                </button>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-2xl font-black text-white tracking-tighter">
                                                    {formatPrice(item.price)}
                                                </div>
                                                <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold uppercase">
                                                    <FaRocket className="text-amber-500/50" /> Cupo Asegurado
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* FOOTER */}
                        {cart.length > 0 && (
                            <div className="p-8 bg-black/40 border-t border-white/5 backdrop-blur-3xl">
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center text-slate-400 text-sm">
                                        <span>Subtotal</span>
                                        <span className="font-mono">{formatPrice(cartTotal)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-slate-400 text-sm">
                                        <span>Matrícula Digital</span>
                                        <span className="text-emerald-500 font-bold uppercase text-[10px] tracking-widest">Gratis</span>
                                    </div>
                                    <div className="h-px bg-white/5 w-full"></div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white font-black uppercase tracking-tighter text-lg">Total Final</span>
                                        <span className="text-3xl font-black text-amber-500 tracking-tighter">{formatPrice(cartTotal)}</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={() => {
                                            handleCheckout();
                                            if (window.gtag) {
                                                window.gtag('event', 'begin_checkout_transfer', {
                                                    'event_category': 'Sales',
                                                    'event_label': 'Tu Mochila'
                                                });
                                            }
                                        }}
                                        className="w-full py-6 bg-amber-500 text-slate-950 font-black rounded-2xl text-lg flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(245,158,11,0.2)] hover:scale-[1.02] active:scale-95 transition-all group overflow-hidden relative"
                                    >
                                        {/* Shine effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                                        <span>Pagar Matrícula</span>
                                        <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                                    </button>

                                    <div className="flex justify-center items-center gap-6 mt-6">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                            <FaShieldAlt className="text-emerald-500" /> WebPay Secure
                                        </div>
                                        <div className="w-px h-3 bg-white/10"></div>
                                        <button
                                            onClick={clearCart}
                                            className="text-[10px] font-bold text-slate-600 hover:text-red-400 uppercase tracking-widest transition-colors"
                                        >
                                            Vaciar Mochila
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.aside>
                </>
            )}

            {/* PAYMENT MODAL */}
            <AnimatePresence>
                {isPaymentModalOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsPaymentModalOpen(false)}
                            className="absolute inset-0 bg-[#020617]/80 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-[#09090b] border border-white/10 w-full max-w-lg rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="p-8 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-500">
                                        <FaCreditCard />
                                    </div>
                                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">Finalizar Inscripción</h3>
                                </div>
                                <button
                                    onClick={() => setIsPaymentModalOpen(false)}
                                    className="text-slate-500 hover:text-white transition-colors"
                                >
                                    <FaTimes size={20} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-8 space-y-8">
                                <div className="text-center">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Total a Transferir</span>
                                    <div className="text-5xl font-black text-amber-500 tracking-tighter shadow-amber-500/10 drop-shadow-2xl">
                                        {formatPrice(cartTotal)}
                                    </div>
                                </div>

                                <div className="bg-white/[0.03] border border-white/5 rounded-[2rem] p-6 space-y-4">
                                    <h4 className="text-[10px] font-black text-white px-2 uppercase tracking-widest flex items-center gap-2">
                                        <FaUniversity className="text-amber-500" /> Datos de Transferencia
                                    </h4>

                                    <div className="space-y-2">
                                        {[
                                            { label: "Banco", value: "Banco Estado", field: "banco" },
                                            { label: "Tipo", value: "Cuenta RUT / Vista", field: "tipo" },
                                            { label: "Número", value: "12345678-9", field: "numero" },
                                            { label: "RUT", value: "78.084.019-6", field: "rut" },
                                            { label: "Email", value: "pagos@institutolael.cl", field: "email" }
                                        ].map((item) => (
                                            <div key={item.field} className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/5 group hover:border-white/10 transition-all">
                                                <div>
                                                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest block">{item.label}</span>
                                                    <span className="text-sm font-bold text-slate-200">{item.value}</span>
                                                </div>
                                                <button
                                                    onClick={() => handleCopy(item.value, item.field)}
                                                    className={`p-2 rounded-lg transition-all ${copiedField === item.field ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-500 hover:text-white'}`}
                                                >
                                                    {copiedField === item.field ? <span className="text-[10px] font-black px-1">Copiado</span> : <FaCopy size={12} />}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <a
                                        href={getWappLink()}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/10 transition-all active:scale-95"
                                    >
                                        <MdWhatsapp className="text-lg" /> Enviar WhatsApp
                                    </a>
                                    <a
                                        href={getMailLink()}
                                        className="py-5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95"
                                    >
                                        <MdEmail className="text-lg" /> Enviar por Mail
                                    </a>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="px-8 pb-8 text-center">
                                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest leading-relaxed">
                                    Tu inscripción será confirmada manualmente una vez recibido el comprobante.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </AnimatePresence>
    );
}
