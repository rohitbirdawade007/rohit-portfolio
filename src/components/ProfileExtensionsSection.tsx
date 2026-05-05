import { useEffect, useState } from "react";
import { getProfile } from "@/services/api";
import { motion } from "framer-motion";
import { Languages, Briefcase, Award, Building2, HeartHandshake, CheckCircle, MessageSquareQuote } from "lucide-react";

interface ExtendedProfile {
  languages?: { name: string; proficiency: string }[];
  services?: { title: string; description: string }[];
  courses?: { name: string; platform: string; completedAt: string; certificateUrl?: string }[];
  organizations?: { name: string; role: string; duration: string }[];
  volunteer?: { role: string; organization: string; duration: string; description: string }[];
  testScores?: { name: string; score: string; date: string }[];
  recommendations?: { name: string; title: string; relationship: string; text: string; avatar?: string }[];
}

const ProfileExtensionsSection = () => {
  const [profile, setProfile] = useState<ExtendedProfile | null>(null);

  useEffect(() => {
    getProfile().then(data => setProfile(data)).catch(console.error);
  }, []);

  if (!profile) return null;

  const hasContent = 
    (profile.languages?.length || 0) > 0 ||
    (profile.services?.length || 0) > 0 ||
    (profile.courses?.length || 0) > 0 ||
    (profile.organizations?.length || 0) > 0 ||
    (profile.volunteer?.length || 0) > 0 ||
    (profile.testScores?.length || 0) > 0 ||
    (profile.recommendations?.length || 0) > 0;

  if (!hasContent) return null;

  return (
    <section id="extensions" className="py-28 relative overflow-hidden" style={{ background: "var(--surface)" }}>
      <div className="absolute inset-0 bg-dot-grid opacity-[0.12] pointer-events-none" />

      <div className="container relative z-10 max-w-5xl">
        {/* Languages */}
        {profile.languages && profile.languages.length > 0 && (
          <div className="mb-20">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#6C63FF]/10 text-[#6C63FF] flex items-center justify-center shrink-0">
                <Languages size={20} />
              </div>
              Languages
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {profile.languages.map((lang, idx) => (
                <div key={idx} className="card p-4 hover-lift hover-glow">
                  <p className="font-bold text-[#0A0A0A]">{lang.name}</p>
                  <p className="text-[11px] text-[#A3A3A3] font-semibold mt-1">{lang.proficiency}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services */}
        {profile.services && profile.services.length > 0 && (
          <div className="mb-20">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Briefcase size={20} />
              </div>
              Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {profile.services.map((service, idx) => (
                <div key={idx} className="card p-6 border border-[#EBEBEB] hover:border-emerald-200 transition-colors">
                  <h4 className="font-bold text-[#0A0A0A] mb-2">{service.title}</h4>
                  <p className="text-[13px] text-[#737373] leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Courses */}
        {profile.courses && profile.courses.length > 0 && (
          <div className="mb-20">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Award size={20} />
              </div>
              Courses
            </h3>
            <div className="space-y-4">
              {profile.courses.map((course, idx) => (
                <div key={idx} className="card p-5 flex items-center justify-between group">
                  <div>
                    <h4 className="font-bold text-[#0A0A0A] group-hover:text-amber-600 transition-colors">{course.name}</h4>
                    <p className="text-[12px] text-[#737373] mt-1">{course.platform} · {course.completedAt}</p>
                  </div>
                  {course.certificateUrl && (
                    <a href={course.certificateUrl} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-full bg-amber-50 text-[11px] font-bold text-amber-600 hover:bg-amber-100 transition-colors">
                      View Certificate
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Organizations */}
        {profile.organizations && profile.organizations.length > 0 && (
          <div className="mb-20">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <Building2 size={20} />
              </div>
              Organizations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {profile.organizations.map((org, idx) => (
                <div key={idx} className="card p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F5F5F5] flex items-center justify-center shrink-0 border border-[#EBEBEB]">
                    <Building2 size={16} className="text-[#A3A3A3]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A0A0A]">{org.name}</h4>
                    <p className="text-[12px] text-[#404040] font-semibold mt-1">{org.role}</p>
                    <p className="text-[11px] text-[#A3A3A3] mt-1">{org.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Volunteer */}
        {profile.volunteer && profile.volunteer.length > 0 && (
          <div className="mb-20">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                <HeartHandshake size={20} />
              </div>
              Volunteer Experience
            </h3>
            <div className="space-y-6 relative border-l-2 border-rose-100 ml-5 pl-8">
              {profile.volunteer.map((vol, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-rose-200 border-2 border-white" />
                  <h4 className="font-bold text-[#0A0A0A]">{vol.role}</h4>
                  <p className="text-[12px] text-[#404040] font-semibold mt-1">{vol.organization} · <span className="text-[#A3A3A3]">{vol.duration}</span></p>
                  <p className="text-[13px] text-[#737373] mt-3 leading-relaxed">{vol.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Test Scores */}
        {profile.testScores && profile.testScores.length > 0 && (
          <div className="mb-20">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <CheckCircle size={20} />
              </div>
              Test Scores
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {profile.testScores.map((test, idx) => (
                <div key={idx} className="card p-5 text-center">
                  <p className="text-[24px] font-black text-indigo-600 mb-1 leading-none">{test.score}</p>
                  <h4 className="font-bold text-[#0A0A0A] text-[13px]">{test.name}</h4>
                  <p className="text-[10px] text-[#A3A3A3] mt-2">{test.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {profile.recommendations && profile.recommendations.length > 0 && (
          <div>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                <MessageSquareQuote size={20} />
              </div>
              Recommendations
            </h3>
            <div className="space-y-5">
              {profile.recommendations.map((rec, idx) => (
                <div key={idx} className="card p-8 bg-white border border-[#EBEBEB]">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-[#F5F5F5] overflow-hidden shrink-0">
                      {rec.avatar ? <img src={rec.avatar} alt="" className="w-full h-full object-cover" /> : null}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0A0A0A]">{rec.name}</h4>
                      <p className="text-[12px] text-[#404040] mt-0.5">{rec.title}</p>
                      <p className="text-[10px] text-[#A3A3A3] font-semibold uppercase tracking-widest mt-1">{rec.relationship}</p>
                    </div>
                  </div>
                  <p className="text-[13px] text-[#525252] leading-relaxed italic border-l-4 border-[#F0F0EE] pl-4">
                    "{rec.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileExtensionsSection;
