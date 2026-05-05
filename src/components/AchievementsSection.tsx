import { useEffect, useState } from "react";
import { Trophy, Medal, Star, Sparkles, ChevronRight, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAchievements } from "@/services/api";
import { motion } from "framer-motion";

interface Achievement {
  _id: string;
  title: string;
  organization: string;
  date: string;
  type: string;
  category: "achievements" | "cocurricular" | "extracurricular" | "default";
}

const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  achievements:    { bg: "bg-[#6C63FF]/5", border: "border-[#6C63FF]/15", text: "text-[#6C63FF]", icon: "#6C63FF" },
  cocurricular:    { bg: "bg-emerald-50",  border: "border-emerald-200/50", text: "text-emerald-600", icon: "#059669" },
  extracurricular: { bg: "bg-amber-50",    border: "border-amber-200/50",  text: "text-amber-600",  icon: "#D97706" },
  default:         { bg: "bg-[#F5F5F5]",   border: "border-[#EBEBEB]",     text: "text-[#737373]",  icon: "#737373" },
};

const AchievementsSection = () => {
  const navigate = useNavigate();
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    getAchievements()
      .then(data => setAchievements(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  if (achievements.length === 0) return null;

  const grouped = [
    { title: "Achievements & Awards", key: "achievements", items: achievements.filter(a => a.category === "achievements") },
    { title: "Academic & Research", key: "cocurricular", items: achievements.filter(a => a.category === "cocurricular") },
    { title: "Community & Leadership", key: "extracurricular", items: achievements.filter(a => a.category === "extracurricular") },
  ].filter(g => g.items.length > 0);

  return (
    <section id="achievements" className="py-28 relative overflow-hidden" style={{ background: "var(--canvas)" }}>
      {/* Decorative */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.12] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-violet-50/40 rounded-full blur-[130px] -translate-x-1/2 pointer-events-none" />

      <div className="container relative z-10">
        {/* Label */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label reveal">
          <span className="eyebrow"><span className="eyebrow-dot" />Excellence</span>
        </motion.div>

        {/* Headline */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="mb-16">
          <h2 className="display-md font-black tracking-[-0.04em] leading-[1.05] reveal">
            Merits &{" "}
            <span style={{ background: "linear-gradient(135deg,#6C63FF,#D97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Recognition
            </span>
          </h2>
        </motion.div>

        {grouped.map(group => {
          const colors = CATEGORY_COLORS[group.key] || CATEGORY_COLORS.default;
          return (
            <div key={group.key} className="mb-16 last:mb-0">
              {/* Group heading */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-8 reveal"
              >
                <div className="w-2 h-6 rounded-full" style={{ background: colors.icon }} />
                <h3 className="text-[14px] font-bold text-[#404040]">{group.title}</h3>
                <span className="mono text-[9px] text-[#A3A3A3] font-semibold">{group.items.length} entries</span>
              </motion.div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.items.map((a, idx) => (
                  <motion.div
                    key={a._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.06 }}
                    onClick={() => navigate(`/achievements/${a._id}`)}
                    className="card shimmer-card p-6 cursor-pointer group hover-lift hover-glow reveal flex flex-col"
                  >
                    {/* Icon */}
                    <div className={`w-11 h-11 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                      <Trophy size={18} style={{ color: colors.icon }} />
                    </div>

                    {/* Title */}
                    <h4 className={`text-[14px] font-bold text-[#0A0A0A] mb-2 leading-snug group-hover:${colors.text} transition-colors`}>
                      {a.title}
                    </h4>

                    {/* Organization */}
                    <p className="mono text-[10px] font-semibold text-[#A3A3A3] uppercase tracking-widest mb-3">{a.organization}</p>

                    {/* Date pill */}
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${colors.bg} border ${colors.border} rounded-full w-fit mb-4`}>
                      <span className={`mono text-[9px] font-semibold ${colors.text} uppercase tracking-widest`}>{a.date}</span>
                    </div>

                    {/* CTA */}
                    <div className="mt-auto pt-4 border-t border-[#F0F0EE] flex items-center gap-1.5 text-[11px] font-semibold text-[#A3A3A3] group-hover:text-[#6C63FF] transition-colors">
                      View Details <ArrowRight size={11} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AchievementsSection;
