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
    <section id="blogs" className="scroll-mt-24 mb-20">
      <div className="flex items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4 flex-1">
          <div className="h-px w-10 bg-[#1e293b]" />
          <h2 className="text-sm font-black text-[#94a3b8] uppercase tracking-[0.4em] font-mono-system shrink-0">Intellectual_Insights_Archive</h2>
          <div className="h-px flex-1 bg-[#1e293b]" />
        </div>
        <Link to="/blogs" className="hidden md:flex items-center gap-2 text-[10px] font-mono-system font-black text-[#94a3b8] hover:text-white uppercase tracking-widest transition-colors">
          Full_Archive <ArrowRight size={14} />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
           Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-64 bg-white/5 rounded border border-[#1e293b] animate-pulse" />
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
              <Link to={`/blog/${blog.slug || blog._id}`} className="block h-full transition-all duration-300">
                <div className="system-module h-full mb-0 flex flex-col hover:border-blue-500/30">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-[9px] font-mono-system font-black text-blue-500 uppercase tracking-widest">
                      <Calendar size={12} />
                      {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </div>
                    {blog.readTime && (
                       <div className="text-[9px] font-mono-system font-black text-[#94a3b8] uppercase tracking-widest">
                        {blog.readTime} MIN
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-base font-bold text-white group-hover:text-blue-500 transition-colors line-clamp-2 leading-tight mb-4 uppercase tracking-tight">
                    {blog.title}
                  </h3>
                  
                  <p className="text-[#94a3b8] text-xs leading-relaxed line-clamp-3 mb-8 flex-grow font-mono-system">
                    {blog.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 text-[9px] font-mono-system font-black text-[#94a3b8] uppercase tracking-widest group-hover:text-white transition-colors">
                    Execute_Read <ChevronRight size={14} className="text-blue-500" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
};

export default BlogsSection;
