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
      }
    };
    fetchSkills();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden bg-white dark:bg-[#020617]" ref={sectionRef}>
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-20 animate-fadeUp">
          <span className="subheading-premium">Technical Arsenal</span>
          <h2 className="heading-premium dark:text-white">Expertise <span className="text-primary italic">&</span> Polyglot Skills</h2>
          <p className="text-xl text-muted-foreground mt-6 leading-relaxed">
            Architecting scalable solutions with modern tech stacks. Focused on performance, security, and exceptional user experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {skills.length === 0 && <p className="text-center text-gray-400 italic col-span-full">Awaiting tech stack data...</p>}
          {skills.map((skill, index) => (
            <div 
              key={skill._id} 
              className={`bento-item hover-spotlight border-white/10 dark:hover:bg-primary/5 hover:border-primary/40 group animate-fadeUp h-full flex flex-col justify-between`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div>
                <div className="w-14 h-14 flex items-center justify-center bg-primary/5 text-primary rounded-[1.25rem] mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                  {getIcon(skill.name, skill.description)}
                </div>
                <h4 className="text-2xl font-black mb-3 tracking-tighter group-hover:text-primary transition-colors">{skill.name}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8">{skill.description}</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Proficiency</span>
                  <span className="text-xl font-black text-foreground">{skill.proficiency}%</span>
                </div>
                <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-1000 ease-out"
                    style={{ width: isVisible ? `${skill.proficiency}%` : '0%' }}
                  />
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
