import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ChevronRight } from "lucide-react";
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
    <section id="research" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4">
        <h2 className="section-heading mx-auto text-center mb-12">Research & Publications</h2>
        
        <div className="space-y-6 max-w-4xl mx-auto">
          {loading ? (
             Array.from({length: 2}).map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
             ))
          ) : research.length === 0 ? (
             <p className="text-center text-gray-400 italic">No research papers added yet.</p>
          ) : research.map((item) => (
            <Link key={item._id} to={`/research/${item.slug || item._id}`} className="block group">
              <Card className="card-hover border-l-4 border-l-primary shadow-sm bg-white dark:bg-gray-950 dark:border-gray-800 group-hover:border-l-primary group-hover:-translate-y-1 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full hidden sm:block">
                      <BookOpen size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors dark:text-white">{item.title}</h3>
                          {item.status && (
                             <span className="text-xs font-semibold px-2 py-1 bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400 rounded-full w-fit">
                               {item.status}
                             </span>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>
                      <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:underline">
                        Read Publication <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-10">
           <Link to="/research" className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              View All Research <ChevronRight size={16} />
           </Link>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
