import { useEffect, useState } from "react";
import { Trophy, Medal, Star, Sparkles, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAchievements } from "@/services/api";
import { motion } from "framer-motion";

interface Achievement {
  _id: string;
  title: string;
  organization: string;
  date: string;
  type: string;
  category: "achievements" | "cocurricular" | "extracurricular" | "default";
}

const AchievementsSection = () => {
  const navigate = useNavigate();
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    getAchievements()
      .then(data => setAchievements(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  const renderGrid = (title: string, items: Achievement[]) => (
    <div className="mb-32">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center gap-4 mb-16"
      >
        <div className="h-[2px] w-12 bg-primary/30 rounded-full" />
        <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic text-center">{title}</h3>
        <div className="h-[2px] w-12 bg-primary/30 rounded-full" />
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((a, idx) => (
          <motion.div 
            key={a._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => navigate(`/achievements/${a._id}`)}
            className="glass-card p-10 cursor-pointer group flex flex-col items-center text-center relative overflow-hidden h-full border-white/5 hover:border-primary/40 transition-all duration-500 rounded-[3rem]"
          >
            <div className="w-16 h-16 glass text-primary rounded-[1.5rem] flex items-center justify-center mb-8 border-white/10 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl">
               <Trophy size={28} />
            </div>
            <h4 className="font-black text-white mb-3 leading-tight uppercase tracking-tighter text-xl italic">{a.title}</h4>
            <p className="text-xs text-gray-500 mb-4 font-bold uppercase tracking-widest">{a.organization}</p>
            <div className="px-5 py-1.5 glass rounded-full border-white/5 inline-block mb-8">
              <p className="text-[9px] text-primary font-black uppercase tracking-[0.2em]">{a.date}</p>
            </div>
            
            <div className="mt-auto flex items-center gap-2 text-[10px] text-gray-500 font-black uppercase tracking-widest group-hover:text-white transition-all duration-300">
               Access Verification <ChevronRight size={14} className="text-primary" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="achievements" className="py-32 relative bg-[#020617] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-24 section-title-accent"
        >
           <span className="subheading-premium font-black">Excellence</span>
           <h2 className="heading-premium text-white">Merits & <span className="gradient-text-premiumitalic">Recognition</span></h2>
        </motion.div>

        {renderGrid("Achievements & Awards", achievements.filter(a => a.category === "achievements"))}
        {renderGrid("Academic & Research Activities", achievements.filter(a => a.category === "cocurricular"))}
        {renderGrid("Community & Leadership", achievements.filter(a => a.category === "extracurricular"))}
      </div>
    </section>
  );
};

export default AchievementsSection;
