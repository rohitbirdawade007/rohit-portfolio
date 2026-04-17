import { useEffect, useState } from "react";
import { Award, Trophy, Medal, BookOpen, Star, Sparkles, ChevronRight, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAchievements } from "@/services/api";

interface Achievement {
  _id: string;
  title: string;
  organization: string;
  date: string;
  type: "award" | "certification" | "workshop" | "competition" | "paper" | "leadership";
  description?: string;
  image?: string;
  category: "achievements" | "cocurricular" | "extracurricular";
}

const AchievementsSection = () => {
  const navigate = useNavigate();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAchievements()
      .then(setAchievements)
      .catch((err) => console.error("Failed to load achievements:", err))
      .finally(() => setLoading(false));
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "award":        return <Trophy size={20} />;
      case "competition":  return <Medal size={20} />;
      case "paper":        return <BookOpen size={20} />;
      case "leadership":   return <Star size={20} />;
      case "certification":return <Award size={20} />;
      default:             return <Sparkles size={20} />;
    }
  };

  const renderGrid = (title: string, items: Achievement[]) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-24 animate-fadeUp">
        <div className="flex items-center gap-4 mb-12">
           <div className="w-[2px] h-10 bg-primary" />
           <h3 className="text-3xl font-black uppercase tracking-tighter dark:text-white leading-[0.8] italic">
             {title}
           </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((a, i) => (
            <div 
              key={a._id} 
              onClick={() => navigate(`/achievements/${a._id}`)}
              className="bento-item border-white/5 dark:hover:bg-primary/5 cursor-pointer group transition-all duration-700 animate-fadeUp relative overflow-hidden h-full flex flex-col"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-8">
                 <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                    {getIcon(a.type)}
                 </div>
                 <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-muted-foreground group-hover:text-white transition-colors">
                    {a.type}
                 </span>
              </div>

              {a.image && (
                <div className="mb-8 rounded-2xl overflow-hidden h-48 bg-white/2 border border-white/5 group-hover:border-primary/20 transition-all shadow-inner">
                  <img 
                    src={a.image.startsWith('http') ? a.image : `https://rohit-portfolio-qgd8.onrender.com${a.image}`} 
                    alt={a.title} 
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                  />
                </div>
              )}

              <h4 className="text-2xl font-black mb-3 tracking-tighter leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {a.title}
              </h4>
              <p className="text-primary/70 font-black text-xs uppercase tracking-widest mb-6">{a.organization}</p>
              
              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-white transition-colors">
                  <Calendar size={12} className="text-primary/50" />
                  {a.date}
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all transform group-hover:translate-x-1">
                   <ChevronRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const byCategory = {
    achievements:    achievements.filter(a => a.category === "achievements"),
    cocurricular:    achievements.filter(a => a.category === "cocurricular"),
    extracurricular: achievements.filter(a => a.category === "extracurricular"),
  };

  return (
    <section id="achievements" className="py-24 md:py-32 relative overflow-hidden bg-white dark:bg-[#020617]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-24 animate-fadeUp">
          <span className="subheading-premium">Medals of Excellence</span>
          <h2 className="heading-premium dark:text-white">Honors <span className="text-primary italic">&</span> Impacts</h2>
          <p className="text-xl text-muted-foreground mt-4 leading-relaxed">
             Documenting the milestones and recognition received throughout my technical journey.
          </p>
        </div>

        {renderGrid("Premier Awards", byCategory.achievements)}
        {renderGrid("Co-Curricular Growth", byCategory.cocurricular)}
        {renderGrid("Extracurricular Engagement", byCategory.extracurricular)}

        {!loading && achievements.length === 0 && (
          <div className="bento-item max-w-4xl mx-auto py-20 text-center border-white/5 animate-fadeUp">
             <Trophy size={64} className="mx-auto text-primary/10 mb-6" />
             <p className="text-muted-foreground font-black uppercase tracking-[0.2em] text-xs">Awaiting data archives...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AchievementsSection;
