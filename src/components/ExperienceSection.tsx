import { useEffect, useState } from "react";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";
import { getExperiences } from "@/services/api";

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
    <section id="experience" className="py-32 relative bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="mb-20 animate-fadeUp">
           <span className="subheading-premium">Career Path</span>
           <h2 className="heading-premium text-gray-900">Work <span className="text-primary">Experience</span></h2>
        </div>

        <div className="space-y-12">
          {experience.map((exp, i) => (
            <div key={exp._id} className="flex gap-8 group">
              {/* Timeline Connector */}
              <div className="w-1 shrink-0 flex flex-col items-center">
                 <div className="flex-1 w-[2px] bg-primary/10 my-4 group-last:bg-transparent" />
              </div>

              {/* Content Column */}
              <div className="flex-1 pb-20 relative">
                 <div className="absolute -left-[37px] top-2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg shadow-primary/20" />
                 
                 <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 glass text-primary rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                          <Briefcase size={22} />
                       </div>
                       <div>
                          <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">{exp.role}</h3>
                          <p className="text-primary font-bold text-xs uppercase tracking-widest">{exp.company}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-widest text-[10px] bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                       <Calendar size={14} />
                       <span>{exp.duration}</span>
                    </div>
                 </div>

                 <p className="text-gray-500 text-sm leading-relaxed mb-8 font-medium">
                    {exp.description}
                 </p>

                 <div className="flex flex-wrap gap-2">
                    {exp.technologies.map(tech => (
                       <span key={tech} className="px-3 py-1 bg-white text-gray-500 text-[10px] font-black rounded-full border border-gray-100 uppercase tracking-widest shadow-sm hover:border-primary transition-colors">
                          {tech}
                       </span>
                    ))}
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
