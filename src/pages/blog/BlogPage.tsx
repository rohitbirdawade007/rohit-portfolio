import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '@/services/api';
import { BookOpen, Tag, Clock, ChevronRight, Rss } from 'lucide-react';
import SEO from '@/components/SEO';
import { usePageView } from '@/services/analytics';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  status: string;
  readTime: number;
  views: number;
  featured: boolean;
  createdAt: string;
}

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState<string>('all');

  usePageView('/blog');

  useEffect(() => {
    apiFetch('/blogs')
      .then(setBlogs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const allTags = ['all', ...Array.from(new Set(blogs.flatMap(b => b.tags || [])))];
  const filtered = activeTag === 'all' ? blogs : blogs.filter(b => b.tags?.includes(activeTag));
  const featured = blogs.find(b => b.featured);

  return (
    <>
      <SEO
        title="Blog"
        description="Technical articles on AI, IoT, machine learning, and software engineering."
        url="https://rohitbirdawade.vercel.app/blog"
        type="website"
      />
      <div className="min-h-screen bg-gray-950 text-white">
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="mb-10">
            <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">← Back to Portfolio</Link>
            <div className="flex items-center gap-3 mt-4 mb-2">
              <Rss size={28} className="text-primary" />
              <h1 className="text-4xl font-bold">Blog</h1>
            </div>
            <p className="text-gray-400">Technical writing on AI, IoT, and software engineering</p>
          </div>

          {/* Featured Post */}
          {!loading && featured && (
            <Link to={`/blog/${featured.slug || featured._id}`} className="block mb-10">
              <div className="relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-primary/40 transition-all group">
                {featured.coverImage && (
                  <img src={featured.coverImage} alt={featured.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                )}
                <div className="p-6">
                  <span className="text-xs text-primary font-semibold uppercase tracking-widest">⭐ Featured</span>
                  <h2 className="text-2xl font-bold mt-2 mb-2 group-hover:text-primary transition-colors">{featured.title}</h2>
                  <p className="text-gray-400 line-clamp-2 mb-4">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Clock size={12}/> {featured.readTime} min read</span>
                    <span>{new Date(featured.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Tag Filter */}
          {allTags.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                    activeTag === tag
                      ? 'bg-primary text-white border-primary'
                      : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
                  }`}
                >
                  {tag === 'all' ? '# All' : `# ${tag}`}
                </button>
              ))}
            </div>
          )}

          {/* Blog Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-48 bg-gray-800 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
              <p>No blog posts yet. Coming soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filtered.filter(b => !b.featured).map(blog => (
                <Link key={blog._id} to={`/blog/${blog.slug || blog._id}`}
                  className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                  {blog.coverImage && (
                    <img src={blog.coverImage} alt={blog.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    {blog.tags?.[0] && (
                      <span className="text-xs text-primary font-medium mb-2 flex items-center gap-1">
                        <Tag size={11} />{blog.tags[0]}
                      </span>
                    )}
                    <h2 className="font-bold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">{blog.title}</h2>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">{blog.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                      <span className="flex items-center gap-1"><Clock size={11} /> {blog.readTime} min read</span>
                      <span className="flex items-center gap-1 text-primary">Read <ChevronRight size={12} /></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
