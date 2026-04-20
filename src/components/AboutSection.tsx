import { useProfile } from "@/context/ProfileContext";
import { GraduationCap, Code2, Terminal, Cpu, Linkedin, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAssetUrl } from "@/services/api";
import { motion } from "framer-motion";

const AboutSection = () => {
  const { profile } = useProfile();
  const name = profile?.name || "Rohit Birdawade";
  const aboutText = profile?.about || "Highly motivated and results-driven Computer Science Engineer with a strong foundation in software development, data analytics, and deep learning models.";

  return (
    <section id="about" className="py-32 bg-[#020617]">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          {/* Visual Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden group">
               <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-all duration-700 z-10" />
               <img 
                 src={getAssetUrl(profile?.profileImage || "/profile.png")} 
                 alt={name}
                 className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
               />
               
               {/* Minimal Info Overlay */}
               <div className="absolute bottom-8 left-8 right-8 z-20">
                  <div className="glass p-6 rounded-2xl border-white/10 backdrop-blur-xl">
                     <p className="text-white font-bold text-lg mb-1">{name}</p>
                     <p className="text-blue-500 text-xs font-semibold uppercase tracking-wider">AI & IoT Specialist</p>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <span className="subheading">Background</span>
            <h2 className="heading-section mb-8">Passionate about <span className="text-blue-500">Engineering.</span></h2>
            
            <div className="space-y-6 text-[#94a3b8] leading-relaxed text-lg mb-12">
               <p>{aboutText}</p>
               <p>
                 My expertise lies in developing robust <span className="text-white font-semibold">Machine Learning</span> models and integrating them into efficient <span className="text-white font-semibold">IoT ecosystems</span>. 
                 I believe in building software that isn't just intelligent, but also reliable and scalable.
               </p>
            </div>

            {/* Education Summary */}
            <div className="mb-12 p-8 glass-card rounded-3xl border-white/5">
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Academic Background</h4>
                    <p className="text-xs text-[#94a3b8]">Class of 2025</p>
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="pl-4 border-l-2 border-blue-500/20">
                    <p className="text-white font-semibold text-sm">B.E. in Computer Science</p>
                    <p className="text-xs text-[#94a3b8]">Rajgad Dnyanpeeth's SCSC Engineering, Pune</p>
                  </div>
               </div>
            </div>

            <Button 
               className="btn-primary"
               onClick={() => window.open(profile?.socialLinks?.linkedin || '#', '_blank')}
            >
               LinkedIn Profile <ChevronRight size={18} className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
