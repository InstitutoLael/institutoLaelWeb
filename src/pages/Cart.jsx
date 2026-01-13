import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import SEOHead from "../components/SEOHead";
import { Trash2, ArrowRight, ShieldCheck, AlertCircle, CheckCircle, Loader2 } from "lucide-react";

/* Función para formatear dinero */
const clp = (amount) => {
  return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(amount);
};

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [isPaying, setIsPaying] = useState(false);

  // 1. LÓGICA DE CÁLCULO
  // Total a pagar HOY (Incluye matrículas + primer mes)
  const totalToday = cart.reduce((acc, item) => acc + item.price, 0);

  // Total recurrente (Solo mensualidades futuras)
  const totalMonthly = cart.reduce((acc, item) => acc + (item.recurringPrice || 0), 0);

  // Detectar si hay matrícula involucrada (calculando la diferencia)
  const enrollmentTotal = totalToday - totalMonthly;

  const handlePayment = () => {
    setIsPaying(true);
    // AQUÍ IRÍA LA INTEGRACIÓN CON FLOW / MERCADOPAGO O EL WORKER
    setTimeout(() => {
      alert("Aquí redirigimos a la pasarela de pago real.");
      setIsPaying(false);
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div style={{minHeight: '80vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#020617', color:'white', fontFamily:'Plus Jakarta Sans, sans-serif'}}>
        <h2 style={{fontSize:'2rem', fontWeight:800, marginBottom:16}}>Tu carro está vacío</h2>
        <p style={{color:'#94a3b8', marginBottom:32}}>Aún no has agregado cursos a tu plan.</p>
        <Link to="/" style={{background:'#6366f1', color:'white', textDecoration:'none', padding:'12px 24px', borderRadius:50, fontWeight:700}}>
          Ir a explorar cursos
        </Link>
      </div>
    );
  }

  return (
    <div style={{background:'#020617', color:'#f8fafc', minHeight:'100vh', fontFamily:'Plus Jakarta Sans, sans-serif', paddingBottom:100}}>
      <SEOHead title="Tu Carrito | Lael" />
      
      <div className="container" style={{maxWidth:1100, margin:'0 auto', padding:'100px 24px 40px'}}>
        <h1 style={{fontSize:'clamp(2rem, 4vw, 3rem)', fontWeight:800, marginBottom:40}}>Finalizar Inscripción</h1>

        <div style={{display:'grid', gridTemplateColumns: '1.5fr 1fr', gap: 40}}>
          
          {/* COLUMNA IZQUIERDA: LISTA DE ITEMS */}
          <div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20, paddingBottom:10, borderBottom:'1px solid rgba(255,255,255,0.1)'}}>
              <span style={{color:'#94a3b8'}}>{cart.length} Cursos seleccionados</span>
              <button onClick={clearCart} style={{background:'none', border:'none', color:'#ef4444', cursor:'pointer', fontSize:'0.9rem'}}>Vaciar carro</button>
            </div>

            <div style={{display:'flex', flexDirection:'column', gap:16}}>
              {cart.map((item) => (
                <div key={item.id} style={{background:'#0f172a', border:'1px solid rgba(255,255,255,0.1)', padding:20, borderRadius:16, display:'flex', gap:20, alignItems:'start'}}>
                  {/* Icono o Imagen */}
                  <div style={{width:50, height:50, background:'rgba(99, 102, 241, 0.1)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem'}}>
                    {item.image || "📚"}
                  </div>
                  
                  {/* Info */}
                  <div style={{flexGrow:1}}>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                      <h3 style={{margin:0, fontSize:'1.1rem'}}>{item.name}</h3>
                      <button onClick={() => removeFromCart(item.id)} style={{background:'none', border:'none', color:'#64748b', cursor:'pointer'}}><Trash2 size={18}/></button>
                    </div>
                    
                    {/* Detalles (Ramos, Niveles) */}
                    {item.details && (
                      <p style={{fontSize:'0.85rem', color:'#94a3b8', margin:'5px 0'}}>
                        {Array.isArray(item.details) ? item.details.join(', ') : item.details}
                      </p>
                    )}

                    {/* Desglose de precio POR ITEM */}
                    <div style={{marginTop:12, paddingTop:12, borderTop:'1px dashed rgba(255,255,255,0.1)', fontSize:'0.85rem'}}>
                      <div style={{display:'flex', justifyContent:'space-between', marginBottom:4}}>
                        <span style={{color:'#94a3b8'}}>Pago Hoy (Matrícula + Mes 1):</span>
                        <span style={{fontWeight:700, color:'white'}}>{clp(item.price)}</span>
                      </div>
                      <div style={{display:'flex', justifyContent:'space-between'}}>
                         <span style={{color:'#94a3b8'}}>Mensualidad futura:</span>
                         <span style={{color:'#cbd5e1'}}>{clp(item.recurringPrice)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Link to="/" style={{display:'inline-flex', alignItems:'center', gap:8, color:'#6366f1', textDecoration:'none', marginTop:24, fontWeight:600}}>
              <ArrowRight size={16} transform="rotate(180)"/> Seguir agregando cursos
            </Link>
          </div>

          {/* COLUMNA DERECHA: RESUMEN FINANCIERO */}
          <div>
            <div style={{background:'#1e293b', border:'1px solid rgba(99, 102, 241, 0.2)', borderRadius:24, padding:32, position:'sticky', top:20}}>
              <h3 style={{fontSize:'1.5rem', marginBottom:24}}>Resumen de Pagos</h3>

              {/* EL PUNTO CLAVE: DIFERENCIAR PAGO UNICO DE MENSUAL */}
              <div style={{background:'rgba(15, 23, 42, 0.5)', borderRadius:16, padding:16, marginBottom:24}}>
                
                {/* 1. Matrícula */}
                {enrollmentTotal > 0 && (
                  <div style={{display:'flex', justifyContent:'space-between', marginBottom:12, fontSize:'0.9rem', color:'#94a3b8'}}>
                    <span>Matrícula Anual (Pago Único)</span>
                    <span>{clp(enrollmentTotal)}</span>
                  </div>
                )}

                {/* 2. Primer Mes */}
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:12, fontSize:'0.9rem', color:'#94a3b8'}}>
                   <span>Primer mes de clases</span>
                   <span>{clp(totalMonthly)}</span>
                </div>

                <div style={{borderTop:'1px solid rgba(255,255,255,0.1)', margin:'16px 0'}}></div>

                {/* TOTAL A PAGAR HOY */}
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                   <span style={{fontWeight:700, color:'white'}}>A pagar HOY</span>
                   <span style={{fontSize:'1.8rem', fontWeight:800, color:'white'}}>{clp(totalToday)}</span>
                </div>
              </div>

              {/* NOTA ACLARATORIA (MUY IMPORTANTE) */}
              <div style={{display:'flex', gap:10, background:'rgba(59, 130, 246, 0.1)', padding:12, borderRadius:12, marginBottom:24}}>
                <AlertCircle size={20} color="#60a5fa" style={{flexShrink:0}} />
                <p style={{fontSize:'0.8rem', color:'#bfdbfe', margin:0, lineHeight:1.4}}>
                  <strong>¡Importante!</strong> El monto de matrícula se paga una sola vez al año. 
                  A partir del próximo mes, tu mensualidad será de <strong>{clp(totalMonthly)}</strong>.
                </p>
              </div>

              {/* Botón de Pago */}
              <button 
                onClick={handlePayment}
                disabled={isPaying}
                style={{width:'100%', background:'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', color:'white', border:'none', padding:'16px', borderRadius:50, fontSize:'1.1rem', fontWeight:700, cursor: isPaying ? 'wait' : 'pointer', boxShadow:'0 10px 25px -5px rgba(99, 102, 241, 0.4)', transition:'0.3s'}}
              >
                {isPaying ? <Loader2 className="spin" size={24}/> : "Ir a Pagar"}
              </button>

              <div style={{textAlign:'center', marginTop:16, display:'flex', alignItems:'center', justifyContent:'center', gap:6, color:'#64748b', fontSize:'0.8rem'}}>
                <ShieldCheck size={14}/> Pagos encriptados y seguros
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* CSS para spinner simple */}
      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @media (max-width: 900px) {
           div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}