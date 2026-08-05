import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, Code2, ArrowUpRight } from "lucide-react";
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
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = ITEMS.map(i => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
      const y = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= y) { setActive(ITEMS[i].id); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    setActive(id);
    if (location.pathname !== "/") { window.location.href = `/#${id}`; return; }
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  const isHome = location.pathname === "/";

  return (
    <header className="fixed top-0 left-0 w-full z-[100] pointer-events-none">
      <div className="flex justify-center pt-4 px-4 pointer-events-auto">
        <motion.nav
          initial={{ y: -70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "w-full max-w-5xl rounded-full transition-all duration-300",
            scrolled
              ? "bg-white/92 backdrop-blur-2xl border border-slate-200 shadow-lg shadow-slate-200/60"
              : "bg-white/80 backdrop-blur-xl border border-slate-200/70"
          )}
        >
          <div className="px-5 h-[54px] flex items-center justify-between gap-4">

            {/* Brand */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-sm group-hover:bg-indigo-500 transition-colors">
                <Code2 size={14} />
              </div>
              <div className="hidden sm:block">
                <p className="text-[13px] font-bold text-slate-900 leading-none tracking-tight">Rohit Birdawade</p>
                <p className="mono text-[9px] text-indigo-600 font-semibold uppercase tracking-[0.1em] leading-none mt-0.5">AI · ML Engineer</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-0.5 bg-slate-100/80 rounded-full px-1.5 py-1 border border-slate-200/60">
              {ITEMS.map(item => {
                const isAct = active === item.id && isHome;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={cn(
                      "relative px-3.5 py-1.5 text-[12.5px] font-medium rounded-full transition-all duration-200",
                      isAct
                        ? "text-slate-900 font-semibold"
                        : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    {isAct && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 bg-white border border-slate-200 rounded-full z-[-1] shadow-sm"
                        transition={{ type: "spring", stiffness: 450, damping: 38 }}
                      />
                    )}
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Right CTAs */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 text-[12px] font-semibold text-white rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all shadow-sm"
              >
                Resume <ArrowUpRight size={12} />
              </a>
              <button
                onClick={() => setOpen(!open)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-all"
              >
                {open ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto mx-4 mt-2 bg-white/96 backdrop-blur-2xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden"
          >
            <div className="p-3 space-y-0.5">
              {ITEMS.map(item => {
                const isAct = active === item.id && isHome;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl text-[13.5px] font-medium transition-all flex items-center justify-between",
                      isAct
                        ? "bg-indigo-50 text-indigo-700 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    {item.label}
                    {isAct && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                  </button>
                );
              })}
              <div className="px-4 pt-2 pb-1">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary w-full text-sm justify-center"
                >
                  Download Resume <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
