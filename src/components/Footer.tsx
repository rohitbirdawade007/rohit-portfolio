import { Cpu, Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useProfile } from "@/context/ProfileContext";

const Footer = () => {
  const { profile } = useProfile();
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12 relative">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Cpu size={15} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 leading-none">Rohit Birdawade</p>
              <p className="mono text-[10px] text-slate-500 mt-1">AI & Machine Learning Engineer</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#home" className="hover:text-indigo-600 transition-colors">Home</a>
            <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
            <a href="#projects" className="hover:text-indigo-600 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-indigo-600 transition-colors">Skills</a>
            <a href="#contact" className="hover:text-indigo-600 transition-colors">Contact</a>
          </div>

          {/* Socials & Back To Top */}
          <div className="flex items-center gap-3">
            <a href={profile?.socialLinks?.github || "https://github.com/rohitbirdawade007"} target="_blank" rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-xs">
              <Github size={14} />
            </a>
            <a href={profile?.socialLinks?.linkedin || "https://linkedin.com/in/rohitbirdawade007"} target="_blank" rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-xs">
              <Linkedin size={14} />
            </a>
            <button onClick={scrollToTop} className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-500 transition-all shadow-xs">
              <ArrowUp size={14} />
            </button>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-200/60 text-center text-xs text-slate-500 font-medium">
          © {year} Rohit Birdawade. Built with React, TypeScript & Tailwind CSS.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
