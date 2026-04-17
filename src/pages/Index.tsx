import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import AchievementsSection from "@/components/AchievementsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ResearchSection from "@/components/ResearchSection";
import BlogsSection from "@/components/BlogsSection";
import GitHubStats from "@/components/GitHubStats";
import ContactSection from "@/components/ContactSection";

import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import SEO from "@/components/SEO";
import { usePageView } from "@/services/analytics";

const Index = () => {
  usePageView('/');

  useEffect(() => {
    // Scroll to anchor if present in URL
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          window.scrollTo({
            top: element.getBoundingClientRect().top + window.scrollY - 100,
            behavior: "smooth"
          });
        }, 100);
      }
    }
    
    // Reveal animations on scroll
    const handleScroll = () => {
      const scrollElements = document.querySelectorAll(".scroll-reveal");
      
      scrollElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add("revealed");
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on load
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <div className="min-h-screen overflow-x-hidden bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <SEO />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <AchievementsSection />
      <ExperienceSection />
      <ResearchSection />

      <GitHubStats />
      <BlogsSection />
      <ContactSection />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
