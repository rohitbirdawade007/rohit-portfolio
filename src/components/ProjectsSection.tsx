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
    <section id="projects" className="py-28 relative overflow-hidden" style={{ background: "var(--canvas)" }}>
      {/* Background Decor */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.15]" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-50/60 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-50/50 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label">
          <span className="eyebrow"><span className="eyebrow-dot" />Case Studies</span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
            <h2 className="display-md font-black tracking-[-0.04em] leading-[1.05]">
              Featured{" "}
              <span style={{ background: "linear-gradient(135deg,#1A56DB,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Projects
              </span>
            </h2>
            <p className="text-[#737373] mt-3 text-[15px] max-w-lg">
              High-performance engineering deployments and ML modeling benchmarks.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Link
              to="/projects"
              className="btn-secondary flex items-center gap-2 text-sm whitespace-nowrap"
            >
              View All Projects <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="card overflow-hidden">
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
                  className="card shimmer-card overflow-hidden group hover-lift hover-glow flex flex-col"
                >
                  {/* Featured badge for first project */}
                  {idx === 0 && (
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-[#1A56DB] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                      <Sparkles size={10} />
                      Featured
                    </div>
                  )}

                  {/* Image Container */}
                  <div className="aspect-video overflow-hidden bg-[#F5F5F5] relative">
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
                    <h3 className="text-[15px] font-bold text-[#0A0A0A] mb-2 group-hover:text-[#1A56DB] transition-colors leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-[#737373] text-[13px] leading-relaxed mb-4 line-clamp-3 flex-1">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {(project.tags || []).slice(0, 4).map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                      {(project.tags || []).length > 4 && (
                        <span className="tag text-[#A3A3A3]">+{project.tags.length - 4}</span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-3 pt-4 border-t border-[#F0F0EE]">
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-1.5 text-[11px] font-semibold text-[#737373] hover:text-[#0A0A0A] transition-colors"
                        >
                          <Github size={13} /> Code
                        </motion.a>
                      )}
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          whileHover={{ scale: 1.05 }}
                          className="ml-auto flex items-center gap-1.5 text-[11px] font-semibold text-[#1A56DB] hover:text-[#1648C0] transition-colors"
                        >
                          Live Demo <ExternalLink size={11} />
                        </motion.a>
                      )}
                      <Link
                        to={`/projects/${project._id}`}
                        className="ml-auto text-[11px] font-semibold text-[#A3A3A3] hover:text-[#0A0A0A] flex items-center gap-1 transition-colors"
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
