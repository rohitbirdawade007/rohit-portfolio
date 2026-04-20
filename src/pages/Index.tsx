import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import SystemOverview from "@/components/SystemOverview";
import ProjectModules from "@/components/ProjectModules";
import ModelInsights from "@/components/ModelInsights";
import SkillMatrix from "@/components/SkillMatrix";
import ContactTerminal from "@/components/ContactTerminal";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import SEO from "@/components/SEO";
import { usePageView } from "@/services/analytics";
import ExperienceSection from "@/components/ExperienceSection";
import ResearchSection from "@/components/ResearchSection";
import BlogsSection from "@/components/BlogsSection";

const Index = () => {
  usePageView('/');

  useEffect(() => {
    // Scroll to anchor if present in URL
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);
  
  return (
    <div className="system-layout bg-[#020617] text-white selection:bg-blue-500/30">
      <SEO />
      
      {/* Sidebar - Identity Module */}
      <Sidebar />

      {/* Workspace Area */}
      <div className="system-workspace">
        <TopBar />
        
        <main className="workspace-scroll">
          <SystemOverview />
          
          <ProjectModules />
          
          <ModelInsights />
          
          <SkillMatrix />

          <ExperienceSection />
          
          <ResearchSection />

          <BlogsSection />
          
          <ContactTerminal />

          <Footer />
        </main>
      </div>

      <BackToTop />
    </div>
  );
};

export default Index;
