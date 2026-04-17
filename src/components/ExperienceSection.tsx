import { useEffect, useState } from "react";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";
import { getExperience } from "@/services/api";

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
    getExperience().then(setExperience).catch(console.error);
  }, []);

  return (
    <section id="experience" className="py-24 bg-white border-t border-gray-50">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex items-center gap-3 mb-20">
          <h2 className="text-3xl font-bold text-[#1a1a1a]">Internships & Experience</h2>
          <div className="h-[2px] w-12 bg-primary mt-2" />
        </div>

        <div className="space-y-12">
          {experience.map((exp, i) => (
            <div key={exp._id} className="flex gap-8 group">
              {/* Date Column */}
              <div className="w-32 shrink-0 flex flex-col items-center">
                 <div className="flex items-center justify-center gap-2 text-primary font-bold">
                    <Calendar size={16} />
                    <span className="text-sm">{exp.duration.split('-')[1]?.trim() || exp.duration}</span>
                 </div>
                 <div className="flex-1 w-[2px] bg-gray-100 my-4 group-last:bg-transparent" />
              </div>

              {/* Content Column */}
              <div className="flex-1 pb-16">
                 <div className="flex items-start gap-4 mb-3">
                    <div className="w-10 h-10 bg-blue-50 text-primary rounded-lg flex items-center justify-center shrink-0">
                       <Briefcase size={20} />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-gray-900">{exp.role}</h3>
                       <p className="text-gray-500 font-medium text-sm">{exp.company}</p>
                    </div>
                 </div>

                 <p className="text-gray-500 text-sm leading-relaxed mb-6 pl-14">
                    {exp.description}
                 </p>

                 <div className="flex flex-wrap gap-2 pl-14">
                    {exp.technologies.map(tech => (
                       <span key={tech} className="px-3 py-1 bg-blue-50 text-primary text-[10px] font-bold rounded-full border border-blue-100 uppercase tracking-widest">
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
