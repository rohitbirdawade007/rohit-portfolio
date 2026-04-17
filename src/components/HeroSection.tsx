import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";

const HeroSection = () => {
  const { profile } = useProfile();
  const name = profile?.name || "Rohit Birdawade";
  const title = profile?.title || "AI & ML Engineer";
  const bio = profile?.bio || "Crafting intelligent solutions across the full stack with a passion for innovation.";
  const githubUrl = profile?.socialLinks?.github || "#";
  const linkedinUrl = profile?.socialLinks?.linkedin || "#";
  const profileImage = profile?.profileImage || "/profile.png";

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden bg-grainy pt-20">
      {/* Aurora Background */}
      <div className="aurora">
        <div className="bg-primary/20 top-0 left-0" />
        <div className="bg-secondary/20 bottom-0 right-0" />
        <div className="bg-purple-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            <div className="animate-fadeUp">
              <span className="subheading-premium">Available for Collaboration</span>
              <h1 className="heading-premium mb-6 dark:text-white">
                {name.split(' ').map((word, i) => (
                  <span key={i} className={i === 1 ? "text-primary" : ""}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
              <p className="text-xl md:text-2xl font-medium text-muted-foreground mb-10 max-w-xl leading-relaxed">
                A specialized <span className="text-foreground font-black underline decoration-primary/40 decoration-4 underline-offset-4">{title}</span>. {bio}
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 animate-fadeUp animate-delay-200">
              <Button 
                size="lg"
                className="btn-glow h-16 px-10 rounded-full bg-primary text-white font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-primary/20 transition-all active:scale-95"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Operations
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="h-16 px-10 rounded-full border-2 border-primary/20 hover:border-primary/50 font-black uppercase tracking-widest text-[11px] glass transition-all active:scale-95 text-foreground"
                onClick={() => window.open((profile as any)?.resumeLink || '#', '_blank')}
              >
                Dossier.pdf
              </Button>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 animate-fadeUp animate-delay-400">
              {[
                { icon: <Github size={20} />, url: githubUrl },
                { icon: <Linkedin size={20} />, url: linkedinUrl },
                { icon: <Mail size={20} />, url: `mailto:${profile?.email}` },
              ].map((s, i) => (
                <a 
                  key={i} href={s.url} 
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 dark:bg-white/5 border border-white/10 hover:border-primary hover:text-primary transition-all backdrop-blur-md text-foreground"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="flex-1 order-1 lg:order-2 flex justify-center lg:justify-end">
            <div 
              className="relative w-72 h-72 md:w-[450px] md:h-[550px] transition-transform duration-500 ease-out"
              style={{ transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) rotateX(${-mousePos.y * 0.2}deg) rotateY(${mousePos.x * 0.2}deg)` }}
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary to-secondary rounded-[3rem] blur-2xl opacity-20 animate-pulse-slow" />
              <div className="relative h-full w-full rounded-[3rem] overflow-hidden border-2 border-white/20 glass shadow-2xl group">
                <img 
                  src={profileImage.startsWith('http') ? profileImage : `https://rohit-portfolio-qgd8.onrender.com${profileImage}`} 
                  alt={name}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-8 left-8 right-8 animate-fadeUp animate-delay-500">
                   <div className="glass p-5 rounded-2xl border-white/10 shadow-lg backdrop-blur-2xl">
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Intelligence Systems Active</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-10 left-10 hidden xl:flex flex-col gap-4 text-white/20 font-black animate-fadeUp">
        <span className="[writing-mode:vertical-lr] tracking-[0.5em] text-[10px] uppercase">Scroll to explore</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
