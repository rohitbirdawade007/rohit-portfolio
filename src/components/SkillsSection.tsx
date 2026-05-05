import { useEffect, useState, useRef } from "react";
import { API_URL } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Cpu, Database, Layout, Zap } from "lucide-react";

interface Skill { _id: string; name: string; description: string; proficiency: number; }

/* ── Tab categories mapped to user's requested groupings ── */
const TABS = [
  { name: "Languages",      icon: Brain,    filter: ["python","c++","c","javascript","java","sql","typescript","html","css","r"],       color: "#6C63FF" },
  { name: "ML Frameworks",  icon: Cpu,      filter: ["tensorflow","pytorch","keras","scikit","sklearn","opencv","ml","deep","learning","ai","vision","neural","nlp","data","pandas","numpy","matplotlib"], color: "#1A56DB" },
  { name: "Dev Tools",      icon: Database, filter: ["git","docker","flask","fast","node","react","tailwind","next","vite","arduino","raspberry","iot","embedded","sensor","esp","aws","gcp","linux","vscode","jupyter"], color: "#059669" },
  { name: "Concepts",       icon: Layout,   filter: ["algorithm","oop","design","pattern","agile","rest","api","micro","cloud","devops","ci","cd","testing","architecture"],   color: "#D97706" },
];

const SkillsSection = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [active, setActive] = useState("Languages");
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetch(`${API_URL}/skills`)
      .then(r => r.json())
      .then(d => setSkills(Array.isArray(d) ? d : []))
      .catch(() => setSkills([]))
      .finally(() => setLoading(false));
  }, []);

  const tab = TABS.find(t => t.name === active)!;
  const filtered = skills.filter(s =>
    tab.filter.some(f => (s.name + " " + s.description).toLowerCase().includes(f))
  );

  return (
    <section id="skills" ref={sectionRef} className="py-28 relative" style={{ background: "var(--surface)" }}>
      {/* Decorative left border stripe */}
      <div className="absolute left-0 top-20 bottom-20 w-px bg-gradient-to-b from-transparent via-[#E5E5E5] to-transparent" />
      {/* Decorative mesh */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.15] pointer-events-none" />

      <div className="container relative">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="section-label reveal"
        >
          <span className="eyebrow"><span className="eyebrow-dot" />Tech Stack</span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.05 }}
          className="mb-12"
        >
          <h2 className="display-md font-black tracking-[-0.04em] leading-[1.05] reveal">
            Skills &{" "}
            <span style={{ background: "linear-gradient(135deg,#6C63FF,#1A56DB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Proficiency
            </span>
          </h2>
          <p className="text-[#737373] mt-3 text-[15px] max-w-lg">
            Engineered solutions across the full spectrum of intelligent systems.
          </p>
        </motion.div>

        {/* Tab row — category chips: Languages · ML Frameworks · Dev Tools · Concepts — UPGRADE 4 */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {TABS.map(t => {
            const Icon = t.icon;
            const isActive = active === t.name;
            return (
              <motion.button
                key={t.name}
                onClick={() => setActive(t.name)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                  isActive
                    ? "text-white shadow-md"
                    : "bg-[#F5F5F5] text-[#525252] hover:bg-[#EBEBEB] hover:text-[#0A0A0A]"
                }`}
                style={isActive ? { background: t.color } : {}}
              >
                <Icon size={14} />
                {t.name}
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white/60 ml-0.5" />}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Category label header */}
        <AnimatePresence mode="wait">
          {!loading && (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-2 h-6 rounded-full" style={{ background: tab.color }} />
              <p className="text-[13px] font-semibold text-[#525252]">
                {filtered.length} skill{filtered.length !== 1 ? "s" : ""} in <span style={{ color: tab.color }}>{active}</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skills as pill badges — UPGRADE 4: replaced progress bars with pills */}
        <div className="min-h-[120px]">
          <AnimatePresence mode="wait">
            {loading
              ? (
                <div className="flex flex-wrap gap-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="skeleton h-8 rounded-full" style={{ width: `${60 + Math.random() * 50}px` }} />
                  ))}
                </div>
              )
              : filtered.length > 0
              ? (
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-wrap gap-3"
                >
                  {filtered.map((skill, idx) => (
                    <motion.span
                      key={skill._id}
                      initial={{ opacity: 0, y: 16, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: idx * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="skill-pill"
                      style={{
                        borderColor: `${tab.color}40`,
                        background: `${tab.color}15`,
                        color: tab.color,
                      }}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </motion.div>
              )
              : (
                <div className="card p-10 text-center text-[#A3A3A3]">
                  <Zap size={28} className="mx-auto mb-3 opacity-25" />
                  <p className="text-sm font-medium">No skills in this category yet.</p>
                  <p className="text-xs mt-1 text-[#D4D4D4]">Add skills via the admin panel.</p>
                </div>
              )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
