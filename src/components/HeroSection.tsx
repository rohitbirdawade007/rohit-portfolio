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

const CODE_LINES = [
  { tokens: [{ t: "const ", c: "#C792EA" }, { t: "developer", c: "#82AAFF" }, { t: " = {", c: "#89DDFF" }] },
  { tokens: [{ t: "  name: ", c: "#89DDFF" }, { t: '"Rohit Birdawade"', c: "#C3E88D" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "  role: ", c: "#89DDFF" }, { t: '"AI & ML Engineer"', c: "#C3E88D" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "  focus: ", c: "#89DDFF" }, { t: "[", c: "#89DDFF" }] },
  { tokens: [{ t: "    ", c: "#fff" }, { t: '"RAG & Hybrid Search"', c: "#C3E88D" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "    ", c: "#fff" }, { t: '"Computer Vision & Edge AI"', c: "#C3E88D" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "    ", c: "#fff" }, { t: '"Generative AI Systems"', c: "#C3E88D" }] },
  { tokens: [{ t: "  ]", c: "#89DDFF" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "  stack: ", c: "#89DDFF" }, { t: "[", c: "#89DDFF" }] },
  { tokens: [{ t: "    ", c: "#fff" }, { t: '"Python / PyTorch / TensorFlow"', c: "#C3E88D" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "    ", c: "#fff" }, { t: '"FastAPI / LangChain / ChromaDB"', c: "#C3E88D" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "    ", c: "#fff" }, { t: '"React / TypeScript / Docker"', c: "#C3E88D" }] },
  { tokens: [{ t: "  ]", c: "#89DDFF" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "  award: ", c: "#89DDFF" }, { t: '"🥇 1st Prize — NLPC-2025"', c: "#C3E88D" }] },
  { tokens: [{ t: "}", c: "#89DDFF" }] },
];

const TECH_STACK = [
  { name: "Python", icon: "🐍" }, { name: "PyTorch", icon: "🔥" }, { name: "TensorFlow", icon: "🧠" },
  { name: "FastAPI", icon: "⚡" }, { name: "LangChain", icon: "🔗" }, { name: "React", icon: "⚛️" },
  { name: "Docker", icon: "🐳" }, { name: "ESP32", icon: "📡" },
];

const HeroSection = () => {
  const stats = [
    { label: "Avg Precision", value: 96.4, suffix: "%", icon: <Activity size={13} /> },
    { label: "Production Repos", value: 6, suffix: "", icon: <Layers size={13} /> },
    { label: "GitHub Stars", value: 48, suffix: "", icon: <Star size={13} /> },
    { label: "Lines of Code", value: 120, suffix: "K+", icon: <Code2 size={13} /> },
  ];

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-0 overflow-hidden flex flex-col bg-[#090A0F]">

      {/* Subtle Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute inset-0 bg-dot-grid opacity-[0.25]" />
      </div>

      <div className="container flex-1 flex flex-col justify-center py-8 lg:py-16 relative z-10">

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* LEFT: Text & Intro */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="status-online">
                Open to Opportunities
              </span>
              <span className="mono text-[10px] text-slate-500">PUNE, IN · AI ENGINEER</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="font-black tracking-[-0.04em] leading-[1.02] text-white text-4xl sm:text-6xl lg:text-7xl">
                Hi, I'm{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300">
                  Rohit Birdawade
                </span>
              </h1>
              <p className="mt-4 text-xl font-semibold text-indigo-300 flex items-center gap-2">
                <Zap size={18} className="text-indigo-400" />
                <TypingText phrases={["AI Engineer", "ML Researcher", "Generative AI Architect", "Edge AI Builder"]} />
              </p>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg leading-relaxed text-slate-400 max-w-2xl font-[450]"
            >
              Architecting production-grade <span className="text-white font-medium">RAG systems</span>,{" "}
              <span className="text-white font-medium">computer vision pipelines</span>, and{" "}
              <span className="text-white font-medium">edge AI models</span> for healthcare, security, and smart agriculture.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3.5 items-center pt-2"
            >
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary"
              >
                View Projects <ArrowRight size={15} />
              </button>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                <Download size={15} /> Resume
              </a>

              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-5 py-3 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 font-semibold text-sm hover:bg-indigo-500/20 transition-colors"
              >
                Get in Touch
              </button>
            </motion.div>

            {/* Tech Stack Pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-2 pt-4 border-t border-white/08"
            >
              {TECH_STACK.map((tech) => (
                <span key={tech.name} className="tech-stack-pill">
                  <span>{tech.icon}</span>
                  {tech.name}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Code / Architecture Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Card Window */}
            <div className="card bg-[#11121A] border-white/10 shadow-2xl overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/08 bg-slate-950/50">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex-1 text-center">
                  <span className="mono text-[11px] text-slate-400">profile_overview.ts</span>
                </div>
                <span className="mono text-[9.5px] text-emerald-400">● live</span>
              </div>

              {/* Code text content */}
              <div className="p-5 font-mono text-[12px] leading-6 text-slate-300">
                {CODE_LINES.map((line, lineIdx) => (
                  <div key={lineIdx} className="flex items-center gap-3">
                    <span className="w-4 text-[10px] text-right shrink-0 text-slate-600">{lineIdx + 1}</span>
                    <span>
                      {line.tokens.map((token, ti) => (
                        <span key={ti} style={{ color: token.c }}>{token.t}</span>
                      ))}
                    </span>
                  </div>
                ))}
                <div className="flex items-center gap-3">
                  <span className="w-4 text-[10px] text-right shrink-0 text-slate-600">{CODE_LINES.length + 1}</span>
                  <span className="typed-cursor">&nbsp;</span>
                </div>
              </div>
            </div>

            {/* Floating Award Chip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-5 -left-4 flex items-center gap-2 px-3.5 py-2 rounded-xl border border-amber-500/30 bg-amber-500/10 backdrop-blur-md shadow-lg"
            >
              <Sparkles size={14} className="text-amber-400" />
              <span className="text-amber-300 text-xs font-bold">🥇 1st Prize — NLPC-2025</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {stats.map((s, i) => (
            <div key={i} className="card p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
                {s.icon}
              </div>
              <div>
                <p className="text-base font-black text-white"><AnimatedNumber to={s.value} suffix={s.suffix} /></p>
                <p className="mono text-[9.5px] uppercase tracking-wider text-slate-400">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Tech Marquee */}
      <div className="relative z-10 mt-10">
        <TechMarquee />
      </div>
    </section>
  );
};

export default HeroSection;
