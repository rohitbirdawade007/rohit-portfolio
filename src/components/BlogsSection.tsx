import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ChevronRight, Clock, ArrowRight } from "lucide-react";
import { apiFetch } from "@/services/api";

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
    <section id="blogs" className="section-padding bg-gray-50 dark:bg-gray-900/30 transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 animate-fadeUp">
          <div className="max-w-2xl">
            <h2 className="section-heading !text-left !mb-4">Insights & Thoughts</h2>
            <p className="text-lg text-muted-foreground">
              Deep dives into AI, ML, and engineering excellence. Sharing knowledge from my latest experiments and projects.
            </p>
          </div>
          <Link to="/blogs" className="group inline-flex items-center gap-2 font-bold text-primary hover:text-primary/80 transition-all pb-1">
             Explore All Articles <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {loading ? (
             Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-80 bg-muted/50 rounded-[2.5rem] animate-pulse" />
             ))
          ) : (
            blogs.map((blog, i) => (
              <Link 
                to={`/blog/${blog.slug || blog._id}`} 
                key={blog._id} 
                className="group flex flex-col h-full animate-fadeUp"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="glass-card flex flex-col h-full p-8 rounded-[2.5rem] hover:border-primary/20 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-lg">
                      <Calendar size={12} />
                      <span>{new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    {blog.readTime && (
                       <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-muted px-3 py-1 rounded-lg">
                        <Clock size={12} />
                        <span>{blog.readTime} MIN READ</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2 leading-tight mb-4">
                    {blog.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-8 flex-grow">
                    {blog.excerpt}
                  </p>
                  
                  <div className="mt-auto flex items-center gap-2 font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                    Read Article <ChevronRight size={18} className="translate-y-[1px]" />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
