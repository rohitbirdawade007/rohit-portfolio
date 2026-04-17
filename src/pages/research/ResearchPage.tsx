import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getResearchList } from '@/services/api';
import { BookOpen, ChevronRight, ExternalLink } from 'lucide-react';

interface Research {
  _id: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  status: string;
  description: string;
  link: string;
}

const ResearchPage = () => {
  const [research, setResearch] = useState<Research[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResearchList()
      .then(setResearch)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-12">
          <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">← Back to Portfolio</Link>
          <h1 className="text-4xl font-bold mt-4 mb-3">Research & Publications</h1>
          <p className="text-gray-400">Academic research papers and publications</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-900 rounded-xl h-32 border border-gray-800" />
            ))}
          </div>
        ) : research.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
            <p>No research items yet. Add some from the Admin Dashboard.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {research.map(item => (
              <div key={item._id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-blue-500/10 rounded-xl shrink-0">
                    <BookOpen size={20} className="text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-base leading-snug mb-2">{item.title}</h2>
                    {item.status && (
                      <span className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 mb-2 inline-block">
                        {item.status}
                      </span>
                    )}
                    {item.authors && <p className="text-gray-500 text-xs mb-1">Authors: {item.authors}</p>}
                    {item.journal && <p className="text-gray-500 text-xs mb-1">{item.journal}{item.year ? `, ${item.year}` : ''}</p>}
                    {item.description && (
                      <p className="text-gray-400 text-sm mt-2 line-clamp-2">{item.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-3">
                      <Link
                        to={`/research/${item._id}`}
                        className="flex items-center gap-1 text-blue-400 text-sm hover:underline font-medium"
                      >
                        Read More <ChevronRight size={14} />
                      </Link>
                      {item.link && (
                        <a href={item.link} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 text-gray-400 text-sm hover:text-white"
                        >
                          <ExternalLink size={14} /> Publication
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchPage;
