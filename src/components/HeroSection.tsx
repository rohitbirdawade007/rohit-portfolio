import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import { motion } from "framer-motion";
import { getAssetUrl } from "@/services/api";
import TechMarquee from "./TechMarquee";
import TiltCard from "./TiltCard";

const HeroSection = () => {
  const { profile } = useProfile();
  const name = profile?.name || "Rohit Birdawade";

  return (
    <section id="home" className="pt-32 pb-10 md:pt-48 bg-mesh-glow relative overflow-hidden">
      {/* Premium Background Layers */}
      <div className="absolute inset-0 bg-grid-slate opacity-[0.2]" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-100/30 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Info Tile (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 bg-white/70 backdrop-blur-xl rounded-[3rem] p-10 md:p-16 border border-slate-100 shadow-sm flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 text-sky-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-10 border border-sky-100 w-fit">
               <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" /> SYSTEM READY: AVAILABLE
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.95]">
              AI <span className="text-sky-500">ENGINEER</span> <br/>
              DESIGNING <br/>
              INTELLIGENCE.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-xl leading-relaxed mb-12">
               Architecting high-performance machine learning systems and intelligent hardware interfaces for modern analytical problems.
            </p>

            <div className="flex flex-wrap gap-4">
               <Button 
                 className="btn-primary h-14 px-8"
                 onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
               >
                 View Systems <ArrowRight size={18} className="ml-2" />
               </Button>
               <Button 
                 variant="outline"
                 className="btn-secondary h-14 px-8"
                 onClick={() => window.open('/resume.pdf', '_blank')}
               >
                 Uplink CV <FileText size={18} className="ml-2" />
               </Button>
            </div>
          </motion.div>

          {/* Profile Tile (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            <TiltCard className="h-full">
              <div className="relative h-full w-full rounded-[3rem] overflow-hidden border border-slate-100 group shadow-lg">
                <img 
                  src={getAssetUrl(profile?.profileImage || "/profile.png")} 
                  alt={name}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex flex-col justify-end p-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="text-white text-2xl font-bold tracking-tight">ROHIT BIRDAWADE</h3>
                  <p className="text-sky-300 font-mono text-[10px] uppercase tracking-widest mt-1">Machine Learning Researcher</p>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Sub-Metrics Bento */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col justify-between group overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-30 transition-opacity">
              <Sparkles size={120} />
            </div>
            <div>
              <span className="text-sky-400 font-mono text-[10px] font-bold uppercase tracking-widest mb-2 block">System Performance</span>
              <h3 className="text-4xl font-black tracking-tighter">96.4%</h3>
            </div>
            <p className="text-slate-400 text-sm font-medium leading-relaxed mt-10 uppercase tracking-widest text-[9px]">Average Predictive Model Precision across production deployments</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-4 bg-sky-50 rounded-[2.5rem] p-10 border border-sky-100 flex flex-col justify-between"
          >
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-sky-500 shadow-sm mb-6">
              <FileText size={24} />
            </div>
            <div>
               <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">2+ Years</h3>
               <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Industry Experience</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-4 bg-white rounded-[2.5rem] p-10 border border-slate-100 flex flex-col justify-between shadow-sm"
          >
            <div className="flex items-center justify-between mb-8">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Node</span>
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="space-y-1">
               <p className="text-2xl font-bold text-slate-900 tracking-tighter">PUNE, IN</p>
               <p className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">LAT: 18.5204° N</p>
            </div>
          </motion.div>

        </div>
      </div>
      
      <TechMarquee />
    </section>
  );
};

export default HeroSection;
