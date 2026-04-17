import { useEffect, useState } from 'react';
import { Github, Star, GitFork, ExternalLink, Activity, Code2, Users, FolderKanban } from 'lucide-react';

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

const GITHUB_USERNAME = 'rohitbirdawade007';

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
    <section className="py-24 md:py-32 relative overflow-hidden bg-[#050505] text-white">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-primary/5 blur-[120px] -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8 animate-fadeUp">
          <div className="max-w-xl text-center md:text-left">
            <span className="subheading-premium">Open Source Archive</span>
            <h2 className="heading-premium text-white">GitHub <span className="text-primary italic">Transmission</span></h2>
            <p className="text-lg text-white/40 mt-4 leading-relaxed">
              Real-time synchronization with active repositories and development analytics.
            </p>
          </div>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 glass border-white/10 rounded-2xl hover:bg-white/5 transition-all group"
          >
            <Github size={20} className="group-hover:rotate-12 transition-transform" />
            <span className="font-black uppercase tracking-widest text-[11px]">Browse Repository</span>
            <ExternalLink size={14} className="text-white/30" />
          </a>
        </div>

        {/* User Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 animate-fadeUp">
          {[
            { label: 'Public Assets', value: user?.public_repos || '...', icon: <FolderKanban size={18} /> },
            { label: 'Network Followers', value: user?.followers || '...', icon: <Users size={18} /> },
            { label: 'Following Nodes', value: user?.following || '...', icon: <Activity size={18} /> }
          ].map(({ label, value, icon }) => (
            <div key={label} className="glass p-8 border-white/5 rounded-[2.5rem] bg-white/2 hover:border-primary/20 transition-all text-center group">
              <div className="w-10 h-10 mx-auto flex items-center justify-center bg-white/5 text-primary/50 group-hover:text-primary transition-colors rounded-xl mb-4">
                 {icon}
              </div>
              <p className="text-4xl font-black text-white tracking-tighter mb-2">{value}</p>
              <p className="text-white/30 text-[10px] uppercase font-black tracking-[0.2em]">{label}</p>
            </div>
          ))}
        </div>

        {/* Contribution Map */}
        <div className="glass border-white/5 rounded-[3rem] p-8 md:p-12 mb-8 group animate-fadeUp animate-delay-200 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 text-primary/5 pointer-events-none group-hover:text-primary/10 transition-colors">
             <Activity size={120} />
          </div>
          <div className="flex items-center gap-3 mb-8 text-[11px] font-black uppercase tracking-widest text-white/40">
            <Activity size={16} className="text-primary" /> Activity Heatmap
          </div>
          <div className="overflow-x-auto pb-4 custom-scrollbar">
            <img
              src={`https://ghchart.rshah.org/3b82f6/${GITHUB_USERNAME}`}
              alt="GitHub contribution graph"
              className="min-w-[800px] w-full filter hue-rotate-[180deg] invert-[0.1] opacity-70 group-hover:opacity-100 transition-opacity"
              onError={e => (e.currentTarget.style.display = 'none')}
            />
          </div>
        </div>

        {/* Repositories Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeUp animate-delay-300">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-48 bg-white/5 rounded-[2.5rem] animate-pulse" />
            ))
          ) : (
            repos.map(repo => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-8 border-white/5 rounded-[2.5rem] bg-white/2 hover:border-primary/40 hover:-translate-y-2 transition-all duration-500 flex flex-col group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-white/5 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-all">
                     <Code2 size={24} />
                  </div>
                  <ExternalLink size={16} className="text-white/20 group-hover:text-primary transition-colors" />
                </div>
                
                <h3 className="text-xl font-black tracking-tighter mb-3 group-hover:text-primary transition-colors truncate">{repo.name}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-8 flex-1 line-clamp-2">{repo.description || "Experimental technical project archive."}</p>
                
                <div className="flex items-center gap-5 text-white/40 text-[10px] font-black uppercase tracking-widest pt-6 border-t border-white/5">
                  {repo.language && (
                    <span className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                        style={{ background: LANG_COLORS[repo.language] || '#3b82f6' }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-2">
                    <Star size={12} className="text-yellow-500/50" /> {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-2">
                    <GitFork size={12} className="text-white/20" /> {repo.forks_count}
                  </span>
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
