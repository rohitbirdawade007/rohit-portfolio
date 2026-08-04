import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, Cpu, ArrowUpRight, Command, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS = [
  { id: "home",       label: "Home" },
  { id: "about",      label: "About" },
  { id: "skills",     label: "Skills" },
  { id: "projects",   label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact",    label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32);

      // Determine active section by scroll position
      const sections = ITEMS.map(i => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
      const scrollY = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= scrollY) {
          setActive(ITEMS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (id: string) => {
    setOpen(false);
    setActive(id);
    if (location.pathname !== "/") { window.location.href = `/#${id}`; return; }
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[100] pointer-events-none">
      <motion.div
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "pointer-events-auto w-full transition-all duration-300",
          scrolled
            ? "bg-[rgba(13,13,20,0.85)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] shadow-[0_4px_30px_rgba(0,0,0,0.15)]"
            : "bg-transparent"
        )}
      >
        {/* Scroll progress underline */}
        {scrolled && (
          <div className="absolute bottom-0 left-0 w-full h-[2px] overflow-hidden">
            <div id="navbar-progress" className="h-full gradient-line opacity-60" style={{ width: '100%' }} />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-6">

          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shadow-sm transition-all",
                scrolled
                  ? "bg-[#6C63FF] text-white group-hover:bg-[#7B73FF]"
                  : "bg-[#0A0A0A] text-white group-hover:bg-[#1A56DB]"
              )}
            >
              <Cpu size={15} />
            </motion.div>
            <div>
              <p className="text-[13px] font-bold tracking-tight leading-none text-white">
                Rohit Birdawade
              </p>
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] leading-none mt-0.5 text-indigo-400">
                AI Engineer
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5 relative">
            {ITEMS.map((item) => {
              const isActive = active === item.id && location.pathname === "/";
              return (
                <button
                  key={item.id}
                  onClick={() => scroll(item.id)}
                  className={cn(
                    "relative px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all",
                    isActive
                      ? "text-white bg-white/10"
                      : "text-white/50 hover:text-white hover:bg-white/08"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-400"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Keyboard shortcut badge */}
            <div className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono border border-white/10 text-white/30">
              <Command size={9} /> K
            </div>

            {/* Hire Me glow button — UPGRADE 1 */}
            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scroll("contact")}
              className="hidden sm:flex items-center gap-1.5 h-8 px-4 text-white text-xs font-semibold rounded-lg transition-all duration-300 hire-me-glow"
              style={{
                background: "#6C63FF",
                border: "1px solid #6C63FF",
                boxShadow: "0 0 12px rgba(108,99,255,0.3)",
              }}
            >
              <Zap size={12} /> Hire Me
            </motion.button>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
            >
              <AnimatePresence mode="wait">
                {open
                  ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={16} /></motion.span>
                  : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={16} /></motion.span>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-auto mx-4 mt-2 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden" style={{ background: "rgba(10,10,20,0.95)", border: "1px solid rgba(99,102,241,0.2)" }}
          >
            <div className="p-3 space-y-0.5">
              {ITEMS.map((item, idx) => {
                const isActive = active === item.id && location.pathname === "/";
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => scroll(item.id)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between",
                      isActive
                        ? "bg-indigo-500/15 text-indigo-300 font-semibold"
                        : "text-white/50 hover:text-white hover:bg-white/06"
                    )}
                  >
                    {item.label}
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                  </motion.button>
                );
              })}
            </div>
            <div className="px-3 pb-3">
              <button
                onClick={() => scroll("contact")}
                className="w-full btn-blue text-sm py-3"
              >
                Hire Me <Zap size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
