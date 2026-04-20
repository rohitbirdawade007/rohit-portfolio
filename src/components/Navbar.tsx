import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Terminal, Cpu, Zap, ArrowRight, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Protocol", icon: <Terminal size={14} /> },
    { id: "about", label: "Core", icon: <User size={14} /> },
    { id: "projects", label: "Deployments", icon: <Cpu size={14} /> },
    { id: "skills", label: "Logic", icon: <Zap size={14} /> },
    { id: "contact", label: "Signal", icon: <Zap size={14} /> }
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
        window.location.href = `/#${id}`;
        return;
    }
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className="fixed top-6 left-0 w-full z-[100] px-4 md:px-8 flex justify-center pointer-events-none">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "pointer-events-auto flex items-center justify-between transition-all duration-500 rounded-[2rem] border border-slate-100/50",
          isScrolled 
            ? "w-full max-w-4xl bg-white/60 backdrop-blur-2xl py-3 px-6 md:px-10 shadow-[0_30px_60px_-15px_rgba(14,165,233,0.1)]" 
            : "w-full max-w-7xl bg-white/20 backdrop-blur-sm py-5 px-8 md:px-12 border-transparent"
        )}
      >
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-sky-500 shadow-sm transition-transform group-hover:rotate-12">
            <Cpu size={20} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-black tracking-tighter text-slate-900 uppercase italic">ROHIT BIRDAWADE</span>
            <span className="text-[8px] font-black tracking-[0.3em] text-sky-500 uppercase mt-1">AI RESEARCH NODE</span>
          </div>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group flex items-center gap-2 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-sky-500 transition-all rounded-xl hover:bg-sky-50/50"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sky-400">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
           {/* Terminal Access Button */}
           <Button 
             className="hidden sm:flex h-11 px-6 rounded-2xl bg-slate-900 hover:bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-900/10 active:scale-95 transition-all group gap-2"
             onClick={() => scrollToSection("contact")}
           >
             Initialize Lead <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
           </Button>

           <button 
             className="lg:hidden w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-900" 
             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
           >
             {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
           </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-2xl z-[90] p-6 pt-32 pointer-events-auto"
          >
            <div className="space-y-6">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left p-6 rounded-[2rem] border border-slate-100 bg-slate-50 flex items-center justify-between group overflow-hidden relative"
                >
                  <div className="relative z-10">
                     <span className="text-xs font-black text-sky-500 uppercase tracking-widest mb-1 block">NODE {idx + 1}</span>
                     <span className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">{item.label}</span>
                  </div>
                  <div className="text-slate-200 group-hover:text-sky-500 group-hover:scale-150 transition-all duration-500 absolute right-[-20px] bottom-[-20px] opacity-20 group-hover:opacity-100">
                     {item.icon}
                  </div>
                </motion.button>
              ))}
              
              <Button 
                className="w-full h-20 rounded-[2.5rem] bg-sky-500 hover:bg-sky-600 text-white font-black uppercase tracking-widest shadow-xl shadow-sky-500/20 text-lg"
                onClick={() => scrollToSection("contact")}
              >
                INITIALIZE CONTACT
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
