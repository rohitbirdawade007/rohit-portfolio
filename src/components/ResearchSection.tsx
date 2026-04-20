import { useState, useEffect } from "react";
import { BookOpen, ChevronRight, FileText } from "lucide-react";
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
    <section id="research" className="py-32 relative bg-[#020617] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-20 section-title-accent"
        >
           <span className="subheading-premium font-black">Scholarly Pursuit</span>
           <h2 className="heading-premium text-white">Publications & <span className="gradient-text-premiumitalic">Research</span></h2>
        </motion.div>

        <div className="space-y-8">
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
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8 rounded-[2.5rem] border-white/5 hover:border-primary/20 transition-all group flex items-start gap-6 relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 group-hover:bg-primary transition-all duration-500" />
              <div className="w-12 h-12 glass text-primary rounded-xl flex items-center justify-center shrink-0 border-white/10 group-hover:bg-primary group-hover:text-white transition-all">
                 <FileText size={20} />
              </div>
              <div className="flex-1">
                 <h3 className="text-xl font-black text-white group-hover:text-primary transition-colors mb-3 leading-tight uppercase italic tracking-tighter">
                    {item.title}
                 </h3>
                 <p className="text-sm text-gray-400 mb-6 leading-relaxed font-medium">
                    {item.description}
                 </p>
                 <div className="inline-flex items-center gap-2 text-[10px] text-gray-500 font-black uppercase tracking-widest hover:text-white cursor-pointer transition-colors group/link">
                    View Publication <ChevronRight size={14} className="text-primary group-hover/link:translate-x-1 transition-transform" />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
