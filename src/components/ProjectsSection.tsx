import { useEffect, useState } from "react";
import { Github, ExternalLink, ArrowRight, Code } from "lucide-react";
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

  return (
    <section id="projects" className="py-32 bg-[#020617]">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
           <span className="subheading">Selected Work</span>
           <h2 className="heading-section">Engineering <span className="text-blue-500">Solutions</span></h2>
           <p className="text-[#94a3b8] max-w-2xl mt-4">
             A collection of production-level implementations focusing on machine learning efficiency and hardware integration.
           </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="project-card group rounded-3xl overflow-hidden flex flex-col"
            >
              {/* Image Container with Zoom */}
              <div className="aspect-[16/9] overflow-hidden relative border-b border-white/5">
                <img 
                  src={getAssetUrl(project.image)} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500" />
              </div>

              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                    {project.category || "AI Engineering"}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 transition-colors group-hover:text-blue-400">
                  {project.title}
                </h3>
                
                <p className="text-[#94a3b8] text-sm leading-relaxed mb-8 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                  {(project.tags || []).map((tag) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-white/5 text-[#94a3b8] text-[10px] font-semibold rounded-lg border border-white/5 uppercase tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <a 
                    href={project.githubUrl} 
                    target="_blank"
                    className="flex items-center gap-2 text-[#94a3b8] hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                  >
                    <Github size={18} /> Source
                  </a>
                  <a 
                    href={project.liveUrl} 
                    target="_blank"
                    className="ml-auto flex items-center gap-2 text-white hover:text-blue-500 transition-colors text-xs font-bold uppercase tracking-widest"
                  >
                    View Demo <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
