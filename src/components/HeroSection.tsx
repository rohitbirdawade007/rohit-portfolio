import { ArrowRight, Download, Sparkles, Zap, Globe, Layers } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import { motion } from "framer-motion";
import TechMarquee from "./TechMarquee";

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

const HeroSection = () => {
  const { profile } = useProfile();
  const imgSrc = resolveImage(profile?.profileImage);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-20 pb-0 overflow-hidden flex flex-col"
    >
      {/* ── Canvas background elements ── */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.35] pointer-events-none" />
      <div className="absolute -top-[30%] -right-[10%] w-[700px] h-[700px] rounded-full bg-blue-100/60 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-[10%] -left-[10%] w-[500px] h-[500px] rounded-full bg-violet-100/40 blur-[140px] pointer-events-none" />

      <div className="container flex-1 flex flex-col justify-center py-12 lg:py-20 relative z-10">

        {/* ── Bento Grid Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 grid-rows-auto gap-4">

          {/* ──  CELL 1: Main Identity (7 cols, tall) ── */}
          <motion.div
            {...fadeUp(0)}
            className="lg:col-span-7 card p-8 lg:p-12 flex flex-col justify-between min-h-[500px] group"
            style={{ background: "var(--surface)" }}
          >
            {/* Status + System ID */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(5,150,105,0.6)] animate-pulse" />
                <span className="mono text-[10px] font-600 text-[#737373] uppercase tracking-widest">
                  SYSTEM_ONLINE · PUNE_IN
                </span>
              </div>
              <span className="mono text-[10px] text-[#A3A3A3] hidden sm:block">v5.0 · 2026</span>
            </div>

            {/* Main headline */}
            <div className="my-auto py-8">
              <p className="eyebrow mb-5">
                <span className="eyebrow-dot" />
                Data Scientist · AI Engineer
              </p>

              <h1 className="font-black text-[clamp(3rem,7vw,5.5rem)] tracking-[-0.04em] leading-[0.95] text-[#0A0A0A] mb-6">
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary flex items-center gap-2 text-sm"
              >
                View Projects <ArrowRight size={15} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.open("/resume.pdf", "_blank")}
                className="btn-secondary flex items-center gap-2 text-sm"
              >
                <Download size={15} /> Resume
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
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
            className="lg:col-span-5 relative overflow-hidden rounded-[1.125rem] min-h-[500px]"
            style={{ background: "#0A0A0A" }}
          >
            {/* Photo */}
            <img
              src={imgSrc}
              alt="Rohit Birdawade"
              className="w-full h-full object-cover object-top absolute inset-0"
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
            <div className="absolute top-5 left-5 bg-[#1A56DB] text-white rounded-xl px-4 py-3 shadow-xl">
              <p className="mono text-[9px] text-blue-200 uppercase tracking-wider mb-0.5">Model Precision</p>
              <p className="text-2xl font-black leading-none tracking-tight">96.4%</p>
            </div>

            {/* Floating active badge */}
            <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white text-[10px] font-semibold tracking-wider uppercase">Active</span>
            </div>
          </motion.div>

          {/* ── CELL 3: Dark stats panel (4 cols) ── */}
          <motion.div
            {...fadeUp(0.15)}
            className="lg:col-span-4 card-dark p-8 flex flex-col justify-between min-h-[180px]"
          >
            <div className="flex items-center justify-between">
              <Sparkles size={18} className="text-blue-400" />
              <span className="mono text-[9px] text-white/30 uppercase tracking-widest">Performance</span>
            </div>
            <div>
              <p className="text-[4rem] font-black text-white leading-none tracking-[-0.05em]">96.4<span className="text-2xl text-blue-400 font-bold">%</span></p>
              <p className="text-white/40 text-[10px] mono uppercase tracking-widest mt-2 font-semibold">Avg. Predictive Accuracy</p>
            </div>
          </motion.div>

          {/* ── CELL 4: Stats row (4 cols) ── */}
          <motion.div
            {...fadeUp(0.2)}
            className="lg:col-span-4 card p-8 flex flex-col justify-between min-h-[180px]"
          >
            <Layers size={18} className="text-[#A3A3A3]" />
            <div>
              <p className="text-[4rem] font-black text-[#0A0A0A] leading-none tracking-[-0.05em]">15<span className="text-2xl text-[#1A56DB] font-bold">+</span></p>
              <p className="text-[#A3A3A3] text-[10px] mono uppercase tracking-widest mt-2 font-semibold">Projects Shipped</p>
            </div>
          </motion.div>

          {/* ── CELL 5: Location tile (4 cols) ── */}
          <motion.div
            {...fadeUp(0.25)}
            className="lg:col-span-4 card p-8 flex flex-col justify-between min-h-[180px] overflow-hidden"
          >
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-[#A3A3A3]" />
              <span className="mono text-[9px] text-[#A3A3A3] uppercase tracking-widest">Location</span>
            </div>
            <div>
              <p className="text-2xl font-black text-[#0A0A0A] leading-tight tracking-tight mb-1">Pune, IN</p>
              <p className="mono text-[9px] text-[#A3A3A3] uppercase tracking-widest">18.5204°N · 73.8567°E</p>
            </div>
            {/* Abstract map decoration */}
            <div className="absolute right-3 bottom-3 w-24 h-24 opacity-5">
              <div className="w-full h-full border-2 border-current rounded-full" />
              <div className="absolute inset-3 border border-current rounded-full" />
              <div className="absolute inset-6 border border-current rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tech Marquee */}
      <div className="relative z-10">
        <TechMarquee />
      </div>
    </section>
  );
};

export default HeroSection;
