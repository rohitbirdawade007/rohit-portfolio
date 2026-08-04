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
              ? "bg-white/85 backdrop-blur-2xl border border-slate-200/80 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
              : "bg-white/60 backdrop-blur-lg border border-slate-200/50 rounded-2xl shadow-sm"
          )}
        >
          <div className="px-4 h-14 flex items-center justify-between gap-4">

            {/* Brand */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <motion.div
                whileHover={{ rotate: 12, scale: 1.1 }}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-md"
                style={{ background: "linear-gradient(135deg, #4F46E5, #6366F1)" }}
              >
                <Cpu size={15} />
              </motion.div>
              <div>
                <p className="text-[13px] font-bold tracking-tight leading-none text-slate-900">Rohit Birdawade</p>
                <p className="text-[9px] font-semibold uppercase tracking-[0.12em] leading-none mt-0.5 text-indigo-600">AI Engineer</p>
              </div>
            </Link>

            {/* Desktop nav pills */}
            <nav className="hidden md:flex items-center gap-0.5 relative bg-slate-100/80 rounded-xl px-1 py-1 border border-slate-200/60">
              {ITEMS.map((item) => {
                const isActive = active === item.id && location.pathname === "/";
                return (
                  <button
                    key={item.id}
                    onClick={() => scroll(item.id)}
                    className="relative px-3.5 py-1.5 text-[12.5px] font-medium rounded-lg transition-all duration-200 z-10"
                    style={{ color: isActive ? "#0F172A" : "#64748B" }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill-light"
                        className="absolute inset-0 rounded-lg z-[-1] bg-white shadow-sm border border-slate-200/80"
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
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scroll("contact")}
                className="hidden sm:flex items-center gap-1.5 h-8 px-4 text-white text-[12px] font-semibold rounded-xl transition-all shadow-md"
                style={{
                  background: "linear-gradient(135deg, #4F46E5, #6366F1)",
                }}
              >
                <Zap size={11} /> Hire Me
              </motion.button>

              <button
                onClick={() => setOpen(!open)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl transition-colors border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
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
            className="pointer-events-auto mx-4 mt-2 backdrop-blur-2xl rounded-2xl shadow-xl overflow-hidden border border-slate-200 bg-white/95"
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
                        ? "bg-indigo-50 text-indigo-700 font-semibold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    )}
                  >
                    {item.label}
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                  </motion.button>
                );
              })}
            </div>
            <div className="px-3 pb-3">
              <button
                onClick={() => scroll("contact")}
                className="w-full py-3 text-sm font-semibold text-white rounded-xl shadow-md"
                style={{ background: "linear-gradient(135deg, #4F46E5, #6366F1)" }}
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
