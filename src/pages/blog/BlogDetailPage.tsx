import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { apiFetch, getAssetUrl } from '@/services/api';
import { ArrowLeft, Clock, Tag, Eye, AlertCircle, Calendar, ChevronLeft, Share2, FileText, Newspaper, Zap, ArrowUpRight } from 'lucide-react';
import SEO from '@/components/SEO';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useSpring } from 'framer-motion';

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
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    apiFetch(`/blogs/${id}`)
      .then(setBlog)
      .catch(() => setError('Archive node not found.'))
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-pulse space-y-8 w-full max-w-4xl px-4">
        <div className="flex gap-4 items-center">
           <div className="h-6 w-24 bg-slate-50 rounded-full" />
           <div className="h-6 w-32 bg-slate-50 rounded-full" />
        </div>
        <div className="h-16 bg-slate-50 rounded-2xl w-full" />
        <div className="h-[400px] bg-slate-50 rounded-[3rem] w-full" />
      </div>
    </div>
  );

  if (error || !blog) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-slate-900 gap-8">
      <div className="w-24 h-24 rounded-[2rem] bg-rose-50 flex items-center justify-center text-rose-500 shadow-xl shadow-rose-500/10">
        <AlertCircle size={48} />
      </div>
      <div className="text-center">
         <h1 className="text-3xl font-black tracking-tighter uppercase italic">Article Archival Failure</h1>
         <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Error Code: BLOG_NODE_SYNC_FAILED</p>
      </div>
      <Button onClick={() => navigate('/')} className="h-14 px-8 bg-slate-900 hover:bg-black text-white rounded-2xl font-black uppercase tracking-widest transition-all">
        <ArrowLeft size={18} className="mr-3" /> Back to Terminal
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

      {/* Reading Progress Indicator */}
      <motion.div className="fixed top-0 left-0 right-0 h-2 bg-sky-500 origin-left z-[110]" style={{ scaleX }} />

      <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-sky-100 selection:text-sky-900">
        <Navbar />

        <main className="flex-grow pt-40 pb-20 overflow-hidden">
          <div className="container max-w-4xl relative">
            
            {/* Header Section */}
            <header className="mb-20 space-y-10 group">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="px-4 py-1 bg-sky-50 text-sky-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-sky-100 italic">
                         {blog.tags?.[0] || "Knowledge Sync"}
                      </div>
                      <div className="flex items-center gap-3 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                         <Clock size={12} className="text-sky-400" /> {blog.readTime} MIN ESTIMATED READ
                      </div>
                   </div>
                   <Button variant="ghost" size="icon" className="w-12 h-12 rounded-2xl bg-slate-50 hover:bg-sky-50 text-slate-400 hover:text-sky-500 transition-all border border-slate-50">
                      <Share2 size={18} />
                   </Button>
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 leading-[0.95] uppercase italic">
                   {blog.title}
                </motion.h1>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-6 pt-4 border-t border-slate-50">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-sky-500">
                         <Calendar size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Broadcast Date</span>
                        <span className="text-sm font-black text-slate-900 uppercase">
                           {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-sky-500">
                         <Eye size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Reception Hits</span>
                        <span className="text-sm font-black text-slate-900 uppercase">{blog.views || 0} SECTOR_VIEWS</span>
                      </div>
                   </div>
                </motion.div>
            </header>

            {/* Immersive Cover Image */}
            {blog.coverImage && (
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-24 aspect-[21/9] rounded-[4rem] overflow-hidden border border-slate-100 shadow-[0_40px_80px_-20px_rgba(14,165,233,0.2)] bg-slate-50 group">
                <img src={getAssetUrl(blog.coverImage)} alt={blog.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
                <div className="absolute top-8 right-8 z-10 w-14 h-14 bg-white/80 backdrop-blur rounded-2xl flex items-center justify-center text-sky-500 border border-white/50">
                   <Newspaper size={24} />
                </div>
              </motion.div>
            )}

            {/* Article Content Area */}
            <div className="relative">
                {/* Diagnostic Decor */}
                <div className="absolute top-0 left-[-100px] h-full w-px bg-gradient-to-b from-sky-500 via-slate-100 to-transparent hidden xl:block" />
                <div className="absolute top-0 left-[-115px] hidden xl:block">
                   <div className="text-[10px] font-black text-sky-500 rotate-90 origin-left uppercase tracking-[0.4em]">ELITE_EDITORIAL</div>
                </div>

                <article className="prose prose-slate prose-xl max-w-none prose-headings:text-slate-900 prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-headings:italic prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-medium prose-a:text-sky-500 prose-strong:text-slate-900 prose-code:text-sky-600 prose-code:bg-sky-50/50 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-lg prose-pre:bg-slate-900 prose-pre:rounded-[2rem] prose-pre:p-10 prose-pre:shadow-2xl prose-blockquote:border-sky-500 prose-blockquote:bg-slate-50/50 prose-blockquote:p-8 prose-blockquote:rounded-3xl prose-blockquote:italic prose-img:rounded-[3rem] prose-img:shadow-xl prose-li:text-slate-600 prose-li:font-medium">
                  <ReactMarkdown>{blog.content || '*Buffer empty. Synchronizing Knowledge Node...*'}</ReactMarkdown>
                </article>
            </div>

            {/* Tags Registry */}
            {blog.tags?.length > 1 && (
              <div className="mt-32 pt-20 border-t border-slate-50 bg-slate-50/20 rounded-[4rem] p-16 text-center">
                 <div className="flex justify-center mb-10 text-slate-200">
                    <Zap size={48} />
                 </div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-8">REFERENCED LOGIC NODES</p>
                 <div className="flex flex-wrap justify-center gap-4">
                   {blog.tags.map(tag => (
                     <span key={tag} className="px-6 py-3 bg-white text-slate-900 text-xs font-black rounded-2xl border border-slate-100 shadow-sm uppercase tracking-widest hover:border-sky-500 hover:text-sky-500 transition-all cursor-crosshair">
                       #{tag}
                     </span>
                   ))}
                 </div>
              </div>
            )}

            {/* Article Footer Nav */}
            <div className="mt-32 flex items-center justify-between py-12 border-t border-slate-50">
               <Link to="/" className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-sky-500 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-sky-50 group-hover:border-sky-100">
                    <ChevronLeft size={20} />
                  </div>
                  Archive Index
               </Link>
               <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest italic font-mono">BENTO_EDITORIAL_ENGINE_V5</span>
                  <div className="w-1.5 h-6 bg-sky-500 rounded-full" />
               </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BlogDetailPage;
