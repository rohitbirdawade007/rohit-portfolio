import { useProfile } from "@/context/ProfileContext";
import { motion } from "framer-motion";
import { Terminal, Github, Linkedin, Mail, Target, Cpu, Award, TrendingUp, Code2, BookOpen, MapPin, Zap } from "lucide-react";

const resolveImage = (path?: string | null) => {
  if (!path) return "/profile.png";
  if (path.startsWith("http") || path.startsWith("/")) return path;
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
  const name   = profile?.name  || "Rohit Birdawade";
  const about  = profile?.about || "Highly motivated Computer Science Engineer with a strong foundation in AI, ML, and software development. Passionate about solving real-world problems with intelligent systems.";
  const imgSrc = resolveImage(profile?.profileImage);

  const META = [
    { k: "name",      v: name },
    { k: "role",      v: profile?.title || "Data Scientist / AI Engineer" },
    { k: "location",  v: profile?.location || "Pune, Maharashtra, India" },
    { k: "expertise", v: "ML · GenAI · Edge AI · Computer Vision" },
    { k: "status",    v: "Active · Open to Opportunities", green: true },
  ];

  const HIGHLIGHTS = [
    { icon: <Target size={16} />,  t: "Precision Models",     d: "95%+ accuracy in production ML architectures", color: "#4F46E5", bg: "#EEF2FF" },
    { icon: <Cpu size={16} />,     t: "Edge AI & IoT",        d: "ESP32, Raspberry Pi, embedded sensor systems",  color: "#7C3AED", bg: "#F5F3FF" },
    { icon: <Award size={16} />,   t: "Award Winner",         d: "🥇 1st Prize · NLPC-2025 National Competition",  color: "#D97706", bg: "#FFFBEB" },
    { icon: <Zap size={16} />,     t: "GenAI Systems",        d: "RAG pipelines, LLM fine-tuning, ChromaDB",      color: "#059669", bg: "#ECFDF5" },
  ];

  const STATS = [
    { value: "6+",   label: "Projects",        icon: <Code2 size={14} />,    color: "#4F46E5" },
    { value: "500+", label: "Git Commits",      icon: <TrendingUp size={14}/>, color: "#7C3AED" },
    { value: "8.7",  label: "CGPA",             icon: <BookOpen size={14} />, color: "#059669" },
    { value: "2",    label: "Certifications",   icon: <Award size={14} />,    color: "#D97706" },
  ];

  const SOCIAL = [
    { href: profile?.socialLinks?.github   || "https://github.com/rohitbirdawade007",         icon: <Github size={14} />,   label: "GitHub" },
    { href: profile?.socialLinks?.linkedin || "https://linkedin.com/in/rohitbirdawade007",    icon: <Linkedin size={14} />, label: "LinkedIn" },
    { href: `mailto:${profile?.email      || "rohitbirdawade007@gmail.com"}`,                 icon: <Mail size={14} />,     label: "Email" },
  ];

  return (
    <section id="about" className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      <div className="container relative z-10">

        {/* Section Label */}
        <motion.div {...fadeUp()} className="section-label">
          <span className="eyebrow"><span className="eyebrow-dot" />About Me</span>
        </motion.div>

        {/* Headline */}
        <motion.div {...fadeUp(0.05)} className="mb-14">
          <h2 className="display-md text-slate-900 font-black">
            The <span className="gradient-text">Engineer</span> Behind the AI
          </h2>
          <p className="text-slate-500 mt-2 text-[15px] max-w-xl">
            Turning research-grade AI into real-world applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ── Left: Photo + Social ── */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-4 space-y-4">

            {/* Photo */}
            <div className="card overflow-hidden">
              <div className="relative aspect-[4/5] bg-slate-100">
                <img
                  src={imgSrc}
                  alt={name}
                  className="w-full h-full object-cover object-top"
                  onError={e => { (e.currentTarget as HTMLImageElement).src = "/profile.png"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <p className="mono text-[9.5px] text-indigo-300 uppercase tracking-widest font-semibold mb-1">AI Researcher</p>
                  <p className="text-white font-bold text-base leading-snug">{name}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <MapPin size={10} className="text-slate-400" />
                    <span className="mono text-[9px] text-slate-400 uppercase tracking-wider">Pune, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-3 gap-2">
              {SOCIAL.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                  className="card flex flex-col items-center justify-center gap-1.5 py-3.5 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-all text-[11px] font-semibold"
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2">
              {STATS.map((s, i) => (
                <div key={i} className="card p-4 text-center">
                  <div className="flex justify-center mb-1.5" style={{ color: s.color }}>{s.icon}</div>
                  <p className="text-xl font-black text-slate-900">{s.value}</p>
                  <p className="mono text-[8.5px] text-slate-500 uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Bio + Metadata + Highlights ── */}
          <motion.div {...fadeUp(0.15)} className="lg:col-span-8 space-y-5">

            {/* Terminal JSON Metadata */}
            <div className="card overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 bg-slate-900 border-b border-slate-800">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <div className="flex items-center gap-1.5 ml-2">
                  <Terminal size={11} className="text-slate-400" />
                  <span className="mono text-[10px] text-slate-400">metadata.json</span>
                </div>
                <div className="ml-auto mono text-[8.5px] text-emerald-400 font-semibold">● ACTIVE</div>
              </div>
              <div className="bg-slate-950 px-5 py-4 divide-y divide-slate-800/50">
                {META.map((f, i) => (
                  <div key={i} className="flex gap-4 py-2 first:pt-0 last:pb-0">
                    <span className="mono text-[11px] font-semibold text-indigo-400 w-[90px] shrink-0">{f.k}:</span>
                    <span className={`text-[12.5px] font-medium mono ${f.green ? "text-emerald-400" : "text-slate-300"}`}>
                      "{f.v}"
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bio Text */}
            <div className="card p-6">
              <p className="mono text-[10px] font-semibold text-indigo-600 uppercase tracking-widest mb-3">// Biography</p>
              <p className="text-slate-700 leading-[1.8] text-[14.5px] mb-4">{about}</p>
              <p className="text-slate-500 leading-[1.8] text-[13.5px]">
                Specialized in deploying edge AI solutions and deep learning architectures with complete ML pipelines — from data ingestion to model serving in production environments.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HIGHLIGHTS.map((h, i) => (
                <motion.div
                  key={i} {...fadeUp(0.2 + i * 0.05)}
                  className="card p-5 flex items-start gap-4"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: h.bg, color: h.color }}
                  >
                    {h.icon}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-slate-900 mb-0.5">{h.t}</p>
                    <p className="text-[12px] text-slate-500 leading-relaxed">{h.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
