import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-slate-50/50">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[3rem] p-12 md:p-20 text-center border border-slate-100 shadow-2xl relative overflow-hidden">
            {/* Soft Ambient Light */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Let's Work Together</h2>
              <p className="text-slate-600 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities in AI and IoT engineering.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Button 
                  className="btn-primary w-full sm:w-auto h-14"
                  onClick={() => window.location.href = "mailto:rohitbirdawade007@gmail.com"}
                >
                  <Send size={18} className="mr-2" /> Start a Conversation
                </Button>
                <Button 
                  variant="outline"
                  className="btn-secondary w-full sm:w-auto h-14"
                  onClick={() => window.open('https://linkedin.com/in/rohitbirdawade007', '_blank')}
                >
                  <Linkedin size={18} className="mr-2" /> Connect on LinkedIn
                </Button>
              </div>

              <div className="flex items-center justify-center gap-8">
                 {[
                   { icon: <Github size={24} />, url: "https://github.com/rohitbirdawade007", label: "GitHub" },
                   { icon: <Linkedin size={24} />, url: "https://linkedin.com/in/rohitbirdawade007", label: "LinkedIn" },
                   { icon: <MessageCircle size={24} />, url: "#", label: "WhatsApp" },
                 ].map((social, i) => (
                   <a 
                     key={i} 
                     href={social.url} 
                     target="_blank" 
                     className="text-slate-400 hover:text-sky-500 transition-colors flex flex-col items-center gap-2"
                   >
                     {social.icon}
                     <span className="text-[10px] font-bold uppercase tracking-widest">{social.label}</span>
                   </a>
                 ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
