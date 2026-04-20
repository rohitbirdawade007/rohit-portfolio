import { useProfile } from "@/context/ProfileContext";
import { Github, Linkedin, FileText, Mail, Database, Cpu, Brain, BarChart3 } from "lucide-react";
import { getAssetUrl } from "@/services/api";

const Sidebar = () => {
  const { profile } = useProfile();
  const name = profile?.name || "Rohit Birdawade";

  const domains = [
    { icon: <Brain size={14} />, name: "Machine Learning" },
    { icon: <Database size={14} />, name: "Data Science" },
    { icon: <Cpu size={14} />, name: "IoT Systems" },
    { icon: <BarChart3 size={14} />, name: "Data Analytics" }
  ];

  return (
    <aside className="system-sidebar">
      <div className="flex-1">
        <div className="mb-12">
          <h1 className="text-2xl font-bold tracking-tighter mb-1 uppercase italic">
            Rohit.B<span className="text-blue-500 underline">_</span>
          </h1>
          <p className="text-[#94a3b8] text-xs font-mono-system uppercase tracking-widest font-semibold italic">
            System: ACTIVE
          </p>
        </div>

        <div className="mb-12">
          <p className="text-sm font-semibold text-white/90 leading-relaxed mb-8">
            "I build intelligent systems that turn real-world data into actionable insights."
          </p>
          
          <div className="space-y-4">
             <p className="text-[10px] font-mono-system uppercase tracking-widest text-[#94a3b8] mb-4">Core Domains</p>
             {domains.map((domain, i) => (
                <div key={i} className="flex items-center gap-3 text-xs text-[#94a3b8] group cursor-default hover:text-white transition-colors">
                   <span className="text-blue-500 group-hover:scale-110 transition-transform">{domain.icon}</span>
                   {domain.name}
                </div>
             ))}
          </div>
        </div>

        <div className="space-y-2">
           <p className="text-[10px] font-mono-system uppercase tracking-widest text-[#94a3b8] mb-4">External Links</p>
           <a 
              href="/resume.pdf" target="_blank" 
              className="flex items-center justify-between w-full px-4 py-2 bg-white/5 border border-white/5 rounded-lg text-[11px] font-mono-system uppercase tracking-wider text-[#94a3b8] hover:bg-white/10 hover:text-white transition-all"
            >
             Resume <FileText size={14} />
           </a>
           <a 
              href={profile?.socialLinks?.github} target="_blank"
              className="flex items-center justify-between w-full px-4 py-2 border border-white/5 rounded-lg text-[11px] text-[#94a3b8] hover:text-white transition-all"
            >
             GitHub <Github size={14} />
           </a>
           <a 
              href={profile?.socialLinks?.linkedin} target="_blank"
              className="flex items-center justify-between w-full px-4 py-2 border border-white/5 rounded-lg text-[11px] text-[#94a3b8] hover:text-white transition-all"
            >
             LinkedIn <Linkedin size={14} />
           </a>
        </div>
      </div>

      <div className="pt-8 border-t border-[#1e293b]">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-500 font-mono-system font-black text-xs">
               DS
            </div>
            <div>
               <p className="text-[10px] font-bold text-white leading-none">AI / IoT ENG</p>
               <p className="text-[9px] text-[#94a3b8] mt-1 font-mono-system">v2.0.4 - 2026</p>
            </div>
         </div>
      </div>
    </aside>
  );
};

export default Sidebar;
