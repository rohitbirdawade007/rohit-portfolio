import { lazy, Suspense, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { ThemeProvider } from "@/context/ThemeContext";
import { ProfileProvider } from "@/context/ProfileContext";
import { CommandPalette } from "@/components/CommandPalette";
import CursorFollower from "@/components/CursorFollower";
import Particles from "@/components/Particles";

// ─── Eager Load (above the fold) ─────────────────────────────────────────────
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// ─── Lazy Load (code splitting) ───────────────────────────────────────────────
const AdminLayout        = lazy(() => import("./admin/AdminLayout"));
const ProjectsPage       = lazy(() => import("./pages/projects/ProjectsPage"));
const ProjectDetailPage  = lazy(() => import("./pages/projects/ProjectDetailPage"));
const AchievementsPage   = lazy(() => import("./pages/achievements/AchievementsPage"));
const AchievementDetailPage = lazy(() => import("./pages/achievements/AchievementDetailPage"));
const ExperiencePage     = lazy(() => import("./pages/experience/ExperiencePage"));
const ExperienceDetailPage = lazy(() => import("./pages/experience/ExperienceDetailPage"));
const ResearchPage       = lazy(() => import("./pages/research/ResearchPage"));
const ResearchDetailPage = lazy(() => import("./pages/research/ResearchDetailPage"));
const CertificationsPage = lazy(() => import("./pages/certifications/CertificationsPage"));
const BlogPage           = lazy(() => import("./pages/blog/BlogPage"));
const BlogDetailPage     = lazy(() => import("./pages/blog/BlogDetailPage"));
const AIChatbot          = lazy(() => import("./components/AIChatbot"));

// ─── Loading fallback ─────────────────────────────────────────────────────────
const PageLoader = () => (
  <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
    <div className="relative w-24 h-24">
       {/* Rotating outer rings */}
       <div className="absolute inset-0 border-2 border-primary/20 rounded-2xl animate-[spin_3s_linear_infinite]" />
       <div className="absolute inset-2 border-2 border-secondary/20 rounded-xl animate-[spin_2s_linear_reverse_infinite]" />
       
       <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-primary rounded-lg animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
       </div>
       
       <p className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.5em] text-primary/60 animate-pulse whitespace-nowrap">
          Initializing System
       </p>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000 } // 5 min cache
  }
});

const ScrollProgress = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      setWidth((window.scrollY / scrollTotal) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return <div className="fixed top-0 left-0 h-[3px] bg-primary z-[100] transition-all duration-100 ease-out glow-primary" style={{ width: `${width}%` }} />;
};

const App = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <ProfileProvider>
            <ScrollProgress />
            <div className="min-h-screen">
            <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <ScrollProgressBar />
              <Suspense fallback={<PageLoader />}>
                <CommandPalette />
                <Routes>
                  {/* ── Main Portfolio SPA (eager) ────────────────────── */}
                  <Route path="/" element={<Index />} />

                  {/* ── Projects ───────────────────────────────────────── */}
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/projects/:id" element={<ProjectDetailPage />} />

                  {/* ── Achievements ───────────────────────────────────── */}
                  <Route path="/achievements" element={<AchievementsPage />} />
                  <Route path="/achievements/:id" element={<AchievementDetailPage />} />

                  {/* ── Experience ─────────────────────────────────────── */}
                  <Route path="/experience" element={<ExperiencePage />} />
                  <Route path="/experience/:id" element={<ExperienceDetailPage />} />

                  {/* ── Research ───────────────────────────────────────── */}
                  <Route path="/research" element={<ResearchPage />} />
                  <Route path="/research/:id" element={<ResearchDetailPage />} />

                  {/* ── Certifications ─────────────────────────────────── */}
                  <Route path="/certifications" element={<CertificationsPage />} />

                  {/* ── Blog ───────────────────────────────────────────── */}
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:id" element={<BlogDetailPage />} />

                  {/* ── Admin Dashboard ────────────────────────────────── */}
                  <Route path="/admin/*" element={<AdminLayout />} />

                  {/* ── 404 ────────────────────────────────────────────── */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                
                {/* Only show AI Chatbot on public routes */}
                <Routes>
                   <Route path="/admin/*" element={null} />
                   <Route path="*" element={<AIChatbot />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
            </TooltipProvider>
            </div>
          </ProfileProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
