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
  description?: string;
  proficiency: number;
  color?: string;
}

const CATEGORY_META: Record<string, { icon: React.ElementType; color: string; gradient: string }> = {
  "Programming Languages":  { icon: Code2,     color: "#4F46E5", gradient: "from-indigo-50 to-blue-50" },
  "AI / ML":                { icon: Brain,      color: "#DC2626", gradient: "from-red-50 to-rose-50" },
  "Generative AI & LLMs":   { icon: Zap,        color: "#059669", gradient: "from-emerald-50 to-teal-50" },
  "ML Frameworks":          { icon: Cpu,        color: "#2563EB", gradient: "from-blue-50 to-indigo-50" },
  "Backend":                { icon: Database,   color: "#059669", gradient: "from-emerald-50 to-green-50" },
  "Frontend":               { icon: Globe,      color: "#0284C7", gradient: "from-sky-50 to-cyan-50" },
  "Databases":              { icon: Database,   color: "#D97706", gradient: "from-amber-50 to-orange-50" },
  "DevOps & Cloud":         { icon: Cloud,      color: "#7C3AED", gradient: "from-purple-50 to-violet-50" },
  "IoT & Embedded":         { icon: Wifi,       color: "#16A34A", gradient: "from-green-50 to-emerald-50" },
  "Data Science":           { icon: BarChart3,  color: "#EA580C", gradient: "from-orange-50 to-amber-50" },
  "Security":               { icon: Shield,     color: "#DC2626", gradient: "from-red-50 to-rose-50" },
};

const CATEGORY_ORDER = [
  "Programming Languages", "AI / ML", "Generative AI & LLMs", "ML Frameworks",
  "Backend", "Frontend", "Databases", "DevOps & Cloud", "IoT & Embedded", "Data Science", "Security"
];

const SkillBar = ({ skill, color, delay }: { skill: Skill; color: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.4 }}
    className="group"
  >
    <div className="flex items-center justify-between mb-1.5">
      <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
        {skill.name}
      </span>
      <span className="text-xs font-bold tabular-nums" style={{ color }}>
        {skill.proficiency}%
      </span>
    </div>
    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.proficiency}%` }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}CC, ${color})` }}
      />
    </div>
  </motion.div>
);

const CategoryCard = ({ category, skills }: { category: string; skills: Skill[] }) => {
  const meta = CATEGORY_META[category] || { icon: Code2, color: "#4F46E5", gradient: "from-slate-50 to-slate-100" };
  const Icon = meta.icon;
  const [expanded, setExpanded] = useState(true);
  const topSkills = skills.sort((a, b) => b.proficiency - a.proficiency);
  const avgProficiency = Math.round(skills.reduce((a, s) => a + s.proficiency, 0) / skills.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="card bg-white border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 transition-all shadow-sm"
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 group hover:bg-slate-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${meta.gradient} border border-slate-200/60 flex items-center justify-center`}>
            <Icon size={16} style={{ color: meta.color }} />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{category}</p>
            <p className="text-[11px] text-slate-500">{skills.length} skill{skills.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Avg proficiency ring */}
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="12" fill="none" stroke="#E2E8F0" strokeWidth="3" />
                <circle
                  cx="16" cy="16" r="12" fill="none"
                  stroke={meta.color} strokeWidth="3"
                  strokeDasharray={`${2 * Math.PI * 12}`}
                  strokeDashoffset={`${2 * Math.PI * 12 * (1 - avgProficiency / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black" style={{ color: meta.color }}>
                {avgProficiency}
              </span>
            </div>
          </div>
          {expanded ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
        </div>
      </button>

      {/* Skill list */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-3 border-t border-slate-100 pt-4">
              {topSkills.map((skill, i) => (
                <SkillBar key={skill._id} skill={skill} color={meta.color} delay={i * 0.05} />
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
  const [activeTab, setActiveTab] = useState<string>('All');

  useEffect(() => {
    fetch(`${API_URL}/skills`)
      .then(r => r.json())
      .then(d => setSkills(Array.isArray(d) ? d : []))
      .catch(() => setSkills([]))
      .finally(() => setLoading(false));
  }, []);

  const grouped = skills.reduce((acc, skill) => {
    const cat = skill.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categories = CATEGORY_ORDER.filter(c => grouped[c]);
  const allTabs = ['All', ...categories];
  const displayedCategories = activeTab === 'All' ? categories : [activeTab];

  return (
    <section id="skills" className="py-28 relative bg-[#FAFAFC]">
      <div className="container relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="eyebrow"><span className="eyebrow-dot" />Tech Arsenal</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-4">
            Skills &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Proficiency
            </span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl">
            {skills.length}+ technologies across AI/ML, Generative AI, Full-Stack, IoT, and Cloud.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { label: 'Total Skills', value: skills.length, color: 'text-indigo-600' },
            { label: 'Categories', value: categories.length, color: 'text-purple-600' },
            { label: 'AI/ML Skills', value: skills.filter(s => ['AI / ML', 'Generative AI & LLMs', 'ML Frameworks'].includes(s.category)).length, color: 'text-emerald-600' },
            { label: 'Avg Proficiency', value: skills.length ? `${Math.round(skills.reduce((a, s) => a + s.proficiency, 0) / skills.length)}%` : '0%', color: 'text-amber-600' },
          ].map((stat, i) => (
            <div key={i} className="card p-5 text-center shadow-sm">
              <div className={`text-3xl font-black ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Category filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {allTabs.map(tab => {
            const meta = CATEGORY_META[tab];
            const isActive = activeTab === tab;
            return (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                  isActive
                    ? 'text-indigo-700 bg-indigo-50 border-indigo-200 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {meta && <meta.icon size={12} style={{ color: meta.color }} />}
                {tab}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse card h-64" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {displayedCategories.map(cat => (
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
