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

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-20 section-title-accent"
        >
           <span className="subheading-premium">Portfolio</span>
           <h2 className="heading-premium text-white">Featured <span className="gradient-text-premium">Projects</span></h2>
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
              className="glass-card group rounded-[2.5rem] overflow-hidden border-white/5 hover:border-primary/50 transition-all duration-500"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={getAssetUrl(project.image)} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-75 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
                
                {/* Float Category Badge */}
                <div className="absolute top-6 left-6 glass px-4 py-1.5 rounded-full border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                    <Layers size={12} /> {project.category || "AI Engineering"}
                  </p>
                </div>
              </div>

              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {(project.tags || []).map((tag) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-white/5 text-gray-300 text-[10px] font-bold rounded-lg border border-white/5 uppercase tracking-wider group-hover:border-primary/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                  {project.description}
                </p>

                <div className="flex items-center gap-4">
                  {project.githubUrl && (
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-[10px] hover:text-primary transition-colors"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github size={18} /> Code
                    </motion.button>
                  )}
                  {project.liveUrl && (
                    <Button 
                      size="sm" 
                      className="ml-auto rounded-xl bg-white text-black hover:bg-primary hover:text-white font-bold transition-all px-6"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      View Live <ArrowRight size={16} className="ml-2" />
                    </Button>
                  )}
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
