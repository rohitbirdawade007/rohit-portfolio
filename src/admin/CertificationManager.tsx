import { useEffect, useState } from 'react';
import { getCertifications, createCertification, updateCertification, deleteCertification } from '@/services/api';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';

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
    } catch {
      alert('Error saving certification');
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
    if (!confirm('Delete this certification?')) return;
    await deleteCertification(id);
    load();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Certifications Manager</h2>
        <button
          onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          <Plus size={16} /> Add Certification
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 transition-colors rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">{editing ? 'Edit' : 'Add'} Certification</h3>
              <button onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Certification Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required
                  className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="e.g., AWS Solutions Architect" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Organization</label>
                <input name="organization" value={form.organization} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="e.g., Amazon Web Services" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input name="date" value={form.date} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="e.g., January 2025" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Credential URL</label>
                <input name="credentialUrl" value={form.credentialUrl} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Certificate Image URL</label>
                <input name="image" value={form.image} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="/uploads/cert.jpg or https://..." />
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
        <div className="space-y-3">{Array.from({length:3}).map((_,i)=><div key={i} className="h-14 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse"/>)}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map(item => (
            <div key={item._id} className="bg-white dark:bg-gray-900 transition-colors border rounded-xl p-4 flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{item.name}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">{item.organization} · {item.date}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => handleEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"><Pencil size={15} /></button>
                <button onClick={() => handleDelete(item._id!)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="col-span-2 text-center text-gray-400 py-10">No certifications yet.</p>}
        </div>
      )}
    </div>
  );
};

export default CertificationManager;
