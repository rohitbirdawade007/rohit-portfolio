import { useEffect, useState } from "react";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";
import { getExperiences } from "@/services/api";
import { motion } from "framer-motion";

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
    <section id="experience" className="py-32 relative bg-[#020617] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-20 section-title-accent"
        >
           <span className="subheading-premium font-black">Career Path</span>
           <h2 className="heading-premium text-white">Work <span className="gradient-text-premium">Experience</span></h2>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-16">
          {experience.map((exp, i) => (
            <motion.div 
              key={exp._id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-8 group relative"
            >
              {/* Timeline Connector */}
              <div className="hidden md:flex w-1 shrink-0 flex flex-col items-center">
                 <div className="flex-1 w-[2px] bg-white/5 my-4 group-last:bg-transparent" />
              </div>

              {/* Content Column */}
              <div className="flex-1 pb-16 relative">
                 <div className="absolute -left-[45px] top-6 w-4 h-4 glass rounded-full border-2 border-primary shadow-[0_0_10px_rgba(59,130,246,0.5)] z-10 hidden md:block" />
                 
                 <div className="glass-card p-8 rounded-[2.5rem] border-white/5 hover:border-primary/30 transition-all duration-500">
                   <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                      <div className="flex items-center gap-5">
                         <div className="w-14 h-14 glass text-primary rounded-2xl flex items-center justify-center shrink-0 border-white/10 group-hover:bg-primary group-hover:text-white transition-all">
                            <Briefcase size={24} />
                         </div>
                         <div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">{exp.role}</h3>
                            <p className="text-primary font-bold text-sm uppercase tracking-widest mt-1">{exp.company}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-3 text-gray-400 font-bold uppercase tracking-widest text-[10px] glass px-5 py-2.5 rounded-full border-white/10 h-fit">
                         <Calendar size={14} className="text-primary" />
                         <span>{exp.duration}</span>
                      </div>
                   </div>

                   <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium">
                      {exp.description}
                   </p>

                   <div className="flex flex-wrap gap-3">
                      {exp.technologies.map(tech => (
                        <span key={tech} className="px-4 py-1.5 glass text-gray-500 text-[10px] font-black rounded-xl border-white/5 uppercase tracking-widest group-hover:text-white group-hover:border-primary/20 transition-all">
                           {tech}
                        </span>
                      ))}
                   </div>
                 </div>
              </div>
            </motion.div>
          ))}
          {experience.length === 0 && (
            <div className="text-center py-20 glass rounded-[3rem] border-white/5">
              <p className="text-gray-500 text-sm font-black uppercase tracking-widest italic">Experience records currently under encryption...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
