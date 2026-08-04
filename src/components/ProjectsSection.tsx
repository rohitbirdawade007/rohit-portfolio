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
  "tag-pill-accent",
  "tag-pill-green",
  "tag-pill-violet",
  "tag-pill-amber",
  "tag-pill-sky",
];

const TAG_COLORS: Record<string, string> = {
  "Machine Learning": "tag-blue",
  "AI": "tag-blue",
  "IoT": "tag-violet",
  "Web": "tag-sky",
  "Data": "tag-green",
  "Engineering": "tag-amber",
};

function getCategoryTag(cat: string) {
  const key = Object.keys(TAG_COLORS).find(k => cat?.toLowerCase().includes(k.toLowerCase()));
  return key ? TAG_COLORS[key] : "tag";
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
    <section id="projects" className="py-28 relative overflow-hidden" style={{ background: "#FAFAFC" }}>
      {/* Background Decor */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.4] pointer-events-none" />

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label">
          <span className="eyebrow"><span className="eyebrow-dot" />Case Studies</span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
            <h2 className="display-md font-black tracking-[-0.04em] leading-[1.05] text-slate-900">
              Featured{" "}
              <span style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Projects
              </span>
            </h2>
            <p className="text-slate-500 mt-3 text-[15px] max-w-lg">
              High-performance engineering deployments and ML modeling benchmarks.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Link
              to="/projects"
              className="btn-secondary flex items-center gap-2 text-sm font-semibold"
            >
              View All Projects <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="card overflow-hidden animate-pulse">
                  <div className="skeleton aspect-video w-full" />
                  <div className="p-6 space-y-3">
                    <div className="skeleton h-3 w-1/4" />
                    <div className="skeleton h-5 w-3/4" />
                    <div className="skeleton h-3 w-full" />
                    <div className="skeleton h-3 w-2/3" />
                  </div>
                </div>
              ))
            : projects.slice(0, 6).map((project, idx) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="card overflow-hidden group flex flex-col transition-all duration-300 hover:-translate-y-2 shimmer-card project-card"
                >
                  {/* Colored accent top border */}
                  <div className="h-[3px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-400" />

                  {/* Featured badge for first project */}
                  {idx === 0 && (
                    <div className="absolute top-5 left-4 z-10 flex items-center gap-1.5 bg-indigo-600 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-md">
                      <Sparkles size={10} />
                      Featured
                    </div>
                  )}

                  {/* Image Container */}
                  <div className="aspect-video overflow-hidden bg-slate-100 relative">
                    <img
                      src={getAssetUrl(project.image)}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                    {/* Category overlay chip */}
                    <div className="absolute bottom-3 right-3">
                      <span className={getCategoryTag(project.category || "Engineering")}>
                        {project.category || "Engineering"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    {/* Project name */}
                    <h3 className="text-[16px] font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors leading-tight">
                      {project.title}
                    </h3>

                    {/* One-sentence description */}
                    <p className="text-slate-600 text-[13px] leading-relaxed mb-4 line-clamp-3 flex-1">
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {(project.tags || []).slice(0, 4).map((tag, tagIdx) => (
                        <span key={tag} className={TAG_PILL_COLORS[tagIdx % TAG_PILL_COLORS.length]}>
                          {tag}
                        </span>
                      ))}
                      {(project.tags || []).length > 4 && (
                        <span className="tag-pill-accent opacity-60">+{project.tags.length - 4}</span>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          whileHover={{ scale: 1.05, y: -1 }}
                          className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white transition-all"
                        >
                          <Github size={12} /> GitHub ↗
                        </motion.a>
                      )}
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          whileHover={{ scale: 1.05, y: -1 }}
                          className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white transition-all"
                        >
                          <ExternalLink size={11} /> Live Demo ↗
                        </motion.a>
                      )}
                      <Link
                        to={`/projects/${project._id}`}
                        className="ml-auto text-[11px] font-semibold text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors"
                      >
                        Details <ArrowRight size={11} />
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
