import { useEffect, useState } from "react";
import { Github, ExternalLink, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProjects, getAssetUrl } from "@/services/api";

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
    <section id="projects" className="py-32 relative bg-gray-50/50 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="mb-20 animate-fadeUp">
           <span className="subheading-premium">Portfolio</span>
           <h2 className="heading-premium text-gray-900">Featured <span className="text-primary">Projects</span></h2>
           <p className="text-gray-500 max-w-2xl mt-6 text-sm font-medium">
             A collection of engineering solutions leveraging AI, IoT, and modern web architectures.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project) => (
            <div 
              key={project._id} 
              className="card-premium group"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={getAssetUrl(project.image)} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter group-hover:text-primary transition-colors">{project.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {(project.tags || []).map((tag) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-[#f0f9ff] text-[#0ea5e9] text-[10px] font-bold rounded-full border border-[#e0f2fe] uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                  {project.description}
                </p>

                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-lg h-10 px-5 border-gray-200 text-gray-700 hover:bg-gray-50"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github size={16} className="mr-2" /> Code
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button 
                      size="sm" 
                      className="rounded-lg h-10 px-5 bg-primary hover:bg-primary/90 text-white"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <ExternalLink size={16} className="mr-2" /> View Project
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
