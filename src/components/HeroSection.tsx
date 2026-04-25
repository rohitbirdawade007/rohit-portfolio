import { ArrowRight, Download, Sparkles, Zap, Globe, Layers, Star, Code2, Activity } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import TechMarquee from "./TechMarquee";
import { useEffect, useRef, useState } from "react";

const resolveImage = (path?: string | null): string => {
  if (!path) return "/profile.png";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/")) return path;
  return "/profile.png";
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
});

/* ── Animated number counter ── */
function AnimatedNumber({ to, suffix = "" }: { to: number; suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: "easeOut",
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
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % phrases.length);
    } else {
      timeout = setTimeout(() => {
        setText(deleting ? phrase.slice(0, text.length - 1) : phrase.slice(0, text.length + 1));
      }, deleting ? 45 : 85);
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

const HeroSection = () => {
  const { profile } = useProfile();
  const imgSrc = resolveImage(profile?.profileImage);

  const stats = [
    { label: "Avg Accuracy", value: 96.4, suffix: "%", icon: <Activity size={13} /> },
    { label: "Projects", value: 15, suffix: "+", icon: <Layers size={13} /> },
    { label: "GitHub Stars", value: 48, suffix: "", icon: <Star size={13} /> },
    { label: "Lines of Code", value: 120, suffix: "K+", icon: <Code2 size={13} /> },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen pt-20 pb-0 overflow-hidden flex flex-col bg-gradient-mesh"
    >
      {/* ── Canvas background elements ── */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.28] pointer-events-none" />
      <div className="absolute -top-[30%] -right-[10%] w-[700px] h-[700px] rounded-full bg-blue-100/60 blur-[140px] pointer-events-none animate-float-slow" />
      <div className="absolute -bottom-[10%] -left-[10%] w-[500px] h-[500px] rounded-full bg-violet-100/40 blur-[140px] pointer-events-none animate-float-slow" style={{ animationDelay: "-3s" }} />

      {/* ── Floating decorative orbs ── */}
      <div className="absolute top-1/3 left-[8%] w-3 h-3 rounded-full bg-blue-400/60 blur-[2px] animate-float" style={{ animationDelay: "0s" }} />
      <div className="absolute top-1/2 right-[12%] w-2 h-2 rounded-full bg-violet-400/60 blur-[2px] animate-float" style={{ animationDelay: "-1.5s" }} />
      <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 rounded-full bg-emerald-400/50 blur-[2px] animate-float" style={{ animationDelay: "-2.8s" }} />

      <div className="container flex-1 flex flex-col justify-center py-12 lg:py-20 relative z-10">

        {/* ── Bento Grid Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 grid-rows-auto gap-4">

          {/* ──  CELL 1: Main Identity (7 cols, tall) ── */}
          <motion.div
            {...fadeUp(0)}
            className="lg:col-span-7 card shimmer-card p-8 lg:p-12 flex flex-col justify-between min-h-[500px] group hover-glow transition-all duration-300"
            style={{ background: "var(--surface)" }}
          >
            {/* Status + System ID */}
            <div className="flex items-center justify-between">
              <div className="status-online">
                SYSTEM_ONLINE · PUNE_IN
              </div>
              <span className="mono text-[10px] text-[#A3A3A3] hidden sm:block">v5.0 · 2026</span>
            </div>

            {/* Main headline */}
            <div className="my-auto py-8">
              <p className="eyebrow mb-5">
                <span className="eyebrow-dot" />
                <TypingText phrases={["Data Scientist", "AI Engineer", "ML Researcher", "Edge AI Builder"]} />
              </p>

              <h1 className="font-black tracking-[-0.04em] leading-[0.95] text-[#0A0A0A] mb-6 display-xl">
                Rohit<br />
                <span style={{
                  background: "linear-gradient(135deg, #1A56DB 0%, #7C3AED 60%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Birdawade
                </span>
              </h1>

              <p className="text-[#525252] text-lg leading-relaxed max-w-lg font-[450]">
                Architecting high-performance ML pipelines, edge AI
                deployments, and data-driven systems — from prototype to
                production scale.
              </p>
            </div>

            {/* CTA row */}
            <div className="flex flex-wrap gap-3 items-center">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary flex items-center gap-2 text-sm shadow-lg"
              >
                View Projects <ArrowRight size={15} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.open("/resume.pdf", "_blank")}
                className="btn-secondary flex items-center gap-2 text-sm"
              >
                <Download size={15} /> Resume
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-blue flex items-center gap-2 text-sm"
              >
                Hire Me <Zap size={14} />
              </motion.button>
            </div>
          </motion.div>

          {/* ── CELL 2: Profile Photo (5 cols, tall) ── */}
          <motion.div
            {...fadeUp(0.1)}
            className="lg:col-span-5 relative overflow-hidden rounded-[1.125rem] min-h-[500px] group"
            style={{ background: "#0A0A0A" }}
          >
            {/* Photo */}
            <img
              src={imgSrc}
              alt="Rohit Birdawade"
              className="w-full h-full object-cover object-top absolute inset-0 group-hover:scale-[1.03] transition-transform duration-700"
              style={{ objectFit: "cover", objectPosition: "center top" }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/profile.png"; }}
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/20 to-transparent" />

            {/* Bottom name plate */}
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <p className="mono text-[10px] text-blue-400 uppercase tracking-widest mb-1.5 font-semibold">
                ML Researcher · B.E. Computer Science
              </p>
              <h3 className="text-white text-xl font-bold tracking-tight">Rohit Sandip Birdawade</h3>
            </div>

            {/* Floating accuracy chip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              className="absolute top-5 left-5 bg-[#1A56DB] text-white rounded-xl px-4 py-3 shadow-xl animate-float"
            >
              <p className="mono text-[9px] text-blue-200 uppercase tracking-wider mb-0.5">Model Precision</p>
              <p className="text-2xl font-black leading-none tracking-tight">96.4%</p>
            </motion.div>

            {/* Floating active badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-5 right-5 flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white text-[10px] font-semibold tracking-wider uppercase">Active</span>
            </motion.div>

            {/* Floating sparkles chip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-24 right-5 flex items-center gap-1.5 bg-violet-500/90 backdrop-blur-md rounded-full px-3 py-1.5 animate-float"
              style={{ animationDelay: "-1s" }}
            >
              <Sparkles size={11} className="text-white" />
              <span className="text-white text-[10px] font-semibold">AI Powered</span>
            </motion.div>
          </motion.div>

          {/* ── CELL 3: Dark stats panel (4 cols) ── */}
          <motion.div
            {...fadeUp(0.15)}
            className="lg:col-span-4 card-dark p-8 flex flex-col justify-between min-h-[180px] hover-glow transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <Sparkles size={18} className="text-blue-400" />
              <span className="mono text-[9px] text-white/30 uppercase tracking-widest">Performance</span>
            </div>
            <div>
              <p className="text-[4rem] font-black text-white leading-none tracking-[-0.05em]">
                <AnimatedNumber to={96.4} suffix="%" /><span className="text-2xl text-blue-400 font-bold"></span>
              </p>
              <div className="mt-3 w-full bg-white/10 rounded-full h-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "96.4%" }}
                  transition={{ duration: 1.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="h-1 rounded-full bg-gradient-to-r from-blue-400 to-violet-400"
                />
              </div>
              <p className="text-white/40 text-[10px] mono uppercase tracking-widest mt-2 font-semibold">Avg. Predictive Accuracy</p>
            </div>
          </motion.div>

          {/* ── CELL 4: Stats row (4 cols) ── */}
          <motion.div
            {...fadeUp(0.2)}
            className="lg:col-span-4 card shimmer-card p-8 flex flex-col justify-between min-h-[180px] hover-glow transition-all duration-300"
          >
            <Layers size={18} className="text-[#A3A3A3]" />
            <div>
              <p className="text-[4rem] font-black text-[#0A0A0A] leading-none tracking-[-0.05em]">
                <AnimatedNumber to={15} /><span className="text-2xl text-[#1A56DB] font-bold">+</span>
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {["ML", "IoT", "Web", "Edge AI"].map(t => (
                  <span key={t} className="tag-blue text-[9px]">{t}</span>
                ))}
              </div>
              <p className="text-[#A3A3A3] text-[10px] mono uppercase tracking-widest mt-2 font-semibold">Projects Shipped</p>
            </div>
          </motion.div>

          {/* ── CELL 5: Location tile (4 cols) ── */}
          <motion.div
            {...fadeUp(0.25)}
            className="lg:col-span-4 card shimmer-card p-8 flex flex-col justify-between min-h-[180px] overflow-hidden hover-glow transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-[#A3A3A3]" />
              <span className="mono text-[9px] text-[#A3A3A3] uppercase tracking-widest">Location</span>
            </div>
            <div>
              <p className="text-2xl font-black text-[#0A0A0A] leading-tight tracking-tight mb-1">Pune, IN</p>
              <p className="mono text-[9px] text-[#A3A3A3] uppercase tracking-widest">18.5204°N · 73.8567°E</p>
              <div className="mt-3">
                <span className="status-online text-[9px]">Open to Work</span>
              </div>
            </div>
            {/* Abstract map decoration */}
            <div className="absolute right-3 bottom-3 w-24 h-24 opacity-5">
              <div className="w-full h-full border-2 border-current rounded-full" />
              <div className="absolute inset-3 border border-current rounded-full" />
              <div className="absolute inset-6 border border-current rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* ── Live Stats Mini-Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {stats.map((s, i) => (
            <div key={i} className="card p-4 flex items-center gap-3 hover-glow transition-all duration-200">
              <div className="icon-sm bg-[#F5F5F5] border border-[#EBEBEB] text-[#737373]">{s.icon}</div>
              <div>
                <p className="text-[13px] font-black text-[#0A0A0A]">
                  <AnimatedNumber to={s.value} suffix={s.suffix} />
                </p>
                <p className="mono text-[9px] text-[#A3A3A3] uppercase tracking-wider">{s.label}</p>
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
