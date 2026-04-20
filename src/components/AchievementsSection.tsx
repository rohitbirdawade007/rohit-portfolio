import { useEffect, useState } from "react";
import { Trophy, Medal, Star, Sparkles, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAchievements } from "@/services/api";

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

  const renderGrid = (title: string, items: Achievement[], emoji: string) => (
    <div className="mb-24 animate-fadeUp">
      <div className="flex flex-col items-center justify-center gap-2 mb-12">
        <h3 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic">{title}</h3>
        <div className="h-1 w-12 bg-primary rounded-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((a) => (
          <div 
            key={a._id}
            onClick={() => navigate(`/achievements/${a._id}`)}
            className="card-premium p-8 cursor-pointer group flex flex-col items-center text-center relative overflow-hidden h-full"
          >
            <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
               <Trophy size={28} />
            </div>
            <h4 className="font-black text-gray-900 mb-3 leading-tight uppercase tracking-tighter text-lg">{a.title}</h4>
            <p className="text-xs text-gray-500 mb-3 font-medium">{a.organization}</p>
            <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mb-6">{a.date}</p>
            
            <div className="mt-auto pt-6 flex items-center gap-2 text-[10px] text-primary font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300">
               Electronic Proof <ChevronRight size={12} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="achievements" className="py-32 relative bg-gray-50/30 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="mb-20 animate-fadeUp text-center lg:text-left">
           <span className="subheading-premium">Excellence</span>
           <h2 className="heading-premium text-gray-900">Merits & <span className="text-primary">Recognition</span></h2>
        </div>

        {renderGrid("Achievements & Awards", achievements.filter(a => a.category === "achievements"), "🏆")}
        {renderGrid("Co-Curricular Activities", achievements.filter(a => a.category === "cocurricular"), "🧩")}
        {renderGrid("Extracurricular Activities", achievements.filter(a => a.category === "extracurricular"), "✨")}
      </div>
    </section>
  );
};

export default AchievementsSection;
