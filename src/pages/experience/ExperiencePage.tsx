import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getExperiences } from '@/services/api';
import { Briefcase, Code2, ChevronRight } from 'lucide-react';

interface Experience {
  _id: string;
  company: string;
  role: string;
  duration: string;
  techStack: string[];
  description: string;
}

const ExperiencePage = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExperiences()
      .then(setExperiences)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-12">
          <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">← Back to Portfolio</Link>
          <h1 className="text-4xl font-bold mt-4 mb-3">Experience & Internships</h1>
          <p className="text-gray-400">Professional journey and internship roles</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-900 rounded-xl h-32 border border-gray-800" />
            ))}
          </div>
        ) : experiences.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Briefcase size={48} className="mx-auto mb-4 opacity-30" />
            <p>No experience entries yet. Add some from the Admin Dashboard.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {experiences.map(exp => (
              <div key={exp._id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-primary/10 rounded-xl">
                    <Briefcase size={22} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-bold text-lg">{exp.role}</h2>
                    <p className="text-primary text-sm font-medium">{exp.company}</p>
                    {exp.duration && <p className="text-gray-500 text-xs mt-0.5">{exp.duration}</p>}
                    {exp.description && (
                      <p className="text-gray-400 text-sm mt-2 line-clamp-2">{exp.description}</p>
                    )}
                    {exp.techStack?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {exp.techStack.slice(0, 5).map((t, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 bg-gray-800 rounded-full text-gray-300">{t}</span>
                        ))}
                      </div>
                    )}
                    <Link
                      to={`/experience/${exp._id}`}
                      className="flex items-center gap-1 text-primary text-sm mt-3 hover:underline font-medium"
                    >
                      View Details <ChevronRight size={14} />
                    </Link>
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

export default ExperiencePage;
