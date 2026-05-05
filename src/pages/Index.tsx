import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectModules from "@/components/ProjectModules";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import AchievementsSection from "@/components/AchievementsSection";
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

  /* ── UPGRADE 6: Global scroll animations via IntersectionObserver ── */
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => observer.disconnect();
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
        <EducationSection />
        <AchievementsSection />
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
