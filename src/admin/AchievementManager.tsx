import { useEffect, useState } from 'react';
import { getAchievements, createAchievement, updateAchievement, deleteAchievement } from '@/services/api';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';

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
    } catch (err) {
      alert('Error saving achievement');
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
    if (!confirm('Delete this achievement?')) return;
    await deleteAchievement(id);
    load();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Achievements Manager</h2>
        <button
          onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          <Plus size={16} /> Add Achievement
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 transition-colors rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">{editing ? 'Edit' : 'Add'} Achievement</h3>
              <button onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input name="title" value={form.title} onChange={handleTitleChange} required
                  className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Achievement title" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Slug (auto-generated)</label>
                <input name="slug" value={form.slug} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 dark:bg-gray-950 transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select name="category" value={form.category} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm">
                    <option value="achievements">Achievements & Awards</option>
                    <option value="cocurricular">Co-Curricular</option>
                    <option value="extracurricular">Extracurricular</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select name="type" value={form.type} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm">
                    <option value="award">Award</option>
                    <option value="competition">Competition</option>
                    <option value="paper">Research Paper</option>
                    <option value="leadership">Leadership</option>
                    <option value="certification">Certification</option>
                    <option value="workshop">Workshop</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Organization</label>
                <input name="organization" value={form.organization} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Issuing organization" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input name="date" value={form.date} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="e.g., 2024-25" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Short Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={2}
                  className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Brief description for cards" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Full Description</label>
                <textarea name="fullDescription" value={form.fullDescription} onChange={handleChange} rows={4}
                  className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Detailed description for detail page" />
              </div>
              <button type="submit" disabled={saving}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition disabled:opacity-60"
              >
                <Save size={16} /> {saving ? 'Saving...' : (editing ? 'Update' : 'Create')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="space-y-3">{Array.from({length:3}).map((_,i)=><div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse"/>)}</div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item._id} className="bg-white dark:bg-gray-900 transition-colors border rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{item.title}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">{item.category} · {item.type} · {item.date}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => handleEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition">
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleDelete(item._id!)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-center text-gray-400 py-10">No achievements yet.</p>}
        </div>
      )}
    </div>
  );
};

export default AchievementManager;
