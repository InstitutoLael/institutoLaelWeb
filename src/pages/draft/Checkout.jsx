
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaShieldAlt, FaUser, FaWhatsapp } from "react-icons/fa";
import { initMercadoPago } from '@mercadopago/sdk-react';

// Modular Components
import LeadCaptureForm from "../components/checkout/LeadCaptureForm";
import OrderSummary from "../components/checkout/OrderSummary";
import PaymentGateway from "../components/checkout/PaymentGateway";

// Initialize MP with Env Variable
const MP_PUBLIC_KEY = import.meta.env.VITE_MP_PUBLIC_KEY || 'APP_USR-67c5644f-e9ec-448b-9144-9eb5ddc954bb';
if (MP_PUBLIC_KEY) {
    initMercadoPago(MP_PUBLIC_KEY, { locale: 'es-CL' });
} else {
    console.error("VITE_MP_PUBLIC_KEY is not defined.");
}

const clp = (n) => Number(n || 0).toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

export default function Checkout() {
    const { cart, removeFromCart, clearCart } = useCart();
    const { user, profile, signUp } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Steps: 'student_data' | 'summary' | 'payment'
    const [step, setStep] = useState('student_data');
    const [paymentMethod, setPaymentMethod] = useState("transfer");
    const [loading, setLoading] = useState(false);
    const [preferenceId, setPreferenceId] = useState(null);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [serverStatus, setServerStatus] = useState('checking');

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        rut: "",
        password: ""
    });

    const total = cart.reduce((acc, item) => acc + item.price, 0);

    // Sync form with profile
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

    // Magic Links
    useEffect(() => {
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
    }, [searchParams]);

    // Pre-flight check
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

    useEffect(() => {
        if (cart.length === 0) navigate("/");
    }, [cart, navigate]);


    // ─── LOGIC HANDLERS ─────────────────────────────────────────────────────────────

    // Handler for Step 1 -> 2
    const handleLeadComplete = async (data) => {
        setFormData(data);
        setLoading(true);
        try {
            // Logic moved from original handleNextStep
            if (!user) {
                try {
                    console.log("Signing up new user:", data.email);
                    await signUp({
                        email: data.email,
                        password: data.password || "Lael2026!",
                        fullName: data.fullName
                    });
                } catch (err) {
                    if (err.message.includes("already registered") || err.message.includes("Users table violation")) {
                        console.warn("User conflict ignored for checkout flow:", err.message);
                    } else {
                        throw err;
                    }
                }
            }
            setStep('summary');
        } catch (err) {
            console.error("Error in Signup/Lead:", err);
            alert("Error al procesar datos: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Handler for Final Payment
    const handleFinalize = async () => {
        if (loading) return;
        setLoading(true);

        const timeoutPromise = (seconds) => new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`Tiempo de espera agotado (${seconds}s).`)), seconds * 1000)
        );

        try {
            if (serverStatus === 'error') throw new Error("Servidor fuera de línea.");

            // 1. LEAD CAPTURE (Conversion Lead)
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

            await Promise.race([
                supabase.from('leads').insert(leadData),
                timeoutPromise(30)
            ]);

            // 2. CREATE ORDER
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

            const { data: order, error: orderError } = await Promise.race([
                supabase.from('orders').insert(orderData).select().single(),
                timeoutPromise(30)
            ]);

            if (orderError) throw new Error(`Error orden: ${orderError.message}`);
            if (!order) throw new Error("No se pudo crear la orden.");

            // 3. SAVE ITEMS
            const items = cart.map(item => ({
                order_id: order.id,
                product_id: item.db_id || item.id,
                price_at_purchase: item.price
            }));

            const { error: itemsError } = await supabase.from('order_items').insert(items);
            if (itemsError) console.warn("Aviso: No se guardaron los items detallados.");

            // 4. PROCESS PAYMENT
            if (paymentMethod === 'transfer') {
                clearCart();
                navigate("/gracias", { state: { order, total, paymentMethod: 'transfer' } });
            } else {
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

                if (functionError) throw new Error(`Pasarela error: ${functionError.message}`);

                if (functionData?.init_point) {
                    window.location.href = functionData.init_point;
                } else if (functionData?.id) {
                    setPreferenceId(functionData.id);
                } else {
                    throw new Error("No se pudo generar link de pago.");
                }
            }

        } catch (err) {
            console.error("❌ Checkout Error:", err);
            alert(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // ─── RENDER ──────────────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 font-sans">
            <div className="container mx-auto max-w-6xl">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div>
                        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest mb-4">
                            <FaArrowLeft /> Volver al Catálogo
                        </button>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                            Finalizar <span className="text-indigo-500">Inscripción</span>
                        </h1>
                    </div>
                    {/* Progress Bar (Simple) */}
                    <div className="flex items-center gap-4">
                        {['student_data', 'summary', 'payment'].map((s, idx) => (
                            <div key={s} className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step === s ? 'bg-indigo-500 text-white shadow-lg' : 'bg-white/5 text-slate-500'}`}>
                                    {idx + 1}
                                </div>
                                {idx < 2 && <div className="w-8 h-px bg-white/10" />}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* LEFT CONTENT: STEPS */}
                    <div className="lg:col-span-7 space-y-8">
                        <AnimatePresence mode="wait">
                            {step === 'student_data' && (
                                <LeadCaptureForm 
                                    key="step1"
                                    user={user}
                                    profile={profile}
                                    initialData={formData}
                                    onComplete={handleLeadComplete}
                                    cartTotal={total}
                                    itemsSummary={cart.map(i => i.title).join(" + ")}
                                />
                            )}
                            {step === 'summary' && (
                                <OrderSummary 
                                    key="step2"
                                    cart={cart}
                                    total={total}
                                    onRemove={removeFromCart}
                                    onNext={() => setStep('payment')}
                                    onEditData={() => setStep('student_data')}
                                />
                            )}
                            {step === 'payment' && (
                                <PaymentGateway 
                                    key="step3"
                                    paymentMethod={paymentMethod}
                                    setPaymentMethod={setPaymentMethod}
                                    onFinalize={handleFinalize}
                                    loading={loading}
                                    preferenceId={preferenceId}
                                    acceptedTerms={acceptedTerms}
                                    setAcceptedTerms={setAcceptedTerms}
                                />
                            )}
                        </AnimatePresence>
                    </div>

                    {/* RIGHT SIDEBAR: TICKET */}
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

                                    {/* Preview User Info */}
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

