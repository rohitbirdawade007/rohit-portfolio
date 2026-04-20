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
    <section id="research" className="scroll-mt-24 mb-20">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px w-10 bg-[#1e293b]" />
        <h2 className="text-sm font-black text-[#94a3b8] uppercase tracking-[0.4em] font-mono-system shrink-0">Scholarly_Research_Vault</h2>
        <div className="h-px flex-1 bg-[#1e293b]" />
      </div>

      <div className="space-y-6">
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
            className="system-module mb-0 hover:border-blue-500/30 transition-all flex items-start gap-6 relative group"
          >
            <div className="w-12 h-12 bg-[#020617] text-blue-500 rounded border border-[#1e293b] flex items-center justify-center shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-all">
               <FileText size={20} />
            </div>
            <div className="flex-1">
               <h3 className="text-lg font-bold text-white group-hover:text-blue-500 transition-colors mb-2 uppercase tracking-tight">
                  {item.title}
               </h3>
               <p className="text-xs text-[#94a3b8] mb-4 leading-relaxed font-mono-system">
                  {item.description}
               </p>
               <div className="inline-flex items-center gap-2 text-[10px] text-[#94a3b8] font-bold uppercase tracking-widest hover:text-white cursor-pointer transition-colors group/link font-mono-system">
                  Access_Publication <ChevronRight size={14} className="text-blue-500 group-hover/link:translate-x-1 transition-transform" />
               </div>
            </div>
            <div className="absolute top-4 right-4 text-[9px] font-mono-system font-black text-blue-500/50 uppercase tracking-widest">
               {item.status}_DOC
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ResearchSection;
