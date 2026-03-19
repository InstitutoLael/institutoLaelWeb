<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>STAT ARCADE — Los Olivos HomeSchool</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=Figtree:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
/* ═══════════════════════════════════════════════
   DESIGN SYSTEM
═══════════════════════════════════════════════ */
:root {
  --bg:     #080b14;
  --bg2:    #0c1120;
  --surface:#111827;
  --surf2:  #1a2235;
  --border: rgba(255,255,255,0.07);
  --border2:rgba(255,255,255,0.13);

  --c1: #7ee8fa;   /* ice blue */
  --c2: #f97316;   /* warm orange */
  --c3: #a78bfa;   /* violet */
  --c4: #34d399;   /* emerald */
  --c5: #fb7185;   /* rose */
  --c6: #fbbf24;   /* amber */

  --text:   #f1f5f9;
  --text2:  #94a3b8;
  --text3:  #475569;

  --r-sm: 10px;
  --r-md: 16px;
  --r-lg: 24px;
}

*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

html { scroll-behavior: smooth; }

body {
  font-family: 'Figtree', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* ── CANVAS BG ── */
#bg-canvas {
  position: fixed; inset: 0;
  pointer-events: none; z-index: 0;
}

/* ── NOISE OVERLAY ── */
body::after {
  content: '';
  position: fixed; inset: 0; z-index: 1;
  pointer-events: none;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  background-size: 200px;
}

/* ═══════════════════════════════════════════════
   HUB SCREEN
═══════════════════════════════════════════════ */
#hub {
  position: relative; z-index: 2;
  min-height: 100vh;
  display: flex; flex-direction: column; align-items: center;
}

/* ── HEADER STRIP ── */
.school-header {
  width: 100%;
  display: flex; align-items: center; justify-content: space-between;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--border);
  background: rgba(8,11,20,0.8);
  backdrop-filter: blur(12px);
  position: sticky; top: 0; z-index: 20;
}
.school-info { display: flex; flex-direction: column; }
.school-name {
  font-family: 'Syne', sans-serif;
  font-size: 0.7rem; font-weight: 800;
  letter-spacing: 3px; text-transform: uppercase;
  color: var(--c1);
}
.school-sub {
  font-size: 0.65rem; color: var(--text3);
  letter-spacing: 1px; margin-top: 1px;
}
.teacher-badge {
  display: flex; align-items: center; gap: 0.5rem;
  background: var(--surface); border: 1px solid var(--border2);
  border-radius: 999px; padding: 0.35rem 0.9rem;
}
.teacher-avatar {
  width: 24px; height: 24px; border-radius: 50%;
  background: linear-gradient(135deg, var(--c1), var(--c3));
  display: flex; align-items: center; justify-content: center;
  font-size: 0.65rem; font-weight: 700; color: var(--bg);
}
.teacher-name { font-size: 0.7rem; color: var(--text2); }
.teacher-name strong { color: var(--text); font-weight: 600; }

/* ── HERO ── */
.hero {
  text-align: center;
  padding: 4rem 1rem 2rem;
  max-width: 700px;
}
.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: rgba(126,232,250,0.08);
  border: 1px solid rgba(126,232,250,0.2);
  border-radius: 999px;
  padding: 0.35rem 1rem;
  font-size: 0.7rem; letter-spacing: 3px; text-transform: uppercase;
  color: var(--c1); margin-bottom: 1.5rem;
}
.hero-eyebrow span { width: 6px; height: 6px; border-radius: 50%; background: var(--c1); animation: pulse 2s infinite; }
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }

.hero-title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(3.5rem, 10vw, 7rem);
  font-weight: 800; line-height: 0.9;
  letter-spacing: -2px;
  margin-bottom: 1.2rem;
}
.hero-title .line1 { display: block; color: var(--text); }
.hero-title .line2 {
  display: block;
  background: linear-gradient(90deg, var(--c1) 0%, var(--c3) 50%, var(--c2) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-size: 200%; animation: gradshift 5s ease infinite;
}
@keyframes gradshift { 0%,100%{background-position:0%} 50%{background-position:100%} }

.hero-desc {
  font-size: clamp(0.9rem, 2vw, 1.05rem);
  color: var(--text2); line-height: 1.7; max-width: 480px; margin: 0 auto 2rem;
}

/* ── HUD ── */
.hud-bar {
  display: flex; gap: 0.6rem; flex-wrap: wrap; justify-content: center;
  margin-bottom: 3rem;
}
.hud-chip {
  display: flex; align-items: center; gap: 0.5rem;
  background: var(--surface); border: 1px solid var(--border2);
  border-radius: var(--r-sm); padding: 0.55rem 1rem;
  transition: border-color .2s;
}
.hud-chip:hover { border-color: var(--border2); }
.hud-chip .hv {
  font-family: 'DM Mono', monospace;
  font-size: 1.1rem; font-weight: 500;
}
.hud-chip .hl { font-size: 0.62rem; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text3); }
.hud-chip.pts .hv { color: var(--c6); }
.hud-chip.lvl .hv { color: var(--c1); }
.hud-chip.str .hv { color: var(--c4); }
.hud-chip.acc .hv { color: var(--c3); }

/* ── ZONE GRID ── */
.zones-label {
  font-family: 'Syne', sans-serif;
  font-size: 0.65rem; font-weight: 700;
  letter-spacing: 4px; text-transform: uppercase;
  color: var(--text3); margin-bottom: 1.2rem;
  text-align: center;
}

.zone-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem; width: 100%;
  max-width: 960px; padding: 0 1.5rem 4rem;
}
@media(max-width:750px){ .zone-grid{ grid-template-columns:1fr 1fr; } }
@media(max-width:480px){ .zone-grid{ grid-template-columns:1fr; } }

.zone-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  padding: 1.4rem;
  cursor: pointer;
  position: relative; overflow: hidden;
  transition: transform .2s cubic-bezier(.4,0,.2,1), box-shadow .2s, border-color .2s;
  display: flex; flex-direction: column; gap: 0.5rem;
}
.zone-card::before {
  content: ''; position: absolute;
  top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0; transition: opacity .25s;
}
.zone-card:hover { transform: translateY(-5px) scale(1.01); }
.zone-card:hover::before { opacity: 1; }

.zone-card[data-c="1"] { --accent: var(--c1); }
.zone-card[data-c="2"] { --accent: var(--c5); }
.zone-card[data-c="3"] { --accent: var(--c6); }
.zone-card[data-c="4"] { --accent: var(--c4); }
.zone-card[data-c="5"] { --accent: var(--c3); }
.zone-card[data-c="6"] { --accent: var(--c2); }
.zone-card:hover { box-shadow: 0 12px 40px -10px var(--accent); border-color: rgba(255,255,255,0.15); }

.zone-num {
  font-family: 'DM Mono', monospace;
  font-size: 0.6rem; letter-spacing: 2px; text-transform: uppercase;
  color: var(--accent); margin-bottom: 0.2rem;
  display: flex; align-items: center; justify-content: space-between;
}
.zone-stars-display { letter-spacing: 2px; }

.zone-icon-wrap {
  width: 44px; height: 44px;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border2);
  border-radius: var(--r-sm);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.4rem; margin-bottom: 0.3rem;
}

.zone-title {
  font-family: 'Syne', sans-serif;
  font-size: 0.9rem; font-weight: 700;
  color: var(--text); line-height: 1.2;
}
.zone-desc {
  font-size: 0.78rem; color: var(--text2);
  line-height: 1.55; flex: 1;
}
.zone-tag {
  display: inline-block;
  font-size: 0.6rem; letter-spacing: 1.5px; text-transform: uppercase;
  padding: 0.2rem 0.6rem; border-radius: 4px;
  background: rgba(255,255,255,0.04);
  color: var(--accent); border: 1px solid rgba(255,255,255,0.07);
  margin-top: 0.3rem; width: fit-content;
}
.zone-arrow {
  position: absolute; bottom: 1.1rem; right: 1.1rem;
  font-size: 0.9rem; color: var(--text3);
  transition: transform .2s, color .2s;
}
.zone-card:hover .zone-arrow { transform: translate(3px,-3px); color: var(--accent); }


/* ═══════════════════════════════════════════════
   GAME SCREEN
═══════════════════════════════════════════════ */
#game-screen {
  display: none;
  position: fixed; inset: 0; z-index: 100;
  background: var(--bg);
  overflow-y: auto;
  animation: fadeIn .2s ease;
}
@keyframes fadeIn { from{opacity:0} to{opacity:1} }

.gs-topbar {
  position: sticky; top: 0; z-index: 10;
  display: flex; align-items: center; gap: 1rem;
  padding: 0.85rem 1.5rem;
  background: rgba(8,11,20,0.9);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
}
.btn-back {
  display: flex; align-items: center; gap: 0.4rem;
  background: none; border: 1px solid var(--border2);
  color: var(--text2); font-family: 'Figtree', sans-serif;
  font-size: 0.78rem; font-weight: 600;
  padding: 0.4rem 0.85rem; border-radius: var(--r-sm);
  cursor: pointer; transition: all .15s; white-space: nowrap;
}
.btn-back:hover { border-color: var(--c1); color: var(--c1); background: rgba(126,232,250,0.06); }
.gs-zone-name {
  font-family: 'Syne', sans-serif;
  font-size: 0.82rem; font-weight: 700; flex: 1;
  color: var(--text);
}
.gs-pts-badge {
  font-family: 'DM Mono', monospace;
  font-size: 0.8rem; color: var(--c6);
  background: rgba(251,191,36,0.1);
  border: 1px solid rgba(251,191,36,0.2);
  border-radius: var(--r-sm); padding: 0.3rem 0.7rem;
  white-space: nowrap;
}

/* PROGRESS */
.gs-progress {
  height: 3px; width: 100%;
  background: var(--surface);
}
.gs-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--c1), var(--c3));
  transition: width .5s cubic-bezier(.4,0,.2,1);
}

.gs-body {
  max-width: 680px; margin: 0 auto;
  padding: 2rem 1.2rem 5rem;
}

/* ── QUESTION CARD ── */
.q-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 1.8rem;
  animation: qslide .28s cubic-bezier(.4,0,.2,1);
}
@keyframes qslide { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }

.q-meta {
  display: flex; align-items: center; gap: 0.6rem;
  margin-bottom: 1.2rem;
}
.q-num {
  font-family: 'DM Mono', monospace;
  font-size: 0.65rem; color: var(--text3);
  letter-spacing: 1px;
}
.q-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent, var(--c1));
}
.q-zone-tag {
  font-size: 0.6rem; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--accent, var(--c1));
}

.q-visual {
  background: var(--bg2);
  border: 1px solid var(--border2);
  border-radius: var(--r-sm);
  padding: 1rem 1.2rem;
  margin-bottom: 1.3rem;
  font-family: 'DM Mono', monospace;
  font-size: 0.82rem; line-height: 1.8;
  color: var(--c1);
}

.q-text {
  font-size: 1rem; font-weight: 500;
  line-height: 1.65; color: var(--text);
  margin-bottom: 1.4rem;
}
.q-text strong { color: var(--text); font-weight: 700; }
.q-text em { color: var(--text2); font-style: italic; }

/* OPTIONS */
.options { display: flex; flex-direction: column; gap: 0.55rem; }
.opt {
  background: var(--bg2);
  border: 1.5px solid var(--border);
  border-radius: var(--r-sm);
  padding: 0.85rem 1.1rem;
  cursor: pointer; text-align: left;
  font-family: 'Figtree', sans-serif;
  font-size: 0.88rem; font-weight: 500;
  color: var(--text2);
  transition: all .15s; position: relative;
  display: flex; align-items: center; gap: 0.8rem;
}
.opt-letter {
  width: 22px; height: 22px; border-radius: 6px;
  background: var(--surface); border: 1px solid var(--border2);
  display: flex; align-items: center; justify-content: center;
  font-family: 'DM Mono', monospace;
  font-size: 0.65rem; color: var(--text3);
  flex-shrink: 0; transition: all .15s;
}
.opt:hover:not(:disabled) {
  border-color: rgba(255,255,255,0.2);
  color: var(--text);
  background: rgba(255,255,255,0.04);
}
.opt:hover:not(:disabled) .opt-letter {
  background: var(--surface);
  border-color: var(--c1);
  color: var(--c1);
}
.opt.correct {
  border-color: var(--c4) !important;
  background: rgba(52,211,153,0.08) !important;
  color: var(--c4) !important;
}
.opt.correct .opt-letter { background: rgba(52,211,153,0.2); border-color: var(--c4); color: var(--c4); }
.opt.wrong {
  border-color: var(--c5) !important;
  background: rgba(251,113,133,0.08) !important;
  color: var(--c5) !important;
}
.opt.wrong .opt-letter { background: rgba(251,113,133,0.2); border-color: var(--c5); color: var(--c5); }
.opt:disabled { cursor: default; }

/* INPUT */
.input-row { display: flex; gap: 0.6rem; margin-top: 0.2rem; }
.ans-input {
  flex: 1;
  background: var(--bg2); border: 1.5px solid var(--border2);
  border-radius: var(--r-sm); padding: 0.85rem 1rem;
  font-family: 'DM Mono', monospace; font-size: 1rem;
  color: var(--text); outline: none;
  transition: border-color .15s;
}
.ans-input:focus { border-color: var(--c1); }
.ans-input.correct { border-color: var(--c4); background: rgba(52,211,153,0.07); }
.ans-input.wrong   { border-color: var(--c5); background: rgba(251,113,133,0.07); }

.btn-check {
  background: rgba(126,232,250,0.08);
  border: 1.5px solid rgba(126,232,250,0.25);
  border-radius: var(--r-sm); padding: 0 1.2rem;
  color: var(--c1); font-family: 'Syne', sans-serif;
  font-size: 0.75rem; font-weight: 700; letter-spacing: 1px;
  cursor: pointer; transition: all .15s; white-space: nowrap;
}
.btn-check:hover { background: rgba(126,232,250,0.14); }
.btn-check:disabled { opacity: .4; cursor: default; }

/* FEEDBACK */
.feedback {
  display: none;
  margin-top: 1.2rem;
  padding: 1rem 1.2rem;
  border-radius: var(--r-sm);
  font-size: 0.85rem; line-height: 1.65;
  animation: qslide .2s ease;
}
.feedback.correct-fb {
  background: rgba(52,211,153,0.07);
  border-left: 3px solid var(--c4);
  color: #a7f3d0;
}
.feedback.wrong-fb {
  background: rgba(251,113,133,0.07);
  border-left: 3px solid var(--c5);
  color: #fecdd3;
}
.feedback strong { color: var(--text); }

/* NEXT BUTTON */
.btn-next {
  display: none; width: 100%; margin-top: 1.1rem;
  background: linear-gradient(135deg, var(--c1) 0%, #5b9cf6 100%);
  color: var(--bg); font-family: 'Syne', sans-serif;
  font-size: 0.78rem; font-weight: 800; letter-spacing: 2px;
  text-transform: uppercase;
  padding: 0.9rem; border: none;
  border-radius: var(--r-sm); cursor: pointer;
  transition: filter .15s, transform .15s;
}
.btn-next:hover { filter: brightness(1.1); transform: translateY(-2px); }

/* MONTY HALL DOORS */
.mh-stage {
  text-align: center;
}
.mh-doors-row {
  display: flex; justify-content: center; gap: 1rem;
  margin: 1rem 0;
}
.mh-door {
  width: 90px; height: 130px;
  background: var(--surf2);
  border: 2px solid var(--border2);
  border-radius: 10px 10px 4px 4px;
  cursor: pointer; position: relative;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 0.3rem;
  transition: transform .2s, border-color .2s, box-shadow .2s;
}
.mh-door:hover:not(.no-hover) {
  transform: translateY(-5px);
  border-color: var(--c1);
  box-shadow: 0 8px 24px -6px rgba(126,232,250,0.3);
}
.mh-door .door-num {
  font-family: 'Syne', sans-serif; font-size: 1.8rem; font-weight: 800;
  color: var(--c1); line-height: 1;
}
.mh-door .door-knob {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--c6); position: absolute;
  right: 18%; top: 52%;
}
.mh-door .door-content {
  font-size: 2.2rem;
}
.mh-door .door-lbl {
  font-size: 0.58rem; letter-spacing: 1px;
  text-transform: uppercase; color: var(--text3);
}
.mh-door.is-chosen {
  border-color: var(--c6);
  box-shadow: 0 0 20px -5px rgba(251,191,36,0.4);
}
.mh-door.is-revealed { opacity: 0.5; }
.mh-door.is-winner { border-color: var(--c4); box-shadow: 0 0 20px -5px rgba(52,211,153,0.4); }
.mh-door.is-loser  { border-color: var(--c5); }
.mh-door.no-hover  { cursor: default; }

.mh-msg {
  font-size: 0.88rem; color: var(--text2);
  min-height: 2rem; line-height: 1.5;
  margin: 0.5rem 0;
}
.mh-btn-row {
  display: flex; gap: 0.6rem; justify-content: center;
  flex-wrap: wrap; margin-top: 0.6rem;
}
.mh-btn {
  padding: 0.6rem 1.2rem;
  border-radius: var(--r-sm);
  font-family: 'Syne', sans-serif; font-size: 0.75rem;
  font-weight: 700; letter-spacing: 1px; cursor: pointer;
  border: 1.5px solid; transition: all .15s;
}
.mh-btn.stay { border-color: var(--c5); color: var(--c5); background: rgba(251,113,133,0.08); }
.mh-btn.stay:hover { background: rgba(251,113,133,0.15); }
.mh-btn.swap { border-color: var(--c4); color: var(--c4); background: rgba(52,211,153,0.08); }
.mh-btn.swap:hover { background: rgba(52,211,153,0.15); }

/* DATA CHIPS */
.data-chips {
  display: flex; flex-wrap: wrap; gap: 0.45rem;
  justify-content: center; margin: 0.8rem 0;
}
.dchip {
  background: var(--bg2); border: 1px solid var(--border2);
  border-radius: 7px; padding: 0.4rem 0.75rem;
  font-family: 'DM Mono', monospace; font-size: 0.88rem;
  color: var(--c1);
}

/* ── ZONE COMPLETE ── */
.zone-complete {
  text-align: center;
  padding: 3rem 1rem;
  animation: qslide .35s ease;
}
.zc-icon { font-size: 4rem; margin-bottom: 1rem; }
.zc-title {
  font-family: 'Syne', sans-serif; font-size: 2rem;
  font-weight: 800; color: var(--text); margin-bottom: 0.5rem;
}
.zc-sub { font-size: 0.9rem; color: var(--text2); margin-bottom: 2rem; line-height: 1.6; }
.zc-stars { font-size: 2rem; letter-spacing: 4px; margin-bottom: 1.5rem; }
.zc-btns { display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap; }
.btn-zc {
  padding: 0.75rem 1.8rem;
  border-radius: var(--r-sm); cursor: pointer;
  font-family: 'Syne', sans-serif; font-size: 0.75rem;
  font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
  border: none; transition: all .15s;
}
.btn-zc.primary { background: linear-gradient(135deg,var(--c1),var(--c3)); color: var(--bg); }
.btn-zc.primary:hover { filter: brightness(1.1); transform: translateY(-2px); }
.btn-zc.outline { background: none; border: 1.5px solid var(--border2); color: var(--text2); }
.btn-zc.outline:hover { border-color: var(--c1); color: var(--c1); }

/* ── STREAK TOAST ── */
#toast {
  position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%) translateY(100px);
  z-index: 999;
  background: var(--c6); color: var(--bg);
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: 0.85rem; letter-spacing: 1px;
  padding: 0.6rem 1.4rem; border-radius: 999px;
  transition: transform .3s cubic-bezier(.4,0,.2,1), opacity .3s;
  opacity: 0; pointer-events: none;
  white-space: nowrap;
}
#toast.show { transform: translateX(-50%) translateY(0); opacity: 1; }

/* SCROLLBAR */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg2); }
::-webkit-scrollbar-thumb { background: var(--surf2); border-radius: 3px; }

@media(max-width:480px){
  .hero-title { letter-spacing: -1px; }
  .school-header { padding: 0.8rem 1rem; }
  .gs-topbar { padding: 0.7rem 1rem; }
  .q-card { padding: 1.2rem; }
  .mh-door { width: 75px; height: 110px; }
}
</style>
</head>
<body>

<canvas id="bg-canvas"></canvas>

<!-- ══════════════════════════════════════
     HUB
══════════════════════════════════════ -->
<div id="hub">

  <header class="school-header">
    <div class="school-info">
      <span class="school-name">Los Olivos HomeSchool</span>
      <span class="school-sub">Tercero Medio · Estadística &amp; Probabilidad</span>
    </div>
    <div class="teacher-badge">
      <div class="teacher-avatar">DC</div>
      <div class="teacher-name">Profe <strong>Diego Chaparro</strong></div>
    </div>
  </header>

  <div class="hero">
    <div class="hero-eyebrow">
      <span></span>laboratorio de datos interactivo
    </div>
    <h1 class="hero-title">
      <span class="line1">STAT</span>
      <span class="line2">ARCADE</span>
    </h1>
    <p class="hero-desc">
      6 zonas de desafíos. Datos siempre distintos. Entra a una zona, explora, compite contigo mismo. Pura matemática sin que parezca.
    </p>
  </div>

  <div class="hud-bar">
    <div class="hud-chip pts">
      <div>
        <div class="hv" id="h-pts">0</div>
        <div class="hl">puntos</div>
      </div>
    </div>
    <div class="hud-chip lvl">
      <div>
        <div class="hv" id="h-lvl">1</div>
        <div class="hl">nivel</div>
      </div>
    </div>
    <div class="hud-chip str">
      <div>
        <div class="hv" id="h-str">0</div>
        <div class="hl">racha</div>
      </div>
    </div>
    <div class="hud-chip acc">
      <div>
        <div class="hv" id="h-acc">—</div>
        <div class="hl">precisión</div>
      </div>
    </div>
  </div>

  <p class="zones-label">Elige tu zona</p>

  <div class="zone-grid">
    <div class="zone-card" data-c="1" onclick="enterZone('diagnosis')">
      <div class="zone-num">
        <span>Zona 01</span>
        <span class="zone-stars-display" id="zs-diagnosis">○○○</span>
      </div>
      <div class="zone-icon-wrap">🔬</div>
      <div class="zone-title">Diagnóstico</div>
      <div class="zone-desc">Lee datos, calcula media, mediana, moda y rango. ¿El promedio siempre dice la verdad?</div>
      <div class="zone-tag">estadística básica</div>
      <div class="zone-arrow">↗</div>
    </div>

    <div class="zone-card" data-c="2" onclick="enterZone('lies')">
      <div class="zone-num">
        <span>Zona 02</span>
        <span class="zone-stars-display" id="zs-lies">○○○</span>
      </div>
      <div class="zone-icon-wrap">🪤</div>
      <div class="zone-title">Trampas</div>
      <div class="zone-desc">Gráficos que mienten, promedios engañosos. Detecta la trampa antes de que te atrape.</div>
      <div class="zone-tag">mentiras estadísticas</div>
      <div class="zone-arrow">↗</div>
    </div>

    <div class="zone-card" data-c="3" onclick="enterZone('dispersion')">
      <div class="zone-num">
        <span>Zona 03</span>
        <span class="zone-stars-display" id="zs-dispersion">○○○</span>
      </div>
      <div class="zone-icon-wrap">📡</div>
      <div class="zone-title">Dispersión</div>
      <div class="zone-desc">Calcula varianza y desviación estándar con datos aleatorios. ¿Qué tanto se alejan del promedio?</div>
      <div class="zone-tag">varianza · DE</div>
      <div class="zone-arrow">↗</div>
    </div>

    <div class="zone-card" data-c="4" onclick="enterZone('excel')">
      <div class="zone-num">
        <span>Zona 04</span>
        <span class="zone-stars-display" id="zs-excel">○○○</span>
      </div>
      <div class="zone-icon-wrap">⚡</div>
      <div class="zone-title">Decisiones</div>
      <div class="zone-desc">Compara promedios Y dispersiones para tomar la mejor decisión. Situaciones de vida real.</div>
      <div class="zone-tag">tomar decisiones</div>
      <div class="zone-arrow">↗</div>
    </div>

    <div class="zone-card" data-c="5" onclick="enterZone('probability')">
      <div class="zone-num">
        <span>Zona 05</span>
        <span class="zone-stars-display" id="zs-probability">○○○</span>
      </div>
      <div class="zone-icon-wrap">🎲</div>
      <div class="zone-title">Probabilidad</div>
      <div class="zone-desc">Eventos, condicionales, árboles. ¿Cuánto realmente controlas el azar?</div>
      <div class="zone-tag">prob. condicional</div>
      <div class="zone-arrow">↗</div>
    </div>

    <div class="zone-card" data-c="6" onclick="enterZone('montyhall')">
      <div class="zone-num">
        <span>Zona 06</span>
        <span class="zone-stars-display" id="zs-montyhall">○○○</span>
      </div>
      <div class="zone-icon-wrap">🚪</div>
      <div class="zone-title">Monty Hall</div>
      <div class="zone-desc">El juego de las puertas. Juega rondas reales, acumula datos. ¿Te convence la matemática?</div>
      <div class="zone-tag">monty hall</div>
      <div class="zone-arrow">↗</div>
    </div>
  </div>

</div>

<!-- ══════════════════════════════════════
     GAME SCREEN
══════════════════════════════════════ -->
<div id="game-screen">
  <div class="gs-topbar">
    <button class="btn-back" onclick="backToHub()">← Volver</button>
    <div class="gs-zone-name" id="gs-zname">Zona</div>
    <div class="gs-pts-badge">+<span id="gs-pts">0</span> pts</div>
  </div>
  <div class="gs-progress">
    <div class="gs-progress-fill" id="gs-prog" style="width:0%"></div>
  </div>
  <div class="gs-body" id="gs-body"></div>
</div>

<div id="toast">🔥 ¡Racha! +20 pts bonus</div>

<script>
/* ═══════════════════════════════════════════
   BACKGROUND PARTICLES
═══════════════════════════════════════════ */
(function(){
  const cv = document.getElementById('bg-canvas');
  const ctx = cv.getContext('2d');
  let W, H, pts = [];
  const resize = () => {
    W = cv.width = window.innerWidth;
    H = cv.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);
  const N = 60;
  for(let i=0;i<N;i++){
    pts.push({
      x: Math.random()*1200, y: Math.random()*800,
      vx: (Math.random()-.5)*.3, vy: (Math.random()-.5)*.3,
      r: Math.random()*1.5+.3,
      a: Math.random()
    });
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    pts.forEach(p=>{
      p.x += p.vx; p.y += p.vy;
      if(p.x<0)p.x=W; if(p.x>W)p.x=0;
      if(p.y<0)p.y=H; if(p.y>H)p.y=0;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = `rgba(126,232,250,${p.a*0.35})`;
      ctx.fill();
    });
    // connections
    for(let i=0;i<pts.length;i++){
      for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<120){
          ctx.beginPath();
          ctx.moveTo(pts[i].x,pts[i].y);
          ctx.lineTo(pts[j].x,pts[j].y);
          ctx.strokeStyle=`rgba(126,232,250,${(1-d/120)*0.06})`;
          ctx.lineWidth=1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ═══════════════════════════════════════════
   GLOBAL STATE
═══════════════════════════════════════════ */
const G = {
  pts:0, streak:0, correct:0, total:0,
  zoneQ:0, zonePts:0, zone:null,
  stars:{diagnosis:0,lies:0,dispersion:0,excel:0,probability:0,montyhall:0}
};
const ZONE_LEN = 6;
const ZONE_COLORS = {diagnosis:'var(--c1)',lies:'var(--c5)',dispersion:'var(--c6)',excel:'var(--c4)',probability:'var(--c3)',montyhall:'var(--c2)'};
const ZONE_NAMES  = {diagnosis:'Zona 01 — Diagnóstico',lies:'Zona 02 — Trampas',dispersion:'Zona 03 — Dispersión',excel:'Zona 04 — Decisiones',probability:'Zona 05 — Probabilidad',montyhall:'Zona 06 — Monty Hall'};

const rand  = (a,b) => Math.floor(Math.random()*(b-a+1))+a;
const choose = arr  => arr[Math.floor(Math.random()*arr.length)];
const shuffle = arr => { let a=[...arr]; for(let i=a.length-1;i>0;i--){let j=rand(0,i);[a[i],a[j]]=[a[j],a[i]]} return a; };
const fmt   = n     => Number(n.toFixed(2));
const variance = d  => { const m=d.reduce((a,b)=>a+b,0)/d.length; return d.reduce((a,b)=>a+(b-m)**2,0)/d.length; };
const stdev    = d  => Math.sqrt(variance(d));

/* ═══════════════════════════════════════════
   HUD
═══════════════════════════════════════════ */
function updateHUD(){
  document.getElementById('h-pts').textContent  = G.pts;
  document.getElementById('h-lvl').textContent  = Math.floor(G.pts/200)+1;
  document.getElementById('h-str').textContent  = G.streak;
  const acc = G.total>0 ? Math.round(G.correct/G.total*100)+'%' : '—';
  document.getElementById('h-acc').textContent  = acc;
}
function updateStars(zone, pct){
  const s = pct>=80?3:pct>=50?2:1;
  if(s>G.stars[zone]) G.stars[zone]=s;
  const icons=['○○○','★○○','★★○','★★★'];
  const el=document.getElementById('zs-'+zone);
  if(el) el.textContent=icons[G.stars[zone]];
}

/* ═══════════════════════════════════════════
   TOAST
═══════════════════════════════════════════ */
let toastTimer;
function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),2200);
}

/* ═══════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════ */
function enterZone(zone){
  G.zone=zone; G.zoneQ=0; G.zonePts=0;
  document.getElementById('hub').style.display='none';
  const gs=document.getElementById('game-screen');
  gs.style.display='block';
  gs.scrollTop=0;
  document.getElementById('gs-zname').textContent=ZONE_NAMES[zone];
  document.getElementById('gs-pts').textContent=0;
  // set accent
  document.getElementById('game-screen').style.setProperty('--accent',ZONE_COLORS[zone]);
  nextQuestion();
}
function backToHub(){
  document.getElementById('game-screen').style.display='none';
  document.getElementById('hub').style.display='flex';
  updateHUD();
  window.scrollTo(0,0);
}

/* ═══════════════════════════════════════════
   QUESTION ENGINE
═══════════════════════════════════════════ */
function nextQuestion(){
  const prog=(G.zoneQ/ZONE_LEN)*100;
  document.getElementById('gs-prog').style.width=prog+'%';
  if(G.zoneQ>=ZONE_LEN){showComplete();return;}
  const gen={diagnosis:genDiag,lies:genLies,dispersion:genDisp,excel:genExcel,probability:genProb,montyhall:genMH};
  renderQ(gen[G.zone]());
}

function renderQ(q){
  G.zoneQ++;
  const body=document.getElementById('gs-body');
  body.innerHTML='';
  const card=document.createElement('div');
  card.className='q-card';
  card.style.setProperty('--accent',ZONE_COLORS[G.zone]);

  // meta
  const meta=document.createElement('div');meta.className='q-meta';
  meta.innerHTML=`<span class="q-num">Pregunta ${G.zoneQ} / ${ZONE_LEN}</span><div class="q-dot"></div><span class="q-zone-tag">${ZONE_NAMES[G.zone].split('—')[1].trim()}</span>`;
  card.appendChild(meta);

  // visual
  if(q.visual){
    const vis=document.createElement('div');vis.className='q-visual';
    vis.innerHTML=q.visual;card.appendChild(vis);
  }

  // text
  const qt=document.createElement('div');qt.className='q-text';
  qt.innerHTML=q.text;card.appendChild(qt);

  const fb=document.createElement('div');fb.className='feedback';
  const btnNext=document.createElement('button');
  btnNext.className='btn-next';
  btnNext.textContent=G.zoneQ<ZONE_LEN?'Siguiente →':'Ver resultado →';
  btnNext.onclick=nextQuestion;

  if(q.type==='mc'){
    const opts=document.createElement('div');opts.className='options';
    const letters=['A','B','C','D'];
    q.options.forEach((opt,i)=>{
      const b=document.createElement('button');b.className='opt';
      b.innerHTML=`<span class="opt-letter">${letters[i]}</span>${opt}`;
      b.onclick=function(){
        opts.querySelectorAll('.opt').forEach(x=>x.disabled=true);
        const ok=i===q.correct;
        b.classList.add(ok?'correct':'wrong');
        if(!ok) opts.querySelectorAll('.opt')[q.correct].classList.add('correct');
        doScore(ok);
        fb.style.display='block';
        fb.className='feedback '+(ok?'correct-fb':'wrong-fb');
        fb.innerHTML=(ok?'<strong>¡Correcto! </strong>':'<strong>No esta vez. </strong>')+q.explanation;
        btnNext.style.display='block';
      };
      opts.appendChild(b);
    });
    card.appendChild(opts);
  } else if(q.type==='input'){
    const row=document.createElement('div');row.className='input-row';
    const inp=document.createElement('input');
    inp.className='ans-input';inp.placeholder=q.placeholder||'Tu respuesta...';inp.type='text';
    const chk=document.createElement('button');chk.className='btn-check';chk.textContent='✓ Verificar';
    chk.onclick=function(){
      const v=inp.value.trim().replace(',','.');
      const ok=q.check(v);
      inp.disabled=true;chk.disabled=true;
      inp.classList.add(ok?'correct':'wrong');
      doScore(ok);
      fb.style.display='block';
      fb.className='feedback '+(ok?'correct-fb':'wrong-fb');
      fb.innerHTML=(ok?'<strong>¡Correcto! </strong>':'<strong>No esta vez. </strong>')+q.explanation;
      btnNext.style.display='block';
    };
    inp.addEventListener('keydown',e=>{if(e.key==='Enter')chk.click();});
    row.appendChild(inp);row.appendChild(chk);
    card.appendChild(row);
  } else if(q.type==='special'){
    const div=document.createElement('div');
    div.innerHTML=q.html;
    card.appendChild(div);
  }

  card.appendChild(fb);card.appendChild(btnNext);
  body.appendChild(card);
  if(q.type==='special'&&q.setup) q.setup(card,fb,btnNext);
}

function doScore(ok){
  G.total++;
  if(ok){
    G.correct++;G.streak++;
    const bonus=G.streak>=3?20:0;
    const pts=100+bonus;
    G.pts+=pts;G.zonePts+=pts;
    document.getElementById('gs-pts').textContent=G.zonePts;
    if(G.streak>=3) showToast(`🔥 ¡Racha x${G.streak}! +${bonus} pts bonus`);
  } else { G.streak=0; }
  updateHUD();
}

function showComplete(){
  document.getElementById('gs-prog').style.width='100%';
  const pct=Math.round(G.zonePts/(ZONE_LEN*100)*100);
  updateStars(G.zone,pct);
  const stars=['○○○','★○○','★★○','★★★'][G.stars[G.zone]];
  const icon=pct>=80?'🏆':pct>=50?'⚡':'🔄';
  const title=pct>=80?'¡Zona dominada!':pct>=50?'¡Buen trabajo!':'Sigue intentando';
  const body=document.getElementById('gs-body');
  body.innerHTML=`
    <div class="zone-complete">
      <div class="zc-icon">${icon}</div>
      <div class="zc-title">${title}</div>
      <div class="zc-stars">${stars}</div>
      <div class="zc-sub">Puntos en esta zona: <strong style="color:var(--c6)">${G.zonePts}</strong><br>
      Precisión total: <strong style="color:var(--c1)">${G.total>0?Math.round(G.correct/G.total*100):0}%</strong></div>
      <div class="zc-btns">
        <button class="btn-zc primary" onclick="backToHub()">← Volver al Hub</button>
        <button class="btn-zc outline" onclick="enterZone('${G.zone}')">↺ Repetir zona</button>
      </div>
    </div>`;
}

/* ═══════════════════════════════════════════
   ZONA 1 — DIAGNÓSTICO
═══════════════════════════════════════════ */
function genDiag(){
  return choose([dMean,dMedian,dMode,dRange,dOutlier,dWhich])();
}
function dMean(){
  const n=rand(5,8),data=Array.from({length:n},()=>rand(10,90));
  const mean=fmt(data.reduce((a,b)=>a+b,0)/n);
  const wrong=[fmt(mean+rand(5,15)),fmt(mean-rand(4,10)),fmt(mean*1.1)];
  const opts=shuffle([mean,...wrong.slice(0,3)]);
  return{type:'mc',visual:'[ '+data.join(' , ')+' ]',
    text:'Calcula el <strong>promedio (media aritmética)</strong> de estos datos.',
    options:opts.map(String),correct:opts.indexOf(mean),
    explanation:`Suma = ${data.reduce((a,b)=>a+b,0)} ÷ ${n} = <strong>${mean}</strong>`};
}
function dMedian(){
  const n=rand(3,4)*2-1;
  const data=Array.from({length:n},()=>rand(5,95));
  const sorted=[...data].sort((a,b)=>a-b);
  const med=sorted[Math.floor(n/2)];
  const wrong=[sorted[0],sorted[n-1],fmt((sorted[0]+sorted[n-1])/2)];
  const opts=shuffle([med,...wrong.slice(0,3)]);
  return{type:'mc',visual:'Ordenados: [ '+sorted.join(' , ')+' ]',
    text:'¿Cuál es la <strong>mediana</strong>?',
    options:opts.map(String),correct:opts.indexOf(med),
    explanation:`Con ${n} datos, el valor central es el de la posición ${Math.floor(n/2)+1}: <strong>${med}</strong>`};
}
function dMode(){
  const base=Array.from({length:4},()=>rand(10,50));
  const rep=choose(base);
  const data=shuffle([...base,rep,rand(51,90)]);
  const wrong=[base.find(x=>x!==rep)||rand(10,50),rand(10,50),'No hay moda'];
  const opts=shuffle([rep,...wrong.slice(0,3)]);
  return{type:'mc',visual:'[ '+data.join(' , ')+' ]',
    text:'¿Cuál es la <strong>moda</strong>?',
    options:opts.map(String),correct:opts.indexOf(rep),
    explanation:`<strong>${rep}</strong> aparece 2 veces, más que cualquier otro valor.`};
}
function dRange(){
  const data=Array.from({length:6},()=>rand(5,80));
  const range=Math.max(...data)-Math.min(...data);
  const opts=shuffle([range,range+rand(5,15),range-rand(2,8),Math.max(...data)]);
  return{type:'mc',visual:'[ '+data.join(' , ')+' ]',
    text:'¿Cuál es el <strong>rango</strong>?',
    options:opts.map(String),correct:opts.indexOf(range),
    explanation:`Rango = ${Math.max(...data)} − ${Math.min(...data)} = <strong>${range}</strong>`};
}
function dOutlier(){
  const data=Array.from({length:5},()=>rand(40,60));
  const out=rand(0,1)?rand(100,130):rand(1,15);
  const sd=[...data,out];const sdata=shuffle(sd);
  const mw=fmt(sdata.reduce((a,b)=>a+b,0)/sdata.length);
  const mwo=fmt(data.reduce((a,b)=>a+b,0)/data.length);
  const opts=['Sube mucho el promedio','Baja mucho el promedio','No afecta el promedio','Solo afecta la moda'];
  const correct=out>60?0:1;
  return{type:'mc',visual:'[ '+sdata.join(' , ')+' ]',
    text:`El valor <strong>${out}</strong> parece muy diferente. ¿Qué le hace al promedio?`,
    options:opts,correct,
    explanation:`Sin ese valor el promedio sería ~${mwo}. Con él es ~${mw}. Los valores extremos distorsionan el promedio.`};
}
function dWhich(){
  const casos=[
    {text:'Quieres saber cuánto gana "la persona del medio" en un país con millonarios y personas pobres.',c:1,e:'La <strong>mediana</strong> ignora extremos. Perfecta cuando hay outliers como sueldos muy altos o muy bajos.'},
    {text:'Quieres el promedio exacto de las notas de 30 alumnos.',c:0,e:'La <strong>media aritmética</strong> es el promedio clásico: suma todo y divide.'},
    {text:'Una tienda quiere saber qué talla de zapato comprar en mayor cantidad.',c:2,e:'La <strong>moda</strong> es el valor más frecuente. Ideal para decisiones de stock.'},
    {text:'Quieres saber cuánto varía el precio de un producto entre su mínimo y máximo.',c:3,e:'El <strong>rango</strong> = máximo − mínimo. Mide amplitud total.'},
  ];
  const s=choose(casos);
  return{type:'mc',text:s.text,
    options:['La media','La mediana','La moda','El rango'],correct:s.c,explanation:s.e};
}

/* ═══════════════════════════════════════════
   ZONA 2 — TRAMPAS
═══════════════════════════════════════════ */
function genLies(){return choose([lEje,lMuestra,lPromedio,lPorcentaje,lCausalidad])();}
function lEje(){
  const casos=[
    {vis:'📊 Titular: "Las ventas subieron 300%"\n⚠ Eje Y va de 980 a 1000. Las ventas pasaron de 980 a 1000 unidades.',
    q:'¿Qué hace engañoso este gráfico?',
    opts:['El eje Y no empieza en 0, exagerando el cambio','Los datos son inventados','El gráfico usa mal los colores','No tiene eje X'],
    c:0,e:'Eje Y truncado: hace que cambios pequeños parezcan enormes. Siempre verifica desde dónde parte el eje.'},
    {vis:'📊 Titular: "El crimen cayó a mínimos históricos"\n⚠ Eje Y va de 95 a 100. Casos: 100 → 97.',
    q:'¿Qué hace engañoso este gráfico?',
    opts:['El eje empieza en 95, haciendo parecer una caída enorme','Los datos son incorrectos','El gráfico está al revés','Faltan los años'],
    c:0,e:'Una caída de 3 casos parece catastrófica con eje truncado. Siempre mira si el eje parte en 0.'},
  ];
  const s=choose(casos);
  return{type:'mc',visual:s.vis.replace(/\n/g,'<br>'),text:s.q,options:s.opts,correct:s.c,explanation:s.e};
}
function lMuestra(){
  const casos=[
    {text:'"El 90% de nuestros clientes recomienda el producto." — Encuesta a 10 personas en la tienda.',
    c:0,e:'10 personas en la tienda son pocas y sesgadas (ya son clientes satisfechos). La muestra debe ser representativa.'},
    {text:'"Los alumnos de esta escuela son los más felices del país." — Encuesta online respondida por 15 estudiantes.',
    c:0,e:'Solo respondieron 15 de cientos, probablemente los más motivados. Sesgo de autoselección.'},
  ];
  const s=choose(casos);
  return{type:'mc',text:'Detecta el problema estadístico: <em>'+s.text+'</em>',
    options:['La muestra es muy pequeña y/o sesgada','El porcentaje está mal calculado','Las encuestas nunca son válidas','El dato debería ser mayor'],
    correct:0,explanation:s.e};
}
function lPromedio(){
  const salaries=Array.from({length:5},()=>rand(400,600));
  const boss=rand(8000,15000);
  const all=[...salaries,boss];
  const mean=fmt(all.reduce((a,b)=>a+b,0)/all.length);
  const med=[...salaries].sort((a,b)=>a-b)[2];
  const opts=shuffle([`El promedio ($${mean}) se distorsiona por el sueldo del jefe`,`La mediana ($${med}) no es representativa`,`Todos ganan igual`,`El cálculo es incorrecto`]);
  return{type:'mc',
    visual:`Sueldos: $${salaries.join(' — $')} — $${boss} (jefe)<br>Promedio: $${mean} | Mediana: $${med}`,
    text:`La empresa dice: <em>"El sueldo promedio es $${mean}."</em> ¿Qué problema tiene?`,
    options:opts,correct:opts.indexOf(`El promedio ($${mean}) se distorsiona por el sueldo del jefe`),
    explanation:`El sueldo del jefe ($${boss}) infla el promedio. La mediana ($${med}) representa mejor a la mayoría.`};
}
function lPorcentaje(){
  const casos=[
    {vis:`📰 "Accidentes de avión subieron ${rand(50,200)}%" — Pasaron de 2 a 3.`,q:'¿Por qué este porcentaje puede ser engañoso?',
    opts:['Porcentaje grande sobre base muy pequeña (2 casos)','El porcentaje está mal calculado','Los aviones no pueden accidentarse','Los datos no son comparables'],
    c:0,e:'Un porcentaje impresionante sobre una base mínima crea alarma innecesaria. 2→3 casos = 50% de aumento, pero sigue siendo rarísimo.'},
    {vis:`📰 "Nuestro medicamento reduce el riesgo en un ${rand(40,60)}%." — El riesgo bajó de 0.2% a 0.1%.`,
    q:'¿Qué información crítica falta?',
    opts:['El riesgo absoluto: bajó de 0.2% a 0.1%, una diferencia mínima','El nombre del medicamento','El precio','La dosis exacta'],
    c:0,e:'Reducción relativa del 50% suena enorme. Pero 0.2% → 0.1% cambia muy poco en términos absolutos. Siempre pide los números reales.'},
  ];
  const s=choose(casos);
  return{type:'mc',visual:s.vis,text:s.q,options:s.opts,correct:s.c,explanation:s.e};
}
function lCausalidad(){
  const pares=[
    {a:'Consumo de helado',b:'ahogamientos',causa:'la temperatura',text:'Cuando sube el consumo de helado, también suben los ahogamientos. ¿Los helados causan ahogamientos?'},
    {a:'Número de hospitales',b:'muertes hospitalarias',causa:'la gravedad de los pacientes',text:'Ciudades con más hospitales tienen más muertes. ¿Los hospitales causan muertes?'},
    {a:'Ventas de paraguas',b:'resfríos',causa:'la lluvia y el frío',text:'Cuando suben las ventas de paraguas, también suben los resfríos. ¿Los paraguas causan resfríos?'},
  ];
  const p=choose(pares);
  return{type:'mc',
    visual:`📈 Correlación: ${p.a} ↔ ${p.b}`,
    text:p.text,
    options:[`Están correlacionados pero la causa real es ${p.causa}`,'La correlación prueba causalidad directa','Los datos están mal medidos','Son eventos independientes'],
    correct:0,
    explanation:`<strong>Correlación ≠ Causalidad.</strong> Ambas variables pueden moverse juntas por una tercera causa (${p.causa}).`};
}

/* ═══════════════════════════════════════════
   ZONA 3 — DISPERSIÓN
═══════════════════════════════════════════ */
function genDisp(){return choose([dispCalc,dispCompare,dispConcept,dispInput])();}
function dispCalc(){
  const data=Array.from({length:5},()=>rand(10,50));
  const v=fmt(variance(data)),sd=fmt(stdev(data));
  const mean=fmt(data.reduce((a,b)=>a+b,0)/data.length);
  const askSD=rand(0,1)===0;
  const ans=askSD?sd:v;
  const opts=shuffle([ans,fmt(ans+rand(3,10)),fmt(Math.abs(ans-rand(2,8))),fmt(ans*1.2)]);
  return{type:'mc',
    visual:'[ '+data.join(' , ')+' ]<br>Media = '+mean,
    text:askSD?'Calcula la <strong>desviación estándar</strong> aproximada.':'Calcula la <strong>varianza</strong> aproximada.',
    options:opts.map(String),correct:opts.indexOf(ans),
    explanation:askSD?`Varianza = ${v} → DE = √${v} ≈ <strong>${sd}</strong>`:
      `Varianza = promedio de (dato − media)² ≈ <strong>${v}</strong>`};
}
function dispCompare(){
  const A=Array.from({length:5},()=>rand(45,55));
  const B=[rand(10,30),rand(30,50),rand(50,70),rand(70,85),rand(15,40)];
  const sdA=fmt(stdev(A)),sdB=fmt(stdev(B));
  const mA=fmt(A.reduce((a,b)=>a+b,0)/A.length),mB=fmt(B.reduce((a,b)=>a+b,0)/B.length);
  const betterA=sdA<sdB;
  return{type:'mc',
    visual:`Grupo A: [ ${A.join(' , ')} ] → media ≈ ${mA}<br>Grupo B: [ ${B.join(' , ')} ] → media ≈ ${mB}`,
    text:'¿Cuál grupo es más <strong>consistente</strong> (menos disperso)?',
    options:['Grupo A (menor desviación)','Grupo B (mayor desviación)','Son igual de consistentes','No se puede comparar'],
    correct:betterA?0:1,
    explanation:`DE del Grupo A ≈ ${sdA} | DE del Grupo B ≈ ${sdB}. El grupo con menor DE es más consistente.`};
}
function dispConcept(){
  const qs=[
    {text:'¿Qué mide la <strong>desviación estándar</strong>?',opts:['Qué tan alejados están los datos de su promedio','El valor más alto menos el más bajo','La suma de todos los datos','El dato más frecuente'],c:0,e:'La DE es el "alejamiento típico" de cada dato respecto al promedio.'},
    {text:'Si la varianza de un conjunto es <strong>0</strong>, ¿qué significa?',opts:['Todos los datos son iguales','No hay datos','El promedio es 0','Los datos son negativos'],c:0,e:'Varianza = 0 → no hay dispersión alguna. Todos los valores son idénticos.'},
    {text:'Dos grupos tienen el <strong>mismo promedio</strong>. ¿Pueden ser muy distintos?',opts:['Sí, si tienen distinta dispersión','No, igual promedio = grupos idénticos','Solo si tienen diferente cantidad de datos','Nunca'],c:0,e:'El promedio no cuenta toda la historia. Igual media puede esconder dispersiones muy distintas.'},
    {text:'¿Por qué se elevan al cuadrado las diferencias para calcular la varianza?',opts:['Para eliminar los negativos y penalizar más los extremos','Porque es más fácil','Para evitar dividir por cero','El promedio ya lo hace'],c:0,e:'Sin elevar al cuadrado, los negativos y positivos se cancelarían dando 0. El cuadrado también amplifica los valores extremos.'},
  ];
  const s=choose(qs);
  return{type:'mc',text:s.text,options:s.opts,correct:s.c,explanation:s.e};
}
function dispInput(){
  const data=Array.from({length:4},()=>rand(5,25)*2);
  const sd=fmt(stdev(data));
  const mean=fmt(data.reduce((a,b)=>a+b,0)/data.length);
  return{type:'input',
    visual:`[ ${data.join(' , ')} ]<br>Media = ${mean}`,
    text:'Calcula la <strong>desviación estándar</strong> (redondea a 2 decimales).',
    placeholder:`Ej: ${sd}`,
    check:val=>{const n=parseFloat(val);return !isNaN(n)&&Math.abs(n-sd)<0.6;},
    explanation:`DE = √Varianza. Resultado correcto: <strong>${sd}</strong>`};
}

/* ═══════════════════════════════════════════
   ZONA 4 — DECISIONES
═══════════════════════════════════════════ */
function genExcel(){return choose([exJob,exInvest,exScores,exConcept])();}
function exJob(){
  const mA=rand(800,1200),sdA=rand(20,80);
  const mB=mA+rand(-150,200),sdB=rand(200,500);
  const stable=sdA<sdB?'Empresa A':'Empresa B';
  const high=mA>mB?'Empresa A':'Empresa B';
  const casos=[
    {q:'Necesitas sueldo fijo para pagar arriendo. ¿Cuál empresa?',c:sdA<sdB?0:1,e:`<strong>${stable}</strong> tiene menor DE ($${Math.min(sdA,sdB)}): sueldos más predecibles.`},
    {q:'Quieres maximizar el sueldo promedio aunque varíe. ¿Cuál empresa?',c:mA>mB?0:1,e:`<strong>${high}</strong> tiene mayor promedio ($${Math.max(mA,mB)}). Más retorno, mayor variabilidad.`},
  ];
  const s=choose(casos);
  return{type:'mc',
    visual:`Empresa A → Media: $${mA} | DE: $${sdA}<br>Empresa B → Media: $${mB} | DE: $${sdB}`,
    text:s.q,options:['Empresa A','Empresa B','Son equivalentes','Depende de otros factores'],
    correct:s.c,explanation:s.e};
}
function exInvest(){
  const fA={ret:rand(8,12),sd:rand(1,4)};
  const fB={ret:rand(11,18),sd:rand(15,30)};
  const casos=[
    {q:'Eres joven y toleras riesgo. Buscas máxima rentabilidad esperada.',c:1,e:`Fondo B tiene mayor retorno (${fB.ret}%). El riesgo es tolerable con horizonte largo.`},
    {q:'Te jubilas en 2 años. No puedes perder.',c:0,e:`Fondo A tiene DE muy baja (${fA.sd}%). Menos retorno, casi sin riesgo. Prioritario al jubilarse.`},
  ];
  const s=choose(casos);
  return{type:'mc',
    visual:`Fondo A → Retorno: ${fA.ret}% | Riesgo (DE): ${fA.sd}%<br>Fondo B → Retorno: ${fB.ret}% | Riesgo (DE): ${fB.sd}%`,
    text:s.q,options:['Fondo A','Fondo B','Son equivalentes','No hay info suficiente'],
    correct:s.c,explanation:s.e};
}
function exScores(){
  const A=Array.from({length:5},()=>rand(55,75));
  const B=[rand(20,45),rand(20,45),rand(80,100),rand(80,100),rand(45,60)];
  const mA=fmt(A.reduce((a,b)=>a+b,0)/A.length);
  const mB=fmt(B.reduce((a,b)=>a+b,0)/B.length);
  const sdA=fmt(stdev(A)),sdB=fmt(stdev(B));
  return{type:'mc',
    visual:`Curso A: [ ${A.join(' , ')} ] → media ${mA} | DE ${sdA}<br>Curso B: [ ${B.join(' , ')} ] → media ${mB} | DE ${sdB}`,
    text:'¿En cuál curso el conocimiento quedó más <strong>parejo</strong>?',
    options:['Curso A (todos aprendieron similar)','Curso B (alta variabilidad)','Son idénticos','No se puede saber'],
    correct:0,
    explanation:`Curso A: DE = ${sdA} vs Curso B: DE = ${sdB}. El Curso A es mucho más homogéneo.`};
}
function exConcept(){
  const qs=[
    {text:'¿Cuándo importa más la DE que el promedio?',opts:['Cuando hay mucha variabilidad y el promedio puede engañar','Cuando todos los datos son iguales','Cuando hay pocos datos','Cuando el promedio es cero'],c:0,e:'Si los datos son dispersos, el promedio no representa a nadie. La DE revela cuánto confiar en él.'},
    {text:'Un proceso industrial tiene media 100 y DE 0.3. ¿Qué significa?',opts:['El proceso es muy preciso y consistente','El proceso es impredecible','El promedio no es confiable','Los datos están mal medidos'],c:0,e:'DE muy pequeña = proceso extremadamente consistente. En manufactura o medicina, eso es lo ideal.'},
  ];
  const s=choose(qs);
  return{type:'mc',text:s.text,options:s.opts,correct:s.c,explanation:s.e};
}

/* ═══════════════════════════════════════════
   ZONA 5 — PROBABILIDAD
═══════════════════════════════════════════ */
function genProb(){return choose([pBasic,pConditional,pTree,pComplement,pConcept])();}
function pBasic(){
  const total=rand(10,20)*2,fav=rand(2,total-2);
  const prob=fmt(fav/total);
  const opts=shuffle([prob,fmt((fav+1)/total),fmt(fav/(total+2)),fmt((total-fav)/total)]);
  const scenarios=[
    `Una bolsa tiene ${total} caramelos: ${fav} rojos y ${total-fav} azules. Sacas uno al azar. ¿Probabilidad de sacar uno <strong>rojo</strong>?`,
    `Un dado especial tiene ${total} caras. ${fav} de ellas son ganadoras. ¿Probabilidad de ganar?`,
    `En una caja hay ${total} fichas numeradas. ${fav} son ganadoras. ¿Probabilidad de sacar una ganadora?`,
  ];
  return{type:'mc',text:choose(scenarios),options:opts.map(String),correct:opts.indexOf(prob),
    explanation:`P = casos favorables / total = ${fav} / ${total} = <strong>${prob}</strong>`};
}
function pConditional(){
  const total=rand(80,120);
  const con=rand(20,40),sin=total-con;
  const posC=Math.round(con*(rand(85,95)/100));
  const posS=Math.round(sin*(rand(5,15)/100));
  const totalPos=posC+posS;
  const ans=fmt(posC/totalPos);
  const opts=shuffle([ans,fmt(posC/total),fmt(con/total),fmt(totalPos/total)]);
  return{type:'mc',
    visual:`De ${total} personas:<br>— ${con} tienen la enfermedad → ${posC} dan positivo<br>— ${sin} sanas → ${posS} falso positivo<br>Total positivos: ${totalPos}`,
    text:'Una persona da <strong>positivo</strong>. ¿Probabilidad de que realmente esté enferma?',
    options:opts.map(String),correct:opts.indexOf(ans),
    explanation:`P(enfermedad | positivo) = ${posC} / ${totalPos} = <strong>${ans}</strong>. Los falsos positivos son clave.`};
}
function pTree(){
  const pA=rand(3,7)/10,pBgivenA=rand(5,9)/10,pBgivenNA=rand(1,4)/10;
  const ans=fmt(pA*pBgivenA);
  const opts=shuffle([ans,fmt(pA*pBgivenNA),fmt((1-pA)*pBgivenA),fmt(pBgivenA)]);
  return{type:'mc',
    visual:`P(lluvia) = ${pA}<br>P(paraguas | lluvia) = ${pBgivenA}<br>P(paraguas | no lluvia) = ${pBgivenNA}`,
    text:'¿Probabilidad de que llueva <strong>Y</strong> alguien lleve paraguas?',
    options:opts.map(String),correct:opts.indexOf(ans),
    explanation:`P(lluvia ∩ paraguas) = ${pA} × ${pBgivenA} = <strong>${ans}</strong>`};
}
function pComplement(){
  const p=rand(2,8)/10;const comp=fmt(1-p);
  const qs=[
    {text:`P(ganar) = ${p}. ¿P(no ganar)?`,ans:comp,e:`Complemento: 1 − ${p} = <strong>${comp}</strong>`},
    {text:`Un evento tiene P = ${p}. ¿P(no ocurra)?`,ans:comp,e:`P(no A) = 1 − P(A) = 1 − ${p} = <strong>${comp}</strong>`},
  ];
  const s=choose(qs);
  const opts=shuffle([s.ans,fmt(s.ans+0.1),fmt(p),fmt(Math.abs(s.ans-0.1))]);
  return{type:'mc',text:s.text,options:opts.map(String),correct:opts.indexOf(s.ans),explanation:s.e};
}
function pConcept(){
  const qs=[
    {text:'¿Qué significa P(A|B)?',opts:['Probabilidad de A dado que B ya ocurrió','A más B','P(A) o P(B)','Ninguno ocurre'],c:0,e:'P(A|B) = probabilidad de A <em>sabiendo que</em> B ocurrió. El conocimiento de B actualiza la probabilidad.'},
    {text:'Si P(A) = 0.4 y P(A|B) = 0.8, ¿qué implica?',opts:['Saber que B ocurrió hace A más probable (son dependientes)','B es imposible','A y B son independientes','A no ocurre sin B'],c:0,e:'P(A|B) ≠ P(A) → los eventos son <strong>dependientes</strong>: B aporta información sobre A.'},
    {text:'Dos eventos son <strong>independientes</strong> cuando:',opts:['P(A|B) = P(A)','P(A|B) = 0','P(A)+P(B)=1','Nunca ocurren juntos'],c:0,e:'Independencia = conocer B no cambia la probabilidad de A.'},
  ];
  const s=choose(qs);
  return{type:'mc',text:s.text,options:s.opts,correct:s.c,explanation:s.e};
}

/* ═══════════════════════════════════════════
   ZONA 6 — MONTY HALL
═══════════════════════════════════════════ */
function genMH(){return choose([mhPlay,mhConcept,mhSim,mhCalc])();}

function mhPlay(){
  const carPos=rand(0,2);
  let chosen=null,revealed=null,stage='pick';
  const html=`
    <div class="mh-stage">
      <div class="mh-doors-row" id="mhrow">
        ${[0,1,2].map(i=>`<div class="mh-door" id="mhd-${i}" onclick="mhPick(${i})">
          <div class="door-num">${i+1}</div>
          <div class="door-knob"></div>
          <div class="door-lbl">puerta</div>
        </div>`).join('')}
      </div>
      <div class="mh-msg" id="mhmsg">Toca una puerta para empezar</div>
      <div class="mh-btn-row" id="mhbtns" style="display:none"></div>
    </div>`;
  return{type:'special',
    text:'🎮 <strong>Juega una ronda real.</strong> Elige puerta → Monty revela una cabra → ¿Te quedas o cambias?',
    html,
    setup(card,fb,btnNext){
      window.mhPick=function(i){
        if(stage!=='pick')return;
        stage='decide';chosen=i;
        document.getElementById('mhd-'+i).classList.add('is-chosen','no-hover');
        let cands=[0,1,2].filter(x=>x!==chosen&&x!==carPos);
        revealed=choose(cands);
        const rd=document.getElementById('mhd-'+revealed);
        rd.classList.add('is-revealed','no-hover');
        rd.innerHTML='<div class="door-content">🐐</div><div class="door-lbl">¡Cabra!</div>';
        document.getElementById('mhmsg').textContent=`Monty abre la Puerta ${revealed+1}. ¿Te quedas con la Puerta ${chosen+1} o cambias?`;
        const other=[0,1,2].find(x=>x!==chosen&&x!==revealed);
        document.getElementById('mhbtns').style.display='flex';
        document.getElementById('mhbtns').innerHTML=`
          <button class="mh-btn stay" onclick="mhDecide('stay')">🚪 Quedarme (${chosen+1})</button>
          <button class="mh-btn swap" onclick="mhDecide('swap',${other})">🔄 Cambiar (${other+1})</button>`;
        [0,1,2].forEach(x=>document.getElementById('mhd-'+x).classList.add('no-hover'));
      };
      window.mhDecide=function(choice,other){
        if(stage!=='decide')return;stage='done';
        const final=choice==='swap'?other:chosen;
        const won=final===carPos;
        [0,1,2].forEach(x=>{
          const d=document.getElementById('mhd-'+x);
          d.classList.add('no-hover');
          d.innerHTML=x===carPos?'<div class="door-content">🚗</div>':'<div class="door-content">🐐</div>';
        });
        document.getElementById('mhd-'+final).classList.add(won?'is-winner':'is-loser');
        document.getElementById('mhbtns').style.display='none';
        document.getElementById('mhmsg').innerHTML=won
          ?`<span style="color:var(--c4)">¡Ganaste! 🎉 El auto estaba en la Puerta ${carPos+1}.</span>`
          :`<span style="color:var(--c5)">Perdiste. El auto estaba en la Puerta ${carPos+1}.</span>`;
        doScore(won);
        fb.style.display='block';
        fb.className='feedback '+(won?'correct-fb':'wrong-fb');
        fb.innerHTML=choice==='swap'
          ?(won?'<strong>¡Cambiaste y ganaste!</strong> Cambiar gana el 66% de las veces.':'<strong>Cambiaste pero perdiste.</strong> Igual es la estrategia correcta — gana 2 de cada 3.')
          :(won?'<strong>¡Te quedaste y ganaste!</strong> Pero quedarse solo gana el 33%.':'<strong>Te quedaste y perdiste.</strong> Cambiar tenía el doble de probabilidad de ganar.');
        btnNext.style.display='block';
      };
    }};
}
function mhConcept(){
  const qs=[
    {text:'¿Cuál es la probabilidad de ganar si <strong>siempre cambias</strong>?',opts:['2/3 ≈ 66.7%','1/2 = 50%','1/3 ≈ 33.3%','3/4 = 75%'],c:0,e:'Al cambiar, ganas siempre que tu primera elección fue una cabra (probabilidad 2/3).'},
    {text:'¿Por qué la probabilidad NO es 50/50 cuando quedan 2 puertas?',opts:['Porque Monty sabe dónde está el auto y siempre abre una cabra intencionalmente','Porque el auto se mueve','Porque quedan solo 2 puertas','Porque Monty elige al azar'],c:0,e:'Monty <strong>nunca</strong> revela el auto. Su elección aporta información real que cambia las probabilidades.'},
    {text:'¿Cuál es la probabilidad de ganar si <strong>nunca cambias</strong>?',opts:['1/3 ≈ 33.3%','1/2 = 50%','2/3 ≈ 66.7%','Depende del número de puertas'],c:0,e:'Si nunca cambias, solo ganas si tu primera elección fue correcta: probabilidad 1/3.'},
    {text:'¿Qué tipo de probabilidad se aplica en el Problema de Monty Hall?',opts:['Probabilidad condicional (la información de Monty actualiza las probabilidades)','Probabilidad clásica simple','Probabilidad frecuencial','Probabilidad subjective'],c:0,e:'Es probabilidad <strong>condicional</strong>: cuando Monty abre una puerta, actualiza toda la distribución de probabilidades.'},
  ];
  const s=choose(qs);
  return{type:'mc',text:s.text,options:s.opts,correct:s.c,explanation:s.e};
}
function mhSim(){
  const n=rand(60,150);
  const sw=Math.round(n*(0.62+Math.random()*0.08));
  const st=n-sw;
  const swp=fmt(sw/n*100),stp=fmt(st/n*100);
  return{type:'mc',
    visual:`Simulación de ${n} rondas:<br>— Estrategia "quedarse": ${st} victorias (${stp}%)<br>— Estrategia "cambiar": ${sw} victorias (${swp}%)`,
    text:'Basándote en la simulación, ¿qué estrategia recomendarías?',
    options:['Siempre cambiar (más victorias históricas)','Siempre quedarse','Son equivalentes','Depende de la suerte'],
    correct:0,
    explanation:`Los datos confirman la teoría: cambiar gana ~66% del tiempo. Con ${n} rondas ya es visible claramente.`};
}
function mhCalc(){
  const doors=rand(4,6);
  const pSwap=fmt((doors-1)/doors/(doors-2));
  const opts=shuffle([pSwap,fmt(1/(doors-1)),fmt(0.5),fmt(1/(doors-2))].filter(x=>x>0));
  return{type:'mc',
    visual:`Variación: ${doors} puertas, 1 auto, Monty abre 1 cabra`,
    text:`Con <strong>${doors} puertas</strong>, Monty abre una con cabra. ¿Probabilidad de ganar al cambiar a una de las ${doors-2} restantes?`,
    options:opts.map(String),correct:opts.indexOf(pSwap),
    explanation:`P(cambiar y ganar) = (1 − 1/${doors}) / ${doors-2} = ${fmt((doors-1)/doors)} / ${doors-2} ≈ <strong>${pSwap}</strong>`};
}

/* INIT */
updateHUD();
</script>
</body>
</html>