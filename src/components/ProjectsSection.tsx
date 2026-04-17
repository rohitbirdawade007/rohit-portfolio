import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Github, Code2 } from "lucide-react";
import { API_URL } from "@/services/api";

interface Project {
  _id: string;
  title: string;
  problemStatement: string;
  description: string;
  techStack: string[];
  image: string;
  githubUrl: string;
  demoUrl: string;
  slug?: string;
  category?: string;
}

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/projects`);
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } catch (e) {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden bg-[#0a0a0a] text-white">
      {/* Aurora Element */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[150px] -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-24 animate-fadeUp">
          <span className="subheading-premium text-primary/80">Case Studies</span>
          <h2 className="heading-premium text-white">Digital <span className="text-primary italic">Craft</span> & Architecture</h2>
          <p className="text-xl text-white/50 mt-6 leading-relaxed max-w-2xl">
            A journey through selected projects that showcase my ability to solve complex problems with elegant, high-performance code.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 max-w-7xl mx-auto">
          {loading && (
             Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-[600px] bg-white/5 rounded-[4rem] animate-pulse" />
             ))
          )}
          {!loading && projects.length === 0 && <p className="text-center text-white/30 italic col-span-full">No archives found yet...</p>}
          {!loading && projects.map((project, index) => (
            <div 
              key={project._id} 
              className="group relative flex flex-col h-full animate-fadeUp"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative h-[400px] md:h-[550px] overflow-hidden rounded-[3rem] md:rounded-[4rem] bg-white/5 border border-white/10 shadow-3xl transition-all duration-700 group-hover:border-primary/50 group-hover:-translate-y-4">
                {project.image ? (
                  <img 
                    src={project.image.startsWith('http') ? project.image : `https://rohit-portfolio-qgd8.onrender.com${project.image}`} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/5">
                    <Code2 size={64} className="text-white/10"/>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Floating Tags */}
                <div className="absolute top-8 left-8 flex gap-2">
                   <div className="glass px-4 py-2 rounded-full border-white/20 text-[10px] font-black uppercase tracking-widest text-white/80">
                      {project.category || "AI Platform"}
                   </div>
                </div>

                <div className="absolute bottom-10 left-10 right-10">
                  <div className="flex flex-wrap gap-2 mb-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {project.techStack?.slice(0, 4).map((tech) => (
                      <span key={tech} className="text-[10px] font-bold px-3 py-1.5 glass rounded-lg border-white/10 text-white/70">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-tight text-white group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <div className="flex gap-4">
                     <Link 
                        to={`/projects/${project.slug || project._id}`}
                        className="w-14 h-14 flex items-center justify-center bg-white text-black rounded-2xl hover:bg-primary hover:text-white transition-all transform hover:rotate-12 active:scale-95"
                     >
                        <ArrowRight size={24} />
                     </Link>
                     {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noreferrer" className="w-14 h-14 flex items-center justify-center glass border-white/20 text-white rounded-2xl hover:bg-white/10 transition-all">
                           <ExternalLink size={20} />
                        </a>
                     )}
                     {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="w-14 h-14 flex items-center justify-center glass border-white/20 text-white rounded-2xl hover:bg-white/10 transition-all">
                           <Github size={20} />
                        </a>
                     )}
                  </div>
                </div>
              </div>

              <div className="mt-8 px-4 opacity-70 group-hover:opacity-100 transition-opacity">
                 <p className="text-white/50 text-sm font-medium leading-relaxed line-clamp-2">
                    {project.problemStatement || project.description}
                 </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-32">
           <Link to="/projects" className="group inline-flex flex-col items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 group-hover:text-primary transition-colors">Archive Access</span>
              <div className="w-16 h-16 rounded-[2rem] border-2 border-white/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-500 transform group-hover:rotate-[360deg]">
                 <ArrowRight className="text-white transform group-hover:-rotate-45" size={24} />
              </div>
           </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
