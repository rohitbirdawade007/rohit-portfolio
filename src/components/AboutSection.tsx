import { useProfile } from "@/context/ProfileContext";
import { GraduationCap, Code2, Terminal, Cpu, ChevronRight, User, Target, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAssetUrl } from "@/services/api";
import { motion } from "framer-motion";

const AboutSection = () => {
  const { profile } = useProfile();
  const name = profile?.name || "Rohit Birdawade";
  const aboutText = profile?.about || "Highly motivated and results-driven Computer Science Engineer with a strong foundation in software development, data analytics, and deep learning models.";

  const highlights = [
    { icon: <Target size={20} className="text-sky-500" />, title: "Precision Models", desc: "Specialized in 95%+ accuracy architectures." },
    { icon: <Cpu size={20} className="text-sky-500" />, title: "IoT Orchestration", desc: "Expertise in sensor integration and ESP32." },
    { icon: <Award size={20} className="text-sky-500" />, title: "National Honor", desc: "1st Prize Winner at NLPC-2025." },
  ];

  return (
    <section id="about" className="py-24 bg-slate-50/50">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Visual Side */}
          <div className="w-full lg:w-5/12">
             <div className="relative">
                <div className="absolute -inset-4 bg-sky-200 rounded-[3rem] blur-2xl opacity-20" />
                <div className="relative bg-white p-4 rounded-[3rem] border border-slate-200 shadow-xl overflow-hidden group">
                   <img 
                     src={getAssetUrl(profile?.profileImage || "/profile.png")} 
                     alt={name}
                     className="w-full h-auto rounded-[2rem] grayscale group-hover:grayscale-0 transition-all duration-700"
                   />
                </div>
             </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-7/12">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-sky-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-6 border border-slate-200">
                <User size={14} /> My Story
             </div>
             
             <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                Pioneering the future of <br/>
                <span className="text-sky-500 italic font-medium">Intelligent Engineering.</span>
             </h2>

             <div className="text-slate-600 space-y-6 text-lg mb-10 leading-relaxed font-medium">
                <p>{aboutText}</p>
                <p>
                  I specialize in building low-latency AI solutions at the edge. My work combines academic rigor with practical deployment experience in both deep learning and hardware engineering.
                </p>
             </div>

             {/* Highlights Grid */}
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                {highlights.map((item, i) => (
                  <div key={i} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                     <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center mb-4">
                        {item.icon}
                     </div>
                     <h4 className="text-slate-900 font-bold text-sm mb-2">{item.title}</h4>
                     <p className="text-slate-500 text-[11px] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
             </div>

             <Button 
                className="btn-primary"
                onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Deep Dive into Skills <ChevronRight size={18} className="ml-2" />
             </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
