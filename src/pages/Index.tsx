import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectModules from "@/components/ProjectModules";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ResearchSection from "@/components/ResearchSection";
import BlogsSection from "@/components/BlogsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import SEO from "@/components/SEO";
import { usePageView } from "@/services/analytics";

const Index = () => {
  usePageView("/");

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--canvas)" }}>
      <SEO />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectModules />
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
