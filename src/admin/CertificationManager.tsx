import { useEffect, useState } from 'react';
import { getCertifications, createCertification, updateCertification, deleteCertification } from '@/services/api';
import { Plus, Pencil, Trash2, X, Save, Award, ExternalLink, ShieldCheck, BadgeCheck, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface Certification {
  _id?: string;
  name: string;
  organization: string;
  date: string;
  credentialUrl: string;
  image: string;
}

const EMPTY: Certification = { name: '', organization: '', date: '', credentialUrl: '', image: '' };

const CertificationManager = () => {
  const [items, setItems] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Certification>(EMPTY);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    getCertifications().then(setItems).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await updateCertification(editing, form);
      } else {
        await createCertification(form);
      }
      setShowForm(false);
      setEditing(null);
      setForm(EMPTY);
      load();
      toast.success("Credential vault synchronized");
    } catch {
      toast.error('Vault synchronization failure');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: Certification) => {
    setForm({ ...item });
    setEditing(item._id!);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Proceed with credential archival?')) return;
    try {
      await deleteCertification(id);
      toast.success("Credential purged");
      load();
    } catch {
      toast.error("Cleanup failure");
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
           <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">Credentials <span className="text-sky-500">Vault</span></h1>
           <p className="text-slate-500 font-medium text-lg">Manage verified certifications and technical licenses.</p>
        </div>
        <Button
          onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(true); }}
          className="bg-sky-500 hover:bg-sky-600 text-white rounded-2xl h-14 px-8 font-black uppercase tracking-widest shadow-xl shadow-sky-500/20 active:scale-95 transition-all"
        >
          <Plus size={18} className="mr-2" /> Register Credential
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 bg-white/80 backdrop-blur-md z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-xl">
              <Card className="border border-slate-100 shadow-2xl rounded-[3rem] overflow-hidden bg-white">
                <CardHeader className="p-10 border-b border-slate-50 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-black tracking-tighter uppercase italic">{editing ? 'Recalibrate' : 'Register'} Credential</CardTitle>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Verification Module V2.4</p>
                  </div>
                  <Button variant="ghost" onClick={() => setShowForm(false)} className="rounded-full w-12 h-12 p-0 bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors"><X size={20} /></Button>
                </CardHeader>
                <CardContent className="p-10 space-y-8">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Certification Label</Label>
                      <Input name="name" value={form.name} onChange={handleChange} required className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold" placeholder="E.g. AWS Machine Learning Specialist" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Issuing Authority</Label>
                        <Input name="organization" value={form.organization} onChange={handleChange} className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold" placeholder="E.g. Amazon" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Calibration Date</Label>
                        <Input name="date" value={form.date} onChange={handleChange} className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold" placeholder="Jan 2025" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Verification Link (URI)</Label>
                      <Input name="credentialUrl" value={form.credentialUrl} onChange={handleChange} className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold" placeholder="https://..." />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Certificate Asset (URI/PATH)</Label>
                      <Input name="image" value={form.image} onChange={handleChange} className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold" placeholder="/uploads/cert.jpg" />
                    </div>

                    <Button type="submit" disabled={saving} className="w-full h-16 bg-sky-500 hover:bg-sky-600 text-white rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-sky-500/20 active:scale-95 transition-all">
                      {saving ? 'Syncing...' : (editing ? 'Recalibrate Protocol' : 'Synchronize Protocol')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-slate-100/50 rounded-[2.5rem] animate-pulse" />
          ))
        ) : (
          items.map((item, idx) => (
            <motion.div key={item._id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}>
               <Card className="group border border-slate-100 bg-white rounded-[2.5rem] overflow-hidden hover:shadow-xl transition-all duration-300 shadow-sm">
                 <CardContent className="p-8 flex items-center justify-between gap-6">
                   <div className="flex-1 min-w-0">
                     <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center border border-sky-100 group-hover:rotate-12 transition-transform">
                           <Award size={20} />
                        </div>
                        <div>
                           <h3 className="font-black text-slate-900 uppercase tracking-tighter text-sm italic line-clamp-1">{item.name}</h3>
                           <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-2">
                              <Zap size={10} className="text-sky-500" /> {item.organization}
                           </p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3 mt-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 bg-slate-50 px-2 py-0.5 rounded-full">{item.date}</span>
                        {item.credentialUrl && (
                           <a href={item.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-700 transition-colors">
                              <ExternalLink size={14} />
                           </a>
                        )}
                     </div>
                   </div>
                   <div className="flex flex-col gap-1 shrink-0 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all">
                     <Button size="icon" variant="ghost" onClick={() => handleEdit(item)} className="h-10 w-10 rounded-xl bg-slate-50 hover:bg-sky-50 text-sky-600 transition-all border border-slate-50"><Pencil size={15} /></Button>
                     <Button size="icon" variant="ghost" onClick={() => handleDelete(item._id!)} className="h-10 w-10 rounded-xl bg-rose-50/50 hover:bg-rose-50 text-rose-500 transition-all border border-rose-50"><Trash2 size={15} /></Button>
                   </div>
                 </CardContent>
               </Card>
            </motion.div>
          ))
        )}
        {items.length === 0 && !loading && (
          <div className="col-span-full py-32 text-center bg-slate-50/50 rounded-[3rem] border border-slate-100 border-dashed">
             <BadgeCheck size={48} className="mx-auto mb-4 text-slate-300" />
             <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No verified credentials in vault</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificationManager;
