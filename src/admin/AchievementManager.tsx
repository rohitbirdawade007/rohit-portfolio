import { useEffect, useState } from 'react';
import { getAchievements, createAchievement, updateAchievement, deleteAchievement } from '@/services/api';
import { Plus, Pencil, Trash2, X, Save, Trophy, Medal, Target, Star, ArrowUpRight, GraduationCap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface Achievement {
  _id?: string;
  title: string;
  organization: string;
  date: string;
  category: string;
  type: string;
  description: string;
  fullDescription: string;
  slug: string;
}

const EMPTY: Achievement = {
  title: '', organization: '', date: '', category: 'achievements',
  type: 'award', description: '', fullDescription: '', slug: ''
};

const AchievementManager = () => {
  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Achievement>(EMPTY);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    getAchievements().then(data => setItems(Array.isArray(data) ? data : [])).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const autoSlug = (title: string) =>
    title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-').trim();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, title: e.target.value, slug: autoSlug(e.target.value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await updateAchievement(editing, form);
      } else {
        await createAchievement(form);
      }
      setShowForm(false);
      setEditing(null);
      setForm(EMPTY);
      load();
      toast.success(editing ? "Node recalibrated successfully" : "Achievement synchronized successfully");
    } catch (err) {
      toast.error('System synchronization failure');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: Achievement) => {
    setForm({ ...item });
    setEditing(item._id!);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Proceed with data deletion?')) return;
    try {
      await deleteAchievement(id);
      toast.success("Achievement purged");
      load();
    } catch (e) {
      toast.error("Cleanup failure");
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">Recognition <span className="text-sky-500">Node</span></h1>
          <p className="text-slate-500 font-medium text-lg">Manage professional awards, certifications, and milestones.</p>
        </div>
        <Button
          onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(true); }}
          className="bg-sky-500 hover:bg-sky-600 text-white rounded-2xl h-14 px-8 font-black uppercase tracking-widest shadow-xl shadow-sky-500/20 active:scale-95 transition-all"
        >
          <Plus size={18} className="mr-2" /> Add Achievement
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 bg-white/80 backdrop-blur-md z-[100] flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-2xl">
              <Card className="border border-slate-100 shadow-2xl rounded-[3rem] overflow-hidden bg-white">
                <CardHeader className="p-10 border-b border-slate-50 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-black tracking-tighter uppercase italic">{editing ? 'Recalibrate' : 'Register'} Achievement</CardTitle>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mt-1">Data Entry Module V1.0</p>
                  </div>
                  <Button variant="ghost" onClick={() => setShowForm(false)} className="rounded-full w-12 h-12 p-0 bg-slate-50 text-slate-400 hover:text-slate-900"><X size={20} /></Button>
                </CardHeader>
                <CardContent className="p-10 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2 space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Achievement Label</Label>
                      <Input name="title" value={form.title} onChange={handleTitleChange} required className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold" />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Classification</Label>
                      <select name="category" value={form.category} onChange={handleChange} className="w-full h-14 bg-slate-50/50 border border-slate-100 rounded-2xl px-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all">
                        <option value="achievements">Strategic Milestone</option>
                        <option value="cocurricular">Co-Curricular Node</option>
                        <option value="extracurricular">External Activity</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Node Type</Label>
                      <select name="type" value={form.type} onChange={handleChange} className="w-full h-14 bg-slate-50/50 border border-slate-100 rounded-2xl px-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all">
                        <option value="award">Global Award</option>
                        <option value="competition">Competition</option>
                        <option value="paper">Research Logic</option>
                        <option value="leadership">Executive Role</option>
                        <option value="certification">Certification</option>
                        <option value="workshop">Technical Seminar</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Issuing Node</Label>
                      <Input name="organization" value={form.organization} onChange={handleChange} className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold" placeholder="E.g. Google Cloud" />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Time Delta</Label>
                      <Input name="date" value={form.date} onChange={handleChange} className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold" placeholder="E.g. 2024 - 2025" />
                    </div>

                    <div className="md:col-span-2 space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Teaser Abstract</Label>
                      <Textarea name="description" value={form.description} onChange={handleChange} className="min-h-[80px] bg-slate-50/50 border-slate-100 rounded-2xl font-medium" />
                    </div>

                    <div className="md:col-span-2 space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Technical Log</Label>
                      <Textarea name="fullDescription" value={form.fullDescription} onChange={handleChange} className="min-h-[120px] bg-slate-50/50 border-slate-100 rounded-2xl font-medium" />
                    </div>

                    <div className="md:col-span-2 pt-4">
                       <Button type="submit" disabled={saving} className="w-full h-16 bg-sky-500 hover:bg-sky-600 text-white rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-sky-500/20 active:scale-95 transition-all">
                         {saving ? 'Synchronizing...' : (editing ? 'Recalibrate Item' : 'Synchronize Item')}
                       </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Grid of Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 bg-slate-50 border border-slate-100 rounded-[3rem] animate-pulse" />
          ))
        ) : (
          items.map((item, idx) => (
            <motion.div key={item._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
               <Card className="group border border-slate-100 bg-white rounded-[3rem] overflow-hidden hover:shadow-2xl transition-all duration-500 shadow-sm flex flex-col h-full">
                  <CardHeader className="p-10 pb-4 flex flex-row items-start justify-between">
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-3">
                           <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center shadow-sm">
                              {item.type === 'award' ? <Trophy size={18} /> : 
                               item.type === 'certification' ? <Medal size={18} /> : 
                               <Star size={18} />}
                           </div>
                           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{item.type}</span>
                        </div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic line-clamp-2 leading-tight group-hover:text-sky-500 transition-colors">
                           {item.title}
                        </h3>
                     </div>
                     <div className="flex flex-col gap-2 ml-4">
                        <Button size="icon" variant="ghost" onClick={() => handleEdit(item)} className="h-10 w-10 rounded-xl bg-slate-50 hover:bg-sky-50 text-sky-600 transition-all border border-slate-100"><Pencil size={14}/></Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDelete(item._id!)} className="h-10 w-10 rounded-xl bg-rose-50/50 hover:bg-rose-50 text-rose-500 transition-all border border-rose-100"><Trash2 size={14}/></Button>
                     </div>
                  </CardHeader>
                  <CardContent className="p-10 pt-0 flex flex-col flex-1">
                     <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Target size={12} className="text-sky-500" /> {item.organization}
                     </p>
                     <p className="text-slate-500 text-sm font-medium line-clamp-3 mb-8 italic italic">
                        "{item.description}"
                     </p>
                     <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full">{item.date}</span>
                        <div className="text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity">
                           <ArrowUpRight size={20} />
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </motion.div>
          ))
        )}
        {items.length === 0 && !loading && (
          <div className="col-span-full py-40 text-center bg-slate-50 rounded-[4rem] border border-slate-100">
             <Trophy size={64} className="mx-auto mb-6 text-slate-200" />
             <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Registry Empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementManager;
