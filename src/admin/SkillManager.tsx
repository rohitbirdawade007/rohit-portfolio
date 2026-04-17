import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { API_URL } from '@/services/api';
import { Plus, Trash2, Edit, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
      toast.error("Failed to fetch skills");
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
        toast.success(`Skill ${isEditing ? 'updated' : 'added'}`);
        setFormData({ name: '', description: '', proficiency: 80 });
        setIsEditing(false);
        setCurrentId(null);
        fetchSkills();
      }
    } catch (error) {
      toast.error("Process failed");
    }
  };

  const deleteSkill = async (id: string) => {
    if (!window.confirm("Archive this capability?")) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_URL}/skills/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success("Capability archived.");
        fetchSkills();
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic">CAPABILITIES</h1>
          <p className="text-slate-500 font-medium italic">Define and calibrate your professional skill sets.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden h-fit sticky top-8">
          <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <Plus size={16} className="text-indigo-600" />
              {isEditing ? 'Modify Protocol' : 'Initialize Skill'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Calibration Name</Label>
                <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="h-12 bg-slate-50 private-border dark:bg-slate-800 border-none rounded-xl font-bold" required />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Brief Annotation</Label>
                <Input value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="h-12 bg-slate-50 private-border dark:bg-slate-800 border-none rounded-xl font-medium" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Proficiency Level (%)</Label>
                <div className="flex items-center gap-4">
                  <Input type="number" value={formData.proficiency} onChange={(e) => setFormData({...formData, proficiency: parseInt(e.target.value)})} className="h-12 w-24 bg-slate-50 dark:bg-slate-800 border-none rounded-xl font-black text-center" required min="0" max="100" />
                  <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 transition-all duration-500" style={{ width: `${formData.proficiency}%` }} />
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 active:scale-95 transition-all">
                {isEditing ? 'Update Configuration' : 'Deploy Skill'}
              </Button>
              {isEditing && (
                <Button variant="ghost" onClick={() => { setIsEditing(false); setFormData({name: '', description: '', proficiency: 80}); }} className="w-full h-10 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Abort Edit
                </Button>
              )}
            </form>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {loading ? (
             Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 bg-white dark:bg-slate-900 rounded-2xl animate-pulse" />
             ))
          ) : skills.map(s => (
            <Card key={s._id} className="border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden hover:shadow-md transition-all group">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-black text-slate-900 dark:text-white">{s.name}</h3>
                    <Badge className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 border-none px-2 py-0 h-5 text-[10px] font-black">{s.proficiency}%</Badge>
                  </div>
                  <p className="text-xs text-slate-500 font-medium italic">{s.description || 'No technical annotation provided.'}</p>
                   <div className="mt-3 w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600/40" style={{ width: `${s.proficiency}%` }} />
                  </div>
                </div>
                <div className="flex gap-1 ml-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" onClick={() => { setIsEditing(true); setCurrentId(s._id); setFormData({name: s.name, description: s.description, proficiency: s.proficiency}); }} className="h-9 w-9 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"><Edit size={16}/></Button>
                  <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all" onClick={() => deleteSkill(s._id)}><Trash2 size={16}/></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillManager;
