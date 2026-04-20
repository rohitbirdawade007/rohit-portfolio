import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GraduationCap, Edit, Trash2, Plus, Target, School, MapPin, Calendar, BookOpen, GraduationCap as GradIcon } from 'lucide-react';
import { toast } from "sonner";
import { getEducations, createEducation, updateEducation, deleteEducation } from '@/services/api';
import { motion } from "framer-motion";

const EducationManager = () => {
  const [educations, setEducations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    degree: '', institution: '', location: '', startDate: '', endDate: '',
    description: '', coursework: '', grade: '', order: 0
  });

  const fetchEducations = async () => {
    try {
      const data = await getEducations();
      setEducations(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Telemetry failure: Education history offline");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  const handleEdit = (edu: any) => {
    setEditingId(edu._id);
    setFormData({
      ...edu,
      coursework: edu.coursework ? edu.coursework.join(', ') : ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ degree: '', institution: '', location: '', startDate: '', endDate: '', description: '', coursework: '', grade: '', order: 0 });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Proceed with node archival?")) {
      try {
        await deleteEducation(id);
        toast.success("Education record purged");
        fetchEducations();
      } catch (err) {
        toast.error("Cleanup failure");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        coursework: formData.coursework.split(',').map(c => c.trim()).filter(c => c !== "")
      };
      
      if (editingId) {
        await updateEducation(editingId, payload);
        toast.success("Education recalibrated");
      } else {
        await createEducation(payload);
        toast.success("Education node synchronized");
      }
      handleCancel();
      fetchEducations();
    } catch (err) {
      toast.error("Synchronization failure");
    }
  };

  return (
    <div className="space-y-10 pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
           <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">Academic <span className="text-sky-500">Registry</span></h1>
           <p className="text-slate-500 font-medium text-lg">Initialize and manage your foundation in engineering and mathematics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Form Sidebar */}
        <div className="lg:col-span-5 h-fit sticky top-10">
          <Card className="border border-slate-100 bg-white shadow-sm rounded-[2.5rem] overflow-hidden">
             <CardHeader className="p-10 border-b border-slate-50 bg-slate-50/30">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-sky-500 shadow-sm border border-slate-50">
                    <School size={20} />
                 </div>
                 <CardTitle className="text-xl font-black tracking-tighter">
                   {editingId ? 'Recalibrate Record' : 'Initialze Record'}
                 </CardTitle>
               </div>
             </CardHeader>
             <CardContent className="p-10">
               <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Academic degree</Label>
                    <Input required value={formData.degree} onChange={e => setFormData({...formData, degree: e.target.value})} placeholder="e.g. B.Tech Computer Science" className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold focus:bg-white transition-all"/>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Institution Label</Label>
                    <Input required value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} placeholder="University Name" className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold focus:bg-white transition-all"/>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Location Delta</Label>
                      <Input required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="City, Country" className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold"/>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">GPA / Grade</Label>
                      <Input value={formData.grade} onChange={e => setFormData({...formData, grade: e.target.value})} placeholder="X.X / X.X" className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold shadow-inner"/>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Inception</Label>
                      <Input required value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} placeholder="Aug 2018" className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold"/>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Termination</Label>
                      <Input required value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} placeholder="May 2022" className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold"/>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Technical Coursework</Label>
                    <Textarea value={formData.coursework} onChange={e => setFormData({...formData, coursework: e.target.value})} placeholder="AI, ML, Robotics..." className="bg-slate-50/50 border-slate-100 rounded-2xl font-medium" />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Experience Abstract</Label>
                    <Textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Major achievements and focus areas..." className="bg-slate-50/50 border-slate-100 rounded-3xl min-h-[140px] font-medium leading-relaxed" />
                  </div>

                  <div className="flex gap-3 pt-6">
                    <Button type="submit" className="flex-1 h-16 bg-sky-500 hover:bg-sky-600 text-white rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-sky-500/20 active:scale-95 transition-all">
                      {editingId ? 'Synchronize Protocol' : 'Deploy Record'}
                    </Button>
                    {editingId && (
                      <Button type="button" variant="outline" onClick={handleCancel} className="h-16 w-16 rounded-3xl border-slate-200">
                        <Plus className="rotate-45" />
                      </Button>
                    )}
                  </div>
               </form>
             </CardContent>
          </Card>
        </div>

        {/* List Section */}
        <div className="lg:col-span-7 space-y-8">
          {loading ? (
             Array.from({ length: 3 }).map((_, i) => (
               <div key={i} className="h-48 bg-slate-50 border border-slate-100 rounded-[3rem] animate-pulse" />
             ))
          ) : educations.length === 0 ? (
            <div className="py-40 text-center bg-slate-50 rounded-[3rem] border border-slate-100 border-dashed">
               <GraduationCap size={64} className="mx-auto mb-6 text-slate-200" />
               <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Registry Empty</p>
            </div>
          ) : (
            educations.map((edu: any, idx: number) => (
              <motion.div key={edu._id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }}>
                <Card className="group border border-slate-100 bg-white rounded-[3rem] overflow-hidden hover:shadow-2xl transition-all duration-500 shadow-sm">
                  <CardContent className="p-10 flex items-start gap-8">
                     <div className="w-16 h-16 rounded-[2rem] bg-sky-50 text-sky-500 flex items-center justify-center border border-sky-100 shrink-0 group-hover:rotate-6 transition-transform">
                        <GradIcon size={28} />
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                           <div>
                              <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic group-hover:text-sky-500 transition-colors leading-tight">
                                {edu.degree}
                              </h3>
                              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1 flex items-center gap-2">
                                <Target size={12} className="text-sky-500" /> {edu.institution}
                              </p>
                           </div>
                           <div className="flex flex-col items-end gap-1 shrink-0">
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 py-1 bg-slate-50 rounded-full">{edu.startDate} — {edu.endDate}</span>
                              <div className="flex items-center gap-2 text-[10px] font-black text-sky-500 mt-1 uppercase tracking-widest">
                                 <MapPin size={10} /> {edu.location}
                              </div>
                           </div>
                        </div>

                        <p className="text-slate-500 text-sm font-medium leading-relaxed italic mb-8 border-l-2 border-slate-100 pl-6">
                           "{edu.description}"
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                           {edu.coursework && edu.coursework.map((course: string, i: number) => (
                             <span key={i} className="text-[10px] font-black uppercase tracking-widest bg-slate-50 text-slate-400 px-3 py-1 rounded-full border border-slate-100">
                               {course}
                             </span>
                           ))}
                        </div>

                        <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                           <div className="flex items-center gap-4">
                              <div className="flex flex-col">
                                 <span className="text-[8px] font-black uppercase tracking-widest text-slate-300 mb-0.5">Performance index</span>
                                 <span className="text-xs font-black text-slate-900">{edu.grade || 'GRADUATED'}</span>
                              </div>
                              <div className="flex flex-col">
                                 <span className="text-[8px] font-black uppercase tracking-widest text-slate-300 mb-0.5">Registry Sort</span>
                                 <span className="text-xs font-black text-slate-400">INDEX: {edu.order}</span>
                              </div>
                           </div>
                           <div className="flex gap-2">
                              <Button size="icon" variant="ghost" onClick={() => handleEdit(edu)} className="h-12 w-12 rounded-2xl bg-slate-50 hover:bg-sky-50 text-sky-600 transition-all border border-slate-100 shadow-sm"><Edit size={16} /></Button>
                              <Button size="icon" variant="ghost" onClick={() => handleDelete(edu._id)} className="h-12 w-12 rounded-2xl bg-rose-50/30 hover:bg-rose-50 text-rose-500 transition-all border border-rose-50"><Trash2 size={16} /></Button>
                           </div>
                        </div>
                     </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EducationManager;
