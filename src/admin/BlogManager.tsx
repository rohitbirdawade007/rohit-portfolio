import { useEffect, useState } from 'react';
import { apiAuthFetch, apiFetch } from '@/services/api';
import { Plus, Pencil, Trash2, X, Save, Eye, EyeOff, Star, StarOff, Tag, FileText, ArrowUpRight, Newspaper } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface Blog {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string;
  status: 'draft' | 'published';
  featured: boolean;
}

const EMPTY: Blog = {
  title: '', slug: '', excerpt: '', content: '',
  coverImage: '', tags: '', status: 'draft', featured: false
};

const BlogManager = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Blog>(EMPTY);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);

  const load = () => {
    setLoading(true);
    apiFetch('/blogs?all=true')
      .then(data => setBlogs(Array.isArray(data) ? data : []))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const autoSlug = (text: string) =>
    text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-').trim();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setForm(prev => ({ ...prev, [name]: checked !== undefined ? checked : value }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, title: e.target.value, slug: autoSlug(e.target.value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
      };
      if (editing) {
        await apiAuthFetch(`/blogs/${editing}`, { method: 'PUT', body: JSON.stringify(payload) });
      } else {
        await apiAuthFetch('/blogs', { method: 'POST', body: JSON.stringify(payload) });
      }
      setShowForm(false);
      setEditing(null);
      setForm(EMPTY);
      load();
      toast.success("Knowledge node synchronized successfully");
    } catch { toast.error('Synchronization failure'); }
    finally { setSaving(false); }
  };

  const handleEdit = (blog: any) => {
    setForm({ ...blog, tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '' });
    setEditing(blog._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Proceed with archive deletion?')) return;
    try {
      await apiAuthFetch(`/blogs/${id}`, { method: 'DELETE' });
      toast.success("Article purged");
      load();
    } catch (e) {
      toast.error("Cleanup failure");
    }
  };

  const toggleStatus = async (blog: any) => {
    const newStatus = blog.status === 'published' ? 'draft' : 'published';
    await apiAuthFetch(`/blogs/${blog._id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: newStatus })
    });
    load();
    toast.success(`Node visibility set to ${newStatus}`);
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">Article <span className="text-sky-500">Registry</span></h1>
          <p className="text-slate-500 font-medium text-lg">Initialize and broadcast technical insights and research papers.</p>
        </div>
        <Button
          onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(true); }}
          className="bg-sky-500 hover:bg-sky-600 text-white rounded-2xl h-14 px-8 font-black uppercase tracking-widest shadow-xl shadow-sky-500/20 active:scale-95 transition-all"
        >
          <Plus size={18} className="mr-2" /> Initialze Article
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 bg-white/80 backdrop-blur-md z-[100] flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-4xl">
              <Card className="border border-slate-100 shadow-2xl rounded-[3rem] overflow-hidden bg-white">
                <CardHeader className="p-10 border-b border-slate-50 flex flex-row items-center justify-between bg-slate-50/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 text-sky-500 flex items-center justify-center shadow-sm">
                       <FileText size={24} />
                    </div>
                    <div>
                       <CardTitle className="text-2xl font-black tracking-tighter uppercase italic">{editing ? 'Edit Archive' : 'New Article Draft'}</CardTitle>
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Status: {form.status}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={() => setPreview(!preview)} className="h-12 px-6 rounded-xl font-bold text-xs uppercase tracking-widest border-slate-200">
                      {preview ? 'Editor' : 'Preview'}
                    </Button>
                    <Button variant="ghost" onClick={() => setShowForm(false)} className="rounded-full w-12 h-12 p-0 bg-white border border-slate-100 text-slate-400 hover:text-slate-900"><X size={20} /></Button>
                  </div>
                </CardHeader>
                <CardContent className="p-10 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                  <form onSubmit={handleSubmit} className="space-y-10">
                    {!preview ? (
                       <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                         <div className="md:col-span-8 space-y-3">
                           <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Title Abstract</Label>
                           <Input name="title" value={form.title} onChange={handleTitleChange} required className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold" />
                         </div>
                         <div className="md:col-span-4 space-y-3">
                           <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Archive ID (Slug)</Label>
                           <Input name="slug" value={form.slug} onChange={handleChange} className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-mono text-xs" />
                         </div>
                         
                         <div className="md:col-span-12 space-y-3">
                           <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Teaser Abstract</Label>
                           <Textarea name="excerpt" value={form.excerpt} onChange={handleChange} className="min-h-[80px] bg-slate-50/50 border-slate-100 rounded-2xl font-medium" />
                         </div>

                         <div className="md:col-span-6 space-y-3">
                           <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Cover Node Image (URI)</Label>
                           <Input name="coverImage" value={form.coverImage} onChange={handleChange} className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold" placeholder="https://..." />
                         </div>
                         <div className="md:col-span-6 space-y-3">
                           <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Technology Tags</Label>
                           <Input name="tags" value={form.tags} onChange={handleChange} className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold" placeholder="AI, Neural, IoT" />
                         </div>

                         <div className="md:col-span-4 space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Visibility Status</Label>
                            <select name="status" value={form.status} onChange={handleChange} className="w-full h-14 bg-slate-50/50 border border-slate-100 rounded-2xl px-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all">
                              <option value="draft">Internal Draft</option>
                              <option value="published">Production Sync</option>
                            </select>
                         </div>
                         <div className="md:col-span-8 flex items-center gap-4 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 mt-auto h-14">
                           <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} id="featured" className="w-5 h-5 rounded-md border-sky-200 text-sky-500 focus:ring-sky-500" />
                           <Label htmlFor="featured" className="cursor-pointer font-black text-[10px] uppercase tracking-widest text-slate-600">Promote to Knowledge Hub (Featured)</Label>
                         </div>

                         <div className="md:col-span-12 space-y-3 pt-6 border-t border-slate-100">
                           <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Content Buffer (MARKDOWN_RAW)</Label>
                           <Textarea name="content" value={form.content} onChange={handleChange} rows={12} className="w-full bg-slate-50/50 border-slate-100 rounded-[2rem] p-6 font-mono leading-relaxed text-sm" placeholder="Write markdown content..." />
                         </div>
                       </div>
                    ) : (
                      <div className="prose prose-slate max-w-none bg-slate-50 rounded-[2rem] p-10 min-h-[400px]">
                         <h1 className="text-slate-900 font-black">{form.title || 'Untitled Article'}</h1>
                         <p className="text-slate-500 italic">Preview Mode Active. Rendering local buffer...</p>
                         <hr className="my-8" />
                         <div className="text-slate-700 whitespace-pre-wrap">{form.content || 'Article buffer empty.'}</div>
                      </div>
                    )}

                    <div className="pt-6">
                      <Button type="submit" disabled={saving} className="w-full h-16 bg-sky-500 hover:bg-sky-600 text-white rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-sky-500/20 active:scale-95 transition-all">
                        {saving ? 'Transmitting Data...' : (editing ? 'Recalibrate Master Archive' : 'Broadcast Article Node')}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-40 bg-slate-50 border border-slate-100 rounded-[3rem] animate-pulse" />
          ))
        ) : (
          blogs.map((blog, idx) => (
            <motion.div key={blog._id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }}>
               <Card className="group border border-slate-100 bg-white rounded-[3rem] overflow-hidden hover:shadow-2xl transition-all duration-500 shadow-sm flex flex-col md:flex-row h-full">
                  <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden bg-slate-50 border-r border-slate-50">
                     {blog.coverImage ? (
                        <img src={blog.coverImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-200">
                           <Newspaper size={48} />
                        </div>
                     )}
                     <div className="absolute top-6 left-6 z-10 flex gap-2">
                        {blog.featured && <div className="p-2 bg-white/90 backdrop-blur rounded-xl text-sky-500 shadow-xl shadow-sky-500/10"><Star size={14} fill="currentColor" /></div>}
                        <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl flex items-center ${blog.status === 'published' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                           {blog.status}
                        </div>
                     </div>
                  </div>
                  <CardContent className="md:w-2/3 p-10 flex flex-col flex-1">
                     <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{blog.readTime || 5} MIN READ</span>
                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{blog.views || 0} READS</span>
                     </div>
                     <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic line-clamp-2 leading-tight group-hover:text-sky-500 transition-colors mb-4">
                        {blog.title}
                     </h3>
                     <p className="text-slate-500 text-sm font-medium line-clamp-2 mb-8 italic">
                        "{blog.excerpt}"
                     </p>
                     
                     <div className="mt-auto flex items-center gap-2">
                        <Button variant="ghost" onClick={() => handleEdit(blog)} className="h-11 px-6 bg-slate-50 hover:bg-sky-50 text-sky-600 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all border border-slate-100 flex-1">
                          Recalibrate
                        </Button>
                        <Button variant="ghost" onClick={() => toggleStatus(blog)} className={`h-11 w-11 rounded-xl border border-slate-100 transition-all ${blog.status === 'published' ? 'bg-emerald-50 text-emerald-500 hover:bg-emerald-100' : 'bg-slate-50 text-slate-400'}`}>
                          {blog.status === 'published' ? <Eye size={16} /> : <EyeOff size={16} />}
                        </Button>
                        <Button variant="ghost" onClick={() => handleDelete(blog._id)} className="h-11 w-11 bg-rose-50/50 hover:bg-rose-50 text-rose-500 rounded-xl border border-rose-100 transition-all">
                          <Trash2 size={16} />
                        </Button>
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

export default BlogManager;
