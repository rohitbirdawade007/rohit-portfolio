import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code2, ExternalLink, Github } from "lucide-react";
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
        console.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="section-padding bg-white dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fadeUp">
          <h2 className="section-heading !mb-4">Selected Case Studies</h2>
          <p className="text-lg text-muted-foreground">
            A deep dive into some of my most impactful work, from AI-driven platforms to complex full-stack architectures.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {loading && (
             Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-[500px] bg-muted/50 rounded-[2.5rem] animate-pulse" />
             ))
          )}
          {!loading && projects.length === 0 && <p className="text-center text-gray-400 italic col-span-full">No projects published yet.</p>}
          {!loading && projects.map((project, index) => (
            <div 
              key={project._id} 
              className="group relative flex flex-col h-full animate-fadeUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-[350px] md:h-[400px] overflow-hidden rounded-[2.5rem] bg-muted shadow-2xl transition-all duration-700 group-hover:shadow-primary/20">
                {project.image ? (
                  <img 
                    src={project.image.startsWith('http') || project.image.startsWith('/lovable-uploads') || project.image.startsWith('/profile') ? project.image : `http://localhost:5000${project.image}`} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-100 dark:bg-gray-900">
                    <Code2 size={64} className="opacity-20"/>
                  </div>
                )}
                
                {/* Overlay with subtle details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-8 flex flex-col justify-end">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white/80 text-sm font-medium mb-4 line-clamp-2">
                      {project.problemStatement || project.description}
                    </p>
                    <div className="flex gap-4">
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-black rounded-full hover:bg-primary hover:text-white transition-colors">
                          <ExternalLink size={20} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 text-white backdrop-blur-md rounded-full hover:bg-white hover:text-black transition-colors border border-white/20">
                          <Github size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 px-2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {project.category || "Development"}
                  </span>
                </div>
                
                <h3 className="text-3xl font-black mb-4 group-hover:text-primary transition-colors tracking-tight leading-tight">
                  {project.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack?.slice(0, 5).map((tech) => (
                    <span key={tech} className="text-xs font-semibold px-3 py-1 bg-muted rounded-lg text-muted-foreground border border-border">
                      {tech}
                    </span>
                  ))}
                </div>

                <Link 
                  to={`/projects/${project.slug || project._id}`} 
                  className="inline-flex items-center gap-2 font-bold text-lg text-foreground hover:text-primary transition-colors group/link"
                >
                  View Case Study 
                  <ArrowRight size={20} className="group-hover/link:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
