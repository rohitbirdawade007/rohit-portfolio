import { useEffect, useState } from "react";
import { Github, ExternalLink, Code2, AlertTriangle, Lightbulb, Trophy } from "lucide-react";
import { getProjects, getAssetUrl } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
}

const ProjectModules = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  return (
    <section id="projects" className="scroll-mt-24 mb-20">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px flex-1 bg-[#1e293b]" />
        <h2 className="text-sm font-black text-[#94a3b8] uppercase tracking-[0.4em] font-mono-system shrink-0">Development_Lab_Logs</h2>
        <div className="h-px w-10 bg-[#1e293b]" />
      </div>

      <div className="space-y-6">
        {projects.map((project, i) => (
          <div 
            key={project._id}
            className={`system-module overflow-hidden cursor-pointer transition-all duration-300 ${expandedId === project._id ? 'border-blue-500/50' : 'hover:border-[#1e293b]'}`}
            onClick={() => setExpandedId(expandedId === project._id ? null : project._id)}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
               <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-[#020617] rounded border border-[#1e293b] flex items-center justify-center text-blue-500 shrink-0">
                     <Code2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-1">{project.title}</h3>
                    <div className="flex items-center gap-3">
                       <span className="text-[10px] font-mono-system text-[#94a3b8] uppercase tracking-widest">{project.category || "AI_SYSTEM"}</span>
                       <span className="w-1 h-1 rounded-full bg-[#1e293b]" />
                       <span className="text-[10px] font-mono-system text-blue-500 font-bold uppercase tracking-widest">Active_Repository</span>
                    </div>
                  </div>
               </div>
               
               <div className="flex flex-wrap gap-2">
                 {(project.tags || []).slice(0, 3).map(tag => (
                   <span key={tag} className="text-[9px] font-mono-system font-black px-2 py-1 bg-white/5 border border-white/5 text-[#94a3b8] uppercase tracking-widest">
                     {tag}
                   </span>
                 ))}
               </div>
            </div>

            <AnimatePresence>
              {expandedId === project._id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-10 pt-10 border-t border-[#1e293b] overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                     <div className="lg:col-span-2 space-y-8">
                        <div>
                           <div className="flex items-center gap-2 text-amber-500 mb-3">
                              <AlertTriangle size={14} />
                              <span className="text-[10px] font-mono-system font-black uppercase tracking-widest">Problem_Statement</span>
                           </div>
                           <p className="text-sm text-[#94a3b8] leading-relaxed">
                              Addressing inefficiencies in current {project.category.toLowerCase()} monitoring through automated intelligence and real-time edge processing.
                           </p>
                        </div>
                        <div>
                           <div className="flex items-center gap-2 text-blue-500 mb-3">
                              <Lightbulb size={14} />
                              <span className="text-[10px] font-mono-system font-black uppercase tracking-widest">Applied_Methodology</span>
                           </div>
                           <p className="text-sm text-[#94a3b8] leading-relaxed">
                              {project.description}
                           </p>
                        </div>
                        <div className="flex items-center gap-6 pt-4">
                           <a href={project.githubUrl} target="_blank" className="text-[10px] font-mono-system font-black uppercase tracking-widest text-[#94a3b8] hover:text-white flex items-center gap-2 transition-colors">
                            <Github size={14} /> Source_Access
                           </a>
                           <a href={project.liveUrl} target="_blank" className="text-[10px] font-mono-system font-black uppercase tracking-widest text-blue-500 hover:text-blue-400 flex items-center gap-2 transition-colors">
                            <ExternalLink size={14} /> Live_System_Demo
                           </a>
                        </div>
                     </div>
                     
                     <div className="space-y-6">
                        <div className="aspect-video rounded border border-[#1e293b] overflow-hidden">
                           <img src={getAssetUrl(project.image)} alt={project.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 bg-green-500/5 rounded border border-green-500/10">
                           <div className="flex items-center gap-2 text-green-500 mb-3">
                              <Trophy size={14} />
                              <span className="text-[10px] font-mono-system font-black uppercase tracking-widest">Validated_Results</span>
                           </div>
                           <p className="text-xl font-black text-white italic tracking-tighter">96.4% Acc <span className="text-[10px] not-italic text-gray-500 uppercase font-mono ml-2">on Edge</span></p>
                        </div>
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectModules;
