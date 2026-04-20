import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, getAssetUrl } from '@/services/api';
import { Github, ExternalLink, Code2, ChevronRight, ArrowLeft } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  githubUrl: string;
  demoUrl: string;
  category: string;
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <SEO title="Project Archive | Rohit Birdawade" />
      <Navbar />

      <main className="flex-grow pt-32 pb-20">
        <div className="container max-w-7xl">
          <div className="mb-20 animate-fadeUp">
            <Link 
              to="/" 
              className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-sky-500 transition-all mb-12"
            >
              <ArrowLeft size={16} /> Back to Portfolio
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                   Project <span className="text-sky-500">Archive</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
                   A comprehensive collection of intelligent systems, deep learning models, and complex software architectures engineered for reliability and performance.
                </p>
              </div>
              <div className="h-20 px-8 bg-sky-50 border border-sky-100 rounded-3xl flex flex-col justify-center gap-1 min-w-[200px]">
                 <span className="text-[10px] font-bold text-sky-600 uppercase tracking-[0.2em]">Active Systems</span>
                 <span className="text-3xl font-black text-slate-900">{projects.length} Total</span>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-slate-50 rounded-[2.5rem] h-[450px] border border-slate-100" />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-40 bg-slate-50 rounded-[3rem] border border-slate-100">
              <Code2 size={64} className="mx-auto mb-6 text-slate-200" />
              <h3 className="text-2xl font-bold mb-2">Workspace Empty</h3>
              <p className="text-slate-500">Project database is currently being initialized.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {projects.map((project, idx) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col shadow-sm"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={getAssetUrl(project.image)} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute top-6 left-6">
                      <div className="badge-tech bg-white/90 backdrop-blur-sm border-none shadow-lg">
                        {project.category || "ENGINEERING"}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-1">
                    <h2 className="text-xl font-bold mb-3 tracking-snug hover:text-sky-500 transition-colors line-clamp-2">
                      {project.title}
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
                      {project.description}
                    </p>
                    
                    {project.techStack?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.techStack.slice(0, 3).map((t, i) => (
                          <span key={i} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-slate-50 rounded-lg border border-slate-100 text-slate-500">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                      <Link
                        to={`/projects/${project._id}`}
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sky-500 hover:text-sky-700 transition-all"
                      >
                        Explore Details
                        <ChevronRight size={16} />
                      </Link>
                      
                      <div className="flex items-center gap-3">
                        {project.githubUrl && (
                          <Button variant="ghost" size="sm" className="w-9 h-9 p-0 text-slate-400 hover:text-sky-500" onClick={() => window.open(project.githubUrl, '_blank')}>
                            <Github size={18} />
                          </Button>
                        )}
                        {project.demoUrl && (
                          <Button variant="ghost" size="sm" className="w-9 h-9 p-0 text-slate-400 hover:text-sky-500" onClick={() => window.open(project.demoUrl, '_blank')}>
                            <ExternalLink size={18} />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
