import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAchievement } from '@/services/api';
import { ArrowLeft, Trophy, Medal, BookOpen, Star, Award, Check, AlertCircle, MapPin, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Achievement {
  _id: string;
  title: string;
  organization: string;
  date: string;
  category: string;
  type: string;
  description: string;
  fullDescription: string;
  images: string[];
}

const iconMap: Record<string, React.ReactNode> = {
  award:       <Trophy size={28} />,
  competition: <Medal size={28} />,
  paper:       <BookOpen size={28} />,
  leadership:  <Star size={28} />,
  certification:<Award size={28} />,
};

const categoryColorMap: Record<string, string> = {
  achievements:   'text-blue-500 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400',
  cocurricular:   'text-green-500 bg-green-50 dark:bg-green-500/10 dark:text-green-400',
  extracurricular:'text-purple-500 bg-purple-50 dark:bg-purple-500/10 dark:text-purple-400',
};

const AchievementDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Achievement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    getAchievement(id)
      .then(setItem)
      .catch(() => setError('Achievement not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
      <div className="animate-pulse space-y-4 w-full max-w-3xl px-4 text-center">
        <div className="h-12 w-12 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto" />
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mx-auto" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mx-auto" />
        <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-3xl mt-10" />
      </div>
    </div>
  );

  if (error || !item) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 text-gray-900 dark:text-white gap-4">
      <AlertCircle size={48} className="text-red-500" />
      <p className="text-xl">{error || 'Achievement not found'}</p>
      <button onClick={() => navigate(-1)} className="text-primary underline">Go Back</button>
    </div>
  );

  const colorClass = categoryColorMap[item.category] || 'text-primary bg-primary/10';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300 flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back link */}
          <div className="flex justify-center mb-10">
            <Link to="/#achievements" className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors font-medium">
              <ArrowLeft size={16} /> Back to Portfolio
            </Link>
          </div>

          {/* Header Section */}
          <div className="flex flex-col items-center text-center mx-auto max-w-3xl mb-12 animate-fadeUp">
            <div className={`p-4 rounded-full mb-6 ${colorClass}`}>
               {iconMap[item.type] || <Trophy size={28} />}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900 dark:text-white">{item.title}</h1>
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              {item.organization && (
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} /> {item.organization}
                </div>
              )}
              {item.date && (
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} /> {item.date}
                </div>
              )}
            </div>
          </div>

          {/* About Section */}
          {(item.fullDescription || item.description) && (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 md:p-12 mb-12 border border-gray-100 dark:border-gray-800 animate-fadeUp animate-delay-100">
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-900 dark:text-white">About This {item.category === 'achievements' ? 'Award' : 'Achievement'}</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {item.fullDescription || item.description}
              </div>
            </div>
          )}

          {/* Image Showcase */}
          {item.images?.length > 0 && (
            <div className="mb-12 animate-fadeUp animate-delay-200">
              <h2 className="text-xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                Award Showcase
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-900 p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
                {item.images.map((img, i) => (
                  <div key={i} className="bg-white dark:bg-gray-950 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden group">
                    <img
                      src={img}
                      alt={`${item.title} image ${i + 1}`}
                      className="w-full h-auto aspect-[4/3] object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Motivation */}
          <div className="bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 rounded-3xl p-8 md:p-10 text-center max-w-3xl mx-auto mt-16">
            <p className="text-lg md:text-xl font-bold italic text-gray-900 dark:text-white mb-4">
              "This award motivates me to push boundaries and continue contributing towards innovation and excellence."
            </p>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              This recognition reflects the dedication to excellence and the commitment to making a meaningful impact.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AchievementDetailPage;
