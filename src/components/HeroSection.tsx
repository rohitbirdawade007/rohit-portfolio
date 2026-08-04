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

/* ── Floating particles background (Light Mode) ── */
function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
    opacity: Math.random() * 0.35 + 0.15,
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
  const stats = [
    { label: "Avg Accuracy", value: 96.4, suffix: "%", icon: <Activity size={13} /> },
    { label: "Projects", value: 15, suffix: "+", icon: <Layers size={13} /> },
    { label: "GitHub Stars", value: 48, suffix: "", icon: <Star size={13} /> },
    { label: "Lines of Code", value: 120, suffix: "K+", icon: <Code2 size={13} /> },
  ];

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-0 overflow-hidden flex flex-col" style={{ background: "#FAFAFC" }}>

      {/* ── Ambient background elements ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" }} />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }} />
        {/* Soft Dot Grid */}
        <div className="absolute inset-0 bg-dot-grid opacity-[0.4]" />
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
              <span className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold border shadow-sm"
                style={{ background: "#ECFDF5", borderColor: "#A7F3D0", color: "#047857" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available for opportunities
              </span>
              <span className="mono text-[10px] text-slate-400">PUNE_IN · v5.0</span>
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
              <h1 className="font-black tracking-[-0.04em] leading-[0.95] text-slate-900" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}>
                Hi, I'm{" "}
                <span style={{
                  background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #2563EB 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
                }}>
                  Rohit
                </span>
                <br />
                <span className="text-slate-900">Birdawade</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg leading-relaxed max-w-lg font-[450] text-slate-600"
            >
              Architecting high-performance{" "}
              <span className="text-slate-900 font-semibold">ML pipelines</span>,{" "}
              <span className="text-slate-900 font-semibold">RAG systems</span>, and{" "}
              <span className="text-slate-900 font-semibold">edge AI deployments</span>{" "}
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
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl transition-all shadow-md"
                style={{
                  background: "linear-gradient(135deg, #4F46E5, #6366F1)",
                  boxShadow: "0 4px 14px rgba(79,70,229,0.35)",
                }}
              >
                View Projects <ArrowRight size={15} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                onClick={() => window.open("/resume.pdf", "_blank")}
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-all border bg-white border-slate-200 text-slate-700 shadow-sm hover:bg-slate-50"
              >
                <Download size={15} /> Resume
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl transition-all border bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100"
              >
                Hire Me <Zap size={14} />
              </motion.button>
            </motion.div>

            {/* Tech stack pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-2 pt-4 border-t border-slate-200"
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

            {/* Quick stats */}
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
                  <p className="text-xl font-black text-slate-900">{s.value}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Dark Code editor card for contrast ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            {/* Main code card */}
            <div className="relative rounded-2xl overflow-hidden border shadow-2xl"
              style={{
                background: "#0F172A",
                borderColor: "#1E293B",
              }}>

              {/* Editor header */}
              <div className="flex items-center gap-2 px-4 py-3.5 border-b border-slate-800 bg-slate-950/60">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBC2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
                </div>
                <div className="flex-1 text-center">
                  <span className="mono text-[10px] text-slate-400">rohit_birdawade.js</span>
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
                    <span className="w-4 text-[10px] text-right shrink-0 text-slate-600">{lineIdx + 1}</span>
                    <span>
                      {line.tokens.map((token, ti) => (
                        <span key={ti} style={{ color: token.c }}>{token.t}</span>
                      ))}
                    </span>
                  </motion.div>
                ))}
                {/* Cursor line */}
                <div className="flex items-center gap-3">
                  <span className="w-4 text-[10px] text-right shrink-0 text-slate-600">{CODE_LINES.length + 1}</span>
                  <span className="typed-cursor">&nbsp;</span>
                </div>
              </div>
            </div>

            {/* Floating model precision chip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
              className="absolute -left-8 top-12 rounded-2xl px-4 py-3 shadow-xl animate-float"
              style={{
                background: "linear-gradient(135deg, #4F46E5, #6366F1)",
              }}
            >
              <p className="mono text-[8px] text-indigo-200 uppercase tracking-wider mb-0.5">Model Precision</p>
              <p className="text-xl font-black leading-none text-white tracking-tight">96.4%</p>
            </motion.div>

            {/* Floating active badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -right-4 top-8 flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-white border-slate-200 shadow-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-800 text-[10px] font-bold tracking-wider uppercase">Active</span>
            </motion.div>

            {/* Floating award chip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -right-4 bottom-16 flex items-center gap-1.5 px-3 py-2 rounded-xl border bg-amber-50 border-amber-200 shadow-md animate-float"
              style={{ animationDelay: "-1.5s" }}
            >
              <Sparkles size={11} className="text-amber-600" />
              <span className="text-amber-800 text-[10px] font-bold">🥇 NLPC 2025</span>
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
            <div key={i} className="rounded-2xl p-4 flex items-center gap-3 border bg-white border-slate-200 shadow-sm transition-all hover:-translate-y-1 duration-300">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-indigo-600 bg-indigo-50 border border-indigo-100">
                {s.icon}
              </div>
              <div>
                <p className="text-[14px] font-black text-slate-900"><AnimatedNumber to={s.value} suffix={s.suffix} /></p>
                <p className="mono text-[9px] uppercase tracking-wider text-slate-500">{s.label}</p>
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
