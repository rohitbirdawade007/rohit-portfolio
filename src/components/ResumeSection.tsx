import { Button } from "@/components/ui/button";
import { Download, FileText, ExternalLink, ZoomIn } from "lucide-react";
import { motion } from "framer-motion";

const ResumeSection = () => {
  return (
    <section id="resume" className="py-24 relative bg-[#020617] overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="subheading-premium mx-auto">Credentials</span>
          <h2 className="heading-premium text-white">Professional <span className="gradient-text-premium">Curriculum</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-6 text-sm font-medium">
            Explore my detailed professional background, academic achievements, and technical certifications.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-[3rem] border-white/5 overflow-hidden relative group"
          >
            {/* Resume Preview Placeholder / Iframe */}
            <div className="aspect-[1/1.4] md:aspect-video bg-white/5 relative overflow-hidden flex flex-col items-center justify-center p-12 text-center">
              <div className="absolute inset-0 bg-grid opacity-10" />
              
              <div className="relative z-10">
                <div className="w-20 h-20 glass rounded-3xl flex items-center justify-center text-primary mb-6 mx-auto group-hover:scale-110 transition-transform duration-500">
                  <FileText size={40} />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 italic">Resume Preview Mode</h3>
                <p className="text-gray-400 max-w-xs mx-auto text-sm leading-relaxed mb-8 font-medium">
                  The full technical resume is available for download in high-resolution PDF format.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    className="bg-white text-black hover:bg-primary hover:text-white rounded-xl px-8 h-12 font-bold uppercase tracking-widest text-[10px] transition-all"
                    onClick={() => window.open('/resume.pdf', '_blank')}
                  >
                    <Download size={16} className="mr-2" /> Download PDF
                  </Button>
                  <Button 
                    variant="outline"
                    className="glass border-white/10 text-white hover:bg-white/5 rounded-xl px-8 h-12 font-bold uppercase tracking-widest text-[10px] transition-all"
                  >
                    <ZoomIn size={16} className="mr-2" /> Full Screen
                  </Button>
                </div>
              </div>

              {/* Decorative side tags */}
              <div className="absolute top-10 right-[-40px] rotate-90 hidden md:block">
                <span className="text-[10px] font-black text-white/20 uppercase tracking-[1em]">ROHIT_RESUME_v2.0</span>
              </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="p-6 md:p-8 bg-white/5 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Last Updated: April 2024</p>
              </div>
              <div className="flex gap-3">
                {['ATS Friendly', 'System Architecture', 'AI Focused'].map(tag => (
                  <span key={tag} className="px-3 py-1 glass rounded-full text-[9px] font-black text-white/40 uppercase tracking-wider border-white/5">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
