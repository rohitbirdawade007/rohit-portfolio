import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ChevronRight, Clock, ArrowRight, Rss } from "lucide-react";
import { apiFetch } from "@/services/api";
import { motion } from "framer-motion";

interface Blog {
  _id: string;
  title: string;
  slug?: string;
  excerpt: string;
  createdAt: string;
  readTime?: number;
}

const BlogsSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/blogs")
      .then((data) => setBlogs(data.slice(0, 3))) // Only show latest 3 on homepage
      .catch((err) => console.error("Failed to load blogs:", err))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && blogs.length === 0) return null;

  return (
    <section id="blogs" className="py-32 relative bg-[#020617] overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="section-title-accent"
          >
            <span className="subheading-premium font-black">Intellectual Archive</span>
            <h2 className="heading-premium text-white">Latest <span className="gradient-text-premium italic">Insights</span></h2>
            <p className="text-lg text-gray-400 mt-6 leading-relaxed max-w-2xl font-medium">
              Deep dives into AI, ML, and engineering excellence. Sharing knowledge from my latest experiments and architectural discoveries.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/blogs" className="group bento-item !px-8 !py-4 inline-flex items-center gap-3 font-black uppercase tracking-widest text-[10px] text-white hover:text-primary transition-all border-white/5">
               Archive Access <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
             Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-80 bg-white/5 rounded-[3rem] animate-pulse" />
             ))
          ) : (
            blogs.map((blog, i) => (
              <motion.div
                key={blog._id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group h-full"
              >
                <Link to={`/blog/${blog.slug || blog._id}`} className="block h-full transition-all duration-500 hover:-translate-y-2">
                  <div className="glass-card flex flex-col h-full p-8 rounded-[3rem] border-white/5 hover:border-primary/30 transition-all duration-500 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 text-primary/5 pointer-events-none group-hover:text-primary/10 transition-all">
                      <Rss size={80} />
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                      <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-primary glass px-4 py-1.5 rounded-full border-white/5">
                        <Calendar size={12} />
                        <span>{new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      {blog.readTime && (
                         <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-gray-500 glass px-4 py-1.5 rounded-full border-white/5">
                          <Clock size={12} />
                          <span>{blog.readTime} MIN READ</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-black text-white group-hover:text-primary transition-colors line-clamp-2 leading-tight mb-4 uppercase italic tracking-tighter">
                      {blog.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-10 flex-grow font-medium">
                      {blog.excerpt}
                    </p>
                    
                    <div className="mt-auto flex items-center gap-2 font-black uppercase tracking-widest text-[10px] text-gray-500 group-hover:text-white transition-colors">
                      Execute Read Protocol <ChevronRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
