import { useState, useEffect } from "react";
import { BookOpen, ChevronRight, FlaskConical, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { getResearchList } from "@/services/api";

interface Research {
  _id: string;
  title: string;
  status: string;
  description: string;
  slug?: string;
}

const ResearchSection = () => {
  const [research, setResearch] = useState<Research[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResearchList()
      .then(setResearch)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="research" className="py-24 md:py-32 relative overflow-hidden bg-white dark:bg-[#020617]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-20 gap-8 animate-fadeUp">
           <div className="max-w-2xl text-center lg:text-left">
              <span className="subheading-premium">Intellectual Capital</span>
              <h2 className="heading-premium dark:text-white">Research <span className="text-primary italic">&</span> Discoveries</h2>
              <p className="text-xl text-muted-foreground mt-4 leading-relaxed">
                 Advancing the boundaries of artificial intelligence through systematic investigation and model research.
              </p>
           </div>
           <Link to="/research" className="flex items-center gap-3 px-8 py-4 glass border-white/10 rounded-2xl hover:bg-primary/5 transition-all group">
              <Globe size={20} className="text-primary group-hover:rotate-45 transition-transform" />
              <span className="font-black uppercase tracking-widest text-[11px] text-foreground">Global Registry</span>
              <ChevronRight size={14} className="text-primary" />
           </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {loading ? (
             Array.from({length: 2}).map((_, i) => (
                <div key={i} className="h-48 bg-gray-100 dark:bg-white/5 rounded-[2.5rem] animate-pulse" />
             ))
          ) : research.length === 0 ? (
             <p className="text-center text-gray-400 italic col-span-full">Awaiting publication datasets...</p>
          ) : research.map((item, i) => (
            <Link 
              key={item._id} 
              to={`/research/${item.slug || item._id}`} 
              className="block group animate-fadeUp"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="bento-item !p-10 border-white/5 dark:hover:bg-primary/5 group-hover:border-primary/30 transition-all h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-primary/5 group-hover:text-primary/10 transition-colors pointer-events-none">
                   <FlaskConical size={100} />
                </div>
                
                <div className="flex flex-col h-full relative z-10">
                   <div className="flex items-center justify-between mb-8">
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                         <BookOpen size={22} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest px-4 py-1.5 bg-primary/10 text-primary rounded-full">
                         {item.status || "In Review"}
                      </span>
                   </div>
                   
                   <h3 className="text-2xl font-black mb-4 tracking-tighter leading-tight group-hover:text-primary transition-colors flex-1">
                      {item.title}
                   </h3>
                   
                   <p className="text-muted-foreground text-sm leading-relaxed mb-8 line-clamp-2">
                      {item.description}
                   </p>
                   
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary group-hover:gap-4 transition-all">
                      Access Full Operation Brief <ChevronRight size={14} />
                   </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
