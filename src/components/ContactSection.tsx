import { motion } from "framer-motion";
import { Mail, MessageSquare, Linkedin, Github, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 bg-[#020617]">
      <div className="container">
        <div className="glass-card rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/10 blur-[100px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="subheading">Get in Touch</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">
              Let’s <span className="text-blue-500">Work Together</span>.
            </h2>
            <p className="text-[#94a3b8] text-lg max-w-xl mx-auto mb-12">
              I’m currently open to new opportunities and interesting projects. If you have a question or just want to say hi, my inbox is always open.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Button 
                className="btn-primary w-full sm:w-auto"
                onClick={() => window.location.href = "mailto:rohitbirdawade007@gmail.com"}
              >
                <Mail size={18} className="mr-2" /> Send an Email
              </Button>
              <Button 
                className="btn-secondary w-full sm:w-auto"
                onClick={() => window.open('https://linkedin.com/in/rohitbirdawade007', '_blank')}
              >
                <Linkedin size={18} className="mr-2" /> LinkedIn Profile
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
               <a href="https://github.com/rohitbirdawade007" target="_blank" className="text-white hover:text-blue-500"><Github size={24} /></a>
               <a href="#" className="text-white hover:text-blue-500"><MessageSquare size={24} /></a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
