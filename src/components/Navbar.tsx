import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { useProfile } from "@/context/ProfileContext";
import AnimatedLogo from "./AnimatedLogo";

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
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-4 md:px-8",
        isScrolled ? "py-3" : "py-6"
      )}
    >
      <div 
        className={cn(
          "mx-auto flex justify-between items-center transition-all duration-500",
          isScrolled 
            ? "glass max-w-7xl rounded-full px-6 py-3 shadow-2xl shadow-primary/5 border-white/10" 
            : "max-w-full rounded-none px-0 py-0"
        )}
      >
        <Link 
          to="/" 
          className="transition-transform active:scale-95"
        >
          <AnimatedLogo />
        </Link>
        
        {/* Desktop Navigation Pill */}
        <nav className="hidden lg:flex items-center gap-1 p-1 bg-muted/40 backdrop-blur-md rounded-full border border-border/50">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "px-5 py-2 rounded-full text-[13px] font-black uppercase tracking-widest transition-all duration-300",
                activeSection === item.id 
                  ? "bg-white dark:bg-gray-800 text-primary shadow-lg shadow-primary/5" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </button>
          ))}
          <Link 
            to="/blog"
            className={cn(
              "px-5 py-2 rounded-full text-[13px] font-black uppercase tracking-widest transition-all duration-300",
              location.pathname.includes('/blog') 
                ? "bg-white dark:bg-gray-800 text-primary shadow-lg" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Blog
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <Button 
            variant="default" 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-11 font-black uppercase tracking-widest text-[11px] shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95"
            onClick={() => scrollToSection("contact")}
          >
            Hire Me
          </Button>
        </div>
        
        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-4">
          <ThemeToggle />
          <button 
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-muted/50 transition-colors" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="16" y1="6" y2="6"></line><line x1="4" x2="18" y1="18" y2="18"></line></svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Backdrop */}
      <div 
        className={cn(
          "lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[-1] transition-opacity duration-500",
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Content */}
      <div className={cn(
        "lg:hidden fixed top-[110px] left-4 right-4 glass rounded-[2.5rem] border-white/10 transition-all duration-500 shadow-2xl overflow-hidden",
        mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
      )}>
        <div className="p-6 flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "py-4 px-6 text-left font-black uppercase tracking-[0.2em] text-xs rounded-2xl transition-all",
                activeSection === item.id 
                  ? "bg-primary text-white" 
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4">
            <Button 
              className="w-full h-16 rounded-[1.5rem] bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20"
              onClick={() => scrollToSection("contact")}
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
