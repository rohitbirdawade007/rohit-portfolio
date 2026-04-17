import { useProfile } from "@/context/ProfileContext";
import { Brain, Code2, Rocket, Zap, Heart, Target, Star, ShieldCheck } from "lucide-react";

const AboutSection = () => {
  const { profile } = useProfile();
  const aboutText = profile?.about || "I am a dedicated engineer specializing in AI and Machine Learning, with a deep commitment to building scalable and intelligent systems that solve real-world problems.";
  
  const values = [
    { icon: <Rocket className="text-orange-500" />, title: "Goal Oriented", desc: "Focusing on measurable outcomes and high-impact solutions." },
    { icon: <Zap className="text-yellow-500" />, title: "Rapid Development", desc: "Iterating fast without compromising on code quality or stability." },
    { icon: <Brain className="text-purple-500" />, title: "AI-First Thinking", desc: "Leveraging model-driven architectures for complex problem solving." },
    { icon: <ShieldCheck className="text-green-500" />, title: "Secure Systems", desc: "Building with a security-first mindset and enterprise standards." },
  ];

  return (
    <section id="about" className="section-padding bg-white dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fadeUp">
          <h2 className="section-heading !mb-4">Beyond the Code</h2>
          <p className="text-lg text-muted-foreground">
            A look into my philosophy, the principles that drive my work, and the unique value I bring to every project.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto">
          {/* Main Bio Card */}
          <div className="lg:col-span-8 glass-card p-10 rounded-[3rem] animate-fadeUp">
            <h3 className="text-3xl font-bold mb-6 text-gradient inline-block">My Journey</h3>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
                {aboutText}
              </p>
            </div>
          </div>

          {/* Quick Stats/Highlights */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass-card p-8 rounded-[2.5rem] flex-1 animate-fadeUp animate-delay-100 flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                <Target size={32} />
              </div>
              <h4 className="text-xl font-bold mb-2">High Impact</h4>
              <p className="text-sm text-muted-foreground">Delivering production-ready systems at scale.</p>
            </div>
            
            <div className="glass-card p-8 rounded-[2.5rem] flex-1 animate-fadeUp animate-delay-200 flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-4">
                <Star size={32} />
              </div>
              <h4 className="text-xl font-bold mb-2">Innovation Driven</h4>
              <p className="text-sm text-muted-foreground">Always exploring the cutting edge of AI/ML.</p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {values.map((v, i) => (
              <div key={i} className="glass-card p-8 rounded-[2rem] hover:bg-muted/30 transition-all duration-300 group animate-fadeUp" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  {v.icon}
                </div>
                <h4 className="font-bold text-lg mb-2">{v.title}</h4>
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
