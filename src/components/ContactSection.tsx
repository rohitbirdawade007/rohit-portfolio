import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { sendMessage } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    try {
      await sendMessage(form);
      toast({ title: "Message sent!", description: "I'll get back to you within 24 hours." });
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast({ title: "Error", description: "Failed to send. Email me directly.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const socials = [
    { icon: <Github size={16} />,   label: "GitHub",   sub: "@rohitbirdawade007",        url: "https://github.com/rohitbirdawade007" },
    { icon: <Linkedin size={16} />, label: "LinkedIn", sub: "rohitbirdawade007",          url: "https://linkedin.com/in/rohitbirdawade007" },
    { icon: <Mail size={16} />,     label: "Email",    sub: "rohitbirdawade007@gmail.com",url: "mailto:rohitbirdawade007@gmail.com" },
  ];

  return (
    <section id="contact" className="py-28 relative" style={{ background: "var(--canvas)" }}>
      <div className="absolute inset-0 bg-dot-grid opacity-[0.25] pointer-events-none" />

      <div className="container relative">
        {/* Label */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label">
          <span className="eyebrow"><span className="eyebrow-dot" />Connect Panel</span>
        </motion.div>

        {/* Headline */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="mb-14">
          <h2 className="text-[clamp(2.25rem,4vw,3.5rem)] font-black tracking-[-0.04em] leading-[1.05]">
            Let's Build{" "}
            <span style={{ background: "linear-gradient(135deg,#1A56DB,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Together
            </span>
          </h2>
          <p className="text-[#737373] mt-3 text-[15px] max-w-lg">
            Open to AI projects, data science roles, research collaborations, or just a conversation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-5xl">

          {/* ── Left: Info + Socials ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Quick info card */}
            <div className="card p-6 space-y-5">
              {[
                { icon: <MapPin size={14} className="text-[#1A56DB]" />, label: "Location", value: "Pune, Maharashtra, India" },
                { icon: <Clock size={14} className="text-emerald-500" />, label: "Response Time", value: "Within 24 hours" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F5] border border-[#EBEBEB] flex items-center justify-center shrink-0">{item.icon}</div>
                  <div>
                    <p className="mono text-[10px] font-semibold text-[#A3A3A3] uppercase tracking-widest mb-0.5">{item.label}</p>
                    <p className="text-[13px] font-medium text-[#404040]">{item.value}</p>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-2 pt-1 border-t border-[#F0F0EE]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(5,150,105,0.5)]" />
                <span className="text-[11px] font-semibold text-emerald-700">Available · Open to opportunities</span>
              </div>
            </div>

            {/* Social links */}
            <div className="space-y-2">
              {socials.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 3 }}
                  className="flex items-center gap-3 p-4 card group hover:border-[#BFDBFE] transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F5] border border-[#EBEBEB] flex items-center justify-center text-[#737373] group-hover:bg-[#0A0A0A] group-hover:text-white group-hover:border-transparent transition-all shrink-0">
                    {s.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="mono text-[9px] font-semibold text-[#A3A3A3] uppercase tracking-widest">{s.label}</p>
                    <p className="text-[12px] font-semibold text-[#404040] truncate group-hover:text-[#1A56DB] transition-colors">{s.sub}</p>
                  </div>
                  <ArrowUpRight size={13} className="text-[#A3A3A3] group-hover:text-[#1A56DB] shrink-0 transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="card p-8">
              <h3 className="text-[15px] font-bold text-[#0A0A0A] mb-6">Send a message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Name",  value: form.name,  key: "name",  type: "text",  placeholder: "Your name" },
                    { label: "Email", value: form.email, key: "email", type: "email", placeholder: "your@email.com" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="mono text-[10px] font-semibold text-[#A3A3A3] uppercase tracking-widest block mb-1.5">{f.label}</label>
                      <input
                        type={f.type}
                        value={f.value}
                        onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        required
                        className="w-full px-4 py-3 bg-[#F7F7F5] border border-[#E5E5E5] rounded-xl text-[13px] text-[#0A0A0A] placeholder-[#A3A3A3] focus:outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-[#1A56DB]/15 transition-all"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="mono text-[10px] font-semibold text-[#A3A3A3] uppercase tracking-widest block mb-1.5">Message</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell me about your project or idea..."
                    required rows={5}
                    className="w-full px-4 py-3 bg-[#F7F7F5] border border-[#E5E5E5] rounded-xl text-[13px] text-[#0A0A0A] placeholder-[#A3A3A3] focus:outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-[#1A56DB]/15 transition-all resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending
                    ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                    : <><Send size={14} /> Send Message</>
                  }
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
