import { useEffect, useState } from "react";
import { Github, ExternalLink, ArrowRight, Layers } from "lucide-react";
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

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="projects" className="py-32 relative bg-[#020617] overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-20 section-title-accent"
        >
           <span className="subheading-premium">Portfolio</span>
           <h2 className="heading-premium text-white">Featured <span className="gradient-text">Projects</span></h2>
           <p className="text-gray-400 max-w-2xl mt-6 text-sm font-medium">
             A collection of engineering solutions leveraging AI, IoT, and modern web architectures. These projects demonstrate my expertise in building scalable and intelligent systems.
           </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto"
        >
          {projects.map((project) => (
            <motion.div 
              key={project._id} 
              variants={itemVariants}
              className="glass-card group rounded-[3rem] overflow-hidden border-white/5 project-card-hover h-full flex flex-col"
            >
              <div className="aspect-[16/9] overflow-hidden relative">
                <img 
                  src={getAssetUrl(project.image)} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-50 group-hover:brightness-90"
                />
                
                {/* Overlay Revealed on Hover */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                   <div className="flex gap-4 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                     <button 
                        onClick={() => window.open(project.githubUrl, '_blank')}
                        className="w-12 h-12 rounded-full glass border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all shadow-xl"
                      >
                        <Github size={20} />
                      </button>
                      <button 
                        onClick={() => window.open(project.liveUrl, '_blank')}
                        className="w-12 h-12 rounded-full glass border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all shadow-xl"
                      >
                        <ExternalLink size={20} />
                      </button>
                   </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                
                <div className="absolute top-6 left-6 glass px-5 py-2 rounded-full border-white/10">
                  <p className="text-[9px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                    <Layers size={14} /> {project.category || "AI Systems"}
                  </p>
                </div>
              </div>

              <div className="p-10 flex-grow flex flex-col">
                <h3 className="text-3xl font-[800] text-white uppercase tracking-tighter mb-4 group-hover:text-primary transition-colors leading-none italic">
                  {project.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {(project.tags || []).map((tag) => (
                    <span 
                      key={tag} 
                      className="px-4 py-1.5 glass text-slate-300 text-[10px] font-black rounded-lg border border-white/10 uppercase tracking-widest group-hover:border-primary/40 transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-auto line-clamp-3 font-medium">
                  {project.description}
                </p>

                <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Project Overview</span>
                   <motion.div 
                     whileHover={{ x: 5 }}
                     className="text-primary cursor-pointer"
                   >
                      <ArrowRight size={20} />
                   </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
