import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, Cpu, Zap } from "lucide-react";
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
      const sections = ITEMS.map(i => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
      const scrollY = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= scrollY) { setActive(ITEMS[i].id); break; }
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
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[100] pointer-events-none">
      <div className="flex justify-center pt-4 px-4 pointer-events-auto">
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "w-full max-w-4xl transition-all duration-500",
            scrolled
              ? "bg-[#030712]/80 backdrop-blur-2xl border border-white/[0.06] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(99,102,241,0.08)]"
              : "bg-[#030712]/40 backdrop-blur-lg border border-white/[0.04] rounded-2xl"
          )}
        >
          <div className="px-4 h-14 flex items-center justify-between gap-4">

            {/* Brand */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <motion.div
                whileHover={{ rotate: 12, scale: 1.1 }}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
                style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)", boxShadow: "0 0 16px rgba(99,102,241,0.4)" }}
              >
                <Cpu size={15} />
              </motion.div>
              <div>
                <p className="text-[13px] font-bold tracking-tight leading-none text-white">Rohit Birdawade</p>
                <p className="text-[9px] font-semibold uppercase tracking-[0.12em] leading-none mt-0.5 text-indigo-400">AI Engineer</p>
              </div>
            </Link>

            {/* Desktop nav pills */}
            <nav className="hidden md:flex items-center gap-0.5 relative bg-white/[0.03] rounded-xl px-1 py-1 border border-white/[0.05]">
              {ITEMS.map((item) => {
                const isActive = active === item.id && location.pathname === "/";
                return (
                  <button
                    key={item.id}
                    onClick={() => scroll(item.id)}
                    className="relative px-3.5 py-1.5 text-[12.5px] font-medium rounded-lg transition-all duration-200 z-10"
                    style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.45)" }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg z-[-1]"
                        style={{ background: "rgba(99,102,241,0.25)", boxShadow: "0 0 12px rgba(99,102,241,0.2)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-2 shrink-0">
              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scroll("contact")}
                className="hidden sm:flex items-center gap-1.5 h-8 px-4 text-white text-[12px] font-semibold rounded-xl transition-all"
                style={{
                  background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                  boxShadow: "0 0 20px rgba(99,102,241,0.3), 0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                <Zap size={11} /> Hire Me
              </motion.button>

              <button
                onClick={() => setOpen(!open)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl transition-colors border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
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
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto mx-4 mt-2 backdrop-blur-2xl rounded-2xl shadow-2xl overflow-hidden border border-white/[0.06]"
            style={{ background: "rgba(3,7,18,0.95)" }}
          >
            <div className="p-3 space-y-1">
              {ITEMS.map((item, idx) => {
                const isActive = active === item.id && location.pathname === "/";
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => scroll(item.id)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between",
                      isActive
                        ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/20"
                        : "text-white/50 hover:text-white hover:bg-white/[0.06]"
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
                className="w-full py-3 text-sm font-semibold text-white rounded-xl"
                style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
              >
                Hire Me <Zap size={14} className="inline ml-1" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
