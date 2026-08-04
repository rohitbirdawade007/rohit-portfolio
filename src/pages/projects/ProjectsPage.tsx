import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, getAssetUrl } from '@/services/api';
import {
  Github, ExternalLink, Code2, ArrowLeft, Search, Star,
  Brain, Shield, Eye, BarChart3, Cpu, ChevronRight,
  Layers, Trophy, X, SlidersHorizontal, Leaf
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from '@/lib/utils';

interface Project {
  _id: string;
  title: string;
  description: string;
  problemStatement: string;
  solution: string;
  techStack: string[];
  keyFeatures: string[];
  image: string;
  githubUrl: string;
  demoUrl: string;
  category: string;
  difficulty: string;
  status: string;
  featured: boolean;
  aiModels: string[];
  achievements: string[];
  deployment: string;
  slug: string;
}

const CATEGORIES = ['All', 'Generative AI', 'AI & Security', 'Computer Vision', 'Machine Learning', 'AI & IoT', 'Data Analytics'];
const DIFFICULTIES = ['All', 'Expert', 'Advanced', 'Intermediate', 'Beginner'];
const STATUSES = ['All', 'Active', 'Completed', 'Research'];

const CATEGORY_CONFIG: Record<string, { icon: React.ReactNode; border: string }> = {
  'Generative AI':  { icon: <Brain size={14} className="text-purple-400" />,    border: 'border-purple-500/30' },
  'AI & Security':  { icon: <Shield size={14} className="text-red-400" />,   border: 'border-red-500/30' },
  'Computer Vision':{ icon: <Eye size={14} className="text-cyan-400" />,      border: 'border-cyan-500/30' },
  'Machine Learning':{ icon: <Cpu size={14} className="text-emerald-400" />, border: 'border-emerald-500/30' },
  'AI & IoT':       { icon: <Leaf size={14} className="text-green-400" />,    border: 'border-green-500/30' },
  'Data Analytics': { icon: <BarChart3 size={14} className="text-amber-400" />, border: 'border-amber-500/30' },
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const ProjectCard = ({ project }: { project: Project }) => {
  const catConfig = CATEGORY_CONFIG[project.category] || { border: 'border-white/10', icon: <Code2 size={14} className="text-slate-400" /> };

  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        "group relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300",
        "bg-[#12131C] hover:-translate-y-2 hover:shadow-2xl hover:border-indigo-500/40",
        catConfig.border
      )}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-amber-500 text-slate-950 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md">
          <Star size={10} className="fill-slate-950" /> Featured
        </div>
      )}

      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-slate-900">
        <img
          src={getAssetUrl(project.image)}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop`;
          }}
        />
        {/* Category pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
          {catConfig.icon} {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h2 className="text-base font-bold text-white leading-snug group-hover:text-indigo-400 transition-colors line-clamp-2 flex-1">
            {project.title}
          </h2>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Tech Stack */}
        {project.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.slice(0, 4).map((t, i) => (
              <span key={i} className="tag-blue text-[10px]">
                {t}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="tag text-[10px]">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Key Achievement */}
        {project.achievements?.length > 0 && (
          <div className="flex items-start gap-2 mb-5 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
            <Trophy size={12} className="text-amber-400 mt-0.5 shrink-0" />
            <p className="text-[11px] text-amber-200 leading-snug line-clamp-2">{project.achievements[0]}</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/08 mt-auto">
          <Link
            to={`/projects/${project._id}`}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            View Details <ChevronRight size={14} />
          </Link>
          <div className="flex items-center gap-1">
            {project.githubUrl && (
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-slate-400 hover:text-white hover:bg-white/10"
                onClick={() => window.open(project.githubUrl, '_blank')}>
                <Github size={15} />
              </Button>
            )}
            {project.demoUrl && (
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-slate-400 hover:text-white hover:bg-white/10"
                onClick={() => window.open(project.demoUrl, '_blank')}>
                <ExternalLink size={15} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDifficulty, setActiveDifficulty] = useState('All');
  const [activeStatus, setActiveStatus] = useState('All');
  const [showFeatured, setShowFeatured] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return projects.filter(p => {
      const matchSearch = !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase()) ||
        p.techStack?.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
        p.category?.toLowerCase().includes(search.toLowerCase());
      const matchCat  = activeCategory === 'All' || p.category === activeCategory;
      const matchDiff = activeDifficulty === 'All' || p.difficulty === activeDifficulty;
      const matchStat = activeStatus === 'All' || p.status === activeStatus;
      const matchFeat = !showFeatured || p.featured;
      return matchSearch && matchCat && matchDiff && matchStat && matchFeat;
    });
  }, [projects, search, activeCategory, activeDifficulty, activeStatus, showFeatured]);

  const featuredCount = projects.filter(p => p.featured).length;
  const activeFilters = [
    activeCategory !== 'All' && activeCategory,
    activeDifficulty !== 'All' && activeDifficulty,
    activeStatus !== 'All' && activeStatus,
    showFeatured && 'Featured',
  ].filter(Boolean) as string[];

  const clearFilters = () => {
    setActiveCategory('All');
    setActiveDifficulty('All');
    setActiveStatus('All');
    setShowFeatured(false);
    setSearch('');
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-slate-100 flex flex-col">
      <SEO
        title="Projects Archive | Rohit Birdawade — AI & ML Engineer"
        description="Explore Rohit Birdawade's portfolio of AI, ML, GenAI, Computer Vision, IoT and Full-Stack projects."
      />
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-[#090A0F] border-b border-white/08">
        <div className="container max-w-7xl relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/" className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-indigo-400 transition-all mb-8">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
              <div className="max-w-3xl">
                <span className="eyebrow mb-3"><span className="eyebrow-dot" />Project Archive</span>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none text-white">
                  All <span className="text-indigo-400">Projects</span>
                </h1>
                <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
                  Production-grade AI systems, deep learning models, and full-stack applications built for real-world impact across healthcare, agriculture, security, and data analytics.
                </p>
              </div>

              {/* Stats Row */}
              <div className="flex gap-4 flex-wrap lg:flex-nowrap">
                {[
                  { label: 'Total Projects', value: projects.length, icon: <Layers size={16} />, color: 'text-indigo-400' },
                  { label: 'Featured', value: featuredCount, icon: <Star size={16} />, color: 'text-amber-400' },
                  { label: 'AI Projects', value: projects.filter(p => ['Generative AI', 'Machine Learning', 'Computer Vision', 'AI & IoT', 'AI & Security'].includes(p.category)).length, icon: <Brain size={16} />, color: 'text-purple-400' },
                ].map((stat, i) => (
                  <div key={i} className="card p-5 text-center min-w-[120px]">
                    <span className={cn("flex justify-center mb-2", stat.color)}>{stat.icon}</span>
                    <div className="text-3xl font-black text-white">{stat.value}</div>
                    <div className="mono text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search + Filters */}
      <div className="sticky top-16 z-30 bg-[#090A0F]/90 backdrop-blur-xl border-b border-white/08">
        <div className="container max-w-7xl py-4">
          <div className="flex flex-col gap-4">
            {/* Search bar */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-lg">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <Input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search projects, technologies, categories..."
                  className="pl-11 bg-slate-900 border-white/10 text-white placeholder:text-slate-500 h-11 rounded-xl focus:border-indigo-500"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                    <X size={14} />
                  </button>
                )}
              </div>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={cn("h-11 gap-2 border-white/10 bg-white/05 text-slate-300 hover:bg-white/10 rounded-xl",
                  showFilters && "border-indigo-500 text-indigo-400")}
              >
                <SlidersHorizontal size={15} />
                Filters
                {activeFilters.length > 0 && (
                  <span className="bg-indigo-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {activeFilters.length}
                  </span>
                )}
              </Button>

              <Button
                variant={showFeatured ? "default" : "outline"}
                onClick={() => setShowFeatured(!showFeatured)}
                className={cn("h-11 gap-2 rounded-xl",
                  showFeatured
                    ? "bg-amber-500 hover:bg-amber-600 text-slate-950 border-amber-500 font-bold"
                    : "border-white/10 bg-white/05 text-slate-300 hover:bg-white/10")}
              >
                <Star size={14} className={showFeatured ? "fill-slate-950" : ""} />
                Featured
              </Button>

              {activeFilters.length > 0 && (
                <Button variant="ghost" onClick={clearFilters} className="h-11 text-slate-400 hover:text-white rounded-xl">
                  <X size={14} className="mr-1" /> Clear
                </Button>
              )}
            </div>

            {/* Category filter pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border",
                    activeCategory === cat
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-md"
                      : "bg-white/05 border-white/08 text-slate-400 hover:border-white/15 hover:text-white"
                  )}
                >
                  {cat !== 'All' && CATEGORY_CONFIG[cat]?.icon}
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <main className="flex-grow py-12">
        <div className="container max-w-7xl">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse card h-[520px]" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-32 card">
              <Code2 size={48} className="mx-auto mb-4 text-slate-500" />
              <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
              <p className="text-slate-400 mb-6">Try adjusting your search or filters</p>
              <Button onClick={clearFilters} variant="outline" className="border-white/10 text-slate-300">
                Clear all filters
              </Button>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((p) => (
                <ProjectCard key={p._id} project={p} />
              ))}
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
