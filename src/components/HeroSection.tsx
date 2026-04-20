import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import { motion } from "framer-motion";
import { getAssetUrl } from "@/services/api";

const HeroSection = () => {
  const { profile } = useProfile();
  const name = profile?.name || "Rohit Birdawade";

  return (
    <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 bg-mesh-glow relative overflow-hidden">
      {/* Premium Background Layers */}
      <div className="absolute inset-0 bg-grid-slate opacity-[0.2]" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-200/20 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      
      <div className="container relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 text-sky-600 font-bold text-xs uppercase tracking-widest mb-8 border border-sky-100">
               <Sparkles size={14} className="animate-pulse" />
               Available for new opportunities
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight">
               AI & IoT <span className="text-sky-500">Solutions</span> <br/>
               Engineered for Impact
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
               I build intelligent systems that bridge the gap between AI, IoT, and high-performance software. Focused on creating real-world value through data.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
               <Button 
                 className="btn-primary w-full sm:w-auto h-14"
                 onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
               >
                 View Projects <ArrowRight size={18} className="ml-2" />
               </Button>
               <Button 
                 variant="outline"
                 className="btn-secondary w-full sm:w-auto h-14"
                 onClick={() => window.open('/resume.pdf', '_blank')}
               >
                 Download CV <FileText size={18} className="ml-2" />
               </Button>
            </div>
          </motion.div>

          {/* Visual Side: Circular Profile */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
          >
             <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] mx-auto group">
                <div className="absolute inset-0 bg-sky-100 rounded-full scale-105 group-hover:scale-110 transition-transform duration-700" />
                <div className="relative h-full w-full rounded-full overflow-hidden border-8 border-white shadow-xl">
                   <img 
                     src={getAssetUrl(profile?.profileImage || "/profile.png")} 
                     alt={name}
                     className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                   />
                </div>
                {/* Float floating badges */}
                <div className="absolute top-10 -right-4 bg-white p-4 rounded-2xl shadow-xl animate-float border border-slate-100">
                   <span className="text-[10px] font-bold text-slate-400 block mb-1">ACCURACY</span>
                   <span className="text-2xl font-bold text-sky-500">96.4%</span>
                </div>
                <div className="absolute bottom-20 -left-10 bg-white p-4 rounded-2xl shadow-xl animate-float-slow border border-slate-100">
                   <span className="text-[10px] font-bold text-slate-400 block mb-1">EXPERIENCE</span>
                   <span className="text-2xl font-bold text-slate-800">2+ Years</span>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
