import { ArrowRight, Download, Sparkles, Layers, Star, Code2, Activity } from "lucide-react";
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
  { tokens: [{ t: "    ", c: "#fff" }, { t: '"RAG Systems & Generative AI"', c: "#C3E88D" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "    ", c: "#fff" }, { t: '"Computer Vision & Edge AI"', c: "#C3E88D" }] },
  { tokens: [{ t: "  ]", c: "#89DDFF" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "  stack: ", c: "#89DDFF" }, { t: "[", c: "#89DDFF" }] },
  { tokens: [{ t: "    ", c: "#fff" }, { t: '"Python / PyTorch / TensorFlow"', c: "#C3E88D" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "    ", c: "#fff" }, { t: '"FastAPI / LangChain / React"', c: "#C3E88D" }] },
  { tokens: [{ t: "  ]", c: "#89DDFF" }, { t: ",", c: "#89DDFF" }] },
  { tokens: [{ t: "  award: ", c: "#89DDFF" }, { t: '"🥇 1st Prize — NLPC-2025"', c: "#C3E88D" }] },
  { tokens: [{ t: "}", c: "#89DDFF" }] },
];

const TECH_STACK = [
  { name: "Python", icon: "🐍" }, { name: "PyTorch", icon: "🔥" }, { name: "TensorFlow", icon: "🧠" },
  { name: "FastAPI", icon: "⚡" }, { name: "LangChain", icon: "🔗" }, { name: "React", icon: "⚛️" },
  { name: "Docker", icon: "🐳" },
];

const HeroSection = () => {
  const stats = [
    { label: "Avg Precision", value: 96.4, suffix: "%", icon: <Activity size={13} /> },
    { label: "Production Repos", value: 6, suffix: "", icon: <Layers size={13} /> },
    { label: "GitHub Stars", value: 48, suffix: "", icon: <Star size={13} /> },
    { label: "Lines of Code", value: 120, suffix: "K+", icon: <Code2 size={13} /> },
  ];

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-0 overflow-hidden flex flex-col bg-[var(--canvas)] transition-colors duration-300">

      {/* Background Subtle Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-15 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)", filter: "blur(50px)" }} />
        <div className="absolute inset-0 bg-dot-grid opacity-[0.2]" />
      </div>

      <div className="container flex-1 flex flex-col justify-center py-8 lg:py-16 relative z-10">

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* LEFT: Text & Intro */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="status-online">
                Available for Roles & Projects
              </span>
              <span className="mono text-[10px] text-slate-500 dark:text-slate-400">PUNE, IN</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="font-black tracking-[-0.04em] leading-[1.02] text-slate-900 dark:text-white text-4xl sm:text-6xl lg:text-7xl">
                Hi, I'm{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                  Rohit Birdawade
                </span>
              </h1>
              <p className="mt-4 text-lg sm:text-xl font-semibold text-indigo-600 dark:text-indigo-300">
                <TypingText phrases={["AI & ML Engineer", "Generative AI Architect", "Edge AI Builder"]} />
              </p>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl font-[450]"
            >
              Building production-grade <span className="text-slate-900 dark:text-white font-semibold">RAG systems</span>,{" "}
              <span className="text-slate-900 dark:text-white font-semibold">computer vision models</span>, and{" "}
              <span className="text-slate-900 dark:text-white font-semibold">edge AI deployments</span> for healthcare, security, and precision agriculture.
            </motion.p>

            {/* Streamlined Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 items-center pt-1"
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
            </motion.div>

            {/* Tech Stack Pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-2 pt-4 border-t border-slate-200 dark:border-white/08"
            >
              {TECH_STACK.map((tech) => (
                <span key={tech.name} className="tech-stack-pill">
                  <span>{tech.icon}</span>
                  {tech.name}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: High-Signal Code Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="card bg-[#0F172A] border-slate-800 dark:border-white/10 shadow-xl overflow-hidden text-white">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-950/60">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex-1 text-center">
                  <span className="mono text-[11px] text-slate-400">profile.ts</span>
                </div>
                <span className="mono text-[9.5px] text-emerald-400">● live</span>
              </div>

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
              </div>
            </div>

            {/* Award Chip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-4 -left-3 flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 backdrop-blur-md shadow-lg"
            >
              <Sparkles size={13} className="text-amber-500 dark:text-amber-400" />
              <span className="text-amber-800 dark:text-amber-300 text-xs font-bold">🥇 1st Prize — NLPC-2025</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {stats.map((s, i) => (
            <div key={i} className="card p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20">
                {s.icon}
              </div>
              <div>
                <p className="text-base font-black text-slate-900 dark:text-white"><AnimatedNumber to={s.value} suffix={s.suffix} /></p>
                <p className="mono text-[9.5px] uppercase tracking-wider text-slate-500 dark:text-slate-400">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Tech Marquee */}
      <div className="relative z-10 mt-8">
        <TechMarquee />
      </div>
    </section>
  );
};

export default HeroSection;
