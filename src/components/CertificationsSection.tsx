import { useEffect, useState } from "react";
import { getCertifications } from "@/services/api";
import { Award, ExternalLink, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Cert {
  _id: string;
  name: string;
  organization: string;
  date: string;
  credentialUrl?: string;
  image?: string;
}

const CertificationsSection = () => {
  const [certs, setCerts] = useState<Cert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCertifications()
      .then(data => setCerts(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (!loading && certs.length === 0) return null;

  return (
    <section id="certifications" className="py-28 relative overflow-hidden" style={{ background: "var(--canvas)" }}>
      <div className="absolute inset-0 bg-dot-grid opacity-[0.12] pointer-events-none" />

      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label reveal">
          <span className="eyebrow"><span className="eyebrow-dot" />Credentials</span>
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
            <h2 className="display-md font-black tracking-[-0.04em] leading-[1.05] reveal">
              Licenses &{" "}
              <span style={{ background: "linear-gradient(135deg,#6C63FF,#059669)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Certifications
              </span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Link to="/certifications" className="btn-secondary flex items-center gap-2 text-sm whitespace-nowrap">
              View All <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1,2,3].map(i => <div key={i} className="h-40 rounded-2xl bg-[#F5F5F5] border border-[#EBEBEB] animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {certs.slice(0, 6).map((cert, idx) => (
              <motion.div
                key={cert._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="card shimmer-card p-6 hover-lift hover-glow group reveal"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    {cert.image ? (
                      <img src={cert.image} alt="" className="w-7 h-7 object-contain" />
                    ) : (
                      <Award size={20} className="text-emerald-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-bold text-[#0A0A0A] mb-1 leading-snug group-hover:text-[#6C63FF] transition-colors">{cert.name}</h3>
                    <p className="mono text-[10px] text-[#A3A3A3] font-semibold uppercase tracking-widest mb-2">{cert.organization}</p>
                    <div className="flex items-center gap-3">
                      {cert.date && (
                        <span className="flex items-center gap-1 text-[10px] text-[#A3A3A3]">
                          <Calendar size={10} /> {cert.date}
                        </span>
                      )}
                      {cert.credentialUrl && (
                        <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[10px] font-semibold text-[#6C63FF] hover:text-[#5B54E6]">
                          <ExternalLink size={10} /> Verify
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CertificationsSection;
