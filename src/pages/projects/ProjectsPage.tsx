import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '@/services/api';
import { Github, ExternalLink, Code2, ChevronRight, ArrowLeft } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";

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
    <div className="min-h-screen bg-gray-950 text-white font-jakarta">
      <SEO title="Project Archive | Rohit Birdawade" />
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 max-w-7xl">
        <div className="mb-20 animate-fadeUp">
          <Link 
            to="/" 
            className="group inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-all duration-300 mb-8"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <ArrowLeft size={16} />
            </div>
            Back to Command Center
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 italic">PROJECT <span className="text-gradient">ARCHIVE</span></h1>
              <p className="text-gray-400 text-lg max-w-2xl font-medium">A comprehensive collection of engineering systems, machine learning models, and full-stack deployments.</p>
            </div>
            <div className="h-14 px-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center gap-3 text-sm font-bold">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               {projects.length} SYSTEMS DEPLOYED
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white/5 rounded-[2rem] h-[450px] border border-white/10" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-32 glass rounded-[3rem] border-white/10">
            <Code2 size={64} className="mx-auto mb-6 text-primary animate-float" />
            <h3 className="text-2xl font-bold mb-2">Systems Offline</h3>
            <p className="text-gray-400">Database is currently empty. Check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div
                key={project._id}
                className="group relative bg-[#0a0a0b] border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-primary/50 transition-all duration-500 flex flex-col animate-fadeUp self-start"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                      <Code2 size={48} className="text-white/10" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] to-transparent opacity-80" />
                  
                  <div className="absolute top-6 left-6 flex gap-2">
                    {project.category && (
                      <Badge className="bg-white/10 backdrop-blur-md border-white/10 text-white font-black px-3 py-1 scale-90">
                        {project.category}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 pt-0 -mt-12 relative z-10 flex flex-col flex-1">
                  <h2 className="text-2xl font-black mb-3 tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                    {project.title}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
                    {project.description}
                  </p>
                  
                  {project.techStack?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.techStack.slice(0, 4).map((t, i) => (
                        <span key={i} className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 rounded-lg border border-white/5 text-gray-300">
                          {t}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="text-[10px] font-black text-gray-500">+{project.techStack.length - 4} MORE</span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                    <Link
                      to={`/projects/${project._id}`}
                      className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white hover:text-primary transition-all group/link"
                    >
                      Explore Case Study
                      <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                    
                    <div className="flex items-center gap-4">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-primary/20 rounded-xl text-gray-400 hover:text-white transition-all transform hover:scale-110">
                          <Github size={18} />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-primary/20 rounded-xl text-gray-400 hover:text-white transition-all transform hover:scale-110">
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
