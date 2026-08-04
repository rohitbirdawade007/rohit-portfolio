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
    <section id="experience" className="py-24 relative overflow-hidden bg-[#090A0F]">
      <div className="container relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label">
          <span className="eyebrow"><span className="eyebrow-dot" />System Log</span>
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
            <h2 className="display-md font-black text-white">
              Professional <span className="text-indigo-400">Timeline</span>
            </h2>
            <p className="mt-2 text-[15px] text-slate-400">Career milestones and engineering contributions.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Link to="/experience" className="btn-secondary flex items-center gap-2 text-sm">
              Full History <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Timeline List */}
        <div className="max-w-3xl space-y-0 relative">
          <div className="absolute left-[19px] top-6 bottom-6 w-[2px] rounded-full bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent" />

          {loading
            ? Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex gap-8 pl-12 py-6">
                  <div className="flex-1 card p-5 animate-pulse">
                    <div className="h-4 w-1/3 bg-slate-800 rounded mb-3" />
                    <div className="h-6 w-2/3 bg-slate-800 rounded mb-3" />
                    <div className="h-3 w-full bg-slate-800 rounded" />
                  </div>
                </div>
              ))
            : exp.map((e, i) => (
                <motion.div key={e._id} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-6 sm:gap-8 relative pb-8 last:pb-0 group">

                  {/* Icon Node */}
                  <div className="relative z-10 shrink-0 mt-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-indigo-500/30 bg-[#12131C] text-indigo-400 group-hover:border-indigo-500 transition-colors">
                      <Briefcase size={15} />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex-1 card p-6 hover:-translate-y-1 transition-all">
                    <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <Building2 size={13} className="text-indigo-400 shrink-0" />
                          <span className="mono text-[10.5px] font-semibold text-slate-400 uppercase tracking-widest">{e.company}</span>
                        </div>
                        <h3 className="text-[16px] font-bold text-white">{e.role}</h3>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 shrink-0">
                        <Calendar size={12} />
                        <span className="mono text-[10.5px] font-semibold">{e.duration}</span>
                      </div>
                    </div>

                    <p className="text-[13.5px] leading-relaxed border-l-2 border-indigo-500/30 pl-4 mb-4 text-slate-300">
                      {e.description}
                    </p>

                    {e.techStack?.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <Tag size={11} className="text-slate-500 shrink-0" />
                        {e.techStack.map(t => <span key={t} className="tag-blue">{t}</span>)}
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
