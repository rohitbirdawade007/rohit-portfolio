import React, { useEffect, useState } from "react";
import { getEducations } from "@/services/api";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";
import LoadingSkeleton from "./LoadingSkeleton";

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
      <section id="education" className="section-padding bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4"><LoadingSkeleton type="timeline" /></div>
      </section>
    );
  }

  if (educations.length === 0) return null;

  return (
    <section id="education" className="section-padding bg-gray-50 dark:bg-gray-900/30 transition-colors">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fadeUp">
          <h2 className="section-heading !mb-4">Education Journey</h2>
          <p className="text-lg text-muted-foreground">
            A solid academic foundation that fuels my technical expertise and problem-solving capabilities.
          </p>
        </div>
        
        <div className="relative border-l-4 border-primary/20 ml-4 md:ml-12 space-y-16 py-4">
          {educations.map((edu, index) => (
            <div key={edu._id} className="relative pl-10 md:pl-16 animate-fadeUp" style={{ animationDelay: `${index * 150}ms` }}>
              {/* Timeline Indicator */}
              <div className="absolute -left-[22px] top-0 w-10 h-10 bg-white dark:bg-gray-950 rounded-2xl flex items-center justify-center border-4 border-primary/20 group hover:border-primary transition-colors z-10 shadow-xl">
                 <div className="w-full h-full rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <GraduationCap size={20} />
                 </div>
              </div>

              {/* Content Card */}
              <div className="glass-card !bg-white/80 dark:!bg-white/[0.03] p-8 md:p-10 rounded-[2.5rem] hover:shadow-2xl transition-all duration-500 group">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-lg">
                      <Award size={14} /> Academic Excellence
                    </div>
                    <h3 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                      {edu.degree}
                    </h3>
                    <p className="text-xl font-bold text-primary italic">
                      {edu.institution}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-3 shrink-0 md:text-right">
                    <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground bg-muted/50 px-4 py-2 rounded-xl w-fit md:ml-auto border border-border">
                      <Calendar size={16} className="text-primary" />
                      <span>{edu.startDate} — {edu.endDate}</span>
                    </div>
                    {edu.location && (
                      <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground md:justify-end">
                        <MapPin size={16} />
                        <span>{edu.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {edu.grade && (
                  <div className="mb-8 p-4 bg-primary/5 rounded-2xl border border-primary/10 w-fit">
                    <span className="text-sm font-bold text-muted-foreground block mb-1">CUMULATIVE GRADE</span>
                    <span className="text-2xl font-black text-primary">{edu.grade}</span>
                  </div>
                )}

                <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                    {edu.description}
                  </p>
                </div>

                {edu.coursework && edu.coursework.length > 0 && (
                  <div className="pt-8 border-t border-border">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                      Key Competencies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course: string, i: number) => (
                        <span key={i} className="text-xs font-bold bg-white dark:bg-gray-900 text-foreground px-4 py-2 rounded-xl border border-border shadow-sm hover:border-primary/30 transition-colors">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
