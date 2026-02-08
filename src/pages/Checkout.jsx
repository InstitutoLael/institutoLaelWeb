import React, { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

/**
 * @page Checkout
 * Página centralizada para la inscripción y pago de múltiples cursos.
 * Utiliza el Lead Capture 2.0 y el sistema de diagnóstico inteligente.
 */
import {
    FaShoppingCart, FaCreditCard, FaUniversity, FaWhatsapp,
    FaArrowLeft, FaShieldAlt, FaUser, FaLock, FaEnvelope,
    FaArrowRight, FaTrash, FaFingerprint, FaPhoneAlt
} from "react-icons/fa";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

// Initialize MP with Env Variable
const MP_PUBLIC_KEY = import.meta.env.VITE_MP_PUBLIC_KEY || 'APP_USR-67c5644f-e9ec-448b-9144-9eb5ddc954bb';
if (MP_PUBLIC_KEY) {
    console.log("Initializing Mercado Pago with Key:", MP_PUBLIC_KEY.substring(0, 10) + "...");
    initMercadoPago(MP_PUBLIC_KEY, { locale: 'es-CL' });
} else {
    console.error("VITE_MP_PUBLIC_KEY is not defined in environment variables.");
}

const clp = (n) => Number(n || 0).toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

export default function Checkout() {
    const { cart, removeFromCart, clearCart } = useCart();
    const { user, profile, signIn, signUp } = useAuth();
    const navigate = useNavigate();

    // Steps: 'student_data' | 'summary' | 'payment'
    const [step, setStep] = useState('student_data');
    const [paymentMethod, setPaymentMethod] = useState("transfer");
    const [loading, setLoading] = useState(false);
    const [preferenceId, setPreferenceId] = useState(null);
    const [searchParams] = useSearchParams();
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [serverStatus, setServerStatus] = useState('checking'); // 'ok' | 'error' | 'checking'

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        rut: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [authError, setAuthError] = useState("");
    const total = cart.reduce((acc, item) => acc + item.price, 0);

    // Sync form with profile if user logs in mid-way or is already logged in
    useEffect(() => {
        if (profile) {
            setFormData(prev => ({
                ...prev,
                fullName: profile.full_name || prev.fullName,
                email: user?.email || prev.email,
                phone: profile.phone || prev.phone,
                rut: profile.rut || prev.rut
            }));
        }
    }, [profile, user]);

    // MAGIC LINKS EFFECT: Read data from URL
    useEffect(() => {
        try {
            const urlName = searchParams.get('name');
            const urlEmail = searchParams.get('email');
            const urlPhone = searchParams.get('phone');
            const urlRut = searchParams.get('rut');

            if (urlName || urlEmail || urlPhone || urlRut) {
                setFormData(prev => ({
                    ...prev,
                    fullName: urlName || prev.fullName,
                    email: urlEmail || prev.email,
                    phone: urlPhone || prev.phone,
                    rut: urlRut || prev.rut
                }));
            }
        } catch (err) {
            console.error("Error parsing URL params:", err);
        }
    }, [searchParams]);

    // 1. Connection Diagnostic (Pre-flight)
    useEffect(() => {
        const checkConn = async () => {
            try {
                const { error } = await supabase.from('leads').select('id').limit(1);
                if (error) throw error;
                setServerStatus('ok');
            } catch (err) {
                console.error("Supabase Connectivity Error:", err);
                setServerStatus('error');
            }
        };
        checkConn();
    }, []);

    // Redirect if cart is empty
    useEffect(() => {
        if (cart.length === 0) {
            navigate("/");
        }
    }, [cart, navigate]);

    // Validation Helper
    const validateForm = () => {
        let newErrors = {};
        if (!formData.fullName || formData.fullName.length < 3) {
            newErrors.fullName = "El nombre es obligatorio (mín. 3 caracteres).";
        }
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Ingresa un correo electrónico válido.";
        }
        if (!formData.phone || formData.phone.length < 8) {
            newErrors.phone = "El teléfono es obligatorio.";
        }
        if (!formData.rut) {
            newErrors.rut = "El RUT es obligatorio.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle Data Completion (Step 1)
    const handleNextStep = async (e) => {
        e.preventDefault();
        setAuthError("");
        if (!validateForm()) return;

        setLoading(true);

        try {
            if (!user) {
                try {
                    console.log("Signing up new user:", formData.email);
                    const signupData = await signUp({
                        email: formData.email,
                        password: formData.password || "Lael2026!",
                        fullName: formData.fullName
                    });
                    console.log("Signup successful:", signupData?.user?.id);
                } catch (err) {
                    if (err.message.includes("already registered") || err.message.includes("Users table violation")) {
                        console.warn("User already exists or conflict:", err.message);
                        // We continue because they might just need to sign in, 
                        // or we can try to proceed as guest if the DB allows.
                    } else {
                        throw err;
                    }
                }
            }
            setStep('summary');
        } catch (err) {
            console.error("Error in Step 1:", err);
            setAuthError(err.message || "Error al procesar tus datos.");
        } finally {
            setLoading(false);
        }
    };

    const handleFinalize = async () => {
        if (loading) return;
        setLoading(true);
        setAuthError("");

        const timeoutPromise = (seconds) => new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`Tiempo de espera agotado (${seconds}s). Revisa tu conexión.`)), seconds * 1000)
        );

        try {
            console.log("🚀 Starting Finalize Process...");

            // --- 1. PRE-FLIGHT CHECK ---
            if (serverStatus === 'error') {
                throw new Error("El servidor de inscripciones está temporalmente fuera de línea.");
            }

            // --- 2. LEAD CAPTURE ---
            const itemsSummary = cart.map(i => i.title).join(" + ");
            const leadData = {
                name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                rut: formData.rut,
                type: 'checkout',
                plan_name: itemsSummary,
                estimated_quote: total,
                interest_pay: paymentMethod === 'mercadopago',
                status: 'checkout_initiated'
            };

            console.log("📝 Step 1: Saving Lead...");
            await Promise.race([
                supabase.from('leads').insert(leadData),
                timeoutPromise(30)
            ]);
            console.log("✅ Lead saved.");

            // --- 3. ORDER & ITEMS ---
            const orderData = {
                user_id: user?.id || null,
                total_amount: total,
                payment_method: paymentMethod,
                status: 'pending',
                customer_name: formData.fullName,
                customer_email: formData.email,
                customer_phone: formData.phone,
                customer_rut: formData.rut,
                items_summary: itemsSummary
            };

            console.log("📝 Step 2: Creating Order...");
            const { data: order, error: orderError } = await Promise.race([
                supabase.from('orders').insert(orderData).select().single(),
                timeoutPromise(30)
            ]);

            if (orderError) {
                console.error("Order Error:", orderError);
                throw new Error(`Error al crear orden: ${orderError.message}`);
            }
            if (!order) throw new Error("No se pudo crear la orden.");
            console.log("✅ Order created:", order.id);

            const items = cart.map(item => ({
                order_id: order.id,
                product_id: item.db_id || item.id,
                price_at_purchase: item.price
            }));

            console.log("📝 Step 3: Saving Order Items...");
            const { error: itemsError } = await supabase.from('order_items').insert(items);
            if (itemsError) console.warn("Aviso: No se guardaron los items detallados.");

            // --- 4. PAYMENT REDIRECTION ---
            if (paymentMethod === 'transfer') {
                console.log("🏁 Completing via Transfer...");
                clearCart();
                navigate("/gracias", { state: { order, total, paymentMethod: 'transfer' } });
            } else {
                console.log("💳 Invoking Mercado Pago Function...");
                const { data: functionData, error: functionError } = await Promise.race([
                    supabase.functions.invoke('create-mp-preference', {
                        body: {
                            orderId: order.id,
                            customer_email: formData.email,
                            items: cart.map(item => ({ title: item.title, unit_price: item.price, quantity: 1 })),
                            back_urls: {
                                success: `${window.location.origin}/gracias`,
                                failure: `${window.location.origin}/checkout`,
                                pending: `${window.location.origin}/gracias`
                            }
                        }
                    }),
                    timeoutPromise(30)
                ]);

                if (functionError) throw new Error(`Pasarela no responde: ${functionError.message}`);

                if (functionData?.init_point) {
                    window.location.href = functionData.init_point;
                } else if (functionData?.id) {
                    setPreferenceId(functionData.id);
                } else {
                    throw new Error("No se pudo generar el link de pago.");
                }
            }

        } catch (err) {
            console.error("❌ Checkout Error:", err);
            setAuthError(err.message);
            alert(`Error: ${err.message}\n\nDime qué sale en la consola (F12) para poder ayudarte.`);
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
                            <FaArrowLeft /> Volver al Catálogo
                        </button>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                            Finalizar <span className="text-indigo-500">Inscripción</span>
                        </h1>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-4">
                        {['student_data', 'summary', 'payment'].map((s, idx) => (
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

                    {/* LEFT CONTENT: THE FORM */}
                    <div className="lg:col-span-7 space-y-8">

                        <AnimatePresence mode="wait">
                            {/* STEP 1: STUDENT DATA / LEAD CAPTURE */}
                            {step === 'student_data' && (
                                <motion.div
                                    key="data-step"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 md:p-14 backdrop-blur-3xl"
                                >
                                    <div className="mb-10">
                                        <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Datos para Matrícula</h2>
                                        <p className="text-slate-500 text-sm">Completa la información del alumno o apoderado para generar tu orden.</p>
                                    </div>

                                    <form onSubmit={handleNextStep} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2 italic">Nombre Completo del Alumno</label>
                                            <div className="relative">
                                                <FaUser className={`absolute left-5 top-1/2 -translate-y-1/2 ${errors.fullName ? 'text-red-500' : 'text-slate-600'}`} />
                                                <input
                                                    type="text" placeholder="Ej: Juan Antonio Pérez"
                                                    className={`w-full bg-white/5 border rounded-2xl py-4 pl-12 pr-6 text-sm outline-none transition-all ${errors.fullName ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 focus:border-indigo-500'}`}
                                                    value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                />
                                            </div>
                                            {errors.fullName && <p className="text-red-500 text-[9px] font-bold ml-2 uppercase italic">{errors.fullName}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2 italic">Correo Electrónico</label>
                                            <div className="relative">
                                                <FaEnvelope className={`absolute left-5 top-1/2 -translate-y-1/2 ${errors.email ? 'text-red-500' : 'text-slate-600'}`} />
                                                <input
                                                    type="email" placeholder="alumno@ejemplo.com"
                                                    className={`w-full bg-white/5 border rounded-2xl py-4 pl-12 pr-6 text-sm outline-none transition-all ${errors.email ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 focus:border-indigo-500'}`}
                                                    value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                            {errors.email && <p className="text-red-500 text-[9px] font-bold ml-2 uppercase italic">{errors.email}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2 italic">Teléfono / WhatsApp</label>
                                            <div className="relative">
                                                <FaPhoneAlt className={`absolute left-5 top-1/2 -translate-y-1/2 ${errors.phone ? 'text-red-500' : 'text-slate-600'}`} />
                                                <input
                                                    type="tel" placeholder="+569 1234 5678"
                                                    className={`w-full bg-white/5 border rounded-2xl py-4 pl-12 pr-6 text-sm outline-none transition-all ${errors.phone ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 focus:border-indigo-500'}`}
                                                    value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                />
                                            </div>
                                            {errors.phone && <p className="text-red-500 text-[9px] font-bold ml-2 uppercase italic">{errors.phone}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2 italic">RUT del Alumno</label>
                                            <div className="relative">
                                                <FaFingerprint className={`absolute left-5 top-1/2 -translate-y-1/2 ${errors.rut ? 'text-red-500' : 'text-slate-600'}`} />
                                                <input
                                                    type="text" placeholder="12.345.678-9"
                                                    className={`w-full bg-white/5 border rounded-2xl py-4 pl-12 pr-6 text-sm outline-none transition-all ${errors.rut ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 focus:border-indigo-500'}`}
                                                    value={formData.rut} onChange={(e) => setFormData({ ...formData, rut: e.target.value })}
                                                />
                                            </div>
                                            {errors.rut && <p className="text-red-500 text-[9px] font-bold ml-2 uppercase italic">{errors.rut}</p>}
                                        </div>

                                        {!user && (
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black text-indigo-400 uppercase tracking-widest ml-2 italic">Crea una Contraseña (opcional)</label>
                                                <div className="relative">
                                                    <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" />
                                                    <input
                                                        type="password" placeholder="Definir para acceso futuro"
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:border-indigo-500 outline-none transition-all"
                                                        value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className="md:col-span-2 mt-4">
                                            {authError && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center mb-6">{authError}</p>}
                                            <button
                                                disabled={loading}
                                                className={`w-full py-6 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/20 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-3 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-500 active:scale-95'}`}
                                            >
                                                {loading ? (
                                                    <>Procesando...</>
                                                ) : (
                                                    <>Confirmar Datos y Ver Resumen <FaArrowRight /></>
                                                )}
                                            </button>
                                            <p className="text-center text-[9px] text-slate-600 mt-4 uppercase tracking-[0.2em]">Al continuar aceptas nuestros términos de servicio académico.</p>
                                        </div>
                                    </form>
                                </motion.div>
                            )}

                            {/* STEP 2: SUMMARY (Same as before but with data context) */}
                            {step === 'summary' && (
                                <motion.div
                                    key="summary-step"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-8"
                                >
                                    <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 backdrop-blur-3xl">
                                        <div className="mb-8">
                                            <h2 className="text-2xl font-black uppercase tracking-tight">Paso 2: Revisión de Mochila</h2>
                                            <p className="text-slate-500 text-sm italic">Verifica tus cursos antes de proceder al pago.</p>
                                        </div>

                                        <div className="space-y-4">
                                            {cart.map((item, i) => (
                                                <div key={i} className="flex justify-between items-center bg-white/5 p-6 rounded-3xl border border-white/5">
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

                                        <div className="mt-10 flex gap-4">
                                            <button onClick={() => setStep('student_data')} className="flex-1 py-5 border border-white/10 text-slate-400 font-black rounded-2xl hover:bg-white/5 transition-all uppercase tracking-widest text-xs">Editar Datos</button>
                                            <button
                                                onClick={() => setStep('payment')}
                                                className="flex-[2] py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-3"
                                            >
                                                Paso Final: Pago <FaArrowRight />
                                            </button>
                                        </div>
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
                                                            He leído y acepto los <Link to="/terminos" target="_blank" className="text-indigo-400 hover:underline">Términos y Condiciones</Link> y la <Link to="/privacidad" target="_blank" className="text-indigo-400 hover:underline">Política de Privacidad</Link> del Instituto Lael.
                                                        </span>
                                                    </label>
                                                </div>

                                                <button
                                                    onClick={handleFinalize}
                                                    disabled={loading || !acceptedTerms}
                                                    className={`w-full py-6 bg-white text-slate-950 font-black rounded-2xl shadow-xl shadow-white/10 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-3 ${loading || !acceptedTerms ? 'opacity-30 cursor-not-allowed grayscale' : 'hover:bg-slate-100 active:scale-95'}`}
                                                >
                                                    {loading ? 'Procesando...' : (
                                                        paymentMethod === 'mercadopago' ? 'Generar Pago Mercado Pago' : 'Finalizar Reserva de Cupo'
                                                    )}
                                                </button>
                                                <button onClick={() => setStep('summary')} className="w-full text-[9px] font-black uppercase tracking-[0.3em] text-slate-600 hover:text-white transition-colors">Volver al Resumen</button>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* RIGHT SIDEBAR: TICKET (Always Visible Summary) */}
                    <div className="lg:col-span-5 lg:pt-24">
                        <div className="sticky top-24">
                            <div className="bg-[#0a0a0b] border border-white/10 rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl" />

                                <div className="relative z-10">
                                    <h3 className="text-xl font-black uppercase tracking-tight mb-8">Tu Reserva</h3>

                                    <div className="space-y-4 mb-10 pb-10 border-b border-white/5">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-500 text-xs font-medium uppercase tracking-widest">Inversión Académica</span>
                                            <span className="font-bold text-white text-lg">{clp(total)}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-emerald-500">
                                            <span className="text-xs font-black uppercase tracking-widest italic">Beneficio Matrícula 2026</span>
                                            <span className="font-black text-xs uppercase tracking-widest badge bg-emerald-500/10 px-2 py-1 rounded">Costo $0</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-end mb-12">
                                        <div className="text-left">
                                            <span className="block text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">Total a Pagar</span>
                                            <div className="text-5xl font-black text-white tracking-tighter leading-none">{clp(total)}</div>
                                        </div>
                                    </div>

                                    {/* Administrative Preview */}
                                    {formData.fullName && (
                                        <div className="p-6 bg-indigo-500/5 rounded-3xl border border-indigo-500/10 space-y-3 mb-8">
                                            <span className="block text-[8px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-2">Información de Matrícula</span>
                                            <div className="flex items-center gap-3 text-xs">
                                                <FaUser className="text-indigo-400/50" />
                                                <span className="text-slate-300 font-bold truncate">{formData.fullName}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs">
                                                <FaWhatsapp className="text-emerald-400/50" />
                                                <span className="text-slate-300 font-mono">{formData.phone || 'Pendiente'}</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-4 text-slate-600">
                                        <FaShieldAlt className="text-indigo-500" />
                                        <span className="text-[9px] font-black uppercase tracking-widest">Garantía de Privacidad SSL</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
