import { useProfile } from "@/context/ProfileContext";
import { Brain, Rocket, Zap, Target, Star, ShieldCheck, Cpu, Code2 } from "lucide-react";

const AboutSection = () => {
  const { profile } = useProfile();
  const aboutText = profile?.about || "I am a dedicated engineer specializing in AI and Machine Learning, with a deep commitment to building scalable and intelligent systems that solve real-world problems.";
  
  const values = [
    { icon: <Rocket size={24} />, title: "Goal Oriented", desc: "Focusing on measurable outcomes and high-impact solutions.", color: "text-orange-500" },
    { icon: <Zap size={24} />, title: "Rapid Iteration", desc: "Iterating fast without compromising on code quality or stability.", color: "text-yellow-500" },
    { icon: <Brain size={24} />, title: "AI-First", desc: "Leveraging model-driven architectures for complex problem solving.", color: "text-purple-500" },
    { icon: <ShieldCheck size={24} />, title: "Secure Design", desc: "Building with a security-first mindset and enterprise standards.", color: "text-green-500" },
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden bg-white dark:bg-[#020617]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-20 animate-fadeUp text-center lg:text-left mx-auto lg:mx-0">
          <span className="subheading-premium">The Philosophy</span>
          <h2 className="heading-premium dark:text-white">Beyond <span className="text-primary italic">The</span> Matrix</h2>
          <p className="text-xl text-muted-foreground mt-6 leading-relaxed">
            Exploring the intersection of human creativity and artificial intelligence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Main Dossier Card */}
          <div className="lg:col-span-8 bento-item hover-spotlight border-white/10 dark:hover:bg-primary/5 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-primary/10 pointer-events-none group-hover:text-primary/20 transition-colors">
              <Cpu size={120} />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-8 tracking-tighter flex items-center gap-3">
                <Code2 className="text-primary" /> Technical Dossier
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-[1.8] text-lg lg:text-xl whitespace-pre-wrap font-medium">
                {aboutText}
              </p>
            </div>
          </div>

          {/* Quick Stats Bento */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="bento-item border-white/10 dark:hover:bg-primary/5 flex flex-col justify-center items-center text-center group">
              <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                <Target size={32} />
              </div>
              <h4 className="text-2xl font-black mb-2 tracking-tighter">Mission Ready</h4>
              <p className="text-sm text-muted-foreground">Architecting high-impact scalable systems.</p>
            </div>
            
            <div className="bento-item border-white/10 dark:hover:bg-secondary/5 flex flex-col justify-center items-center text-center group">
              <div className="w-16 h-16 bg-secondary/5 text-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white transition-all shadow-sm">
                <Star size={32} />
              </div>
              <h4 className="text-2xl font-black mb-2 tracking-tighter">Elite Standards</h4>
              <p className="text-sm text-muted-foreground">Cutting edge AI/ML implementation.</p>
            </div>
          </div>

          {/* Value Cards */}
            {values.map((v, i) => (
              <div 
                key={i} 
                className="bento-item hover-spotlight !p-8 border-white/10 dark:hover:bg-white/5 transition-all group animate-fadeUp h-full" 
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`mb-6 p-4 rounded-xl bg-white/5 inline-block ${v.color} transform group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-sm`}>
                  {v.icon}
                </div>
                <h4 className="font-black text-xl mb-3 tracking-tighter group-hover:text-primary transition-colors">{v.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
