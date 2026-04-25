import { useProfile } from "@/context/ProfileContext";
import { motion, useInView } from "framer-motion";
import { Terminal, Github, Linkedin, Mail, Target, Cpu, Award, ArrowRight, TrendingUp, Users, Code2 } from "lucide-react";
import { useRef } from "react";

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
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
});

/* ── Animated stat card ── */
function StatCard({ value, label, icon, color = "#1A56DB" }: { value: string; label: string; icon: React.ReactNode; color?: string }) {
  return (
    <div className="card p-5 text-center hover-lift hover-glow flex flex-col items-center gap-2">
      <div className="icon-md mb-1" style={{ background: `${color}15`, color }}>
        {icon}
      </div>
      <p className="text-2xl font-black text-[#0A0A0A] tracking-tight">{value}</p>
      <p className="mono text-[9px] text-[#A3A3A3] uppercase tracking-widest">{label}</p>
    </div>
  );
}

const AboutSection = () => {
  const { profile } = useProfile();
  const name = profile?.name || "Rohit Birdawade";
  const about = profile?.about || "Highly motivated Computer Science Engineer with a strong foundation in software development, data analytics, and deep learning models.";
  const imgSrc = resolveImage(profile?.profileImage);

  const fields = [
    { k: "name",      v: name },
    { k: "role",      v: profile?.title || "Data Scientist / AI Engineer" },
    { k: "location",  v: "Pune, Maharashtra, IN" },
    { k: "expertise", v: "ML · Deep Learning · IoT · Edge AI" },
    { k: "status",    v: "Active · Open to Opportunities", highlight: true },
    { k: "email",     v: "rohitbirdawade007@gmail.com" },
  ];

  const highlights = [
    { icon: <Target size={16} className="text-[#1A56DB]" />, t: "Precision Models",      d: "95%+ accuracy production architectures", color: "#1A56DB" },
    { icon: <Cpu size={16} className="text-[#7C3AED]" />,    t: "Edge AI & IoT",        d: "ESP32, Raspberry Pi, sensor integration", color: "#7C3AED" },
    { icon: <Award size={16} className="text-[#D97706]" />,  t: "National Recognition", d: "1st Prize, NLPC-2025 competition",        color: "#D97706" },
  ];

  const quickStats = [
    { value: "96.4%", label: "Model Accuracy",   icon: <TrendingUp size={16} />, color: "#1A56DB" },
    { value: "15+",   label: "Projects Built",   icon: <Code2 size={16} />,      color: "#7C3AED" },
    { value: "2+",    label: "Years Experience", icon: <Users size={16} />,      color: "#059669" },
  ];

  return (
    <section id="about" className="py-28 relative overflow-hidden" style={{ background: "var(--canvas)" }}>
      {/* Subtle blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-50/40 rounded-full blur-[150px] pointer-events-none" />

      <div className="container relative">

        {/* ── Section label ── */}
        <motion.div {...fadeUp()} className="section-label">
          <span className="eyebrow"><span className="eyebrow-dot" />System Metadata</span>
        </motion.div>

        {/* ── Headline ── */}
        <motion.div {...fadeUp(0.05)} className="mb-16">
          <h2 className="display-md font-black tracking-[-0.04em] leading-[1.05] text-[#0A0A0A]">
            About the <span style={{ background: "linear-gradient(135deg,#1A56DB,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Engineer</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ── Photo column ── */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-4 space-y-4">
            {/* Photo card */}
            <div className="card overflow-hidden group" style={{ background: "#0A0A0A" }}>
              <div className="relative aspect-[4/5]">
                <img
                  src={imgSrc}
                  alt={name}
                  className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/profile.png"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 px-6 py-5">
                  <p className="mono text-[9px] text-blue-400 uppercase tracking-widest mb-1">ML Researcher</p>
                  <p className="text-white font-bold text-base">{name}</p>
                </div>
                {/* Floating chip */}
                <div className="absolute top-4 right-4 status-online text-[9px]">Active</div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2">
              {quickStats.map((s, i) => (
                <StatCard key={i} {...s} />
              ))}
            </div>

            {/* Social row */}
            <div className="flex gap-2">
              {[
                { href: profile?.socialLinks?.github || "https://github.com/rohitbirdawade007",       icon: <Github size={15} />, label: "GitHub" },
                { href: profile?.socialLinks?.linkedin || "https://linkedin.com/in/rohitbirdawade007", icon: <Linkedin size={15} />, label: "LinkedIn" },
                { href: `mailto:rohitbirdawade007@gmail.com`,                                           icon: <Mail size={15} />, label: "Email" },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2 }}
                  className="flex-1 flex flex-col items-center gap-1.5 py-3 card text-[#737373] hover:text-[#1A56DB] hover:border-[#BFDBFE] transition-all text-[11px] font-semibold"
                >
                  {s.icon}
                  {s.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Content column ── */}
          <motion.div {...fadeUp(0.15)} className="lg:col-span-8 space-y-5">
            {/* Terminal JSON card */}
            <div className="card overflow-hidden">
              {/* Terminal top bar */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#F0F0EE] bg-[#FAFAF9]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBC2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
                </div>
                <div className="flex items-center gap-1.5 ml-2">
                  <Terminal size={11} className="text-[#A3A3A3]" />
                  <span className="mono text-[10px] text-[#A3A3A3]">profile_metadata.json</span>
                </div>
                <div className="ml-auto">
                  <span className="mono text-[9px] text-emerald-500">● live</span>
                </div>
              </div>
              {/* Metadata rows */}
              <div className="p-5 divide-y divide-[#F0F0EE]">
                {fields.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex gap-4 py-3 first:pt-0 last:pb-0 group"
                  >
                    <span className="mono text-[11px] font-semibold text-[#1A56DB] w-[90px] shrink-0 pt-0.5">{f.k}</span>
                    <span className={`text-[13px] font-medium leading-snug ${f.highlight ? "text-emerald-600 font-semibold" : "text-[#404040]"}`}>
                      {f.v}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bio card */}
            <div className="card p-6">
              <p className="text-[#525252] leading-relaxed text-[15px] mb-4">{about}</p>
              <p className="text-[#737373] leading-relaxed text-[14px]">
                I specialize in building low-latency AI solutions at the edge. My work combines academic rigor with practical deployment experience, spanning deep learning, hardware engineering, and scalable data systems.
              </p>
              {/* Skill chips */}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#F0F0EE]">
                {["Python", "TensorFlow", "PyTorch", "ESP32", "React", "FastAPI", "SQL", "Docker"].map(skill => (
                  <span key={skill} className="chip text-xs">{skill}</span>
                ))}
              </div>
            </div>

            {/* Highlights grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(0.2 + i * 0.07)}
                  className="card-feature p-5 hover-lift"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${h.color}15` }}
                  >
                    {h.icon}
                  </div>
                  <p className="text-[13px] font-bold text-[#0A0A0A] mb-1.5">{h.t}</p>
                  <p className="text-[12px] text-[#737373] leading-snug">{h.d}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-secondary flex items-center gap-2 text-sm"
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
