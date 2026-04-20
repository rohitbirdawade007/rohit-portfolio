import { useEffect, useState } from "react";
import { Briefcase, Calendar } from "lucide-react";
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
    <section id="experience" className="scroll-mt-24 mb-20">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px w-10 bg-[#1e293b]" />
        <h2 className="text-sm font-black text-[#94a3b8] uppercase tracking-[0.4em] font-mono-system shrink-0">Professional_Experience_Log</h2>
        <div className="h-px flex-1 bg-[#1e293b]" />
      </div>

      <div className="space-y-6">
          {experience.map((exp, i) => (
            <motion.div 
              key={exp._id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-8 group"
            >
              {/* Simple Timeline Dot/Line */}
              <div className="hidden md:flex flex-col items-center">
                 <div className="w-4 h-4 rounded-full border-2 border-blue-600 bg-[#020617] z-10" />
                 <div className="flex-1 w-px bg-white/10 group-last:bg-transparent" />
              </div>

              <div className="flex-1 pb-12">
                 <div className="system-module mb-0 hover:border-blue-500/30 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded bg-blue-500/10 text-blue-500 flex items-center justify-center">
                             <Briefcase size={20} />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-white uppercase tracking-tight">{exp.role}</h3>
                            <p className="text-blue-500 font-mono-system text-[10px] uppercase font-bold tracking-widest mt-1">{exp.company}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-2 text-[#94a3b8] font-mono-system font-bold text-[10px] px-3 py-1 rounded bg-white/5 border border-white/5 h-fit uppercase tracking-widest">
                          <Calendar size={12} />
                          {exp.duration}
                       </div>
                    </div>

                    <p className="text-[#94a3b8] text-xs leading-relaxed mb-6 font-mono-system">
                       {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                       {exp.technologies.map(tech => (
                         <span key={tech} className="px-3 py-1 bg-white/5 text-[#64748b] text-[10px] font-bold rounded-lg border border-white/5 uppercase tracking-wider">
                            {tech}
                         </span>
                       ))}
                    </div>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
