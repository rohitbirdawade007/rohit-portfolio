import { useEffect, useState } from "react";
import { getEducations } from "@/services/api";
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from "lucide-react";

const EducationSection = () => {
  const [educations, setEducations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const data = await getEducations();
        setEducations(data);
      } catch (err) {
        console.error("Failed to load education data");
      } finally {
        setLoading(false);
      }
    };
    fetchTimeline();
  }, []);

  if (loading) {
    return (
      <section id="education" className="py-24 bg-white dark:bg-[#020617] transition-colors">
        <div className="container mx-auto px-6 text-center">
           <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
           <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Accessing Academic Records...</p>
        </div>
      </section>
    );
  }

  if (educations.length === 0) return null;

  return (
    <section id="education" className="py-24 md:py-32 relative overflow-hidden bg-white dark:bg-[#020617]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-24 animate-fadeUp">
          <span className="subheading-premium">Academic Foundation</span>
          <h2 className="heading-premium dark:text-white">Educational <span className="text-primary italic">Architecture</span></h2>
          <p className="text-xl text-muted-foreground mt-4 leading-relaxed">
             A structured roadmap of specialized learning and domain expertise.
          </p>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          {/* Vertical Center Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary via-primary/20 to-transparent -translate-x-1/2 hidden md:block" />

          <div className="space-y-24 relative">
            {educations.map((edu, index) => (
              <div 
                key={edu._id} 
                className={`relative flex flex-col md:flex-row items-center gap-12 group animate-fadeUp ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Timeline Node */}
                <div className="absolute left-[20px] md:left-1/2 top-0 md:top-1/2 w-10 h-10 bg-white dark:bg-[#020617] border-2 border-primary/20 rounded-xl flex items-center justify-center -translate-x-[18px] md:-translate-x-1/2 md:-translate-y-1/2 z-20 group-hover:border-primary group-hover:rotate-45 transition-all duration-500 shadow-xl">
                   <GraduationCap size={18} className="text-primary transform group-hover:-rotate-45 transition-all" />
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0">
                  <div className={`bento-item border-white/5 dark:hover:bg-primary/5 transition-all duration-700 relative overflow-hidden ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                    <div className="absolute top-0 right-0 p-8 text-primary/5 pointer-events-none group-hover:text-primary/10 transition-all">
                       <Award size={100} />
                    </div>

                    <div className="flex flex-col gap-6 relative z-10">
                       <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-3 text-primary">
                             <Calendar size={14} />
                             <span className="text-[10px] font-black uppercase tracking-widest">{edu.startDate} — {edu.endDate}</span>
                          </div>
                          <h3 className="text-3xl font-black tracking-tighter leading-tight group-hover:text-primary transition-colors">
                             {edu.degree}
                          </h3>
                          <p className="text-lg font-bold text-muted-foreground italic">{edu.institution}</p>
                       </div>

                       <p className="text-sm leading-relaxed text-muted-foreground/80 line-clamp-3">
                          {edu.description}
                       </p>

                       {edu.grade && (
                         <div className="flex flex-col">
                            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">CUMULATIVE SCORE</span>
                            <span className="text-2xl font-black text-primary">{edu.grade}</span>
                         </div>
                       )}

                       {edu.location && (
                         <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            <MapPin size={12} className="text-primary/50" />
                            {edu.location}
                         </div>
                       )}
                    </div>
                  </div>
                </div>

                {/* Coursework Side (Visible on Desktop) */}
                <div className="hidden md:block w-1/2 overflow-hidden">
                   {edu.coursework && edu.coursework.length > 0 && (
                      <div className={`flex flex-wrap gap-3 ${index % 2 === 0 ? 'justify-start ml-8' : 'justify-end mr-8'}`}>
                         {edu.coursework.map((course: string, ci: number) => (
                           <div key={ci} className="glass px-5 py-3 rounded-2xl border-white/5 hover:border-primary/20 hover:bg-primary/5 transition-all group/sub animate-fadeUp" style={{ animationDelay: `${ci * 50}ms` }}>
                             <div className="flex items-center gap-2">
                                <BookOpen size={12} className="text-primary opacity-0 group-hover/sub:opacity-100 transition-opacity" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover/sub:text-white transition-colors">
                                   {course}
                                </span>
                             </div>
                           </div>
                         ))}
                      </div>
                   )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
