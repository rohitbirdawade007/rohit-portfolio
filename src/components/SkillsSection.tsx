import { useState, useEffect } from "react";
import { API_URL } from "@/services/api";
import { motion } from "framer-motion";
import { Cpu, FlaskConical, Layout, Terminal, Code } from "lucide-react";

interface Skill {
  _id: string;
  name: string;
  description: string;
  proficiency: number;
}

const SkillsSection = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeCategory, setActiveCategory] = useState("AI & ML");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch(`${API_URL}/skills`);
        const data = await res.json();
        setSkills(Array.isArray(data) ? data : []);
      } catch (e) {
        setSkills([]);
      }
    };
    fetchSkills();
  }, []);

  const categories = [
    { name: "AI & ML", icon: <FlaskConical size={18} /> },
    { name: "IoT & Hardware", icon: <Cpu size={18} /> },
    { name: "Languages", icon: <Terminal size={18} /> },
    { name: "Web & Tools", icon: <Layout size={18} /> }
  ];

  const filteredSkills = skills.filter(skill => {
    const desc = ((skill.name || "") + " " + (skill.description || "")).toLowerCase();
    if (activeCategory === "AI & ML") return desc.includes("ai") || desc.includes("ml") || desc.includes("learning") || desc.includes("data") || desc.includes("deep") || desc.includes("vision");
    if (activeCategory === "IoT & Hardware") return desc.includes("arduino") || desc.includes("raspberry") || desc.includes("iot") || desc.includes("embedded") || desc.includes("sensor");
    if (activeCategory === "Languages") return desc.includes("python") || desc.includes("c++") || desc.includes("c") || desc.includes("javascript") || desc.includes("java");
    if (activeCategory === "Web & Tools") return desc.includes("html") || desc.includes("css") || desc.includes("react") || desc.includes("git") || desc.includes("notebook");
    return true;
  });

  return (
    <section id="skills" className="py-32 bg-[#020617]">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
             <span className="subheading">Technical Stack</span>
             <h2 className="heading-section">Tools of the <span className="text-blue-500">Trade</span></h2>
          </motion.div>

          {/* Categories Filter */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16 px-4">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all border ${
                  activeCategory === cat.name 
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20" 
                    : "bg-white/5 text-[#94a3b8] border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Clean Grid of Badges/Tags */}
          <motion.div 
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            {filteredSkills.map((skill) => (
              <motion.div 
                key={skill._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-4 flex flex-col items-center justify-center text-center group cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Code size={18} />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{skill.name}</h3>
                <p className="text-[10px] text-[#94a3b8] font-medium uppercase tracking-widest">{skill.proficiency}% Experience</p>
              </motion.div>
            ))}
          </motion.div>
          
          {experience_placeholder()}
        </div>
      </div>
    </section>
  );

  function experience_placeholder() {
    return (
      <div className="mt-32">
        <h3 className="text-xl font-bold text-white mb-8 text-center uppercase tracking-widest italic opacity-50">Certifications & Accreditations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {[
             "AI model-building workshop - NEXT WAVE",
             "HTML & CSS For Web Development",
             "Mastering Battery Management Systems",
             "Research Paper Writing & Publishing"
           ].map((cert, i) => (
             <div key={i} className="glass p-6 rounded-2xl flex items-center gap-4 border-white/5 hover:bg-white/5 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                  {i+1}
                </div>
                <span className="text-sm font-semibold text-[#94a3b8]">{cert}</span>
             </div>
           ))}
        </div>
      </div>
    );
  }
};

export default SkillsSection;
