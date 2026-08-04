import { useEffect, useState } from "react";
import { getEducations } from "@/services/api";
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const EducationSection = () => {
  const [educations, setEducations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const data = await getEducations();
        setEducations(data);
      } catch (err) {
        console.error("Failed to load education data");
      } finally {
        setLoading(false);
      }
    };
    fetchTimeline();
  }, []);

  if (loading) {
    return (
      <section id="education" className="py-28" style={{ background: "#030712" }}>
        <div className="container text-center">
           <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
           <p className="mono text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Loading academic records...</p>
        </div>
      </section>
    );
  }

  if (educations.length === 0) return null;

  return (
    <section id="education" className="py-28 relative overflow-hidden" style={{ background: "#030712" }}>
      {/* Decorative background mesh */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.08] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="container relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="section-label"
        >
          <span className="eyebrow"><span className="eyebrow-dot" />Academic Foundation</span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.05 }}
          className="mb-14"
        >
          <h2 className="display-md font-black tracking-[-0.04em] leading-[1.05] text-white">
            Educational{" "}
            <span style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Architecture
            </span>
          </h2>
          <p className="text-slate-400 mt-3 text-[15px] max-w-lg">
            A structured roadmap of specialized learning and domain expertise.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl space-y-0 relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-6 bottom-6 w-[2px] rounded-full" style={{ background: "linear-gradient(180deg, rgba(99,102,241,0.6) 0%, rgba(139,92,246,0.3) 50%, transparent 100%)" }} />

          {educations.map((edu, index) => (
            <motion.div
              key={edu._id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className="flex gap-6 sm:gap-8 relative pb-10 last:pb-0 group"
            >
              {/* Timeline dot */}
              <div className="relative z-10 shrink-0 mt-6">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-indigo-500/30 flex items-center justify-center shadow-lg group-hover:border-indigo-500 transition-colors">
                  <GraduationCap size={16} className="text-indigo-400" />
                </div>
              </div>

              {/* Card */}
              <div className="flex-1 rounded-2xl border p-6 hover:-translate-y-1 transition-all duration-300 shimmer-card" style={{ background: "rgba(17,24,39,0.7)", borderColor: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}>
                {/* Top row: degree + duration */}
                <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Award size={12} className="text-indigo-400 shrink-0" />
                      <span className="mono text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{edu.institution}</span>
                    </div>
                    <h3 className="text-[15px] font-bold text-white group-hover:text-indigo-300 transition-colors">{edu.degree}</h3>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg shrink-0">
                    <Calendar size={11} className="text-indigo-400" />
                    <span className="mono text-[10px] font-semibold text-indigo-300">{edu.startDate} — {edu.endDate}</span>
                  </div>
                </div>

                {/* Description */}
                {edu.description && (
                  <p className="text-[13px] text-slate-300 leading-relaxed border-l-2 border-indigo-500/30 pl-4 mb-4">
                    {edu.description}
                  </p>
                )}

                {/* Grade + Location row */}
                <div className="flex items-center gap-4 flex-wrap">
                  {edu.grade && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                      <span className="mono text-[9px] font-semibold text-emerald-400 uppercase tracking-widest">Grade:</span>
                      <span className="text-[13px] font-bold text-emerald-300">{edu.grade}</span>
                    </div>
                  )}
                  {edu.location && (
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <MapPin size={11} />
                      <span className="mono text-[10px] font-semibold uppercase tracking-widest">{edu.location}</span>
                    </div>
                  )}
                </div>

                {/* Coursework tags */}
                {edu.coursework && edu.coursework.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-slate-800">
                    <BookOpen size={11} className="text-slate-400 mt-0.5 shrink-0" />
                    {edu.coursework.map((course: string, ci: number) => (
                      <span key={ci} className="tag text-[10px]">{course}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
