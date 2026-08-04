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
  'Generative AI':  { icon: <Brain size={14} className="text-purple-600" />,    border: 'border-purple-200' },
  'AI & Security':  { icon: <Shield size={14} className="text-red-600" />,   border: 'border-red-200' },
  'Computer Vision':{ icon: <Eye size={14} className="text-cyan-600" />,      border: 'border-cyan-200' },
  'Machine Learning':{ icon: <Cpu size={14} className="text-emerald-600" />, border: 'border-emerald-200' },
  'AI & IoT':       { icon: <Leaf size={14} className="text-green-600" />,    border: 'border-green-200' },
  'Data Analytics': { icon: <BarChart3 size={14} className="text-amber-600" />, border: 'border-amber-200' },
};

const DIFFICULTY_CONFIG: Record<string, { color: string; bg: string }> = {
  Expert:       { color: 'text-red-700',    bg: 'bg-red-50 border-red-200' },
  Advanced:     { color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  Intermediate: { color: 'text-blue-700',   bg: 'bg-blue-50 border-blue-200' },
  Beginner:     { color: 'text-green-700',  bg: 'bg-green-50 border-green-200' },
};

const STATUS_CONFIG: Record<string, { color: string; dot: string }> = {
  Active:    { color: 'text-emerald-700', dot: 'bg-emerald-500 animate-pulse' },
  Completed: { color: 'text-blue-700',    dot: 'bg-blue-500' },
  Research:  { color: 'text-purple-700',  dot: 'bg-purple-500' },
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
  const catConfig = CATEGORY_CONFIG[project.category] || { border: 'border-slate-200', icon: <Code2 size={14} className="text-slate-600" /> };
  const diffConfig = DIFFICULTY_CONFIG[project.difficulty] || DIFFICULTY_CONFIG.Intermediate;
  const statusConfig = STATUS_CONFIG[project.status] || STATUS_CONFIG.Completed;

  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        "group relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300",
        "bg-white hover:-translate-y-2 hover:shadow-xl",
        catConfig.border
      )}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-amber-500 text-white rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm">
          <Star size={10} className="fill-white" /> Featured
        </div>
      )}

      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <img
          src={getAssetUrl(project.image)}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop`;
          }}
        />
        {/* Category pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-md border border-slate-200 rounded-full px-3 py-1 text-[10px] font-bold text-slate-800 uppercase tracking-wider shadow-sm">
          {catConfig.icon} {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h2 className="text-base font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2 flex-1">
            {project.title}
          </h2>
        </div>

        {/* Meta badges */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {project.difficulty && (
            <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border", diffConfig.bg, diffConfig.color)}>
              {project.difficulty}
            </span>
          )}
          {project.status && (
            <span className={cn("flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider", statusConfig.color)}>
              <span className={cn("w-1.5 h-1.5 rounded-full", statusConfig.dot)} />
              {project.status}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* AI Models */}
        {project.aiModels?.length > 0 && (
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 mb-2 flex items-center gap-1">
              <Brain size={10} /> AI Models
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.aiModels.slice(0, 3).map((m, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 bg-indigo-50 border border-indigo-100 rounded text-indigo-700 font-medium">
                  {m}
                </span>
              ))}
              {project.aiModels.length > 3 && (
                <span className="text-[10px] px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-500">
                  +{project.aiModels.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        {project.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.slice(0, 4).map((t, i) => (
              <span key={i} className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-700">
                {t}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="text-[10px] px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-500">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Key Achievement */}
        {project.achievements?.length > 0 && (
          <div className="flex items-start gap-2 mb-5 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            <Trophy size={12} className="text-amber-600 mt-0.5 shrink-0" />
            <p className="text-[11px] text-amber-900 leading-snug line-clamp-2">{project.achievements[0]}</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
          <Link
            to={`/projects/${project._id}`}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            View Details <ChevronRight size={14} />
          </Link>
          <div className="flex items-center gap-1">
            {project.githubUrl && (
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                onClick={() => window.open(project.githubUrl, '_blank')}>
                <Github size={15} />
              </Button>
            )}
            {project.demoUrl && (
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
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
    <div className="min-h-screen bg-[#FAFAFC] text-slate-900 flex flex-col">
      <SEO
        title="Projects Archive | Rohit Birdawade — AI & ML Engineer"
        description="Explore Rohit Birdawade's portfolio of AI, ML, GenAI, Computer Vision, IoT and Full-Stack projects."
      />
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-slate-50 border-b border-slate-200">
        <div className="container max-w-7xl relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/" className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-all mb-8">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
              <div className="max-w-3xl">
                <span className="eyebrow mb-3"><span className="eyebrow-dot" />Project Archive</span>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none text-slate-900">
                  All <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Projects</span>
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                  Production-grade AI systems, deep learning models, and full-stack applications built for real-world impact across healthcare, agriculture, security, and data analytics.
                </p>
              </div>

              {/* Stats Row */}
              <div className="flex gap-4 flex-wrap lg:flex-nowrap">
                {[
                  { label: 'Total Projects', value: projects.length, icon: <Layers size={16} />, color: 'text-indigo-600' },
                  { label: 'Featured', value: featuredCount, icon: <Star size={16} />, color: 'text-amber-600' },
                  { label: 'AI Projects', value: projects.filter(p => ['Generative AI', 'Machine Learning', 'Computer Vision', 'AI & IoT', 'AI & Security'].includes(p.category)).length, icon: <Brain size={16} />, color: 'text-purple-600' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 text-center min-w-[120px] shadow-sm">
                    <span className={cn("flex justify-center mb-2", stat.color)}>{stat.icon}</span>
                    <div className="text-3xl font-black text-slate-900">{stat.value}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search + Filters */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-xl border-b border-slate-200">
        <div className="container max-w-7xl py-4">
          <div className="flex flex-col gap-4">
            {/* Search bar */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-lg">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search projects, technologies, categories..."
                  className="pl-11 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 h-11 rounded-xl focus:border-indigo-600"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900">
                    <X size={14} />
                  </button>
                )}
              </div>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={cn("h-11 gap-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 rounded-xl",
                  showFilters && "border-indigo-600 text-indigo-600")}
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
                    ? "bg-amber-500 hover:bg-amber-600 text-white border-amber-500"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50")}
              >
                <Star size={14} className={showFeatured ? "fill-white" : ""} />
                Featured
              </Button>

              {activeFilters.length > 0 && (
                <Button variant="ghost" onClick={clearFilters} className="h-11 text-slate-500 hover:text-slate-900 rounded-xl">
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
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
                  )}
                >
                  {cat !== 'All' && CATEGORY_CONFIG[cat]?.icon}
                  {cat}
                </button>
              ))}
            </div>

            {/* Extended filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-6 pt-2"
                >
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Difficulty</p>
                    <div className="flex gap-2">
                      {DIFFICULTIES.map(d => (
                        <button key={d} onClick={() => setActiveDifficulty(d)}
                          className={cn("px-3 py-1.5 rounded-lg text-xs font-bold border transition-all",
                            activeDifficulty === d
                              ? "bg-indigo-600 border-indigo-600 text-white"
                              : "bg-white border-slate-200 text-slate-600 hover:border-slate-300")}>
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Status</p>
                    <div className="flex gap-2">
                      {STATUSES.map(s => (
                        <button key={s} onClick={() => setActiveStatus(s)}
                          className={cn("px-3 py-1.5 rounded-lg text-xs font-bold border transition-all",
                            activeStatus === s
                              ? "bg-indigo-600 border-indigo-600 text-white"
                              : "bg-white border-slate-200 text-slate-600 hover:border-slate-300")}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <main className="flex-grow py-12">
        <div className="container max-w-7xl">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-2xl h-[520px] border border-slate-200" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-2xl border border-slate-200">
              <Code2 size={48} className="mx-auto mb-4 text-slate-300" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">No projects found</h3>
              <p className="text-slate-500 mb-6">Try adjusting your search or filters</p>
              <Button onClick={clearFilters} variant="outline" className="border-slate-200 text-slate-700">
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
