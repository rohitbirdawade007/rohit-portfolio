import { useState, useEffect } from "react";
import { BookOpen, ChevronRight } from "lucide-react";
import { getResearchList } from "@/services/api";

interface Research {
  _id: string;
  title: string;
  description: string;
  status: string;
}

const ResearchSection = () => {
  const [research, setResearch] = useState<Research[]>([]);

  useEffect(() => {
    getResearchList().then(setResearch).catch(console.error);
  }, []);

  return (
    <section id="research" className="py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex items-center gap-3 mb-16">
          <h2 className="text-3xl font-bold text-[#1a1a1a]">Publications & Research Work</h2>
          <div className="h-[2px] w-12 bg-primary mt-2" />
        </div>

        <div className="space-y-6">
          {research.map((item) => (
            <div 
              key={item._id} 
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group flex items-start gap-6 relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 group-hover:bg-primary transition-colors" />
              <div className="w-10 h-10 bg-blue-50 text-primary rounded-lg flex items-center justify-center shrink-0">
                 <BookOpen size={20} />
              </div>
              <div className="flex-1">
                 <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors mb-2">
                    {item.title}
                 </h3>
                 <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                    {item.description}
                 </p>
                 <div className="text-[10px] text-primary font-bold uppercase tracking-widest flex items-center gap-1 hover:underline cursor-pointer">
                    View Publication <ChevronRight size={10} />
                 </div>
              </div>
            </div>
          ))}

          {/* Static placeholders if empty per reference image style */}
          {research.length === 0 && (
            <>
              <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm flex items-start gap-6 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20" />
                <div className="w-10 h-10 bg-blue-50 text-primary rounded-lg flex items-center justify-center shrink-0">
                   <BookOpen size={20} />
                </div>
                <div className="flex-1">
                   <h3 className="text-lg font-bold text-gray-900 mb-2">AI and IoT in Sustainable Agriculture: A Review</h3>
                   <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                     Rohit Sandip Birdawade, ... Journal of Instrumentation Technology & Innovations, 2025
                   </p>
                   <div className="text-[10px] text-primary font-bold uppercase tracking-widest flex items-center gap-1 hover:underline cursor-pointer">
                      View Publication <ChevronRight size={10} />
                   </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
