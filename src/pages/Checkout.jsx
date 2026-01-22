import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaShoppingCart, FaCreditCard, FaUniversity, FaWhatsapp,
    FaArrowLeft, FaShieldAlt, FaUser, FaLock, FaEnvelope,
    FaArrowRight, FaTrash, FaCheckCircle
} from "react-icons/fa";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

// Initialize MP with Env Variable
const MP_PUBLIC_KEY = import.meta.env.VITE_MP_PUBLIC_KEY;
if (MP_PUBLIC_KEY) {
    initMercadoPago(MP_PUBLIC_KEY, { locale: 'es-CL' });
}

const clp = (n) => Number(n || 0).toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

export default function Checkout() {
    const { cart, removeFromCart, clearCart } = useCart();
    const { user, profile, signIn, signUp } = useAuth();
    const navigate = useNavigate();

    // Steps: 'auth' | 'summary' | 'payment'
    const [step, setStep] = useState(user ? 'summary' : 'auth');
    const [paymentMethod, setPaymentMethod] = useState("transfer");
    const [loading, setLoading] = useState(false);
    const [preferenceId, setPreferenceId] = useState(null);

    // Auth Form State
    const [isLogin, setIsLogin] = useState(true);
    const [authForm, setAuthForm] = useState({ email: '', password: '', fullName: '' });
    const [authError, setAuthError] = useState("");

    const total = cart.reduce((acc, item) => acc + item.price, 0);

    // Redirect if cart is empty
    useEffect(() => {
        if (cart.length === 0) {
            navigate("/");
        }
    }, [cart, navigate]);

    // Update step if user logs in
    useEffect(() => {
        if (user && step === 'auth') {
            setStep('summary');
        }
    }, [user, step]);

    // Handle Auth
    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAuthError("");
        try {
            if (isLogin) {
                await signIn({ email: authForm.email, password: authForm.password });
            } else {
                await signUp({
                    email: authForm.email,
                    password: authForm.password,
                    fullName: authForm.fullName
                });
                setAuthError("¡Cuenta creada! Revisa tu email para confirmar.");
                setIsLogin(true);
            }
        } catch (err) {
            setAuthError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle Creation of Preference for Mercado Pago
    const createPreference = async (orderId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-mp-preference`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId,
                    items: cart.map(item => ({
                        title: item.title,
                        unit_price: item.price,
                        quantity: 1
                    })),
                    back_urls: {
                        success: `${window.location.origin}/gracias`,
                        failure: `${window.location.origin}/checkout`,
                        pending: `${window.location.origin}/gracias`
                    }
                })
            });
            const data = await response.json();
            if (data.id) setPreferenceId(data.id);
        } catch (err) {
            console.error("Error creating preference:", err);
        }
    };

    const handleFinalize = async () => {
        setLoading(true);
        try {
            // 1. Create Order
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert({
                    user_id: user.id,
                    total_amount: total,
                    payment_method: paymentMethod,
                    status: 'pending'
                })
                .select()
                .single();

            if (orderError) throw orderError;

            // 2. Insert Items
            const items = cart.map(item => ({
                order_id: order.id,
                product_id: item.db_id || null,
                price_at_purchase: item.price
            }));
            await supabase.from('order_items').insert(items);

            // 3. Logic based on method
            if (paymentMethod === 'transfer') {
                clearCart();
                navigate("/gracias", { state: { order, total, paymentMethod: 'transfer' } });
            } else {
                // Mercado Pago - We stay here to show the Wallet button or redirect
                await createPreference(order.id);
            }

        } catch (err) {
            console.error("Order error:", err);
            setAuthError("Error al procesar la orden.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 font-sans">
            <div className="container mx-auto max-w-6xl">

                {/* Header Flow */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div>
                        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest mb-4">
                            <FaArrowLeft /> Volver atrás
                        </button>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                            Finalizar <span className="text-indigo-500">Inscripción</span>
                        </h1>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-4">
                        {['auth', 'summary', 'payment'].map((s, idx) => (
                            <div key={s} className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step === s ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-white/5 text-slate-500'}`}>
                                    {idx + 1}
                                </div>
                                {idx < 2 && <div className="w-8 h-px bg-white/10" />}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* LEFT CONTENT */}
                    <div className="lg:col-span-7 space-y-8">

                        <AnimatePresence mode="wait">
                            {/* STEP 1: AUTHENTICATION */}
                            {step === 'auth' && (
                                <motion.div
                                    key="auth-step"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 md:p-14 backdrop-blur-3xl"
                                >
                                    <div className="text-center mb-10">
                                        <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Paso 1: Identidad</h2>
                                        <div className="flex justify-center gap-4 mt-6">
                                            <button onClick={() => setIsLogin(true)} className={`text-[10px] font-black uppercase tracking-widest pb-1 border-b-2 transition-all ${isLogin ? 'border-indigo-500 text-white' : 'border-transparent text-slate-500'}`}>Ya tengo cuenta</button>
                                            <button onClick={() => setIsLogin(false)} className={`text-[10px] font-black uppercase tracking-widest pb-1 border-b-2 transition-all ${!isLogin ? 'border-indigo-500 text-white' : 'border-transparent text-slate-500'}`}>Soy nuevo</button>
                                        </div>
                                    </div>

                                    <form onSubmit={handleAuth} className="space-y-6">
                                        {!isLogin && (
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Nombre Completo</label>
                                                <div className="relative">
                                                    <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" />
                                                    <input
                                                        type="text" required placeholder="Ej: Juan Pérez"
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:border-indigo-500 outline-none transition-all"
                                                        value={authForm.fullName} onChange={(e) => setAuthForm({ ...authForm, fullName: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Email</label>
                                            <div className="relative">
                                                <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" />
                                                <input
                                                    type="email" required placeholder="tu@email.com"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:border-indigo-500 outline-none transition-all"
                                                    value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Contraseña</label>
                                            <div className="relative">
                                                <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" />
                                                <input
                                                    type="password" required placeholder="••••••••"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:border-indigo-500 outline-none transition-all"
                                                    value={authForm.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        {authError && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">{authError}</p>}

                                        <button disabled={loading} className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-3">
                                            {loading ? 'Cargando...' : isLogin ? 'Siguiente Paso' : 'Crear Cuenta'} <FaArrowRight />
                                        </button>
                                    </form>
                                </motion.div>
                            )}

                            {/* STEP 2: SUMMARY */}
                            {step === 'summary' && (
                                <motion.div
                                    key="summary-step"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-8"
                                >
                                    <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 backdrop-blur-3xl">
                                        <div className="flex items-center justify-between mb-8">
                                            <h2 className="text-2xl font-black uppercase tracking-tight">Paso 2: Tu Mochila</h2>
                                            <span className="bg-indigo-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{cart.length} Item(s)</span>
                                        </div>

                                        <div className="space-y-4">
                                            {cart.map((item, i) => (
                                                <div key={i} className="flex justify-between items-center bg-white/5 p-6 rounded-3xl border border-white/5 group hover:border-white/20 transition-all">
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-lg text-white mb-1">{item.title}</h4>
                                                        <p className="text-slate-500 text-xs line-clamp-1">{item.detail}</p>
                                                    </div>
                                                    <div className="flex items-center gap-6">
                                                        <span className="font-black text-xl text-white">{clp(item.price)}</span>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-slate-600 hover:text-red-500 transition-colors p-2"
                                                        >
                                                            <FaTrash size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => setStep('payment')}
                                            className="w-full mt-10 py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-3"
                                        >
                                            Siguiente: Pago <FaArrowRight />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3: PAYMENT */}
                            {step === 'payment' && (
                                <motion.div
                                    key="payment-step"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
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
                                                    <span className="text-slate-500 text-[10px]">Credito / Debito</span>
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
                                                    <span className="block font-black uppercase tracking-widest text-[10px] text-white">Transferencia</span>
                                                    <span className="text-slate-500 text-[10px]">Pagar después</span>
                                                </div>
                                            </button>
                                        </div>

                                        {preferenceId ? (
                                            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center">
                                                <p className="text-slate-400 text-sm mb-6">Haz clic en el botón oficial para completar el pago:</p>
                                                <div className="max-w-[280px] mx-auto">
                                                    <Wallet initialization={{ preferenceId }} />
                                                </div>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={handleFinalize}
                                                disabled={loading}
                                                className="w-full py-6 bg-white text-slate-950 font-black rounded-2xl shadow-xl shadow-white/10 hover:bg-slate-100 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-3"
                                            >
                                                {loading ? 'Procesando...' : (
                                                    paymentMethod === 'mercadopago' ? 'Configurar Pago Mercado Pago' : 'Confirmar Inscripción'
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* RIGHT SIDEBAR: TICKET */}
                    <div className="lg:col-span-5 lg:pt-24">
                        <div className="sticky top-24">
                            <div className="bg-[#0a0a0b] border border-white/10 rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden">
                                {/* Decorative circle */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-8 opacity-50">
                                        <FaShoppingCart />
                                        <span className="font-black uppercase tracking-[0.2em] text-[10px]">Resumen de Inversión</span>
                                    </div>

                                    <div className="space-y-4 mb-10 pb-10 border-b border-white/5">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-500 text-sm font-medium">Subtotal Académico</span>
                                            <span className="font-bold text-white text-lg">{clp(total)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-500 text-sm font-medium">Matrícula Anual Lael</span>
                                            <span className="text-emerald-500 font-black text-sm uppercase tracking-widest italic">Bonificada</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-end mb-12">
                                        <div className="text-left">
                                            <span className="block text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">Total Final</span>
                                            <div className="text-5xl font-black text-white tracking-tighter leading-none">{clp(total)}</div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] text-slate-600 block mb-1">Pagas en CLP</span>
                                            <div className="px-2 py-1 bg-white/5 rounded border border-white/10 text-[10px] font-bold text-white uppercase italic">Zero Fees</div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-white/[0.02] rounded-3xl border border-white/5 flex items-center gap-4 mb-8">
                                        <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                                            <FaShieldAlt />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-white">Garantía Lael</h4>
                                            <p className="text-[10px] text-slate-500">Tu educación está protegida y encriptada.</p>
                                        </div>
                                    </div>

                                    {step !== 'auth' && (
                                        <div className="text-center opacity-40">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Inscripción para: <br /> <span className="text-indigo-400">{profile?.full_name || user?.email}</span></p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
