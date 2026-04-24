import { useEffect, useState } from "react";
import { getProjects, getAssetUrl } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ChevronRight, Activity, Database, Cpu, BarChart2, Layers } from "lucide-react";

interface Project {
  _id: string; title: string; description: string; image: string;
  tags: string[]; githubUrl?: string; liveUrl?: string; category: string;
}

const catIcon = (cat: string) => {
  const c = (cat || "").toLowerCase();
  if (c.includes("iot") || c.includes("hardware")) return <Cpu size={14} className="text-[#1A56DB]" />;
  if (c.includes("data") || c.includes("analytics")) return <BarChart2 size={14} className="text-[#7C3AED]" />;
  if (c.includes("nlp") || c.includes("language")) return <Layers size={14} className="text-[#059669]" />;
  return <Activity size={14} className="text-[#1A56DB]" />;
};

const ProjectModules = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(d => setProjects(Array.isArray(d) ? d : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="py-28 relative" style={{ background: "var(--canvas)" }}>
      <div className="container">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="section-label"
        >
          <span className="eyebrow"><span className="eyebrow-dot" />Model Deployments</span>
        </motion.div>

        {/* Headline row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.05 }}
          className="flex items-end justify-between flex-wrap gap-4 mb-14"
        >
          <h2 className="text-[clamp(2.25rem,4vw,3.5rem)] font-black tracking-[-0.04em] leading-[1.05]">
            AI Systems &{" "}
            <span style={{ background: "linear-gradient(135deg,#1A56DB,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Projects
            </span>
          </h2>
          <a href="/projects" className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1A56DB] hover:text-[#1648C0] transition-colors">
            View all <ExternalLink size={13} />
          </a>
        </motion.div>

        {/* Projects list */}
        <div className="space-y-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="card p-5 skeleton" style={{ height: 80 }} />
              ))
            : projects.map((p, i) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className={`card overflow-hidden transition-all duration-300 ${expanded === p._id ? "border-[#BFDBFE]" : ""}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setExpanded(expanded === p._id ? null : p._id)}
                >
                  {/* Top accent line on expand */}
                  {expanded === p._id && (
                    <div className="h-[2px] bg-gradient-to-r from-[#1A56DB] to-[#7C3AED] absolute top-0 left-0 right-0" />
                  )}

                  {/* Header */}
                  <div className="flex items-center justify-between gap-4 p-5">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-all ${expanded === p._id ? "bg-[#EFF6FF] border-[#BFDBFE]" : "bg-[#F5F5F5] border-[#EBEBEB]"}`}>
                        {catIcon(p.category)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-[14px] font-bold text-[#0A0A0A] truncate">{p.title}</h3>
                          <span className="tag-blue">{p.category || "AI"}</span>
                        </div>
                        <div className="flex gap-1.5 mt-1.5 flex-wrap">
                          {(p.tags || []).slice(0, 5).map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="hidden sm:flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-semibold text-emerald-600 mono uppercase tracking-wider">Live</span>
                      </div>
                      <motion.div
                        animate={{ rotate: expanded === p._id ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-7 h-7 rounded-lg bg-[#F5F5F5] border border-[#EBEBEB] flex items-center justify-center text-[#A3A3A3]"
                      >
                        <ChevronRight size={14} />
                      </motion.div>
                    </div>
                  </div>

                  {/* Expanded */}
                  <AnimatePresence>
                    {expanded === p._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                        onClick={e => e.stopPropagation()}
                      >
                        <div className="px-5 pb-6 pt-1 border-t border-[#F0F0EE]">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-5">
                            {/* Left: description + metrics */}
                            <div className="lg:col-span-2 space-y-6">
                              <div>
                                <p className="mono text-[10px] font-semibold text-[#A3A3A3] uppercase tracking-widest mb-2">Overview</p>
                                <p className="text-[14px] text-[#525252] leading-relaxed">{p.description || `High-performance ${p.category} system with real-time edge processing.`}</p>
                              </div>

                              {/* Metrics */}
                              <div className="grid grid-cols-3 gap-3">
                                {[
                                  { label: "Accuracy",  value: "96.4%" },
                                  { label: "Dataset",   value: "15K+" },
                                  { label: "Model",     value: "ResNet-50" },
                                ].map((m, j) => (
                                  <div key={j} className="p-4 rounded-xl border border-[#F0F0EE] bg-[#FAFAF9] text-center">
                                    <p className="text-xl font-black text-[#1A56DB] tracking-tight">{m.value}</p>
                                    <p className="mono text-[9px] text-[#A3A3A3] uppercase tracking-widest mt-1 font-semibold">{m.label}</p>
                                  </div>
                                ))}
                              </div>

                              {/* Links */}
                              <div className="flex gap-3">
                                {p.githubUrl && (
                                  <a href={p.githubUrl} target="_blank" rel="noreferrer" className="btn-secondary flex items-center gap-1.5 text-xs py-2 px-4">
                                    <Github size={13} /> Source
                                  </a>
                                )}
                                {p.liveUrl && (
                                  <a href={p.liveUrl} target="_blank" rel="noreferrer" className="btn-blue flex items-center gap-1.5 text-xs py-2 px-4">
                                    <ExternalLink size={13} /> Live Demo
                                  </a>
                                )}
                              </div>
                            </div>

                            {/* Right: image + result */}
                            <div className="space-y-3">
                              <div className="aspect-video rounded-xl border border-[#EBEBEB] overflow-hidden bg-[#F5F5F5] flex items-center justify-center">
                                {p.image
                                  ? <img src={getAssetUrl(p.image)} alt={p.title} className="w-full h-full object-cover" />
                                  : <Database size={28} className="text-[#D4D4D4]" />
                                }
                              </div>
                              <div className="p-4 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0]">
                                <p className="mono text-[9px] font-semibold text-emerald-600 uppercase tracking-widest mb-1">Validated Result</p>
                                <p className="text-xl font-black text-[#0A0A0A] tracking-tight">96.4% <span className="text-xs font-medium text-[#737373]">accuracy</span></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
          }
        </div>
      </div>
    </section>
  );
};

export default ProjectModules;
