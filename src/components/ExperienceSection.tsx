import { useEffect, useState } from "react";
import { Briefcase, Calendar, MapPin, Building, Target } from "lucide-react";
import { getExperiences } from "@/services/api";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Experience {
  _id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  techStack: string[];
}

const ExperienceSection = () => {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExperiences()
      .then(data => setExperience(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="experience" className="py-24 bg-transparent relative overflow-hidden">
      <div className="container max-w-6xl">
        <div className="text-left mb-20 px-4">
           <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase italic">Professional <span className="text-sky-500">Timeline</span></h2>
           <p className="text-slate-500 font-medium text-lg">Trace my evolution through high-impact industry and academic deployments.</p>
        </div>

        <div className="relative space-y-20 px-4">
          {/* Vertical Line */}
          <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-1 bg-slate-50 -translate-x-1/2 hidden md:block" />

          {loading ? (
             Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-40 bg-slate-50 rounded-[3rem] animate-pulse border border-slate-100" />
             ))
          ) : experience.map((exp, i) => (
            <motion.div 
              key={exp._id} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0 relative",
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              )}
            >
              {/* Content Panel */}
              <div className="w-full md:w-[46%]">
                 <div className="p-10 bg-white rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 text-sky-50 opacity-10 group-hover:opacity-20 transition-opacity"><Building size={80} /></div>
                    
                    <div className="flex items-center gap-3 mb-6">
                       <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center">
                          <Briefcase size={20} />
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Entity Log</span>
                          <span className="font-bold text-slate-900 uppercase italic tracking-tighter">{exp.company}</span>
                       </div>
                    </div>
                    
                    <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter uppercase italic group-hover:text-sky-500 transition-colors leading-tight">{exp.role}</h3>
                    
                    <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 italic border-l-2 border-slate-50 pl-6">
                       "{exp.description}"
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                       {(exp.techStack || []).map(tech => (
                         <span key={tech} className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-black rounded-full border border-slate-100 uppercase tracking-widest">
                            {tech}
                         </span>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Timeline Center Dot */}
              <div className="absolute left-[23px] md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-[2rem] bg-white border border-slate-100 flex items-center justify-center z-10 shadow-xl group hover:rotate-12 transition-transform">
                 <Calendar size={22} className="text-sky-500" />
              </div>

              {/* Date Column */}
              <div className={cn(
                "hidden md:block w-[46%]",
                i % 2 === 0 ? "text-right" : "text-left"
              )}>
                 <span className="text-5xl font-black text-slate-100 group-hover:text-sky-500/10 transition-colors tracking-tighter italic uppercase leading-none">
                    {exp.duration}
                 </span>
              </div >
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
