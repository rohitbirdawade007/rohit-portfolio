import { Github, Linkedin, Mail, Cpu, ArrowUp, Heart } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import { motion } from "framer-motion";

const Footer = () => {
  const year = new Date().getFullYear();
  const { profile } = useProfile();

  const nav = [
    ["Home", "#home"], ["About", "#about"], ["Skills", "#skills"],
    ["Projects", "#projects"], ["Experience", "#experience"], ["Contact", "#contact"],
  ];
  const resources = [
    ["All Projects", "/projects"], ["Research", "/research"],
    ["Blog", "/blog"], ["Certifications", "/certifications"], ["Admin", "/admin/login"],
  ];

  const techStack = ["React", "TypeScript", "Vite", "Framer Motion", "Tailwind CSS", "Node.js"];

  return (
    <footer style={{ background: "var(--surface)", borderTop: "1px solid var(--line)" }} className="relative overflow-hidden">
      {/* Top gradient accent */}
      <div className="gradient-line absolute top-0 inset-x-0 opacity-60" />

      {/* Decorative blobs */}
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-blue-50/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-[#F0F0EE]">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-10 h-10 rounded-xl bg-[#0A0A0A] text-white flex items-center justify-center cursor-pointer"
              >
                <Cpu size={18} />
              </motion.div>
              <div>
                <p className="text-[14px] font-bold text-[#0A0A0A] tracking-tight">Rohit Birdawade</p>
                <p className="mono text-[9px] font-semibold text-[#1A56DB] uppercase tracking-widest">AI Engineer · Data Scientist</p>
              </div>
            </div>
            <p className="text-[#737373] text-[14px] leading-relaxed max-w-sm">
              {profile?.bio || "Architecting next-generation intelligent systems — from ML pipelines to edge AI deployments."}
            </p>
            <div className="flex items-center gap-1.5">
              <span className="status-online">Open to collaboration</span>
            </div>

            {/* Social icons */}
            <div className="flex gap-2">
              {[
                { href: profile?.socialLinks?.github  || "https://github.com/rohitbirdawade007",       icon: <Github size={14} />,   label: "GitHub" },
                { href: profile?.socialLinks?.linkedin || "https://linkedin.com/in/rohitbirdawade007",  icon: <Linkedin size={14} />, label: "LinkedIn" },
                { href: `mailto:${profile?.email || "rohitbirdawade007@gmail.com"}`,                    icon: <Mail size={14} />,     label: "Email" },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  title={s.label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-9 h-9 rounded-xl bg-[#F5F5F5] border border-[#EBEBEB] flex items-center justify-center text-[#737373] hover:bg-[#0A0A0A] hover:text-white hover:border-transparent transition-all"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="mono text-[10px] font-semibold text-[#A3A3A3] uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-2.5">
              {nav.map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="text-[13px] font-medium text-[#525252] hover:text-[#1A56DB] transition-colors flex items-center gap-1.5 group">
                    <span className="w-0 group-hover:w-2 h-px bg-[#1A56DB] transition-all duration-200" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="mono text-[10px] font-semibold text-[#A3A3A3] uppercase tracking-widest">Resources</h4>
            <ul className="space-y-2.5">
              {resources.map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="text-[13px] font-medium text-[#525252] hover:text-[#1A56DB] transition-colors flex items-center gap-1.5 group">
                    <span className="w-0 group-hover:w-2 h-px bg-[#1A56DB] transition-all duration-200" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech stack strip */}
        <div className="py-4 border-b border-[#F0F0EE] flex items-center gap-3 overflow-hidden">
          <span className="mono text-[9px] text-[#D4D4D4] uppercase tracking-widest shrink-0">Built with</span>
          <div className="flex gap-2 flex-wrap">
            {techStack.map(t => (
              <span key={t} className="tag text-[9px]">{t}</span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8">
          <div className="flex items-center gap-2">
            <p className="mono text-[11px] text-[#A3A3A3]">© {year} Rohit Birdawade</p>
            <span className="text-[#D4D4D4]">·</span>
            <span className="mono text-[10px] text-[#D4D4D4] flex items-center gap-1">
              Made with <Heart size={9} className="text-rose-400 fill-rose-400" /> in Pune, India
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="mono text-[10px] text-[#D4D4D4] uppercase tracking-widest">AI Dashboard v5.0</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-9 h-9 rounded-xl bg-[#0A0A0A] flex items-center justify-center text-white hover:bg-[#1A56DB] transition-colors shadow-sm"
            >
              <ArrowUp size={15} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
