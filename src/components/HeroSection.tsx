import { ArrowRight, Download, Sparkles, Zap, Layers, Star, Code2, Activity } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import { motion, animate } from "framer-motion";
import TechMarquee from "./TechMarquee";
import { useEffect, useRef, useState } from "react";

/* ── Animated number counter ── */
function AnimatedNumber({ to, suffix = "" }: { to: number; suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const controls = animate(0, to, {
      duration: 1.8, ease: "easeOut",
      onUpdate(value) { node.textContent = Math.round(value) + suffix; },
    });
    return () => controls.stop();
  }, [to, suffix]);
  return <span ref={nodeRef}>0{suffix}</span>;
}

/* ── Typing effect ── */
function TypingText({ phrases }: { phrases: string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[idx];
    let timeout: ReturnType<setTimeout>;
    if (!deleting && text === phrase) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % phrases.length);
    } else {
      timeout = setTimeout(() => {
        setText(deleting ? phrase.slice(0, text.length - 1) : phrase.slice(0, text.length + 1));
      }, deleting ? 40 : 80);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, idx, phrases]);

  return (
    <span>
      {text}
      <span className="typed-cursor">&nbsp;</span>
    </span>
  );
}

/* ── Interactive Particle Vortex Nebula Canvas (Matches Reference Image) ── */
function CosmicParticleVortex() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle Swarm configuration
    const particleCount = 280;
    const particles: Array<{
      x: number;
      y: number;
      ox: number;
      oy: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      speed: number;
      angle: number;
    }> = [];

    const colors = ["#818CF8", "#6366F1", "#38BDF8", "#C084FC", "#FFFFFF", "#3B82F6"];

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 220 + 20;
      const angle = Math.random() * Math.PI * 2;
      const cx = width * 0.5;
      const cy = height * 0.45;
      const px = cx + Math.cos(angle) * radius;
      const py = cy + Math.sin(angle) * radius * 0.8;

      particles.push({
        x: px,
        y: py,
        ox: px,
        oy: py,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2.5 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.008 + 0.003,
        angle: angle,
      });
    }

    let t = 0;
    const render = () => {
      t += 0.01;
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.45;

      // Draw central ambient glow
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 250);
      grad.addColorStop(0, "rgba(99, 102, 241, 0.25)");
      grad.addColorStop(0.5, "rgba(56, 189, 248, 0.12)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 250, 0, Math.PI * 2);
      ctx.fill();

      // Render and orbit particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.angle += p.speed;

        // Spiral vortex movement
        const radius = 60 + Math.sin(t + i) * 120 + (i % 50) * 3;
        p.x = cx + Math.cos(p.angle) * radius + Math.sin(t * 0.5 + i) * 20;
        p.y = cy + Math.sin(p.angle) * (radius * 0.75) + Math.cos(t * 0.5 + i) * 15;

        // Draw particle dot
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size > 2 ? 8 : 4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

const CODE_LINES = [
  { tokens: [{ t: "const ", c: "#C792EA" }, { t: "developer", c: "#82AAFF" }, { t: " = {", c: "#89DDFF" }] },
  { tokens: [{ t: "  focus: ", c: "#89DDFF" }, { t: "[", c: "#89DDFF" }] },
  { tokens: [{ t: "    ", c: "#fff" }, { t: '"AI & RAG Systems"', c: "#C3E88D" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "    ", c: "#fff" }, { t: '"Automation Pipelines"', c: "#C3E88D" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "    ", c: "#fff" }, { t: '"Computer Vision"', c: "#C3E88D" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "    ", c: "#fff" }, { t: '"Scalable AI APIs"', c: "#C3E88D" }] },
  { tokens: [{ t: "  ]", c: "#89DDFF" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "  stack: ", c: "#89DDFF" }, { t: "[", c: "#89DDFF" }] },
  { tokens: [{ t: "    ", c: "#fff" }, { t: '"Python / PyTorch"', c: "#C3E88D" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "    ", c: "#fff" }, { t: '"FastAPI & LangChain"', c: "#C3E88D" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "    ", c: "#fff" }, { t: '"React / TypeScript"', c: "#C3E88D" }] },
  { tokens: [{ t: "  ]", c: "#89DDFF" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "  award: ", c: "#89DDFF" }, { t: '"🥇 NLPC-2025 Winner"', c: "#C3E88D" }] },
  { tokens: [{ t: "}", c: "#89DDFF" }] },
];

const TECH_STACK = [
  { name: "Python", icon: "🐍" }, { name: "PyTorch", icon: "🔥" }, { name: "TensorFlow", icon: "🧠" },
  { name: "React", icon: "⚛️" }, { name: "FastAPI", icon: "⚡" }, { name: "Docker", icon: "🐳" },
  { name: "LangChain", icon: "🔗" }, { name: "ESP32", icon: "📡" },
];

const HeroSection = () => {
  const stats = [
    { label: "Avg Accuracy", value: 96.4, suffix: "%", icon: <Activity size={13} /> },
    { label: "Projects", value: 15, suffix: "+", icon: <Layers size={13} /> },
    { label: "GitHub Stars", value: 48, suffix: "", icon: <Star size={13} /> },
    { label: "Lines of Code", value: 120, suffix: "K+", icon: <Code2 size={13} /> },
  ];

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-0 overflow-hidden flex flex-col bg-[#020617]">

      {/* ── Particle Vortex Cosmic Background (Matches Reference Image) ── */}
      <CosmicParticleVortex />

      <div className="container flex-1 flex flex-col justify-center py-8 lg:py-16 relative z-10">

        {/* ── Two-column hero layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Text content ── */}
          <div className="flex flex-col gap-6">

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2"
            >
              <span className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold border backdrop-blur-md"
                style={{ background: "rgba(16,185,129,0.1)", borderColor: "rgba(16,185,129,0.3)", color: "#6EE7B7" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for freelance projects
              </span>
              <span className="mono text-[10px] text-slate-500">PUNE_IN · v5.0</span>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-black tracking-[-0.04em] leading-[0.95] text-white" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}>
                Hi, I'm{" "}
                <span style={{
                  background: "linear-gradient(135deg, #818CF8 0%, #6366F1 50%, #38BDF8 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
                }}>
                  Rohit
                </span>
                <br />
                <span className="text-white">AI Engineer</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg leading-relaxed max-w-lg font-[450] text-slate-400"
            >
              Building scalable <span className="text-white font-semibold">full-stack AI systems</span>,{" "}
              <span className="text-white font-semibold">RAG pipelines</span>, and{" "}
              <span className="text-white font-semibold">automation-driven products</span> for real-world applications.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-3 items-center"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 rounded-full transition-all shadow-lg shadow-white/10"
              >
                Book a Call <ArrowRight size={15} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-full transition-all border border-white/15 bg-white/5 hover:bg-white/10 backdrop-blur-md"
              >
                View Projects <ArrowRight size={14} />
              </motion.button>
            </motion.div>

            {/* Tech stack pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/80"
            >
              {TECH_STACK.map((tech, i) => (
                <motion.span
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.48 + i * 0.05 }}
                  className="tech-stack-pill"
                >
                  <span className="text-sm">{tech.icon}</span>
                  {tech.name}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Dark Floating Code Editor Card (Matches Reference Image) ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            {/* Code Card Window */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-xl"
              style={{
                background: "rgba(11, 15, 25, 0.85)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.7), 0 0 40px rgba(99, 102, 241, 0.15)",
              }}>

              {/* Editor Window Header */}
              <div className="flex items-center gap-2 px-4 py-3.5 border-b border-white/10 bg-black/40">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBC2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
                </div>
                <div className="flex-1 text-center">
                  <span className="mono text-[10px] text-slate-400">developer.ts</span>
                </div>
                <span className="mono text-[9px] text-emerald-400">● active</span>
              </div>

              {/* Code text content */}
              <div className="p-6 font-mono text-[12.5px] leading-6 space-y-0.5 text-slate-200">
                {CODE_LINES.map((line, lineIdx) => (
                  <motion.div
                    key={lineIdx}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + lineIdx * 0.07, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-4 text-[10px] text-right shrink-0 text-slate-600">{lineIdx + 1}</span>
                    <span>
                      {line.tokens.map((token, ti) => (
                        <span key={ti} style={{ color: token.c }}>{token.t}</span>
                      ))}
                    </span>
                  </motion.div>
                ))}
                <div className="flex items-center gap-3">
                  <span className="w-4 text-[10px] text-right shrink-0 text-slate-600">{CODE_LINES.length + 1}</span>
                  <span className="typed-cursor">&nbsp;</span>
                </div>
              </div>
            </div>

            {/* Precision Chip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
              className="absolute -left-6 top-10 rounded-2xl px-4 py-3 shadow-2xl animate-float backdrop-blur-md"
              style={{
                background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                boxShadow: "0 8px 32px rgba(99,102,241,0.4)",
              }}
            >
              <p className="mono text-[8px] text-purple-200 uppercase tracking-wider mb-0.5">Model Accuracy</p>
              <p className="text-xl font-black leading-none text-white tracking-tight">96.4%</p>
            </motion.div>

            {/* Award Chip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -right-4 bottom-12 flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-amber-500/30 bg-amber-500/10 backdrop-blur-md shadow-lg animate-float"
              style={{ animationDelay: "-1.5s" }}
            >
              <Sparkles size={11} className="text-amber-400" />
              <span className="text-amber-300 text-[10px] font-bold">🥇 NLPC 2025 Winner</span>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {stats.map((s, i) => (
            <div key={i} className="rounded-2xl p-4 flex items-center gap-3 border border-white/10 bg-slate-900/60 backdrop-blur-md shadow-lg transition-all hover:-translate-y-1 duration-300">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
                {s.icon}
              </div>
              <div>
                <p className="text-[14px] font-black text-white"><AnimatedNumber to={s.value} suffix={s.suffix} /></p>
                <p className="mono text-[9px] uppercase tracking-wider text-slate-400">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Tech Marquee */}
      <div className="relative z-10">
        <TechMarquee />
      </div>
    </section>
  );
};

export default HeroSection;
