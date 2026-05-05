import { useState, useEffect } from "react";
import { BookOpen, ChevronRight, ChevronDown, GraduationCap, ExternalLink, Tag, FileText } from "lucide-react";
import { getResearchList } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface Research {
  _id: string;
  title: string;
  description: string;
  abstract?: string;
  keywords?: string[];
  status: string;
  authors?: string;
  journal?: string;
  year?: string;
  link?: string;
}

const ResearchSection = () => {
  const [research, setResearch] = useState<Research[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    getResearchList()
      .then(data => setResearch(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  const toggleAbstract = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="research" className="py-28 relative overflow-hidden" style={{ background: "var(--surface)" }}>
      {/* Decorative */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.12] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-violet-50/40 rounded-full blur-[130px] translate-x-1/2 pointer-events-none" />

      <div className="container relative z-10">
        {/* Label */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label reveal">
          <span className="eyebrow"><span className="eyebrow-dot" />Academic Pursuit</span>
        </motion.div>

        {/* Headline */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
            <h2 className="display-md font-black tracking-[-0.04em] leading-[1.05] reveal">
              Research{" "}
              <span style={{ background: "linear-gradient(135deg,#6C63FF,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                & Publications
              </span>
            </h2>
            <p className="text-[#737373] mt-3 text-[15px] max-w-lg">
              Scholarly publications and ongoing investigations in AI and embedded intelligence.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Link to="/research" className="btn-secondary flex items-center gap-2 text-sm whitespace-nowrap">
              All Papers <ChevronRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Research Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {(research.length > 0 ? research : [
            {
              _id: '1',
              title: "AI and IoT in Sustainable Agriculture: A Review",
              description: "Exploring the intersection of edge computing and machine learning for precision farming optimization.",
              abstract: "This paper presents a comprehensive review of artificial intelligence and Internet of Things technologies applied to sustainable agriculture. We examine current methodologies in precision farming, including sensor-based crop monitoring, drone-assisted field analysis, and ML-driven yield prediction models.",
              keywords: ["AI", "IoT", "Precision Farming", "Edge Computing", "Machine Learning"],
              status: "Published",
              authors: "Rohit Birdawade et al.",
              journal: "IEEE Access",
              year: "2024"
            },
            {
              _id: '2',
              title: "Advanced Embedded Systems in Robotics",
              description: "Researching real-time operating systems and their performance in autonomous robotic platforms.",
              abstract: "This research investigates the integration of real-time operating systems (RTOS) with modern embedded architectures for autonomous robotic applications, evaluating latency, throughput, and energy efficiency across multiple hardware platforms.",
              keywords: ["Embedded Systems", "RTOS", "Robotics", "Autonomous Systems"],
              status: "In Progress",
              authors: "Rohit Birdawade",
              year: "2025"
            }
          ]).map((item, idx) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="card shimmer-card hover-lift hover-glow group reveal flex flex-col"
            >
              {/* Header */}
              <div className="p-6 pb-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#6C63FF]/5 border border-[#6C63FF]/15 text-[#6C63FF] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <GraduationCap size={20} />
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-semibold uppercase tracking-widest ${
                      item.status.toLowerCase().includes('pub') 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/50' 
                        : 'bg-amber-50 text-amber-600 border border-amber-200/50'
                    }`}>
                      {item.status}
                    </span>
                    {item.year && (
                      <span className="mono text-[9px] text-[#A3A3A3] font-semibold">{item.year}</span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-[15px] font-bold text-[#0A0A0A] mb-2 group-hover:text-[#6C63FF] transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Authors & Journal */}
                {(item.authors || item.journal) && (
                  <p className="mono text-[10px] text-[#A3A3A3] font-semibold mb-3">
                    {item.authors}{item.journal ? ` · ${item.journal}` : ""}
                  </p>
                )}

                {/* Description */}
                <p className="text-[13px] text-[#737373] leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Keywords */}
              {item.keywords && item.keywords.length > 0 && (
                <div className="px-6 pb-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Tag size={10} className="text-[#A3A3A3] shrink-0" />
                    {item.keywords.map((kw, ki) => (
                      <span key={ki} className="tag text-[9px]">{kw}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Abstract toggle */}
              {item.abstract && (
                <div className="px-6 pb-4">
                  <button
                    onClick={() => toggleAbstract(item._id)}
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-[#6C63FF] hover:text-[#5B54E6] transition-colors"
                  >
                    <FileText size={12} />
                    {expandedId === item._id ? "Hide" : "Read"} Abstract
                    <ChevronDown size={12} className={`transition-transform ${expandedId === item._id ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {expandedId === item._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 p-4 bg-[#F5F5F5] border border-[#EBEBEB] rounded-xl">
                          <p className="text-[12px] text-[#525252] leading-relaxed italic">
                            {item.abstract}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Footer */}
              <div className="mt-auto px-6 py-4 border-t border-[#F0F0EE] flex items-center justify-between">
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-[#6C63FF] hover:text-[#5B54E6] transition-colors"
                  >
                    View Publication <ExternalLink size={11} />
                  </a>
                ) : (
                  <Link to={`/research/${item._id}`} className="flex items-center gap-1.5 text-[11px] font-semibold text-[#A3A3A3] group-hover:text-[#6C63FF] transition-colors">
                    View Details <ChevronRight size={11} />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
