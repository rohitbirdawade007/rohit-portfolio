import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Send, Download } from "lucide-react";
import Magnetic from "./Magnetic";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#020617]">
      <div className="container relative z-10 px-6">
        <div className="glass-card rounded-[3rem] p-12 md:p-24 relative overflow-hidden group">
          {/* Animated Background Gradients */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 blur-[100px] animate-float-slow" />
          
          <div className="relative z-10 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="subheading-premium">Next Steps</span>
              <h2 className="text-4xl md:text-7xl font-[800] text-white tracking-tighter leading-none mb-8 italic uppercase">
                Let's Build <br/>  
                <span className="gradient-text">The Future.</span>
              </h2>
              
              <p className="text-xl text-slate-400 mb-12 max-w-2xl leading-relaxed">
                Currently open to <span className="text-white">AI Engineering</span> and <span className="text-white">IoT Development</span> opportunities. Whether you have a specific project or just want to connect, I'm just a click away.
              </p>
              
              <div className="flex flex-wrap gap-6">
                <Magnetic>
                  <Button 
                    size="lg"
                    className="h-16 px-10 rounded-full bg-primary text-white hover:bg-primary/90 font-black uppercase tracking-widest text-[10px] shadow-[0_0_30px_rgba(59,130,246,0.3)] border-none group"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Send Message <Send size={16} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </Magnetic>
                
                <Magnetic>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="h-16 px-10 rounded-full border-white/10 text-white hover:bg-white/5 font-black uppercase tracking-widest text-[10px] glass"
                    onClick={() => window.open('/resume.pdf', '_blank')}
                  >
                    Download CV <Download size={16} className="ml-3 text-primary animate-bounce-slow" />
                  </Button>
                </Magnetic>
              </div>
            </motion.div>
          </div>

          {/* Decorative Large Text */}
          <div className="absolute -bottom-10 -right-20 text-[15rem] font-black text-white/[0.02] tracking-tighter select-none pointer-events-none uppercase italic leading-none">
            HIRE
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
