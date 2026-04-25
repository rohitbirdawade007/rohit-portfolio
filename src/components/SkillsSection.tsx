import { useEffect, useState, useRef } from "react";
import { API_URL } from "@/services/api";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Brain, Cpu, Database, Layout, Code2, Zap } from "lucide-react";

interface Skill { _id: string; name: string; description: string; proficiency: number; }

const TABS = [
  { name: "AI & ML",    icon: Brain,    filter: ["ai","ml","learning","data","deep","vision","neural","nlp"], color: "#1A56DB" },
  { name: "IoT",        icon: Cpu,      filter: ["arduino","raspberry","iot","embedded","sensor","esp"],       color: "#7C3AED" },
  { name: "Backend",    icon: Database, filter: ["python","c++","c","javascript","java","sql","node","flask","fast"], color: "#059669" },
  { name: "Full Stack", icon: Layout,   filter: ["html","css","react","git","tailwind","next","typescript"],   color: "#D97706" },
];

/* ── SVG Ring Progress ── */
function RingProgress({ value, color = "#1A56DB", size = 52 }: { value: number; color?: string; size?: number }) {
  const ref = useRef<SVGCircleElement>(null);
  const isInView = useInView({ current: ref.current ? ref.current.closest("div") as HTMLDivElement : null }, { once: true });
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (isInView ? value / 100 : 0) * circ;

  return (
    <div style={{ width: size, height: size }} className="relative shrink-0">
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F0F0EE" strokeWidth={5} />
        <circle
          ref={ref}
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={color}
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1)", filter: `drop-shadow(0 0 4px ${color}60)` }}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center mono text-[10px] font-bold"
        style={{ color }}
      >
        {value}%
      </span>
    </div>
  );
}

/* ── Category color map ── */
function getCategoryColor(tab: typeof TABS[0]) { return tab.color; }
function getTagClass(tabName: string) {
  const m: Record<string, string> = {
    "AI & ML": "tag-blue",
    "IoT": "tag-violet",
    "Backend": "tag-green",
    "Full Stack": "tag-amber",
  };
  return m[tabName] || "tag";
}

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
      {/* Decorative mesh */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.15] pointer-events-none" />

      <div className="container relative">
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
          <h2 className="display-md font-black tracking-[-0.04em] leading-[1.05]">
            Skills &{" "}
            <span style={{ background: "linear-gradient(135deg,#1A56DB,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Proficiency
            </span>
          </h2>
          <p className="text-[#737373] mt-3 text-[15px] max-w-lg">
            Engineered solutions across the full spectrum of intelligent systems.
          </p>
        </motion.div>

        {/* Tab row — upgraded to chips */}
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

        {/* Category header */}
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
                    className="card shimmer-card p-5 group hover-lift hover-glow"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {/* Ring Progress */}
                      <RingProgress value={skill.proficiency} color={tab.color} />

                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-[#0A0A0A] leading-tight truncate">{skill.name}</p>
                        {skill.description && (
                          <p className="text-[10px] text-[#A3A3A3] mt-0.5 line-clamp-1">{skill.description}</p>
                        )}
                        <span className={`mt-1.5 inline-flex ${getTagClass(active)}`} style={{ fontSize: "9px" }}>
                          {active}
                        </span>
                      </div>

                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform"
                        style={{ background: tab.color }}
                      >
                        <Code2 size={13} />
                      </div>
                    </div>

                    {/* Bar */}
                    <div className="skill-track mt-1">
                      <div className="skill-fill-glow" style={{ width: `${skill.proficiency}%`, background: `linear-gradient(90deg, ${tab.color} 0%, ${tab.color}99 100%)` }} />
                    </div>
                  </motion.div>
                ))
              : (
                <div className="col-span-full card p-10 text-center text-[#A3A3A3]">
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
