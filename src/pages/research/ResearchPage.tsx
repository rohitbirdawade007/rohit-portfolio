import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getResearchList } from '@/services/api';
import { BookOpen, ChevronRight, ExternalLink, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Research {
  _id: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  status: string;
  description: string;
  link: string;
}

const ResearchPage = () => {
  const [research, setResearch] = useState<Research[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResearchList()
      .then(setResearch)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-16 animate-fadeUp">
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-sky-500 transition-colors mb-8">
               <ArrowLeft size={16} /> Back to Portfolio
            </Link>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">Academic <span className="text-sky-500">Research</span></h1>
            <p className="text-slate-500 mt-2 font-medium">Scholarly publications, review papers, and investigative deep-dives.</p>
          </div>

          {loading ? (
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-slate-50 rounded-2xl h-40 border border-slate-100" />
              ))}
            </div>
          ) : research.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100">
              <BookOpen size={48} className="mx-auto mb-4 text-slate-200" />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Registry Empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {research.map((item, idx) => (
                <div key={item._id}
                  className="bg-white border border-slate-100 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-sm animate-fadeUp"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="p-4 bg-sky-50 rounded-2xl text-sky-500 border border-sky-100 shrink-0 self-start">
                      <BookOpen size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                         <span className="text-[10px] font-bold text-sky-500 uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                            {item.status || "PUBLISHED"}
                         </span>
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.year}</span>
                      </div>
                      
                      <h2 className="font-bold text-xl text-slate-900 leading-tight mb-2">{item.title}</h2>
                      
                      {item.journal && (
                         <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                           {item.journal}
                         </p>
                      )}
                      
                      {item.authors && <p className="text-slate-500 text-xs mb-4 font-medium italic">Authors: {item.authors}</p>}
                      
                      {item.description && (
                        <p className="text-slate-600 text-sm mt-4 leading-relaxed font-medium line-clamp-3">
                           {item.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-50">
                        <Link
                          to={`/research/${item._id}`}
                          className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-sky-500 uppercase tracking-[0.2em] transition-colors"
                        >
                          Read Abstract <ChevronRight size={14} />
                        </Link>
                        {item.link && (
                          <a href={item.link} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[10px] font-bold text-sky-500 hover:text-sky-700 uppercase tracking-widest border-b border-sky-100 pb-1"
                          >
                            <ExternalLink size={14} /> Official Pub
                          </a>
                        )}
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

export default ResearchPage;
