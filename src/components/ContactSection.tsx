import { useState } from "react";
import { Mail, MapPin, Phone, Github, Linkedin, Send, Twitter } from "lucide-react";
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
        toast.success("Transmission Received! Direct reply incoming soon bhai.");
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
    { icon: <Mail size={20} />, label: "Direct Frequency", value: profile?.email || 'rohitbirdawade007@gmail.com' },
    { icon: <MapPin size={20} />, label: "Base Location", value: profile?.location || 'Pune, India' },
    { icon: <Phone size={20} />, label: "Direct Line", value: profile?.phone || 'Available for projects' },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden bg-white dark:bg-[#020617]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
          
          <div className="animate-fadeUp">
            <span className="subheading-premium">Contact Interface</span>
            <h2 className="heading-premium dark:text-white">Let's <span className="text-primary italic">Connect</span> & Build.</h2>
            <p className="text-xl text-muted-foreground mt-8 leading-relaxed max-w-lg">
              Ready to take your project to next level? Skip the formalities and let's have a technical discussion bhai.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16">
              {contactItems.map((item, i) => (
                <div key={i} className="bento-item !p-6 border-white/5 bg-white/5 backdrop-blur-3xl group">
                   <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-xl mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                      {item.icon}
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{item.label}</p>
                   <p className="text-sm font-bold truncate">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-8">
               {[
                 { icon: <Github size={20} />, url: profile?.socialLinks?.github || "#" },
                 { icon: <Linkedin size={20} />, url: profile?.socialLinks?.linkedin || "#" },
                 { icon: <Twitter size={20} />, url: profile?.socialLinks?.twitter || "#" },
               ].map((s, i) => (
                 <a key={i} href={s.url} target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center glass border-white/10 text-muted-foreground hover:text-primary transition-all rounded-xl">
                   {s.icon}
                 </a>
               ))}
            </div>
          </div>

          <div className="animate-fadeUp animate-delay-200">
            <div className="glass p-8 md:p-12 rounded-[3.5rem] border-white/10 shadow-3xl bg-white/5 backdrop-blur-3xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              
              <h3 className="text-3xl font-black mb-10 tracking-tighter">Direct Transmission</h3>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Your Alias</label>
                    <Input 
                      placeholder="Rohit Birdawade" 
                      className="h-14 rounded-2xl bg-white/5 border-white/10 focus:border-primary/50 transition-all px-6 text-foreground"
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                      required 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Frequency (Email)</label>
                    <Input 
                      type="email" 
                      placeholder="rohit@ai.com" 
                      className="h-14 rounded-2xl bg-white/5 border-white/10 focus:border-primary/50 transition-all px-6 text-foreground"
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})} 
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Protocol (Message)</label>
                  <Textarea 
                    placeholder="Tell me what are we building today bhai..." 
                    className="min-h-[160px] rounded-[2rem] bg-white/5 border-white/10 focus:border-primary/50 transition-all p-8 text-foreground"
                    value={formData.message} 
                    onChange={e => setFormData({...formData, message: e.target.value})} 
                    required 
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-16 rounded-[1.5rem] bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-primary/20 transition-all active:scale-95 group"
                >
                  {isSubmitting ? 'Transmitting...' : 'Initiate Transmission'}
                  <Send size={18} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
