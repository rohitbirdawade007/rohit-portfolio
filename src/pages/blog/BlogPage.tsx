import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch, getAssetUrl } from '@/services/api';
import { BookOpen, Tag, Clock, ChevronRight, Rss, ArrowLeft, ChevronLeft } from 'lucide-react';
import SEO from '@/components/SEO';
import { usePageView } from '@/services/analytics';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

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
        title="Technical Blog | Rohit Birdawade"
        description="Technical articles on AI, IoT, machine learning, and advanced software engineering."
        type="website"
      />
      <div className="min-h-screen bg-white text-slate-900 flex flex-col">
        <Navbar />

        <main className="flex-grow pt-32 pb-20">
          <div className="container max-w-6xl">
            <div className="mb-16 animate-fadeUp text-center md:text-left">
              <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-sky-500 transition-colors mb-12">
                <ChevronLeft size={16} /> Back to Portfolio
              </Link>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                <div className="max-w-2xl text-left">
                   <div className="flex items-center gap-3 mb-4">
                     <Rss size={24} className="text-sky-500" />
                     <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">Insight <span className="text-sky-500">Archive</span></h1>
                   </div>
                   <p className="text-slate-600 text-lg font-medium leading-relaxed">
                     Exploring the synergy between machine learning architectures and IoT telemetry through detailed technical articles and case studies.
                   </p>
                </div>
              </div>
            </div>

            {/* Tag Filter */}
            {allTags.length > 2 && (
              <div className="flex flex-wrap gap-2 mb-12 justify-center md:justify-start">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${
                      activeTag === tag
                        ? 'bg-sky-500 text-white border-sky-500 shadow-md'
                        : 'border-slate-100 text-slate-400 bg-white hover:border-sky-500/50 hover:text-sky-500'
                    }`}
                  >
                    {tag === 'all' ? 'All Entries' : tag}
                  </button>
                ))}
              </div>
            )}

            {/* Featured Post */}
            {!loading && featured && activeTag === 'all' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
                <Link to={`/blog/${featured.slug || featured._id}`} className="group block h-full">
                  <div className="relative bg-white border border-slate-100 rounded-[3rem] overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col lg:flex-row shadow-sm">
                    {featured.coverImage && (
                      <div className="lg:w-1/2 h-80 lg:h-auto overflow-hidden">
                        <img src={getAssetUrl(featured.coverImage)} alt={featured.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      </div>
                    )}
                    <div className="p-10 lg:p-16 lg:w-1/2 flex flex-col justify-center">
                      <div className="inline-flex items-center gap-2 text-[10px] font-bold text-sky-500 uppercase tracking-[0.2em] mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" /> Highly Relevant
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-sky-500 transition-colors tracking-tight leading-tight">
                         {featured.title}
                      </h2>
                      <p className="text-slate-600 font-medium line-clamp-3 mb-8 text-lg">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-auto pt-8 border-t border-slate-100">
                        <span className="flex items-center gap-2"><Clock size={14} className="text-sky-500" /> {featured.readTime} MIN READ</span>
                        <span className="text-sky-500">Execute Study <ChevronRight size={14} className="inline ml-1" /></span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-[450px] bg-slate-50 rounded-[2.5rem] animate-pulse border border-slate-100" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-40 bg-slate-50 rounded-[3rem] border border-slate-100">
                <BookOpen size={64} className="mx-auto mb-6 text-slate-200" />
                <h3 className="text-3xl font-bold mb-4 tracking-tight">Archive Re-indexing</h3>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">No matches found for this technical filter</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {filtered.filter(b => !b.featured || activeTag !== 'all').map((blog, idx) => (
                  <motion.div key={blog._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                    <Link to={`/blog/${blog.slug || blog._id}`} className="group block h-full">
                      <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full shadow-sm">
                        {blog.coverImage && (
                          <div className="h-64 overflow-hidden">
                            <img src={getAssetUrl(blog.coverImage)} alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          </div>
                        )}
                        <div className="p-8 flex flex-col flex-1">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="badge-tech font-bold uppercase">{blog.tags?.[0] || "TECHNICAL"}</div>
                          </div>
                          <h2 className="text-xl md:text-2xl font-bold mb-4 leading-tight group-hover:text-sky-500 transition-colors tracking-tight">
                             {blog.title}
                          </h2>
                          <p className="text-slate-600 text-sm font-medium line-clamp-3 mb-10 flex-grow leading-relaxed">
                             {blog.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-auto pt-6 border-t border-slate-100">
                            <span className="flex items-center gap-2"><Clock size={14} className="text-sky-500" /> {blog.readTime} MIN READ</span>
                            <span className="text-sky-500 group-hover:translate-x-1 transition-transform">Read Insight <ChevronRight size={14} className="inline ml-1" /></span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BlogPage;
