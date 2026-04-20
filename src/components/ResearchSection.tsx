import { useState, useEffect } from "react";
import { BookOpen, ChevronRight, GraduationCap } from "lucide-react";
import { getResearchList } from "@/services/api";
import { motion } from "framer-motion";

interface Research {
  _id: string;
  title: string;
  description: string;
  status: string;
}

const ResearchSection = () => {
  const [research, setResearch] = useState<Research[]>([]);

  useEffect(() => {
    getResearchList()
      .then(data => setResearch(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  return (
    <section id="research" className="py-24 bg-transparent">
      <div className="container">
        <div className="text-left mb-16">
           <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Academic Pursuit</h2>
           <p className="text-slate-600">Research & scholarly publications in AI and embedded intelligence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(research.length > 0 ? research : [
            { 
              _id: '1', 
              title: "AI and IoT in Sustainable Agriculture: A Review", 
              description: "Exploring the intersection of edge computing and machine learning for precision farming optimization.", 
              status: "Published" 
            },
            { 
              _id: '2', 
              title: "Advanced Embedded Systems in Robotics", 
              description: "Researching real-time operating systems and their performance in autonomous robotic platforms.", 
              status: "Research" 
            }
          ]).map((item, idx) => (
            <motion.div 
              key={item._id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center shrink-0 group-hover:bg-sky-500 group-hover:text-white transition-all">
                    <GraduationCap size={24} />
                 </div>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.status}</span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-sky-600 transition-colors tracking-tight">
                {item.title}
              </h3>
              
              <p className="text-slate-600 text-sm leading-relaxed mb-8 font-medium">
                {item.description}
              </p>
              
              <div className="inline-flex items-center gap-2 text-[10px] font-bold text-sky-500 uppercase tracking-widest hover:text-sky-700 cursor-pointer transition-colors group/link">
                Read Abstract <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
