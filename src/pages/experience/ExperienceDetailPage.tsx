import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getExperience } from '@/services/api';
import { ArrowLeft, Briefcase, Code2, AlertCircle, Building2, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Experience {
  _id: string;
  company: string;
  role: string;
  duration: string;
  techStack: string[];
  description: string;
  fullDescription: string;
  images: string[];
}

const ExperienceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [exp, setExp] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    getExperience(id)
      .then(setExp)
      .catch(() => setError('Experience not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
      <div className="animate-pulse space-y-4 w-full max-w-3xl px-4 text-center">
        <div className="h-12 w-12 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto" />
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-2/3 mx-auto" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mx-auto" />
      </div>
    </div>
  );

  if (error || !exp) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 text-gray-900 dark:text-white gap-4">
      <AlertCircle size={48} className="text-red-500" />
      <p className="text-xl">{error || 'Experience not found'}</p>
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
            <Link to="/#experience" className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors font-medium">
              <ArrowLeft size={16} /> Back to Portfolio
            </Link>
          </div>

          {/* Header Section */}
          <div className="flex flex-col items-center text-center mx-auto max-w-3xl mb-12 animate-fadeUp">
            <div className="p-4 bg-primary/10 rounded-full mb-6 text-primary">
              <Briefcase size={28} />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900 dark:text-white">
              {exp.role}
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm md:text-base font-medium text-gray-600 dark:text-gray-400 mt-2">
              <div className="flex items-center gap-1.5 text-primary">
                <Building2 size={16} /> {exp.company}
              </div>
              {exp.duration && (
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} /> {exp.duration}
                </div>
              )}
            </div>
          </div>

          {/* About This Role */}
          {(exp.fullDescription || exp.description) && (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 md:p-12 mb-12 border border-gray-100 dark:border-gray-800 animate-fadeUp animate-delay-100">
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-900 dark:text-white">About This Role</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {exp.fullDescription || exp.description}
              </div>
            </div>
          )}

          {/* Images/Gallery */}
          {exp.images?.length > 0 && (
            <div className="mb-12 animate-fadeUp animate-delay-200">
              <h2 className="text-xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                Experience Media
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-900 p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
                {exp.images.map((img, i) => (
                  <div key={i} className="bg-white dark:bg-gray-950 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden group">
                    <img
                      src={img}
                      alt={`${exp.company} media ${i + 1}`}
                      className="w-full h-auto aspect-video object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          {exp.techStack?.length > 0 && (
            <div className="bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 rounded-3xl p-8 md:p-10 text-center max-w-3xl mx-auto mt-16 flex flex-col items-center">
              <Code2 size={36} className="text-primary mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Technologies & Skills</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {exp.techStack.map((t, i) => (
                  <span 
                    key={i} 
                    className="px-5 py-2.5 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 rounded-xl text-sm font-semibold hover:border-primary/30 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ExperienceDetailPage;
