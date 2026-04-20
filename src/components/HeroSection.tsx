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
    <section id="home" className="min-h-screen relative flex items-center pt-20 bg-white overflow-hidden bg-dot-pattern">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Column: Text Content */}
          <div className="flex-1 text-left animate-fadeUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-primary border border-blue-100 mb-8">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
               </span>
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">Available for Collaboration</span>
            </div>

            <span className="subheading-premium">Pioneering AI & IoT</span>
            <h1 className="text-5xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-[0.9] uppercase italic">
               Hi, I am <span className="text-primary">Rohit</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-xl leading-relaxed font-medium">
               A dedicated <span className="text-gray-900 font-bold">{title}</span> bridging the gap between intelligent hardware and sophisticated software solutions.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Magnetic>
                <Button 
                  size="lg"
                  className="h-16 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary/20 transition-all active:scale-95"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View My Work
                </Button>
              </Magnetic>
              <Magnetic>
                <Button 
                  variant="outline"
                  size="lg"
                  className="h-16 px-10 rounded-2xl border-2 border-primary/10 text-primary hover:bg-primary/5 font-black uppercase tracking-widest text-xs transition-all active:scale-95"
                  onClick={() => window.open(linkedinUrl, '_blank')}
                >
                  Connect
                </Button>
              </Magnetic>
            </div>

            <div className="flex items-center gap-8">
               {[
                 { icon: <Github size={22} />, url: githubUrl },
                 { icon: <Linkedin size={22} />, url: linkedinUrl },
                 { icon: <Mail size={22} />, url: `mailto:${email}` },
               ].map((s, i) => (
                 <a 
                   key={i} href={s.url} 
                   target="_blank" rel="noreferrer"
                   className="text-gray-400 hover:text-primary transition-all transform hover:scale-110 active:scale-95"
                 >
                   {s.icon}
                 </a>
               ))}
            </div>
          </div>

          {/* Right Column: Visual/Image */}
          <div className="flex-1 relative animate-fadeUp animate-delay-200 hidden lg:block">
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
               <div className="absolute inset-0 bg-primary/5 rounded-[3rem] rotate-6 animate-pulse-slow" />
               <div className="absolute inset-0 bg-primary/10 rounded-[3rem] -rotate-3 animate-float" />
               <div className="relative w-full h-full rounded-[3rem] overflow-hidden border-2 border-white shadow-2xl">
                  <img 
                    src={profile?.profileImage || "/profile.png"} 
                    alt={name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
               </div>
               
               {/* Decorative elements */}
               <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl shadow-2xl border-white/20 animate-float translate-x-4">
                  <p className="text-3xl font-black text-primary">8.7</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Target CGPA</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
         <div 
           className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-gray-100 text-gray-400 border border-gray-100"
           onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
         >
            <ChevronDown size={20} />
         </div>
      </div>
    </section>
  );
};

export default HeroSection;
