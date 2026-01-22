import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaCreditCard, FaUniversity, FaWhatsapp, FaCheckCircle, FaArrowLeft, FaShieldAlt } from "react-icons/fa";

const clp = (n) => Number(n || 0).toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

export default function Checkout() {
    const { cart, clearCart } = useCart();
    const { user, profile } = useAuth();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState("transfer");
    const [loading, setLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(null);

    const total = cart.reduce((acc, item) => acc + item.price, 0);

    useEffect(() => {
        if (cart.length === 0 && !orderSuccess) {
            navigate("/");
        }
    }, [cart, navigate, orderSuccess]);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            // 1. Create Order
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert({
                    user_id: user.id,
                    total_amount: total,
                    payment_method: paymentMethod,
                    status: paymentMethod === 'transfer' ? 'pending' : 'pending' // For MP we would wait for callback
                })
                .select()
                .single();

            if (orderError) throw orderError;

            // 2. Create Order Items
            const items = cart.map(item => ({
                order_id: order.id,
                product_id: item.db_id || null, // Assuming we store db_id in cart items during refactor
                price_at_purchase: item.price
            }));

            // Filter out items without proper db_id if we want strictness, 
            // but for custom plans we might need another approach or generic product
            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(items.filter(i => i.product_id !== null));

            if (itemsError) throw itemsError;

            // 3. Automated Inscription
            const inscriptions = cart.map(item => ({
                user_id: user.id,
                product_id: item.db_id,
                order_id: order.id,
                active: paymentMethod === 'mercadopago' // Active immediately if MP (simulated), else pending verification
            }));

            const { error: insError } = await supabase
                .from('inscriptions')
                .insert(inscriptions.filter(i => i.product_id !== null));

            if (insError) throw insError;

            // 4. Clear Cart & Success
            setOrderSuccess(order);
            clearCart();

            if (paymentMethod === 'mercadopago') {
                // Simulate redirect to Mercado Pago
                window.open("https://www.mercadopago.cl/", "_blank");
            }

        } catch (err) {
            console.error("Checkout error:", err);
            alert("Hubo un error al procesar tu orden. Por favor intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-6">
                <div className="max-w-2xl mx-auto bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-12 text-center backdrop-blur-3xl shadow-2xl">
                    <FaCheckCircle className="text-emerald-500 text-7xl mx-auto mb-8" />
                    <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">¡Orden Generada!</h1>
                    <p className="text-slate-400 text-lg mb-10">Tu número de orden es: <span className="text-white font-mono">{orderSuccess.id.slice(0, 8)}</span></p>

                    {paymentMethod === 'transfer' ? (
                        <div className="bg-white/5 rounded-3xl p-8 mb-10 text-left border border-white/5">
                            <h3 className="font-black text-white mb-4 uppercase tracking-widest text-xs flex items-center gap-2">
                                <FaUniversity className="text-indigo-400" /> Datos de Transferencia
                            </h3>
                            <div className="space-y-3 text-slate-300">
                                <p><strong>Banco:</strong> Banco Estado</p>
                                <p><strong>Tipo Cuenta:</strong> Chequera Electrónica</p>
                                <p><strong>Número:</strong> 123456789</p>
                                <p><strong>RUT:</strong> 76.543.210-K</p>
                                <p><strong>Nombre:</strong> Instituto Lael SpA</p>
                                <p><strong>Email:</strong> pagos@institutolael.cl</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-slate-400 mb-10 font-medium italic">Serás procesado mediante Mercado Pago una vez verifiquemos tu sesión.</p>
                    )}

                    <div className="flex flex-col gap-4">
                        <a
                            href={`https://wa.me/56964626568?text=Hola! He realizado la orden ${orderSuccess.id.slice(0, 8)} por un total de ${clp(total)}. Adjunto comprobante.`}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full py-5 bg-emerald-600 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-emerald-500 transition-all uppercase tracking-widest text-xs shadow-xl shadow-emerald-600/20"
                        >
                            <FaWhatsapp className="text-xl" /> Enviar Comprobante
                        </a>
                        <Link to="/aula" className="w-full py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-xs">
                            Ir a mi Aula
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* LADO IZQUIERDO: RESUMEN Y MÉTODOS */}
                <div className="lg:col-span-8 space-y-8">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
                        <FaArrowLeft /> Volver
                    </button>

                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Finalizar <span className="text-indigo-500">Inscripción</span></h1>

                    <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-3xl">
                        <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm">1</span>
                            Tus Programas
                        </h2>
                        <div className="space-y-4">
                            {cart.map((item, i) => (
                                <div key={i} className="flex justify-between items-center bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <div>
                                        <h4 className="font-bold text-lg text-white">{item.title}</h4>
                                        <p className="text-slate-500 text-xs">{item.detail}</p>
                                    </div>
                                    <span className="font-black text-xl">{clp(item.price)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-3xl">
                        <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm">2</span>
                            Método de Pago
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className={`flex items-center gap-4 p-6 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'transfer' ? 'bg-indigo-500/10 border-indigo-500' : 'bg-white/5 border-white/5 hover:border-white/20'}`}>
                                <input type="radio" name="payment" value="transfer" checked={paymentMethod === 'transfer'} onChange={() => setPaymentMethod('transfer')} className="hidden" />
                                <FaUniversity className={`text-2xl ${paymentMethod === 'transfer' ? 'text-indigo-400' : 'text-slate-500'}`} />
                                <div className="text-left">
                                    <span className="block font-black uppercase tracking-widest text-[10px] text-white">Transferencia Bancaria</span>
                                    <span className="text-slate-500 text-[10px]">Manual / App Banco</span>
                                </div>
                            </label>
                            <label className={`flex items-center gap-4 p-6 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'mercadopago' ? 'bg-indigo-500/10 border-indigo-500' : 'bg-white/5 border-white/5 hover:border-white/20'}`}>
                                <input type="radio" name="payment" value="mercadopago" checked={paymentMethod === 'mercadopago'} onChange={() => setPaymentMethod('mercadopago')} className="hidden" />
                                <FaCreditCard className={`text-2xl ${paymentMethod === 'mercadopago' ? 'text-indigo-400' : 'text-slate-500'}`} />
                                <div className="text-left">
                                    <span className="block font-black uppercase tracking-widest text-[10px] text-white">Mercado Pago</span>
                                    <span className="text-slate-500 text-[10px]">Débito / Crédito / Cuotas</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* LADO DERECHO: TICKET TOTAL */}
                <div className="lg:col-span-4 lg:pt-24">
                    <div className="sticky top-24 bg-[#0a0a0b] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-3xl" />

                        <div className="relative z-10 text-center">
                            <span className="font-black uppercase tracking-widest text-[10px] text-slate-500 mb-8 block">Total de la Inversión</span>
                            <div className="text-5xl font-black text-white tracking-tighter mb-4">{clp(total)}</div>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest border-t border-white/5 pt-6 mb-10">Calculado para {profile?.full_name || 'Estudiante'}</p>

                            <button
                                onClick={handleCheckout}
                                disabled={loading || cart.length === 0}
                                className="w-full py-6 bg-white text-slate-950 font-black rounded-2xl hover:bg-indigo-50 transition-all shadow-xl shadow-white/10 flex items-center justify-center gap-3 uppercase tracking-widest text-xs disabled:opacity-50"
                            >
                                {loading ? 'Procesando...' : (
                                    <>
                                        Completar Compra <FaArrowRight />
                                    </>
                                )}
                            </button>

                            <p className="mt-6 text-[10px] text-slate-600 flex items-center justify-center gap-2">
                                <FaShieldAlt className="text-indigo-500" /> Transacción segura SSL
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
