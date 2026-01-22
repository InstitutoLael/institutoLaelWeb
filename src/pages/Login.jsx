import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaLock, FaUser, FaArrowRight, FaRocket, FaShieldAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import SEOHead from '../components/SEOHead';

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [loadingAction, setLoadingAction] = useState(false);
    const [error, setError] = useState("");
    const { signIn, signUp } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: '',
        fullName: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingAction(true);
        setError("");

        try {
            if (isLogin) {
                await signIn({ email: form.email, password: form.password });
                navigate('/aula');
            } else {
                await signUp({ email: form.email, password: form.password, fullName: form.fullName });
                setError("¡Cuenta creada! Revisa tu email para confirmar y luego inicia sesión.");
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.message || "Ocurrió un error inesperado.");
        } finally {
            setLoadingAction(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 pt-32 pb-24 font-sans relative overflow-hidden">
            <SEOHead title={`${isLogin ? 'Iniciar Sesión' : 'Registro'} | Instituto Lael`} description="Accede a tu panel de estudiante y activa tu camino al éxito." />

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full relative z-10"
            >
                <div className="bg-slate-900/50 border border-white/10 p-10 md:p-12 rounded-[3.5rem] backdrop-blur-3xl shadow-2xl">

                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 italic">
                            {isLogin ? 'Bienvenido de ' : 'Únete a la '} <br />
                            <span className="text-amber-500">{isLogin ? 'Vuelta.' : 'Revolución.'}</span>
                        </h2>
                        <p className="text-slate-400 text-sm font-medium">
                            {isLogin ? 'Ingresa tus credenciales para acceder al aula.' : 'Crea tu cuenta para comenzar tu preparación.'}
                        </p>
                    </div>

                    {/* TABS */}
                    <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/5 mb-10">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isLogin ? 'bg-amber-500 text-slate-950 shadow-xl' : 'text-slate-500 hover:text-white'}`}
                        >
                            Iniciar Sesión
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${!isLogin ? 'bg-amber-500 text-slate-950 shadow-xl' : 'text-slate-500 hover:text-white'}`}
                        >
                            Registrarse
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AnimatePresence mode="wait">
                            {!isLogin && (
                                <motion.div
                                    key="fullname"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="input-group overflow-hidden"
                                >
                                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] block mb-3 ml-2">Nombre Completo</label>
                                    <div className="relative group">
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-amber-500 transition-colors"><FaUser /></span>
                                        <input
                                            type="text"
                                            name="fullName"
                                            required={!isLogin}
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm focus:border-amber-500/50 outline-none transition-all"
                                            placeholder="Ej: Sofia Herrera"
                                            value={form.fullName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="input-group">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] block mb-3 ml-2">Email</label>
                            <div className="relative group">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-amber-500 transition-colors"><FaEnvelope /></span>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm focus:border-amber-500/50 outline-none transition-all"
                                    placeholder="tu@email.com"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] block mb-3 ml-2">Contraseña</label>
                            <div className="relative group">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-amber-500 transition-colors"><FaLock /></span>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm focus:border-amber-500/50 outline-none transition-all"
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className={`text-[10px] font-bold uppercase tracking-widest text-center ${error.includes('Cuenta creada') ? 'text-emerald-500' : 'text-red-500'}`}
                            >
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={loadingAction}
                            className={`w-full py-5 bg-amber-500 text-slate-950 font-black rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-amber-500/20 uppercase tracking-widest text-xs ${loadingAction ? 'opacity-70 cursor-wait' : ''}`}
                        >
                            {loadingAction ? 'Procesando...' : (
                                <>
                                    {isLogin ? 'Entrar al Aula' : 'Crear Cuenta'} <FaArrowRight />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 flex flex-col items-center gap-6 opacity-40">
                        <div className="h-px w-full bg-white/5"></div>
                        <div className="flex items-center gap-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            <FaShieldAlt className="text-emerald-500" /> Acceso Encriptado
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
