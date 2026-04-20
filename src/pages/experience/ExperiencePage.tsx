import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getExperiences } from '@/services/api';
import { Briefcase, Code2, ChevronRight, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Experience {
  _id: string;
  company: string;
  role: string;
  duration: string;
  techStack: string[];
  description: string;
}

const ExperiencePage = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExperiences()
      .then(setExperiences)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12 animate-fadeUp">
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-sky-500 transition-colors mb-8">
               <ArrowLeft size={16} /> Back to Portfolio
            </Link>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">Career <span className="text-sky-500">Timeline</span></h1>
            <p className="text-slate-500 mt-2 font-medium">Professional roles, internships, and industrial contributions.</p>
          </div>

          {loading ? (
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-slate-50 rounded-2xl h-40 border border-slate-100" />
              ))}
            </div>
          ) : experiences.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100">
              <Briefcase size={48} className="mx-auto mb-4 text-slate-200" />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Registry Empty</p>
            </div>
          ) : (
            <div className="space-y-8">
              {experiences.map((exp, idx) => (
                <div key={exp._id}
                  className="bg-white border border-slate-100 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-sm animate-fadeUp"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="p-4 bg-sky-50 rounded-2xl text-sky-500 border border-sky-100 shrink-0 self-start">
                      <Briefcase size={28} />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h2 className="font-bold text-xl text-slate-900 leading-tight">{exp.role}</h2>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100 mt-2 md:mt-0">
                           {exp.duration}
                        </span>
                      </div>
                      <p className="text-sky-600 text-sm font-bold uppercase tracking-widest mb-4">{exp.company}</p>
                      
                      {exp.description && (
                        <p className="text-slate-600 text-sm mt-4 leading-relaxed font-medium transition-colors">
                           {exp.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-50">
                        <div className="flex flex-wrap gap-2">
                           {exp.techStack?.slice(0, 4).map((t, i) => (
                             <span key={i} className="text-[10px] px-3 py-1 bg-slate-50 rounded-lg text-slate-400 font-bold uppercase tracking-widest border border-slate-100">{t}</span>
                           ))}
                        </div>
                        <Link
                          to={`/experience/${exp._id}`}
                          className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-sky-500 uppercase tracking-[0.2em] transition-colors"
                        >
                          Details <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExperiencePage;
