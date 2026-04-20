import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAchievements, getAssetUrl } from '@/services/api';
import { Trophy, Medal, BookOpen, Star, Award, Check, ChevronRight, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

interface Achievement {
  _id: string;
  title: string;
  organization: string;
  date: string;
  category: string;
  type: string;
  description: string;
  images: string[];
}

const iconMap: Record<string, React.ReactNode> = {
  award:       <Trophy size={20} />,
  competition: <Medal size={20} />,
  paper:       <BookOpen size={20} />,
  leadership:  <Star size={20} />,
  certification:<Award size={20} />,
};

const CATEGORIES = [
  { key: 'achievements',    label: 'Major Honors', icon: <Trophy size={18} /> },
  { key: 'cocurricular',   label: 'Technical Activities', icon: <Medal size={18} /> },
  { key: 'extracurricular',label: 'Leadership & Events', icon: <Star size={18} /> },
];

const AchievementsPage = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAchievements()
      .then(setAchievements)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-pulse space-y-4 w-full max-w-5xl px-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-32 bg-slate-50 rounded-2xl border border-slate-100" />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container max-w-6xl">
          <div className="mb-16 animate-fadeUp">
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-sky-500 transition-colors mb-8">
              <ArrowLeft size={16} /> Back to Portfolio
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Recognitions & <span className="text-sky-500">Excellence</span></h1>
            <p className="text-slate-500 max-w-xl text-lg font-medium">Tracing consistent technical performance, leadership, and scholarly achievements.</p>
          </div>

          {CATEGORIES.map((cat, idx) => {
            const items = achievements.filter(a => a.category === cat.key);
            if (items.length === 0) return null;
            return (
              <div key={cat.key} className="mb-16 animate-fadeUp" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="flex items-center gap-3 mb-10">
                   <div className="p-3 rounded-xl bg-sky-50 text-sky-500 border border-sky-100">
                      {cat.icon}
                   </div>
                   <h2 className="text-2xl font-bold uppercase tracking-tight text-slate-900">{cat.label}</h2>
                   <div className="h-px flex-1 bg-slate-100 ml-4" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map(item => (
                    <motion.div
                      key={item._id}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-3xl border border-slate-100 p-8 hover:shadow-xl transition-all duration-300 shadow-sm"
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-6">
                           <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-sky-500">
                              {iconMap[item.type] || <Check size={18} />}
                           </div>
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.date}</span>
                        </div>
                        
                        <h3 className="text-lg font-bold mb-3 tracking-tight text-slate-900 leading-snug">{item.title}</h3>
                        <p className="text-sky-600 text-xs font-bold uppercase tracking-widest mb-4">{item.organization}</p>
                        
                        {item.images?.[0] && (
                          <div className="mb-6 rounded-2xl overflow-hidden border border-slate-100 aspect-video">
                             <img src={getAssetUrl(item.images[0])} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        
                        <p className="text-slate-600 text-xs line-clamp-2 mb-8 font-medium italic">"{item.description}"</p>
                        
                        <Link
                          to={`/achievements/${item._id}`}
                          className="mt-auto text-[10px] font-bold flex items-center justify-between gap-1 text-slate-400 hover:text-sky-500 transition-colors uppercase tracking-widest"
                        >
                          View Case Details <ChevronRight size={14} className="text-sky-500" />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}

          {achievements.length === 0 && (
            <div className="text-center py-32 bg-slate-50 rounded-[3rem] border border-slate-100">
              <Trophy size={64} className="mx-auto mb-6 text-slate-200" />
              <h3 className="text-2xl font-bold mb-2">Honors Under Review</h3>
              <p className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Certification database is updating</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AchievementsPage;
