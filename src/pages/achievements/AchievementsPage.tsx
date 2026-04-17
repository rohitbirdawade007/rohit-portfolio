import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAchievements } from '@/services/api';
import { Trophy, Medal, BookOpen, Star, Award, Check, ChevronRight } from 'lucide-react';

interface Achievement {
  _id: string;
  title: string;
  organization: string;
  date: string;
  category: string;
  type: string;
  description: string;
  images: string[];
}

const iconMap: Record<string, React.ReactNode> = {
  award:       <Trophy size={20} />,
  competition: <Medal size={20} />,
  paper:       <BookOpen size={20} />,
  leadership:  <Star size={20} />,
  certification:<Award size={20} />,
};

const CATEGORIES = [
  { key: 'achievements',    label: '🏆 Achievements & Awards',   borderColor: 'border-yellow-500', iconBg: 'bg-yellow-500/10 text-yellow-400', linkColor: 'text-yellow-400' },
  { key: 'cocurricular',   label: '📚 Co-Curricular Activities', borderColor: 'border-blue-500',   iconBg: 'bg-blue-500/10 text-blue-400',   linkColor: 'text-blue-400' },
  { key: 'extracurricular',label: '✨ Extracurricular Activities',borderColor: 'border-green-500',  iconBg: 'bg-green-500/10 text-green-400', linkColor: 'text-green-400' },
];

const AchievementsPage = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAchievements()
      .then(setAchievements)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="animate-pulse space-y-4 w-full max-w-5xl px-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-24 bg-gray-800 rounded-xl" />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="mb-12">
          <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">← Back to Portfolio</Link>
          <h1 className="text-4xl font-bold mt-4 mb-3">Achievements & Recognition</h1>
          <p className="text-gray-400">Awards, competitions, research, and leadership roles</p>
        </div>

        {CATEGORIES.map(cat => {
          const items = achievements.filter(a => a.category === cat.key);
          if (items.length === 0) return null;
          return (
            <div key={cat.key} className="mb-14">
              <h2 className="text-2xl font-bold mb-6">{cat.label}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map(item => (
                  <div
                    key={item._id}
                    className={`bg-gray-900 rounded-xl border-t-4 ${cat.borderColor} border border-gray-800 p-5 hover:border-gray-700 hover:-translate-y-1 transition-all duration-300`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2.5 rounded-full ${cat.iconBg}`}>
                        {iconMap[item.type] || <Check size={20} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm leading-snug mb-1 line-clamp-2">{item.title}</h3>
                        {item.organization && (
                          <p className="text-gray-500 text-xs mb-1 line-clamp-1">{item.organization}</p>
                        )}
                        {item.date && <p className="text-gray-600 text-xs mb-2">{item.date}</p>}
                        {item.images?.[0] && (
                          <img src={item.images[0]} alt={item.title} className="w-full h-28 object-cover rounded-lg mb-3 border border-gray-800" />
                        )}
                        <p className="text-gray-400 text-xs line-clamp-2 mb-3">{item.description}</p>
                        <Link
                          to={`/achievements/${item._id}`}
                          className={`text-xs font-medium flex items-center gap-1 ${cat.linkColor} hover:underline`}
                        >
                          View Details <ChevronRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {achievements.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <Trophy size={48} className="mx-auto mb-4 opacity-30" />
            <p>No achievements yet. Add some from the Admin Dashboard.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsPage;
