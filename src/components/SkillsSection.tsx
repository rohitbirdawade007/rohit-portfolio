import { useState, useEffect } from "react";
import { API_URL } from "@/services/api";

interface Skill {
  _id: string;
  name: string;
  description: string;
  proficiency: number;
}

const SkillsSection = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeCategory, setActiveCategory] = useState("Languages");

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

  const categories = ["Languages", "AI & Machine Learning", "Tools & Technologies", "Other Skills"];

  const filteredSkills = skills.filter(skill => {
    const desc = ((skill.name || "") + " " + (skill.description || "")).toLowerCase();
    if (activeCategory === "Languages") return desc.includes("python") || desc.includes("c++") || desc.includes("c") || desc.includes("html") || desc.includes("css") || desc.includes("java");
    if (activeCategory === "AI & Machine Learning") return desc.includes("ai") || desc.includes("ml") || desc.includes("learning") || desc.includes("data");
    if (activeCategory === "Tools & Technologies") return desc.includes("notebook") || desc.includes("jupyter") || desc.includes("arduino") || desc.includes("raspberry");
    return true;
  });

  return (
    <section id="skills" className="py-32 relative bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="mb-20 animate-fadeUp">
           <span className="subheading-premium">Proficiency</span>
           <h2 className="heading-premium text-gray-900">Technical <span className="text-primary">Registry</span></h2>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 bg-gray-50 p-2 rounded-xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-lg text-xs font-bold transition-all ${
                activeCategory === cat 
                  ? "bg-white text-primary shadow-sm" 
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Progress Bars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 mb-24">
          {filteredSkills.length === 0 && <p className="col-span-full text-center text-gray-400 italic">No skills found in this registry...</p>}
          {filteredSkills.map((skill) => (
            <div key={skill._id} className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="font-bold text-gray-800">{skill.name}</span>
                <span className="text-[10px] font-bold text-gray-400">{skill.proficiency}%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Certifications (Reference Image Style) */}
        <div className="mb-12 animate-fadeUp">
           <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Certifications</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-32">
           {[
             "AI model-building workshop by NEXT WAVE (20/1/2024)",
             "HTML & CSS For Web Development by Skill Academy",
             "Free Live Course on Mastering Battery Management Systems",
             "Three Days of National Online Workshops on Research Paper Writing & Publishing"
           ].map((cert, i) => (
             <div key={i} className="glass p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6 group hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-black shrink-0 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                   {i + 1}
                </div>
                <p className="text-sm font-bold text-gray-700 leading-relaxed text-left uppercase tracking-tight">{cert}</p>
             </div>
           ))}
        </div>

        {/* Bottom Technologies Cloud */}
        <div className="text-center mb-12">
           <h3 className="text-xl font-bold text-gray-900 mb-10">Technologies I Work With</h3>
           <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {[
                "Python", "TensorFlow", "PyTorch", "scikit-learn", "Pandas", "NumPy", "Jupyter", 
                "Google Colab", "Matplotlib", "Seaborn", "CNN", "LSTM", "Computer Vision", 
                "NLP", "Raspberry Pi", "Arduino", "IoT", "C++", "C", "Git", "HTML", "CSS"
              ].map((tech) => (
                <span key={tech} className="px-6 py-2 bg-primary text-white text-xs font-bold rounded-full shadow-sm hover:scale-110 hover:-rotate-3 transition-transform cursor-default">
                   {tech}
                </span>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
