import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, Cpu, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const items = [
    { id: "home",       label: "Home" },
    { id: "about",      label: "About" },
    { id: "skills",     label: "Skills" },
    { id: "projects",   label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact",    label: "Contact" },
  ];

  const scroll = (id: string) => {
    setOpen(false);
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
            ? "bg-[rgba(247,247,245,0.88)] backdrop-blur-xl border-b border-[#E5E5E5] shadow-[0_1px_0_rgba(0,0,0,0.04)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-6">

          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#0A0A0A] text-white flex items-center justify-center shadow-sm transition-all group-hover:bg-[#1A56DB]">
              <Cpu size={15} />
            </div>
            <div>
              <p className="text-[13px] font-bold text-[#0A0A0A] tracking-tight leading-none">
                Rohit Birdawade
              </p>
              <p className="text-[9px] font-semibold text-[#1A56DB] uppercase tracking-[0.12em] leading-none mt-0.5">
                AI Engineer
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => scroll(item.id)}
                className="px-3.5 py-2 text-[13px] font-medium text-[#525252] hover:text-[#0A0A0A] rounded-lg hover:bg-[#F0F0EE] transition-all"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 shrink-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scroll("contact")}
              className="hidden sm:flex items-center gap-1.5 h-8 px-4 bg-[#0A0A0A] hover:bg-[#1E293B] text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Let's Talk <ArrowUpRight size={12} />
            </motion.button>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] text-[#404040] hover:bg-[#F0F0EE] transition-colors"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
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
            className="pointer-events-auto mx-4 mt-2 bg-[rgba(255,255,255,0.95)] backdrop-blur-xl border border-[#E5E5E5] rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-3 space-y-0.5">
              {items.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={() => scroll(item.id)}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-[#404040] hover:text-[#0A0A0A] hover:bg-[#F5F5F5] transition-all"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
            <div className="px-3 pb-3">
              <button
                onClick={() => scroll("contact")}
                className="w-full btn-primary text-sm py-3"
              >
                Let's Talk <ArrowUpRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
