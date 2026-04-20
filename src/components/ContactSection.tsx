import { useState } from "react";
import { Mail, MapPin, Phone, Github, Linkedin, Send, Twitter, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { API_URL } from "@/services/api";
import { toast } from "sonner";
import { useProfile } from "@/context/ProfileContext";
import { motion } from "framer-motion";

const ContactSection = () => {
  const { profile } = useProfile();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        toast.success("Transmission Received! Direct reply incoming soon.");
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error("Uplink Failure. Server is down or connection issue.");
      }
    } catch (e) {
      toast.error("A system error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    { icon: <Mail size={18} />, label: "Frequency", value: profile?.email || 'rohitbirdawade007@gmail.com' },
    { icon: <MapPin size={18} />, label: "Location", value: profile?.location || 'Pune, India' },
    { icon: <Phone size={18} />, label: "Direct Line", value: profile?.phone || 'Available for projects' },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden bg-[#020617]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-7xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="section-title-accent"
          >
            <span className="subheading-premium font-black">Contact Interface</span>
            <h2 className="heading-premium text-white">Let's <span className="gradient-text-premium italic">Connect</span> <br /> & Build.</h2>
            <p className="text-lg text-gray-400 mt-8 leading-relaxed max-w-lg font-medium">
              Ready to take your project to next level? Skip the formalities and let's have a technical discussion about your vision.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16">
              {contactItems.map((item, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.02 }}
                  className="glass-card !p-6 border-white/5 bg-white/5 backdrop-blur-3xl group"
                >
                   <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-xl mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                      {item.icon}
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{item.label}</p>
                   <p className="text-[13px] font-bold text-white truncate">{item.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4 mt-10">
               {[
                 { icon: <Github size={20} />, url: profile?.socialLinks?.github || "#" },
                 { icon: <Linkedin size={20} />, url: profile?.socialLinks?.linkedin || "#" },
                 { icon: <Twitter size={20} />, url: profile?.socialLinks?.twitter || "#" },
               ].map((s, i) => (
                 <motion.a 
                   key={i} 
                   href={s.url} 
                   target="_blank" 
                   rel="noreferrer" 
                   whileHover={{ scale: 1.1, y: -2 }}
                   className="w-12 h-12 flex items-center justify-center glass border-white/10 text-gray-400 hover:text-white transition-all rounded-2xl"
                 >
                   {s.icon}
                 </motion.a>
               ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card p-8 md:p-12 rounded-[3.5rem] border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 rounded-2xl bg-white/5 text-primary">
                  <MessageSquare size={24} />
                </div>
                <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic">Direct Message</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Input 
                      placeholder="Your Name" 
                      className="h-14 rounded-2xl bg-white/5 border-white/10 focus:border-primary/50 transition-all px-6 text-white placeholder:text-gray-600"
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                      required 
                    />
                  </div>
                  <div className="space-y-3">
                    <Input 
                      type="email" 
                      placeholder="Your Frequency (Email)" 
                      className="h-14 rounded-2xl bg-white/5 border-white/10 focus:border-primary/50 transition-all px-6 text-white placeholder:text-gray-600"
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})} 
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Textarea 
                    placeholder="Tell me what are we building today..." 
                    className="min-h-[160px] rounded-[2rem] bg-white/5 border-white/10 focus:border-primary/50 transition-all p-8 text-white placeholder:text-gray-600"
                    value={formData.message} 
                    onChange={e => setFormData({...formData, message: e.target.value})} 
                    required 
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-2xl bg-white text-black hover:bg-primary hover:text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl transition-all active:scale-95 group"
                >
                  {isSubmitting ? 'Transmitting...' : 'Initiate Transmission'}
                  <Send size={16} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
