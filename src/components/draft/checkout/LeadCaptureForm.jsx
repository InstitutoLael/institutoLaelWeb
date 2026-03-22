
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhoneAlt, FaFingerprint, FaArrowRight, FaLock } from 'react-icons/fa';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { supabase } from '../../lib/supabaseClient';
import { trackLeadGeneration } from '../../lib/analytics';

export default function LeadCaptureForm({ user, profile, onComplete, initialData, cartTotal, itemsSummary }) {
  const [formData, setFormData] = useState({
    fullName: initialData?.fullName || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    rut: initialData?.rut || "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Sync with prop updates
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        fullName: initialData.fullName || prev.fullName,
        email: initialData.email || prev.email,
        phone: initialData.phone || prev.phone,
        rut: initialData.rut || prev.rut
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName || formData.fullName.length < 3) newErrors.fullName = "Nombre inválido (min 3 letras).";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email inválido.";
    if (!formData.phone || formData.phone.length < 8) newErrors.phone = "Teléfono requerido.";
    if (!formData.rut) newErrors.rut = "RUT requerido.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);

    try {
      // Track Lead Generation
      trackLeadGeneration('checkout_abandoned');

      // 🚀 ABANDONED CART STRATEGY: Save Lead NOW
      // We upsert based on email to avoid duplicates if they come back
      const leadPayload = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        rut: formData.rut,
        type: 'checkout_abandoned', // Will act as 'abandoned' until they finish payment
        plan_name: itemsSummary, // "Curso A + Curso B"
        estimated_quote: cartTotal,
        status: 'checkout_step_1_completed',
        created_at: new Date().toISOString()
      };

      // Attempt to save lead (non-blocking for UI speed, but good to await to ensure data integrity)
      // We use 'upsert' on email if possible, or just insert. 
      // Note: 'leads' table might not have unique constraint on email.
      // If no unique constraint, this will just add a new lead row, which is fine for tracking attempts.
      const { error: leadError } = await supabase.from('leads').insert(leadPayload);
      
      if (leadError) {
        console.warn("Could not save abandoned cart lead:", leadError);
        // We don't block the user flow for this, but we log it.
      } else {
        console.log("✅ Lead saved for abandoned cart recovery.");
      }

      // Pass data back up
      onComplete(formData);

    } catch (err) {
      console.error("Error in lead capture:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 md:p-14 backdrop-blur-3xl"
    >
      <div className="mb-10">
        <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Datos para Matrícula</h2>
        <p className="text-slate-500 text-sm">Completa la información del alumno o apoderado.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input 
          className="md:col-span-2"
          label="Nombre Completo del Alumno"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          icon={FaUser}
          placeholder="Ej: Juan Antonio Pérez"
        />

        <Input 
          label="Correo Electrónico"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          icon={FaEnvelope}
          placeholder="alumno@ejemplo.com"
        />

        <Input 
          label="Teléfono / WhatsApp"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          icon={FaPhoneAlt}
          placeholder="+569 1234 5678"
        />

        <Input 
          label="RUT del Alumno"
          name="rut"
          value={formData.rut}
          onChange={handleChange}
          error={errors.rut}
          icon={FaFingerprint}
          placeholder="12.345.678-9"
        />

        {/* Optional Password for New Users */}
        {!user && (
          <Input 
            label="Crea una Contraseña (opcional)"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            icon={FaLock}
            placeholder="Para acceder al Aula después"
          />
        )}

        <div className="md:col-span-2 mt-6">
          <Button 
            type="submit" 
            variant="primary" 
            className="w-full"
            loading={loading}
          >
            Confirmar Datos y Ver Resumen <FaArrowRight className="ml-2" />
          </Button>
          <p className="text-center text-[9px] text-slate-600 mt-4 uppercase tracking-[0.2em]">
            Al continuar aceptas nuestros términos de servicio académico.
          </p>
        </div>
      </form>
    </motion.div>
  );
}
