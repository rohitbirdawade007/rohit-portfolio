import { useState } from "react";
import { Mail, MapPin, Send, Github, Linkedin, CheckCircle2 } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import { motion } from "framer-motion";

const ContactSection = () => {
  const { profile } = useProfile();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-white">
      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label">
          <span className="eyebrow"><span className="eyebrow-dot" />Direct Channel</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="mb-14">
          <h2 className="display-md font-black text-slate-900">
            Let's Build Something <span className="text-indigo-600">Extraordinary</span>
          </h2>
          <p className="text-slate-500 mt-2 text-[15px] max-w-lg">
            Open for AI engineering roles, technical consultancies, or innovative collaborative projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Info Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="lg:col-span-5 space-y-4">
            <div className="card p-6 bg-white border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                <Mail size={18} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Get in Touch</h3>
              <p className="text-slate-600 text-sm mb-4">Feel free to reach out directly via email or phone.</p>

              <div className="space-y-3 pt-3 border-t border-slate-100">
                <a href={`mailto:${profile?.email || "rohitbirdawade007@gmail.com"}`} className="flex items-center gap-3 text-slate-700 hover:text-indigo-600 transition-colors text-sm font-medium">
                  <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0"><Mail size={14} /></span>
                  {profile?.email || "rohitbirdawade007@gmail.com"}
                </a>
                <div className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                  <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0"><MapPin size={14} /></span>
                  {profile?.location || "Pune, Maharashtra, IN"}
                </div>
              </div>
            </div>

            {/* Socials Card */}
            <div className="card p-6 bg-white border-slate-200 shadow-sm">
              <p className="mono text-[10.5px] font-semibold text-slate-500 uppercase tracking-widest mb-3">Connect Online</p>
              <div className="flex gap-2">
                <a href={profile?.socialLinks?.github || "https://github.com/rohitbirdawade007"} target="_blank" rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-all text-xs font-semibold">
                  <Github size={14} /> GitHub
                </a>
                <a href={profile?.socialLinks?.linkedin || "https://linkedin.com/in/rohitbirdawade007"} target="_blank" rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white transition-all text-xs font-semibold">
                  <Linkedin size={14} /> LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="lg:col-span-7">
            <div className="card p-8 bg-white border-slate-200 shadow-sm">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Message Transmitted</h3>
                  <p className="text-slate-500 text-sm">Thank you for getting in touch. I will respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="mono text-[10.5px] font-semibold uppercase tracking-widest text-slate-500 block mb-1.5">Your Name</label>
                      <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Alex Smith" className="input-field" />
                    </div>
                    <div>
                      <label className="mono text-[10.5px] font-semibold uppercase tracking-widest text-slate-500 block mb-1.5">Email Address</label>
                      <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="alex@company.com" className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="mono text-[10.5px] font-semibold uppercase tracking-widest text-slate-500 block mb-1.5">Subject</label>
                    <input type="text" required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} placeholder="AI Engineering Opportunity" className="input-field" />
                  </div>
                  <div>
                    <label className="mono text-[10.5px] font-semibold uppercase tracking-widest text-slate-500 block mb-1.5">Message</label>
                    <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="Tell me about your project or role details..." className="input-field resize-none" />
                  </div>
                  <button type="submit" disabled={submitting} className="btn-primary w-full py-3">
                    {submitting ? "Transmitting..." : <>Send Message <Send size={14} /></>}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
