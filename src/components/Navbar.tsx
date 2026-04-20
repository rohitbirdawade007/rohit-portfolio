import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { useProfile } from "@/context/ProfileContext";
import AnimatedLogo from "./AnimatedLogo";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { profile } = useProfile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + 120;
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id") || "";
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      return;
    }
    
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 100;
      const sectionTop = section.offsetTop - offset;
      window.scrollTo({
        top: sectionTop,
        behavior: "smooth"
      });
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <header className="fixed top-6 left-0 w-full z-50 px-4 md:px-8 pointer-events-none">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "mx-auto flex justify-between items-center transition-all duration-500 glass max-w-7xl rounded-full px-6 py-2 shadow-2xl border-white/10 pointer-events-auto",
          isScrolled ? "py-2 bg-black/40" : "py-3 bg-black/20"
        )}
      >
        <Link 
          to="/" 
          className="transition-transform active:scale-95"
        >
          <AnimatedLogo />
        </Link>
        
        {/* Desktop Navigation Pill */}
        <nav className="hidden lg:flex items-center gap-1 p-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "relative px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300",
                activeSection === item.id 
                  ? "text-white" 
                  : "text-gray-400 hover:text-white"
              )}
            >
              {activeSection === item.id && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <Button 
            variant="default" 
            size="sm"
            className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 h-12 font-[800] uppercase tracking-widest text-[10px] transition-all active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.3)] border-none"
            onClick={() => scrollToSection("contact")}
          >
            Hire Me
          </Button>
        </div>
        
        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-4">
          <ThemeToggle />
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-full glass border-white/10 transition-colors" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="16" y1="6" y2="6"></line><line x1="4" x2="18" y1="18" y2="18"></line></svg>
            )}
          </button>
        </div>
      </motion.div>
      
      {/* Mobile Menu Content */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="lg:hidden fixed top-[100px] left-4 right-4 glass rounded-[2rem] border-white/10 shadow-2xl overflow-hidden pointer-events-auto"
          >
            <div className="p-6 flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "py-3 px-6 text-left font-bold uppercase tracking-[0.2em] text-[10px] rounded-xl transition-all",
                    activeSection === item.id 
                      ? "bg-primary text-white" 
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4">
                <Button 
                  className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-[10px]"
                  onClick={() => scrollToSection("contact")}
                >
                  Get In Touch
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
