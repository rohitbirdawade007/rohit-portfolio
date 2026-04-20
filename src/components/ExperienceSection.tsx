import { useEffect, useState } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { getExperiences } from "@/services/api";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Experience {
  _id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
}

const ExperienceSection = () => {
  const [experience, setExperience] = useState<Experience[]>([]);

  useEffect(() => {
    getExperiences()
      .then(data => setExperience(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  return (
    <section id="experience" className="py-24 bg-transparent relative">
      <div className="container max-w-5xl">
        <div className="text-center mb-20">
           <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Professional Timeline</h2>
           <p className="text-slate-600">Trace my evolution through industry and academic projects.</p>
        </div>

        <div className="relative space-y-12">
          {/* Vertical Line */}
          <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2 hidden md:block" />

          {experience.map((exp, i) => (
            <motion.div 
              key={exp._id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0",
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              )}
            >
              {/* Content Panel */}
              <div className="w-full md:w-[45%]">
                 <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
                    <div className="flex items-center gap-3 mb-4 text-sky-500">
                       <Briefcase size={20} />
                       <span className="font-bold text-xs uppercase tracking-widest">{exp.company}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{exp.role}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                       {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                       {exp.technologies.map(tech => (
                         <span key={tech} className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-100">
                            {tech}
                         </span>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Timeline Center Dot */}
              <div className="absolute left-[23px] md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-sky-500 flex items-center justify-center z-10 shadow-lg">
                 <Calendar size={18} className="text-sky-500" />
              </div>

              {/* Date Column */}
              <div className={cn(
                "hidden md:block w-[45%]",
                i % 2 === 0 ? "text-right" : "text-left"
              )}>
                 <span className="text-2xl font-bold text-slate-300 group-hover:text-sky-500 transition-colors">
                    {exp.duration}
                 </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
