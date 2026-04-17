import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getResearchItem } from '@/services/api';
import { ArrowLeft, BookOpen, ExternalLink, AlertCircle, Award } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Research {
  _id: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  status: string;
  description: string;
  fullDescription: string;
  link: string;
  images: string[];
}

const ResearchDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Research | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    getResearchItem(id)
      .then(setItem)
      .catch(() => setError('Research item not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
      <div className="animate-pulse space-y-4 w-full max-w-3xl px-4 text-center">
        <div className="h-12 w-12 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto" />
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mx-auto" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mx-auto" />
      </div>
    </div>
  );

  if (error || !item) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 text-gray-900 dark:text-white gap-4">
      <AlertCircle size={48} className="text-red-500" />
      <p className="text-xl">{error || 'Research not found'}</p>
      <button onClick={() => navigate(-1)} className="text-primary underline">Go Back</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300 flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back link */}
          <div className="flex justify-center mb-10">
            <Link to="/#research" className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors font-medium">
              <ArrowLeft size={16} /> Back to Portfolio
            </Link>
          </div>

          {/* Header Section */}
          <div className="flex flex-col items-center text-center mx-auto max-w-3xl mb-12 animate-fadeUp">
            <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-full mb-6 text-blue-500 dark:text-blue-400">
              <BookOpen size={28} />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900 dark:text-white">
              {item.title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-sm md:text-base mt-2 flex items-center justify-center gap-2 flex-wrap">
              {item.journal && <span>{item.journal}</span>}
              {item.year && <span>• {item.year}</span>}
            </p>
            {item.status && (
              <span className="inline-block mt-4 text-xs font-semibold px-4 py-1.5 bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-300 rounded-full border border-blue-500/20">
                {item.status}
              </span>
            )}
          </div>

          {/* Abstract / Description */}
          {(item.fullDescription || item.description) && (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 md:p-12 mb-12 border border-gray-100 dark:border-gray-800 animate-fadeUp animate-delay-100">
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-900 dark:text-white">Research Overview</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {item.fullDescription || item.description}
              </div>
              
              {item.authors && (
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <p className="text-sm font-medium">
                    <span className="text-gray-500 dark:text-gray-400">Authors:</span>{' '}
                    <span className="text-gray-900 dark:text-gray-200">{item.authors}</span>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Images/Certificates */}
          {item.images?.length > 0 && (
            <div className="mb-12 animate-fadeUp animate-delay-200">
              <h2 className="text-xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                Research Certificate & Media
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-900 p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
                {item.images.map((img, i) => (
                  <div key={i} className="bg-white dark:bg-gray-950 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden group">
                    <img
                      src={img}
                      alt={`Research media ${i + 1}`}
                      className="w-full h-auto aspect-[4/3] object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action and Impact Block */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-3xl p-8 md:p-10 text-center max-w-3xl mx-auto mt-16 flex flex-col items-center">
            <Award size={36} className="text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Research Impact</h3>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
              This research contributes to the growing body of knowledge, addressing global challenges and emphasizing the role of continuous academic exploration.
            </p>
            {item.link && (
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex flex-row items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
              >
                View Full Publication <ExternalLink size={18} />
              </a>
            )}
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ResearchDetailPage;
