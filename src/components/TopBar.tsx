import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Terminal, Activity } from "lucide-react";

const TopBar = () => {
  const location = useLocation();
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "projects", label: "Projects" },
    { id: "models", label: "Model_Insights" },
    { id: "skills", label: "Registry" },
    { id: "contact", label: "Contact_Terminal" }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="system-topbar">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-sm font-black tracking-tighter text-white flex items-center gap-2">
          <Terminal size={16} className="text-blue-500" />
          SYSTEM_ACCESS
        </Link>
        <div className="h-4 w-px bg-[#1e293b] hidden md:block" />
        <nav className="hidden md:flex items-center gap-6 font-mono-system">
           {navItems.map((item) => (
             <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-[10px] font-bold text-[#94a3b8] hover:text-white uppercase tracking-widest transition-colors"
             >
               {item.label}
             </button>
           ))}
        </nav>
      </div>

      <div className="flex items-center gap-6 font-mono-system">
         <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded text-[9px] font-black text-green-500">
            <Activity size={12} className="animate-pulse" />
            LIVE_FEED: ACTIVE
         </div>
         <div className="text-[10px] font-black text-[#94a3b8] tabular-nums tracking-widest">
            {time}
         </div>
      </div>
    </header>
  );
};

export default TopBar;
