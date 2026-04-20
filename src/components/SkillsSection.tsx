import { useState, useEffect } from "react";
import { API_URL } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Cpu, Database, Layout, Code2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Skill {
  _id: string;
  name: string;
  description: string;
  proficiency: number;
}

import TiltCard from "./TiltCard";

const SkillsSection = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeTab, setActiveTab] = useState("AI & ML");

  useEffect(() => {
    fetch(`${API_URL}/skills`)
      .then(res => res.json())
      .then(data => setSkills(Array.isArray(data) ? data : []))
      .catch(() => setSkills([]));
  }, []);

  const tabs = [
    { name: "AI & ML", icon: <Brain size={18} />, filter: ["ai", "ml", "learning", "data", "deep", "vision"] },
    { name: "IoT", icon: <Cpu size={18} />, filter: ["arduino", "raspberry", "iot", "embedded", "sensor"] },
    { name: "Backend", icon: <Database size={18} />, filter: ["python", "c++", "c", "javascript", "java", "sql"] },
    { name: "Full Stack", icon: <Layout size={18} />, filter: ["html", "css", "react", "git"] }
  ];

  const filteredSkills = skills.filter(s => {
    const desc = (s.name + " " + s.description).toLowerCase();
    const currentTab = tabs.find(t => t.name === activeTab);
    return currentTab?.filter.some(f => desc.includes(f));
  });

  return (
    <section id="skills" className="py-24 bg-transparent relative">
      <div className="container">
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tighter uppercase tracking-[0.2em]">Competencies</h2>
           <p className="text-slate-600 max-w-2xl mx-auto font-medium">
             Engineered solutions across the full stack of intelligent system operation.
           </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 p-2 bg-slate-100 rounded-full w-fit mx-auto shadow-inner border border-slate-200">
           {tabs.map((tab) => (
             <button
               key={tab.name}
               onClick={() => setActiveTab(tab.name)}
               className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                 activeTab === tab.name 
                   ? "bg-white text-sky-600 shadow-md transform scale-105" 
                   : "text-slate-500 hover:text-slate-900"
               }`}
             >
               {tab.icon} {tab.name}
             </button>
           ))}
        </div>

        {/* Skills Grid with Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
           <AnimatePresence mode="wait">
             {filteredSkills.map((skill, idx) => (
               <TiltCard key={skill._id}>
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   transition={{ delay: idx * 0.05 }}
                   className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all"
                 >
                   <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                            <Code2 size={16} />
                         </div>
                         <span className="font-bold text-slate-800 tracking-tight uppercase text-xs">{skill.name}</span>
                      </div>
                      <span className="text-[10px] font-bold text-sky-600 font-mono tracking-tighter">{skill.proficiency}%</span>
                   </div>
                   <Progress value={skill.proficiency} className="h-2 bg-slate-50 [&>div]:bg-sky-500" />
                 </motion.div>
               </TiltCard>
             ))}
           </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
