import { useState, useEffect } from "react";
import { API_URL } from "@/services/api";
import { Code2, Server, Database, Globe, Brain, Cloud, Smartphone, Layout } from "lucide-react";

interface Skill {
  _id: string;
  name: string;
  description: string;
}

const iconMap: Record<string, any> = {
  "Frontend": <Globe size={20} />,
  "Backend": <Server size={20} />,
  "Database": <Database size={20} />,
  "AI": <Brain size={20} />,
  "Cloud": <Cloud size={20} />,
  "Mobile": <Smartphone size={20} />,
  "UI/UX": <Layout size={20} />,
  "Default": <Code2 size={20} />
};

const SkillsSection = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

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

  const getIcon = (name: string, desc: string) => {
    const searchStr = (name + " " + desc).toLowerCase();
    if (searchStr.includes("front") || searchStr.includes("react") || searchStr.includes("next")) return iconMap["Frontend"];
    if (searchStr.includes("back") || searchStr.includes("node") || searchStr.includes("python")) return iconMap["Backend"];
    if (searchStr.includes("sql") || searchStr.includes("db") || searchStr.includes("mongo")) return iconMap["Database"];
    if (searchStr.includes("ai") || searchStr.includes("ml") || searchStr.includes("intelligence")) return iconMap["AI"];
    if (searchStr.includes("aws") || searchStr.includes("cloud") || searchStr.includes("docker")) return iconMap["Cloud"];
    if (searchStr.includes("ios") || searchStr.includes("android") || searchStr.includes("mobile")) return iconMap["Mobile"];
    if (searchStr.includes("design") || searchStr.includes("ui") || searchStr.includes("ux")) return iconMap["UI/UX"];
    return iconMap["Default"];
  };

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden bg-white dark:bg-[#020617]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-20 animate-fadeUp">
          <span className="subheading-premium">Technical Core</span>
          <h2 className="heading-premium dark:text-white">Professional <span className="text-primary italic">Expertise</span></h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {skills.length === 0 && <p className="text-center text-gray-400 italic col-span-full">Awaiting tech stack...</p>}
          {skills.map((skill, index) => (
            <div 
              key={skill._id} 
              className="bento-item hover-spotlight !p-6 border-white/10 dark:hover:bg-primary/5 group animate-fadeUp h-full"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/5 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm shrink-0">
                  {getIcon(skill.name, skill.description)}
                </div>
                <div>
                  <h4 className="text-lg font-black tracking-tighter group-hover:text-primary transition-colors">{skill.name}</h4>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black opacity-60 line-clamp-1">{skill.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
