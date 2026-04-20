import { useState } from "react";
import { Terminal, Send, Github, Linkedin, Mail } from "lucide-react";

const ContactTerminal = () => {
  const [input, setInput] = useState("");

  return (
    <section id="contact" className="scroll-mt-24 mb-32">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px w-10 bg-[#1e293b]" />
        <h2 className="text-sm font-black text-[#94a3b8] uppercase tracking-[0.4em] font-mono-system shrink-0">Initiate_External_Sync</h2>
        <div className="h-px flex-1 bg-[#1e293b]" />
      </div>

      <div className="system-module max-w-2xl mx-auto border-blue-500/20">
         <div className="flex items-center gap-3 mb-8 text-[#94a3b8]">
            <Terminal size={18} />
            <span className="text-[10px] font-mono-system font-black tracking-widest uppercase">Direct_Kernel_Comm</span>
         </div>

         <div className="space-y-6 mb-12">
            <p className="text-sm text-[#94a3b8] font-mono-system border-l-2 border-blue-500/50 pl-6 py-2">
               System is ready for sync. Use the following ports to establish an external secure connection with the lead engineer.
            </p>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a 
              href="mailto:rohitbirdawade007@gmail.com" 
              className="flex flex-col items-center gap-4 p-6 bg-[#020617] border border-[#1e293b] rounded hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group"
            >
               <Mail size={24} className="text-[#94a3b8] group-hover:text-blue-500" />
               <span className="text-[10px] font-mono-system font-black text-[#94a3b8] uppercase group-hover:text-white">Email_Port</span>
            </a>
            <a 
              href="https://github.com/rohitbirdawade007" target="_blank"
              className="flex flex-col items-center gap-4 p-6 bg-[#020617] border border-[#1e293b] rounded hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group"
            >
               <Github size={24} className="text-[#94a3b8] group-hover:text-blue-500" />
               <span className="text-[10px] font-mono-system font-black text-[#94a3b8] uppercase group-hover:text-white">Git_Index</span>
            </a>
            <a 
              href="https://linkedin.com/in/rohitbirdawade007" target="_blank"
              className="flex flex-col items-center gap-4 p-6 bg-[#020617] border border-[#1e293b] rounded hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group"
            >
               <Linkedin size={24} className="text-[#94a3b8] group-hover:text-blue-500" />
               <span className="text-[10px] font-mono-system font-black text-[#94a3b8] uppercase group-hover:text-white">Linked_Auth</span>
            </a>
         </div>

         <div className="mt-12 flex items-center gap-4 px-6 py-4 bg-[#020617] border border-[#1e293b] rounded-lg">
            <span className="text-blue-500 text-sm font-mono-system font-black tracking-widest">{">"}</span>
            <input 
              type="text"
              placeholder="Awaiting command..."
              className="bg-transparent border-none outline-none text-xs font-mono-system text-[#94a3b8] w-full placeholder:opacity-30"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Send size={16} className="text-[#1e293b]" />
         </div>
      </div>
    </section>
  );
};

export default ContactTerminal;
