import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, Cpu, ArrowUpRight } from "lucide-react";
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
      setScrolled(window.scrollY > 20);
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
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "w-full max-w-5xl transition-all duration-300 rounded-full border shadow-md",
            scrolled
              ? "bg-white/90 backdrop-blur-xl border-slate-200 shadow-lg"
              : "bg-white/75 backdrop-blur-md border-slate-200/80"
          )}
        >
          <div className="px-6 h-14 flex items-center justify-between gap-4">

            {/* Brand */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-indigo-600 group-hover:bg-indigo-500 transition-colors shadow-sm">
                <Cpu size={15} />
              </div>
              <div>
                <p className="text-[13.5px] font-bold tracking-tight leading-none text-slate-900">Rohit Birdawade</p>
                <p className="text-[9.5px] font-semibold uppercase tracking-[0.1em] text-indigo-600 leading-none mt-0.5">AI Engineer</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 rounded-full px-2 py-1 border border-slate-200/80">
              {ITEMS.map((item) => {
                const isActive = active === item.id && location.pathname === "/";
                return (
                  <button
                    key={item.id}
                    onClick={() => scroll(item.id)}
                    className={cn(
                      "relative px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200",
                      isActive
                        ? "text-slate-900 font-bold"
                        : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-pill-stylish"
                        className="absolute inset-0 rounded-full bg-white border border-slate-200/90 z-[-1] shadow-xs"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right CTAs */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1 px-4 py-1.5 text-xs font-semibold text-white rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all shadow-sm"
              >
                Resume <ArrowUpRight size={13} />
              </a>

              <button
                onClick={() => setOpen(!open)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                {open ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pointer-events-auto mx-4 mt-2 backdrop-blur-2xl rounded-2xl border border-slate-200 bg-white/95 p-4 space-y-1 shadow-2xl"
          >
            {ITEMS.map((item) => {
              const isActive = active === item.id && location.pathname === "/";
              return (
                <button
                  key={item.id}
                  onClick={() => scroll(item.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between",
                    isActive ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  {item.label}
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
