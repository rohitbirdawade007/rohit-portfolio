import { useEffect, useState } from "react";
import { Award, Check, Trophy, Medal, BookOpen, Star, Loader2, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAchievements } from "@/services/api";

interface Achievement {
  _id: string;
  title: string;
  organization: string;
  date: string;
  type: "award" | "certification" | "workshop" | "competition" | "paper" | "leadership";
  description?: string;
  images?: string[];
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
      case "award":        return <Trophy size={22} />;
      case "competition":  return <Medal size={22} />;
      case "paper":        return <BookOpen size={22} />;
      case "leadership":   return <Star size={22} />;
      case "certification":return <Award size={22} />;
      default:             return <Check size={22} />;
    }
  };

  const byCategory = {
    achievements:    achievements.filter(a => a.category === "achievements"),
    cocurricular:    achievements.filter(a => a.category === "cocurricular"),
    extracurricular: achievements.filter(a => a.category === "extracurricular"),
  };

  if (loading) return (
    <section id="achievements" className="section-padding bg-white dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-4 flex flex-col items-center gap-6">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm">Curating Excellence...</p>
      </div>
    </section>
  );

  const renderSection = (title: string, Icon: any, items: Achievement[]) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-24 animate-fadeUp">
        <div className="flex items-center gap-4 mb-12">
           <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
              {Icon}
           </div>
           <h3 className="text-3xl font-black tracking-tight">{title}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((a, i) => (
            <div 
              key={a._id} 
              onClick={() => navigate(`/achievements/${a._id}`)}
              className="glass-card group p-8 rounded-[2.5rem] cursor-pointer hover:border-primary/30 transition-all duration-500 animate-fadeUp"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-6">
                 <div className="p-3 bg-primary/10 text-primary rounded-2xl group-hover:scale-110 transition-transform">
                    {getIcon(a.type)}
                 </div>
                 <div className="px-3 py-1 bg-muted rounded-lg text-[10px] font-black uppercase tracking-widest text-muted-foreground border border-border">
                    {a.type}
                 </div>
              </div>

              {/* Achievement Image Preview */}
              {a.image && (
                <div className="mb-6 rounded-2xl overflow-hidden h-48 bg-gray-100 dark:bg-gray-800 border border-border group-hover:border-primary/20 transition-all">
                  <img 
                    src={a.image.startsWith('http') || a.image.startsWith('/lovable-uploads') ? a.image : `http://localhost:5000${a.image}`} 
                    alt={a.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
              )}

              <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                {a.title}
              </h4>
              <p className="text-primary font-bold text-sm mb-4 line-clamp-1">{a.organization}</p>
              
              <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                  <Calendar size={14} className="text-primary" />
                  <span>{a.date}</span>
                </div>
                <span className="text-xs font-black text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  VIEW DETAILS →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="achievements" className="section-padding bg-white dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <h2 className="section-heading !mb-4">Recognition & Impact</h2>
          <p className="text-lg text-muted-foreground">
            A celebration of milestones, certifications, and high-impact contributions across my professional and academic career.
          </p>
        </div>

        {renderSection("Premier Achievements", <Trophy size={24} />, byCategory.achievements)}
        {renderSection("Co-Curricular Growth", <BookOpen size={24} />, byCategory.cocurricular)}
        {renderSection("Extracurricular Engagement", <Star size={24} />, byCategory.extracurricular)}

        {!loading && achievements.length === 0 && (
          <div className="text-center py-20 glass-card rounded-[3rem] max-w-4xl mx-auto">
             <Award size={64} className="mx-auto text-muted mb-4 opacity-20" />
             <p className="text-muted-foreground font-bold italic">No achievements data documented yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AchievementsSection;
