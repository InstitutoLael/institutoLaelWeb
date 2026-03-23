import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import logoBlanco from "../assets/img/Logos/lael-inst-blanco.png";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Form Component (adapted for the technical notification box style)
function NotificationForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!email || status !== "idle") return;
    setStatus("loading");
    const { error } = await supabase
      .from("coming_soon_emails")
      .insert([{ email: email.trim().toLowerCase() }]);
    
    if (error) {
      if (error.code === "23505") { setMsg("Ya estás en la lista."); setStatus("success"); }
      else { setMsg("Error de conexión."); setStatus("idle"); }
    } else {
      setMsg("Confirmado. Notificación programada.");
      setStatus("success");
    }
  };

  const isSuccess = status === "success";

  return (
    <div className="flex flex-col items-center w-full max-w-sm mt-8">
      <form onSubmit={submit} className="w-full flex flex-col gap-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="INGRESE SU CORREO ELECTRÓNICO"
          disabled={isSuccess}
          className="w-full bg-transparent border border-[#0D0D0D]/20 text-[#0D0D0D] px-4 py-3 font-sans text-xs uppercase tracking-widest text-center focus:outline-none focus:border-[#B85C38] transition-colors placeholder:text-[#0D0D0D]/40"
        />
        <button
          type="submit"
          disabled={isSuccess || status === "loading"}
          className={`w-full px-12 py-4 text-[11px] uppercase tracking-[0.3em] font-bold transition-all duration-500 hover:cursor-pointer
            ${isSuccess 
              ? "bg-[#5C6E4E] text-[#F8F5F0]" 
              : "bg-[#0D0D0D] text-[#F8F5F0] border border-[#0D0D0D] hover:bg-[#B85C38] hover:border-[#B85C38]"}`}
        >
          {status === "loading" ? "PROCESANDO..." : isSuccess ? "SISTEMA ACTUALIZADO" : "NOTIFICARME AL REGRESO"}
        </button>
      </form>
      {msg && (
        <p className={`mt-4 font-sans text-[10px] font-bold uppercase tracking-widest ${isSuccess ? "text-[#5C6E4E]" : "text-[#B85C38]"}`}>
          {msg}
        </p>
      )}
    </div>
  );
}

export default function ComingSoon() {
  return (
    <div className="bg-[#0D0D0D] text-[#F8F5F0] font-sans selection:bg-[#B85C38] selection:text-[#F8F5F0] min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;700&display=swap');
        
        body { background-color: #0D0D0D; color: #F8F5F0; -webkit-font-smoothing: antialiased; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans, .font-body, .font-label { font-family: 'DM Sans', sans-serif; }
        
        .writing-vertical { writing-mode: vertical-rl; text-orientation: mixed; }
        .ghost-border { border-color: rgba(186, 186, 176, 0.1); }
        .gold-divider { border-color: rgba(196, 151, 62, 0.3); }
        
        /* Custom scrollbar for webkit */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0D0D0D; }
        ::-webkit-scrollbar-thumb { background: #262626; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #B85C38; }
        
        /* Override Tailwind if class isn't fully compiled */
        .tracking-widest { letter-spacing: 0.1em; }
      `}</style>

      {/* Top AppBar */}
      <header className="fixed top-0 z-50 flex justify-between items-center w-full px-6 md:px-12 h-20 bg-[#0D0D0D]/90 backdrop-blur-md border-b border-[#F8F5F0]/10">
        <div className="flex items-center gap-4">
          <img 
            src={logoBlanco} 
            alt="Instituto Lael" 
            className="h-10 md:h-12 w-auto opacity-100"
          />
        </div>
        <div className="hidden md:flex items-center gap-8">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#F8F5F0]/40">Status: Reestructuring_Phase_01</span>
          <div className="h-4 w-[1px] bg-[#F8F5F0]/20"></div>
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#F8F5F0]/40">Est. 2026</span>
        </div>
      </header>

      <main className="pt-20">
        
        {/* HERO SECTION */}
        <section className="min-h-[90vh] flex flex-col justify-center px-6 md:px-12 relative overflow-hidden">
          <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
            <span className="writing-vertical font-serif text-[120px] md:text-[180px] leading-none select-none">MMXXVI</span>
          </div>
          
          <div className="max-w-7xl w-full mx-auto grid grid-cols-12 gap-8 items-end z-10">
            <div className="col-span-12 lg:col-span-10">
              <label className="font-sans text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-[#B85C38] mb-6 md:mb-8 block">MANIFIESTO DE REESTRUCTURACIÓN</label>
              <h1 className="font-serif text-[12vw] md:text-[8vw] leading-[0.9] font-black tracking-tighter mb-8 md:mb-12">
                2026: El Silencio es <br />
                <span className="italic text-[#C4973E] font-normal">Construcción.</span>
              </h1>
              <div className="space-y-6">
                <span className="inline-block border border-[#C4973E] text-[#C4973E] px-3 py-1 font-sans text-[9px] font-bold uppercase tracking-widest">
                  Comunicado Oficial
                </span>
                <p className="font-sans text-base md:text-lg leading-relaxed text-[#F8F5F0]/80 max-w-2xl font-light">
                  Durante el año 2026, nuestros programas de formación online se encuentran en pausa en virtud de un proceso de reestructuración y actualización académica. Agradecemos la comprensión de quienes han sido parte de este proyecto. Seguiremos informando a través de nuestros canales.
                </p>
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl w-full mx-auto mt-16 md:mt-24 border-t ghost-border border-t-[rgba(186,186,176,0.1)] pt-8 md:pt-12 grid grid-cols-12 gap-8 z-10">
            <div className="col-span-12 md:col-span-4">
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-[#F8F5F0]/40">Estado de Operación</p>
              <p className="text-xs md:text-sm font-medium mt-2 tracking-wider">FASE DE REDEFINICIÓN TÉCNICA</p>
            </div>
            <div className="col-span-12 md:col-span-4">
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-[#F8F5F0]/40">Ubicación Múltiple</p>
              <p className="text-xs md:text-sm font-medium mt-2 tracking-wider">SANTIAGO, CHILE / ECOSISTEMA DIGITAL</p>
            </div>
          </div>
        </section>

        {/* SECTION 1: LA VISIÓN */}
        <section className="py-24 md:py-48 px-6 md:px-12 bg-[#121212]">
          <div className="max-w-4xl mx-auto">
            <label className="font-sans text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-[#C4973E] mb-12 md:mb-16 block text-center">I. LA VISIÓN</label>
            <h2 className="font-serif text-4xl md:text-6xl text-center mb-16 md:mb-24 tracking-tight">Tecnología con Alma</h2>
            
            <div className="space-y-0">
              <div className="py-8 md:py-12 border-t gold-divider group hover:bg-[#1A1A1A] transition-colors duration-500 box-border">
                <div className="grid grid-cols-12 gap-4 md:gap-8 items-start md:items-center px-4">
                  <span className="col-span-12 md:col-span-1 font-serif italic text-2xl text-[#F8F5F0] opacity-30">01</span>
                  <h3 className="col-span-12 md:col-span-4 font-sans text-xs font-bold uppercase tracking-[0.1em] text-[#B85C38]">El Ecosistema</h3>
                  <p className="col-span-12 md:col-span-7 font-sans text-[#F8F5F0]/70 font-light leading-relaxed text-sm md:text-base">Lael nunca fue solo un preuniversitario. Somos el primer ecosistema educativo online de Chile diseñado para la generación que el sistema decidió ignorar.</p>
                </div>
              </div>
              
              <div className="py-8 md:py-12 border-t gold-divider group hover:bg-[#1A1A1A] transition-colors duration-500 box-border">
                <div className="grid grid-cols-12 gap-4 md:gap-8 items-start md:items-center px-4">
                  <span className="col-span-12 md:col-span-1 font-serif italic text-2xl text-[#F8F5F0] opacity-30">02</span>
                  <h3 className="col-span-12 md:col-span-4 font-sans text-xs font-bold uppercase tracking-[0.1em] text-[#B85C38]">Propósito Integral</h3>
                  <p className="col-span-12 md:col-span-7 font-sans text-[#F8F5F0]/70 font-light leading-relaxed text-sm md:text-base">Nuestra base es clara: la PAES es la puerta de entrada gratuita, mientras que los idiomas, la IA, la inclusión y la comunidad son el motor que lo sostiene todo.</p>
                </div>
              </div>
              
              <div className="py-8 md:py-12 border-t border-b gold-divider group hover:bg-[#1A1A1A] transition-colors duration-500 box-border">
                <div className="grid grid-cols-12 gap-4 md:gap-8 items-start md:items-center px-4">
                  <span className="col-span-12 md:col-span-1 font-serif italic text-2xl text-[#F8F5F0] opacity-30">03</span>
                  <h3 className="col-span-12 md:col-span-4 font-sans text-xs font-bold uppercase tracking-[0.1em] text-[#B85C38]">Fe Activa</h3>
                  <p className="col-span-12 md:col-span-7 font-sans text-[#F8F5F0]/70 font-light leading-relaxed text-sm md:text-base">La fe es nuestro fundamento, no nuestra etiqueta. Llegamos a todo Chile con calidad y calidez, construyendo trayectorias que cambian la forma de ver el mundo.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE MANIFESTO / LIGHT THEME BREAKOUT */}
        <section className="py-24 md:py-48 px-6 md:px-12 bg-[#F8F5F0] text-[#0D0D0D]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            
            <div className="order-2 md:order-1 space-y-8 md:space-y-12">
              <div className="space-y-6">
                <h2 className="font-sans text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-[#B85C38]">II. El Manifiesto</h2>
                <p className="font-serif text-3xl md:text-5xl leading-tight tracking-tight text-[#0D0D0D]">
                  Un año para redefinir la educación en Chile. <br/>
                  <span className="italic text-[#C4973E]">No somos un folleto, somos un ecosistema.</span>
                </p>
              </div>
              
              <p className="font-sans text-sm md:text-base leading-relaxed text-[#0D0D0D]/80 max-w-md font-light">
                El 2026 marca el fin de la educación como consumo masivo. Entramos en la era de la precisión académica, donde cada bit de información tiene un propósito ético. Abrazamos el silencio mediático para perfeccionar la arquitectura del aprendizaje y construir desde los cimientos.
              </p>
            </div>
            
            <div className="order-1 md:order-2 ghost-border border border-[#0D0D0D]/10 bg-[#FCF9F3] p-8 md:p-16 flex flex-col items-center text-center gap-8 shadow-xl">
              <span className="font-sans text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-[#0D0D0D]/60">Centro de Operaciones</span>
              
              <a className="group flex flex-col items-center gap-4 py-4" href="mailto:contacto@institutolael.cl">
                <span className="font-serif text-2xl md:text-4xl text-[#0D0D0D] group-hover:text-[#B85C38] transition-colors duration-500">
                  contacto@institutolael.cl
                </span>
                <div className="h-[1px] w-12 bg-[#0D0D0D]/20 group-hover:w-full group-hover:bg-[#B85C38] transition-all duration-700"></div>
              </a>
              
              <NotificationForm />
            </div>

          </div>
        </section>

        {/* SECTION 3: THE COMMITMENT */}
        <section className="py-32 md:py-56 px-6 md:px-12 bg-[#0D0D0D] flex items-center justify-center text-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
            <span className="font-serif text-[40vw] font-black italic select-none">LAEL</span>
          </div>
          
          <div className="max-w-4xl z-10 flex flex-col items-center">
            <label className="font-sans text-[10px] md:text-[11px] font-bold uppercase tracking-[0.6em] text-[#C4973E] mb-12 block">III. EL COMPROMISO FUNDAMENTAL</label>
            
            <blockquote className="font-serif text-2xl md:text-4xl lg:text-5xl italic leading-tight text-[#F8F5F0] mb-16 opacity-90">
              "El Espíritu del Señor está sobre mí, por cuanto me ha ungido para dar buenas nuevas; me ha enviado a sanar a los quebrantados de corazón; a pregonar libertad a los cautivos, y vista a los ciegos."
            </blockquote>
            
            <div className="flex flex-col gap-3 items-center mt-8">
              <span className="font-sans text-[9px] font-bold uppercase tracking-[0.5em] text-[#F8F5F0]/40">Foundation Principles</span>
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#B85C38]">LUCAS 4:18 | JEREMÍAS 33:3</span>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0D0D0D] text-[#F8F5F0] border-t border-[#F8F5F0]/10 flex flex-col items-center gap-8 md:gap-12 w-full py-16 md:py-24 px-6 md:px-12">
        <div className="flex flex-col items-center gap-4 opacity-70 mb-4">
          <img 
            src={logoBlanco} 
            alt="Instituto Lael Icon" 
            className="h-10 md:h-12 w-auto"
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          <a href="#" className="font-sans text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 hover:text-[#C4973E] transition-all">TÉRMINOS TÉCNICOS</a>
          <a href="#" className="font-sans text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 hover:text-[#C4973E] transition-all">PRIVACIDAD DE DATOS</a>
          <a href="#" className="font-sans text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 hover:text-[#C4973E] transition-all">ARCHIVO ACADÉMICO</a>
        </div>
        
        <div className="h-[1px] w-12 bg-[#F8F5F0]/10"></div>
        
        <p className="font-sans text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] leading-loose text-center opacity-40">
          © 2024-2026 INSTITUTO LAEL. SANTIAGO, CHILE. LUCAS 4:18.
        </p>
        
        {/* Technical Marker */}
        <div className="flex items-center gap-4 text-[#F8F5F0]/20 mt-4 md:mt-0">
          <span className="font-sans text-[8px] md:text-[9px] tracking-widest font-bold uppercase">BUILD v.2026.0.1</span>
          <div className="w-1 h-1 rounded-full bg-[#B85C38]/60"></div>
          <span className="font-sans text-[8px] md:text-[9px] tracking-widest font-bold uppercase">SANTIAGO_CL</span>
        </div>
      </footer>
    </div>
  );
}
