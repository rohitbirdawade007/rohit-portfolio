import { ArrowRight, Download, Sparkles, Zap, Globe, Layers, Star, Code2, Activity } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import { motion, animate } from "framer-motion";
import TechMarquee from "./TechMarquee";
import { useEffect, useRef, useState } from "react";

const resolveImage = (path?: string | null): string => {
  if (!path) return "/profile.png";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/")) return path;
  return "/profile.png";
};

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
    let timeout: ReturnType<typeof setTimeout>;
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

/* ── Floating particles background ── */
function Particles() {
  const particles = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            background: p.id % 3 === 0 ? "#6366F1" : p.id % 3 === 1 ? "#8B5CF6" : "#38BDF8",
            opacity: p.opacity,
          }}
          animate={{ y: [-20, 20, -20], opacity: [p.opacity, p.opacity * 0.3, p.opacity] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

const CODE_LINES = [
  { tokens: [{ t: "const ", c: "#C792EA" }, { t: "developer", c: "#82AAFF" }, { t: " = {", c: "#89DDFF" }] },
  { tokens: [{ t: "  name: ", c: "#89DDFF" }, { t: '"Rohit Birdawade"', c: "#C3E88D" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "  role: ", c: "#89DDFF" }, { t: '"AI Engineer"', c: "#C3E88D" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "  focus: ", c: "#89DDFF" }, { t: "[", c: "#89DDFF" }] },
  { tokens: [{ t: "    ", c: "#fff" }, { t: '"RAG Pipelines"', c: "#C3E88D" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "    ", c: "#fff" }, { t: '"Computer Vision"', c: "#C3E88D" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "    ", c: "#fff" }, { t: '"Edge AI & IoT"', c: "#C3E88D" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "    ", c: "#fff" }, { t: '"Gen AI Systems"', c: "#C3E88D" }] },
  { tokens: [{ t: "  ]", c: "#89DDFF" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "  stack: ", c: "#89DDFF" }, { t: "[", c: "#89DDFF" }] },
  { tokens: [{ t: "    ", c: "#fff" }, { t: '"Python / PyTorch"', c: "#C3E88D" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "    ", c: "#fff" }, { t: '"LangChain / RAG"', c: "#C3E88D" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "    ", c: "#fff" }, { t: '"FastAPI / React"', c: "#C3E88D" }] },
  { tokens: [{ t: "  ]", c: "#89DDFF" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "  award: ", c: "#89DDFF" }, { t: '"🥇 NLPC-2025"', c: "#C3E88D" }] },
  { tokens: [{ t: "}", c: "#89DDFF" }] },
];

const TECH_STACK = [
  { name: "Python", icon: "🐍" }, { name: "PyTorch", icon: "🔥" }, { name: "TensorFlow", icon: "🧠" },
  { name: "React", icon: "⚛️" }, { name: "FastAPI", icon: "⚡" }, { name: "Docker", icon: "🐳" },
  { name: "LangChain", icon: "🔗" }, { name: "ESP32", icon: "📡" },
];

const HeroSection = () => {
  const { profile } = useProfile();

  const stats = [
    { label: "Avg Accuracy", value: 96.4, suffix: "%", icon: <Activity size={13} /> },
    { label: "Projects", value: 15, suffix: "+", icon: <Layers size={13} /> },
    { label: "GitHub Stars", value: 48, suffix: "", icon: <Star size={13} /> },
    { label: "Lines of Code", value: 120, suffix: "K+", icon: <Code2 size={13} /> },
  ];

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-0 overflow-hidden flex flex-col" style={{ background: "#030712" }}>

      {/* ── Ambient glow background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)" }} />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)" }} />
        <div className="absolute bottom-20 left-1/3 w-[300px] h-[300px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)" }} />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      {/* ── Floating particles ── */}
      <Particles />

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
              <span className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold border"
                style={{ background: "rgba(16,185,129,0.08)", borderColor: "rgba(16,185,129,0.25)", color: "#6EE7B7" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for opportunities
              </span>
              <span className="mono text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>PUNE_IN · v5.0</span>
            </motion.div>

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="eyebrow"
            >
              <span className="eyebrow-dot" />
              <TypingText phrases={["AI Engineer", "ML Researcher", "Data Scientist", "Edge AI Builder"]} />
            </motion.p>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-black tracking-[-0.04em] leading-[0.95] text-white" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}>
                Hi, I'm{" "}
                <span style={{
                  background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #38BDF8 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
                }}>
                  Rohit
                </span>
                <br />
                <span className="text-white">Birdawade</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg leading-relaxed max-w-lg font-[450]"
              style={{ color: "#9CA3AF" }}
            >
              Architecting high-performance{" "}
              <span className="text-white font-semibold">ML pipelines</span>,{" "}
              <span className="text-white font-semibold">RAG systems</span>, and{" "}
              <span className="text-white font-semibold">edge AI deployments</span>{" "}
              — from prototype to production scale.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-3 items-center"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl transition-all"
                style={{
                  background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                  boxShadow: "0 0 24px rgba(99,102,241,0.35), 0 4px 16px rgba(0,0,0,0.3)",
                }}
              >
                View Projects <ArrowRight size={15} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                onClick={() => window.open("/resume.pdf", "_blank")}
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-all border"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.1)",
                  color: "#9CA3AF"
                }}
              >
                <Download size={15} /> Resume
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl transition-all border"
                style={{
                  background: "rgba(236,72,153,0.1)",
                  borderColor: "rgba(236,72,153,0.25)",
                  color: "#F9A8D4"
                }}
              >
                Hire Me <Zap size={14} />
              </motion.button>
            </motion.div>

            {/* Tech stack pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]"
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

            {/* Social quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-6"
            >
              {[
                { value: "6+", label: "Projects" },
                { value: "96%", label: "Accuracy" },
                { value: "🥇", label: "NLPC 2025" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-xl font-black text-white">{s.value}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#6B7280" }}>{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Code editor card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            {/* Main code card */}
            <div className="relative rounded-2xl overflow-hidden border"
              style={{
                background: "rgba(17,24,39,0.9)",
                borderColor: "rgba(255,255,255,0.08)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1), 0 0 80px rgba(99,102,241,0.06)",
                backdropFilter: "blur(20px)",
              }}>

              {/* Editor header */}
              <div className="flex items-center gap-2 px-4 py-3.5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.3)" }}>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBC2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
                </div>
                <div className="flex-1 text-center">
                  <span className="mono text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>rohit_birdawade.js</span>
                </div>
                <span className="mono text-[9px] text-emerald-400">● live</span>
              </div>

              {/* Code content */}
              <div className="p-5 font-mono text-[12.5px] leading-6 space-y-0.5">
                {CODE_LINES.map((line, lineIdx) => (
                  <motion.div
                    key={lineIdx}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + lineIdx * 0.07, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-4 text-[10px] text-right shrink-0" style={{ color: "rgba(255,255,255,0.15)" }}>{lineIdx + 1}</span>
                    <span>
                      {line.tokens.map((token, ti) => (
                        <span key={ti} style={{ color: token.c }}>{token.t}</span>
                      ))}
                    </span>
                  </motion.div>
                ))}
                {/* Cursor line */}
                <div className="flex items-center gap-3">
                  <span className="w-4 text-[10px] text-right shrink-0" style={{ color: "rgba(255,255,255,0.15)" }}>{CODE_LINES.length + 1}</span>
                  <span className="typed-cursor">&nbsp;</span>
                </div>
              </div>
            </div>

            {/* Floating model precision chip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
              className="absolute -left-8 top-12 rounded-2xl px-4 py-3 shadow-2xl animate-float"
              style={{
                background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                boxShadow: "0 8px 32px rgba(99,102,241,0.4)",
              }}
            >
              <p className="mono text-[8px] text-purple-200 uppercase tracking-wider mb-0.5">Model Precision</p>
              <p className="text-xl font-black leading-none text-white tracking-tight">96.4%</p>
            </motion.div>

            {/* Floating active badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -right-4 top-8 flex items-center gap-1.5 px-3 py-1.5 rounded-full border"
              style={{
                background: "rgba(17,24,39,0.9)",
                borderColor: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)"
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white text-[10px] font-semibold tracking-wider uppercase">Active</span>
            </motion.div>

            {/* Floating award chip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -right-4 bottom-16 flex items-center gap-1.5 px-3 py-2 rounded-xl border animate-float"
              style={{
                animationDelay: "-1.5s",
                background: "rgba(245,158,11,0.1)",
                borderColor: "rgba(245,158,11,0.3)",
              }}
            >
              <Sparkles size={11} className="text-amber-400" />
              <span className="text-amber-300 text-[10px] font-semibold">🥇 NLPC 2025</span>
            </motion.div>

            {/* Glow orb behind card */}
            <div className="absolute inset-0 -z-10 rounded-2xl opacity-30"
              style={{ background: "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.2) 0%, transparent 70%)", filter: "blur(30px)" }} />
          </motion.div>
        </div>

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {stats.map((s, i) => (
            <div key={i} className="rounded-2xl p-4 flex items-center gap-3 border transition-all hover:-translate-y-1 duration-300"
              style={{ background: "rgba(17,24,39,0.6)", borderColor: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-indigo-400"
                style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)" }}>
                {s.icon}
              </div>
              <div>
                <p className="text-[14px] font-black text-white"><AnimatedNumber to={s.value} suffix={s.suffix} /></p>
                <p className="mono text-[9px] uppercase tracking-wider" style={{ color: "#6B7280" }}>{s.label}</p>
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
