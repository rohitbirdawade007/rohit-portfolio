import { useState, useEffect } from "react";
import { API_URL } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Globe, FlaskConical, Layout, Terminal, Zap } from "lucide-react";

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
    { name: "AI & ML", icon: <FlaskConical size={16} /> },
    { name: "IoT & Hardware", icon: <Cpu size={16} /> },
    { name: "Languages", icon: <Terminal size={16} /> },
    { name: "Web & Tools", icon: <Layout size={16} /> }
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
    <section id="skills" className="py-32 relative bg-[#020617] overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 right-[-10%] w-[50%] h-[50%] border-2 border-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/2 left-[-10%] w-[40%] h-[40%] border-2 border-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-20 section-title-accent"
        >
           <span className="subheading-premium font-black">Proficiency</span>
           <h2 className="heading-premium text-white">Technical <span className="gradient-text-premium">Registry</span></h2>
           <p className="text-gray-400 max-w-2xl mt-6 text-sm font-medium">
             Expertise developed through academic excellence and hands-on implementation of cutting-edge technologies.
           </p>
        </motion.div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 px-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                activeCategory === cat.name 
                  ? "bg-primary text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]" 
                  : "glass text-gray-400 hover:text-white"
              }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="min-h-[400px]">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.div 
                  key={skill._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card p-6 rounded-3xl border-white/5 group hover:border-primary/50 transition-all cursor-default"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <Zap size={20} />
                    </div>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">{skill.proficiency}% Proficient</span>
                  </div>
                  <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-2">{skill.name}</h3>
                  <p className="text-xs text-gray-400 font-medium leading-relaxed mb-6 line-clamp-2">
                    {skill.description || "Mastering the core concepts and real-world applications of this technology."}
                  </p>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Certifications (Reference Image Style) */}
        <div className="mb-12">
           <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Key Certifications</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-32">
           {[
             { title: "AI model-building workshop", date: "NEXT WAVE (2024)" },
             { title: "HTML & CSS For Web Development", date: "Skill Academy" },
             { title: "Mastering Battery Management Systems", date: "Free Live Course" },
             { title: "Research Paper Writing & Publishing", date: "National Online Workshop" }
           ].map((cert, i) => (
             <motion.div 
               key={i} 
               whileHover={{ y: -5 }}
               className="glass p-6 rounded-[2rem] border-white/5 flex items-center gap-6 group hover:border-primary/30 transition-all duration-500"
             >
                <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center font-black text-xl text-primary shrink-0 border-white/10 group-hover:bg-primary group-hover:text-white transition-all">
                   0{i + 1}
                </div>
                <div>
                  <p className="text-sm font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors">{cert.title}</p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">{cert.date}</p>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
