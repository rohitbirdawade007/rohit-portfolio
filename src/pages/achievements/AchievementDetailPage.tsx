import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAchievement, getAssetUrl } from '@/services/api';
import { ArrowLeft, Trophy, Medal, BookOpen, Star, Award, Check, AlertCircle, MapPin, Calendar, ChevronLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface Achievement {
  _id: string;
  title: string;
  organization: string;
  date: string;
  category: string;
  type: string;
  description: string;
  fullDescription: string;
  images: string[];
}

const iconMap: Record<string, React.ReactNode> = {
  award:       <Trophy size={40} />,
  competition: <Medal size={40} />,
  paper:       <BookOpen size={40} />,
  leadership:  <Star size={40} />,
  certification:<Award size={40} />,
};

const AchievementDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Achievement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    getAchievement(id)
      .then(setItem)
      .catch(() => setError('Achievement not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-pulse space-y-4 w-full max-w-3xl px-4 text-center">
        <div className="h-20 w-20 bg-slate-100 rounded-full mx-auto" />
        <div className="h-8 bg-slate-100 rounded w-3/4 mx-auto" />
        <div className="h-64 bg-slate-100 rounded-[2.5rem] mt-10" />
      </div>
    </div>
  );

  if (error || !item) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-slate-900 gap-6">
      <div className="w-20 h-20 rounded-3xl bg-red-50 flex items-center justify-center text-red-500">
        <AlertCircle size={40} />
      </div>
      <h2 className="text-2xl font-bold tracking-tight">{error || 'Achievement Not Found'}</h2>
      <Button 
        onClick={() => navigate('/')} 
        className="btn-secondary"
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Home
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container max-w-4xl">
           {/* Navigation */}
           <div className="flex justify-center mb-16">
             <Link 
               to="/" 
               className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-sky-500 transition-colors"
             >
               <ChevronLeft size={16} /> Back to Portfolio
             </Link>
           </div>

          {/* Centered Hero Header */}
          <div className="flex flex-col items-center text-center mb-20 animate-fadeUp">
            <div className="relative mb-10">
               <div className="absolute inset-0 bg-sky-200 rounded-full blur-2xl opacity-30 animate-pulse" />
               <div className="relative w-24 h-24 rounded-full bg-white border border-slate-100 flex items-center justify-center text-sky-500 shadow-xl">
                  {iconMap[item.type] || <Trophy size={40} />}
               </div>
            </div>
            
            <h1 className="text-3xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
               {item.title}
            </h1>
            
            <div className="flex items-center justify-center gap-6 text-sm font-bold uppercase tracking-widest text-slate-400">
               {item.organization && (
                 <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-sky-500" /> {item.organization}
                 </div>
               )}
               {item.date && (
                 <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-sky-500" /> {item.date}
                 </div>
               )}
            </div>
          </div>

          {/* Description Block */}
          <div className="bg-slate-50 rounded-[3rem] p-10 md:p-16 mb-16 border border-slate-100 animate-fadeUp">
            <h2 className="text-xl font-bold mb-8 uppercase tracking-widest text-slate-900">Technical Contributions</h2>
            <div className="space-y-6">
               <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  {item.fullDescription || item.description}
               </p>
               
               {/* Example checkmark list like lovable-uploads analysis suggested */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-10 border-t border-slate-200">
                  <div className="flex items-center gap-3">
                     <div className="w-6 h-6 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
                        <Check size={14} />
                     </div>
                     <span className="text-sm font-bold text-slate-700">Algorithm Optimization</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-6 h-6 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
                        <Check size={14} />
                     </div>
                     <span className="text-sm font-bold text-slate-700">Project Leadership</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Award Showcase (Gallery) */}
          {item.images?.length > 0 && (
            <div className="mb-20 animate-fadeUp">
              <h2 className="text-xl font-bold mb-10 text-center uppercase tracking-widest text-slate-400">
                Official Certification
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {item.images.map((img, i) => (
                  <div key={i} className="p-4 bg-white border border-slate-100 rounded-[2.5rem] shadow-lg group">
                    <img
                      src={getAssetUrl(img)}
                      alt={`${item.title} cert ${i + 1}`}
                      className="w-full h-auto object-cover rounded-[1.5rem] hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Motivation Quote */}
          <div className="text-center max-w-2xl mx-auto mt-24">
             <div className="h-1 w-12 bg-sky-500 mx-auto mb-8 rounded-full" />
             <p className="text-2xl font-bold italic text-slate-900 mb-6 leading-relaxed">
               "This recognition fuels my commitment to pioneering intelligent hardware solutions that solve real-world complexities."
             </p>
             <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em]">
               COMMITMENT TO EXCELLENCE
             </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AchievementDetailPage;
