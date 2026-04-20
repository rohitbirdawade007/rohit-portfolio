import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProject, getAssetUrl } from '@/services/api';
import { ArrowLeft, Github, ExternalLink, Code2, AlertCircle, LayoutTemplate, TrendingUp, CheckCircle2, ChevronLeft, Cpu, Globe, Rocket, ShieldCheck, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface Project {
  _id: string;
  title: string;
  description: string;
  fullDescription?: string;
  problemStatement?: string;
  solution?: string;
  results?: string;
  techStack: string[];
  image: string;
  images: string[];
  architectureImage?: string;
  githubUrl?: string;
  demoUrl?: string;
  category?: string;
  createdAt: string;
}

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProject(id)
      .then(setProject)
      .catch(() => setError('Protocol Node identification failure.'))
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-pulse space-y-4 w-full max-w-4xl px-4 text-center">
        <div className="h-16 w-16 bg-slate-50 rounded-2xl mx-auto shadow-sm" />
        <div className="h-10 bg-slate-50 rounded-xl w-3/4 mx-auto" />
        <div className="h-[500px] bg-slate-50 rounded-[3rem] mt-10" />
      </div>
    </div>
  );

  if (error || !project) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-slate-900 gap-8">
      <div className="w-24 h-24 rounded-[2rem] bg-rose-50 flex items-center justify-center text-rose-500 shadow-xl shadow-rose-500/10">
        <AlertCircle size={48} />
      </div>
      <div className="text-center">
         <h2 className="text-3xl font-black tracking-tighter uppercase italic italic">{error || 'Node Archival Failure'}</h2>
         <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Error Code: PROTOCOL_ID_NOT_FOUND</p>
      </div>
      <Button onClick={() => navigate('/projects')} className="h-14 px-8 bg-slate-900 hover:bg-black text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-slate-900/10">
        <ArrowLeft size={18} className="mr-3" /> Back to Fleet
      </Button>
    </div>
  );

  const allImages = [project.image, ...(project.images || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-sky-100 selection:text-sky-900">
      <Navbar />
      
      <main className="flex-grow pt-40 pb-20 overflow-hidden">
        <div className="container max-w-7xl">
          {/* Top Header Section */}
          <div className="flex flex-col lg:flex-row gap-16 mb-24 relative">
             <div className="flex-grow space-y-8 max-w-3xl">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4">
                  <div className="px-4 py-1.5 bg-sky-50 text-sky-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-sky-100">
                    {project.category || "Strategic Deployment"}
                  </div>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">DEPLOYED: {new Date(project.createdAt).toLocaleDateString()}</span>
                </motion.div>
                
                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter italic uppercase leading-[0.9]">
                  {project.title}
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl border-l-4 border-sky-500 pl-8 py-2">
                   "{project.description}"
                </motion.p>
                
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4 pt-4">
                  {project.githubUrl && (
                    <Button onClick={() => window.open(project.githubUrl, '_blank')} className="h-16 px-10 bg-slate-900 hover:bg-black text-white rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-slate-900/10 active:scale-95 transition-all gap-3">
                      <Github size={20} /> Inspect Source
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button onClick={() => window.open(project.demoUrl, '_blank')} className="h-16 px-10 bg-sky-500 hover:bg-sky-600 text-white rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-sky-500/10 active:scale-95 transition-all gap-3">
                      <ExternalLink size={20} /> Live Deployment
                    </Button>
                  )}
                </motion.div>
             </div>

             {/* Sticky Metadata Bento Card */}
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="w-full lg:w-[380px] shrink-0">
                <Card className="border border-slate-100 bg-slate-50/50 backdrop-blur-xl rounded-[3rem] p-10 sticky top-32 shadow-sm overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 text-sky-100 opacity-20"><Cpu size={120} /></div>
                   <h3 className="text-sm font-black mb-10 uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3 italic">
                      <Zap size={14} className="text-sky-500" /> Protocol Stats
                   </h3>
                   <div className="space-y-8 relative z-10">
                      <div>
                         <span className="text-[10px] font-black text-slate-400 block mb-2 uppercase tracking-widest italic">Service Role</span>
                         <span className="text-xl font-black text-slate-900 uppercase italic">Architect & Lead</span>
                      </div>
                      <div>
                         <span className="text-[10px] font-black text-slate-400 block mb-2 uppercase tracking-widest italic">Sector Domain</span>
                         <span className="text-xl font-black text-slate-900 uppercase italic">{project.category || 'Global AI'}</span>
                      </div>
                      <div>
                         <span className="text-[10px] font-black text-slate-400 block mb-4 uppercase tracking-widest italic font-inter font-black">Logic Matrix</span>
                         <div className="flex flex-wrap gap-2">
                           {project.techStack?.map(tech => (
                             <span key={tech} className="px-3 py-1 bg-white border border-slate-100 text-[10px] font-black text-slate-500 rounded-full shadow-sm uppercase tracking-widest">
                               {tech}
                             </span>
                           ))}
                         </div>
                      </div>
                   </div>
                </Card>
             </motion.div>
          </div>

          {/* Master Projection (Image) */}
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="mb-24 rounded-[4rem] overflow-hidden border border-slate-100 shadow-[0_50px_100px_-20px_rgba(14,165,233,0.15)] bg-slate-50 relative group">
             <img src={getAssetUrl(allImages[0])} alt={project.title} className="w-full h-auto max-h-[900px] object-cover transition-transform duration-[2s] group-hover:scale-105" />
             <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
             <div className="absolute bottom-10 right-10 flex gap-4">
                <div className="w-16 h-16 rounded-[2rem] bg-white/80 backdrop-blur shadow-2xl flex items-center justify-center text-sky-500">
                   <LayoutTemplate size={32} />
                </div>
             </div>
          </motion.div>

          {/* Narrative Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24 font-inter">
              {project.problemStatement && (
                <Card className="p-12 border border-slate-100 bg-white rounded-[3rem] shadow-sm relative overflow-hidden flex flex-col justify-between group h-full">
                   <div className="space-y-6">
                      <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shadow-lg shadow-rose-500/10 group-hover:-rotate-6 transition-transform">
                         <AlertCircle size={28} />
                      </div>
                      <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">The Problem Matrix</h2>
                      <p className="text-slate-500 text-lg font-medium leading-relaxed italic border-l-2 border-slate-50 pl-6">"{project.problemStatement}"</p>
                   </div>
                </Card>
              )}
              
              {project.solution && (
                <Card className="p-12 border border-slate-100 bg-slate-900 rounded-[3rem] shadow-2xl flex flex-col justify-between group h-full ring-8 ring-slate-50/50">
                   <div className="space-y-6">
                      <div className="w-14 h-14 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:rotate-6 transition-transform">
                         <CheckCircle2 size={28} />
                      </div>
                      <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Proposed Solution</h2>
                      <p className="text-slate-300 text-lg font-medium leading-relaxed italic border-l-2 border-slate-800 pl-6">"{project.solution}"</p>
                   </div>
                </Card>
              )}
          </div>

          {/* Results Immersive Block */}
          {project.results && (
             <div className="relative mb-24 overflow-hidden rounded-[4rem] group">
                <div className="absolute inset-0 bg-sky-500 transition-colors duration-700 group-hover:bg-sky-600" />
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:24px_24px]" />
                <div className="relative p-16 md:p-32 text-center text-white z-10 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center mb-12 shadow-2xl border border-white/30 animate-pulse">
                       <TrendingUp size={40} />
                    </div>
                    <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tight italic uppercase leading-none">Strategic Impact</h2>
                    <p className="text-2xl md:text-3xl font-black max-w-4xl opacity-95 leading-tight tracking-tight italic">
                      "{project.results}"
                    </p>
                    <div className="mt-16 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em]">
                       <ShieldCheck size={16} /> SYSTEM_VERIFIED
                    </div>
                </div>
             </div>
          )}

          {/* Architecture Visualized */}
          {project.architectureImage && (
            <div className="mb-32">
               <div className="flex items-center gap-4 mb-12">
                  <div className="w-1.5 h-8 bg-sky-500 rounded-full" />
                  <h2 className="text-2xl font-black uppercase tracking-tighter italic text-slate-900">System Architecture</h2>
               </div>
               <div className="bg-slate-50 border border-slate-100 rounded-[3.5rem] p-10 md:p-24 relative group">
                  <div className="absolute top-10 right-10 text-[10px] font-black uppercase tracking-widest text-slate-200">SCHEMA_ID: ARCH_PRTO_V2</div>
                  <img src={getAssetUrl(project.architectureImage)} alt="Architecture" className="w-full h-auto rounded-[2rem] mx-auto max-w-5xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] group-hover:scale-[1.01] transition-transform duration-700" />
               </div>
            </div>
          )}

          {/* Visual Gallery */}
          {allImages.length > 1 && (
            <div className="mb-40">
               <h2 className="text-4xl font-black mb-16 text-slate-900 tracking-tighter italic uppercase underline decoration-sky-500 decoration-8 underline-offset-[12px]">Execution Gallery</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 {allImages.slice(1).map((img, i) => (
                   <motion.div key={i} whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }} className="rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-xl group bg-slate-50">
                      <img src={getAssetUrl(img)} alt={`Protocol Visual ${i+1}`} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                   </motion.div>
                 ))}
               </div>
            </div>
          )}

          {/* Terminal Controls */}
          <div className="flex items-center justify-between py-12 border-t border-slate-100">
             <Button variant="ghost" onClick={() => navigate('/projects')} className="h-16 px-8 rounded-2xl flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-sky-500 transition-all">
                <ChevronLeft size={18} /> Terminal Exit
             </Button>
             <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest">Protocol Version: 4.8.0-RELEASE</span>
                <Globe size={16} className="text-slate-100" />
             </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
