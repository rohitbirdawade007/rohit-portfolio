import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Trophy, Target, Activity, Cpu, Database, ChevronDown } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import { Magnetic } from "./Magnetic";
import Typewriter from 'typewriter-effect';
import { motion } from "framer-motion";

const HeroSection = () => {
  const { profile } = useProfile();
  const name = profile?.name || "Rohit Birdawade";
  const roles = ["AI & ML Engineer", "IoT Developer", "Full Stack Developer", "AI Product Designer"];
  
  return (
    <section id="home" className="min-h-screen relative flex items-center pt-32 pb-20 overflow-hidden bg-[#020617]">
      {/* Background Ambience */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 blur-[130px] rounded-full pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 blur-[130px] rounded-full pointer-events-none animate-float-slow" />
      
      <div className="container relative z-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Column: Messaging */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full border-white/10 mb-8 animate-fadeUp">
               <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Strategic AI Intelligence Deployed</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-[800] text-white mb-8 tracking-tighter leading-[0.8] uppercase italic">
               <span className="text-slate-500 block text-3xl md:text-4xl not-italic mb-3 tracking-[0.2em] font-black">Engineering</span>
               <span className="gradient-text">{name.split(' ')[0]}</span> <br/>
               <span className="text-white">EDGE.</span>
            </h1>
            
            <div className="text-2xl md:text-4xl text-slate-400 mb-10 font-[800] h-12 flex items-center tracking-tight">
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
               Designing high-performance <span className="text-white">AI models</span> and <span className="text-white">IoT ecosystems</span> for decentralized automation. Delivering mission-critical intelligence at scale.
            </p>

            <div className="flex flex-wrap gap-6 mb-12">
              <Magnetic>
                <Button 
                  size="lg"
                  className="h-16 px-10 rounded-full bg-primary text-white hover:bg-primary/90 font-black uppercase tracking-widest text-[10px] shadow-[0_0_30px_rgba(59,130,246,0.3)] border-none group"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Projects <ArrowRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Magnetic>
              <Magnetic>
                <Button 
                  variant="outline"
                  size="lg"
                  className="h-16 px-10 rounded-full border-white/10 text-white hover:bg-white/5 font-black uppercase tracking-widest text-[10px] glass group"
                  onClick={() => window.open('/resume.pdf', '_blank')}
                >
                  Download Resume <Download size={16} className="ml-3 text-primary group-hover:translate-y-1 transition-transform" />
                </Button>
              </Magnetic>
            </div>
          </motion.div>

          {/* Right Column: Premium Visual Dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 glass-card rounded-[4rem] p-10 border-white/5 shadow-3xl aspect-square flex flex-col group overflow-hidden">
               {/* Dashboard Content */}
               <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                     <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center glow-primary transition-transform group-hover:scale-110">
                        <Activity size={28} />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Status: Operational</p>
                        <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">AI Node 01</h3>
                     </div>
                  </div>
                  <div className="flex items-center gap-2 glass px-4 py-2 rounded-xl text-[10px] font-black text-accent border-white/10">
                     <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                     LIVE
                  </div>
               </div>

               {/* Simulated Data Stream */}
               <div className="flex-grow flex items-end gap-3 mb-10 h-48">
                  {[40, 65, 45, 90, 55, 75, 96, 80, 88].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.6 + (i * 0.1), duration: 1.5, ease: "circOut" }}
                      className={`flex-1 rounded-t-2xl bg-gradient-to-t ${i === 6 ? 'from-accent/40 to-accent shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'from-primary/10 to-primary/50'}`}
                    />
                  ))}
               </div>

               <div className="grid grid-cols-2 gap-6">
                  <div className="glass p-6 rounded-3xl border-white/5 relative overflow-hidden group/item">
                     <div className="absolute top-0 right-0 p-2 text-accent/20">
                        <Database size={32} />
                     </div>
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Model Accuracy</p>
                     <p className="text-3xl font-[800] text-accent tracking-tighter italic">96.4%</p>
                  </div>
                  <div className="glass p-6 rounded-3xl border-white/5 relative overflow-hidden group/item">
                     <div className="absolute top-0 right-0 p-2 text-primary/20">
                        <Cpu size={32} />
                     </div>
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Edge Latency</p>
                     <p className="text-3xl font-[800] text-primary tracking-tighter italic">12ms</p>
                  </div>
               </div>

               {/* Float Floating Achievement Badges */}
               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 1, duration: 0.8 }}
                 className="absolute -top-6 -right-6 glass p-6 rounded-[2.5rem] border-white/10 shadow-[0_0_40px_rgba(234,179,8,0.2)] animate-float"
               >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-yellow-500/20 text-yellow-500 shadow-lg shadow-yellow-500/20">
                      <Trophy size={24} />
                    </div>
                    <div>
                      <p className="text-2xl font-[800] text-white tracking-tighter italic">1st</p>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Prize NLPC-2025</p>
                    </div>
                  </div>
               </motion.div>
            </div>

            {/* Background Halo */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[120px] scale-90 -z-10 animate-pulse-slow" />
          </motion.div>

        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
         <div 
           className="w-12 h-12 rounded-full glass flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-all text-slate-500 border border-white/10"
           onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
         >
            <ChevronDown size={24} />
         </div>
      </div>
    </section>
  );
};

export default HeroSection;
