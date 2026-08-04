import { useEffect, useState } from "react";
import { Github, ExternalLink, ArrowRight, Sparkles } from "lucide-react";
import { getProjects, getAssetUrl } from "@/services/api";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

const TAG_PILL_COLORS: string[] = [
  "tag-blue",
  "tag-green",
  "tag-violet",
];

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
    <section id="projects" className="py-24 relative overflow-hidden bg-[#090A0F]">
      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label">
          <span className="eyebrow"><span className="eyebrow-dot" />Case Studies</span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
            <h2 className="display-md font-black text-white">
              Featured <span className="text-indigo-400">Projects</span>
            </h2>
            <p className="text-slate-400 mt-2 text-[15px] max-w-lg">
              Production-grade AI systems, ML pipelines, and full-stack applications.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Link to="/projects" className="btn-secondary flex items-center gap-2 text-sm">
              View All Projects <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="card overflow-hidden animate-pulse h-96">
                  <div className="bg-slate-800 aspect-video w-full" />
                </div>
              ))
            : projects.slice(0, 6).map((project, idx) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="card overflow-hidden group flex flex-col hover:-translate-y-1.5 transition-all"
                >
                  {/* Top Accent Line */}
                  <div className="h-[2px] w-full bg-indigo-500" />

                  {/* Featured Badge */}
                  {idx === 0 && (
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg">
                      <Sparkles size={10} />
                      Featured
                    </div>
                  )}

                  {/* Image */}
                  <div className="aspect-video overflow-hidden bg-slate-900 relative">
                    <img
                      src={getAssetUrl(project.image)}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                    <div className="absolute bottom-3 right-3">
                      <span className="tag-blue text-[10px]">
                        {project.category || "Engineering"}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-[16px] font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-slate-400 text-[13px] leading-relaxed mb-4 line-clamp-3 flex-1">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {(project.tags || []).slice(0, 4).map((tag, tagIdx) => (
                        <span key={tag} className={TAG_PILL_COLORS[tagIdx % TAG_PILL_COLORS.length]}>
                          {tag}
                        </span>
                      ))}
                      {(project.tags || []).length > 4 && (
                        <span className="tag text-[10px]">+{project.tags.length - 4}</span>
                      )}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/08">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/05 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all"
                        >
                          <Github size={12} /> GitHub ↗
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all"
                        >
                          <ExternalLink size={12} /> Live Demo ↗
                        </a>
                      )}
                      <Link
                        to={`/projects/${project._id}`}
                        className="ml-auto text-xs font-semibold text-slate-400 hover:text-indigo-400 flex items-center gap-1 transition-colors"
                      >
                        Details <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
          }
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
