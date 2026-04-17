import { useEffect, useState } from 'react';
import { getExperiences, createExperience, updateExperience, deleteExperience } from '@/services/api';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';

interface Experience {
  _id?: string;
  company: string;
  role: string;
  duration: string;
  techStack: string;   // comma-separated input, converted to array on save
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
      } else {
        await createExperience(payload);
      }
      setShowForm(false);
      setEditing(null);
      setForm(EMPTY);
      load();
    } catch {
      alert('Error saving experience');
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
    if (!confirm('Delete this experience entry?')) return;
    await deleteExperience(id);
    load();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Experience Manager</h2>
        <button
          onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          <Plus size={16} /> Add Experience
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 transition-colors rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">{editing ? 'Edit' : 'Add'} Experience</h3>
              <button onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Company *</label>
                <input name="company" value={form.company} onChange={handleChange} required
                  className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Company name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role *</label>
                <input name="role" value={form.role} onChange={handleRoleChange} required
                  className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="e.g., ML Intern" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duration</label>
                <input name="duration" value={form.duration} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="e.g., June 2024 – Aug 2024" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tech Stack (comma-separated)</label>
                <input name="techStack" value={form.techStack} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Python, TensorFlow, Flask" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Slug</label>
                <input name="slug" value={form.slug} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 dark:bg-gray-950 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Short Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={2}
                  className="w-full border rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Full Description</label>
                <textarea name="fullDescription" value={form.fullDescription} onChange={handleChange} rows={4}
                  className="w-full border rounded-lg px-3 py-2 text-sm" />
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

      {loading ? (
        <div className="space-y-3">{Array.from({length:3}).map((_,i)=><div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse"/>)}</div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item._id} className="bg-white dark:bg-gray-900 transition-colors border rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{item.role}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">{item.company} · {item.duration}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => handleEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"><Pencil size={15} /></button>
                <button onClick={() => handleDelete(item._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-center text-gray-400 py-10">No experience entries yet.</p>}
        </div>
      )}
    </div>
  );
};

export default ExperienceManager;
