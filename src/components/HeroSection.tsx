import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import { Magnetic } from "./Magnetic";

const HeroSection = () => {
  const { profile } = useProfile();
  const name = profile?.name || "Rohit Sandip Birdawade";
  const title = profile?.title || "AI & ML Engineer";
  const githubUrl = profile?.socialLinks?.github || "#";
  const linkedinUrl = profile?.socialLinks?.linkedin || "#";
  const email = profile?.email || "";

  return (
    <section id="home" className="min-h-screen relative flex flex-col items-center justify-center pt-20 bg-white overflow-hidden">
      {/* Subtle Dot Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="animate-fadeUp flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-primary border border-blue-100 mb-8">
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
             </span>
             <span className="text-[10px] font-bold uppercase tracking-widest">Available for Freelance & Internships</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
             Hi, I am <span className="text-primary italic">Rohit</span>
          </h1>
          
          <h2 className="text-xl md:text-2xl font-medium text-gray-500 mb-10 max-w-2xl leading-relaxed">
             A <span className="text-gray-900 font-bold">{title}</span> focused on building intelligent systems that prioritize user experience and performance.
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Magnetic>
              <Button 
                size="lg"
                className="h-14 px-10 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-xl shadow-primary/20 transition-all active:scale-95"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Projects
              </Button>
            </Magnetic>
            <Magnetic>
              <Button 
                variant="outline"
                size="lg"
                className="h-14 px-10 rounded-xl border-2 border-primary/20 text-primary hover:bg-primary/5 font-bold transition-all active:scale-95"
                onClick={() => window.open(linkedinUrl, '_blank')}
              >
                LinkedIn Profile
              </Button>
            </Magnetic>
          </div>

          <div className="flex items-center gap-6">
             {[
               { icon: <Github size={20} />, url: githubUrl },
               { icon: <Linkedin size={20} />, url: linkedinUrl },
               { icon: <Mail size={20} />, url: `mailto:${email}` },
             ].map((s, i) => (
               <a 
                 key={i} href={s.url} 
                 target="_blank" rel="noreferrer"
                 className="text-gray-400 hover:text-primary transition-colors transform hover:scale-110 active:scale-95"
               >
                 {s.icon}
               </a>
             ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
         <div 
           className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-gray-100 text-gray-400"
           onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
         >
            <ChevronDown size={20} />
         </div>
      </div>
    </section>
  );
};

export default HeroSection;
