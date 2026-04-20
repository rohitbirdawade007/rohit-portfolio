import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { API_URL } from '@/services/api';
import { Plus, Trash2, Edit, Zap, Cpu, Brain, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface Skill {
  _id: string;
  name: string;
  description: string;
  proficiency: number;
}

const SkillManager = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    proficiency: 80,
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch(`${API_URL}/skills`);
      const data = await res.json();
      setSkills(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Telemetry failure.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    try {
      const url = isEditing ? `${API_URL}/skills/${currentId}` : `${API_URL}/skills`;
      const method = isEditing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success(`Skill ${isEditing ? 'recalibrated' : 'injected'}`);
        setFormData({ name: '', description: '', proficiency: 80 });
        setIsEditing(false);
        setCurrentId(null);
        fetchSkills();
      }
    } catch (error) {
      toast.error("Injection failure.");
    }
  };

  const deleteSkill = async (id: string) => {
    if (!window.confirm("Purge this capability?")) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_URL}/skills/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success("Skill purged.");
        fetchSkills();
      }
    } catch (error) {
      toast.error("Operation failed.");
    }
  };

  return (
    <div className="space-y-10 pb-12">
      <div className="px-2">
         <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">Skill <span className="text-sky-500">Inventory</span></h1>
         <p className="text-slate-500 font-medium text-lg">Calibrate technical competencies and proficiency levels.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Form Sidebar */}
        <div className="lg:col-span-5 h-fit sticky top-10">
           <Card className="border border-slate-100 bg-white shadow-sm rounded-[2.5rem] overflow-hidden">
             <CardHeader className="p-10 border-b border-slate-50 bg-slate-50/30">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-sky-500 shadow-sm">
                    <Activity size={20} />
                 </div>
                 <CardTitle className="text-xl font-black tracking-tighter">
                   {isEditing ? 'Skill Calibration' : 'Initialize Skill'}
                 </CardTitle>
               </div>
             </CardHeader>
             <CardContent className="p-10 space-y-8">
               <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-3">
                     <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Capability Label</Label>
                     <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold focus:bg-white transition-all shadow-inner" placeholder="E.g. Neural Arch" required />
                  </div>

                  <div className="space-y-3">
                     <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Technical Annotation</Label>
                     <Input value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-medium focus:bg-white transition-all shadow-inner" placeholder="Optional context..." />
                  </div>

                  <div className="space-y-5">
                    <div className="flex justify-between items-center px-1">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Proficiency Score</Label>
                       <span className="text-sm font-black text-sky-500">{formData.proficiency}%</span>
                    </div>
                    <div className="flex items-center gap-6">
                       <Input type="number" value={formData.proficiency} onChange={(e) => setFormData({...formData, proficiency: parseInt(e.target.value)})} className="h-14 w-28 bg-slate-50/50 border-slate-100 rounded-2xl font-black text-center text-lg" required min="0" max="100" />
                       <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${formData.proficiency}%` }} className="h-full bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.4)]" />
                       </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button type="submit" className="flex-1 h-14 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-sky-500/20 active:scale-95 transition-all">
                      {isEditing ? 'Synchronize' : 'Deploy Skill'}
                    </Button>
                    {isEditing && (
                      <Button variant="outline" onClick={() => { setIsEditing(false); setFormData({name: '', description: '', proficiency: 80}); }} className="h-14 w-14 rounded-2xl border-slate-200">
                        <Plus className="rotate-45" />
                      </Button>
                    )}
                  </div>
               </form>
             </CardContent>
           </Card>
        </div>

        {/* Existing Grid */}
        <div className="lg:col-span-7 space-y-6">
           {loading ? (
             Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-24 bg-slate-50 rounded-3xl animate-pulse border border-slate-100" />
             ))
           ) : skills.map((s, idx) => (
             <motion.div key={s._id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}>
               <Card className="border border-slate-100 bg-white rounded-[2rem] overflow-hidden hover:shadow-xl transition-all duration-300 group shadow-sm">
                 <CardContent className="p-8 flex items-center justify-between gap-8">
                   <div className="flex-1">
                     <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-sky-50 group-hover:text-sky-500 transition-colors border border-slate-100">
                           <Cpu size={18} />
                        </div>
                        <div>
                           <h3 className="font-black text-slate-900 uppercase tracking-tight">{s.name}</h3>
                           <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mt-1">{s.description || 'No system annotation.'}</p>
                        </div>
                        <Badge className="ml-auto bg-sky-50 text-sky-600 border-none px-3 py-1 rounded-full text-[10px] font-black tracking-tighter">{s.proficiency}%</Badge>
                     </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                        <div className="h-full bg-sky-500/30" style={{ width: `${s.proficiency}%` }} />
                      </div>
                   </div>
                   <div className="flex gap-2">
                     <Button size="icon" variant="ghost" onClick={() => { setIsEditing(true); setCurrentId(s._id); setFormData({name: s.name, description: s.description, proficiency: s.proficiency}); }} className="h-12 w-12 rounded-xl hover:bg-sky-50 text-sky-600 transition-all border border-slate-50"><Edit size={16}/></Button>
                     <Button size="icon" variant="ghost" className="h-12 w-12 rounded-xl text-rose-500 hover:bg-rose-50 transition-all border border-slate-50" onClick={() => deleteSkill(s._id)}><Trash2 size={16}/></Button>
                   </div>
                 </CardContent>
               </Card>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default SkillManager;
