import { useState, useEffect } from "react";
import { API_URL } from "@/services/api";
import { Brain, Cpu, Database, Terminal, Layout } from "lucide-react";

interface Skill {
  _id: string;
  name: string;
  description: string;
}

const SkillMatrix = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/skills`)
      .then(res => res.json())
      .then(data => setSkills(Array.isArray(data) ? data : []))
      .catch(() => setSkills([]));
  }, []);

  const skillMatrix = [
    { title: "Inference_Modeling", icon: <Brain size={18} />, filter: ["ai", "ml", "learning", "data", "deep", "vision"] },
    { title: "Physical_Computing", icon: <Cpu size={18} />, filter: ["arduino", "raspberry", "iot", "embedded", "sensor"] },
    { title: "System_Architecture", icon: <Database size={18} />, filter: ["python", "c++", "c", "javascript", "java", "sql"] },
    { title: "Interface_Modules", icon: <Layout size={18} />, filter: ["html", "css", "react", "git"] }
  ];

  return (
    <section id="skills" className="scroll-mt-24 mb-20">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px w-10 bg-[#1e293b]" />
        <h2 className="text-sm font-black text-[#94a3b8] uppercase tracking-[0.4em] font-mono-system shrink-0">Technical_Capability_Matrix</h2>
        <div className="h-px flex-1 bg-[#1e293b]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {skillMatrix.map((module, i) => (
            <div key={i} className="system-module">
               <div className="flex items-center gap-3 mb-8">
                  <div className="text-blue-500">{module.icon}</div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white">{module.title}</h3>
               </div>

               <div className="flex flex-wrap gap-2">
                  {skills.filter(s => {
                    const desc = (s.name + " " + s.description).toLowerCase();
                    return module.filter.some(f => desc.includes(f));
                  }).map(skill => (
                    <span 
                      key={skill._id}
                      className="px-4 py-2 bg-white/5 border border-white/5 text-[11px] font-mono-system font-black text-[#94a3b8] uppercase tracking-wider hover:bg-blue-500/10 hover:text-white hover:border-blue-500/20 transition-all cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
               </div>
            </div>
         ))}
      </div>
    </section>
  );
};

export default SkillMatrix;
