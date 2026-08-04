import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, MapPin, Clock, ArrowUpRight, Rocket } from "lucide-react";
import { sendMessage } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/context/ProfileContext";

const ContactSection = () => {
  const { profile } = useProfile();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    try {
      await sendMessage(form);
      toast({ title: "Message sent! 🚀", description: "I'll get back to you within 24 hours." });
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast({ title: "Error", description: "Failed to send. Email me directly.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const getUsername = (url: string | undefined, defaultName: string) => {
    if (!url) return defaultName;
    try {
      const parts = url.split('/').filter(Boolean);
      return parts[parts.length - 1];
    } catch {
      return defaultName;
    }
  };

  const socials = [
    { icon: <Github size={16} />,   label: "GitHub",   sub: `@${getUsername(profile?.socialLinks?.github, "rohitbirdawade007")}`, url: profile?.socialLinks?.github || "https://github.com/rohitbirdawade007",  color: "#24292e" },
    { icon: <Linkedin size={16} />, label: "LinkedIn", sub: getUsername(profile?.socialLinks?.linkedin, "rohitbirdawade007"), url: profile?.socialLinks?.linkedin || "https://linkedin.com/in/rohitbirdawade007", color: "#0A66C2" },
    { icon: <Mail size={16} />,     label: "Email",    sub: profile?.email || "rohitbirdawade007@gmail.com", url: `mailto:${profile?.email || "rohitbirdawade007@gmail.com"}`, color: "#EA4335" },
  ];

  return (
    <section id="contact" className="py-28 relative overflow-hidden" style={{ background: "#030712" }}>
      <div className="absolute inset-0 bg-dot-grid opacity-[0.08] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[140px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container relative z-10">
        {/* Label */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label">
          <span className="eyebrow"><span className="eyebrow-dot" />Connect Panel</span>
        </motion.div>

        {/* Headline */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="mb-14">
          <h2 className="display-md font-black tracking-[-0.04em] leading-[1.05] text-white">
            Let's Build{" "}
            <span style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Together
            </span>
          </h2>
          <p className="text-slate-400 mt-3 text-[15px] max-w-lg">
            Open to AI projects, data science roles, research collaborations, or just a conversation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-5xl">

          {/* ── Left: Info + Socials ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Availability card */}
            <div className="rounded-2xl border p-6" style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(17,24,39,0.6) 100%)", borderColor: "rgba(16,185,129,0.2)" }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="glow-dot" />
                <p className="text-sm font-bold text-emerald-400">Currently Available</p>
              </div>
              <p className="text-[13px] text-slate-300 leading-relaxed mb-4">
                Looking for AI/ML roles, research positions, and exciting freelance projects.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="tag-green">Full-Time</span>
                <span className="tag-blue">Freelance</span>
                <span className="tag-violet">Research</span>
              </div>
            </div>

            {/* Quick info card */}
            <div className="rounded-2xl border p-5 space-y-4" style={{ background: "rgba(17,24,39,0.6)", borderColor: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}>
              {[
                { icon: <MapPin size={14} className="text-indigo-400" />,    label: "Location",      value: profile?.location || "Pune, Maharashtra, India" },
                { icon: <Clock size={14} className="text-emerald-400" />,   label: "Response Time", value: "Within 24 hours" },
                { icon: <Rocket size={14} className="text-amber-400" />,    label: "Availability",  value: "Open to opportunities" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="mono text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-0.5">{item.label}</p>
                    <p className="text-[13px] font-medium text-slate-200">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="space-y-2">
              {socials.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 p-4 rounded-2xl border group transition-all"
                  style={{ background: "rgba(17,24,39,0.6)", borderColor: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 transition-all"
                    style={{ background: s.color }}
                  >
                    {s.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="mono text-[9px] font-semibold text-slate-500 uppercase tracking-widest">{s.label}</p>
                    <p className="text-[12px] font-semibold text-slate-200 truncate group-hover:text-indigo-400 transition-colors">{s.sub}</p>
                  </div>
                  <ArrowUpRight size={13} className="text-slate-500 group-hover:text-indigo-400 shrink-0 transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border p-8" style={{ background: "rgba(17,24,39,0.6)", borderColor: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}>
              <div className="flex items-center gap-2 mb-6">
                <h3 className="text-[15px] font-bold text-white">Send a message</h3>
                <div className="ml-auto glow-dot" />
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Name",  value: form.name,  key: "name",  type: "text",  placeholder: "Your name" },
                    { label: "Email", value: form.email, key: "email", type: "email", placeholder: "your@email.com" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="mono text-[10px] font-semibold text-slate-400 uppercase tracking-widest block mb-1.5">{f.label}</label>
                      <input
                        type={f.type}
                        value={f.value}
                        onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        required
                        className="input-field bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-indigo-500"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="mono text-[10px] font-semibold text-slate-400 uppercase tracking-widest block mb-1.5">Message</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell me about your project or idea..."
                    required rows={5}
                    className="input-field bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-indigo-500 resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all"
                  style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)", boxShadow: "0 0 20px rgba(99,102,241,0.3)" }}
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
