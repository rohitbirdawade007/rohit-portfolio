import { useEffect, useState } from 'react';
import { Github, Star, GitFork, ExternalLink, Activity } from 'lucide-react';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  name: string;
}

const GITHUB_USERNAME = 'rohitbirdawade007'; // ← update to your username

const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#2b7489',
  JavaScript: '#f1e05a',
  'C++': '#f34b7d',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Rust: '#dea584',
  Go: '#00ADD8',
  Java: '#b07219'
};

const GitHubStats = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cache = sessionStorage.getItem(`gh_stats_${GITHUB_USERNAME}`);
    if (cache) {
      try {
        const { user: u, repos: r } = JSON.parse(cache);
        setUser(u);
        setRepos(r);
        setLoading(false);
        return;
      } catch { /* ignore */ }
    }

    Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`).then(r => r.json()),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`).then(r => r.json())
    ])
      .then(([userData, reposData]) => {
        if (userData.message) throw new Error(userData.message);
        setUser(userData);
        setRepos(Array.isArray(reposData) ? reposData : []);
        sessionStorage.setItem(`gh_stats_${GITHUB_USERNAME}`, JSON.stringify({ user: userData, repos: reposData }));
      })
      .catch(() => setError('Could not load GitHub data'))
      .finally(() => setLoading(false));
  }, []);

  if (error) return null;

  return (
    <section className="py-16 bg-gray-950 text-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center gap-3 mb-8">
          <Github size={28} className="text-white" />
          <h2 className="text-2xl font-bold">GitHub Activity</h2>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
          >
            View Profile <ExternalLink size={13} />
          </a>
        </div>

        {/* User Stats */}
        {loading ? (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 bg-gray-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : user && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Public Repos', value: user.public_repos },
              { label: 'Followers', value: user.followers },
              { label: 'Following', value: user.following }
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-primary">{value}</p>
                <p className="text-gray-400 text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>
        )}

        {/* GitHub Contribution Image */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-6 overflow-hidden">
          <div className="flex items-center gap-2 mb-3 text-sm text-gray-400">
            <Activity size={14} /> Contribution Graph
          </div>
          <img
            src={`https://ghchart.rshah.org/2563eb/${GITHUB_USERNAME}`}
            alt="GitHub contribution graph"
            className="w-full rounded opacity-80 hover:opacity-100 transition-opacity"
            onError={e => (e.currentTarget.style.display = 'none')}
          />
        </div>

        {/* Recent Repos */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 bg-gray-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map(repo => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm truncate flex-1 mr-2">{repo.name}</h3>
                  <ExternalLink size={12} className="text-gray-500 shrink-0 mt-0.5" />
                </div>
                {repo.description && (
                  <p className="text-gray-400 text-xs line-clamp-2 mb-3 flex-1">{repo.description}</p>
                )}
                <div className="flex items-center gap-3 text-gray-500 text-xs mt-auto">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: LANG_COLORS[repo.language] || '#8b949e' }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star size={11} /> {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={11} /> {repo.forks_count}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GitHubStats;
