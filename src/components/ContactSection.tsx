import { useState } from "react";
import { Mail, MapPin, Phone, Github, Linkedin, Send, MessageSquare, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { API_URL } from "@/services/api";
import { toast } from "sonner";
import { useProfile } from "@/context/ProfileContext";

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
        toast.success("Transmission Received! I'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error("Uplink Failure. Please check your connection and try again.");
      }
    } catch (e) {
      toast.error("A system error occurred during transmission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    { icon: <Mail size={20} />, label: "Email", value: profile?.email || 'rohitbirdawade007@gmail.com', show: profile?.visibility?.showEmail !== false },
    { icon: <MapPin size={20} />, label: "Location", value: profile?.location || 'Pune, India', show: profile?.visibility?.showLocation !== false },
    { icon: <Phone size={20} />, label: "Phone", value: profile?.phone || 'Available on Request', show: profile?.visibility?.showPhone !== false },
  ].filter(item => item.show);

  return (
    <section id="contact" className="section-padding bg-white dark:bg-gray-950 transition-colors relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Information Side */}
          <div className="space-y-12 animate-fadeUp">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full mb-6">
                <MessageSquare size={14} /> Open for Collaboration
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">
                Let's Build Something <span className="text-gradient">Extraordinary</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                Whether you have a groundbreaking project in mind or just want to chat about AI/ML, my inbox is always open.
              </p>
            </div>

            <div className="space-y-6">
              {contactItems.map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-primary/20">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{item.label}</p>
                    <p className="text-lg font-bold group-hover:text-primary transition-colors">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
               {[
                 { icon: <Github size={20} />, url: profile?.socialLinks?.github || "#" },
                 { icon: <Linkedin size={20} />, url: profile?.socialLinks?.linkedin || "#" },
                 { icon: <Twitter size={20} />, url: profile?.socialLinks?.twitter || "#" },
               ].map((social, i) => (
                 <a 
                   key={i} 
                   href={social.url} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-12 h-12 flex items-center justify-center rounded-xl bg-muted text-foreground hover:bg-primary hover:text-white transition-all duration-300"
                 >
                   {social.icon}
                 </a>
               ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="animate-fadeUp animate-delay-200">
            <div className="glass-card p-8 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-primary pointer-events-none">
                <Send size={120} />
              </div>
              
              <h3 className="text-2xl font-black mb-8 tracking-tight">Direct Transmission</h3>
              
              <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Identity</label>
                   <Input 
                    placeholder="E.g. Elon Musk" 
                    className="h-14 rounded-2xl bg-muted/50 border-none focus:ring-2 focus:ring-primary/20"
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Neural Frequency (Email)</label>
                   <Input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="h-14 rounded-2xl bg-muted/50 border-none focus:ring-2 focus:ring-primary/20"
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                    required 
                  />
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Message Packet</label>
                   <Textarea 
                    placeholder="Tell me about your vision..." 
                    className="min-h-[160px] rounded-[2rem] bg-muted/50 border-none focus:ring-2 focus:ring-primary/20 p-6"
                    value={formData.message} 
                    onChange={e => setFormData({...formData, message: e.target.value})} 
                    required 
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest gap-3 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Transmitting...' : 'Send Uplink'}
                  <Send size={20} className={isSubmitting ? 'animate-pulse' : ''} />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
