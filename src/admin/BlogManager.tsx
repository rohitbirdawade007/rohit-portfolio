import { useEffect, useState } from 'react';
import { apiAuthFetch, apiFetch } from '@/services/api';
import { Plus, Pencil, Trash2, X, Save, Eye, EyeOff, Star, StarOff, Tag } from 'lucide-react';

interface Blog {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string;        // comma-separated in form
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
    } catch { alert('Error saving blog'); }
    finally { setSaving(false); }
  };

  const handleEdit = (blog: any) => {
    setForm({ ...blog, tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '' });
    setEditing(blog._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog post?')) return;
    await apiAuthFetch(`/blogs/${id}`, { method: 'DELETE' });
    load();
  };

  const toggleStatus = async (blog: any) => {
    const newStatus = blog.status === 'published' ? 'draft' : 'published';
    await apiAuthFetch(`/blogs/${blog._id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: newStatus })
    });
    load();
  };

  const toggleFeatured = async (blog: any) => {
    await apiAuthFetch(`/blogs/${blog._id}`, {
      method: 'PUT',
      body: JSON.stringify({ featured: !blog.featured })
    });
    load();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Blog Manager</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Write and publish articles in Markdown</p>
        </div>
        <button
          onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm"
        >
          <Plus size={15} /> New Post
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 transition-colors rounded-2xl w-full max-w-3xl my-8 shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="font-bold text-lg">{editing ? 'Edit' : 'New'} Blog Post</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreview(!preview)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border transition ${preview ? 'bg-primary/10 border-primary/30 text-primary' : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-950 transition-colors'}`}
                >
                  <Eye size={14} /> {preview ? 'Editor' : 'Preview'}
                </button>
                <button onClick={() => setShowForm(false)}>
                  <X size={20} className="text-gray-400 hover:text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <input name="title" value={form.title} onChange={handleTitleChange} required
                    className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Post title" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Slug (URL)</label>
                  <input name="slug" value={form.slug} onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 dark:bg-gray-950 transition-colors font-mono text-xs" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select name="status" value={form.status} onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Excerpt</label>
                  <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={2}
                    className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Short summary for cards..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cover Image URL</label>
                  <input name="coverImage" value={form.coverImage} onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 flex items-center gap-1"><Tag size={12}/> Tags (comma-separated)</label>
                  <input name="tags" value={form.tags} onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="AI, IoT, Python" />
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <input type="checkbox" name="featured" checked={form.featured}
                    onChange={handleChange} id="featured" className="rounded" />
                  <label htmlFor="featured" className="text-sm font-medium cursor-pointer">⭐ Mark as Featured Post</label>
                </div>
              </div>

              {/* Content / Preview */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Content (Markdown){' '}
                  <span className="text-gray-400 text-xs font-normal">— supports **bold**, # headers, `code`, etc.</span>
                </label>
                {preview ? (
                  <div className="border rounded-lg p-4 min-h-48 prose prose-sm max-w-none bg-gray-50 dark:bg-gray-950 transition-colors overflow-y-auto">
                    {/* Simple preview — import ReactMarkdown dynamically */}
                    <pre className="whitespace-pre-wrap text-xs text-gray-600 dark:text-gray-400">{form.content || 'Nothing to preview yet...'}</pre>
                  </div>
                ) : (
                  <textarea name="content" value={form.content} onChange={handleChange} rows={12}
                    className="w-full border rounded-lg px-3 py-2 text-sm font-mono leading-relaxed"
                    placeholder="# My Blog Post&#10;&#10;Write your content here in **Markdown** format..." />
                )}
              </div>

              <button type="submit" disabled={saving}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition disabled:opacity-60 font-medium"
              >
                <Save size={16} /> {saving ? 'Saving...' : (editing ? 'Update Post' : 'Publish')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Blog List */}
      {loading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
        ))}</div>
      ) : (
        <div className="space-y-3">
          {blogs.map(blog => (
            <div key={blog._id} className="bg-white dark:bg-gray-900 transition-colors border rounded-xl p-4 flex items-center gap-4">
              {blog.coverImage && (
                <img src={blog.coverImage} alt="" className="w-14 h-14 object-cover rounded-lg shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-sm truncate">{blog.title}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    blog.status === 'published'
                      ? 'bg-green-50 text-green-600'
                      : 'bg-yellow-50 text-yellow-600'
                  }`}>{blog.status}</span>
                  {blog.featured && <span className="text-xs text-yellow-500">⭐ Featured</span>}
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                  {blog.readTime || 1} min · {blog.views || 0} views
                  {blog.tags?.length > 0 && ` · ${blog.tags.join(', ')}`}
                </p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button onClick={() => toggleFeatured(blog)} title="Toggle featured"
                  className="p-2 text-yellow-500 hover:bg-yellow-50 rounded-lg transition">
                  {blog.featured ? <Star size={15} fill="currentColor" /> : <StarOff size={15} />}
                </button>
                <button onClick={() => toggleStatus(blog)} title="Toggle publish"
                  className={`p-2 rounded-lg transition ${
                    blog.status === 'published' ? 'text-green-500 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-50 dark:bg-gray-950 transition-colors'
                  }`}>
                  {blog.status === 'published' ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button onClick={() => handleEdit(blog)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition">
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleDelete(blog._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
          {blogs.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p>No blog posts yet. Write your first article!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogManager;
