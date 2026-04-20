import { Github, Linkedin, Mail, Cpu, Globe, ArrowUp, Zap, ShieldCheck, HardDrive } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import AnimatedLogo from "./AnimatedLogo";
import { Button } from "./ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { profile } = useProfile();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t border-slate-100 text-slate-900 py-32 relative overflow-hidden selection:bg-sky-100 selection:text-sky-900">
      {/* Structural Decor */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 via-slate-100 to-sky-500 opacity-20" />
      <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-sky-50 rounded-full blur-[150px] opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 pb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-10 text-center lg:text-left">
            <div>
               <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-2xl">
                     <Cpu size={28} />
                  </div>
                  <div className="flex flex-col leading-tight">
                     <span className="text-2xl font-black tracking-tighter italic uppercase underline decoration-sky-500 decoration-4 underline-offset-4">ROHIT BIRDAWADE</span>
                     <span className="text-[10px] font-black tracking-[0.5em] text-sky-500 uppercase mt-2">AI HARDWARE RESEARCH NODE</span>
                  </div>
               </div>
               <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-md mx-auto lg:mx-0 italic">
                  "{profile?.bio || "Architecting next-generation intelligent hardware solutions with a focus on machine learning and scalable electronics."}"
               </p>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-3">
               <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">NETWORK_PROTOCOLS_LIVE</span>
            </div>
          </div>

          {/* Directory Column */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-10">
            <div className="space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 border-b border-slate-50 pb-4">TERMINAL_LINKS</h4>
               <ul className="space-y-4">
                  <li><a href="#home" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-sky-500 transition-colors">ROOT_DIR</a></li>
                  <li><a href="#about" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-sky-500 transition-colors">CORE_MODULE</a></li>
                  <li><a href="#projects" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-sky-500 transition-colors">DEPLOYMENTS</a></li>
                  <li><a href="#skills" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-sky-500 transition-colors">LOGIC_MATRIX</a></li>
               </ul>
            </div>
            <div className="space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 border-b border-slate-50 pb-4">RESOURCES</h4>
               <ul className="space-y-4">
                  <li><a href="/projects" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-sky-500 transition-colors">PROJECT_HUB</a></li>
                  <li><a href="/research" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-sky-500 transition-colors">ARCHIVE_NODES</a></li>
                  <li><a href="/admin/login" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-sky-500 transition-colors italic">SUDO_ACCESS</a></li>
               </ul>
            </div>
          </div>

          {/* Interaction Column */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-end justify-between space-y-10">
             <div className="flex gap-4">
                {profile?.socialLinks?.github && (
                   <a h-14 w-14 href={profile.socialLinks.github} target="_blank" className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 hover:bg-sky-50 hover:text-sky-500 transition-all shadow-sm">
                      <Github size={24} />
                   </a>
                )}
                {profile?.socialLinks?.linkedin && (
                   <a href={profile.socialLinks.linkedin} target="_blank" className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 hover:bg-sky-50 hover:text-sky-500 transition-all shadow-sm">
                      <Linkedin size={24} />
                   </a>
                )}
             </div>
             
             <Button 
               onClick={scrollToTop}
               className="h-16 w-16 rounded-[2rem] bg-sky-500 hover:bg-sky-600 text-white shadow-xl shadow-sky-500/20 active:scale-90 transition-all"
             >
               <ArrowUp size={24} />
             </Button>
          </div>
        </div>
        
        {/* Bottom Banner */}
        <div className="pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-6">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">© {currentYear} RB_CORE_SYSTEM</span>
              <div className="hidden md:flex items-center gap-3 text-[9px] font-black text-slate-200 uppercase tracking-widest">
                 <HardDrive size={12} /> SECTOR_DATA_STABLE
              </div>
           </div>
           
           <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              <div className="flex items-center gap-2 text-sky-500 italic">
                 <ShieldCheck size={14} /> SECURITY_LEVEL_A
              </div>
              <span className="opacity-40">BENTO_EDITORIAL_V5.0</span>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
