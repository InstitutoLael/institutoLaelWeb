import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import logoBlanco from "../assets/img/Logos/lael-inst-blanco.png";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function NotifyForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const submit = async (e) => {
    e.preventDefault();
    if (!email || status !== "idle") return;
    setStatus("loading");
    const { error } = await supabase
      .from("coming_soon_emails")
      .insert([{ email: email.trim().toLowerCase() }]);
    
    if (error) {
      if (error.code === "23505") { setStatus("exists"); }
      else { setStatus("error"); }
    } else {
      setStatus("success");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-12">
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu correo electrónico..."
          disabled={status === "success" || status === "exists"}
          className="flex-1 bg-transparent border-b border-[#F8F5F0]/30 text-[#F8F5F0] px-2 py-3 font-sans text-base text-center sm:text-left focus:outline-none focus:border-[#C4973E] transition-colors placeholder:text-[#F8F5F0]/30"
        />
        <button
          type="submit"
          disabled={status === "success" || status === "exists" || status === "loading"}
          className={`px-8 py-3 text-sm font-sans font-medium uppercase tracking-[0.15em] transition-all duration-500
            ${(status === "success" || status === "exists")
              ? "text-[#C4973E] cursor-default" 
              : "bg-[#F8F5F0] text-[#0D0D0D] hover:bg-[#C4973E] hover:text-[#0D0D0D]"}`}
        >
          {status === "loading" ? "..." : status === "success" ? "¡APUNTADO!" : status === "exists" ? "YA ESTÁS DENTRO" : "AVÍSAME"}
        </button>
      </form>
    </div>
  );
}

export default function ComingSoon() {
  return (
    <div className="bg-[#0D0D0D] text-[#F8F5F0] min-h-screen flex flex-col items-center justify-between relative overflow-hidden font-sans selection:bg-[#C4973E] selection:text-[#0D0D0D]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;700&display=swap');
        
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'DM Sans', sans-serif; }
        
        /* Subtle glowing orb in the background for warmth */
        .glow-orb {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(196, 151, 62, 0.08) 0%, rgba(13, 13, 13, 0) 70%);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 0;
        }
      `}</style>

      <div className="glow-orb"></div>

      {/* Top Section: Logo */}
      <header className="w-full pt-16 pb-8 flex justify-center z-10">
        <img 
          src={logoBlanco} 
          alt="Instituto Lael" 
          className="h-16 w-auto opacity-90 object-contain hover:opacity-100 transition-opacity"
        />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full px-6 z-10 text-center max-w-3xl mx-auto -mt-10">
        
        <span className="font-serif italic text-2xl md:text-3xl text-[#C4973E] mb-6 block">
          Estamos cocinando algo grande.
        </span>
        
        <h1 className="font-serif text-5xl md:text-7xl leading-tight font-bold mb-8">
          Una pausa necesaria para un <br className="hidden md:block"/> regreso <span className="text-[#C4973E]">extraordinario</span>.
        </h1>
        
        <p className="font-sans text-base md:text-lg leading-relaxed text-[#F8F5F0]/80 font-light mb-8 max-w-2xl mx-auto">
          Durante el año 2026, nuestros programas de formación online se encuentran en pausa en virtud de un proceso de reestructuración y actualización académica. Agradecemos profundamente la comprensión de quienes han sido parte de este proyecto.
        </p>

        <p className="font-sans text-sm md:text-base font-medium text-[#F8F5F0] mb-4 uppercase tracking-[0.1em]">
          DÉJANOS TU CORREO PARA SER EL PRIMERO EN SABERLO.
        </p>

        <NotifyForm />

      </main>

      {/* Bottom Section: Faith & Encouragement */}
      <footer className="w-full pb-12 pt-8 px-6 flex flex-col items-center z-10 opacity-60">
        <p className="font-serif italic text-lg md:text-xl text-center max-w-2xl text-[#C4973E] mb-3">
          "Esfuérzate y sé valiente; no temas ni desmayes, porque el Señor tu Dios estará contigo dondequiera que vayas."
        </p>
        <p className="font-sans text-xs uppercase tracking-widest font-bold">
          (Josué 1:9)
        </p>
      </footer>
    </div>
  );
}
