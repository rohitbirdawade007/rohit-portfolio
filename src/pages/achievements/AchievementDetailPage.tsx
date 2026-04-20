import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAchievement, getAssetUrl } from '@/services/api';
import { ArrowLeft, Trophy, Medal, BookOpen, Star, Award, Check, AlertCircle, MapPin, Calendar, ChevronLeft, Target, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";

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
  award:       <Trophy size={48} />,
  competition: <Medal size={48} />,
  paper:       <BookOpen size={48} />,
  leadership:  <Star size={48} />,
  certification:<Award size={48} />,
};

const AchievementDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Achievement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getAchievement(id)
      .then(setItem)
      .catch(() => setError('Recognition node identification failure.'))
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-pulse space-y-8 w-full max-w-3xl px-4 text-center">
        <div className="h-24 w-24 bg-slate-50 rounded-[2rem] mx-auto shadow-sm" />
        <div className="h-12 bg-slate-50 rounded-xl w-3/4 mx-auto" />
        <div className="h-80 bg-slate-50 rounded-[3rem] mt-10" />
      </div>
    </div>
  );

  if (error || !item) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-slate-900 gap-8">
      <div className="w-24 h-24 rounded-[2.5rem] bg-rose-50 flex items-center justify-center text-rose-500 shadow-xl shadow-rose-500/10">
        <AlertCircle size={48} />
      </div>
      <div className="text-center">
         <h1 className="text-3xl font-black tracking-tighter uppercase italic">Recognition Archival Failure</h1>
         <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Error Code: RECORD_NOT_FOUND</p>
      </div>
      <Button onClick={() => navigate('/')} className="h-14 px-8 bg-slate-900 hover:bg-black text-white rounded-2xl font-black uppercase tracking-widest transition-all">
        <ArrowLeft size={18} className="mr-3" /> Back to Terminal
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-sky-100 selection:text-sky-900">
      <Navbar />
      
      <main className="flex-grow pt-40 pb-20 overflow-hidden">
        <div className="container max-w-5xl relative">
          
          {/* Diagnostic Side Decor */}
          <div className="absolute top-0 right-0 p-20 text-slate-50 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
             <Trophy size={400} />
          </div>

          {/* Centered Elite Header */}
          <div className="flex flex-col items-center text-center mb-32 relative z-10">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative mb-12">
               <div className="absolute inset-0 bg-sky-400 rounded-[2.5rem] blur-[80px] opacity-20 animate-pulse" />
               <div className="relative w-32 h-32 rounded-[2.5rem] bg-white border border-slate-100 flex items-center justify-center text-sky-500 shadow-2xl group transition-transform hover:rotate-12">
                  {iconMap[item.type] || <Trophy size={48} />}
               </div>
               <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center border-4 border-white shadow-xl">
                  <ShieldCheck size={20} />
               </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
                <div className="flex items-center justify-center gap-3">
                   <div className="px-5 py-1.5 bg-slate-50 border border-slate-100 text-[10px] font-black uppercase tracking-[0.3em] text-sky-500 rounded-full italic">
                      {item.category || "Official Milestone"}
                   </div>
                </div>
                <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase italic leading-[0.9]">
                   {item.title}
                </h1>
                
                <div className="flex flex-wrap items-center justify-center gap-10 pt-4">
                   {item.organization && (
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                           <MapPin size={18} />
                        </div>
                        <div className="flex flex-col text-left">
                           <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Issuing Entity</span>
                           <span className="text-sm font-black text-slate-900 uppercase italic">{item.organization}</span>
                        </div>
                     </div>
                   )}
                   {item.date && (
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                           <Calendar size={18} />
                        </div>
                        <div className="flex flex-col text-left">
                           <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Time Signature</span>
                           <span className="text-sm font-black text-slate-900 uppercase italic">{item.date}</span>
                        </div>
                     </div>
                   )}
                </div>
            </motion.div>
          </div>

          {/* Achievement Diagnostic Bento */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20 relative z-10 font-inter">
             <Card className="lg:col-span-8 p-12 md:p-16 bg-white border border-slate-100 rounded-[4rem] shadow-sm relative overflow-hidden group">
                <div className="absolute top-10 right-10 opacity-5 group-hover:opacity-10 transition-opacity"><Zap size={200} /></div>
                <h2 className="text-3xl font-black mb-10 uppercase tracking-tighter italic text-slate-900 flex items-center gap-4">
                   <div className="w-1.5 h-8 bg-sky-500 rounded-full" />
                   Functional Abstract
                </h2>
                <div className="space-y-8 relative z-10">
                   <p className="text-xl text-slate-600 leading-relaxed font-medium italic border-l-4 border-slate-50 pl-10 py-2">
                       "{item.fullDescription || item.description}"
                   </p>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 pt-12 border-t border-slate-50">
                      {[
                        { label: "Technical Proficiency", icon: <Check size={14} /> },
                        { label: "Sector Leadership", icon: <Target size={14} /> },
                        { label: "Analytical Merit", icon: <ShieldCheck size={14} /> },
                        { label: "Scalable Execution", icon: <Zap size={14} /> }
                      ].map((trait, i) => (
                        <div key={i} className="flex items-center gap-4 group/item">
                           <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center shadow-sm group-hover/item:scale-110 transition-transform">
                              {trait.icon}
                           </div>
                           <span className="text-sm font-black text-slate-900 uppercase italic tracking-tighter group-hover/item:text-sky-500 transition-colors">{trait.label}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </Card>

             <Card className="lg:col-span-4 p-12 bg-slate-900 rounded-[4rem] flex flex-col justify-between shadow-2xl relative overflow-hidden ring-8 ring-slate-50/50 group">
                <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-sky-500 rounded-full blur-[100px] opacity-20" />
                <div className="space-y-8 relative z-10">
                   <h3 className="text-sm font-black text-white uppercase tracking-[0.4em] mb-4">NODE_SIGNATURE</h3>
                   <div className="space-y-6">
                      <div className="flex flex-col gap-1">
                         <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Protocol Type</span>
                         <span className="text-lg font-black text-sky-500 uppercase italic leading-tight">{item.type}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                         <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Merit Rank</span>
                         <span className="text-lg font-black text-white uppercase italic leading-tight">Master Level IV</span>
                      </div>
                   </div>
                </div>
                <div className="mt-20 pt-10 border-t border-slate-800 flex items-center justify-between text-slate-600 relative z-10">
                   <div className="flex flex-col">
                      <span className="text-[8px] font-black uppercase tracking-widest">ID Hash</span>
                      <span className="text-[10px] font-mono">{item._id.slice(0, 12)}</span>
                   </div>
                   <ArrowUpRight size={24} className="text-sky-500 opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                </div>
             </Card>
          </div>

          {/* Certification Visualization */}
          {item.images?.length > 0 && (
            <div className="mb-40 relative z-10">
               <div className="flex items-center justify-center gap-4 mb-16">
                  <div className="w-1.5 h-8 bg-sky-500 rounded-full" />
                  <h2 className="text-4xl font-black uppercase tracking-tighter italic text-slate-900">Merit Serialization</h2>
                  <div className="w-1.5 h-8 bg-sky-500 rounded-full" />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 {item.images.map((img, i) => (
                   <motion.div key={i} whileHover={{ y: -10 }} className="p-8 bg-slate-50 border border-slate-100 rounded-[4rem] shadow-xl group cursor-crosshair">
                      <img src={getAssetUrl(img)} alt={`${item.title} node visual`} className="w-full h-auto object-cover rounded-[2.5rem] shadow-2xl transition-transform duration-[1.5s] group-hover:scale-[1.02]" />
                   </motion.div>
                 ))}
               </div>
            </div>
          )}

          {/* Motivational Anchor */}
          <div className="text-center max-w-3xl mx-auto mt-40 mb-20">
             <div className="w-20 h-1 bg-sky-500 mx-auto mb-12 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.5)]" />
             <p className="text-3xl md:text-4xl font-black italic text-slate-900 mb-10 leading-[1.1] tracking-tighter">
               "THIS RECOGNITION FUELS MY COMMITMENT TO PIONEERING INTELLIGENT HARDWARE SOLUTIONS THAT SOLVE REAL-WORLD COMPLEXITIES."
             </p>
             <div className="px-6 py-2 bg-slate-900 inline-block rounded-full">
                <span className="text-[10px] font-black text-white uppercase tracking-[0.5em]">
                  COMMITMENT_PROTOCOL_ACTIVE
                </span>
             </div>
          </div>

          {/* Detailed Exit Control */}
          <div className="mt-40 flex items-center justify-between py-12 border-t border-slate-100">
             <Link to="/" className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-sky-500 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-sky-50 group-hover:border-sky-100">
                  <ChevronLeft size={20} />
                </div>
                Return to Surface
             </Link>
             <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest italic font-mono">NODE_RECORD_V4.2</span>
                <div className="w-1.5 h-6 bg-sky-500 rounded-full" />
             </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AchievementDetailPage;
