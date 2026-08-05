import { Cpu, Github, Linkedin, Mail, ArrowUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useProfile } from "@/context/ProfileContext";

const NAV = [
  { label: "About",      id: "about" },
  { label: "Skills",     id: "skills" },
  { label: "Projects",   id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact",    id: "contact" },
];

const Footer = () => {
  const { profile } = useProfile();
  const year = new Date().getFullYear();
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-slate-900 text-white">
      {/* CTA Strip */}
      <div className="border-b border-slate-800">
        <div className="container py-14">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-lg">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tighter mb-3 text-white">
                Let's Build Something{" "}
                <span className="text-indigo-400">Exceptional</span>
              </h2>
              <p className="text-slate-400 text-[15px] leading-relaxed">
                Open to AI engineering roles, technical collaborations, and innovative research projects.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => scroll("contact")}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl transition-all shadow-sm"
              >
                Get in Touch <ArrowRight size={15} />
              </button>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-all"
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                <Cpu size={14} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Rohit Birdawade</p>
                <p className="mono text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">AI · ML Engineer</p>
              </div>
            </div>
            <p className="text-slate-400 text-[13px] leading-relaxed max-w-[240px]">
              Building AI systems that solve real-world problems in healthcare, security, and agriculture.
            </p>
          </div>

          {/* Nav Column */}
          <div>
            <p className="mono text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-4">Navigation</p>
            <div className="space-y-2.5">
              {NAV.map(n => (
                <button
                  key={n.id}
                  onClick={() => scroll(n.id)}
                  className="block text-[13px] font-medium text-slate-400 hover:text-white transition-colors"
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social Column */}
          <div>
            <p className="mono text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-4">Connect</p>
            <div className="space-y-3">
              {[
                { href: profile?.socialLinks?.github || "https://github.com/rohitbirdawade007", icon: <Github size={14} />, label: "GitHub" },
                { href: profile?.socialLinks?.linkedin || "https://linkedin.com/in/rohitbirdawade007", icon: <Linkedin size={14} />, label: "LinkedIn" },
                { href: `mailto:${profile?.email || "rohitbirdawade007@gmail.com"}`, icon: <Mail size={14} />, label: profile?.email || "rohitbirdawade007@gmail.com" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2.5 text-[13px] font-medium text-slate-400 hover:text-white transition-colors"
                >
                  <span className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-slate-600">
            © {year} Rohit Birdawade. Built with React, TypeScript & Vite.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-indigo-600 flex items-center justify-center text-slate-400 hover:text-white transition-all"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
