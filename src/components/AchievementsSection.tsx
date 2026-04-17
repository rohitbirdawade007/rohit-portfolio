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
    getAchievements().then(setAchievements).catch(console.error);
  }, []);

  const renderGrid = (title: string, items: Achievement[], emoji: string) => (
    <div className="mb-20">
      <div className="flex items-center justify-center gap-3 mb-10">
        <span className="text-2xl">{emoji}</span>
        <h3 className="text-2xl font-bold text-[#1a1a1a]">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((a) => (
          <div 
            key={a._id}
            onClick={() => navigate(`/achievements/${a._id}`)}
            className="bg-white p-8 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col items-center text-center relative overflow-hidden"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 group-hover:bg-primary transition-colors" />
            <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-6">
               <Trophy size={20} />
            </div>
            <h4 className="font-bold text-gray-900 mb-2 leading-tight">{a.title}</h4>
            <p className="text-xs text-gray-500 mb-2">{a.organization}</p>
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-4">{a.date}</p>
            <div className="mt-auto pt-4 flex items-center gap-1 text-[10px] text-emerald-500 font-bold hover:underline">
               Click to view details <ChevronRight size={10} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="achievements" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-3 mb-16">
          <h2 className="text-3xl font-bold text-[#1a1a1a]">Achievements & Recognition</h2>
          <div className="h-[2px] w-12 bg-primary mt-2" />
        </div>

        {renderGrid("Achievements & Awards", achievements.filter(a => a.category === "achievements"), "🏆")}
        {renderGrid("Co-Curricular Activities", achievements.filter(a => a.category === "cocurricular"), "🧩")}
        {renderGrid("Extracurricular Activities", achievements.filter(a => a.category === "extracurricular"), "✨")}
      </div>
    </section>
  );
};

export default AchievementsSection;
