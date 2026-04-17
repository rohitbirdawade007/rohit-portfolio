import { lazy, Suspense, useEffect } from "react";
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
  <div className="min-h-screen bg-gray-950 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-400 text-sm">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000 } // 5 min cache
  }
});

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
          </ProfileProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
