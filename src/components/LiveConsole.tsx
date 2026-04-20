import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Shield, Cpu, Activity } from "lucide-react";

const LiveConsole = () => {
  const [logs, setLogs] = useState<string[]>(["[SYSTEM] Booting analytical core..."]);
  const [isMinimized, setIsMinimized] = useState(false);

  const messages = [
    "[INFO] Analyzing ML Model parameters...",
    "[DEBUG] Optimizing IoT Uplink latency...",
    "[SYSTEM] Security layer: SECURE",
    "[DATA] Fetched Project repository...",
    "[AI] Training sub-routine active",
    "[CORE] Temperature: 34.2C",
    "[UPLINK] Packet loss: 0.00%",
    "[MEMORY] Garbage collection complete",
    "[INFO] Hero Section visible"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const msg = messages[Math.floor(Math.random() * messages.length)];
      const timestamp = new Date().toLocaleTimeString([], { hour12: false });
      setLogs((prev) => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-10 left-10 z-[100] hidden xl:block">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden shadow-2xl w-72"
      >
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700">
           <div className="flex items-center gap-2">
              <Terminal size={12} className="text-sky-400" />
              <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-widest leading-none">System Monitor</span>
           </div>
           <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-rose-500/50" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
           </div>
        </div>
        
        <div className="p-4 space-y-2 h-32 overflow-hidden bg-slate-950/20">
           <AnimatePresence>
             {logs.map((log, i) => (
               <motion.div 
                 key={log + i}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-[9px] font-mono text-emerald-400/80 tracking-tight leading-relaxed"
               >
                 {log}
               </motion.div>
             ))}
           </AnimatePresence>
        </div>

        <div className="px-4 py-2 bg-slate-800/20 border-t border-slate-800 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                 <Shield size={10} className="text-sky-500" />
                 <span className="text-[8px] font-mono text-slate-500">PROTECTED</span>
              </div>
              <div className="flex items-center gap-1">
                 <Activity size={10} className="text-emerald-500" />
                 <span className="text-[8px] font-mono text-slate-500">OPTIMAL</span>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LiveConsole;
