import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { API_URL } from '@/services/api';
import { Trash2, Edit, Beaker, Zap, FileSearch, ArrowUpRight, Plus, Terminal, Save, Tag, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Research {
  _id: string;
  title: string;
  status: string;
  description: string;
  abstract?: string;
  keywords?: string[];
  authors?: string;
  journal?: string;
  year?: string;
  link?: string;
}

const ResearchManager = () => {
  const [researchList, setResearchList] = useState<Research[]>([]);
  const [formData, setFormData] = useState({
    title: '', status: '', description: '', abstract: '', keywords: '', authors: '', journal: '', year: '', link: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchResearch(); }, []);

  const fetchResearch = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/research`);
      const data = await res.json();
      setResearchList(Array.isArray(data) ? data : []);
    } catch {
      setResearchList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const url = isEditing ? `${API_URL}/research/${currentId}` : `${API_URL}/research`;
    
    // Convert comma-separated keywords to array
    const payload = {
      ...formData,
      keywords: formData.keywords ? formData.keywords.split(',').map(k => k.trim()).filter(Boolean) : []
    };

    try {
      const res = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success(isEditing ? "Protocol recalibrated" : "Research node initialized");
        resetForm();
        fetchResearch();
      }
    } catch {
      toast.error("Synchronization failure");
    }
  };

  const resetForm = () => {
    setFormData({ title: '', status: '', description: '', abstract: '', keywords: '', authors: '', journal: '', year: '', link: '' });
    setIsEditing(false);
    setCurrentId(null);
  };

  const editItem = (item: Research) => {
    setIsEditing(true);
    setCurrentId(item._id);
    setFormData({
      title: item.title,
      status: item.status,
      description: item.description,
      abstract: item.abstract || '',
      keywords: item.keywords ? item.keywords.join(', ') : '',
      authors: item.authors || '',
      journal: item.journal || '',
      year: item.year || '',
      link: item.link || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Confirm protocol archival?")) return;
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`${API_URL}/research/${id}`, { 
        method: 'DELETE', 
        headers: { 'Authorization': `Bearer ${token}` } 
      });
      toast.success("Research node purged");
      fetchResearch();
    } catch {
      toast.error("Cleanup failure");
    }
  };

  return (
    <div className="space-y-10 pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
           <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">Research <span className="text-[#6C63FF]">Protocols</span></h1>
           <p className="text-slate-500 font-medium text-lg">Manage technical exploration, experimental documentation, and active papers.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Form Panel */}
        <div className="lg:col-span-5 h-fit sticky top-10">
          <Card className="border border-slate-100 bg-white shadow-sm rounded-[2.5rem] overflow-hidden">
             <CardHeader className="p-10 border-b border-slate-50 bg-slate-50/20">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-2xl bg-white border border-slate-50 text-[#6C63FF] flex items-center justify-center shadow-sm">
                    <Beaker size={20} />
                 </div>
                 <CardTitle className="text-xl font-black tracking-tighter uppercase italic">
                   {isEditing ? 'Recalibrate Item' : 'New Investigation'}
                 </CardTitle>
               </div>
             </CardHeader>
             <CardContent className="p-10">
               <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Paper Title</Label>
                    <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold focus:bg-white transition-all"/>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Status</Label>
                      <Input required value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} placeholder="Published / In Progress" className="h-12 bg-slate-50/50 border-slate-100 rounded-2xl font-bold text-sm"/>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Year</Label>
                      <Input value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} placeholder="2025" className="h-12 bg-slate-50/50 border-slate-100 rounded-2xl font-bold text-sm"/>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Authors</Label>
                      <Input value={formData.authors} onChange={e => setFormData({...formData, authors: e.target.value})} placeholder="Rohit Birdawade et al." className="h-12 bg-slate-50/50 border-slate-100 rounded-2xl font-bold text-sm"/>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Journal / Conf.</Label>
                      <Input value={formData.journal} onChange={e => setFormData({...formData, journal: e.target.value})} placeholder="IEEE Access" className="h-12 bg-slate-50/50 border-slate-100 rounded-2xl font-bold text-sm"/>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Short Description</Label>
                    <Textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Brief overview of the research..." className="bg-slate-50/50 border-slate-100 rounded-2xl min-h-[80px] font-medium leading-relaxed text-sm" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-1.5">
                      <FileText size={10} /> Abstract
                    </Label>
                    <Textarea value={formData.abstract} onChange={e => setFormData({...formData, abstract: e.target.value})} placeholder="Full abstract of the paper..." className="bg-slate-50/50 border-slate-100 rounded-2xl min-h-[140px] font-medium leading-relaxed text-sm" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-1.5">
                      <Tag size={10} /> Keywords
                    </Label>
                    <Input value={formData.keywords} onChange={e => setFormData({...formData, keywords: e.target.value})} placeholder="AI, IoT, Machine Learning, Edge Computing" className="h-12 bg-slate-50/50 border-slate-100 rounded-2xl font-bold text-sm"/>
                    <p className="text-[9px] text-slate-400 ml-1">Separate with commas</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Publication Link</Label>
                    <Input value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} placeholder="https://doi.org/..." className="h-12 bg-slate-50/50 border-slate-100 rounded-2xl font-bold text-sm"/>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="submit" className="flex-1 h-14 bg-[#6C63FF] hover:bg-[#5B54E6] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-[#6C63FF]/20 active:scale-95 transition-all">
                      <Save size={16} className="mr-2" /> {isEditing ? 'UPDATE' : 'PUBLISH'}
                    </Button>
                    {isEditing && (
                      <Button type="button" variant="outline" onClick={resetForm} className="h-14 w-14 rounded-2xl border-slate-200">
                        <Plus className="rotate-45" />
                      </Button>
                    )}
                  </div>
               </form>
             </CardContent>
          </Card>
        </div>

        {/* List Panel */}
        <div className="lg:col-span-7 space-y-6">
          {loading ? (
             Array.from({ length: 3 }).map((_, i) => (
               <div key={i} className="h-32 bg-slate-50 border border-slate-100 rounded-[2rem] animate-pulse" />
             ))
          ) : researchList.length === 0 ? (
            <div className="py-40 text-center bg-slate-50 rounded-[3rem] border border-slate-100 border-dashed">
               <FileSearch size={64} className="mx-auto mb-6 text-slate-200" />
               <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No research protocols in repository</p>
            </div>
          ) : (
            <AnimatePresence>
               {researchList.map((item, idx) => (
                 <motion.div key={item._id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                    <Card className="group border border-slate-100 bg-white rounded-[2rem] overflow-hidden hover:shadow-xl transition-all duration-300 shadow-sm">
                      <CardContent className="p-8">
                        {/* Top row */}
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-2xl bg-[#6C63FF]/5 text-[#6C63FF] flex items-center justify-center border border-[#6C63FF]/15 shrink-0">
                                <Terminal size={18} />
                             </div>
                             <div className="flex items-center gap-2 flex-wrap">
                               <span className={`text-[9px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-full ${item.status.toLowerCase().includes('pub') ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                                  {item.status}
                               </span>
                               {item.year && <span className="text-[9px] font-bold text-slate-400">{item.year}</span>}
                             </div>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <Button size="icon" variant="ghost" onClick={() => editItem(item)} className="h-9 w-9 rounded-xl bg-slate-50 hover:bg-[#6C63FF]/5 text-[#6C63FF] border border-slate-50"><Edit size={14}/></Button>
                            <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl bg-rose-50/30 hover:bg-rose-50 text-rose-500 border border-rose-50" onClick={() => deleteItem(item._id)}><Trash2 size={14}/></Button>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2 group-hover:text-[#6C63FF] transition-colors leading-snug">
                           {item.title}
                        </h3>

                        {/* Authors */}
                        {item.authors && (
                          <p className="text-[11px] text-slate-400 font-medium mb-3">
                            {item.authors}{item.journal ? ` · ${item.journal}` : ''}
                          </p>
                        )}

                        {/* Description */}
                        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-4 line-clamp-2">
                           {item.description}
                        </p>

                        {/* Abstract preview */}
                        {item.abstract && (
                          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 mb-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
                              <FileText size={10} /> Abstract
                            </p>
                            <p className="text-[12px] text-slate-500 italic leading-relaxed line-clamp-3">
                              {item.abstract}
                            </p>
                          </div>
                        )}

                        {/* Keywords */}
                        {item.keywords && item.keywords.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <Tag size={10} className="text-slate-300 shrink-0" />
                            {item.keywords.map((kw, ki) => (
                              <span key={ki} className="px-2 py-0.5 bg-[#6C63FF]/5 border border-[#6C63FF]/10 rounded-full text-[9px] font-semibold text-[#6C63FF]">
                                {kw}
                              </span>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                 </motion.div>
               ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchManager;
