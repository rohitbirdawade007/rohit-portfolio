import { useEffect, useState } from "react";
import { API_URL } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain, Cpu, Database, Globe, Shield, Wifi, BarChart3,
  Code2, Cloud, ChevronDown, ChevronUp, Zap
} from "lucide-react";

interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency: number;
}

const CATEGORY_META: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  "Programming Languages":  { icon: Code2,    color: "#4F46E5", bg: "#EEF2FF" },
  "AI / ML":                { icon: Brain,    color: "#DB2777", bg: "#FDF2F8" },
  "Generative AI & LLMs":   { icon: Zap,      color: "#059669", bg: "#ECFDF5" },
  "ML Frameworks":          { icon: Cpu,      color: "#7C3AED", bg: "#F5F3FF" },
  "Backend":                { icon: Database, color: "#0284C7", bg: "#F0F9FF" },
  "Frontend":               { icon: Globe,    color: "#D97706", bg: "#FFFBEB" },
  "Databases":              { icon: Database, color: "#059669", bg: "#ECFDF5" },
  "DevOps & Cloud":         { icon: Cloud,    color: "#7C3AED", bg: "#F5F3FF" },
  "IoT & Embedded":         { icon: Wifi,     color: "#4F46E5", bg: "#EEF2FF" },
  "Data Science":           { icon: BarChart3, color: "#DB2777", bg: "#FDF2F8" },
  "Security":               { icon: Shield,   color: "#DC2626", bg: "#FEF2F2" },
};

const CATEGORY_ORDER = [
  "Programming Languages", "AI / ML", "Generative AI & LLMs", "ML Frameworks",
  "Backend", "Frontend", "Databases", "DevOps & Cloud", "IoT & Embedded", "Data Science", "Security"
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
});

const SkillBar = ({ skill, color, delay }: { skill: Skill; color: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.4 }}
    className="group"
  >
    <div className="flex items-center justify-between mb-1.5">
      <span className="text-[12px] font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
        {skill.name}
      </span>
      <span className="text-[11px] font-bold mono tabular-nums" style={{ color }}>
        {skill.proficiency}%
      </span>
    </div>
    <div className="skill-track">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.proficiency}%` }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.1, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
      />
    </div>
  </motion.div>
);

const CategoryCard = ({ category, skills }: { category: string; skills: Skill[] }) => {
  const meta = CATEGORY_META[category] || { icon: Code2, color: "#4F46E5", bg: "#EEF2FF" };
  const Icon = meta.icon;
  const [expanded, setExpanded] = useState(true);
  const sorted = [...skills].sort((a, b) => b.proficiency - a.proficiency);
  const avg = Math.round(skills.reduce((a, s) => a + s.proficiency, 0) / skills.length);

  return (
    <motion.div {...fadeUp()} className="card overflow-visible">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors rounded-t-2xl"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: meta.bg, color: meta.color }}
          >
            <Icon size={16} />
          </div>
          <div className="text-left">
            <p className="text-[13px] font-bold text-slate-900">{category}</p>
            <p className="text-[11px] text-slate-500">{skills.length} skill{skills.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Circular progress */}
          <div className="relative w-8 h-8">
            <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="11" fill="none" stroke="#F1F5F9" strokeWidth="3" />
              <circle
                cx="16" cy="16" r="11" fill="none"
                stroke={meta.color} strokeWidth="3"
                strokeDasharray={`${2 * Math.PI * 11}`}
                strokeDashoffset={`${2 * Math.PI * 11 * (1 - avg / 100)}`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black text-slate-700">
              {avg}
            </span>
          </div>
          {expanded
            ? <ChevronUp size={14} className="text-slate-400" />
            : <ChevronDown size={14} className="text-slate-400" />
          }
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-3.5 border-t border-slate-100 pt-4">
              {sorted.map((s, i) => (
                <SkillBar key={s._id} skill={s} color={meta.color} delay={i * 0.04} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SkillsSection = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    fetch(`${API_URL}/skills`)
      .then(r => r.json())
      .then(d => setSkills(Array.isArray(d) ? d : []))
      .catch(() => setSkills([]))
      .finally(() => setLoading(false));
  }, []);

  const grouped = skills.reduce((acc, s) => {
    const cat = s.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categories = CATEGORY_ORDER.filter(c => grouped[c]);
  const allTabs = ["All", ...categories];
  const displayed = activeTab === "All" ? categories : [activeTab];

  const aiCount = skills.filter(s =>
    ["AI / ML", "Generative AI & LLMs", "ML Frameworks"].includes(s.category)
  ).length;

  const avgProf = skills.length
    ? Math.round(skills.reduce((a, s) => a + s.proficiency, 0) / skills.length)
    : 0;

  return (
    <section id="skills" className="py-24 relative bg-[#F8FAFC]">
      <div className="container relative">

        {/* Section Header */}
        <motion.div {...fadeUp()} className="section-label">
          <span className="eyebrow"><span className="eyebrow-dot" />Tech Arsenal</span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div {...fadeUp(0.05)}>
            <h2 className="display-md text-slate-900 font-black">
              Skills &{" "}
              <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-slate-500 mt-2 text-[15px] max-w-lg">
              {skills.length}+ technologies across AI/ML, Full-Stack, IoT, Cloud, and Security.
            </p>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Skills",    value: skills.length, color: "#4F46E5" },
            { label: "Categories",      value: categories.length, color: "#7C3AED" },
            { label: "AI/ML Skills",    value: aiCount, color: "#059669" },
            { label: "Avg. Proficiency",value: `${avgProf}%`, color: "#D97706" },
          ].map((s, i) => (
            <div key={i} className="card p-4 text-center">
              <div className="text-2xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="mono text-[9px] font-bold uppercase tracking-widest text-slate-500">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Filter Tabs */}
        <motion.div {...fadeUp(0.12)} className="flex flex-wrap gap-2 mb-8">
          {allTabs.map(tab => {
            const meta = CATEGORY_META[tab];
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  active
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                    : "bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-700"
                }`}
              >
                {meta && (
                  <meta.icon
                    size={11}
                    style={{ color: active ? "white" : meta.color }}
                  />
                )}
                {tab}
              </button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card h-56 animate-pulse bg-slate-100" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
            >
              {displayed.map(cat => (
                <CategoryCard key={cat} category={cat} skills={grouped[cat] || []} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
