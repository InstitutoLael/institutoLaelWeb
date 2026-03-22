import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import logoBlanco from "../assets/img/Logos/lael-inst-blanco.png";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ─── Custom Cursor ────────────────────────────────────────────────────────────
function CustomCursor() {
  const dotRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const lerp = (a, b, t) => a + (b - a) * t;
    const onMove = (e) => { target.current = { x: e.clientX, y: e.clientY }; };
    const tick = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.12);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.12);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    document.body.style.cursor = "none";
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      document.body.style.cursor = "";
    };
  }, [isMobile]);

  if (isMobile) return null;
  return (
    <div ref={dotRef} style={{
      position: "fixed", top: 0, left: 0,
      width: 6, height: 6, borderRadius: "50%",
      background: "#C4973E", pointerEvents: "none",
      zIndex: 9999, willChange: "transform",
    }} />
  );
}

// ─── Grain Canvas ─────────────────────────────────────────────────────────────
function GrainCanvas() {
  const ref = useRef(null);
  const raf = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    let f = 0;
    const draw = () => {
      f++;
      const { width: W, height: H } = canvas;
      const img = ctx.createImageData(W, H);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.floor(Math.random() * 22);
        d[i] = v + 1; d[i+1] = v; d[i+2] = v - 1;
        d[i+3] = f % 2 === 0 ? 16 : 12;
      }
      ctx.putImageData(img, 0, 0);
      raf.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf.current); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={ref} style={{
      position: "fixed", inset: 0, width: "100vw", height: "100vh",
      zIndex: 0, pointerEvents: "none",
    }} />
  );
}

// ─── Reveal Hook (Intersection Observer) ─────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── Email Form ───────────────────────────────────────────────────────────────
function EmailForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [msg, setMsg] = useState("");
  const [focused, setFocused] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email || status !== "idle") return;
    setStatus("loading");
    const { error } = await supabase
      .from("coming_soon_emails")
      .insert([{ email: email.trim().toLowerCase() }]);
    if (error) {
      if (error.code === "23505") { setMsg("Ya estás en la lista."); setStatus("success"); }
      else { setMsg("Algo salió mal. Intenta de nuevo."); setStatus("idle"); }
    } else {
      setMsg("Perfecto. Serás el primero en saberlo.");
      setStatus("success");
    }
  };

  const isSuccess = status === "success";

  return (
    <div>
      <form onSubmit={submit} style={{ display: "flex", alignItems: "flex-end", gap: 0 }}>
        <div style={{ flex: 1, borderBottom: `1px solid ${focused ? "#B85C38" : "rgba(248,245,240,0.18)"}`, transition: "border-color 0.3s ease" }}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Tu correo electrónico"
            disabled={isSuccess}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              padding: "12px 0",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              fontWeight: 300,
              color: "#F8F5F0",
              letterSpacing: "0.01em",
            }}
          />
        </div>
        <ArrowButton disabled={isSuccess || status === "loading"} type="submit" loading={status === "loading"} success={isSuccess} />
      </form>
      {msg && (
        <p style={{
          marginTop: 14,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.78rem",
          fontWeight: 300,
          color: isSuccess ? "#C4973E" : "#B85C38",
          opacity: 0.85,
          letterSpacing: "0.03em",
        }}>
          {msg}
        </p>
      )}
    </div>
  );
}

// ─── Arrow Button ─────────────────────────────────────────────────────────────
function ArrowButton({ disabled, type, loading, success }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type={type}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "none",
        border: "none",
        cursor: disabled ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: 10,
        paddingBottom: 12,
        paddingLeft: 24,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.9rem",
        fontWeight: 500,
        letterSpacing: "0.03em",
        color: success ? "#5C6E4E" : "#B85C38",
        whiteSpace: "nowrap",
        transition: "color 0.3s ease",
      }}
    >
      <span>{loading ? "..." : success ? "Listo" : "Avisarme"}</span>
      <span style={{
        display: "inline-block",
        transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
        transform: hovered && !disabled ? "translateX(4px)" : "translateX(0)",
      }}>
        {success ? "✓" : "→"}
      </span>
    </button>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div style={{
      height: 1,
      background: "linear-gradient(90deg, transparent 0%, #C4973E 40%, #B85C38 60%, transparent 100%)",
      width: "100vw",
      marginLeft: "calc(50% - 50vw)",
      position: "relative",
    }} />
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function ComingSoon() {
  const [manifestoRef, manifestoVisible] = useReveal(0.1);
  const [formRef, formVisible] = useReveal(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ─── Clip-path reveal ─── */
        @keyframes revealMask {
          from { clip-path: inset(0 100% 0 0); opacity: 1; }
          to   { clip-path: inset(0 0% 0 0);   opacity: 1; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .reveal-mask {
          clip-path: inset(0 100% 0 0);
          animation: revealMask 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }

        /* staggered wrappers */
        .entry-0 { opacity: 0; animation: fadeSlideUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.05s forwards; }
        .entry-1 { opacity: 0; animation: fadeSlideUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.2s  forwards; }
        .entry-2 { opacity: 0; animation: fadeSlideUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.5s  forwards; }
        .entry-3 { opacity: 0; animation: fadeSlideUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.75s forwards; }
        .entry-4 { opacity: 0; animation: fadeSlideUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) 1.0s  forwards; }
        .entry-5 { opacity: 0; animation: fadeSlideUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) 1.2s  forwards; }

        /* manifesto reveal via IntersectionObserver */
        .manifesto-line {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }
        .manifesto-line.visible { opacity: 0.8; transform: translateY(0); }
        .manifesto-line.visible:nth-child(2) { transition-delay: 0.22s; }
        .manifesto-line.visible:nth-child(3) { transition-delay: 0.44s; }

        /* form reveal */
        .form-block {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .form-block.visible { opacity: 1; transform: translateY(0); }

        /* Placeholder */
        input::placeholder { color: rgba(248,245,240,0.25); }

        @media (max-width: 640px) {
          .title-main { font-size: 2.8rem !important; }
          .title-accent { font-size: 3.4rem !important; }
        }
      `}</style>

      <GrainCanvas />
      <CustomCursor />

      {/* Page shell */}
      <div style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        background: "#0D0D0D",
        color: "#F8F5F0",
        fontFamily: "'DM Sans', sans-serif",
        overflowX: "hidden",
      }}>

        {/* ── Vignette glow (radial, top-left, very subtle) ── */}
        <div style={{
          position: "fixed",
          top: "-200px",
          left: "-100px",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(184,92,56,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }} />

        {/* ── Content column ── */}
        <div style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 720,
          margin: "0 auto",
          padding: "clamp(56px, 10vw, 100px) clamp(24px, 6vw, 0px)",
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}>

          {/* LOGO */}
          <div className="entry-0" style={{ marginBottom: "clamp(56px, 10vw, 96px)", display: "flex", justifyContent: "center" }}>
            <img
              src={logoBlanco}
              alt="Instituto Lael"
              style={{ height: 48, display: "block" }}
            />
          </div>

          {/* HERO */}
          <section className="entry-1" style={{ marginBottom: "clamp(56px, 9vw, 88px)" }}>

            {/* Subtitle above */}
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.68rem",
              fontWeight: 400,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#F8F5F0",
              opacity: 0.35,
              marginBottom: "clamp(20px, 3.5vw, 28px)",
            }}>
              Instituto Lael · Relanzamiento 2026
            </p>

            {/* Title with clip-path reveal */}
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}>
              <span
                className="reveal-mask"
                style={{
                  display: "block",
                  fontSize: "clamp(2.8rem, 4.5vw, 4.5rem)",
                  lineHeight: 1.15,
                  color: "#F8F5F0",
                  letterSpacing: "-0.015em",
                  animationDelay: "0.3s",
                }}
              >
                La educación que merecías
              </span>
              <span
                className="reveal-mask"
                style={{
                  display: "block",
                  fontSize: "clamp(2.8rem, 4.5vw, 4.5rem)",
                  lineHeight: 1.15,
                  color: "#F8F5F0",
                  letterSpacing: "-0.015em",
                  animationDelay: "0.48s",
                }}
              >
                siempre existió.
              </span>
              <span
                className="reveal-mask"
                style={{
                  display: "block",
                  fontSize: "clamp(2.8rem, 4.5vw, 4.5rem)",
                  lineHeight: 1.15,
                  color: "#F8F5F0",
                  letterSpacing: "-0.015em",
                  animationDelay: "0.62s",
                }}
              >
                Solo estaba esperando
              </span>
              {/* Accent line — larger, italic, gold */}
              <em
                className="reveal-mask title-accent"
                style={{
                  display: "block",
                  fontSize: "clamp(3.4rem, 5.5vw, 5.5rem)",
                  lineHeight: 1.1,
                  fontStyle: "italic",
                  color: "#C4973E",
                  letterSpacing: "-0.02em",
                  animationDelay: "0.8s",
                  marginTop: "0.1em",
                }}
              >
                volver mejor.
              </em>
            </h1>
          </section>

          {/* DIVIDER 1 */}
          <div className="entry-2" style={{ marginBottom: "clamp(48px, 8vw, 72px)" }}>
            <Divider />
          </div>

          {/* MANIFIESTO */}
          <section
            ref={manifestoRef}
            className="entry-3"
            style={{ marginBottom: "clamp(56px, 9vw, 88px)" }}
          >
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.65rem",
              fontWeight: 400,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#B85C38",
              opacity: 0.7,
              marginBottom: "clamp(28px, 4vw, 36px)",
            }}>
              Manifiesto
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(22px, 3.5vw, 30px)" }}>
              {[
                "No creemos en la educación que domestica. Creemos en la que despierta.",
                "Luego paramos. Porque a veces parar es la decisión más honesta.",
                "Hoy volvemos con más claridad, mejor estructura y una sola pregunta: ¿Qué tan lejos puedes llegar si alguien te da las herramientas correctas?"
              ].map((line, i) => (
                <p
                  key={i}
                  className={`manifesto-line${manifestoVisible ? " visible" : ""}`}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 300,
                    lineHeight: 1.9,
                    color: "#F8F5F0",
                    transitionDelay: `${i * 0.22}s`,
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          </section>

          {/* DIVIDER 2 */}
          <div className="entry-4" style={{ marginBottom: "clamp(48px, 8vw, 72px)" }}>
            <Divider />
          </div>

          {/* FORMULARIO */}
          <section
            ref={formRef}
            className={`entry-5 form-block${formVisible ? " visible" : ""}`}
            style={{ marginBottom: "clamp(64px, 11vw, 104px)" }}
          >
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.6rem, 3vw, 2rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#F8F5F0",
              letterSpacing: "-0.01em",
              marginBottom: "clamp(28px, 4vw, 40px)",
              lineHeight: 1.25,
            }}>
              No te pierdas el regreso.
            </h2>
            <EmailForm />
          </section>

          {/* FOOTER */}
          <footer style={{
            borderTop: "1px solid rgba(248,245,240,0.07)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 300, color: "#F8F5F0", opacity: 0.25, letterSpacing: "0.04em" }}>
              @institutolael
            </span>
            <a
              href="mailto:contacto@institutolael.cl"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 300, color: "#F8F5F0", opacity: 0.25, letterSpacing: "0.02em", textDecoration: "none", transition: "opacity 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.6"}
              onMouseLeave={e => e.currentTarget.style.opacity = "0.25"}
            >
              contacto@institutolael.cl
            </a>
          </footer>

        </div>
      </div>
    </>
  );
}
