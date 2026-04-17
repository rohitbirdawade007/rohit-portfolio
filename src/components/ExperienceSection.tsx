import { useState, useEffect } from "react";
import { CalendarIcon, BriefcaseIcon, ChevronRight, Building2, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { getExperiences } from "@/services/api";

interface Experience {
  _id: string;
  company: string;
  role: string;
  duration: string;
  techStack: string[];
  description: string;
  slug?: string;
  location?: string;
}

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExperiences()
      .then(setExperiences)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="experience" className="section-padding bg-white dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fadeUp">
          <h2 className="section-heading !mb-4">Professional Experience</h2>
          <p className="text-lg text-muted-foreground">
            A track record of delivering high-quality solutions across various industries and technical environments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          {loading ? (
             <div className="space-y-8">
                {Array.from({length: 3}).map((_, i) => (
                   <div key={i} className="h-48 bg-muted/50 rounded-[2.5rem] animate-pulse" />
                ))}
             </div>
          ) : experiences.length === 0 ? (
             <p className="text-center text-gray-400 italic">No experience added yet.</p>
          ) : (
            experiences.map((experience, index) => (
              <div 
                key={experience._id} 
                className="group relative animate-fadeUp"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="glass-card p-8 md:p-12 rounded-[3rem] hover:border-primary/20 transition-all duration-500 overflow-hidden relative">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                    <BriefcaseIcon size={200} />
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                          <Building2 size={24} />
                        </span>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                            {experience.role}
                          </h3>
                          <p className="text-primary font-bold text-lg">{experience.company}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed line-clamp-2 max-w-3xl">
                        {experience.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {experience.techStack?.slice(0, 6).map((skill, skillIndex) => (
                          <span 
                            key={skillIndex} 
                            className="text-xs font-bold px-4 py-1.5 bg-muted rounded-xl text-muted-foreground border border-border group-hover:border-primary/20 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col shrink-0 lg:text-right gap-4">
                      <div className="inline-flex items-center gap-3 px-6 py-3 bg-muted/50 rounded-2xl border border-border lg:justify-end">
                        <CalendarIcon size={18} className="text-primary" />
                        <span className="text-foreground font-black tracking-tight">{experience.duration}</span>
                      </div>
                      
                      {experience.location && (
                        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground lg:justify-end">
                          <MapPin size={16} />
                          <span>{experience.location}</span>
                        </div>
                      )}

                      <Link 
                        to={`/experience/${experience.slug || experience._id}`} 
                        className="inline-flex items-center gap-2 font-bold text-primary hover:text-primary/80 transition-all lg:justify-end group/link"
                      >
                        Deep Dive <ChevronRight size={20} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
