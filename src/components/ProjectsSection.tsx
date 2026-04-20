import { useEffect, useState } from "react";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProjects, getAssetUrl } from "@/services/api";
import { motion } from "framer-motion";

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

import TiltCard from "./TiltCard";

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-slate opacity-[0.1]" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-sky-50/50 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      
      {/* HUD System Markers */}
      <div className="absolute top-10 left-10 text-[8px] font-mono text-slate-300 pointer-events-none select-none uppercase tracking-[0.3em] font-bold">
        SYSTEM_ID: 0x9482 <br/>
        STATUS: SECTOR_SYNC_COMPLETE
      </div>
      <div className="absolute bottom-10 right-10 text-[8px] font-mono text-slate-300 pointer-events-none select-none uppercase tracking-[0.3em] font-bold text-right">
        MEMORY: 48.2 GB <br/>
        TEMP: 32.4°C
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
             <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tighter">Case Studies</h2>
             <p className="text-slate-600 max-w-xl font-medium">
               High-performance engineering deployments and ML modeling benchmarks.
             </p>
          </div>
          <Button 
            variant="ghost" 
            className="text-sky-600 hover:bg-sky-50 font-bold gap-2"
            onClick={() => window.open('https://github.com/rohitbirdawade007', '_blank')}
          >
            Full Archive <ArrowRight size={18} />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, idx) => (
            <TiltCard key={project._id}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group h-full bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Container */}
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={getAssetUrl(project.image)} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="badge-tech font-bold uppercase tracking-widest text-[9px]">
                      {project.category || "ENGINEERING"}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {(project.tags || []).map((tag) => (
                      <span 
                        key={tag} 
                        className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-100 uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-6 border-t border-slate-100 mt-auto">
                    <Button 
                      variant="link" 
                      className="p-0 text-slate-400 hover:text-slate-900 gap-2 h-auto text-[10px] font-bold uppercase tracking-widest"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github size={14} /> Repository
                    </Button>
                    <Button 
                      variant="link" 
                      className="ml-auto p-0 text-sky-500 hover:text-sky-700 gap-2 h-auto text-[10px] font-bold uppercase tracking-widest"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      Analysis <ExternalLink size={14} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
