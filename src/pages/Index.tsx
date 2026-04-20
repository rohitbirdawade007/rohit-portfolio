import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ResearchSection from "@/components/ResearchSection";
import BlogsSection from "@/components/BlogsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import SEO from "@/components/SEO";
import { usePageView } from "@/services/analytics";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-white">
      <SEO />
      
      <Navbar />
      
      <main>
        <HeroSection />
        
        <AboutSection />
        
        <SkillsSection />
        
        <ProjectsSection />
        
        <ExperienceSection />
        
        <ResearchSection />

        <BlogsSection />
        
        <ContactSection />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
