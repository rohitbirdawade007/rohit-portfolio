import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Github, Linkedin, Mail } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import { motion } from "framer-motion";
import Typewriter from 'typewriter-effect';

const HeroSection = () => {
  const { profile } = useProfile();
  const name = profile?.name || "Rohit Birdawade";
  const roles = ["AI & ML Engineer", "IoT Developer", "Full Stack Engineer"];

  return (
    <section id="home" className="min-h-[90vh] flex items-center justify-center pt-20 relative overflow-hidden bg-[#020617]">
      {/* Subtle Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block text-blue-500 font-semibold tracking-widest uppercase text-xs mb-6 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
              Personal Portfolio
            </span>

            <h1 className="heading-hero mb-8">
              Hi, I'm <span className="gradient-text">{name.split(' ')[0]}</span>. <br/>
              Designing <span className="text-white/90">Intelligence</span>.
            </h1>

            <div className="text-xl md:text-2xl text-[#94a3b8] mb-10 h-8 flex justify-center items-center font-medium">
              <span className="mr-2">A specialized</span>
              <span className="text-blue-500">
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

            <p className="text-lg md:text-xl text-[#94a3b8] mb-12 max-w-2xl mx-auto leading-relaxed">
              I engineer high-performance <span className="text-white">AI models</span> and <span className="text-white">IoT architectures</span>. 
              Bridging the gap between intelligent software and physical hardware.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button 
                className="btn-primary"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button 
                variant="outline"
                className="btn-secondary"
                onClick={() => window.open('/resume.pdf', '_blank')}
              >
                Download Resume <FileText size={18} className="ml-2" />
              </Button>
            </div>

            {/* Social Proof Bar */}
            <div className="mt-20 pt-10 border-t border-white/5 flex items-center justify-center gap-8 text-[#94a3b8]">
               {[
                 { icon: <Github size={20} />, url: profile?.socialLinks?.github },
                 { icon: <Linkedin size={20} />, url: profile?.socialLinks?.linkedin },
                 { icon: <Mail size={20} />, url: `mailto:${profile?.email}` },
               ].map((social, i) => (
                 <motion.a
                   key={i}
                   href={social.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   whileHover={{ y: -2, color: "#fff" }}
                   className="transition-colors"
                 >
                   {social.icon}
                 </motion.a>
               ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
