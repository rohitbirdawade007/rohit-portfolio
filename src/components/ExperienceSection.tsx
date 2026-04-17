import { useState, useEffect } from "react";
import { CalendarIcon, BriefcaseIcon, ChevronRight, Building2, MapPin } from "lucide-react";
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
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden bg-[#0a0a0a] text-white">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-24 animate-fadeUp">
          <span className="subheading-premium text-primary/80">Career Timeline</span>
          <h2 className="heading-premium text-white">Professional <span className="text-primary italic">Trajectory</span></h2>
          <p className="text-xl text-white/50 mt-6 leading-relaxed max-w-xl">
             A record of industrial excellence and technical leadership in intelligent system development.
          </p>
        </div>
        
        <div className="space-y-12 max-w-7xl mx-auto">
          {loading ? (
             <div className="space-y-8">
                {Array.from({length: 2}).map((_, i) => (
                   <div key={i} className="h-64 bg-white/5 rounded-[3rem] animate-pulse" />
                ))}
             </div>
          ) : experiences.length === 0 ? (
             <p className="text-center text-white/30 italic">No historical records found.</p>
          ) : (
            experiences.map((exp, index) => (
              <div 
                key={exp._id} 
                className="group relative animate-fadeUp"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="glass p-8 md:p-12 rounded-[3.5rem] border-white/5 bg-white/2 hover:border-primary/30 transition-all duration-700 overflow-hidden relative">
                  <div className="absolute -top-10 -right-10 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                    <BriefcaseIcon size={250} />
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 relative z-10">
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                          <Building2 size={28} />
                        </div>
                        <div>
                          <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight group-hover:text-primary transition-colors">
                            {exp.role}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 mt-1">
                             <p className="text-white/80 font-bold text-lg">{exp.company}</p>
                             <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
                             {exp.location && (
                                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-white/40">
                                   <MapPin size={12} /> {exp.location}
                                </div>
                             )}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-4xl line-clamp-3">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-3 pt-2">
                        {exp.techStack?.slice(0, 8).map((skill, si) => (
                          <span 
                            key={si} 
                            className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-white/5 rounded-xl text-white/60 border border-white/5 group-hover:border-primary/20 transition-all"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col shrink-0 lg:text-right gap-6 pt-6 lg:pt-0 border-t lg:border-t-0 border-white/5">
                      <div className="flex flex-col gap-1">
                         <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Service Duration</span>
                         <div className="text-2xl font-black text-white tracking-tighter flex items-center lg:justify-end gap-2">
                            <CalendarIcon size={20} className="text-primary" />
                            {exp.duration}
                         </div>
                      </div>
                      
                      <Link 
                        to={`/experience/${exp.slug || exp._id}`} 
                        className="group/link inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 text-xs font-black uppercase tracking-widest text-white transition-all lg:justify-center overflow-hidden relative"
                      >
                        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-primary scale-x-0 group-hover/link:scale-x-100 transition-transform" />
                        Operation Brief <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
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
