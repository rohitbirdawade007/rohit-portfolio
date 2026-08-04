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

const CATEGORY_META: Record<string, { icon: React.ElementType; color: string }> = {
  "Programming Languages":  { icon: Code2,     color: "#6366F1" },
  "AI / ML":                { icon: Brain,      color: "#EC4899" },
  "Generative AI & LLMs":   { icon: Zap,        color: "#10B981" },
  "ML Frameworks":          { icon: Cpu,        color: "#8B5CF6" },
  "Backend":                { icon: Database,   color: "#38BDF8" },
  "Frontend":               { icon: Globe,      color: "#F59E0B" },
  "Databases":              { icon: Database,   color: "#10B981" },
  "DevOps & Cloud":         { icon: Cloud,      color: "#8B5CF6" },
  "IoT & Embedded":         { icon: Wifi,       color: "#6366F1" },
  "Data Science":           { icon: BarChart3,  color: "#EC4899" },
  "Security":               { icon: Shield,     color: "#EF4444" },
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
      <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
        {skill.name}
      </span>
      <span className="text-xs font-bold tabular-nums" style={{ color }}>
        {skill.proficiency}%
      </span>
    </div>
    <div className="h-1.5 bg-white/08 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.proficiency}%` }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}CC, ${color})` }}
      />
    </div>
  </motion.div>
);

const CategoryCard = ({ category, skills }: { category: string; skills: Skill[] }) => {
  const meta = CATEGORY_META[category] || { icon: Code2, color: "#6366F1" };
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
      className="card bg-[#12131C] border-white/08 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all shadow-xl"
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 group hover:bg-white/02 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/05 border border-white/10 flex items-center justify-center">
            <Icon size={16} style={{ color: meta.color }} />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{category}</p>
            <p className="text-[11px] text-slate-400">{skills.length} skill{skills.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Avg proficiency ring */}
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="12" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                <circle
                  cx="16" cy="16" r="12" fill="none"
                  stroke={meta.color} strokeWidth="3"
                  strokeDasharray={`${2 * Math.PI * 12}`}
                  strokeDashoffset={`${2 * Math.PI * 12 * (1 - avgProficiency / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-white">
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
            <div className="px-5 pb-5 space-y-3 border-t border-white/05 pt-4">
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
    <section id="skills" className="py-24 relative bg-[#090A0F]">
      <div className="container relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="eyebrow"><span className="eyebrow-dot" />Tech Arsenal</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-3">
            Skills &{' '}
            <span className="text-indigo-400">Proficiency</span>
          </h2>
          <p className="text-slate-400 text-base max-w-2xl">
            {skills.length}+ technologies across AI/ML, Generative AI, Full-Stack, IoT, and Cloud.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          {[
            { label: 'Total Skills', value: skills.length, color: 'text-indigo-400' },
            { label: 'Categories', value: categories.length, color: 'text-purple-400' },
            { label: 'AI/ML Skills', value: skills.filter(s => ['AI / ML', 'Generative AI & LLMs', 'ML Frameworks'].includes(s.category)).length, color: 'text-emerald-400' },
            { label: 'Avg Proficiency', value: skills.length ? `${Math.round(skills.reduce((a, s) => a + s.proficiency, 0) / skills.length)}%` : '0%', color: 'text-amber-400' },
          ].map((stat, i) => (
            <div key={i} className="card p-4 text-center">
              <div className={`text-2xl font-black ${stat.color} mb-1`}>{stat.value}</div>
              <div className="mono text-[9px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Category filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {allTabs.map(tab => {
            const meta = CATEGORY_META[tab];
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  isActive
                    ? 'text-white bg-indigo-600/30 border-indigo-500/50 shadow-md'
                    : 'bg-white/05 border-white/08 text-slate-400 hover:border-white/15 hover:text-white'
                }`}
              >
                {meta && <meta.icon size={12} style={{ color: meta.color }} />}
                {tab}
              </button>
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
