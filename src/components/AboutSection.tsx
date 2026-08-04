import { useProfile } from "@/context/ProfileContext";
import { motion } from "framer-motion";
import { Terminal, Github, Linkedin, Mail, Target, Cpu, Award, ArrowRight, TrendingUp, Users, Code2, BookOpen } from "lucide-react";

const resolveImage = (path?: string | null): string => {
  if (!path) return "/profile.png";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/")) return path;
  return "/profile.png";
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
});

const AboutSection = () => {
  const { profile } = useProfile();
  const name = profile?.name || "Rohit Birdawade";
  const about = profile?.about || "Highly motivated Computer Science Engineer with a strong foundation in software development, data analytics, and deep learning models.";
  const imgSrc = resolveImage(profile?.profileImage);

  const fields = [
    { k: "name",      v: name },
    { k: "role",      v: profile?.title || "Data Scientist / AI Engineer" },
    { k: "location",  v: profile?.location || "Pune, Maharashtra, IN" },
    { k: "expertise", v: "ML · Deep Learning · IoT · Edge AI" },
    { k: "status",    v: "Active · Open to Opportunities", highlight: true },
    { k: "email",     v: profile?.email || "rohitbirdawade007@gmail.com" },
  ];

  const highlights = [
    { icon: <Target size={16} />, t: "Precision Models",      d: "95%+ accuracy production architectures", color: "#6366F1" },
    { icon: <Cpu size={16} />,    t: "Edge AI & IoT",         d: "ESP32, Raspberry Pi, sensor integration", color: "#8B5CF6" },
    { icon: <Award size={16} />,  t: "National Recognition",  d: "1st Prize, NLPC-2025 competition",        color: "#F59E0B" },
  ];

  const bioStats = [
    { value: "6+",   label: "Projects",       icon: <Code2 size={16} />,     color: "#6366F1" },
    { value: "500+", label: "Commits",         icon: <TrendingUp size={16} />, color: "#8B5CF6" },
    { value: "8.7",  label: "CGPA",            icon: <BookOpen size={16} />,  color: "#10B981" },
    { value: "2",    label: "Certifications",  icon: <Award size={16} />,     color: "#F59E0B" },
  ];

  const quickStats = [
    { value: "96.4%", label: "Model Accuracy",   icon: <TrendingUp size={16} />, color: "#6366F1" },
    { value: "6+",    label: "Projects Built",    icon: <Code2 size={16} />,     color: "#8B5CF6" },
    { value: "2+",    label: "Years Experience",  icon: <Users size={16} />,     color: "#10B981" },
  ];

  const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`rounded-2xl border transition-all duration-300 ${className}`}
      style={{ background: "rgba(17,24,39,0.6)", borderColor: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}>
      {children}
    </div>
  );

  return (
    <section id="about" className="py-28 relative overflow-hidden" style={{ background: "#030712" }}>
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)" }} />
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(rgba(99,102,241,0.8) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="container relative">

        {/* Section label */}
        <motion.div {...fadeUp()} className="section-label">
          <span className="eyebrow"><span className="eyebrow-dot" />System Metadata</span>
        </motion.div>

        {/* Headline */}
        <motion.div {...fadeUp(0.05)} className="mb-16">
          <h2 className="display-md font-black tracking-[-0.04em] leading-[1.05] text-white">
            About the{" "}
            <span style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Engineer
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Photo column */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-4 space-y-4">
            {/* Photo card */}
            <GlassCard className="overflow-hidden" style={{ background: "rgba(10,10,20,0.8)" } as any}>
              <div className="relative aspect-[4/5]">
                <div className="absolute inset-3 rounded-xl overflow-hidden"
                  style={{ padding: "2px", background: "linear-gradient(135deg, #6366F1, #8B5CF6, #38BDF8)", borderRadius: "1rem" }}>
                  <div className="w-full h-full rounded-[calc(1rem-2px)] overflow-hidden" style={{ background: "#0A0A0A" }}>
                    <img src={imgSrc} alt={name} className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/profile.png"; }} />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 px-5 py-4 z-20">
                  <p className="mono text-[9px] text-indigo-400 uppercase tracking-widest mb-1">ML Researcher</p>
                  <p className="text-white font-bold text-base">{name}</p>
                </div>
                <div className="absolute top-6 right-6 z-20 status-online text-[9px]">Active</div>
              </div>
            </GlassCard>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2">
              {quickStats.map((s, i) => (
                <GlassCard key={i} className="p-4 text-center hover:-translate-y-1 cursor-default flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}15`, color: s.color }}>
                    {s.icon}
                  </div>
                  <p className="text-xl font-black text-white tracking-tight">{s.value}</p>
                  <p className="mono text-[8px] uppercase tracking-widest" style={{ color: "#6B7280" }}>{s.label}</p>
                </GlassCard>
              ))}
            </div>

            {/* Social row */}
            <div className="flex gap-2">
              {[
                { href: profile?.socialLinks?.github || "https://github.com/rohitbirdawade007",       icon: <Github size={15} />,   label: "GitHub" },
                { href: profile?.socialLinks?.linkedin || "https://linkedin.com/in/rohitbirdawade007", icon: <Linkedin size={15} />, label: "LinkedIn" },
                { href: `mailto:${profile?.email || "rohitbirdawade007@gmail.com"}`,                   icon: <Mail size={15} />,     label: "Email" },
              ].map((s, i) => (
                <motion.a key={i} href={s.href} target="_blank" rel="noreferrer" whileHover={{ y: -2 }}
                  className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border text-sm font-semibold transition-all"
                  style={{ background: "rgba(17,24,39,0.6)", borderColor: "rgba(255,255,255,0.07)", color: "#6B7280" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#A5B4FC")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#6B7280")}>
                  {s.icon} <span className="text-[10px]">{s.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Content column */}
          <motion.div {...fadeUp(0.15)} className="lg:col-span-8 space-y-5">

            {/* Terminal card */}
            <GlassCard className="overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.3)" }}>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBC2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
                </div>
                <div className="flex items-center gap-1.5 ml-2">
                  <Terminal size={11} style={{ color: "#6B7280" }} />
                  <span className="mono text-[10px]" style={{ color: "#6B7280" }}>profile_metadata.json</span>
                </div>
                <div className="ml-auto">
                  <span className="mono text-[9px] text-emerald-400">● live</span>
                </div>
              </div>
              <div className="p-5 divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                {fields.map((f, i) => (
                  <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex gap-4 py-3 first:pt-0 last:pb-0">
                    <span className="mono text-[11px] font-semibold text-indigo-400 w-[90px] shrink-0 pt-0.5">{f.k}</span>
                    <span className={`text-[13px] font-medium leading-snug ${f.highlight ? "text-emerald-400 font-semibold" : "text-white/70"}`}>
                      {f.v}
                    </span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            {/* Bio card */}
            <GlassCard className="p-6">
              <p className="leading-relaxed text-[15px] mb-4" style={{ color: "#9CA3AF" }}>{about}</p>
              <p className="leading-relaxed text-[14px]" style={{ color: "#6B7280" }}>
                I specialize in building low-latency AI solutions at the edge. My work combines academic rigor with practical deployment experience, spanning deep learning, hardware engineering, and scalable data systems.
              </p>

              {/* Learning badge */}
              <div className="mt-4 flex items-center gap-2">
                <span className="currently-learning-badge" style={{ background: "rgba(16,185,129,0.08)", borderColor: "rgba(16,185,129,0.2)", color: "#6EE7B7" }}>
                  <span className="pulsing-green-dot" />
                  Currently learning: Transformers · RAG · LangChain
                </span>
              </div>

              {/* Bio stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                {bioStats.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="text-center p-3 rounded-xl border hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                    style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}>
                    <div className="flex justify-center mb-1.5" style={{ color: s.color }}>{s.icon}</div>
                    <p className="text-lg font-black text-white tracking-tight">{s.value}</p>
                    <p className="mono text-[8px] uppercase tracking-widest" style={{ color: "#6B7280" }}>{s.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                {["Python", "TensorFlow", "PyTorch", "ESP32", "React", "FastAPI", "SQL", "Docker"].map(skill => (
                  <span key={skill} className="chip">{skill}</span>
                ))}
              </div>
            </GlassCard>

            {/* Highlights grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {highlights.map((h, i) => (
                <motion.div key={i} {...fadeUp(0.2 + i * 0.07)}
                  className="rounded-2xl border p-5 hover:-translate-y-1 transition-all duration-300 cursor-default group"
                  style={{
                    background: `linear-gradient(135deg, ${h.color}08 0%, transparent 60%)`,
                    borderColor: `${h.color}20`
                  }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: `${h.color}15`, color: h.color }}>
                    {h.icon}
                  </div>
                  <p className="text-[13px] font-bold text-white mb-1.5">{h.t}</p>
                  <p className="text-[12px] leading-snug" style={{ color: "#6B7280" }}>{h.d}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-xl border transition-all"
              style={{ background: "rgba(99,102,241,0.1)", borderColor: "rgba(99,102,241,0.25)", color: "#A5B4FC" }}
            >
              Explore Skills <ArrowRight size={14} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
