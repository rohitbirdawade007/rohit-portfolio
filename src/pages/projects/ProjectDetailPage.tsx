import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProject } from '@/services/api';
import { ArrowLeft, Github, ExternalLink, Code2, AlertCircle, LayoutTemplate, TrendingUp, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
      .catch(() => setError('Project not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="animate-pulse space-y-4 w-full max-w-4xl px-4 text-center">
        <div className="h-12 w-12 bg-white/5 rounded-full mx-auto" />
        <div className="h-8 bg-white/5 rounded w-3/4 mx-auto" />
        <div className="h-96 bg-white/5 rounded-[2.5rem] mt-10" />
      </div>
    </div>
  );

  if (error || !project) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white gap-6">
      <div className="w-20 h-20 rounded-3xl bg-rose-500/10 flex items-center justify-center text-rose-500">
        <AlertCircle size={40} />
      </div>
      <p className="text-2xl font-black italic tracking-tight">{error || '404: SYSTEM NOT FOUND'}</p>
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-sm font-black uppercase tracking-widest transition-all"
      >
        <ArrowLeft size={16} /> Return to Home
      </button>
    </div>
  );

  const allImages = [project.image, ...(project.images || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-950 text-white font-jakarta transition-colors duration-300 flex flex-col selection:bg-primary selection:text-white">
      <Navbar />

      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse-slow font-jakarta" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10 flex-grow pt-40 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back link */}
          <div className="flex justify-center mb-16">
            <Link to="/projects" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-primary transition-all">
              <div className="p-2 rounded-full border border-white/5 group-hover:bg-primary/20 transition-all">
                <ArrowLeft size={14} /> 
              </div>
              Back to Archive
            </Link>
          </div>

          {/* Case Study Hero */}
          <div className="text-center max-w-4xl mx-auto mb-24 animate-fadeUp">
            {project.category && (
              <Badge className="bg-primary/10 border-primary/20 text-primary font-black px-5 py-2 rounded-full mb-8 text-[10px] tracking-[0.2em] uppercase">
                {project.category}
              </Badge>
            )}
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[1.1] italic">
              {project.title.split(' ').map((word, i) => i === 0 ? word : <span key={i}> {word}</span>)}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-medium max-w-3xl mx-auto">
              {project.description}
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all font-black text-xs uppercase tracking-widest shadow-xl">
                  <Github size={20} /> View Repository
                </a>
              )}
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-primary text-white hover:scale-105 active:scale-95 rounded-2xl transition-all shadow-2xl shadow-primary/30 font-black text-xs uppercase tracking-widest">
                  <ExternalLink size={20} /> Launch Console
                </a>
              )}
            </div>
          </div>

          {/* Hero Image */}
          {allImages[0] && (
            <div className="mb-20 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 animate-fadeUp animate-delay-100">
               <img 
                 src={allImages[0].startsWith('http') || allImages[0].startsWith('/lovable-uploads') ? allImages[0] : `http://localhost:5000${allImages[0]}`} 
                 alt="Hero" 
                 className="w-full h-auto max-h-[600px] object-cover" 
               />
            </div>
          )}

          {/* Core Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 animate-fadeUp animate-delay-200">
              {project.problemStatement && (
                <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <AlertCircle size={80} className="text-red-500" />
                   </div>
                   <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-red-500">
                      <AlertCircle size={24} /> The Problem
                   </h2>
                   <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{project.problemStatement}</p>
                </div>
              )}
              
              {project.solution && (
                <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <CheckCircle2 size={80} className="text-green-500" />
                   </div>
                   <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-green-500">
                      <CheckCircle2 size={24} /> The Solution
                   </h2>
                   <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{project.solution}</p>
                </div>
              )}
          </div>

          {/* Architecture & Deep Dive */}
          <div className="mb-20 space-y-20">
             {project.architectureImage && (
               <div className="text-center animate-fadeUp">
                  <h2 className="text-2xl font-bold mb-8 flex items-center justify-center gap-3 text-gray-900 dark:text-white">
                    <LayoutTemplate size={24} className="text-primary"/> System Architecture
                  </h2>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-6 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm">
                     <img 
                       src={project.architectureImage.startsWith('http') || project.architectureImage.startsWith('/lovable-uploads') ? project.architectureImage : `http://localhost:5000${project.architectureImage}`} 
                       alt="Architecture" 
                       className="w-full h-auto rounded-xl mx-auto max-w-4xl" 
                     />
                  </div>
               </div>
             )}

             {project.fullDescription && (
              <section className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800 animate-fadeUp">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Deep Dive</h2>
                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {project.fullDescription}
                </div>
              </section>
            )}

            {/* Metrics/Results */}
            {project.results && (
               <div className="bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 p-8 md:p-12 rounded-3xl text-center max-w-3xl mx-auto animate-fadeUp">
                   <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-3 text-primary">
                      <TrendingUp size={24} /> Results & Impact
                   </h2>
                   <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed font-bold italic">"{project.results}"</p>
               </div>
            )}
          </div>

          {/* Image Gallery */}
          {allImages.length > 1 && (
            <div className="mb-20 animate-fadeUp">
               <h2 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">Gallery Showcase</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {allImages.slice(1).map((img, i) => (
                   <div key={i} className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all h-64 bg-gray-100 dark:bg-gray-900 group">
                      <img 
                        src={img.startsWith('http') || img.startsWith('/lovable-uploads') ? img : `http://localhost:5000${img}`} 
                        alt={`Gallery ${i+1}`} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                   </div>
                 ))}
               </div>
            </div>
          )}

          {/* Tech Stack */}
          {project.techStack?.length > 0 && (
            <section className="text-center animate-fadeUp">
              <h2 className="text-xl font-bold mb-8 flex items-center justify-center gap-2 text-gray-400">
                <Code2 size={20} /> Built With
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:border-primary/30 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
