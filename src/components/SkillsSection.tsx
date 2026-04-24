import { useEffect, useState, useRef } from "react";
import { API_URL } from "@/services/api";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Brain, Cpu, Database, Layout, Code2 } from "lucide-react";

interface Skill { _id: string; name: string; description: string; proficiency: number; }

const TABS = [
  { name: "AI & ML",    icon: Brain,    filter: ["ai","ml","learning","data","deep","vision","neural","nlp"] },
  { name: "IoT",        icon: Cpu,      filter: ["arduino","raspberry","iot","embedded","sensor","esp"] },
  { name: "Backend",    icon: Database, filter: ["python","c++","c","javascript","java","sql","node","flask","fast"] },
  { name: "Full Stack", icon: Layout,   filter: ["html","css","react","git","tailwind","next","typescript"] },
];

const Bar = ({ value }: { value: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="skill-track">
      <div className="skill-fill" style={{ width: inView ? `${value}%` : 0 }} />
    </div>
  );
};

const SkillsSection = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [active, setActive] = useState("AI & ML");
  const [loading, setLoading] = useState(true);

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
    <section id="skills" className="py-28 relative" style={{ background: "var(--surface)" }}>
      {/* Decorative left border stripe */}
      <div className="absolute left-0 top-20 bottom-20 w-px bg-gradient-to-b from-transparent via-[#E5E5E5] to-transparent" />

      <div className="container">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="section-label"
        >
          <span className="eyebrow"><span className="eyebrow-dot" />Tech Stack</span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.05 }}
          className="mb-12"
        >
          <h2 className="text-[clamp(2.25rem,4vw,3.5rem)] font-black tracking-[-0.04em] leading-[1.05]">
            Skills &{" "}
            <span style={{ background: "linear-gradient(135deg,#1A56DB,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Proficiency
            </span>
          </h2>
          <p className="text-[#737373] mt-3 text-[15px] max-w-lg">
            Engineered solutions across the full spectrum of intelligent systems.
          </p>
        </motion.div>

        {/* Tab row */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {TABS.map(t => {
            const Icon = t.icon;
            const isActive = active === t.name;
            return (
              <button
                key={t.name}
                onClick={() => setActive(t.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                  isActive
                    ? "bg-[#0A0A0A] text-white shadow-md"
                    : "bg-[#F5F5F5] text-[#525252] hover:bg-[#EBEBEB] hover:text-[#0A0A0A]"
                }`}
              >
                <Icon size={14} />
                {t.name}
              </button>
            );
          })}
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence mode="wait">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="card p-5">
                    <div className="skeleton h-3.5 w-2/3 mb-3" />
                    <div className="skeleton h-2.5 w-1/2 mb-4" />
                    <div className="skeleton h-[3px] w-full" />
                  </div>
                ))
              : filtered.length > 0
              ? filtered.map((skill, idx) => (
                  <motion.div
                    key={skill._id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="card p-5 group hover-lift"
                  >
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#F5F5F5] border border-[#EBEBEB] flex items-center justify-center text-[#737373] group-hover:bg-[#0A0A0A] group-hover:text-white group-hover:border-transparent transition-all">
                          <Code2 size={14} />
                        </div>
                        <div>
                          <p className="text-[13px] font-bold text-[#0A0A0A]">{skill.name}</p>
                          {skill.description && (
                            <p className="text-[10px] text-[#A3A3A3] mt-0.5 line-clamp-1">{skill.description}</p>
                          )}
                        </div>
                      </div>
                      <span className="mono text-[11px] font-bold text-[#1A56DB] tabular-nums">{skill.proficiency}%</span>
                    </div>
                    <Bar value={skill.proficiency} />
                  </motion.div>
                ))
              : (
                <div className="col-span-full card p-10 text-center text-[#A3A3A3]">
                  <Code2 size={28} className="mx-auto mb-3 opacity-25" />
                  <p className="text-sm font-medium">No skills in this category.</p>
                </div>
              )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
