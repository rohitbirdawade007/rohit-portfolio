import { useState, useEffect, useRef } from "react";
import { API_URL } from "@/services/api";
import { Code2, Server, Database, Globe, Brain, Cloud, Smartphone, Layout } from "lucide-react";

interface Skill {
  _id: string;
  name: string;
  description: string;
  proficiency: number;
}

const iconMap: Record<string, any> = {
  "Frontend": <Globe size={24} />,
  "Backend": <Server size={24} />,
  "Database": <Database size={24} />,
  "AI": <Brain size={24} />,
  "Cloud": <Cloud size={24} />,
  "Mobile": <Smartphone size={24} />,
  "UI/UX": <Layout size={24} />,
  "Default": <Code2 size={24} />
};

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch(`${API_URL}/skills`);
        const data = await res.json();
        setSkills(Array.isArray(data) ? data : []);
      } catch (e) {
        setSkills([]);
        console.error("Failed to load skills");
      }
    };
    fetchSkills();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
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
    <section id="skills" className="section-padding bg-gray-50 dark:bg-gray-900/50 transition-colors" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fadeUp">
          <h2 className="section-heading !mb-4">Skills & Technical Expertise</h2>
          <p className="text-lg text-muted-foreground">
            A comprehensive overview of my technical proficiency and the technologies I've mastered to build world-class applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skills.length === 0 && <p className="text-center text-gray-400 italic col-span-full">No skills added yet.</p>}
          {skills.map((skill, index) => (
            <div 
              key={skill._id} 
              className={`glass-card p-6 rounded-[2rem] hover:border-primary/30 transition-all group animate-fadeUp`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-primary/10 text-primary rounded-2xl group-hover:scale-110 transition-transform">
                  {getIcon(skill.name, skill.description)}
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-primary">{skill.proficiency}%</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{skill.name}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-1">{skill.description}</p>
                </div>
                
                <div className="progress-bar">
                  <div 
                    className="progress-bar-fill"
                    style={{ 
                      width: isVisible ? `${skill.proficiency}%` : '0%',
                    }}
                  ></div>
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
