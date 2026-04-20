import { useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ResumeSection from "@/components/ResumeSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import AchievementsSection from "@/components/AchievementsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ResearchSection from "@/components/ResearchSection";
import BlogsSection from "@/components/BlogsSection";
import GitHubStats from "@/components/GitHubStats";
import DataVisSection from "@/components/DataVisSection";
import ContactSection from "@/components/ContactSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import SEO from "@/components/SEO";
import { usePageView } from "@/services/analytics";
import { motion, useScroll, useSpring } from "framer-motion";

const Index = () => {
  usePageView('/');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Scroll to anchor if present in URL
    const hash = window.location.hash;
    if (hash) {
      try {
        const element = document.querySelector(hash);
        if (element) {
          setTimeout(() => {
            window.scrollTo({
              top: element.getBoundingClientRect().top + window.scrollY - 100,
              behavior: "smooth"
            });
          }, 100);
        }
      } catch (e) {
        console.warn("Invalid hash selector:", hash);
      }
    }
  }, []);
  
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020617] text-white selection:bg-primary/30">
      <SEO />
      
      {/* Global Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main className="relative">
        <HeroSection />
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <AboutSection />
        </motion.div>
        
        <ResumeSection />
        
        <SkillsSection />
        
        <ProjectsSection />
        
        <ExperienceSection />
        
        <AchievementsSection />
        
        <ResearchSection />

        <DataVisSection />

        <GitHubStats />
        
        <BlogsSection />
        
        <CTASection />
        
        <ContactSection />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
