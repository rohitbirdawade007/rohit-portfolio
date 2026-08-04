import { useProfile } from "@/context/ProfileContext";
import { motion } from "framer-motion";
import { Terminal, Github, Linkedin, Mail, Target, Cpu, Award, TrendingUp, Code2, BookOpen } from "lucide-react";

const resolveImage = (path?: string | null): string => {
  if (!path) return "/profile.png";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/")) return path;
  return "/profile.png";
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
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
    { icon: <Target size={18} />, t: "Precision Models",      d: "95%+ accuracy production architectures", color: "#6366F1" },
    { icon: <Cpu size={18} />,    t: "Edge AI & IoT",         d: "ESP32, Raspberry Pi, sensor integration", color: "#8B5CF6" },
    { icon: <Award size={18} />,  t: "National Recognition",  d: "1st Prize, NLPC-2025 competition",        color: "#F59E0B" },
  ];

  const bioStats = [
    { value: "6+",   label: "Projects",       icon: <Code2 size={16} />,     color: "#6366F1" },
    { value: "500+", label: "Commits",         icon: <TrendingUp size={16} />, color: "#8B5CF6" },
    { value: "8.7",  label: "CGPA",            icon: <BookOpen size={16} />,  color: "#10B981" },
    { value: "2",    label: "Certifications",  icon: <Award size={16} />,     color: "#F59E0B" },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#090A0F]">
      <div className="container relative">

        {/* Section Header */}
        <motion.div {...fadeUp()} className="section-label">
          <span className="eyebrow"><span className="eyebrow-dot" />System Metadata</span>
        </motion.div>

        <motion.div {...fadeUp(0.05)} className="mb-14">
          <h2 className="display-md font-black text-white">
            About the <span className="text-indigo-400">Engineer</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column: Photo & Social */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-4 space-y-4">
            {/* Profile Photo Card */}
            <div className="card overflow-hidden">
              <div className="relative aspect-[4/5] bg-slate-900">
                <img
                  src={imgSrc}
                  alt={name}
                  className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/profile.png"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-transparent to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                  <p className="mono text-[10px] text-indigo-400 font-semibold uppercase tracking-widest mb-1">AI Researcher</p>
                  <p className="text-white font-bold text-lg">{name}</p>
                </div>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="flex gap-2">
              {[
                { href: profile?.socialLinks?.github || "https://github.com/rohitbirdawade007",       icon: <Github size={15} />,   label: "GitHub" },
                { href: profile?.socialLinks?.linkedin || "https://linkedin.com/in/rohitbirdawade007", icon: <Linkedin size={15} />, label: "LinkedIn" },
                { href: `mailto:${profile?.email || "rohitbirdawade007@gmail.com"}`,                   icon: <Mail size={15} />,     label: "Email" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 card text-slate-300 hover:text-white hover:border-indigo-500/40 transition-all text-xs font-semibold">
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Bio & Metadata */}
          <motion.div {...fadeUp(0.15)} className="lg:col-span-8 space-y-5">

            {/* Terminal Metadata Card */}
            <div className="card">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/08 bg-slate-950/40">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-1.5 ml-2">
                  <Terminal size={12} className="text-slate-400" />
                  <span className="mono text-[10.5px] text-slate-400">metadata.json</span>
                </div>
              </div>
              <div className="p-5 divide-y divide-white/05">
                {fields.map((f, i) => (
                  <div key={i} className="flex gap-4 py-2.5 first:pt-0 last:pb-0">
                    <span className="mono text-[11px] font-semibold text-indigo-400 w-[95px] shrink-0">{f.k}</span>
                    <span className={`text-[13px] font-medium ${f.highlight ? "text-emerald-400 font-semibold" : "text-slate-300"}`}>
                      {f.v}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bio & Stats */}
            <div className="card p-6">
              <p className="text-slate-300 leading-relaxed text-[15px] mb-4">{about}</p>
              <p className="text-slate-400 leading-relaxed text-[14px]">
                Specialized in deploying edge AI solutions and deep learning architectures with full production pipelines from research to deployment.
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/08">
                {bioStats.map((s, i) => (
                  <div key={i} className="text-center p-3 rounded-xl bg-white/02 border border-white/05">
                    <div className="flex justify-center mb-1" style={{ color: s.color }}>{s.icon}</div>
                    <p className="text-lg font-black text-white">{s.value}</p>
                    <p className="mono text-[8.5px] text-slate-400 uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {highlights.map((h, i) => (
                <div key={i} className="card p-5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${h.color}15`, color: h.color }}>
                    {h.icon}
                  </div>
                  <p className="text-[13.5px] font-bold text-white mb-1">{h.t}</p>
                  <p className="text-[12px] text-slate-400 leading-snug">{h.d}</p>
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
