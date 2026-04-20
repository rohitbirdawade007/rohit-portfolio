import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ChevronDown, Award, Target, Rocket } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import { Magnetic } from "./Magnetic";
import Typewriter from 'typewriter-effect';
import { motion } from "framer-motion";

const HeroSection = () => {
  const { profile } = useProfile();
  const name = profile?.name || "Rohit Sandip Birdawade";
  const githubUrl = profile?.socialLinks?.github || "#";
  const linkedinUrl = profile?.socialLinks?.linkedin || "#";
  const email = profile?.email || "";

  const roles = ["AI & ML Engineer", "IoT Developer", "Full Stack Developer", "Data Scientist"];

  return (
    <section id="home" className="min-h-screen relative flex items-center pt-24 pb-16 overflow-hidden bg-[#020617]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-600/10 rounded-full blur-[100px] animate-float-slow" />
        <div className="absolute top-[20%] right-[10%] w-[15%] h-[15%] bg-cyan-400/10 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Column: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border-white/10">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
               </span>
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Available for Collaboration</span>
            </div>

            <h1 className="text-6xl md:text-9xl font-[800] text-white mb-6 tracking-tighter leading-[0.85] uppercase italic">
               HI, I AM <br />
               <span className="gradient-text">{name.split(' ')[0]}</span>
            </h1>
            
            <div className="text-2xl md:text-4xl text-slate-400 mb-10 font-[800] h-12 flex items-center tracking-tight">
              <span className="mr-4 text-white italic">A dedicated </span>
              <span className="text-primary text-glow">
                <Typewriter
                  options={{
                    strings: roles,
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 50,
                  }}
                />
              </span>
            </div>

            <p className="text-xl text-slate-400 mb-12 max-w-xl leading-relaxed font-medium">
               Engineering intelligent systems at the intersection of <span className="text-white">AI</span> and <span className="text-white">IoT</span>. Specialized in high-accuracy modeling and real-time edge processing.
            </p>

            <div className="flex flex-wrap gap-6 mb-16">
              <Magnetic>
                <Button 
                  size="lg"
                  className="h-16 px-10 rounded-full bg-primary text-white hover:bg-primary/90 font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 shadow-[0_0_30px_rgba(59,130,246,0.5)] border-none"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Initiate Discovery
                </Button>
              </Magnetic>
              <Magnetic>
                <Button 
                  variant="outline"
                  size="lg"
                  className="h-16 px-10 rounded-full border-white/10 text-white hover:bg-white/5 font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 glass"
                  onClick={() => window.open(linkedinUrl, '_blank')}
                >
                  Establish Connection
                </Button>
              </Magnetic>
            </div>

            <div className="flex items-center gap-6">
               {[
                 { icon: <Github size={24} />, url: githubUrl },
                 { icon: <Linkedin size={24} />, url: linkedinUrl },
                 { icon: <Mail size={24} />, url: `mailto:${email}` },
               ].map((s, i) => (
                 <motion.a 
                   key={i} 
                   href={s.url} 
                   target="_blank" rel="noreferrer"
                   whileHover={{ scale: 1.2, y: -5 }}
                   className="p-3 rounded-full glass border-white/5 text-gray-400 hover:text-white transition-colors"
                 >
                   {s.icon}
                 </motion.a>
               ))}
            </div>
          </motion.div>

          {/* Right Column: Visual/Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-[550px] mx-auto">
               {/* Decorative background shapes */}
               <div className="absolute inset-0 bg-primary/20 rounded-[4rem] rotate-6 blur-md animate-pulse-slow" />
               <div className="absolute inset-0 border-2 border-primary/30 rounded-[4rem] -rotate-3 animate-float" />
               
               <div className="relative w-full h-full rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                  <img 
                    src={profile?.profileImage || "/profile.png"} 
                    alt={name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
               </div>
               
               {/* Stats Badges */}
               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.5 }}
                 className="absolute -top-10 -right-10 glass p-6 rounded-[2rem] border-white/10 shadow-[0_0_40px_rgba(34,197,94,0.2)] animate-float min-w-[180px]"
               >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-2 rounded-xl bg-accent/20 text-accent glow-secondary">
                      <Trophy size={24} />
                    </div>
                    <p className="text-3xl font-[800] text-white tracking-tighter">1st</p>
                  </div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-tight">National Prize <br/> <span className="text-accent underline">NLPC-2025</span></p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.7 }}
                 className="absolute bottom-12 -left-12 glass p-6 rounded-[2rem] border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.2)] animate-float-slow delay-500 min-w-[180px]"
               >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-2 rounded-xl bg-primary/20 text-primary glow-primary">
                      <Target size={24} />
                    </div>
                    <p className="text-3xl font-[800] text-white tracking-tighter">96%</p>
                  </div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-tight">Model Accuracy <br/> <span className="text-primary underline">Optimized</span></p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.9 }}
                 className="absolute -bottom-6 right-1/4 glass p-4 px-8 rounded-2xl border-white/5 shadow-2xl animate-pulse-slow"
               >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <p className="text-[10px] font-black text-white uppercase tracking-[0.3em]">AI Specialist <span className="text-slate-500 ml-1">/</span> IoT</p>
                  </div>
               </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
         <div 
           className="w-12 h-12 rounded-full glass flex items-center justify-center cursor-pointer hover:bg-white/10 text-gray-400 border border-white/5"
           onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
         >
            <ChevronDown size={24} />
         </div>
      </div>
    </section>
  );
};

export default HeroSection;
