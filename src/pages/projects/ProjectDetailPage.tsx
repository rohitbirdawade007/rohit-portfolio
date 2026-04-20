import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProject, getAssetUrl } from '@/services/api';
import { ArrowLeft, Github, ExternalLink, Code2, AlertCircle, LayoutTemplate, TrendingUp, CheckCircle2, ChevronLeft } from 'lucide-react';
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
      .catch(() => setError('Project not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-pulse space-y-4 w-full max-w-4xl px-4 text-center">
        <div className="h-12 w-12 bg-slate-100 rounded-full mx-auto" />
        <div className="h-8 bg-slate-100 rounded w-3/4 mx-auto" />
        <div className="h-96 bg-slate-100 rounded-[2.5rem] mt-10" />
      </div>
    </div>
  );

  if (error || !project) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-slate-900 gap-6">
      <div className="w-20 h-20 rounded-3xl bg-red-50 flex items-center justify-center text-red-500">
        <AlertCircle size={40} />
      </div>
      <h2 className="text-2xl font-bold tracking-tight">{error || 'Project Not Found'}</h2>
      <Button 
        onClick={() => navigate('/')} 
        className="btn-secondary"
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Home
      </Button>
    </div>
  );

  const allImages = [project.image, ...(project.images || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container max-w-6xl">
          {/* Top Navigation */}
          <div className="flex items-center mb-12">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-sky-500 transition-colors"
            >
              <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center">
                <ChevronLeft size={16} />
              </div>
              Back to Portfolio
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 mb-20 animate-fadeUp">
             {/* Left: Info */}
             <div className="flex-1">
                <div className="badge-tech mb-6 inline-block uppercase">
                  {project.category || "ENGINEERING"}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                  {project.title}
                </h1>
                <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  {project.githubUrl && (
                    <Button 
                      onClick={() => window.open(project.githubUrl, '_blank')}
                      className="btn-secondary h-12"
                    >
                      <Github size={18} className="mr-2" /> View Source
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button 
                      onClick={() => window.open(project.demoUrl, '_blank')}
                      className="btn-primary h-12"
                    >
                      <ExternalLink size={18} className="mr-2" /> Live Project
                    </Button>
                  )}
                </div>
             </div>

             {/* Right: Overview Card style */}
             <div className="w-full lg:w-4/12">
                <div className="p-8 bg-slate-50 border border-slate-100 rounded-3xl sticky top-24">
                   <h3 className="text-lg font-bold mb-6 uppercase tracking-tight">Project Overview</h3>
                   <div className="space-y-6">
                      <div>
                         <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-widest">Released</span>
                         <span className="font-bold text-slate-900">{new Date(project.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div>
                         <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-widest">Role</span>
                         <span className="font-bold text-slate-900">Lead Engineer</span>
                      </div>
                      <div>
                         <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-widest">Tech Stack</span>
                         <div className="flex flex-wrap gap-2 mt-2">
                           {project.techStack?.map(tech => (
                             <span key={tech} className="px-2 py-1 bg-white border border-slate-200 text-[10px] font-bold text-slate-500 rounded">
                               {tech}
                             </span>
                           ))}
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Large Media */}
          {allImages[0] && (
            <div className="mb-20 rounded-[3rem] overflow-hidden border border-slate-100 shadow-2xl animate-fadeUp">
               <img 
                 src={getAssetUrl(allImages[0])} 
                 alt={project.title} 
                 className="w-full h-auto max-h-[800px] object-cover" 
               />
            </div>
          )}

          {/* Deep Dive Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 animate-fadeUp">
              {project.problemStatement && (
                <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
                   <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-6">
                      <AlertCircle size={24} />
                   </div>
                   <h2 className="text-2xl font-bold mb-4 tracking-tight">The Challenge</h2>
                   <p className="text-slate-600 leading-relaxed font-medium">{project.problemStatement}</p>
                </div>
              )}
              
              {project.solution && (
                <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
                   <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center mb-6">
                      <CheckCircle2 size={24} />
                   </div>
                   <h2 className="text-2xl font-bold mb-4 tracking-tight">The Solution</h2>
                   <p className="text-slate-600 leading-relaxed font-medium">{project.solution}</p>
                </div>
              )}
          </div>

          {/* Results Block */}
          {project.results && (
             <div className="bg-sky-500 rounded-[3rem] p-12 md:p-20 text-center mb-20 text-white animate-fadeUp">
                 <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-8">
                    <TrendingUp size={32} />
                 </div>
                 <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">Measurable Impact</h2>
                 <p className="text-xl md:text-2xl opacity-90 font-bold max-w-3xl mx-auto italic">
                   "{project.results}"
                 </p>
             </div>
          )}

          {/* Architecture (if present) */}
          {project.architectureImage && (
            <div className="text-center animate-fadeUp mb-20">
               <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest text-slate-400">System Architecture</h2>
               <div className="bg-slate-50 border border-slate-100 rounded-[3rem] p-8 md:p-16">
                  <img src={getAssetUrl(project.architectureImage)} alt="Architecture" className="w-full h-auto rounded-3xl mx-auto max-w-4xl shadow-xl" />
               </div>
            </div>
          )}

          {/* Gallery */}
          {allImages.length > 1 && (
            <div className="mb-32 animate-fadeUp">
               <h2 className="text-2xl font-bold mb-10 text-slate-900">Project Gallery</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-inter">
                 {allImages.slice(1).map((img, i) => (
                   <div key={i} className="rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-lg group">
                      <img src={getAssetUrl(img)} alt={`Gallery ${i+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   </div>
                 ))}
               </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
