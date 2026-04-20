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
    <section id="experience" className="py-32 bg-[#020617]">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
           <span className="subheading">Career Journey</span>
           <h2 className="heading-section">Professional <span className="text-blue-500">Trajectory</span></h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-12">
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
                 <div className="glass-card p-8 hover:bg-white/[0.04]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                       <div>
                          <h3 className="text-xl font-bold text-white tracking-tight">{exp.role}</h3>
                          <p className="text-blue-500 font-semibold text-sm mt-1">{exp.company}</p>
                       </div>
                       <div className="flex items-center gap-2 text-[#94a3b8] font-semibold text-xs px-4 py-1.5 rounded-full bg-white/5 border border-white/5 h-fit">
                          <Calendar size={14} />
                          {exp.duration}
                       </div>
                    </div>

                    <p className="text-[#94a3b8] text-sm leading-relaxed mb-8">
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
