import { ArrowRight, Download, Sparkles, Layers, Star, Code2, Activity, Github, Linkedin } from "lucide-react";
import { motion, animate } from "framer-motion";
import TechMarquee from "./TechMarquee";
import { useEffect, useRef, useState } from "react";
import { useProfile } from "@/context/ProfileContext";

/* ── Animated Number ── */
function AnimatedNumber({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    const c = animate(0, to, {
      duration: 1.8, ease: "easeOut",
      onUpdate(v) { node.textContent = Math.round(v) + suffix; },
    });
    return () => c.stop();
  }, [to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ── Typing Text ── */
function TypingText({ phrases }: { phrases: string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && text === phrase) {
      t = setTimeout(() => setDeleting(true), 2400);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIdx(i => (i + 1) % phrases.length);
    } else {
      t = setTimeout(() => {
        setText(deleting
          ? phrase.slice(0, text.length - 1)
          : phrase.slice(0, text.length + 1)
        );
      }, deleting ? 35 : 75);
    }
    return () => clearTimeout(t);
  }, [text, deleting, idx, phrases]);

  return <span>{text}<span className="typed-cursor">&nbsp;</span></span>;
}

/* ── Code Snippet ── */
const CODE = [
  [{ t: "const ", c: "#7C3AED" }, { t: "engineer", c: "#1D4ED8" }, { t: " = {", c: "#475569" }],
  [{ t: "  name:", c: "#475569" }, { t: ' "Rohit Birdawade"', c: "#059669" }, { t: ",", c: "#475569" }],
  [{ t: "  role:", c: "#475569" }, { t: ' "AI & ML Engineer"', c: "#059669" }, { t: ",", c: "#475569" }],
  [{ t: "  focus:", c: "#475569" }, { t: " [", c: "#475569" }],
  [{ t: '    "RAG Systems"', c: "#059669" }, { t: ",", c: "#475569" }],
  [{ t: '    "Computer Vision"', c: "#059669" }, { t: ",", c: "#475569" }],
  [{ t: '    "Edge AI"', c: "#059669" }],
  [{ t: "  ]", c: "#475569" }, { t: ",", c: "#475569" }],
  [{ t: "  stack:", c: "#475569" }, { t: " [", c: "#475569" }],
  [{ t: '    "Python / PyTorch"', c: "#059669" }, { t: ",", c: "#475569" }],
  [{ t: '    "FastAPI / LangChain"', c: "#059669" }],
  [{ t: "  ]", c: "#475569" }, { t: ",", c: "#475569" }],
  [{ t: "  award:", c: "#475569" }, { t: ' "🥇 NLPC-2025"', c: "#D97706" }],
  [{ t: "}", c: "#475569" }],
];

const STACK = [
  { name: "Python", icon: "🐍" },
  { name: "PyTorch", icon: "🔥" },
  { name: "TensorFlow", icon: "🧠" },
  { name: "FastAPI", icon: "⚡" },
  { name: "LangChain", icon: "🔗" },
  { name: "React", icon: "⚛️" },
  { name: "Docker", icon: "🐳" },
];

const STATS = [
  { label: "Avg Precision",    value: 96.4, suffix: "%",  icon: <Activity size={14} /> },
  { label: "Production Repos", value: 6,    suffix: "",   icon: <Layers size={14} /> },
  { label: "GitHub Stars",     value: 48,   suffix: "",   icon: <Star size={14} /> },
  { label: "Lines of Code",    value: 120,  suffix: "K+", icon: <Code2 size={14} /> },
];

const HeroSection = () => {
  const { profile } = useProfile();

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden bg-white">

      {/* Ambient gradient blobs */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #4F46E5, transparent 65%)" }} />
        <div className="absolute top-1/2 -left-48 w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #7C3AED, transparent 65%)" }} />
        <div className="absolute inset-0 bg-dot-grid opacity-[0.35]" />
      </div>

      <div className="container flex-1 flex flex-col justify-center pt-32 pb-10 lg:pt-36 lg:pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* ── LEFT ── */}
          <div className="lg:col-span-7 flex flex-col gap-7">

            {/* Status + Location */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 flex-wrap"
            >
              <span className="status-online">Available for Opportunities</span>
              <span className="mono text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Pune, India</span>
            </motion.div>

            {/* Name & Title */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              <p className="mono text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-3">
                👋 Hi, I'm
              </p>
              <h1 className="display-xl text-slate-900 leading-[1.01]">
                Rohit{" "}
                <span className="gradient-text">Birdawade</span>
              </h1>
              <p className="mt-4 text-lg sm:text-xl font-semibold text-slate-700">
                <TypingText phrases={["AI & ML Engineer", "Generative AI Architect", "Computer Vision Builder", "Edge AI Specialist"]} />
              </p>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-[15px] sm:text-base leading-[1.75] text-slate-500 max-w-lg"
            >
              Building production-grade{" "}
              <span className="text-slate-800 font-semibold">RAG systems</span>,{" "}
              <span className="text-slate-800 font-semibold">computer vision pipelines</span>, and{" "}
              <span className="text-slate-800 font-semibold">edge AI models</span>{" "}
              for healthcare, security, and precision agriculture.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="flex flex-wrap gap-3 items-center"
            >
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary text-sm"
              >
                View Projects <ArrowRight size={15} />
              </button>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-secondary text-sm">
                <Download size={15} /> Download Resume
              </a>
              <div className="flex items-center gap-2 ml-1">
                <a
                  href={profile?.socialLinks?.github || "https://github.com/rohitbirdawade007"}
                  target="_blank" rel="noreferrer"
                  className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:border-indigo-300 hover:text-indigo-700 transition-all shadow-xs"
                >
                  <Github size={15} />
                </a>
                <a
                  href={profile?.socialLinks?.linkedin || "https://linkedin.com/in/rohitbirdawade007"}
                  target="_blank" rel="noreferrer"
                  className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:border-indigo-300 hover:text-indigo-700 transition-all shadow-xs"
                >
                  <Linkedin size={15} />
                </a>
              </div>
            </motion.div>

            {/* Tech Stack Pills */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-2 pt-2 border-t border-slate-100"
            >
              <span className="mono text-[10px] font-semibold text-slate-400 uppercase tracking-widest self-center mr-1">Stack:</span>
              {STACK.map(t => (
                <span key={t.name} className="tech-stack-pill">
                  <span>{t.icon}</span>{t.name}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT — Code window ── */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.97 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-2xl opacity-30"
              style={{ background: "radial-gradient(circle at center, rgba(79,70,229,0.15), transparent 70%)", filter: "blur(20px)", transform: "scale(1.05)" }} />

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-2xl relative">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-b border-slate-800">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <div className="flex-1 text-center">
                  <span className="mono text-[11px] text-slate-400">profile_overview.ts</span>
                </div>
                <span className="mono text-[9px] text-emerald-400 font-semibold tracking-wider">● LIVE</span>
              </div>

              {/* Code body */}
              <div className="bg-slate-950 p-5 font-mono text-[11.5px] leading-[1.7]">
                {CODE.map((line, li) => (
                  <div key={li} className="flex gap-3">
                    <span className="w-4 text-[9px] text-slate-700 text-right shrink-0 select-none pt-0.5">{li + 1}</span>
                    <span>
                      {line.map((tk, ti) => (
                        <span key={ti} style={{ color: tk.c }}>{tk.t}</span>
                      ))}
                    </span>
                  </div>
                ))}
                <div className="flex gap-3 mt-0.5">
                  <span className="w-4 text-[9px] text-slate-700 text-right shrink-0 select-none">{CODE.length + 1}</span>
                  <span className="typed-cursor" style={{ borderColor: "#6366F1" }}>&nbsp;</span>
                </div>
              </div>
            </div>

            {/* Award Chip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.55, type: "spring", stiffness: 200 }}
              className="absolute -bottom-4 -left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 shadow-md"
            >
              <Sparkles size={13} className="text-amber-600" />
              <span className="text-[11.5px] font-bold text-amber-800">🥇 1st Prize · NLPC-2025</span>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Stats Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {STATS.map((s, i) => (
            <div key={i} className="card p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                {s.icon}
              </div>
              <div>
                <p className="text-lg font-black text-slate-900 leading-none">
                  <AnimatedNumber to={s.value} suffix={s.suffix} />
                </p>
                <p className="mono text-[9px] font-semibold uppercase tracking-widest text-slate-400 mt-1">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative z-10 mt-6">
        <TechMarquee />
      </div>
    </section>
  );
};

export default HeroSection;
