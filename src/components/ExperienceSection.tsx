import { useEffect, useState } from "react";
import { getExperiences } from "@/services/api";
import { motion } from "framer-motion";
import { Building2, Calendar, Tag, Briefcase, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Exp { _id: string; role: string; company: string; duration: string; description: string; techStack: string[]; }

const ExperienceSection = () => {
  const [exp, setExp] = useState<Exp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExperiences()
      .then(d => setExp(Array.isArray(d) ? d : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="experience" className="py-28 relative overflow-hidden" style={{ background: "#F8FAFC" }}>
      {/* Background Decor */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.4] pointer-events-none" />

      <div className="container relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label">
          <span className="eyebrow"><span className="eyebrow-dot" />System Log</span>
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
            <h2 className="display-md font-black tracking-[-0.04em] leading-[1.05] text-slate-900">
              Professional{" "}
              <span style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Timeline
              </span>
            </h2>
            <p className="mt-2 text-[15px] text-slate-500">Career milestones and technical contributions.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Link to="/experience" className="btn-secondary flex items-center gap-2 text-sm font-semibold">
              Full History <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl space-y-0 relative">
          <div className="absolute left-[19px] top-6 bottom-6 w-[2px] rounded-full"
            style={{ background: "linear-gradient(180deg, #818CF8 0%, #C084FC 50%, transparent 100%)" }} />

          {loading
            ? Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex gap-8 pl-12 py-6">
                  <div className="flex-1 card p-5 animate-pulse">
                    <div className="skeleton h-4 w-1/3 mb-3" /><div className="skeleton h-6 w-2/3 mb-3" /><div className="skeleton h-3 w-full" />
                  </div>
                </div>
              ))
            : exp.map((e, i) => (
                <motion.div key={e._id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-6 sm:gap-8 relative pb-8 last:pb-0 group">

                  {/* Dot */}
                  <div className="relative z-10 shrink-0 mt-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center border bg-white border-indigo-200 shadow-sm transition-all duration-300 group-hover:border-indigo-500">
                      <Briefcase size={14} className="text-indigo-600" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 card p-6 hover:-translate-y-1 transition-all duration-300 shimmer-card">

                    <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Building2 size={12} className="text-indigo-600 shrink-0" />
                          <span className="mono text-[10px] font-semibold uppercase tracking-widest text-slate-500">{e.company}</span>
                        </div>
                        <h3 className="text-[15px] font-bold text-slate-900">{e.role}</h3>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg shrink-0 bg-indigo-50 border border-indigo-100">
                        <Calendar size={11} className="text-indigo-600" />
                        <span className="mono text-[10px] font-semibold text-indigo-700">{e.duration}</span>
                      </div>
                    </div>

                    <p className="text-[13px] leading-relaxed border-l-2 pl-4 mb-5 text-slate-600 border-indigo-300">
                      {e.description}
                    </p>

                    {e.techStack?.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <Tag size={10} className="text-slate-400 shrink-0" />
                        {e.techStack.map(t => <span key={t} className="tag">{t}</span>)}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
          }
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
