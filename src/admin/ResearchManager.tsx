import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { API_URL } from '@/services/api';
import { Trash2, Edit, Beaker, Zap, FileSearch, ArrowUpRight, Plus, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Research {
  _id: string;
  title: string;
  status: string;
  description: string;
}

const ResearchManager = () => {
  const [researchList, setResearchList] = useState<Research[]>([]);
  const [formData, setFormData] = useState({ title: '', status: '', description: '' });
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
    try {
      const res = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success(isEditing ? "Protocol recalibrated" : "Research node initialized");
        setFormData({ title: '', status: '', description: '' });
        setIsEditing(false);
        fetchResearch();
      }
    } catch {
      toast.error("Synchronization failure");
    }
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
           <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">Research <span className="text-sky-500">Protocols</span></h1>
           <p className="text-slate-500 font-medium text-lg">Manage technical exploration, experimental documentation, and active papers.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Form Panel */}
        <div className="lg:col-span-4 h-fit sticky top-10">
          <Card className="border border-slate-100 bg-white shadow-sm rounded-[2.5rem] overflow-hidden">
             <CardHeader className="p-10 border-b border-slate-50 bg-slate-50/20">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-2xl bg-white border border-slate-50 text-sky-500 flex items-center justify-center shadow-sm">
                    <Beaker size={20} />
                 </div>
                 <CardTitle className="text-xl font-black tracking-tighter uppercase italic">
                   {isEditing ? 'Recalibrate Item' : 'New Investigation'}
                 </CardTitle>
               </div>
             </CardHeader>
             <CardContent className="p-10">
               <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Protocol Title</Label>
                    <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold focus:bg-white transition-all"/>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Current Status Flag</Label>
                    <Input required value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} placeholder="E.g. In Progress / Published" className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold focus:bg-white transition-all shadow-inner"/>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Investigation Abstract</Label>
                    <Textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="bg-slate-50/50 border-slate-100 rounded-[2rem] min-h-[160px] font-medium leading-relaxed" />
                  </div>

                  <div className="flex gap-3 pt-6">
                    <Button type="submit" className="flex-1 h-16 bg-sky-500 hover:bg-sky-600 text-white rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-sky-500/20 active:scale-95 transition-all">
                      <Save size={18} className="mr-2" /> {isEditing ? 'UPDATE' : 'INITIATE'}
                    </Button>
                    {isEditing && (
                      <Button type="button" variant="outline" onClick={() => { setIsEditing(false); setFormData({title:'', status:'', description:''}); }} className="h-16 w-16 rounded-3xl border-slate-200">
                        <Plus className="rotate-45" />
                      </Button>
                    )}
                  </div>
               </form>
             </CardContent>
          </Card>
        </div>

        {/* List Panel */}
        <div className="lg:col-span-8 space-y-6">
          {loading ? (
             Array.from({ length: 3 }).map((_, i) => (
               <div key={i} className="h-32 bg-slate-50 border border-slate-100 rounded-[3rem] animate-pulse" />
             ))
          ) : researchList.length === 0 ? (
            <div className="py-40 text-center bg-slate-50 rounded-[4rem] border border-slate-100 border-dashed">
               <FileSearch size={64} className="mx-auto mb-6 text-slate-200" />
               <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No research protocols identified in repository</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <AnimatePresence>
                 {researchList.map((item, idx) => (
                   <motion.div key={item._id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }}>
                      <Card className="group border border-slate-100 bg-white rounded-[3rem] overflow-hidden hover:shadow-2xl transition-all duration-500 shadow-sm flex flex-col h-full">
                        <CardHeader className="p-8 pb-4 flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center border border-sky-100 group-hover:rotate-12 transition-transform">
                                 <Terminal size={18} />
                              </div>
                              <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${item.status.toLowerCase().includes('pub') ? 'bg-emerald-50 text-emerald-500 border border-emerald-100' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}>
                                 {item.status}
                              </span>
                           </div>
                           <div className="flex gap-2">
                             <Button size="icon" variant="ghost" onClick={() => { setIsEditing(true); setCurrentId(item._id); setFormData({title: item.title, status: item.status, description: item.description}); window.scrollTo({top:0, behavior:'smooth'}); }} className="h-10 w-10 rounded-xl bg-slate-50 hover:bg-sky-50 text-sky-600 transition-all border border-slate-50"><Edit size={14}/></Button>
                             <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl bg-rose-50/30 hover:bg-rose-50 text-rose-500 transition-all border border-rose-50" onClick={() => deleteItem(item._id)}><Trash2 size={14}/></Button>
                           </div>
                        </CardHeader>
                        <CardContent className="p-8 pt-0 flex flex-col flex-1">
                           <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic mb-4 group-hover:text-sky-500 transition-colors leading-tight">
                              {item.title}
                           </h3>
                           <p className="text-slate-500 text-sm font-medium line-clamp-4 italic flex-1">
                              "{item.description}"
                           </p>
                           <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between text-sky-500 opacity-0 group-hover:opacity-100 transition-all">
                              <span className="text-[9px] font-black uppercase tracking-widest">Protocol Identified</span>
                              <ArrowUpRight size={18} />
                           </div>
                        </CardContent>
                      </Card>
                   </motion.div>
                 ))}
               </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchManager;
