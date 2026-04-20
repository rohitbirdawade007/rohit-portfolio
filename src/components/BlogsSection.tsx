import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ChevronRight, Clock, ArrowRight } from "lucide-react";
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
    <section id="blogs" className="py-24 bg-slate-50/50">
      <div className="container">
        <div className="flex items-end justify-between mb-16 px-2">
           <div className="text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Latest Insights</h2>
              <p className="text-slate-600">Sharing technical discoveries and engineering perspectives.</p>
           </div>
           <Link to="/blogs" className="hidden md:flex items-center gap-2 text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors">
              Full Archive <ArrowRight size={18} />
           </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
             Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-80 bg-white rounded-3xl animate-pulse border border-slate-100" />
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
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group-hover:shadow-xl transition-all h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-[10px] font-bold text-sky-500 uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                        {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      {blog.readTime && (
                         <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <Clock size={12} />
                          {blog.readTime} MIN READ
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-sky-600 transition-colors line-clamp-2 leading-tight">
                      {blog.title}
                    </h3>
                    
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-8 flex-grow">
                      {blog.excerpt}
                    </p>
                    
                    <div className="mt-auto flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-sky-600 transition-colors uppercase tracking-widest">
                      Read Entry <ChevronRight size={16} className="text-sky-500 group-hover:translate-x-1 transition-transform" />
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
