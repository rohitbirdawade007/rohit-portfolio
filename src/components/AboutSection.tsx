import { useProfile } from "@/context/ProfileContext";
import { GraduationCap, Code2, Terminal, Cpu, Linkedin, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAssetUrl } from "@/services/api";
import { motion } from "framer-motion";

const AboutSection = () => {
  const { profile } = useProfile();
  const name = profile?.name || "Rohit Sandip Birdawade";
  const aboutText = profile?.about || "Highly motivated and results-driven Computer Science Engineer with a strong foundation in software development, data analytics, and deep learning models.";
  const profileImage = profile?.profileImage || "/profile.png";

  const skillCategories = [
    { icon: <Code2 size={20} />, title: "Languages", items: "Python, C, C++, HTML, CSS" },
    { icon: <Terminal size={20} />, title: "Tools", items: "Jupyter, Colab, Arduino, Raspberry Pi" },
    { icon: <Cpu size={20} />, title: "Tech Stack", items: "ML, Deep Learning, IoT, Data Science" },
  ];

  return (
    <section id="about" className="py-32 relative bg-[#020617] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-20 section-title-accent"
        >
           <span className="subheading-premium font-black">Background</span>
           <h2 className="heading-premium text-white">About <span className="gradient-text-premium">Me</span></h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Left Side: Profile Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-[450px] shrink-0"
          >
             <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 rounded-[3rem] translate-x-4 translate-y-4 -z-10 blur-xl group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-500" />
                <div className="glass-card rounded-[3rem] overflow-hidden border-white/5 p-4 shadow-3xl">
                   <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden relative">
                      <img 
                        src={getAssetUrl(profileImage)} 
                        alt={name}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#020617] to-transparent p-8 text-white text-center">
                         <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 rounded-full border border-white/10 mb-3 backdrop-blur-md">
                            <User size={12} className="text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Identity</span>
                         </div>
                         <h3 className="text-2xl font-black italic uppercase tracking-tighter">{name}</h3>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
             <h3 className="text-2xl font-black text-white mb-8 tracking-tight uppercase italic flex items-center gap-4">
                <span className="w-12 h-[2px] bg-primary rounded-full" />
                Engineering Intelligent Systems
             </h3>
             <div className="text-gray-400 space-y-6 leading-relaxed text-sm md:text-lg mb-12 font-medium">
                <p className="first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left">{aboutText}</p>
                <p>I specialize in bridging the gap between hardware and software, leveraging <span className="text-white font-bold">Deep Learning</span> and <span className="text-white font-bold">IoT</span> to build solutions that solve real-world problems. My approach combines academic theory with practical, hands-on engineering.</p>
             </div>

             {/* Education Timeline */}
             <div className="mb-12">
                <div className="flex items-center gap-3 mb-8">
                   <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <GraduationCap size={20} />
                   </div>
                   <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500">Academic Trajectory</span>
                </div>
                <div className="space-y-12 pl-8 border-l-2 border-primary/20 relative">
                   <div className="relative">
                      <div className="absolute -left-[41px] top-1.5 w-5 h-5 glass rounded-full border-2 border-primary shadow-[0_0_15px_rgba(59,130,246,0.5)] bg-[#020617]" />
                      <h4 className="font-black text-white uppercase tracking-tight text-xl">B.E. in Computer Science</h4>
                      <p className="text-sm text-gray-500 mt-2 font-bold uppercase tracking-wide italic">Rajgad Dnyanpeeth's SCSC Engineering, Pune</p>
                      <div className="flex flex-wrap gap-3 mt-4">
                        <span className="px-4 py-1 glass text-primary text-[10px] font-black uppercase tracking-widest rounded-full border-white/5">Class of 2025</span>
                        <span className="px-4 py-1 glass text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-full border-white/5">AI • ML • IoT</span>
                      </div>
                   </div>
                   <div className="relative opacity-60 hover:opacity-100 transition-opacity">
                      <div className="absolute -left-[41px] top-1.5 w-5 h-5 glass rounded-full border-2 border-gray-700 bg-[#020617]" />
                      <h4 className="font-black text-gray-400 uppercase tracking-tight text-lg">Higher Secondary Education</h4>
                      <p className="text-xs text-gray-500 mt-2 font-bold uppercase tracking-wide italic">Vidya Pratishthan's ASCC, Baramati</p>
                   </div>
                </div>
             </div>

             <div className="flex flex-wrap gap-4 mt-16">
                <Button 
                   className="bg-white text-black hover:bg-gray-200 rounded-2xl px-10 h-14 font-black uppercase tracking-widest text-[11px] transition-all active:scale-95 shadow-xl"
                   onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                >
                   Mastery Registry <ChevronRight size={16} className="ml-2" />
                </Button>
                <Button 
                   variant="outline"
                   className="glass border-white/10 text-white hover:bg-white/5 rounded-2xl px-10 h-14 font-black uppercase tracking-widest text-[11px] transition-all active:scale-95"
                   onClick={() => window.open(profile?.socialLinks?.linkedin || '#', '_blank')}
                >
                   <Linkedin size={16} className="mr-2 text-primary" /> Professional Network
                </Button>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
