import { useEffect, useState } from 'react';
import { getExperiences, createExperience, updateExperience, deleteExperience } from '@/services/api';
import { Plus, Pencil, Trash2, X, Save, Briefcase, Building, Calendar, ArrowUpRight, Zap, Target } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface Experience {
  _id?: string;
  company: string;
  role: string;
  duration: string;
  techStack: string;
  description: string;
  fullDescription: string;
  slug: string;
}

const EMPTY: Experience = {
  company: '', role: '', duration: '', techStack: '',
  description: '', fullDescription: '', slug: ''
};

const ExperienceManager = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Experience>(EMPTY);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    getExperiences().then(data => setItems(Array.isArray(data) ? data : [])).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const autoSlug = (text: string) =>
    text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-').trim();

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, role: e.target.value, slug: autoSlug(`${form.company}-${e.target.value}`) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        techStack: form.techStack.split(',').map(s => s.trim()).filter(Boolean)
      };
      if (editing) {
        await updateExperience(editing, payload);
        toast.success("Role recalibrated");
      } else {
        await createExperience(payload);
        toast.success("Professional node synchronized");
      }
      setShowForm(false);
      setEditing(null);
      setForm(EMPTY);
      load();
    } catch {
      toast.error('Synchronization failure');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: any) => {
    setForm({ ...item, techStack: Array.isArray(item.techStack) ? item.techStack.join(', ') : item.techStack || '' });
    setEditing(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Proceed with service record archival?')) return;
    try {
      await deleteExperience(id);
      toast.success("Role purged from timeline");
      load();
    } catch {
      toast.error("Cleanup failure");
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
           <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">Professional <span className="text-sky-500">Timeline</span></h1>
           <p className="text-slate-500 font-medium text-lg">Manage your corporate history and technical contribution logs.</p>
        </div>
        <Button
          onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(true); }}
          className="bg-sky-500 hover:bg-sky-600 text-white rounded-2xl h-14 px-8 font-black uppercase tracking-widest shadow-xl shadow-sky-500/20 active:scale-95 transition-all"
        >
          <Plus size={18} className="mr-2" /> Log Experience
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 bg-white/80 backdrop-blur-md z-[100] flex items-center justify-center p-6 pt-20 overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-2xl">
              <Card className="border border-slate-100 shadow-2xl rounded-[3rem] overflow-hidden bg-white">
                <CardHeader className="p-10 border-b border-slate-50 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/20">
                        <Briefcase size={24} />
                     </div>
                     <div>
                        <CardTitle className="text-2xl font-black tracking-tighter uppercase italic">{editing ? 'Recalibrate' : 'Synchronize'} Role</CardTitle>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Service Log V4.2</p>
                     </div>
                  </div>
                  <Button variant="ghost" onClick={() => setShowForm(false)} className="rounded-full w-12 h-12 p-0 bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors"><X size={20} /></Button>
                </CardHeader>
                <CardContent className="p-10 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Entity Label (Company)</Label>
                        <Input name="company" value={form.company} onChange={handleChange} required className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold focus:bg-white transition-all shadow-inner" placeholder="E.g. Tesla" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Service Designation (Role)</Label>
                        <Input name="role" value={form.role} onChange={handleRoleChange} required className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold focus:bg-white transition-all shadow-inner" placeholder="E.g. Senior RL Engineer" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Duration Delta</Label>
                        <Input name="duration" value={form.duration} onChange={handleChange} className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold" placeholder="E.g. Jun 2024 — Present" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tech Stack Matrix</Label>
                        <Input name="techStack" value={form.techStack} onChange={handleChange} className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold" placeholder="Python, TensorFlow, C++" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Archive ID (Slug)</Label>
                      <Input name="slug" value={form.slug} onChange={handleChange} className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-mono text-xs" />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Abstract Summary</Label>
                      <Textarea name="description" value={form.description} onChange={handleChange} rows={2} className="bg-slate-50/50 border-slate-100 rounded-2xl font-medium" />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Technical Contribution Log</Label>
                      <Textarea name="fullDescription" value={form.fullDescription} onChange={handleChange} rows={4} className="bg-slate-50/50 border-slate-100 rounded-3xl min-h-[140px] font-medium leading-relaxed" />
                    </div>

                    <Button type="submit" disabled={saving} className="w-full h-16 bg-sky-500 hover:bg-sky-600 text-white rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-sky-500/20 active:scale-95 transition-all">
                      {saving ? 'Transmitting...' : (editing ? 'Recalibrate Protocol' : 'Synchronize Protocol')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="space-y-8">
        {loading ? (
           Array.from({ length: 3 }).map((_, i) => (
             <div key={i} className="h-40 bg-slate-50 border border-slate-100 rounded-[3rem] animate-pulse" />
           ))
        ) : items.length === 0 ? (
          <div className="py-40 text-center bg-slate-50 rounded-[3rem] border border-slate-100 border-dashed">
             <Briefcase size={64} className="mx-auto mb-6 text-slate-200" />
             <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Registry Empty</p>
          </div>
        ) : (
          items.map((item, idx) => (
            <motion.div key={item._id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
               <Card className="group border border-slate-100 bg-white rounded-[3rem] overflow-hidden hover:shadow-2xl transition-all duration-500 shadow-sm">
                  <CardContent className="p-10 flex flex-col md:flex-row items-start gap-10">
                     <div className="w-20 h-20 rounded-[2rem] bg-slate-50 text-slate-300 flex items-center justify-center border border-slate-100 shrink-0 group-hover:bg-sky-50 group-hover:text-sky-500 group-hover:border-sky-100 transition-all duration-500">
                        <Building size={32} />
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                           <div>
                              <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic group-hover:text-sky-500 transition-colors leading-tight">
                                {item.role}
                              </h3>
                              <p className="text-sky-500 font-bold uppercase tracking-widest text-xs mt-2 flex items-center gap-2">
                                <Target size={14} /> {item.company}
                              </p>
                           </div>
                           <div className="flex flex-col md:items-end gap-1">
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full">{item.duration}</span>
                           </div>
                        </div>

                        <p className="text-slate-500 text-sm font-medium leading-relaxed italic mb-8 border-l-2 border-slate-100 pl-8">
                           "{item.description}"
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                           {Array.isArray(item.techStack) && item.techStack.map((tech: string, i: number) => (
                             <span key={i} className="text-[10px] font-black uppercase tracking-widest bg-sky-50/30 text-sky-600 px-3 py-1 rounded-full border border-sky-100/50">
                               {tech}
                             </span>
                           ))}
                        </div>

                        <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                           <div className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                              Archive ID: <span className="text-slate-900">{item.slug}</span>
                           </div>
                           <div className="flex gap-3">
                              <Button variant="ghost" onClick={() => handleEdit(item)} className="h-12 px-6 bg-slate-50 hover:bg-sky-50 text-sky-600 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all border border-slate-100">
                                <Pencil size={15} className="mr-2" /> Recalibrate
                              </Button>
                              <Button variant="ghost" onClick={() => handleDelete(item._id)} className="h-12 w-12 bg-rose-50/30 hover:bg-rose-50 text-rose-500 rounded-xl border border-rose-50 transition-all">
                                <Trash2 size={16} />
                              </Button>
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
  );
};

export default ExperienceManager;
