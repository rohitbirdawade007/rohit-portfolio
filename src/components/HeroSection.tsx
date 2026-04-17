import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, Mail, Twitter, Download, ExternalLink } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import { useState, useEffect } from "react";
const HeroSection = () => {
  const { profile } = useProfile();
  const name = profile?.name || "Rohit Birdawade";
  const title = profile?.title || "AI & ML Engineer";
  const description = profile?.bio || "Crafting intelligent solutions across the full stack with a passion for innovation.";
  const resumeUrl = profile?.resumeLink || "#";
  const githubUrl = profile?.socialLinks?.github || "https://github.com/rohitbirdawade007";
  const linkedinUrl = profile?.socialLinks?.linkedin || "https://linkedin.com/in/rohitbirdawade";
  const email = profile?.email || "rohitbirdawade007@gmail.com";
  const twitterUrl = profile?.socialLinks?.twitter || "#";
  const profileImage = profile?.profileImage || "/profile.png";

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden py-24">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div 
          className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow transition-transform duration-700 ease-out"
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        ></div>
        <div 
          className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] animate-pulse-slow animate-delay-200 transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${-mousePos.x * 1.5}px, ${-mousePos.y * 1.5}px)` }}
        ></div>
        {/* Subtle noise pattern (CSS based fallback) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          
          {/* Content Area */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1 max-w-2xl">
            <div className="animate-fadeUp">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-bold tracking-wider uppercase text-primary bg-primary/10 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Available for New Challenges
              </div>
              <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter dark:text-white leading-[0.9]">
                {name}
              </h1>
              <h2 className="text-2xl md:text-4xl font-semibold mb-8 text-gray-600 dark:text-gray-300">
                A specialized <span className="text-gradient font-black">{title}</span>
              </h2>
            </div>
            
            <div className="animate-fadeUp animate-delay-200">
              <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-10 leading-relaxed max-w-xl">
                {description}
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-5 animate-fadeUp animate-delay-300">
              <Button 
                size="lg"
                className="rounded-full px-8 h-14 bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all font-bold group"
                onClick={scrollToProjects}
              >
                Explore My Work <ExternalLink size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="rounded-full px-8 h-14 border-2 border-primary/20 hover:border-primary/50 text-foreground transition-all font-bold glass"
                onClick={() => window.open(resumeUrl, "_blank")}
              >
                Resume <Download size={18} className="ml-2" />
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 animate-fadeUp animate-delay-400">
              {[
                { icon: <Github size={20} />, url: githubUrl },
                { icon: <Linkedin size={20} />, url: linkedinUrl },
                { icon: <Mail size={20} />, url: `mailto:${email}` },
                { icon: <Twitter size={20} />, url: twitterUrl },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 border border-border hover:border-primary hover:text-primary hover:-translate-y-1 transition-all shadow-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Profile Visual */}
          <div className="flex-1 order-1 lg:order-2 flex justify-center lg:justify-end animate-fadeUp animate-delay-200">
            <div className="relative group">
              {/* Decorative back-blob */}
              <div 
                className="absolute -inset-10 bg-gradient-to-tr from-primary to-secondary rounded-full opacity-20 blur-3xl group-hover:opacity-30 transition-all duration-700 animate-pulse-slow"
                style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
              ></div>
              
              <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] rounded-[60px] overflow-hidden border-4 border-white/20 dark:border-white/10 shadow-2xl glass p-4 transition-transform duration-500 hover:rotate-2">
                <img 
                  src={profileImage.startsWith('http') || profileImage.startsWith('/profile') ? profileImage : `http://localhost:5000${profileImage}`} 
                  alt={name}
                  className="w-full h-full object-cover rounded-[40px] transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>

              {/* Stats badges */}
              <div className="absolute -bottom-6 -left-6 glass-card px-8 py-5 rounded-3xl animate-float border-primary/20">
                <span className="block text-3xl font-black text-primary">AI/ML</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Global Expertise</span>
              </div>
              
              <div className="absolute -top-6 -right-6 glass-card px-8 py-5 rounded-3xl animate-float animate-delay-500 border-secondary/20">
                <span className="block text-3xl font-black text-secondary">FullStack</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Next-Gen Solutions</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
           onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Continue Journey</span>
        <ChevronDown size={20} className="text-primary" />
      </div>
    </section>
  );
};

export default HeroSection;
