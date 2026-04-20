import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { API_URL, getAssetUrl } from '@/services/api';
import { Plus, Trash2, Edit, Globe, Github, Star, Layout, FileText, CheckCircle2, Package, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface Project {
  _id: string;
  title: string;
  problemStatement?: string;
  solution?: string;
  results?: string;
  description: string;
  techStack: string[];
  image: string;
  architectureImage?: string;
  githubUrl: string;
  demoUrl: string;
  featured?: boolean;
}

const ProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '', problemStatement: '', solution: '', results: '',
    description: '', techStack: '', githubUrl: '', demoUrl: '', architectureImage: ''
  });
  const [featured, setFeatured] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/projects`);
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) { toast.error("System connection failure."); } 
    finally { setLoading(false); }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append('featured', String(featured));
    
    const techArray = formData.techStack.split(',').map(s => s.trim()).filter(Boolean);
    data.set('techStack', JSON.stringify(techArray));
    
    if (file) data.append('image', file);

    try {
      const url = isEditing && currentId ? `${API_URL}/projects/${currentId}` : `${API_URL}/projects`;
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: data,
      });
      if (response.ok) {
        toast.success(`Node ${isEditing ? 'recalibrated' : 'synchronized'} successfully!`);
        resetForm();
        fetchProjects();
      } else { toast.error("Database rejection."); }
    } catch { toast.error("Network instability."); }
  };

  const editProject = (project: Project) => {
    setIsEditing(true); setCurrentId(project._id);
    setFormData({
      title: project.title, problemStatement: project.problemStatement || '',
      solution: project.solution || '', results: project.results || '',
      description: project.description, techStack: project.techStack.join(', '),
      githubUrl: project.githubUrl, demoUrl: project.demoUrl,
      architectureImage: project.architectureImage || ''
    });
    setFeatured(Boolean(project.featured));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteProject = async (id: string) => {
    if (!window.confirm("Verify archival termination?")) return;
    try {
      const res = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
      });
      if (res.ok) { toast.success("Node purged."); fetchProjects(); }
    } catch { toast.error("Operation failed."); }
  };

  const resetForm = () => {
    setIsEditing(false); setCurrentId(null); setFile(null); setFeatured(false);
    setFormData({
      title: '', problemStatement: '', solution: '', results: '',
      description: '', techStack: '', githubUrl: '', demoUrl: '', architectureImage: ''
    });
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
           <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">Project <span className="text-sky-500">Registry</span></h1>
           <p className="text-slate-500 font-medium text-lg">Manage technical artifacts and case studies.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Form Sidebar */}
        <div className="lg:col-span-5 h-fit sticky top-10">
           <Card className="border border-slate-100 bg-white shadow-sm rounded-[2.5rem] overflow-hidden">
             <CardHeader className="p-10 border-b border-slate-50 bg-slate-50/30">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-sky-500 shadow-sm">
                    <Package size={20} />
                 </div>
                 <CardTitle className="text-xl font-black tracking-tighter">
                   {isEditing ? 'Node Correction' : 'Initialize Node'}
                 </CardTitle>
               </div>
             </CardHeader>
             <CardContent className="p-10 space-y-8">
               <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-3">
                     <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">System Label</Label>
                     <Input id="title" value={formData.title} onChange={handleInputChange} className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold focus:bg-white transition-all shadow-inner" placeholder="E.g. Neural Nexus V1" required />
                  </div>

                  <div className="space-y-3">
                     <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Core Description</Label>
                     <Textarea id="description" value={formData.description} onChange={handleInputChange} className="min-h-[120px] bg-slate-50/50 border-slate-100 rounded-2xl font-medium focus:bg-white transition-all shadow-inner" placeholder="Provide high-level context..." required />
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-50">
                    <div className="space-y-3">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tech Stack</Label>
                       <Input id="techStack" value={formData.techStack} onChange={handleInputChange} className="h-12 bg-slate-50/50 border-slate-100 rounded-2xl text-xs font-bold" placeholder="React, PyTorch..." />
                    </div>
                    <div className="space-y-3">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Visual Asset</Label>
                       <Input id="image" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="h-12 bg-slate-50/50 border-slate-100 rounded-2xl text-[10px] font-bold file:bg-sky-50 file:text-sky-600 file:border-0 file:rounded-full file:mr-2 cursor-pointer" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-5 bg-sky-50 rounded-[2rem] border border-sky-100 shadow-sm">
                     <input type="checkbox" id="featured" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="w-5 h-5 rounded-md border-sky-200 text-sky-500 focus:ring-sky-500" />
                     <Label htmlFor="featured" className="cursor-pointer font-black text-[10px] uppercase tracking-widest text-sky-700 flex items-center gap-2">
                        <Star size={14} className="fill-sky-500" /> Promote as Featured System
                     </Label>
                  </div>

                  <div className="flex gap-4 pt-6 border-t border-slate-50">
                    <Button type="submit" className="flex-1 h-14 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-sky-500/20 active:scale-95 transition-all">
                      {isEditing ? 'Synchronize' : 'Deploy Node'}
                    </Button>
                    {isEditing && (
                      <Button variant="outline" onClick={resetForm} className="h-14 w-14 rounded-2xl border-slate-200 text-slate-400 hover:text-slate-900 transition-all">
                        <Plus className="rotate-45" />
                      </Button>
                    )}
                  </div>
               </form>
             </CardContent>
           </Card>
        </div>

        {/* Existing Grid */}
        <div className="lg:col-span-7 space-y-8">
           {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {Array.from({ length: 4 }).map((_, i) => (
                 <div key={i} className="h-64 bg-slate-50 rounded-[3rem] animate-pulse border border-slate-100" />
               ))}
             </div>
           ) : projects.length === 0 ? (
             <div className="py-40 text-center bg-slate-50 rounded-[3rem] border border-slate-100">
               <Package size={64} className="mx-auto mb-6 text-slate-200" />
               <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Registry Empty</p>
             </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {projects.map((p, idx) => (
                 <motion.div key={p._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                    <Card className="group border border-slate-100 bg-white rounded-[3rem] overflow-hidden hover:shadow-2xl transition-all duration-500 shadow-sm flex flex-col h-full">
                       <div className="h-44 bg-slate-50 relative overflow-hidden">
                          {p.featured && (
                             <div className="absolute top-6 left-6 z-10">
                               <Badge className="bg-sky-500 text-white font-black px-3 py-1 rounded-full uppercase text-[9px] tracking-widest border-none shadow-lg">FEATURED</Badge>
                             </div>
                          )}
                          <img src={getAssetUrl(p.image)} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                       </div>
                       <CardContent className="p-8 flex flex-col flex-1">
                          <h3 className="font-black text-xl mb-3 tracking-tighter text-slate-900 group-hover:text-sky-500 transition-colors uppercase italic">{p.title}</h3>
                          <p className="text-slate-500 text-sm font-medium line-clamp-2 mb-8 italic">"{p.description}"</p>
                          
                          <div className="flex gap-2 mt-auto">
                             <Button variant="ghost" onClick={() => editProject(p)} className="flex-1 h-12 bg-slate-50 hover:bg-sky-50 text-sky-600 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all border border-slate-100">
                               <Edit size={14} className="mr-2"/> Recalibrate
                             </Button>
                             <Button variant="ghost" onClick={() => deleteProject(p._id)} className="h-12 w-12 bg-rose-50/50 hover:bg-rose-50 text-rose-500 rounded-xl border border-rose-100 transition-all">
                               <Trash2 size={16} />
                             </Button>
                          </div>
                       </CardContent>
                    </Card>
                 </motion.div>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default ProjectManager;
