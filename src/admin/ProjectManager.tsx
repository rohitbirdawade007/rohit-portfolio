import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { API_URL } from '@/services/api';
import { Plus, Trash2, Edit, Globe, Github, Star, Layout, FileText, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    } catch (error) { toast.error("Communication failure with sector."); } 
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
    
    // Custom handling for tech stack
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
        toast.success(`System ${isEditing ? 'recalibrated' : 'deployed'} successfully!`);
        resetForm();
        fetchProjects();
      } else { toast.error("Write failure: Database rejected payload."); }
    } catch { toast.error("Network instability detected."); }
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
    if (!window.confirm("Commence terminal deletion? This action is irreversible.")) return;
    try {
      const res = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
      });
      if (res.ok) { toast.success("Project purged from archives."); fetchProjects(); }
    } catch { toast.error("Purge failure."); }
  };

  const resetForm = () => {
    setIsEditing(false); setCurrentId(null); setFile(null); setFeatured(false);
    setFormData({
      title: '', problemStatement: '', solution: '', results: '',
      description: '', techStack: '', githubUrl: '', demoUrl: '', architectureImage: ''
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">CORE SYSTEMS</h1>
          <p className="text-slate-500 font-medium italic">Manage engineering artifacts and high-fidelity project archives.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
        {/* Creation/Edit Sidebar */}
        <Card className="lg:col-span-1 border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden h-fit sticky top-8 z-20">
          <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <Layout size={16} className="text-indigo-600" />
              {isEditing ? 'Recalibrate Project' : 'Initialize New System'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">System Label</Label>
                <Input id="title" value={formData.title} onChange={handleInputChange} className="h-12 bg-slate-50 dark:bg-slate-800 border-none rounded-xl font-bold" required />
              </div>

              <div className="space-y-2">
                 <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Summary Abstract</Label>
                 <Textarea id="description" value={formData.description} onChange={handleInputChange} className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl font-medium min-h-[100px]" required />
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-2">
                  <Label id="problemLabel" className="text-[10px] font-black uppercase tracking-widest text-rose-500 ml-1 flex items-center gap-2">
                     <FileText size={12} /> Problem Definition
                  </Label>
                  <Textarea id="problemStatement" value={formData.problemStatement} onChange={handleInputChange} className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl font-medium min-h-[80px]" />
                </div>
                <div className="space-y-2">
                  <Label id="solutionLabel" className="text-[10px] font-black uppercase tracking-widest text-emerald-500 ml-1 flex items-center gap-2">
                     <CheckCircle2 size={12} /> Technical Solution
                  </Label>
                  <Textarea id="solution" value={formData.solution} onChange={handleInputChange} className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl font-medium min-h-[80px]" />
                </div>
              </div>

              <div className="space-y-2">
                 <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Calibration Stack (CS Values)</Label>
                 <Input id="techStack" value={formData.techStack} onChange={handleInputChange} placeholder="React, Node.js, ML..." className="h-12 bg-slate-50 dark:bg-slate-800 border-none rounded-xl font-bold" />
              </div>

              <div className="space-y-2">
                 <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Visual Asset</Label>
                 <div className="relative group">
                    <Input id="image" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="h-12 bg-slate-50 dark:bg-slate-800 border-none rounded-xl font-bold file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer" />
                 </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="grid grid-cols-2 gap-3">
                   <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">GitHub Link</Label>
                      <Input id="githubUrl" value={formData.githubUrl} onChange={handleInputChange} className="h-10 bg-slate-50 dark:bg-slate-800 border-none rounded-xl font-medium" />
                   </div>
                   <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Demo URI</Label>
                      <Input id="demoUrl" value={formData.demoUrl} onChange={handleInputChange} className="h-10 bg-slate-50 dark:bg-slate-800 border-none rounded-xl font-medium" />
                   </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl border border-yellow-100 dark:border-yellow-900/20">
                 <input type="checkbox" id="featured" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="w-5 h-5 rounded-md border-yellow-200 text-yellow-500 focus:ring-yellow-500" />
                 <Label htmlFor="featured" className="cursor-pointer font-black text-[10px] uppercase tracking-widest text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
                    <Star size={14} /> Promote as Featured System
                 </Label>
              </div>
            </form>
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 flex gap-2">
              <Button type="button" onClick={handleSubmit} className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 active:scale-95 transition-all">
                {isEditing ? 'Calibrate' : 'Deploy'}
              </Button>
              {isEditing && (
                <Button variant="outline" onClick={resetForm} className="h-12 w-12 rounded-xl border-slate-200 dark:border-slate-700 dark:text-white">
                  ✕
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Existing Projects Grid */}
        <div className="lg:col-span-2 space-y-4">
           {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-44 bg-white dark:bg-slate-900 rounded-[2.5rem] animate-pulse" />
              ))
           ) : projects.length === 0 ? (
              <div className="py-32 text-center bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm">
                 <Layout size={64} className="mx-auto mb-6 text-slate-200" />
                 <p className="text-slate-500 font-black uppercase tracking-widest text-xs">No active systems in current sector.</p>
              </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map(p => (
                  <Card key={p._id} className="group border-none shadow-sm bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-indigo-600/10 transition-all duration-500 flex flex-col">
                    <div className="h-48 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                      {p.featured && (
                        <div className="absolute top-4 left-4 z-10">
                          <Badge className="bg-yellow-400 text-slate-900 font-black px-3 py-1 rounded-full uppercase text-[9px] tracking-tighter">FEATURED</Badge>
                        </div>
                      )}
                      {p.image ? (
                        <img 
                          src={p.image.startsWith('http') ? p.image : `http://localhost:5000${p.image}`} 
                          alt={p.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                           <Layout size={48} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                         <div className="flex gap-2">
                           {p.githubUrl && <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white"><Github size={14}/></div>}
                           {p.demoUrl && <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white"><Globe size={14}/></div>}
                         </div>
                      </div>
                    </div>
                    <CardContent className="p-8 flex flex-col flex-1">
                      <h3 className="font-black text-xl mb-3 tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors uppercase italic">{p.title}</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium line-clamp-2 mb-6 italic leading-relaxed">"{p.description}"</p>
                      
                      <div className="flex gap-2 mt-auto">
                        <Button variant="ghost" onClick={() => editProject(p)} className="flex-1 h-11 bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-indigo-600 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all">
                          <Edit size={14} className="mr-2"/> Recalibrate
                        </Button>
                        <Button variant="ghost" onClick={() => deleteProject(p._id)} className="h-11 w-11 hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-500 rounded-xl transition-all">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
export default ProjectManager;
