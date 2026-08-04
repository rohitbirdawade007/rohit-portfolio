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
    <section id="experience" className="py-28 relative overflow-hidden" style={{ background: "#0A0F1E" }}>
      {/* Ambient */}
      <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)" }} />
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(rgba(99,102,241,0.8) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="container relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label">
          <span className="eyebrow"><span className="eyebrow-dot" />System Log</span>
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
            <h2 className="display-md font-black tracking-[-0.04em] leading-[1.05] text-white">
              Professional{" "}
              <span style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Timeline
              </span>
            </h2>
            <p className="mt-2 text-[15px]" style={{ color: "#6B7280" }}>Career milestones and technical contributions.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Link to="/experience" className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl border transition-all"
              style={{ background: "rgba(99,102,241,0.08)", borderColor: "rgba(99,102,241,0.2)", color: "#A5B4FC" }}>
              Full History <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl space-y-0 relative">
          <div className="absolute left-[19px] top-6 bottom-6 w-[2px] rounded-full"
            style={{ background: "linear-gradient(180deg, rgba(99,102,241,0.6) 0%, rgba(139,92,246,0.3) 50%, transparent 100%)" }} />

          {loading
            ? Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex gap-8 pl-12 py-6">
                  <div key={i} className="flex-1 rounded-2xl border p-5 animate-pulse" style={{ background: "rgba(17,24,39,0.6)", borderColor: "rgba(255,255,255,0.05)" }}>
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
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all duration-300"
                      style={{ background: "rgba(99,102,241,0.15)", borderColor: "rgba(99,102,241,0.4)" }}>
                      <Briefcase size={14} style={{ color: "#A5B4FC" }} />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 shimmer-card"
                    style={{ background: "rgba(17,24,39,0.7)", borderColor: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}>

                    <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Building2 size={12} style={{ color: "#6366F1" }} className="shrink-0" />
                          <span className="mono text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#6B7280" }}>{e.company}</span>
                        </div>
                        <h3 className="text-[15px] font-bold text-white">{e.role}</h3>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg shrink-0"
                        style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
                        <Calendar size={11} style={{ color: "#A5B4FC" }} />
                        <span className="mono text-[10px] font-semibold" style={{ color: "#A5B4FC" }}>{e.duration}</span>
                      </div>
                    </div>

                    <p className="text-[13px] leading-relaxed border-l-2 pl-4 mb-5" style={{ color: "#9CA3AF", borderColor: "rgba(99,102,241,0.3)" }}>
                      {e.description}
                    </p>

                    {e.techStack?.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <Tag size={10} style={{ color: "#6B7280" }} className="shrink-0" />
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
