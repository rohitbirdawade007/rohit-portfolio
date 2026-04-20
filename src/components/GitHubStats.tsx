import { useEffect, useState } from 'react';
import { Github, Star, GitFork, ExternalLink, Activity, Code2, Users, FolderKanban } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <section className="py-24 md:py-32 relative overflow-hidden bg-[#020617] text-white">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-primary/5 blur-[120px] -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-20 gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="section-title-accent text-left"
          >
            <span className="subheading-premium">Open Source Archive</span>
            <h2 className="heading-premium text-white">GitHub <span className="gradient-text-premium italic">Transmission</span></h2>
            <p className="text-lg text-gray-400 mt-4 leading-relaxed max-w-xl font-medium">
              Real-time synchronization with active repositories and development analytics across the distributed network.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 glass border-white/10 rounded-2xl hover:bg-white/5 transition-all group"
            >
              <Github size={20} className="group-hover:rotate-12 transition-transform text-primary" />
              <span className="font-black uppercase tracking-widest text-[10px]">Access Repository</span>
              <ExternalLink size={14} className="text-gray-500" />
            </a>
          </motion.div>
        </div>

        {/* User Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Public Assets', value: user?.public_repos || '...', icon: <FolderKanban size={18} /> },
            { label: 'Network Followers', value: user?.followers || '...', icon: <Users size={18} /> },
            { label: 'Following Nodes', value: user?.following || '...', icon: <Activity size={18} /> }
          ].map(({ label, value, icon }, idx) => (
            <motion.div 
              key={label} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-10 border-white/5 rounded-[3rem] bg-white/2 hover:border-primary/20 transition-all text-center group"
            >
              <div className="w-12 h-12 mx-auto flex items-center justify-center glass border-white/10 text-primary group-hover:bg-primary group-hover:text-white transition-all rounded-2xl mb-6">
                 {icon}
              </div>
              <p className="text-5xl font-black text-white tracking-tighter mb-2 italic">{value}</p>
              <p className="text-gray-500 text-[10px] uppercase font-black tracking-[0.2em]">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Contribution Map */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card border-white/5 rounded-[3.5rem] p-8 md:p-12 mb-12 group overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 p-8 text-primary/5 pointer-events-none group-hover:text-primary/10 transition-colors">
             <Activity size={120} />
          </div>
          <div className="flex items-center gap-3 mb-10 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Activity Heatmap
          </div>
          <div className="overflow-x-auto pb-4 custom-scrollbar">
            <img
              src={`https://ghchart.rshah.org/3b82f6/${GITHUB_USERNAME}`}
              alt="GitHub contribution graph"
              className="min-w-[800px] w-full filter hue-rotate-[180deg] invert-[0.1] opacity-60 group-hover:opacity-100 transition-opacity"
              onError={e => (e.currentTarget.style.display = 'none')}
            />
          </div>
        </motion.div>

        {/* Repositories Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-64 bg-white/5 rounded-[3rem] animate-pulse" />
            ))
          ) : (
            repos.map((repo, idx) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-10 border-white/5 rounded-[3rem] bg-white/2 hover:border-primary/40 hover:-translate-y-2 transition-all duration-500 flex flex-col group h-full"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-14 h-14 flex items-center justify-center glass border-white/10 text-primary rounded-2xl group-hover:bg-primary group-hover:text-white transition-all">
                       <Code2 size={24} />
                    </div>
                    <ExternalLink size={16} className="text-gray-600 group-hover:text-primary transition-colors" />
                  </div>
                  
                  <h3 className="text-2xl font-black tracking-tighter mb-4 group-hover:text-primary transition-colors truncate italic uppercase">{repo.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-10 flex-1 line-clamp-2 font-medium">{repo.description || "Experimental technical project archive."}</p>
                  
                  <div className="flex items-center gap-6 text-gray-500 text-[10px] font-black uppercase tracking-widest pt-8 border-t border-white/5">
                    {repo.language && (
                      <span className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                          style={{ background: LANG_COLORS[repo.language] || '#3b82f6' }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-2">
                      <Star size={12} className="text-yellow-500/50" /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-2">
                      <GitFork size={12} className="text-gray-600" /> {repo.forks_count}
                    </span>
                  </div>
                </a>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
