import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCertifications } from '@/services/api';
import { Award, ExternalLink } from 'lucide-react';

interface Certification {
  _id: string;
  name: string;
  organization: string;
  date: string;
  credentialUrl: string;
  image: string;
}

const CertificationsPage = () => {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCertifications()
      .then(setCerts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="mb-12">
          <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">← Back to Portfolio</Link>
          <h1 className="text-4xl font-bold mt-4 mb-3">Certifications</h1>
          <p className="text-gray-400">Professional certifications and online courses completed</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-900 rounded-xl h-40 border border-gray-800" />
            ))}
          </div>
        ) : certs.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Award size={48} className="mx-auto mb-4 opacity-30" />
            <p>No certifications yet. Add some from the Admin Dashboard.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {certs.map(cert => (
              <div key={cert._id}
                className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-purple-500/30 hover:-translate-y-1 transition-all duration-300"
              >
                {cert.image && (
                  <img src={cert.image} alt={cert.name} className="w-full h-36 object-cover" />
                )}
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg shrink-0">
                      <Award size={18} className="text-purple-400" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-sm leading-snug mb-1">{cert.name}</h2>
                      {cert.organization && <p className="text-gray-500 text-xs">{cert.organization}</p>}
                      {cert.date && <p className="text-gray-600 text-xs mt-0.5">{cert.date}</p>}
                    </div>
                  </div>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-purple-400 hover:underline mt-3 font-medium"
                    >
                      <ExternalLink size={12} /> View Credential
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificationsPage;
