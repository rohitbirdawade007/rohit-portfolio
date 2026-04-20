import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { apiFetch, getAssetUrl } from '@/services/api';
import { ArrowLeft, Clock, Tag, Eye, AlertCircle, Calendar, ChevronLeft, Share2 } from 'lucide-react';
import SEO from '@/components/SEO';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  readTime: number;
  views: number;
  featured: boolean;
  createdAt: string;
}

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    apiFetch(`/blogs/${id}`)
      .then(setBlog)
      .catch(() => setError('Blog post not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-pulse space-y-4 w-full max-w-3xl px-4">
        <div className="h-8 bg-slate-100 rounded w-3/4" />
        <div className="h-64 bg-slate-100 rounded-[2.5rem]" />
        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={`h-4 bg-slate-100 rounded ${i % 3 === 2 ? 'w-4/5' : 'w-full'}`} />
          ))}
        </div>
      </div>
    </div>
  );

  if (error || !blog) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-slate-900 gap-6">
      <div className="w-20 h-20 rounded-3xl bg-red-50 flex items-center justify-center text-red-500">
        <AlertCircle size={40} />
      </div>
      <h1 className="text-2xl font-bold tracking-tight">{error || 'Post not found'}</h1>
      <Button onClick={() => navigate('/')} className="btn-secondary">
        <ArrowLeft size={16} className="mr-2" /> Back to Home
      </Button>
    </div>
  );

  return (
    <>
      <SEO
        title={blog.title}
        description={blog.excerpt}
        image={blog.coverImage}
        url={`https://rohitbirdawade.vercel.app/blog/${blog.slug || blog._id}`}
        type="article"
        keywords={blog.tags?.join(', ')}
      />

      <div className="min-h-screen bg-white text-slate-900 flex flex-col">
        <Navbar />

        <main className="flex-grow pt-32 pb-20">
          <div className="container max-w-4xl">
            {/* Nav */}
            <div className="flex items-center justify-between mb-12">
               <Link 
                 to="/" 
                 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-sky-500 transition-colors"
               >
                 <ChevronLeft size={16} /> Back to Portfolio
               </Link>
               <Button variant="ghost" size="sm" className="text-slate-400 hover:text-sky-500">
                  <Share2 size={16} />
               </Button>
            </div>

            {/* Header */}
            <div className="mb-12">
               <div className="flex items-center gap-4 mb-6">
                  <div className="badge-tech font-bold uppercase">{blog.tags?.[0] || "ARTICLE"}</div>
                  <div className="h-px w-8 bg-slate-200" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <Clock size={14} className="text-sky-500" /> {blog.readTime} MIN READ
                  </span>
               </div>
               <h1 className="text-3xl md:text-6xl font-bold tracking-tight leading-tight mb-8">
                  {blog.title}
               </h1>
               <div className="flex items-center gap-3 text-sm font-bold text-slate-400">
                  <Calendar size={14} className="text-sky-500" />
                  {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
               </div>
            </div>

            {/* Cover */}
            {blog.coverImage && (
              <div className="mb-16 aspect-video rounded-[3rem] overflow-hidden border border-slate-100 shadow-2xl">
                <img src={getAssetUrl(blog.coverImage)} alt={blog.title}
                  className="w-full h-full object-cover" />
              </div>
            )}

            {/* Markdown Content */}
            <article className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-sky-500 prose-strong:text-slate-900 prose-code:text-sky-600 prose-code:bg-sky-50 prose-pre:bg-slate-900 prose-pre:rounded-2xl prose-blockquote:border-sky-500 prose-img:rounded-3xl">
              <ReactMarkdown>{blog.content || '*No content yet.*'}</ReactMarkdown>
            </article>

            {/* Tags Bottom */}
            {blog.tags?.length > 1 && (
              <div className="mt-16 pt-10 border-t border-slate-100">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 text-center">Referenced Topics</p>
                 <div className="flex flex-wrap justify-center gap-2">
                   {blog.tags.map(tag => (
                     <span key={tag} className="px-4 py-2 bg-slate-50 text-slate-500 text-xs font-bold rounded-xl border border-slate-100">
                       #{tag}
                     </span>
                   ))}
                 </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BlogDetailPage;
