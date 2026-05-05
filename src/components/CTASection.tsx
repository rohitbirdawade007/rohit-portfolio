import { motion } from "framer-motion";
import { ArrowRight, Send, Download, Sparkles, Zap } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "var(--canvas)" }}>
      <div className="container relative z-10">
        <div className="card overflow-hidden relative group" style={{ background: "#0A0A0A", borderRadius: "1.5rem" }}>
          {/* Animated Background Gradients */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#6C63FF]/15 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1DDBA8]/10 blur-[100px] rounded-full" />
          {/* Dot-grid overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(108,99,255,0.15) 1px, transparent 1px)", backgroundSize: "24px 24px", opacity: 0.3 }} />
          
          <div className="relative z-10 p-12 md:p-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#6C63FF]/10 border border-[#6C63FF]/20 rounded-full text-[10px] font-semibold text-[#6C63FF] uppercase tracking-widest mb-8">
                <Sparkles size={11} />
                Open to Opportunities
              </span>

              <h2 className="text-4xl md:text-6xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-6">
                Let's Build<br />
                <span style={{ background: "linear-gradient(135deg,#6C63FF,#1DDBA8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  The Future.
                </span>
              </h2>
              
              <p className="text-lg text-white/40 mb-10 max-w-xl leading-relaxed">
                Currently open to <span className="text-white font-semibold">AI Engineering</span> and <span className="text-white font-semibold">IoT Development</span> opportunities. Whether you have a specific project or just want to connect, I'm just a click away.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="h-14 px-8 rounded-xl bg-[#6C63FF] text-white font-bold text-sm flex items-center gap-2 shadow-xl shadow-[#6C63FF]/25 hover:bg-[#5B54E6] transition-colors"
                >
                  Send Message <Send size={15} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => window.open('/resume.pdf', '_blank')}
                  className="h-14 px-8 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white font-bold text-sm flex items-center gap-2 hover:bg-white/[0.1] transition-colors backdrop-blur-sm"
                >
                  Download CV <Download size={15} />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Decorative Large Text */}
          <div className="absolute -bottom-8 -right-16 text-[12rem] font-black text-white/[0.02] tracking-tighter select-none pointer-events-none uppercase leading-none">
            HIRE
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
